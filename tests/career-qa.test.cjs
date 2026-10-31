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
const Questions = load("components/questions.tsx", {
  "@/lib/data": data,
  "@/components/section-heading": { default: "h2", __esModule: true },
}).default;

test("Questions restates the three existing sentences and adds no form, chat field, or email", () => {
  const html = renderToStaticMarkup(React.createElement(Questions));
  assert.match(html, /<h2[^>]*>Questions<\/h2>/);
  const answers = [
    data.hiringContact.availability,
    data.aboutWorkflow,
    data.introCallToAction.positioning,
  ];
  for (const answer of answers) {
    assert.equal(html.split(answer).length - 1, 1);
  }
  const details = html.match(/<details\b[^>]*>/g);
  assert.equal(details.length, 3);
  for (const element of details) {
    assert.equal(element.includes("open"), false);
    assert.equal(/\bname=/.test(element), false);
  }
  for (const prompt of data.careerQuestions.map((question) => question.prompt)) {
    assert.ok(html.includes(`>${prompt}</summary>`));
  }
  assert.equal(html.includes("<form"), false);
  assert.equal(html.includes("<input"), false);
  assert.equal(html.includes("<textarea"), false);
  assert.equal(html.includes(data.hiringContact.email), false);
  assert.equal(html.includes("mailto:"), false);
  assert.equal(html.includes(data.careerQuestionsLead), true);
});

test("Questions sits between Experience and Contact", () => {
  const page = fs.readFileSync(
    path.join(__dirname, "..", "app/page.tsx"),
    "utf8",
  );
  const experience = page.indexOf("<Experience");
  const questions = page.indexOf("<Questions");
  const contact = page.indexOf("<Contact");
  assert.ok(experience !== -1 && questions !== -1 && contact !== -1);
  assert.ok(experience < questions && questions < contact);
});
