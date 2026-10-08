const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const React = require("react");

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../actions/sendEmail.ts"), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  },
).outputText;
const settings = {
  RESEND_API_KEY: "test-key-not-a-real-credential",
  CONTACT_EMAIL_FROM: "Contact Form <onboarding@resend.dev>",
  CONTACT_EMAIL_TO: "owner@example.com",
};

function loadAction(
  env = settings,
  response = { data: { id: "message-id" }, error: null },
) {
  const calls = [];
  const constructors = [];
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    process: { env },
    require(name) {
      if (name === "react")
        return { createElement: (component, props) => ({ component, props }) };
      if (name === "@/email/contact-form-email")
        return { default: "EmailTemplate", __esModule: true };
      if (name === "@/lib/utils")
        return {
          validateString: (value, maximum) =>
            typeof value === "string" &&
            Boolean(value) &&
            value.length <= maximum,
        };
      if (name === "resend")
        return {
          Resend: class {
            constructor(key) {
              constructors.push(key);
              this.emails = {
                send: async (payload) => {
                  calls.push(payload);
                  if (response instanceof Error) throw response;
                  return response;
                },
              };
            }
          },
        };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return { sendEmail: exports.sendEmail, calls, constructors };
}

function submission(email = "visitor@example.com", message = "Hello") {
  const fields = new Map([
    ["senderEmail", email],
    ["message", message],
    ["from", "attacker@example.com"],
    ["to", "attacker@example.com"],
  ]);
  return { get: (name) => fields.get(name) };
}

test("missing and malformed configuration fails without constructing the client", async () => {
  for (const env of [
    {},
    ...Object.keys(settings).map((key) => ({ ...settings, [key]: " " })),
    { ...settings, CONTACT_EMAIL_FROM: "bad" },
    { ...settings, CONTACT_EMAIL_TO: "bad" },
    {
      ...settings,
      CONTACT_EMAIL_FROM: "Name\r\nBcc: other@example.com <owner@example.com>",
    },
  ]) {
    const action = loadAction(env);
    assert.equal(action.constructors.length, 0);
    assert.ok((await action.sendEmail(submission())).error);
    assert.equal(action.constructors.length, 0);
  }
});

test("invalid inputs never attempt delivery", async () => {
  for (const [email, message] of [
    [null, "Hello"],
    [{}, "Hello"],
    ["bad", "Hello"],
    ["visitor\n@example.com", "Hello"],
    ["x".repeat(501), "Hello"],
    ["visitor@example.com", null],
    ["visitor@example.com", {}],
    ["visitor@example.com", "  \n"],
    ["visitor@example.com", "x".repeat(5001)],
  ]) {
    const action = loadAction();
    assert.ok((await action.sendEmail(submission(email, message))).error);
    assert.equal(action.calls.length, 0);
  }
});

test("valid limits preserve message, Reply-To, and server addresses", async () => {
  const email = `${"x".repeat(488)}@example.com`;
  assert.equal(email.length, 500);
  const message = "x".repeat(5000);
  const action = loadAction();
  const result = await action.sendEmail(submission(email, message));
  assert.equal(result.data.id, "message-id");
  assert.deepEqual(Object.keys(result.data), ["id"]);
  assert.equal(action.calls[0].from, settings.CONTACT_EMAIL_FROM);
  assert.equal(action.calls[0].to, settings.CONTACT_EMAIL_TO);
  assert.equal(action.calls[0].replyTo, email);
  assert.equal(action.calls[0].react.props.message, message);
});

test("rejections, exceptions, and malformed responses never report success or leak details", async () => {
  for (const response of [
    { data: null, error: { message: "private-provider-detail" } },
    new Error("private-provider-detail"),
    { data: null, error: null },
    { data: { id: " " }, error: null },
    { data: { id: 123 }, error: null },
    { data: { id: "id" }, error: { message: "private-provider-detail" } },
    null,
  ]) {
    const result = await loadAction(settings, response).sendEmail(submission());
    assert.ok(result.error);
    assert.equal(result.data, undefined);
    assert.ok(!result.error.includes("private-provider-detail"));
  }
});

test("form routes accepted and rejected submissions to matching feedback and opt-in cues", async () => {
  const formSource = ts.transpileModule(
    fs.readFileSync(
      path.join(__dirname, "../components/contact-form.tsx"),
      "utf8",
    ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
        esModuleInterop: true,
      },
    },
  ).outputText;
  for (const soundEnabled of [false, true]) {
    for (const outcome of [
      { data: { id: "id" } },
      { error: "Unable to send" },
    ]) {
      const feedback = [];
      const cues = [];
      const exports = {};
      let resolveSubmission;
      vm.runInNewContext(formSource, {
        exports,
        require(name) {
          if (name === "react") return React;
          if (name === "@/lib/data")
            return {
              contactFormFeedback: {
                accepted: "Your message was accepted for sending.",
              },
            };
          if (name === "@/actions/sendEmail")
            return {
              sendEmail: () =>
                new Promise((resolve) => {
                  resolveSubmission = resolve;
                }),
            };
          if (name === "react-hot-toast")
            return {
              success: (text) => feedback.push(["success", text]),
              error: (text) => feedback.push(["error", text]),
            };
          if (name === "@/context/sound-context")
            return {
              useSoundContext: () => ({
                playCue: (cue) => {
                  if (soundEnabled) cues.push(cue);
                },
              }),
            };
          if (name === "@/components/ui/field") return { Field: "input" };
          if (name === "./submit-btn" || name === "./cv")
            return { default: "button", __esModule: true };
          throw new Error(`Unexpected import: ${name}`);
        },
      });
      const form = exports.default();
      const fields = submission();
      const completion = form.props.action(fields);
      assert.equal(feedback.length, 0);
      resolveSubmission(outcome);
      await completion;
      const expected = outcome.error ? "error" : "success";
      assert.equal(feedback[0][0], expected);
      assert.deepEqual(cues, soundEnabled ? [expected] : []);
      assert.equal(fields.get("message"), "Hello");
      if (!outcome.error) assert.match(feedback[0][1], /accepted for sending/);
    }
  }
});
