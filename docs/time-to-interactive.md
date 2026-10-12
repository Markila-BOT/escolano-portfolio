# Time to Interactive verification

## Methodology

The preserved budget is legacy TTI strictly below **3500ms in every run**: three cold mobile and three cold desktop production loads. Lighthouse 13.5.0 still supplies `audits.interactive.numericValue` in JSON, even though [TTI is retired from the scored metrics](https://developer.chrome.com/docs/lighthouse/performance/interactive/). It is variable and is not a field-performance guarantee. TBT, INP and LCP are separate metrics, never TTI substitutes.

Run the existing collector against a production URL and a new, nonexistent directory:

```sh
sh scripts/audit-performance.sh https://escolano-portfolio.vercel.app/ docs/performance/tti-<unique-capture>
node scripts/summarize-main-thread.cjs docs/performance/tti-<unique-capture>
```

The collector pins Lighthouse 13.5.0, resets storage and uses simulated mobile (4x CPU, 150ms RTT, 1638.4Kbps, 412×823 at 1.75 DPR) and desktop (1x CPU, 40ms RTT, 10240Kbps, 1350×940 at 1 DPR) profiles. The summary rejects warnings, runtime errors, development scripts, incompatible profiles and invalid TTI audits. It exposes each run's `ttiBudgetPassed`, profile `ttiBudget` and `metrics.ttiMs` values/median/min/max. Exactly 3500ms fails. A low median cannot hide a failing run.

Timing extraction is not production acceptance: verify the same URL and served deployment/build across the capture, retain browser and capture metadata, and link identity evidence. Local HEAD and local build IDs do not establish remote source parity. Missing deployment identity or metadata keeps acceptance unverified. Failed timing is valid evidence of a failed budget, not a malformed report. No other performance checklist item follows from TTI acceptance.

## Historical extraction check

```sh
node scripts/summarize-main-thread.cjs docs/performance/lcp-deployed-retest-20261009
```

Those stored JSON files yield mobile TTI 3400.6965, 3360.751 and 3361.2755ms; desktop 663.841, 680.880 and 672.333ms. All six are numerically below 3500ms, but this historical extraction check does not establish current deployment acceptance. Original reports remain unchanged.

## Current production verdict

**Pass for the captured public build on 2026-10-09**, not a field guarantee or proof that local changes have been deployed. All six valid reports are strictly below 3500ms. [Summary](performance/tti-deployed-20261009/summary.json) retains full precision and browser/capture metadata.

| Profile | Run 1 (ms)                                                   | Run 2 (ms)                                                   | Run 3 (ms)                                                   | Median (ms) | Range (ms)         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------- | ------------------ |
| Mobile  | [3370.387](performance/tti-deployed-20261009/mobile-1.json)  | [3417.534](performance/tti-deployed-20261009/mobile-2.json)  | [3213.3665](performance/tti-deployed-20261009/mobile-3.json) | 3370.387    | 3213.3665–3417.534 |
| Desktop | [661.2515](performance/tti-deployed-20261009/desktop-1.json) | [657.5415](performance/tti-deployed-20261009/desktop-2.json) | [657.7905](performance/tti-deployed-20261009/desktop-3.json) | 657.7905    | 657.5415–661.2515  |

Reports were captured serially at 04:40:43–04:41:37 UTC (12:40:43–12:41:37 Manila) against `https://escolano-portfolio.vercel.app/`, with Lighthouse 13.5.0 and HeadlessChrome 154.0.0.0 on macOS. Every report has the pinned profile, storage reset, empty warnings and no runtime error. All browser and timestamp fields are present. Timing acceptance is independent of LCP and other checklist gates.

### Served build identity

The [first HTML snapshot](performance/tti-deployed-20261009/served-before.html) captured during the first audit and the [post-capture HTML](performance/tti-deployed-20261009/served-after.html) are byte-identical (SHA-256 `2321279135c1742dca68b49aee93dc83087316ac1a46e1a7f457275d3a5018aa`) and expose Next build ID `1WbU4GnFxvk6XYonI4lgF`. Their [first headers](performance/tti-deployed-20261009/served-before.headers) and [final headers](performance/tti-deployed-20261009/served-after.headers) retain response identity. Every audit fetched the same initial script URL set, all present in that captured HTML; see [identity verification](performance/tti-deployed-20261009/served-identity.json). This identifies the measured public build, not a Vercel deployment API ID or its source commit.

The [collector identity](performance/tti-deployed-20261009/identity.txt) describes the local audit checkout only. Remote source parity remains unknown and no deployment was performed. The checklist pass is limited to the public build identified above; later builds require new evidence.

Validation: all 42 Node tests pass, including 11 focused audit tests. Extraction from the historical reports preserves every previously emitted summary field unchanged; only TTI values and budget outcomes are added.
