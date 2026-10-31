const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(filename, mocks = {}) {
  const testModule = { exports: {} };
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
    module: testModule,
    exports: testModule.exports,
    require: (request) => {
      if (request in mocks) return mocks[request];
      if (/\.(png|jpe?g|webp)$/.test(request)) return { src: "test-image" };
      return require(request);
    },
  });
  return testModule.exports;
}

const data = load("lib/data.ts");
const PersistentActionBar = load("components/persistent-action-bar.tsx", {
  "@/lib/data": data,
  "@/lib/utils": { cn: (...values) => values.filter(Boolean).join(" ") },
}).default;
const Contact = load("components/contact.tsx", {
  "@/lib/data": data,
  "@/components/observed-section": {
    ObservedSection: ({ id, className, children }) =>
      React.createElement("section", { id, className }, children),
  },
  "@/components/section-heading": { default: "h2", __esModule: true },
  "@/components/contact-form": { default: "form", __esModule: true },
}).default;

test("the bar links to the CV site and the confirmed profiles, and Contact keeps its own paths", () => {
  const bar = renderToStaticMarkup(React.createElement(PersistentActionBar));
  const contact = renderToStaticMarkup(React.createElement(Contact));
  const contactForm = fs.readFileSync(
    path.join(__dirname, "..", "components/contact-form.tsx"),
    "utf8",
  );
  const destinations = [
    ["CV", "https://escolano-cv.vercel.app/"],
    ["GitHub", "https://github.com/Markila-BOT"],
    ["LinkedIn", "https://www.linkedin.com/in/mark-escolano-2715ab129/"],
  ];

  for (const [label, href] of destinations) {
    const anchor = bar.match(
      new RegExp(`<a\\b[^>]*href="${href}"[^>]*>[\\s\\S]*?</a>`),
    )?.[0];
    assert.ok(anchor, label);
    assert.match(anchor, new RegExp(`aria-label="${label}"`));
    assert.match(anchor, new RegExp(`>${label}<`));
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noopener noreferrer"/);
    assert.match(anchor, /<svg[^>]*aria-hidden="true"/);
    assert.match(anchor, /h-11/);
    assert.match(anchor, /w-11/);
    assert.match(anchor, /focus-visible:ring-2/);
    assert.match(anchor, /focus-visible:ring-ring/);
    assert.match(anchor, /group-hover:opacity-100/);
    assert.match(anchor, /group-focus-visible:opacity-100/);
  }

  assert.match(bar, /fixed left-1\/2 top-3/);
  assert.match(bar, /sm:left-4/);
  assert.match(bar, /sm:top-1\/2/);
  assert.match(
    fs.readFileSync(path.join(__dirname, "..", "components/header.tsx"), "utf8"),
    /isMenuOpen && !isDesktop \? "hidden"/,
  );
  assert.equal(bar.includes(".pdf"), false);
  assert.equal(
    fs.readFileSync(
      path.join(__dirname, "..", "components/persistent-action-bar.tsx"),
      "utf8",
    ).includes(".pdf"),
    false,
  );

  for (const profile of data.professionalSocialLinks) {
    assert.equal(contact.includes(`href="${profile.href}"`), true);
    assert.equal(contact.includes(`aria-label="${profile.label}"`), true);
  }
  assert.match(contactForm, /<CVButton \/>/);
  assert.match(
    fs.readFileSync(path.join(__dirname, "..", "components/cv.tsx"), "utf8"),
    /https:\/\/escolano-cv\.vercel\.app\//,
  );
});
