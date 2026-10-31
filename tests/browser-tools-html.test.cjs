const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const assert = require("node:assert/strict");
const { test } = require("node:test");

function load(filename, mocks = {}, globals = {}) {
  const exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(compiled, {
    exports,
    require: (name) =>
      Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    URL,
    ...globals,
  });
  return exports;
}

const data = load("lib/browser-tools-data.ts");
const logic = load("lib/browser-tools.ts");
const seo = load("lib/seo.ts");
const BrowserTool = load("components/browser-tool.tsx", {
  "@/lib/utils": load("lib/utils.ts"),
  "@/components/ui/button": { Button: "button" },
  "@/components/ui/label": { Label: "label" },
  "@/lib/browser-tools": logic,
}).default;
const page = load("app/tools/page.tsx", {
  "@/components/browser-tool": { __esModule: true, default: BrowserTool },
  "@/lib/browser-tools-data": data,
  "@/lib/seo": seo,
});

test("Tools server markup includes landmarks, anchors, labels and no-JavaScript guidance", () => {
  const markup = renderToStaticMarkup(React.createElement(page.default));
  assert.equal((markup.match(/<main\b/g) || []).length, 1);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.match(markup, /id="main-content" tabindex="-1"/);
  assert.match(markup, /<noscript>.*Enable JavaScript/s);
  for (const tool of data.browserTools) {
    assert(markup.includes(`href="#${tool.id}"`));
    assert(markup.includes(`id="${tool.id}"`));
    assert(markup.includes(`for="${tool.id}-input"`));
    assert(markup.includes(`aria-describedby="${tool.id}-guidance"`));
  }
  assert.equal((markup.match(/role="status"/g) || []).length, 3);
  assert.equal((markup.match(/role="alert"/g) || []).length, 3);
  assert.doesNotMatch(markup, /maxlength=/i);
});

test("Tools metadata overrides inherited homepage identity without changing origin", () => {
  assert.equal(
    page.metadata.alternates.canonical,
    seo.portfolioIdentity.url + "tools",
  );
  assert.equal(page.metadata.openGraph.url, page.metadata.alternates.canonical);
  assert.equal(page.metadata.title, data.browserToolsIdentity.title);
  assert.equal(page.metadata.twitter.title, data.browserToolsIdentity.title);
  assert.equal(
    page.metadata.openGraph.images[0].url,
    seo.portfolioShareImage.url,
  );
});

test("sitemap exposes the homepage, tools, and writing", () => {
  const sitemap = load("app/sitemap.ts", {
    "@/lib/seo": seo,
    "@/lib/writing-posts": { listPublishedWritingPosts: () => [] },
  }).default();
  assert.deepEqual(
    Array.from(sitemap, (entry) => entry.url),
    [
      seo.portfolioIdentity.url,
      seo.portfolioIdentity.url + "tools",
      seo.writingUrl,
    ],
  );
});
