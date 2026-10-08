const fs = require("node:fs");
const path = require("node:path");

const metricKeys = {
  mainThreadMs: "mainthread-work-breakdown",
  tbtMs: "total-blocking-time",
  fcpMs: "first-contentful-paint",
  lcpMs: "largest-contentful-paint",
  cls: "cumulative-layout-shift",
};

function statistics(values) {
  const sorted = [...values].sort((first, second) => first - second);
  const middle = Math.floor(sorted.length / 2);
  return {
    values,
    median:
      sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2,
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

function summarizeReports(directory) {
  const summary = {};
  for (const profile of ["mobile", "desktop"]) {
    const runs = [1, 2, 3].map((run) => {
      const filename = `${profile}-${run}.json`;
      const report = JSON.parse(
        fs.readFileSync(path.join(directory, filename), "utf8"),
      );
      const fail = (message) => {
        throw new Error(`${filename}: ${message}`);
      };
      if (report.runtimeError)
        fail(`runtime error: ${report.runtimeError.message}`);
      if (report.runWarnings?.length)
        fail(`audit warnings: ${report.runWarnings.join("; ")}`);
      if (report.lighthouseVersion !== "13.5.0")
        fail("unexpected Lighthouse version");
      const settings = report.configSettings;
      const desktop = profile === "desktop";
      if (
        settings?.formFactor !== profile ||
        settings.throttlingMethod !== "simulate" ||
        settings.throttling?.cpuSlowdownMultiplier !== (desktop ? 1 : 4) ||
        settings.throttling?.rttMs !== (desktop ? 40 : 150) ||
        settings.throttling?.throughputKbps !== (desktop ? 10240 : 1638.4) ||
        settings.screenEmulation?.width !== (desktop ? 1350 : 412) ||
        settings.screenEmulation?.height !== (desktop ? 940 : 823) ||
        settings.screenEmulation?.deviceScaleFactor !== (desktop ? 1 : 1.75) ||
        settings.disableStorageReset !== false
      )
        fail("unexpected audit profile");
      const metrics = {};
      for (const [name, key] of Object.entries(metricKeys)) {
        const value = report.audits?.[key]?.numericValue;
        if (!Number.isFinite(value) || value < 0)
          fail(`missing/invalid metric: ${key}`);
        metrics[name] = value;
      }
      const breakdown = report.audits["mainthread-work-breakdown"];
      if (
        !Number.isFinite(breakdown.score) ||
        breakdown.score < 0 ||
        breakdown.score > 1
      )
        fail("missing main-thread verdict");
      const categories = breakdown.details?.items;
      const scripts = report.audits["bootup-time"]?.details?.items;
      const requests = report.audits["network-requests"]?.details?.items;
      if (
        !Array.isArray(categories) ||
        !Array.isArray(scripts) ||
        !Array.isArray(requests)
      )
        fail("missing diagnostic details");
      if (report.audits["errors-in-console"]?.details?.items?.length)
        fail("browser console errors");
      const scriptRequests = requests.filter(
        (request) => request.resourceType === "Script",
      );
      if (
        !scriptRequests.length ||
        scriptRequests.some(
          (request) =>
            !Number.isFinite(request.transferSize) ||
            !Number.isFinite(request.resourceSize) ||
            request.statusCode !== 200 ||
            /webpack-hmr|react-refresh|_next\/static\/development/.test(
              request.url,
            ),
        )
      )
        fail("invalid or development script resources");
      for (const category of categories) {
        if (!Number.isFinite(category.duration) || category.duration < 0)
          fail("invalid CPU category");
      }
      for (const script of scripts) {
        if (
          ![script.total, script.scripting, script.scriptParseCompile].every(
            Number.isFinite,
          )
        )
          fail("invalid script CPU attribution");
      }
      return {
        filename,
        fetchTime: report.fetchTime,
        url: report.finalDisplayedUrl || report.finalUrl,
        settings,
        browser: report.environment?.hostUserAgent,
        metrics: {
          ...metrics,
          scriptTransferBytes: scriptRequests.reduce(
            (total, request) => total + request.transferSize,
            0,
          ),
          scriptResourceBytes: scriptRequests.reduce(
            (total, request) => total + request.resourceSize,
            0,
          ),
        },
        mainThreadScore: breakdown.score,
        mainThreadWarning: breakdown.score < 1,
        categories,
        topScripts: [...scripts]
          .sort((first, second) => second.total - first.total)
          .slice(0, 5),
        scriptRequests: scriptRequests.map(
          ({ url, transferSize, resourceSize }) => ({
            url,
            transferSize,
            resourceSize,
          }),
        ),
      };
    });
    if (
      new Set(runs.map((run) => run.url)).size !== 1 ||
      new Set(runs.map((run) => JSON.stringify(run.settings))).size !== 1
    ) {
      throw new Error(`${profile}: inconsistent URLs or settings`);
    }
    const categoryNames = [
      ...new Set(
        runs.flatMap((run) => run.categories.map((category) => category.group)),
      ),
    ];
    summary[profile] = {
      runs,
      metrics: Object.fromEntries(
        Object.keys(runs[0].metrics).map((name) => [
          name,
          statistics(runs.map((run) => run.metrics[name])),
        ]),
      ),
      categories: Object.fromEntries(
        categoryNames.map((name) => [
          name,
          statistics(
            runs.map(
              (run) =>
                run.categories.find((category) => category.group === name)
                  ?.duration || 0,
            ),
          ),
        ]),
      ),
      warningCount: runs.filter((run) => run.mainThreadWarning).length,
    };
  }
  return summary;
}

module.exports = { statistics, summarizeReports };

if (require.main === module) {
  try {
    if (process.argv.length !== 3)
      throw new Error(
        "Usage: node scripts/summarize-main-thread.cjs <report-directory>",
      );
    process.stdout.write(
      `${JSON.stringify(summarizeReports(process.argv[2]), null, 2)}\n`,
    );
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
