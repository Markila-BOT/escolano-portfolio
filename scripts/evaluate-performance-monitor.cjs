const fs = require("node:fs");
const path = require("node:path");

const metricOrder = ["fcpMs", "lcpMs", "cls", "ttiMs"];
const profileOrder = ["mobile", "desktop"];

const auditKeys = {
  fcpMs: "first-contentful-paint",
  lcpMs: "largest-contentful-paint",
  cls: "cumulative-layout-shift",
  ttiMs: "interactive",
};

const budgets = {
  fcpMs: { max: 1500, margin: 100 },
  lcpMs: { max: 2500, margin: 100 },
  cls: { max: 0.1, margin: 0.01 },
  ttiMs: { max: 3500, margin: 100 },
};

// Accepted medians: deployed paint/CLS from docs/portfolio-performance.md,
// TTI from the 2026-10-09 capture in docs/time-to-interactive.md.
const baseline = {
  mobile: {
    fcpMs: 831.41,
    lcpMs: 3440.91,
    cls: 0.01427,
    ttiMs: 3370.387,
  },
  desktop: {
    fcpMs: 280.48,
    lcpMs: 697.98,
    cls: 0,
    ttiMs: 657.7905,
  },
};

const previouslyPassing = {
  mobile: { fcpMs: true, lcpMs: false, cls: true, ttiMs: true },
  desktop: { fcpMs: true, lcpMs: true, cls: true, ttiMs: true },
};

const mobileLcpKnownMax = 3500;

function median(values) {
  const sorted = [...values].sort((first, second) => first - second);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function readRun(directory, profile, run) {
  const filename = `${profile}-${run}.json`;
  const report = JSON.parse(
    fs.readFileSync(path.join(directory, filename), "utf8"),
  );
  const metrics = {};
  for (const name of metricOrder) {
    const value = report.audits?.[auditKeys[name]]?.numericValue;
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`${filename}: missing/invalid ${auditKeys[name]}`);
    }
    metrics[name] = value;
  }
  return metrics;
}

function missesBudget(metric, value) {
  return value >= budgets[metric].max;
}

function missesMargin(metric, value, accepted) {
  return value > accepted + budgets[metric].margin;
}

function judge(profile, metric, runs) {
  const accepted = baseline[profile][metric];
  const measured = median(runs);
  if (profile === "mobile" && metric === "lcpMs") {
    if (runs.every((value) => value > mobileLcpKnownMax)) {
      return {
        status: "fail",
        reason: "known-miss exceeded",
        value: measured,
      };
    }
    if (runs.every((value) => value > budgets.lcpMs.max)) {
      return { status: "known-miss", reason: "known-miss", value: measured };
    }
    if (runs.every((value) => !missesBudget(metric, value))) {
      return { status: "pass", reason: "budget", value: measured };
    }
    return { status: "known-miss", reason: "known-miss", value: measured };
  }

  const budgetMiss =
    previouslyPassing[profile][metric] &&
    runs.every((value) => missesBudget(metric, value));
  const regression = runs.every((value) =>
    missesMargin(metric, value, accepted),
  );
  if (budgetMiss || regression) {
    return {
      status: "fail",
      reason: budgetMiss ? "budget" : "regression",
      value: measured,
    };
  }
  return { status: "pass", reason: "within baseline", value: measured };
}

function evaluateRuns(measurements) {
  const results = {};
  const failures = [];
  for (const profile of profileOrder) {
    results[profile] = {};
    for (const metric of metricOrder) {
      const runs = measurements[profile][metric];
      const verdict = judge(profile, metric, runs);
      results[profile][metric] = {
        runs,
        median: verdict.value,
        baseline: baseline[profile][metric],
        status: verdict.status,
        reason: verdict.reason,
      };
      if (verdict.status === "fail") {
        failures.push({
          metric,
          profile,
          value: verdict.value,
          reason: verdict.reason,
        });
      }
    }
  }
  return {
    metrics: metricOrder,
    profiles: profileOrder,
    results,
    failures,
  };
}

function evaluateDirectory(directory) {
  const measurements = {};
  for (const profile of profileOrder) {
    const runs = [1, 2, 3].map((run) => readRun(directory, profile, run));
    measurements[profile] = {};
    for (const metric of metricOrder) {
      measurements[profile][metric] = runs.map((run) => run[metric]);
    }
  }
  return evaluateRuns(measurements);
}

function writeSummary(directory, summary) {
  fs.writeFileSync(
    path.join(directory, "summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
}

if (require.main === module) {
  const directory = process.argv[2];
  if (!directory) {
    process.stderr.write("Pass the report directory\n");
    process.exit(1);
  }
  const summary = evaluateDirectory(directory);
  writeSummary(directory, summary);
  for (const failure of summary.failures) {
    process.stderr.write(
      `${failure.profile} ${failure.metric} ${failure.reason}: ${failure.value}\n`,
    );
  }
  process.exit(summary.failures.length === 0 ? 0 : 1);
}

module.exports = {
  auditKeys,
  baseline,
  budgets,
  evaluateDirectory,
  evaluateRuns,
  metricOrder,
  mobileLcpKnownMax,
  profileOrder,
};
