# Mobile LCP optimization

## Baselines — 2026-10-08

Fresh Node 24 / Lighthouse 13.5.0 production audits use three cold runs per mobile/desktop profile with the existing pinned tooling. Raw reports and summaries are in `docs/performance/lcp-{deployed,local}-baseline-20261008/`. Each report retains browser version, settings and capture time. All six reports per target pass the existing summary validation with no runtime errors or audit warnings.

The local snapshot serves build `Yc-Tpb0Bk_EHKly3D83zk` on port 3100 from `/private/tmp/portfolio-lcp-baseline.9TVBOw`, not the development checkout's `.next`. Source hashes and dirty state are captured in identity.txt; the served build identity supplements the script's checkout-only metadata. No environment secrets were copied. Deployed source/build identity is unknown: the audit checkout is not proof of remote parity. Public baseline capture overlapped the initial snapshot build and part of local capture; noise is possible and these results are not a candidate acceptance claim. Ambiguous improvement requires serial repetition.

Timing values below are simulated milliseconds; CLS is unitless.

### lcp-deployed-baseline-20261008

| Profile | Metric | Runs                        | Median   | Range            |
| ------- | ------ | --------------------------- | -------- | ---------------- |
| mobile  | lcpMs  | 3317.871, 3531.12, 2091.029 | 3317.871 | 2091.029–3531.12 |
| mobile  | fcpMs  | 1133.871, 2155.62, 1341.029 | 1341.029 | 1133.871–2155.62 |
| mobile  | cls    | 0, 0, 0                     | 0        | 0–0              |
| mobile  | tbtMs  | 8.5, 6.5, 0                 | 6.5      | 0–8.5            |
| desktop | lcpMs  | 907.426, 787.978, 676.418   | 787.978  | 676.418–907.426  |
| desktop | fcpMs  | 707.426, 547.978, 356.418   | 547.978  | 356.418–707.426  |
| desktop | cls    | 0, 0, 0                     | 0        | 0–0              |
| desktop | tbtMs  | 0, 0, 0                     | 0        | 0–0              |

### lcp-local-baseline-20261008

| Profile | Metric | Runs                         | Median   | Range             |
| ------- | ------ | ---------------------------- | -------- | ----------------- |
| mobile  | lcpMs  | 3325.581, 3805.019, 4674.192 | 3805.019 | 3325.581–4674.192 |
| mobile  | fcpMs  | 1225.581, 1215.72, 1206.912  | 1215.72  | 1206.912–1225.581 |
| mobile  | cls    | 0, 0, 0                      | 0        | 0–0               |
| mobile  | tbtMs  | 0.5, 0, 0                    | 0        | 0–0.5             |
| desktop | lcpMs  | 951.149, 940.621, 913.11     | 940.621  | 913.11–951.149    |
| desktop | fcpMs  | 336.46, 332.248, 325.244     | 332.248  | 325.244–336.46    |
| desktop | cls    | 0, 0, 0                      | 0        | 0–0               |
| desktop | tbtMs  | 0, 0, 0                      | 0        | 0–0               |

## Attribution and bounded experiment

Actual RoleTitleLoop server rendering already emits the visible first-role wrapper with `opacity:1;transform:none`. AnimatePresence suppresses the child's declared initial state on first render. No speculative initial-opacity fix is warranted. Intro's heading likewise opts out of entrance initialization, and theme context already preserves server children.

All local mobile reports identify Senior Software Engineer as the LCP node. Deployed mobile run 1 lacks node attribution; run 2 captures an already-exited span, and run 3 supplies role attribution. A snapshot node's exit opacity is not proof that the initial title was hidden. The summary now retains optional LCP nodes, observed subparts and font requests; a focused fixture test verifies missing evidence remains explicitly absent and observed durations are not converted into simulated LCP.

Delivered CSS uses font-display:swap. Both Geist Sans (~69.7kB) and Geist Mono (~71.4kB) preload on entry. The initial hero uses Sans; Mono is used only for the optional below-fold project rail. The bounded experiment will preserve both fonts and fallback settings but disable Mono preloading through Next's existing local-font loader. The browser can still load Mono when that rail is needed. Retain this edit only if paired production evidence supports a repeatable improvement; this is resource contention attribution, not a claim that font blocking or hidden animation has been proven.

Hydrated baseline browser inspection confirms a settled visible role with opacity 1 and no transform; both font preload hints appear. The existing summary's six-report validation and new attribution fixture tests pass.

## Initial-render regression coverage

No hero animation implementation edit was needed: actual Framer Motion SSR emits opacity 1 and transform none. Three focused Node tests now protect the visible first role and accessible copy, reserved title region, ordered cycle/wrap, full 4000ms resume interval, document/greeting pause, reduced-motion static title and listener/timer cleanup. Production HTML checks now require the settled visible first-role wrapper and reject a zero-opacity heading. Both focused tests and baseline production HTML assertions pass.

## Status

The bounded font experiment has not established a qualifying mobile improvement; see the decision and paused status below. The LCP checklist stays open. Fresh deployed baseline also contains one FCP budget failure; older FCP evidence is not a guarantee about this deployment.

## Font experiment and decision

The variant changed only the Mono font definition in the isolated snapshot to use Next localFont with the identical packaged Geist Mono asset, variable, weights and fallback list, plus preload:false. Sans and all hero components remained unchanged. This removes the ~71.4kB Mono request from initial audits; only Sans is requested. No application font edit was copied into the working checkout.

The first experiment comparison did not improve mobile median LCP (4284.782ms versus 3805.019ms baseline). A serial baseline→experiment repeat gives 4667.430ms versus 4288.403ms, but baseline spans 3485.659–4673.381ms and overlaps the experiment. This does not meet the planned improvement-beyond-baseline-variation criterion, and every experimental mobile run still exceeds 2500ms. Desktop improves modestly; that cannot establish mobile acceptance. The experiment is rejected for this LCP change rather than promoted as a fix. Raw reports preserve all attempted measurements and pass the summary validator; settings/browser must be compared per profile, not across profiles.

### lcp-font-experiment-20261008

| Profile | Metric | Runs                         | Median   | Range             |
| ------- | ------ | ---------------------------- | -------- | ----------------- |
| mobile  | lcpMs  | 3694.849, 4293.525, 4284.782 | 4284.782 | 3694.849–4293.525 |
| mobile  | fcpMs  | 1223.712, 1209.263, 1204.891 | 1209.263 | 1204.891–1223.712 |
| mobile  | cls    | 0, 0, 0                      | 0        | 0–0               |
| mobile  | tbtMs  | 10, 0, 0                     | 0        | 0–10              |
| desktop | lcpMs  | 859.142, 857.3, 859.029      | 859.029  | 857.3–859.142     |
| desktop | fcpMs  | 327.657, 326.92, 327.612     | 327.612  | 326.92–327.657    |
| desktop | cls    | 0, 0, 0                      | 0        | 0–0               |
| desktop | tbtMs  | 0, 0, 0                      | 0        | 0–0               |

### lcp-local-baseline-repeat-20261008

| Profile | Metric | Runs                        | Median  | Range             |
| ------- | ------ | --------------------------- | ------- | ----------------- |
| mobile  | lcpMs  | 3485.659, 4667.43, 4673.381 | 4667.43 | 3485.659–4673.381 |
| mobile  | fcpMs  | 1235.659, 1204.98, 1206.68  | 1206.68 | 1204.98–1235.659  |
| mobile  | cls    | 0, 0, 0                     | 0       | 0–0               |
| mobile  | tbtMs  | 20, 0, 0                    | 0       | 0–20              |
| desktop | lcpMs  | 915.177, 917.644, 913.54    | 915.177 | 913.54–917.644    |
| desktop | fcpMs  | 326.071, 327.058, 325.416   | 326.071 | 325.416–327.058   |
| desktop | cls    | 0, 0, 0                     | 0       | 0–0               |
| desktop | tbtMs  | 0, 0, 0                     | 0       | 0–0               |

### lcp-font-experiment-repeat-20261008

| Profile | Metric | Runs                         | Median   | Range             |
| ------- | ------ | ---------------------------- | -------- | ----------------- |
| mobile  | lcpMs  | 4288.403, 4286.29, 4292.516  | 4288.403 | 4286.29–4292.516  |
| mobile  | fcpMs  | 1206.702, 1205.645, 1208.758 | 1206.702 | 1205.645–1208.758 |
| mobile  | cls    | 0, 0, 0                      | 0        | 0–0               |
| mobile  | tbtMs  | 0, 0, 0                      | 0        | 0–0               |
| desktop | lcpMs  | 855.91, 858.365, 852.665     | 855.91   | 852.665–858.365   |
| desktop | fcpMs  | 326.364, 327.346, 325.066    | 326.364  | 325.066–327.346   |
| desktop | cls    | 0, 0, 0                      | 0        | 0–0               |
| desktop | tbtMs  | 0, 0, 0                      | 0        | 0–0               |

Experiment build: AUZiuMgqnDXm4F15ASEAt
Experiment layout hash: 26d4bf0bef0906edb54db3f260eb3296a22a1efd6f92725335d1208c7b9d5d54 /private/tmp/portfolio-lcp-font.FbCHkq/app/layout.tsx

## Browser and integration evidence

Unchanged baseline production HTML was checked in the in-app browser at 320px and 1280px in both themes: visible settled roles, no horizontal overflow. The 320px title region is 256×252px and positioning starts at y=652 in the observed Senior-title views across themes. Desktop reserves a 736×168px region. Node tests verify the full cycle and pause/reduced-motion behavior; a complete browser cycle, OS reduced-motion and hidden-tab pause acceptance are not claimed and remain pending with task 2.2.

A local fixture served unchanged production HTML with CSP script-src 'none': Senior Software Engineer stayed visible at opacity 1 and the native Intro Contact link worked. A separate fixture delayed chunk delivery by 15 seconds; the initial unhydrated desktop view showed the visible first role and Contact link. Later normal hydrated inspection showed settled cycling roles. This is an initial/delayed-readability spot check, not a recorded continuous hydration trace. Evidence: [mobile hero](performance/lcp-local-baseline-20261008/hero-mobile.png), [desktop hero](performance/lcp-local-baseline-20261008/hero-desktop.png), [delayed-script hero](performance/lcp-local-baseline-20261008/hero-delayed.png).

All 33 Node tests, pnpm lint, isolated baseline/experiment builds (including TypeScript validation) and production HTML checks pass. Prettier and git diff whitespace checks cover edited diagnostics/tests/docs. Existing optional-Sharp and stale-Browserslist advisories were not changed. No runtime dependency, hero design, role content, application loading behavior or checklist completion was changed. Development port 3000 is left running; temporary servers, tabs and snapshots are cleaned up after evidence capture.

## Historical pause before the approved revision

Progress is 3/6 tasks complete (baseline, attribution and initial-render regression coverage). Task 2.2's complete browser acceptance and task 3.1's proven local improvement are unfinished; deployed acceptance is also pending. The current initial-render/font-preload approach has not met the target. Proceeding requires approval to revise the plan for detailed LCP trace/simulation attribution and potentially broader critical-path changes, not another speculative initial-opacity fix. No deploy-ready performance candidate exists yet. The LCP checklist remains open; earlier checklist numbers were not overwritten with passing claims.

## Approved trace investigation (2026-10-08)

The approved plan now has eight tasks. Fresh serial production captures are in `performance/lcp-trace-baseline-20261008`, with six reports, each report's `-0.trace.json` and `-0.devtoolslog.json`, served build ID, source hashes and summary. No build or other audit ran concurrently. The isolated snapshot preserves the working source and excludes environment files; the live development build was untouched. Report settings and browser versions are retained in `summary.json`. These are local diagnostics, not deployed acceptance.

`scripts/analyze-lcp-trace.cjs` reads the saved candidate timeline and recomputes optimistic/pessimistic Lantern graphs using the same cached Lighthouse 13.5.0 package and report settings. Every recomputed final simulated LCP matches its saved value within 1ms. Its attribution JSON retains all graph nodes with separately labeled observed starts and simulated start/end times. Empty source maps and HostDPR 1 are explicit reconstruction inputs; this uses Lighthouse's default devtools-log graph, not its optional trace-engine graph. The raw report remains authoritative. Fixture tests cover absent candidates, malformed candidate/timing evidence and observed-versus-simulated separation.

| Profile | Metric | Runs                         | Median   | Range             |
| ------- | ------ | ---------------------------- | -------- | ----------------- |
| mobile  | LCP ms | 3663.126, 4711.966, 4596.128 | 4596.128 | 3663.126–4711.966 |
| mobile  | FCP ms | 1221.042, 1206.276, 1206.037 | 1206.276 | 1206.037–1221.042 |
| mobile  | CLS    | 0, 0, 0                      | 0        | 0–0               |
| mobile  | TBT ms | 2, 5.5, 0                    | 2        | 0–5.5             |
| desktop | LCP ms | 920.338, 912.466, 915.413    | 915.413  | 912.466–920.338   |
| desktop | FCP ms | 328.135, 324.986, 326.165    | 326.165  | 324.986–328.135   |
| desktop | CLS    | 0, 0, 0                      | 0        | 0–0               |
| desktop | TBT ms | 0, 0, 0                      | 0        | 0–0               |

Observed mobile LCP is 182, 105 and 82ms, with the initial Senior Software Engineer span the final main-frame candidate. Trace collection ends at 3474, 2475 and 2445ms, before the normal four-second first transition. Thus these traces do not attribute the simulated delay to a later role transition. They also cannot establish full-cycle browser acceptance.

Mobile run 1's optimistic/pessimistic estimates both end at 3663.126ms: shared chunk `683` is the last simulated network node, with Mono ending at 3621.042ms and Sans at 3471.042ms. Run 2 combines 4411.966/5011.966ms estimates, and run 3 combines 4221.128/4971.128ms. Shared scripts, font transfers and a layout task compete in those simulation graphs. The observed CSS dependency chain ends at about 122ms in run 1; observed initial title paint follows at 182ms. Low TBT does not remove network competition from simulated LCP. This is not evidence that the hero waited several actual seconds to become visible.

Falsifiable experiment hypothesis: delaying Sans discovery from the preload hint to CSS discovery, with the identical packaged font and swap/fallback behavior, may change the early network competition and reduce the graph's simulated critical path. The experiment must show the predicted request/discovery change and a reproducible mobile improvement outside the baseline range before retention. It changes no role timer, audit window, markup, text or below-fold behavior. The previously rejected Mono variant is not reintroduced.

### Sans-discovery experiment: rejected

Six fresh serial reports and traces are in `performance/lcp-sans-timing-experiment-20261008`, including the exact isolated patch, served build and layout hash. The baseline snapshot was copied without build output or environment secrets and only the Sans definition changed. No working application file received the experimental patch. Profiles, storage reset and browser version match the baseline per profile.

The predicted discovery change occurred: Sans was no longer a link preload. In warm-server mobile runs 2/3, its request started at 36.296/37.417ms versus Mono's preloaded 15.248/17.030ms. Font resource bytes were not removed. The mobile LCP range still overlaps baseline, all LCP runs fail 2500ms, and every mobile FCP now fails 1500ms. This is a clear rejection, so repeating a variant that already violates the FCP gate is not justified. The normal preload remains in the working application. No qualifying rendering/loading intervention is retained.

| Profile | Metric | Runs                         | Median   | Range             |
| ------- | ------ | ---------------------------- | -------- | ----------------- |
| mobile  | LCP ms | 3674.967, 4670.197, 3998.762 | 3998.762 | 3674.967–4670.197 |
| mobile  | FCP ms | 1560.322, 1510.099, 1511.881 | 1511.881 | 1510.099–1560.322 |
| mobile  | CLS    | 0.011203, 0, 0.011203        | 0.011203 | 0–0.011203        |
| mobile  | TBT ms | 15, 0, 0                     | 0        | 0–15              |
| desktop | LCP ms | 931.977, 930.148, 934.865    | 931.977  | 930.148–934.865   |
| desktop | FCP ms | 371.977, 370.148, 374.865    | 371.977  | 370.148–374.865   |
| desktop | CLS    | 0.000124, 0.020789, 0.020789 | 0.020789 | 0.000124–0.020789 |
| desktop | TBT ms | 0, 0, 0                      | 0        | 0–0               |

### Additional browser evidence and status before the October 9 experiments

`performance/lcp-trace-baseline-20261008/browser-cycle.json` records 19 real browser observations over 18 seconds at 320px: Senior → Full Stack → Lead → Front-End → Senior → Full Stack. The reserved title region stayed 256×252px, with no horizontal overflow throughout the observed cycle. Dark mobile retained that geometry; desktop in both themes retained 736×168px and no overflow. The native hero Contact link reached `#contact` with Enter. A dark-mobile screenshot is saved alongside the capture. This complements the earlier initial/no-script/delayed-script evidence rather than claiming continuous delayed-hydration coverage.

All 36 Node tests, lint, both isolated production/type builds, both production HTML checks, strict change validation and diff whitespace checks pass. The new diagnostic files are formatted. The tool controls cannot emulate reduced motion or reliably control document visibility, so those browser checks remain pending: the user agreed to verify reduced motion and background-tab pause/resume manually, but has not yet reported results. Greeting pause/resume and complete delayed-hydration browser acceptance also remain pending. Node coverage is not substituted for these requirements.

At that checkpoint, progress was 4/8 tasks complete. The following experiments supersede that status without changing the deployed acceptance gate.

## October 9: retained below-fold delivery improvements

The traced initial-load graph included project JavaScript and oversized project images competing with the hero critical path. Two narrow interventions are retained: dynamically import the existing project details drawer only after first activation, and declare responsive carousel image sizes. The drawer remains mounted after first opening to preserve exit animations and focus restoration. Video still loads only while open. Card HTML, fonts, hero design, role order/cadence and Contact contracts remain unchanged; no dependency was added.

Seven fresh six-report sets retain every run, trace, network log, attribution, summary, source identity and served build:

- `performance/lcp-drawer-baseline-20261009`
- `performance/lcp-drawer-candidate-20261009`
- `performance/lcp-drawer-baseline-repeat-20261009`
- `performance/lcp-drawer-candidate-repeat-20261009`
- `performance/lcp-project-images-20261009`
- `performance/lcp-final-baseline-20261009`
- `performance/lcp-final-candidate-20261009`

All captures used pinned Lighthouse 13.5.0, unchanged mobile/desktop profiles and storage reset, serially against isolated production builds. No active development build was modified. Observed trace timestamps remain separate from simulated Lighthouse LCP; attribution files reconstruct the simulation rather than treating role transitions as proof of an opacity defect.

The initial drawer-only comparison had overlapping mobile ranges (baseline 4109–4669ms, candidate 3171–4448ms), so it was repeated. Repeat baseline median/range was 4668.114ms / 4667.344–4668.827ms; candidate was 4446.169ms / 4441.394–4452.102ms. Initial transferred JavaScript fell from 282135 to 262441 bytes; Next's first-load estimate fell from 249kB to 228kB. The drawer-only patch and extracted source are preserved beside its reports.

The separate image-only variant changed no drawer code. Mobile median LCP was 4592.149ms; carousel requests selected 640px instead of 3840px. Initial mobile image transfer fell from 587073 to approximately 136771 bytes, saving about 440KiB. Portrait and font delivery were unchanged. The final combined comparison below, not an isolated bandwidth estimate, determines retention.

### Final matched production comparison

Baseline served build: `5GBOHUs0idNKvQnYKcv4w`. Candidate: `5C1GQ_JrTbgLhDBCvgeap`. Complete identities, settings, individual reports and metric ranges are in each set's `identity.txt`, `served-build.txt` and `summary.json`.

| Profile / build   | LCP runs, ms                 | LCP median, ms | FCP runs, ms                 | CLS runs | TBT runs, ms |
| ----------------- | ---------------------------- | -------------- | ---------------------------- | -------- | ------------ |
| Mobile baseline   | 4668.297, 4666.129, 4667.035 | 4667.035       | 1205.228, 1204.608, 1204.867 | 0, 0, 0  | 0, 0, 0      |
| Mobile candidate  | 3477.514, 4367.718, 4370.913 | 4367.718       | 1227.514, 1205.062, 1205.975 | 0, 0, 0  | 6.5, 0, 0    |
| Desktop baseline  | 915.068, 912.359, 913.301    | 913.301        | 326.027, 324.944, 325.320    | 0, 0, 0  | 0, 0, 0      |
| Desktop candidate | 860.936, 891.761, 894.093    | 891.761        | 328.374, 324.704, 325.637    | 0, 0, 0  | 0, 0, 0      |

Mobile median improves 299.316ms (6.4%). Candidate maximum 4370.913ms is below baseline minimum 4666.129ms; the gap exceeds the baseline's 2.167ms variation. All runs are retained, including the more variable first candidate run. FCP remains below 1500ms, CLS is zero, and desktop remains below the LCP budget. Combined initial JavaScript transfer is 262462 versus 282135 bytes. **Every mobile LCP still exceeds 2500ms; this is local improvement, not deployed acceptance.**

### Regression and browser evidence

All 38 Node tests pass, including deferred activation/mount retention and responsive image candidate selection. Existing video assertions follow the extracted drawer. Production HTML profile-link checks now verify the accessible labels of the previously requested icon-only links, rather than obsolete visible text. Lint, isolated production/type builds and baseline/candidate HTML checks pass.

Candidate browser evidence is saved in `performance/lcp-final-candidate-20261009`. Keyboard opening focuses Close, Next changes the project, Escape/Close restores focus to the original trigger, and the drawer works at desktop and 320px without horizontal overflow (`drawer-desktop.png`). Light/dark mobile cycle captures retain the ordered roles and reserved 256×252px region. Greeting activation pauses the role, then resumes on a fresh interval (`browser-greeting-pause.json`). The native Contact anchor works without JavaScript (`browser-no-script.json`).

The delayed-script fixture captures 120 observations at roughly 500ms intervals, spanning unhydrated to hydrated state (`browser-hydration-verified.json`). It uses the post-hydration Project view controls as the readiness marker. Earlier delayed captures used an always-server-rendered carousel marker and are diagnostic only, not hydration acceptance evidence. Sampling is not a claim of continuous frame coverage. The fixture is separate from the audited production app.

Current progress: **6/8 tasks complete**. Task 3.3 remains pending for complete browser acceptance, including the user's reduced-motion and background-tab verification; agreement to check manually is not a passing result. Task 5.1 remains pending for user-controlled deployment, confirmed identity and three passing mobile plus three desktop audits. The checklist remains unchecked and this change is not ready to archive as complete.
