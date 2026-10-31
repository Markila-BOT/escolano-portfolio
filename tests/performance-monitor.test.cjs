const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const assert = require("node:assert/strict");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
const {
  baseline,
  evaluateRuns,
  metricOrder,
  profileOrder,
} = require("../scripts/evaluate-performance-monitor.cjs");

function measurements(overrides = {}) {
  const result = {};
  for (const profile of profileOrder) {
    result[profile] = {};
    for (const metric of metricOrder) {
      const value = baseline[profile][metric];
      result[profile][metric] = [value, value, value];
    }
  }
  result.mobile.lcpMs = [3400, 3420, 3440];
  for (const [key, runs] of Object.entries(overrides)) {
    const [profile, metric] = key.split(".");
    result[profile][metric] = runs;
  }
  return result;
}

function writeReports(directory, source) {
  fs.mkdirSync(directory, { recursive: true });
  const keys = {
    fcpMs: "first-contentful-paint",
    lcpMs: "largest-contentful-paint",
    cls: "cumulative-layout-shift",
    ttiMs: "interactive",
  };
  for (const profile of profileOrder) {
    for (const run of [1, 2, 3]) {
      const audits = {};
      for (const metric of metricOrder) {
        audits[keys[metric]] = { numericValue: source[profile][metric][run - 1] };
      }
      fs.writeFileSync(
        path.join(directory, `${profile}-${run}.json`),
        JSON.stringify({ lighthouseVersion: "13.5.0", audits }),
      );
    }
  }
}

test("a sample report names all four metrics and both profiles", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "perf-monitor-"));
  writeReports(directory, measurements());
  const result = spawnSync(
    process.execPath,
    ["scripts/evaluate-performance-monitor.cjs", directory],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  const summary = JSON.parse(
    fs.readFileSync(path.join(directory, "summary.json"), "utf8"),
  );
  assert.deepEqual(summary.metrics, metricOrder);
  assert.deepEqual(summary.profiles, profileOrder);
  assert.equal(summary.results.mobile.lcpMs.status, "known-miss");
  assert.equal(summary.results.desktop.fcpMs.status, "pass");
});

test("three agreeing budget misses fail and a split does not", () => {
  const missed = evaluateRuns(measurements({ "mobile.fcpMs": [1600, 1700, 1800] }));
  assert.equal(missed.failures.length, 1);
  assert.deepEqual(missed.failures[0], {
    metric: "fcpMs",
    profile: "mobile",
    value: 1700,
    reason: "budget",
  });

  const split = evaluateRuns(measurements({ "mobile.fcpMs": [1600, 1700, 800] }));
  assert.equal(split.failures.length, 0);
});

test("mobile LCP in the accepted band is a known miss and above 3.50s fails", () => {
  const known = evaluateRuns(
    measurements({ "mobile.lcpMs": [2600, 3000, 3500] }),
  );
  assert.equal(known.results.mobile.lcpMs.status, "known-miss");
  assert.equal(known.failures.length, 0);

  const regressed = evaluateRuns(
    measurements({ "mobile.lcpMs": [3501, 3600, 3700] }),
  );
  assert.equal(regressed.results.mobile.lcpMs.status, "fail");
  assert.equal(regressed.failures[0].profile, "mobile");
  assert.equal(regressed.failures[0].metric, "lcpMs");
  assert.equal(regressed.failures[0].value, 3600);
});

test("timing and CLS regressions fail only when all three runs agree", () => {
  const fcp = evaluateRuns(
    measurements({ "desktop.fcpMs": [400, 410, 420] }),
  );
  assert.equal(fcp.failures[0].reason, "regression");
  assert.equal(fcp.failures[0].metric, "fcpMs");

  const cls = evaluateRuns(
    measurements({ "desktop.cls": [0.02, 0.03, 0.04] }),
  );
  assert.equal(cls.failures[0].metric, "cls");
  assert.equal(cls.failures[0].reason, "regression");

  const within = evaluateRuns(
    measurements({ "desktop.fcpMs": [380, 381, 280.48] }),
  );
  assert.equal(within.failures.length, 0);
});

test("the monitor command builds production output and does not start the dev server", () => {
  const command = fs.readFileSync(
    path.join(root, "scripts/performance-monitor.sh"),
    "utf8",
  );
  assert.match(command, /pnpm build/);
  assert.match(command, /pnpm start/);
  assert.equal(command.includes("pnpm dev"), false);
  assert.equal(command.includes("next dev"), false);
  const notes = fs.readFileSync(
    path.join(root, "scripts/performance-monitor.md"),
    "utf8",
  );
  assert.match(notes, /pnpm performance:monitor/);
});

test("the checklist LCP item stays a known miss and the page has no lab score", () => {
  const checklist = fs.readFileSync(path.join(root, "CHECKLIST.MD"), "utf8");
  assert.match(
    checklist,
    /Largest Contentful Paint under 2\.5s \(\*\*user-accepted closed, 2026-10-09; mobile threshold not verified as passing\*\*/,
  );
  const page = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
  assert.equal(page.includes("known-miss"), false);
  assert.equal(page.includes("summary.json"), false);
});

test("the lab job is manual or master, not every pull request", () => {
  const workflow = fs.readFileSync(
    path.join(root, ".github/workflows/ci.yml"),
    "utf8",
  );
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(
    workflow,
    /github\.event_name == 'workflow_dispatch' \|\| github\.ref == 'refs\/heads\/master'/,
  );
  assert.equal(workflow.includes("performance score"), false);
});
