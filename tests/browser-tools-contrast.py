"""Supplement axe's gradient-background incompletes using rendered background pixels."""
import argparse
from io import BytesIO
import json
from pathlib import Path
import re

from PIL import Image
from playwright.sync_api import sync_playwright, expect


def luminance(color):
    channels = [value / 255 for value in color[:3]]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
    return sum(value * weight for value, weight in zip(linear, [0.2126, 0.7152, 0.0722]))


def ratio(first, second):
    values = sorted([luminance(first), luminance(second)])
    return (values[1] + 0.05) / (values[0] + 0.05)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:3131/tools")
    parser.add_argument("--output", default="/tmp/browser-tools-contrast.json")
    args = parser.parse_args()
    report = {"method": "Computed foreground against rendered background pixel colors with text temporarily transparent; normal text >=4.5:1, input boundaries >=3:1", "configurations": []}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
        for theme in ["light", "dark"]:
            for width in [320, 390, 1280]:
                print(f"Measuring {theme} {width}", flush=True)
                context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                context.add_init_script(f"localStorage.setItem('theme','{theme}')")
                page = context.new_page()
                page.goto(args.url)
                page.wait_for_load_state("networkidle")
                page.locator("#json-formatter-input").fill("{}")
                page.get_by_role("button", name="Format JSON").click()
                elements = page.locator("main h1,main h2,main p,main label,main dt,main dd,main nav span,main button:not(:disabled),main textarea")
                originals = elements.evaluate_all("""elements=>elements.map(element=>({color:getComputedStyle(element).color,placeholder:getComputedStyle(element,'::placeholder').color,background:getComputedStyle(element).backgroundColor,border:getComputedStyle(element).borderTopColor,isInput:element.tagName==='TEXTAREA',hasText:Boolean(element.textContent.trim()) || element.tagName==='TEXTAREA'}))""")
                page.add_style_tag(content="main * {color:transparent !important; text-shadow:none !important; text-decoration:none !important} main textarea::placeholder {color:transparent !important} header,body > button {visibility:hidden !important}")
                minimum = 100
                boundary_minimum = 100
                worst = None
                for index, original in enumerate(originals):
                    if not original["hasText"]:
                        continue
                    element = elements.nth(index)
                    image = Image.open(BytesIO(element.screenshot())).convert("RGB")
                    inset = 12 if original["isInput"] else 8 if element.evaluate("element=>element.tagName==='BUTTON'") else 0
                    if inset and image.width > inset * 2 and image.height > inset * 2:
                        image = image.crop((inset, inset, image.width - inset, image.height - inset))
                    foreground = [float(value) for value in re.findall(r"[\d.]+", original["color"])][:3]
                    colors = [color for _, color in image.getcolors(image.width * image.height)]
                    measured = min(ratio(foreground, color) for color in colors)
                    if measured < minimum:
                        worst = {"index": index, "element": element.evaluate("element=>element.outerHTML.slice(0,150)"), "foreground": foreground, "background": min(colors, key=lambda color: ratio(foreground, color))}
                    minimum = min(minimum, measured)
                    if original["isInput"]:
                        placeholder = [float(value) for value in re.findall(r"[\d.]+", original["placeholder"])][:3]
                        minimum = min(minimum, min(ratio(placeholder, color) for color in colors))
                        border = [float(value) for value in re.findall(r"[\d.]+", original["border"])][:3]
                        boundary_minimum = min(boundary_minimum, min(ratio(border, color) for color in colors))
                assert minimum >= 4.5, f"Text contrast {theme} {width}: {minimum} {worst}"
                assert boundary_minimum >= 3, f"Input boundary contrast {theme} {width}: {boundary_minimum}"
                report["configurations"].append({"theme": theme, "width": width, "minimumTextContrast": round(minimum, 3), "minimumInputBoundaryContrast": round(boundary_minimum, 3)})
                context.close()
        Path(args.output).write_text(json.dumps(report, indent=2) + "\n")
        for width in [390, 1280]:
            context = browser.new_context(viewport={"width": width, "height": 900}, java_script_enabled=False)
            page = context.new_page()
            page.goto(args.url)
            expect(page.locator("noscript p")).to_be_visible()
            page.locator('nav[aria-label="Tools directory"] a[href="#json-formatter"]').click()
            assert page.url.endswith("#json-formatter")
            page.goto(args.url)
            page.keyboard.press("Tab")
            page.keyboard.press("Enter")
            expect(page.locator("main")).to_be_focused()
            page.locator('noscript a[href="/#home"]').focus()
            page.keyboard.press("Enter")
            page.wait_for_url("**/#home")
            assert page.url.endswith("/#home")
            context.close()
        report["noJavaScriptWidths"] = [390, 1280]
        browser.close()
    Path(args.output).write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
