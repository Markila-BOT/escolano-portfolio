"""Verify the real homepage Tools shortcut against a local production build."""
import argparse
from io import BytesIO
import json
from pathlib import Path
import re
from urllib.parse import urljoin

from PIL import Image
from playwright.sync_api import sync_playwright, expect


def luminance(color):
    channels = [value / 255 for value in color[:3]]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
    return sum(value * weight for value, weight in zip(linear, [0.2126, 0.7152, 0.0722]))


def contrast(first, second):
    values = sorted([luminance(first), luminance(second)])
    return (values[1] + 0.05) / (values[0] + 0.05)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:3131/")
    parser.add_argument("--output", default="/tmp/intro-tools-shortcut-evidence.json")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    report = {"buildId": (root / ".next/BUILD_ID").read_text().strip(), "configurations": [], "pageErrors": []}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
        report["browser"] = browser.version
        for theme in ["light", "dark"]:
            for width in [320, 390, 1280]:
                print(f"Checking intro {theme} {width}", flush=True)
                context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                context.add_init_script(f"localStorage.setItem('theme','{theme}')")
                page = context.new_page()
                page.on("pageerror", lambda error: report["pageErrors"].append(str(error)))
                page.goto(args.url)
                page.wait_for_load_state("networkidle")
                shortcut = page.locator('#home a[href="/tools"]')
                expect(shortcut).to_have_count(1)
                expect(shortcut).to_have_accessible_name("Try the free tools")
                paragraph = shortcut.locator("..")
                assert paragraph.inner_text().replace("🛠️", "").replace("\n", " ").strip() == "Something to get done? Try the free tools."
                expect(page.locator('header a[href="/tools"]')).to_have_count(0)
                expect(page.locator('footer a[href="/tools"]')).to_have_count(0)
                assert shortcut.evaluate("element=>getComputedStyle(element).position") not in ["fixed", "absolute"]
                assert shortcut.get_attribute("target") is None
                contact = page.locator('#home a[href="#contact"]')
                contact.focus()
                page.keyboard.press("Tab")
                expect(shortcut).to_be_focused()
                assert shortcut.evaluate("element=>getComputedStyle(element).boxShadow") != "none"
                assert shortcut.evaluate("element=>getComputedStyle(element).textDecorationLine") == "underline"
                for scale in [1, 2]:
                    page.evaluate("scale=>document.documentElement.style.fontSize=`${16*scale}px`", scale)
                    shortcut.scroll_into_view_if_needed()
                    expect(shortcut).to_be_visible()
                    overflow = page.evaluate("""() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('main *')].filter(element=>{const bounds=element.getBoundingClientRect();return bounds.width && bounds.right>innerWidth+1}).slice(0,15).map(element=>({tag:element.tagName,id:element.id,classes:String(element.className),text:element.textContent.slice(0,65),right:element.getBoundingClientRect().right}))})""")
                    if overflow["scrollWidth"] > overflow["width"]:
                        overflow["shortcutBounds"] = shortcut.bounding_box()
                        overflow["widthWithoutShortcut"] = paragraph.evaluate("""element=>{const display=element.style.display;element.style.display='none';const width=document.documentElement.scrollWidth;element.style.display=display;return width}""")
                    assert overflow["scrollWidth"] <= overflow["width"], f"Page overflow at {theme} {width} {scale}: {json.dumps(overflow)}"
                    assert shortcut.evaluate("element=>{const bounds=element.getBoundingClientRect();return bounds.left>=0 && bounds.right<=innerWidth}"), "Shortcut extends outside viewport"
                    if width == 320 and scale == 2:
                        rail = page.locator("#projects").get_by_role("button", name="Rail", exact=True)
                        rail.focus()
                        page.keyboard.press("Enter")
                        expect(rail).to_have_attribute("aria-pressed", "true")
                        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Rail view overflows at enlarged text size"
                        carousel = page.locator("#projects").get_by_role("button", name="Carousel", exact=True)
                        carousel.focus()
                        page.keyboard.press("Enter")
                        expect(carousel).to_have_attribute("aria-pressed", "true")
                        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Carousel view overflows after switching back"
                page.evaluate("document.documentElement.style.fontSize='16px'")
                colors = [element.evaluate("element=>getComputedStyle(element).color") for element in [paragraph, shortcut]]
                style = page.add_style_tag(content="#home > p:last-child,#home > p:last-child a {color:transparent !important;text-decoration:none !important;box-shadow:none !important} #home a[href='/tools'] span,header,body > button {visibility:hidden !important}")
                image = Image.open(BytesIO(paragraph.screenshot())).convert("RGB")
                backgrounds = [color for _, color in image.getcolors(image.width * image.height)]
                ratios = [min(contrast([float(value) for value in re.findall(r'[\d.]+', color)][:3], background) for background in backgrounds) for color in colors]
                style.evaluate("element=>element.remove()")
                assert min(ratios) >= 4.5, f"Shortcut contrast {theme} {width}: {ratios}"
                shortcut.focus()
                page.keyboard.press("Enter")
                page.wait_for_url("**/tools")
                expect(page.get_by_role("heading", name="Tools", exact=True)).to_be_visible()
                if width in [390, 1280]:
                    page.goto(args.url)
                    page.wait_for_load_state("networkidle")
                    page.locator('#home a[href="/tools"]').scroll_into_view_if_needed()
                    page.screenshot(path=f"/tmp/intro-tools-{theme}-{width}.png")
                report["configurations"].append({"theme": theme, "width": width, "motion": "reduce", "textSizes": [100, 200], "promptContrast": round(ratios[0], 3), "linkContrast": round(ratios[1], 3), "keyboardNavigation": "passed"})
                context.close()
        for enabled in [True, False]:
            for width in [390, 1280]:
                context = browser.new_context(viewport={"width": width, "height": 900}, java_script_enabled=enabled, reduced_motion="no-preference")
                page = context.new_page()
                page.goto(args.url)
                page.wait_for_load_state("networkidle")
                shortcut = page.locator('#home a[href="/tools"]')
                expect(shortcut).to_be_visible()
                shortcut.focus()
                page.keyboard.press("Enter")
                page.wait_for_url("**/tools")
                expect(page.get_by_role("heading", name="Tools", exact=True)).to_be_visible()
                context.close()
        report["normalMotionAndNoJavaScript"] = {"widths": [390, 1280], "navigation": "passed"}
        report["emojiFeedback"] = []
        for preference in ["no-preference", "reduce"]:
            context = browser.new_context(viewport={"width": 1280, "height": 900}, reduced_motion=preference)
            page = context.new_page()
            page.goto(args.url)
            page.wait_for_load_state("networkidle")
            link = page.locator('#home a[href="/tools"]')
            emoji = link.locator('[aria-hidden="true"]')
            expect(emoji).to_have_text("🛠️")
            assert emoji.evaluate("e=>getComputedStyle(e).transform") == "none", "Initial emoji motion"
            for interaction in ["hover", "focus"]:
                page.mouse.move(0, 0)
                link.evaluate("e=>e.blur()")
                page.wait_for_timeout(450)
                before = link.bounding_box()
                if interaction == "hover":
                    link.hover()
                else:
                    link.focus()
                samples = []
                for _ in range(6):
                    page.wait_for_timeout(40)
                    samples.append(emoji.evaluate("e=>getComputedStyle(e).transform"))
                moved = any(value not in ["none", "matrix(1, 0, 0, 1, 0, 0)"] for value in samples)
                assert moved == (preference == "no-preference"), (preference, interaction, samples)
                page.wait_for_timeout(500)
                assert emoji.evaluate("e=>getComputedStyle(e).transform") in ["none", "matrix(1, 0, 0, 1, 0, 0)"], "Animation did not settle"
                assert link.bounding_box() == before, "Link hit target moved"
                report["emojiFeedback"].append({"preference": preference, "interaction": interaction, "moved": moved, "settled": True})
            context.close()
        context = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
        page = context.new_page()
        page.goto(args.url)
        page.wait_for_load_state("networkidle")
        page.locator('#home a[href="/tools"]').tap()
        page.wait_for_url("**/tools")
        expect(page.locator('footer a[href="/tools"]')).to_have_count(0)
        report["touchNavigation"] = "passed on first tap"
        context.close()
        assert not report["pageErrors"], report["pageErrors"]
        browser.close()
    Path(args.output).write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
