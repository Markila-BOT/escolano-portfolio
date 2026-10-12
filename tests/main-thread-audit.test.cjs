const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const {
  lcpEvidence,
  statistics,
  summarizeReports,
} = require("../scripts/summarize-main-thread.cjs");

test("LCP evidence keeps observed timing separate and represents absent attribution", () => {
  assert.deepEqual(lcpEvidence({}), {
    node: null,
    observedSubparts: [],
    fonts: [],
  });
  const evidence = lcpEvidence({
    audits: {
      "lcp-breakdown-insight": {
        details: {
          items: [
            {
              type: "table",
              items: [{ subpart: "elementRenderDelay", duration: 80 }],
            },
            {
              type: "node",
              nodeLabel: "Senior Software Engineer",
              selector: "strong span",
              snippet: '<span style="opacity:1">',
            },
          ],
        },
      },
      "network-requests": {
        details: {
          items: [
            {
              resourceType: "Font",
              url: "sans.woff2",
              transferSize: 100,
              resourceSize: 90,
              isLinkPreload: true,
            },
          ],
        },
      },
    },
  });
  assert.equal(evidence.node.label, "Senior Software Engineer");
  assert.deepEqual(evidence.observedSubparts, [
    { subpart: "elementRenderDelay", duration: 80 },
  ]);
  assert.equal(evidence.fonts[0].isLinkPreload, true);
  assert.equal(evidence.lcpMs, undefined);
});

function fixture(context, mutate = () => {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "main-thread-test-"));
  context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const profile of ["mobile", "desktop"]) {
    for (const run of [1, 2, 3]) {
      const report = {
        lighthouseVersion: "13.5.0",
        finalUrl: "http://127.0.0.1:3100/",
        configSettings: {
          formFactor: profile,
          throttlingMethod: "simulate",
          disableStorageReset: false,
          throttling: {
            cpuSlowdownMultiplier: profile === "desktop" ? 1 : 4,
            rttMs: profile === "desktop" ? 40 : 150,
            throughputKbps: profile === "desktop" ? 10240 : 1638.4,
          },
          screenEmulation: {
            width: profile === "desktop" ? 1350 : 412,
            height: profile === "desktop" ? 940 : 823,
            deviceScaleFactor: profile === "desktop" ? 1 : 1.75,
          },
        },
        audits: Object.fromEntries(
          [
            "mainthread-work-breakdown",
            "total-blocking-time",
            "first-contentful-paint",
            "largest-contentful-paint",
            "cumulative-layout-shift",
          ].map((key) => [key, { numericValue: run * 100 }]),
        ),
      };
      report.audits.interactive = {
        numericValue: run * 1000,
        numericUnit: "millisecond",
        scoreDisplayMode: "numeric",
        score: 1,
      };
      report.audits["mainthread-work-breakdown"].score = 1;
      report.audits["mainthread-work-breakdown"].details = {
        items: [{ group: "scriptEvaluation", duration: run * 10 }],
      };
      report.audits["bootup-time"] = {
        details: {
          items: [
            {
              url: "bundle.js",
              total: run * 20,
              scripting: 10,
              scriptParseCompile: 5,
            },
          ],
        },
      };
      report.audits["network-requests"] = {
        details: {
          items: [
            {
              url: "http://127.0.0.1:3100/_next/static/chunks/hash.js",
              resourceType: "Script",
              transferSize: 120,
              resourceSize: 400,
              statusCode: 200,
            },
          ],
        },
      };
      mutate(report, profile, run);
      fs.writeFileSync(
        path.join(directory, `${profile}-${run}.json`),
        JSON.stringify(report),
      );
    }
  }
  return directory;
}

test("summarizes all values, median/range, CPU categories and distinct JS byte counts", (context) => {
  const summary = summarizeReports(fixture(context));
  assert.deepEqual(summary.mobile.metrics.mainThreadMs, {
    values: [100, 200, 300],
    median: 200,
    min: 100,
    max: 300,
  });
  assert.equal(summary.desktop.categories.scriptEvaluation.median, 20);
  assert.equal(summary.mobile.metrics.scriptTransferBytes.median, 120);
  assert.equal(summary.mobile.metrics.scriptResourceBytes.median, 400);
  assert.equal(summary.mobile.warningCount, 0);
  assert.equal(summary.mobile.runs[2].topScripts[0].total, 60);
  assert.equal(statistics([4, 1, 3, 2]).median, 2.5);
});

test("rejects missing reports", (context) => {
  const directory = fixture(context);
  fs.unlinkSync(path.join(directory, "desktop-3.json"));
  assert.throws(() => summarizeReports(directory), /ENOENT/);
});

test("TTI statistics and strict budgets are independent of TBT and LCP", (context) => {
  const summary = summarizeReports(
    fixture(context, (report, profile, run) => {
      report.audits.interactive.numericValue = [3499, 3500, 3501][run - 1];
      report.audits["total-blocking-time"].numericValue = 0;
      report.audits["largest-contentful-paint"].numericValue = 100;
    }),
  );
  assert.deepEqual(summary.mobile.metrics.ttiMs, {
    values: [3499, 3500, 3501],
    median: 3500,
    min: 3499,
    max: 3501,
  });
  assert.deepEqual(
    summary.mobile.runs.map((run) => run.ttiBudgetPassed),
    [true, false, false],
  );
  assert.deepEqual(summary.mobile.ttiBudget.failedRuns, [
    "mobile-2.json",
    "mobile-3.json",
  ]);
  assert.equal(summary.mobile.ttiBudget.passed, false);
  assert.equal(summary.mobile.metrics.tbtMs.median, 0);
  assert.equal(summary.mobile.metrics.lcpMs.median, 100);
});

test("a low TTI median cannot hide a failing run", (context) => {
  const summary = summarizeReports(
    fixture(context, (report, profile, run) => {
      report.audits.interactive.numericValue = [1000, 2000, 3500][run - 1];
    }),
  );
  assert.equal(summary.mobile.metrics.ttiMs.median, 2000);
  assert.equal(summary.mobile.ttiBudget.passed, false);
  assert.deepEqual(summary.mobile.ttiBudget.failedRuns, ["mobile-3.json"]);
});

test("rejects missing, errored or malformed interactive audits by filename", (context) => {
  const mutations = [
    (report) => delete report.audits.interactive,
    (report) => (report.audits.interactive.scoreDisplayMode = "error"),
    (report) => (report.audits.interactive.errorMessage = "Unavailable"),
    (report) => (report.audits.interactive.numericUnit = "second"),
    (report) => (report.audits.interactive.score = null),
    ...[null, "3000", -1, NaN, Infinity].map(
      (value) => (report) => (report.audits.interactive.numericValue = value),
    ),
  ];
  for (const mutate of mutations)
    assert.throws(
      () => summarizeReports(fixture(context, mutate)),
      /mobile-1.json: missing\/invalid (interactive audit|metric: interactive)/,
    );
});

test("rejects contamination and different URLs across profiles", (context) => {
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report) => {
          report.runWarnings = ["Extensions affected performance"];
        }),
      ),
    /audit warnings/,
  );
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report, profile) => {
          if (profile === "desktop") report.finalUrl = "https://other.test/";
        }),
      ),
    /mobile\/desktop: inconsistent URLs/,
  );
});

test("rejects runtime errors", (context) => {
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report) => {
          report.runtimeError = { message: "Navigation failed" };
        }),
      ),
    /runtime error/,
  );
});

test("rejects missing metrics", (context) => {
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report) => {
          delete report.audits["largest-contentful-paint"];
        }),
      ),
    /missing\/invalid metric/,
  );
});

test("rejects development resources and wrong profiles", (context) => {
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report) => {
          report.audits["network-requests"].details.items[0].url =
            "/_next/static/development/app.js";
        }),
      ),
    /development script/,
  );
  assert.throws(
    () =>
      summarizeReports(
        fixture(context, (report) => {
          report.configSettings.throttling.cpuSlowdownMultiplier = 8;
        }),
      ),
    /unexpected audit profile/,
  );
});

test("counts tool warnings independently of TBT", (context) => {
  const summary = summarizeReports(
    fixture(context, (report, profile, run) => {
      report.audits["total-blocking-time"].numericValue = 0;
      if (run === 2) report.audits["mainthread-work-breakdown"].score = 0;
    }),
  );
  assert.equal(summary.mobile.warningCount, 1);
  assert.equal(summary.mobile.metrics.tbtMs.median, 0);
});
