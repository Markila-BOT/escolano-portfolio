"""Local production browser checks; requires Python Playwright and installed Chrome."""
import argparse
import json
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright, expect


ROOT = Path(__file__).resolve().parents[1]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def hydrate(page, base):
    page.goto(urljoin(base, "/tools"))
    page.wait_for_load_state("networkidle")
    expect(page.get_by_role("heading", name="Tools", exact=True)).to_be_visible()
    page.get_by_label("Input for JSON formatter", exact=True).fill("{}")
    page.get_by_role("button", name="Format JSON", exact=True).click()
    expect(page.get_by_label("Result for JSON formatter", exact=True)).to_have_value("{}")


def interactions(page):
    json_section = page.locator("#json-formatter")
    json_input = page.locator("#json-formatter-input")
    json_output = page.locator("#json-formatter-output")
    url_section = page.locator("#url-converter")
    counter = page.locator("#text-counter")
    json_input.fill('{"name":"Mark"}')
    json_section.get_by_role("button", name="Format JSON").click()
    expect(json_output).to_have_value('{\n  "name": "Mark"\n}')
    json_input.fill("{")
    expect(json_output).to_have_value("")
    expect(json_section.get_by_role("button", name="Copy result")).to_be_disabled()
    json_section.get_by_role("button", name="Format JSON").click()
    expect(json_input).to_have_value("{")
    expect(json_section.get_by_role("alert")).to_contain_text("Enter valid JSON")
    check(json_input.get_attribute("aria-invalid") == "true", "Invalid state missing")
    check("json-formatter-error" in json_input.get_attribute("aria-describedby"), "Error association missing")
    json_input.fill('"<script>window.unsafe=true</script>"')
    json_section.get_by_role("button", name="Format JSON").click()
    check(page.evaluate("window.unsafe === undefined"), "Markup executed")
    page.locator("#text-counter-input").fill("Hi 👋\n")
    check(counter.locator("dd").all_text_contents() == ["2", "5"], "Wrong Unicode counts")
    page.locator("#url-converter-input").fill("a b+&")
    url_section.get_by_role("button", name="Encode component").click()
    expect(page.locator("#url-converter-output")).to_have_value("a%20b%2B%26")
    page.locator("#url-converter-input").fill("%ZZ")
    url_section.get_by_role("button", name="Decode component").click()
    expect(url_section.get_by_role("alert")).to_contain_text("percent-encoded")
    page.locator("#url-converter-input").fill("")
    url_section.get_by_role("button", name="Decode component").click()
    expect(url_section.get_by_role("button", name="Copy result")).to_be_enabled()
    json_input.fill('"' + "x" * 99998 + '"')
    json_section.get_by_role("button", name="Format JSON").click()
    check(len(json_output.input_value()) == 100000, "Boundary JSON failed")
    json_input.fill("x" * 100001)
    check(len(json_input.input_value()) == 100000, "Oversized change replaced accepted input")
    expect(json_section.get_by_role("alert")).to_contain_text("previous input")
    json_section.get_by_role("button", name="Reset", exact=True).click()
    expect(json_input).to_have_value("")
    expect(json_section.get_by_role("button", name="Reset", exact=True)).to_be_focused()
    check(counter.locator("dd").all_text_contents() == ["2", "5"], "Reset cleared another utility")
    json_input.fill("{}")
    json_input.focus()
    page.keyboard.press("Tab")
    expect(json_section.get_by_role("button", name="Format JSON")).to_be_focused()
    page.keyboard.press("Enter")
    expect(json_output).to_have_value("{}")
    page.keyboard.press("Tab")
    expect(json_section.get_by_role("button", name="Reset", exact=True)).to_be_focused()
    page.keyboard.press("Tab")
    expect(json_output).to_be_focused()
    page.keyboard.press("Tab")
    expect(json_section.get_by_role("button", name="Copy result")).to_be_focused()
    page.keyboard.press("Enter")
    expect(json_section.get_by_role("status")).to_have_text("Result copied.")
    expect(json_section.get_by_role("button", name="Copy result")).to_be_focused()
    for mode in ["denied", "missing"]:
        page.evaluate("""mode => Object.defineProperty(navigator, 'clipboard', {configurable:true, value:mode === 'missing' ? undefined : {writeText:async()=>{throw new Error('Denied')}}})""", mode)
        json_section.get_by_role("button", name="Copy result").click()
        expect(json_section.get_by_role("status")).to_contain_text("Copy unavailable")
        expect(json_output).to_have_value("{}")
    page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async()=>{}}})")


def privacy(page, context, base):
    marker = "TOOLS_PRIVATE_SENTINEL_20261030"
    requests, messages = [], []
    page.on("request", lambda request: requests.append(request.url + (request.post_data or "")))
    page.on("console", lambda message: messages.append(message.text))
    context.set_offline(True)
    page.locator("#json-formatter-input").fill(json.dumps({"text": marker}))
    page.get_by_role("button", name="Format JSON").click()
    check(marker in page.locator("#json-formatter-output").input_value(), "Offline JSON transformation failed")
    page.locator("#text-counter-input").fill(marker)
    page.locator("#url-converter-input").fill(marker)
    page.get_by_role("button", name="Encode component").click()
    check(marker not in page.url, "Input leaked into URL")
    snapshot = page.evaluate("""async () => ({local:{...localStorage},session:{...sessionStorage},history:history.state, databases:await indexedDB.databases()})""")
    check(marker not in json.dumps(snapshot), "Input persisted")
    check(not snapshot["databases"], "Unexpected IndexedDB database in fresh context")
    check(all(marker not in item for item in requests + messages), "Input transmitted or logged")
    context.set_offline(False)
    page.reload()
    page.wait_for_load_state("networkidle")
    for identifier in ["json-formatter", "text-counter", "url-converter"]:
        expect(page.locator(f"#{identifier}-input")).to_have_value("")
    return {"markerAbsent": True, "offlineTransforms": True, "reloadEmpty": True, "indexedDbDatabases": snapshot["databases"]}


def navigation(page, base, width):
    page.goto(urljoin(base, "/tools"))
    page.wait_for_load_state("networkidle")
    page.locator('nav[aria-label="Tools directory"] a[href="#json-formatter"]').click()
    check(page.url.endswith("#json-formatter"), "Directory anchor failed")
    page.goto(urljoin(base, "/tools"))
    page.keyboard.press("Tab")
    expect(page.get_by_role("link", name="Skip to main content")).to_be_focused()
    page.keyboard.press("Enter")
    expect(page.locator("main")).to_be_focused()
    if width < 960:
        page.get_by_role("button", name="Open menu").click()
        expect(page.get_by_role("button", name="Close menu")).to_be_focused()
        last_link = page.get_by_role("dialog").locator("a").last
        last_link.focus()
        page.keyboard.press("Tab")
        expect(page.get_by_role("button", name="Close menu")).to_be_focused()
        page.keyboard.press("Shift+Tab")
        expect(last_link).to_be_focused()
        page.keyboard.press("Escape")
        expect(page.get_by_role("button", name="Open menu")).to_be_focused()
        page.get_by_role("button", name="Open menu").click()
        page.set_viewport_size({"width": 1280, "height": 900})
        expect(page.get_by_role("dialog")).to_have_count(0)
        check(page.locator("header nav a:focus").count() == 1, "Breakpoint focus not restored")
        page.set_viewport_size({"width": width, "height": 900})
        page.get_by_role("button", name="Open menu").click()
        page.get_by_role("dialog").get_by_role("link", name="About", exact=True).click()
    else:
        page.locator("header").get_by_role("link", name="About", exact=True).click()
    page.wait_for_url("**/#about")
    expect(page.locator("#about")).to_be_visible()
    expect(page.locator('footer a[href="/tools"]')).to_have_count(0)
    page.locator('#home a[href="/tools"]').focus()
    page.keyboard.press("Enter")
    page.wait_for_url("**/tools")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:3131/")
    parser.add_argument("--output", default="/tmp/browser-tools-evidence.json")
    args = parser.parse_args()
    report = {"configurations": [], "screenReader": "Native VoiceOver announcement quality unverified", "buildId": (ROOT / ".next/BUILD_ID").read_text().strip(), "pageErrors": []}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=CHROME, headless=True)
        report["browser"] = browser.version
        for theme in ["light", "dark"]:
            for width in [320, 390, 1280]:
                print(f"Checking {theme} {width}", flush=True)
                context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce", permissions=["clipboard-read", "clipboard-write"])
                context.add_init_script(f"localStorage.setItem('theme', '{theme}')")
                page = context.new_page()
                page.on("pageerror", lambda error: report["pageErrors"].append(str(error)))
                hydrate(page, args.url)
                if width == 1280 and theme == "light":
                    interactions(page)
                    report["interactions"] = "Formatting, correction, Unicode counts, URL conversion, empty output, input limit, independent reset, keyboard traversal and clipboard granted/denied/missing passed"
                    report["privacy"] = privacy(page, context, args.url)
                navigation(page, args.url, width)
                page.add_script_tag(path=str(ROOT / "node_modules/axe-core/axe.min.js"))
                audit = page.evaluate("""async () => {const result=await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:result.violations,incomplete:result.incomplete.map(item=>({id:item.id,targets:item.nodes.map(node=>node.target)}))}}""")
                check(not audit["violations"], f"axe violations: {json.dumps(audit['violations'])}")
                for scale in [1, 2]:
                    page.evaluate("scale => document.documentElement.style.fontSize = `${16*scale}px`", scale)
                    page.locator("#json-formatter-input").fill('"' + "x" * 99998 + '"')
                    page.get_by_role("button", name="Format JSON").click()
                    overflow = page.evaluate("""() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('body *')].filter(element=>{const rect=element.getBoundingClientRect();return rect.width && rect.right > innerWidth+1}).slice(0,12).map(element=>({tag:element.tagName,id:element.id,text:element.textContent.slice(0,45),right:element.getBoundingClientRect().right}))})""")
                    if overflow["scrollWidth"] > overflow["width"]:
                        page.screenshot(path="/tmp/tools-overflow.png", full_page=True)
                        overflow["containers"] = page.evaluate("""() => [...document.querySelectorAll('html,body,body *')].filter(element=>element.scrollWidth>element.clientWidth+1 && element.clientWidth>0).map(element=>({tag:element.tagName,id:element.id,classes:String(element.className),scroll:element.scrollWidth,client:element.clientWidth,overflow:getComputedStyle(element).overflow,position:getComputedStyle(element).position,rect:element.getBoundingClientRect().toJSON()}))""")
                    check(overflow["scrollWidth"] <= overflow["width"], f"Page overflow {theme} {width} scale {scale}: {json.dumps(overflow)}")
                page.evaluate("document.documentElement.style.fontSize = '16px'")
                page.locator("#json-formatter").get_by_role("button", name="Reset", exact=True).click()
                if width in [390, 1280]:
                    page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
                    page.screenshot(path=f"/tmp/tools-{theme}-{width}.png")
                report["configurations"].append({"theme": theme, "width": width, "motion": "reduce", "textZoom": [100, 200], "axe": audit, "navigation": "passed"})
                context.close()
        for width in [390, 1280]:
            context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="no-preference")
            page = context.new_page()
            page.on("pageerror", lambda error: report["pageErrors"].append(str(error)))
            hydrate(page, args.url)
            navigation(page, args.url, width)
            report["configurations"].append({"theme": "light", "width": width, "motion": "no-preference", "navigation": "passed", "formatting": "passed"})
            context.close()
        context = browser.new_context(viewport={"width": 390, "height": 900}, java_script_enabled=False)
        page = context.new_page()
        page.goto(urljoin(args.url, "/tools"))
        expect(page.locator("noscript p")).to_be_visible()
        check("Enable JavaScript to use the tools." in page.locator("noscript").inner_text(), "No-JS guidance missing")
        page.locator('nav[aria-label="Tools directory"] a[href="#json-formatter"]').click()
        check(page.url.endswith("#json-formatter"), "No-JS anchors failed")
        page.goto(urljoin(args.url, "/tools"))
        page.keyboard.press("Tab")
        page.keyboard.press("Enter")
        expect(page.locator("main")).to_be_focused()
        page.locator('noscript a[href="/#home"]').click()
        check(page.url.endswith("/#home"), "No-JS return failed")
        context.close()
        report["noJavaScript"] = "passed"
        check(not report["pageErrors"], f"Browser exceptions: {report['pageErrors']}")
        browser.close()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(f"PASS: Tools interaction, privacy, navigation and accessibility checks. Evidence: {args.output}")


if __name__ == "__main__":
    main()
