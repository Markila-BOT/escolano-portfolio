const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const assert = require("node:assert/strict");
const { test } = require("node:test");

const compiled = ts.transpileModule(
  fs.readFileSync("lib/browser-tools.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  },
).outputText;
const moduleUnderTest = { exports: {} };
vm.runInNewContext(compiled, { exports: moduleUnderTest.exports });
const {
  formatJson,
  countText,
  convertUrlComponent,
  toolInputLimit,
  isToolInputWithinLimit,
} = moduleUnderTest.exports;

test("JSON formatting handles objects, scalars and text without executing markup", () => {
  for (const input of [
    '{"name":"Mark","active":true}',
    "null",
    "42",
    "true",
    '"<script>alert(1)</script>"',
    "[1,2]",
  ]) {
    const result = formatJson(input);
    assert.equal(result.success, true);
    assert.equal(result.output, JSON.stringify(JSON.parse(input), null, 2));
  }
});

test("JSON failures are safe and normalization follows JavaScript parsing", () => {
  for (const input of ["", " ", "{", '{"secret": nope}', "undefined"]) {
    const result = formatJson(input);
    assert.equal(result.success, false);
    assert.equal(result.output, undefined);
    assert(!result.error.includes("secret"));
  }
  assert.equal(formatJson('{"a":1,"a":2}').output, '{\n  "a": 2\n}');
  assert.equal(formatJson("9007199254740993").output, "9007199254740992");
});

test("counts use whitespace words and Unicode code points, not graphemes", () => {
  for (const [input, words, characters] of [
    ["", 0, 0],
    [" \t\n", 0, 3],
    ["Hi 👋\n", 2, 5],
    ["e\u0301", 1, 2],
    ["one\u2003two", 2, 7],
  ]) {
    assert.equal(countText(input).words, words);
    assert.equal(countText(input).characters, characters);
  }
});

test("URL components round trip and preserve plus signs and empty results", () => {
  assert.equal(convertUrlComponent("a b+&", "encode").output, "a%20b%2B%26");
  assert.equal(convertUrlComponent("a%20b%2B%26", "decode").output, "a b+&");
  assert.equal(convertUrlComponent("a+b", "decode").output, "a+b");
  for (const input of ["", "👋", "https://example.com/?a=1&b=2"]) {
    const encoded = convertUrlComponent(input, "encode");
    assert.equal(encoded.success, true);
    assert.equal(convertUrlComponent(encoded.output, "decode").output, input);
  }
});

test("URL failures handle malformed escapes, UTF-8 and surrogates", () => {
  for (const input of ["%ZZ", "%", "%E0%A4", "%ED%A0%80"]) {
    assert.equal(convertUrlComponent(input, "decode").success, false);
  }
  assert.equal(convertUrlComponent("\ud800", "encode").success, false);
});

test("shared limit uses UTF-16 units and transformations enforce its boundary", () => {
  assert.equal(isToolInputWithinLimit("a".repeat(toolInputLimit)), true);
  assert.equal(isToolInputWithinLimit("a".repeat(toolInputLimit + 1)), false);
  assert.equal(isToolInputWithinLimit("👋".repeat(toolInputLimit / 2)), true);
  assert.equal(
    isToolInputWithinLimit("👋".repeat(toolInputLimit / 2 + 1)),
    false,
  );
  assert.equal(
    formatJson('"' + "a".repeat(toolInputLimit - 2) + '"').success,
    true,
  );
  assert.equal(formatJson("a".repeat(toolInputLimit + 1)).success, false);
  assert.equal(
    convertUrlComponent("a".repeat(toolInputLimit + 1), "encode").success,
    false,
  );
  assert.equal(
    countText("a".repeat(toolInputLimit)).characters,
    toolInputLimit,
  );
});
