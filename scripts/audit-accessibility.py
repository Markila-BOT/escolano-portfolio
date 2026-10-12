import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]


def scan(page, state, results):
    page.wait_for_timeout(600)
    page.add_script_tag(path=str(ROOT / "node_modules/axe-core/axe.min.js"))
    findings = page.evaluate("""async () => {
        const result = await axe.run(document, {
            runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']}
        });
        return {version: result.testEngine.version, violations: result.violations,
            incomplete: result.incomplete, passes: result.passes.map(rule => rule.id)};
    }""")
    results.append({"state": state, **findings})


def deep_states(page, results):
    menu = page.get_by_role("button", name="Open menu", exact=True)
    menu.click()
    scan(page, "menu-open", results)
    page.keyboard.press("Escape")
    scan(page, "menu-closed-after-dismissal", results)

    projects = page.locator("#projects")
    projects.get_by_role("button", name="Rail", exact=True).click()
    scan(page, "projects-rail", results)
    project_buttons = projects.locator("button[aria-expanded]")
    project_count = project_buttons.count()
    for index in range(project_count):
        project_buttons.nth(index).click()
        title = project_buttons.nth(index).inner_text()
        scan(page, f"rail-selected-{index}-{title}", results)
        projects.get_by_role("button", name="View ").click()
        page.get_by_role("button", name="Close project", exact=True).wait_for()
        page.wait_for_timeout(400)
        scan(page, f"project-drawer-{index}-{title}", results)
        page.get_by_role("button", name="Close project", exact=True).click()
        page.get_by_role("button", name="Close project", exact=True).wait_for(state="hidden")
    projects.get_by_role("button", name="Carousel", exact=True).click()
    scan(page, "projects-carousel", results)

    skills = page.locator("button[id^='skill-trigger-']")
    for index in range(skills.count()):
        label = skills.nth(index).inner_text()
        skills.nth(index).click()
        scan(page, f"skill-expanded-{index}-{label}", results)
        skills.nth(index).click()
    scan(page, "skills-collapsed", results)

    more = page.get_by_role("button", name="Read More", exact=True)
    expansion = 0
    while more.count():
        more.click()
        expansion += 1
        scan(page, f"timeline-expanded-{expansion}", results)
        if expansion > 20:
            raise RuntimeError("Timeline expansion did not terminate")

    page.get_by_role("button", name="Show 3D journey", exact=True).click()
    journey = page.locator("#experience-journey")
    next_stop = journey.get_by_role("button", name="Next", exact=True)
    stop = 0
    scan(page, "journey-stop-0", results)
    while next_stop.is_enabled():
        next_stop.click()
        stop += 1
        scan(page, f"journey-stop-{stop}", results)
        if stop > 30:
            raise RuntimeError("Journey navigation did not terminate")
    page.get_by_role("button", name="Show timeline", exact=True).click()
    scan(page, "journey-closed", results)


def main():
    parser = argparse.ArgumentParser(description="Local production WCAG 2.1 A/AA scan; never submits contact")
    parser.add_argument("--url", required=True)
    parser.add_argument("--browser", required=True, help="Chromium executable path")
    parser.add_argument("--output", required=True)
    parser.add_argument("--base-only", action="store_true")
    arguments = parser.parse_args()
    if urlparse(arguments.url).hostname not in {"127.0.0.1", "localhost", "::1"}:
        parser.error("Only loopback production targets are supported")

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "url": arguments.url,
        "buildId": (ROOT / ".next/BUILD_ID").read_text().strip(),
        "scope": "local only; all POST requests blocked; media/AT/manual checks not verified",
        "configurations": [],
    }
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=arguments.browser, headless=True)
        report["browserVersion"] = browser.version
        fixture = browser.new_page()
        fixture.set_content('<html lang="en"><title>Invalid fixture</title><input><button></button></html>')
        fixture_findings = []
        scan(fixture, "invalid-fixture", fixture_findings)
        identifiers = {rule["id"] for rule in fixture_findings[0]["violations"]}
        if not {"label", "button-name"}.issubset(identifiers):
            raise RuntimeError("Scanner failed to detect deliberately invalid controls")
        report["fixture"] = {"status": "pass", "detected": sorted(identifiers)}
        fixture.close()
        for theme in ("light", "dark"):
            for width in (320, 390, 1280):
                for motion in ("no-preference", "reduce"):
                    configuration = {"theme": theme, "width": width, "motion": motion, "scans": [], "errors": []}
                    report["configurations"].append(configuration)
                    context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion=motion, color_scheme=theme)
                    context.add_init_script(f"localStorage.setItem('theme', '{theme}')")
                    context.route("**/*", lambda route: route.abort() if route.request.method == "POST" else route.continue_())
                    page = context.new_page()
                    try:
                        response = page.goto(arguments.url, wait_until="networkidle")
                        if response is None or not response.ok:
                            raise RuntimeError(f"Production document status: {response.status if response else 'missing'}; {page.locator('body').inner_text()[:500]}")
                        page.locator("#contact").scroll_into_view_if_needed()
                        page.wait_for_timeout(600)
                        scan(page, "hydrated-page", configuration["scans"])
                        configuration["controls"] = page.locator("button, input, textarea").evaluate_all("nodes => nodes.map(node => ({tag: node.tagName, text: node.innerText, name: node.getAttribute('aria-label'), id: node.id, expanded: node.getAttribute('aria-expanded')}))")
                        if width == 320 and motion == "no-preference" and not arguments.base_only:
                            deep_states(page, configuration["scans"])
                    except Exception as error:
                        configuration["errors"].append(str(error))
                        configuration["document"] = {"title": page.title(), "body": page.locator("body").inner_text()[:1000]}
                        print(str(error), flush=True)
                    finally:
                        context.close()
                    print(f"{theme} {width} {motion}: {len(configuration['scans'])} scans, {len(configuration['errors'])} state errors", flush=True)
        browser.close()
    output = Path(arguments.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + "\n")
    findings = sum(len(scan_result["violations"]) for configuration in report["configurations"] for scan_result in configuration["scans"])
    errors = sum(len(configuration["errors"]) for configuration in report["configurations"])
    print(f"Saved {output}: {findings} rule failures, {errors} state errors")
    raise SystemExit(1 if findings or errors else 0)


if __name__ == "__main__":
    main()
