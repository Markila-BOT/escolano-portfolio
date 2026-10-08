# Production main-thread audit

## Decision

No JavaScript refactor is warranted for the reported main-thread warning: all six valid production reports give `mainthread-work-breakdown` score **1**, with no reported runtime errors or audit warnings. This does **not** mean the entire portfolio meets its performance budgets. Mobile LCP remains **4.52s median**, above the existing 2.5s target; investigate that separately if it persists after deployment. Existing checklist timing claims are unchanged.

The original `http://localhost:3000/#projects` server was `next dev`, not production. Development compilation/HMR overhead cannot establish a production payload problem. This audit uses the production **root** navigation; the fragment would change initial scroll position. It does not measure travel controls, drawer interactions or video playback.

## Evidence and isolation

- Reports: `docs/performance/main-thread-production/{mobile,desktop}-{1,2,3}.json`; reproducible full results: `summary.json`.
- Served URL: `http://127.0.0.1:3100/`; actual isolated build: `s0L_unizYq2n1AohnOtqg`, also saved in `served-build-id.txt`.
- Current working-tree source, assets, config and lockfile were copied into `/private/tmp/portfolio-main-thread.hwwfCz`, including uncommitted/untracked application files. `.git`, `.next`, reports and all environment files were excluded. `node_modules` was linked read-only in practice to the existing installed dependencies; no install or dependency modification was performed.
- `source.sha256` and `snapshot-parity.txt` record file hashes and successful parity. Checks passed again after measurement for both checkout and snapshot. The original `.next` file hashes were identical before/after the isolated build, and the original application/dependency diff remained identical after auditing.
- Node **24.18.0**, Next **14.2.35**, Lighthouse **13.5.0**, Headless Chrome **154.0.0.0**. Build passed compilation, lint/type checks and static generation; the existing `tests/portfolio-html.py` regression check passed against generated production HTML. The build estimates **249kB First Load JS**; this is not the measured network transfer total below.
- `pnpm build` initially refused the shared modules symlink through its dependency-status check, before building; running the installed Next entry point directly under Node 24 avoided any installation: `node node_modules/next/dist/bin/next build`. The shell's login default selected Node 25, so build/audit used the non-login Node 24 environment. No private credentials were needed; the contact action was never submitted.
- Production started with `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100`. The existing pinned shell audit ran from the original checkout for Git identity, which now explicitly labels its build ID as **checkout identity, not necessarily served identity** and handles missing dev `BUILD_ID`. Use the separately saved served ID for this run.
- Six sequential cold browser navigations were captured 2026-10-08 **07:41:18–07:42:13 UTC**. Lighthouse resets browser storage; server filesystem/image caches and the operating system are not cold-reset. The user's dev server remained running (PID 11785, port 3000), so this is a local lab result, not an idle dedicated runner or field data. Lightweight tooling edits occurred during collection; no concurrent build or second audit ran.
- Build warnings about optional `sharp` and stale Browserslist data were recorded, not addressed as unrelated changes. No components, dependencies, features or timing-budget claims were changed.

## Measurements

All timings below are milliseconds except CLS. Each row retains run order; medians/ranges are rounded for readability. Raw JSON and the summary retain full precision.

| Profile / metric    |    Run 1 |    Run 2 |    Run 3 |   Median |             Range |
| ------------------- | -------: | -------: | -------: | -------: | ----------------: |
| Mobile main-thread  | 1195.192 |  856.432 |  830.964 |  856.432 |  830.964–1195.192 |
| Mobile TBT          |        6 |        0 |        0 |        0 |               0–6 |
| Mobile FCP          | 1225.250 | 1206.290 | 1207.169 | 1207.169 | 1206.290–1225.250 |
| Mobile LCP          | 4100.500 | 4522.014 | 4525.090 | 4522.014 | 4100.500–4525.090 |
| Mobile CLS          |        0 |        0 |        0 |        0 |                 0 |
| Desktop main-thread |  214.340 |  211.631 |  222.510 |  214.340 |   211.631–222.510 |
| Desktop TBT         |        0 |        0 |        0 |        0 |                 0 |
| Desktop FCP         |  325.654 |  326.190 |  327.214 |  326.190 |   325.654–327.214 |
| Desktop LCP         |  914.134 |  915.475 |  918.034 |  915.475 |   914.134–918.034 |
| Desktop CLS         |        0 |        0 |        0 |        0 |                 0 |

Each of all six runs downloaded **269,972 script transfer bytes** (263.645 KiB), representing **818,466 decoded resource bytes** (799.283 KiB). These are sums of observed `Script` network requests during initial navigation, including any automatic loads during the collection window, not a static bundle inventory or user-triggered interaction total. Wire transfer includes protocol overhead as reported by Lighthouse. The three byte values and median/min/max are identical for each profile and are retained in `summary.json`.

### CPU categories

| Category             |     Mobile median (range) | Desktop median (range) |
| -------------------- | ------------------------: | ---------------------: |
| Script evaluation    | 303.400 (289.616–375.956) | 75.820 (75.590–77.281) |
| Other                | 232.176 (216.816–318.784) | 57.615 (56.175–61.350) |
| Style/layout         | 193.072 (176.044–298.524) | 45.862 (44.920–49.511) |
| Rendering            |   61.772 (59.720–103.296) | 15.148 (14.470–15.527) |
| Script parse/compile |    55.292 (53.932–55.348) | 14.064 (13.440–14.333) |
| Parse HTML/CSS       |    11.584 (10.604–29.772) |    3.035 (2.814–3.039) |
| Garbage collection   |     13.568 (8.052–15.260) |    3.143 (2.180–3.164) |

All per-run category values are in `summary.json`. Category medians are calculated independently and need not sum to the total median. CPU timing is not synonymous with TBT, nor with elapsed page-load time. The [Chrome audit guidance](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/) explains these categories; this decision uses the pinned tool's actual score, not an assumed cutoff or a TBT substitute.

### Attribution

`summary.json` retains each report's five largest `bootup-time` entries (or all entries when fewer are emitted), with total CPU, evaluation and parse/compile times. This diagnostic omits small entries and is not a complete per-module profile. Root/document and `Unattributable` costs are not individual libraries.

For mobile run 1, the largest entries are the root document (412.512ms total), chunk `902-3c4f75084ef5183c.js` (265.840ms total / 211.320ms evaluation / 7.016ms parse), chunk `726-2bda0c1b8c32dbd6.js` (225.800ms / 64.616ms / 10.424ms), unattributable work (135.440ms) and chunk `1081f1e7-54549b9a20839004.js` (54.324ms / 22.788ms / 9.636ms). Desktop run 1 emits the root (58.784ms total) and chunk `902` (57.568ms / 48.817ms / 1.736ms). Shared chunk attribution alone does not justify removing or replacing a library. No repeated production warning reproduced, so no speculative optimization proposal is needed for this finding.

## Reproduction and validation

```sh
node scripts/summarize-main-thread.cjs docs/performance/main-thread-production
node --test tests/main-thread-audit.test.cjs
```

The dependency-free Node summary requires exactly the six expected reports, Lighthouse 13.5.0, simulated mobile/desktop profiles, reset storage, finite nonnegative metrics, diagnostic details and successful non-development script resources. It rejects runtime errors, audit warnings, available console errors, missing metrics, inconsistent per-profile settings/URLs and missing reports. Performance-only reports do not necessarily include a separate console-error audit: absence of it is not proof that every interaction is error-free. Tests cover calculations, missing reports, runtime errors, missing metrics, development resources, wrong profiles and warning/TBT separation. Report `runtimeError` is absent and `runWarnings` is empty in all six raw files. Production script URLs were additionally matched against files in the isolated `.next` output.

Mobile: 412×823, DPR 1.75, simulated RTT 150ms / throughput 1638.4kbps / CPU slowdown 4. Desktop: 1350×940, DPR 1, simulated RTT 40ms / throughput 10240kbps / CPU slowdown 1. Full settings, browser identity, timestamps, script URLs and per-run values are preserved in the summary and raw reports. No TTI or field-data claim is made.

## Deployment handoff

The user can push/deploy when ready. This change does not commit, push, deploy or schedule a retest. After deployment is confirmed, run from the checkout with Node 24 and Chrome available, choosing a new output directory each time:

```sh
sh scripts/audit-performance.sh https://escolano-portfolio.vercel.app/ docs/performance/main-thread-deployed-YYYYMMDD-HHMMSS
node scripts/summarize-main-thread.cjs docs/performance/main-thread-deployed-YYYYMMDD-HHMMSS > docs/performance/main-thread-deployed-YYYYMMDD-HHMMSS/summary.json
```

Replace the timestamp placeholder with the actual run time. Record the deployment URL, deployment/commit identity and headers or published build identity where available; mark identity **unknown** otherwise. The shell script's local Git/source/build metadata describes the auditing checkout, **not** proof of the remote deployed version. Compare equivalent profiles across three runs; public CDN/network/image delivery differs from this local snapshot. If main-thread warnings reproduce after deployment, attribute the affected bundle/module before proposing a separate change. Do not equate no main-thread warning with passing the mobile LCP budget.

The temporary production process and snapshot are removed after saving evidence; the user's port-3000 process stays running.
