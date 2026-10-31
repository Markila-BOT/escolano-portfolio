const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const appDir = path.join(root, "app");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

test("public app routes do not include an analytics dashboard or a visitor id", () => {
  const files = walk(appDir);
  const relatives = files.map((file) => path.relative(root, file));

  assert.equal(
    relatives.some((file) =>
      file.split(path.sep).some((part) => part === "analytics" || part.startsWith("analytics.")),
    ),
    false,
  );

  for (const file of files.filter((item) => /\.(tsx|jsx|mdx)$/.test(item))) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(
      source.includes("visitorId"),
      false,
      `${path.relative(root, file)} renders visitorId`,
    );
  }
});

test("the visit beacon still posts and no sign-in route was added", () => {
  const beacon = fs.readFileSync(path.join(root, "lib/visitor.ts"), "utf8");
  assert.match(beacon, /NEXT_PUBLIC_ANALYTICS_URL/);
  assert.match(beacon, /sendBeacon/);
  assert.match(beacon, /method:\s*"POST"/);

  const relatives = walk(appDir).map((file) => path.relative(root, file));
  assert.equal(
    relatives.some((file) =>
      file.split(path.sep).some((part) => /^(login|sign-in|signin)$/i.test(part.replace(/\..+$/, ""))),
    ),
    false,
  );
});

test("the dashboard doc keeps the checklist open and adds no login", () => {
  const doc = fs.readFileSync(path.join(root, "docs/analytics-dashboard.md"), "utf8");
  assert.match(doc, /checklist row stays open/i);
  assert.match(doc, /no login is added/i);
});
