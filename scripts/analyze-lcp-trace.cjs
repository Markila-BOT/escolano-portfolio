const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function traceEvidence(report, trace) {
  const metrics = report.audits?.metrics?.details?.items?.[0];
  const origin = metrics?.observedNavigationStartTs;
  if (!Number.isFinite(origin) || !Array.isArray(trace?.traceEvents)) {
    throw new Error("Missing navigation timing or trace events");
  }
  const simulatedLcpMs =
    report.audits?.["largest-contentful-paint"]?.numericValue ?? null;
  const observedLcpMs = metrics.observedLargestContentfulPaint ?? null;
  if (
    [simulatedLcpMs, observedLcpMs].some(
      (value) => value !== null && (!Number.isFinite(value) || value < 0),
    )
  ) {
    throw new Error("Malformed LCP timing");
  }
  const candidates = trace.traceEvents
    .filter((event) => event.name === "largestContentfulPaint::Candidate")
    .filter((event) => event.args?.data?.isMainFrame)
    .map((event) => {
      if (
        !Number.isFinite(event.ts) ||
        !Number.isFinite(event.args.data.size)
      ) {
        throw new Error("Malformed LCP candidate");
      }
      return {
        observedMs: (event.ts - origin) / 1000,
        nodeId: event.args.data.nodeId,
        nodeName: event.args.data.nodeName,
        size: event.args.data.size,
        type: event.args.data.type,
      };
    });
  return {
    simulatedLcpMs,
    observedLcpMs,
    observedTraceEndMs: metrics.observedTraceEnd ?? null,
    candidates,
  };
}

async function analyzeReport(base, lighthouseRoot) {
  const read = (suffix) =>
    JSON.parse(fs.readFileSync(`${base}${suffix}`, "utf8"));
  const report = read(".json");
  if (report.lighthouseVersion !== "13.5.0" || report.runtimeError) {
    throw new Error("Expected valid Lighthouse 13.5.0 report");
  }
  const trace = read("-0.trace.json");
  const evidence = traceEvidence(report, trace);
  const { LanternLargestContentfulPaint } = await import(
    pathToFileURL(
      path.join(
        lighthouseRoot,
        "core/computed/metrics/lantern-largest-contentful-paint.js",
      ),
    ).href
  );
  const result = await LanternLargestContentfulPaint.request(
    {
      trace,
      devtoolsLog: read("-0.devtoolslog.json"),
      gatherContext: { gatherMode: "navigation" },
      settings: report.configSettings,
      URL: {
        requestedUrl: report.requestedUrl,
        mainDocumentUrl: report.finalDisplayedUrl,
        finalDisplayedUrl: report.finalDisplayedUrl,
      },
      SourceMaps: [],
      HostDPR: 1,
      simulator: null,
    },
    { computedCache: new Map() },
  );
  const estimates = Object.fromEntries(
    ["optimisticEstimate", "pessimisticEstimate"].map((name) => [
      name,
      {
        simulatedMs: result[name].timeInMs,
        nodes: [...result[name].nodeTimings]
          .map(([node, timing]) => ({
            type: node.type,
            url: node.request?.url ?? null,
            event: node.event?.name ?? null,
            observedStartMs:
              (node.startTime -
                report.audits.metrics.details.items[0]
                  .observedNavigationStartTs) /
              1000,
            simulatedStartMs: timing.startTime,
            simulatedEndMs: timing.endTime,
          }))
          .sort(
            (first, second) => second.simulatedEndMs - first.simulatedEndMs,
          ),
      },
    ]),
  );
  if (Math.abs(result.timing - evidence.simulatedLcpMs) > 1) {
    throw new Error("Recomputed simulation does not match saved report");
  }
  return { ...evidence, recomputedSimulatedLcpMs: result.timing, estimates };
}

module.exports = { traceEvidence, analyzeReport };

if (require.main === module) {
  if (process.argv.length !== 4) {
    process.stderr.write(
      "Usage: node scripts/analyze-lcp-trace.cjs <report-base> <lighthouse-package-root>\n",
    );
    process.exitCode = 1;
  } else {
    analyzeReport(process.argv[2], process.argv[3])
      .then((result) =>
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`),
      )
      .catch((error) => {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
      });
  }
}
