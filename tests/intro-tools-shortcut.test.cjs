const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const assert = require("node:assert/strict");
const { test } = require("node:test");

function load(source, mocks = {}) {
  const exports = {};
  const compiled = ts.transpileModule(source, {
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
  });
  return exports;
}

test("Intro renders the approved Tools sentence after hiring preferences with a native link", () => {
  const dataSource = fs.readFileSync("lib/data.ts", "utf8");
  const copy = load(
    ["introCallToAction", "hiringContact"]
      .map((name) => {
        const match = dataSource.match(
          new RegExp(`export const ${name} = [\\s\\S]*? as const;`),
        );
        assert(match, `Missing ${name}`);
        return match[0];
      })
      .join("\n"),
  );
  const Intro = load(fs.readFileSync("components/intro.tsx", "utf8"), {
    "next/image": () => null,
    "@/public/profile.png": { src: "/profile.png" },
    "@/components/observed-section": {
      ObservedSection: ({ children }) =>
        React.createElement("section", { id: "home" }, children),
    },
    "@/components/intro-greeting": { __esModule: true, default: () => null },
    "@/components/intro-tools-link": {
      __esModule: true,
      default: load(fs.readFileSync("components/intro-tools-link.tsx", "utf8"))
        .default,
    },
    "@/components/intro-contact-link": {
      IntroContactLink: ({ children }) =>
        React.createElement("a", { href: "#contact" }, children),
    },
    "@/lib/data": copy,
  }).default;
  const markup = renderToStaticMarkup(React.createElement(Intro));
  assert.equal(copy.introCallToAction.toolsPrompt, "Something to get done?");
  assert.equal(copy.introCallToAction.toolsLabel, "Try the free tools");
  assert.match(
    markup,
    /Something to get done\? <a[^>]*><span aria-hidden="true"[^>]*>🛠️<\/span>Try the free tools<\/a>\./,
  );
  assert.equal((markup.match(/href="\/tools"/g) || []).length, 1);
  assert.equal((markup.match(/href="#contact"/g) || []).length, 1);
  assert(
    markup.indexOf('href="#contact"') <
      markup.indexOf(copy.hiringContact.availability),
  );
  assert(
    markup.indexOf(copy.hiringContact.availability) <
      markup.indexOf('href="/tools"'),
  );
  assert(markup.includes(copy.introCallToAction.positioning));
  const anchor = markup.match(/<a href="\/tools"[^>]*>/)[0];
  assert.doesNotMatch(anchor, /target=|aria-label=|onclick=/i);
  assert.match(anchor, /focus-visible:ring-2/);
  assert.match(anchor, /underline/);
  assert.doesNotMatch(
    fs.readFileSync("components/intro.tsx", "utf8"),
    /use client/,
  );
});
