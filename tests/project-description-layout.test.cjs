const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(
    this,
    request.startsWith("@/")
      ? path.join(__dirname, "..", request.slice(2))
      : request,
    parent,
    ...rest,
  );
};
for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = function (module, file) {
    module._compile(
      ts.transpileModule(fs.readFileSync(file, "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      }).outputText,
      file,
    );
  };
}
const {
  createParagraphLayout,
} = require("../lib/project-description-layout.ts");
const metrics = {
  font: "16px Geist",
  letterSpacing: 0,
  lineHeight: 24,
  generation: 0,
};

test("prepare is cached across widths but changes with text and font metrics", () => {
  let calls = 0;
  const layout = createParagraphLayout(
    {
      prepareWithSegments: (text) => {
        calls++;
        return text;
      },
      layoutWithLines: (prepared) => ({
        lines: [{ text: prepared }],
        height: 24,
      }),
    },
    2,
  );
  layout("one", 100, metrics);
  layout("one", 200, metrics);
  assert.equal(calls, 1);
  layout("one", 200, { ...metrics, font: "20px Geist" });
  layout("two", 200, metrics);
  layout("one", 200, metrics);
  assert.equal(calls, 4);
  layout("one", 200, { ...metrics, generation: 1 });
  assert.equal(calls, 5);
  assert.equal(layout("one", 0, metrics), null);
});

test("line materialization preserves source whitespace and unicode", () => {
  for (const text of [
    "Hello  world",
    "日本語 😀 text",
    "مرحبا بالعالم",
    "longunbrokenword",
  ]) {
    const layout = createParagraphLayout({
      prepareWithSegments: (text) => text,
      layoutWithLines: (prepared) => ({
        lines: prepared
          .split(" ")
          .filter(Boolean)
          .map((text) => ({ text })),
        height: 48,
      }),
    });
    assert.equal(layout(text, 100, metrics).lines.join(""), text);
  }
});

test("normalization or synthetic hyphens keep the plain text fallback", () => {
  const layout = createParagraphLayout({
    prepareWithSegments: (text) => text,
    layoutWithLines: () => ({ lines: [{ text: "altered-" }], height: 24 }),
  });
  assert.equal(layout("original", 100, metrics), null);
});

test("server rendering contains complete visible semantic paragraphs", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const Paragraph = require("../components/project-description.tsx").default;
  const html = renderToStaticMarkup(
    React.createElement(Paragraph, {
      text: "Complete paragraph without JavaScript.",
    }),
  );
  assert.match(html, /<p[^>]*data-measured="false"/);
  assert.match(html, />Complete paragraph without JavaScript\.<\/p>/);
  assert.doesNotMatch(html, /hidden|opacity/);
});
