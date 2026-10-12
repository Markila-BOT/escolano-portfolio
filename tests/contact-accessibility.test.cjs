const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function loadComponent(filename, imports) {
  const exports = {};
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", filename), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
  ).outputText;
  vm.runInNewContext(source, {
    exports,
    require(name) {
      if (Object.hasOwn(imports, name)) return imports[name];
      if (name === "react" || name === "react/jsx-runtime") return require(name);
      throw new Error(`Unexpected import ${name}`);
    },
  });
  return exports;
}

const field = loadComponent("components/ui/field.tsx", {
  "@/lib/utils": { cn: (...classes) => classes.filter(Boolean).join(" ") },
  "@/components/ui/label": { Label: "label" },
}).Field;

test("both contact fields have persistent associated labels and correction instructions", () => {
  for (const multiline of [false, true]) {
    const markup = renderToStaticMarkup(React.createElement(field, {
      id: multiline ? "message" : "email",
      name: multiline ? "message" : "senderEmail",
      label: multiline ? "Your message" : "Your email",
      description: "Correction guidance",
      required: true,
      multiline,
      autoComplete: multiline ? undefined : "email",
      type: "email",
    }));
    const identifier = multiline ? "message" : "email";
    assert.match(markup, new RegExp(`<label for="${identifier}">Your .+? \\(required\\)</label>`));
    assert.match(markup, new RegExp(`aria-describedby="${identifier}-description"`));
    assert.match(markup, /Correction guidance/);
    assert.match(markup, /required=""/);
    if (!multiline) assert.match(markup, /autoComplete="email"/);
  }
});

test("submission remains named and decorative while pending", () => {
  for (const pending of [false, true]) {
    const SubmitBtn = loadComponent("components/submit-btn.tsx", {
      "react-dom": { useFormStatus: () => ({ pending }) },
      "@/components/ui/button": { Button: ({ variant: _variant, ...props }) => React.createElement("button", props) },
      "react-icons/fa": { FaPaperPlane: "svg" },
    }).default;
    const markup = renderToStaticMarkup(React.createElement(SubmitBtn));
    assert.match(markup, pending ? /Submitting message…/ : /Submit/);
    assert.match(markup, /aria-hidden="true"/);
    assert.match(markup, new RegExp(`aria-busy="${pending}"`));
    if (pending) assert.match(markup, /disabled=""/);
  }
});

test("safe action fixtures announce outcomes and retain entered values on failure", async () => {
  for (const outcome of [{ error: "Unable to send. Try again later." }, { data: { id: "fixture-id" } }]) {
    const state = [];
    const calls = [];
    let stateIndex = 0;
    const ContactForm = loadComponent("components/contact-form.tsx", {
      react: { ...React, useState(initial) {
        const index = stateIndex++;
        if (state[index] === undefined) state[index] = initial;
        return [state[index], (value) => { state[index] = value; }];
      } },
      "@/actions/sendEmail": { sendEmail: async (data) => { calls.push(data); return outcome; } },
      "./submit-btn": { __esModule: true, default: "button" },
      "./cv": { __esModule: true, default: "button" },
      "react-hot-toast": { __esModule: true, default: { error() {}, success() {} } },
      "@/components/ui/field": { Field: field },
      "@/context/sound-context": { useSoundContext: () => ({ playCue() {} }) },
      "@/lib/data": { contactFormFeedback: { accepted: "Message accepted." } },
    }).default;
    let form = ContactForm();
    const fields = React.Children.toArray(form.props.children).filter((child) => child.type === field);
    fields[0].props.onChange({ target: { value: "visitor@example.com" } });
    fields[1].props.onChange({ target: { value: "Keep this message" } });
    const fixture = { get: (name) => name === "senderEmail" ? state[0] : state[1] };
    await form.props.action(fixture);
    stateIndex = 0;
    form = ContactForm();
    const updatedFields = React.Children.toArray(form.props.children).filter((child) => child.type === field);
    assert.equal(calls.length, 1);
    assert.equal(updatedFields[0].props.autoComplete, "email");
    assert.equal(updatedFields[0].props.value, "visitor@example.com");
    assert.equal(updatedFields[1].props.value, "Keep this message");
    const status = React.Children.toArray(form.props.children).find((child) => child.props.role === "status");
    assert.equal(status.props.children, outcome.error ?? "Message accepted.");
    assert.equal(status.props["aria-atomic"], "true");
  }
});

test("drawer uses one page h1, decorative tag icons and a visibly focusable scroll region", () => {
  const source = fs.readFileSync(path.join(__dirname, "../components/project-details-drawer.tsx"), "utf8");
  assert.doesNotMatch(source, /<h1\b/);
  assert.match(source, /<span aria-hidden="true">\{tag.icon\}<\/span>/);
  assert.match(source, /ref=\{detailsRef\}\s+tabIndex=\{0\}/);
  assert.match(source, /focus-visible:outline-ring/);
});
