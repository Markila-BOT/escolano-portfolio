const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(filename, mocks = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", filename), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    require: (request) => {
      if (request in mocks) return mocks[request];
      if (/\.(png|jpe?g|webp)$/.test(request)) return { src: "test-image" };
      return require(request);
    },
  });
  return module.exports;
}

const data = load("lib/data.ts");
const Contact = load("components/contact.tsx", {
  "@/lib/data": data,
  "@/components/observed-section": {
    ObservedSection: ({ id, className, children }) =>
      React.createElement("section", { id, className }, children),
  },
  "@/components/section-heading": { default: "h2", __esModule: true },
  "@/components/contact-form": { default: "form", __esModule: true },
}).default;

test("Contact renders confirmed profiles once with native labeled links before the form", () => {
  const html = renderToStaticMarkup(React.createElement(Contact));
  assert.equal(data.professionalSocialLinks.length, 2);
  for (const [label, destination] of [
    ["GitHub", "https://github.com/Markila-BOT"],
    ["LinkedIn", "https://www.linkedin.com/in/mark-escolano-2715ab129/"],
  ]) {
    const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g);
    const matches = anchors.filter((anchor) =>
      anchor.includes(`href="${destination}"`),
    );
    assert.equal(matches.length, 1);
    assert.ok(matches[0].includes(`aria-label="${label}"`));
    assert.match(matches[0], /<svg[^>]*aria-hidden="true"/);
    assert.ok(!matches[0].endsWith(`>${label}</a>`));
    assert.ok(!matches[0].includes("target="));
    assert.ok(html.indexOf(matches[0]) > html.indexOf("mailto:"));
    assert.ok(html.indexOf(matches[0]) < html.indexOf("<form"));
    assert.match(matches[0], /min-h-\[44px\]/);
    assert.match(matches[0], /min-w-\[44px\]/);
    assert.match(matches[0], /focus-visible:ring-2/);
  }
  assert.ok(html.includes(data.hiringContact.availability));
  assert.ok(html.includes(`href="mailto:${data.hiringContact.email}"`));
  assert.match(html, /flex-wrap/);
});
