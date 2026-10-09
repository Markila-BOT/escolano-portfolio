const { test } = require("node:test");
const assert = require("node:assert/strict");
const { traceEvidence } = require("../scripts/analyze-lcp-trace.cjs");

const report = {
  audits: {
    "largest-contentful-paint": { numericValue: 3600 },
    metrics: {
      details: {
        items: [
          {
            observedNavigationStartTs: 1000000,
            observedLargestContentfulPaint: 180,
          },
        ],
      },
    },
  },
};

test("keeps observed candidates separate from simulated LCP", () => {
  const evidence = traceEvidence(report, {
    traceEvents: [
      {
        name: "largestContentfulPaint::Candidate",
        ts: 1180000,
        args: { data: { isMainFrame: true, size: 60000, nodeId: 61 } },
      },
    ],
  });
  assert.equal(evidence.simulatedLcpMs, 3600);
  assert.equal(evidence.observedLcpMs, 180);
  assert.equal(evidence.candidates[0].observedMs, 180);
});

test("reports absent candidates without inventing a node", () => {
  assert.deepEqual(traceEvidence(report, { traceEvents: [] }).candidates, []);
});

test("rejects missing navigation and malformed candidate evidence", () => {
  assert.throws(
    () => traceEvidence({}, { traceEvents: [] }),
    /Missing navigation/,
  );
  assert.throws(
    () =>
      traceEvidence(report, {
        traceEvents: [
          {
            name: "largestContentfulPaint::Candidate",
            ts: "invalid",
            args: { data: { isMainFrame: true, size: 10 } },
          },
        ],
      }),
    /Malformed LCP candidate/,
  );
  assert.throws(
    () =>
      traceEvidence(
        {
          audits: {
            ...report.audits,
            "largest-contentful-paint": { numericValue: "invalid" },
          },
        },
        { traceEvents: [] },
      ),
    /Malformed LCP timing/,
  );
});
