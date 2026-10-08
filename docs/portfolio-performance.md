# Portfolio performance

## Reproducible audits

Use Node 24 and installed Chrome with Lighthouse pinned to 13.5.0. This is development tooling invoked through pnpm, not a production dependency. Build and start the production app with `pnpm build` and `pnpm start --hostname 127.0.0.1 --port 3100`; never use a development server for timing comparisons.

Run `sh scripts/audit-performance.sh <URL> <new-report-directory>`. Example: `sh scripts/audit-performance.sh https://escolano-portfolio.vercel.app/ docs/performance/deployed-baseline`. Report directories must be unique so baselines cannot be overwritten. Record local baseline and candidate in separate directories using the same machine, browser, tool, and profiles.

Each invocation runs three fresh browser audits for mobile and desktop with Lighthouse storage reset enabled. Mobile defaults use simulated throttling: 150ms RTT, 1638.4Kbps throughput, CPU slowdown 4, and 412×823 viewport at DPR 1.75. Desktop uses the pinned desktop preset; exact viewport, CPU, and network settings are authoritative in each report's `configSettings`, along with browser version in `environment` and capture time in `fetchTime`. Do not mix real-browser raw timing and simulated audit timing.

Raw JSON reports include FCP, LCP, CLS, TBT, environment, diagnostics and settings. `identity.txt` records URL, timestamp, local build/HEAD, dirty status and source hashes. For deployed reports, that local identity describes the audit checkout only, not deployed source parity. Record public deployment metadata separately; an unavailable deployed source identity is unknown, not assumed equal to local.

Summaries must retain all three values plus median and range for each metric/profile. Timing checklist gates require every valid deployed run in both profiles to meet FCP <1500ms, LCP <2500ms, and CLS <0.1. Failed or missing measurements are never passing evidence. Local baseline/candidate comparison diagnoses code changes, not Vercel latency or deployed candidate improvement.

Modern Lighthouse does not provide the legacy TTI target; retain it as unverified/unsupported. Report TBT separately, not as a substitute for TTI <3.5s. Field data is not collected by this CLI and remains unavailable unless separately obtained with its population and time window.

## Current evidence

Qualifying baseline reports all have valid numeric FCP/LCP/CLS/TBT results and no runtime error. Values below are milliseconds except unitless CLS, rounded for readability; raw JSON retains full precision. TTI is absent in every report. Field data was not collected.

Chrome 154.0.0.0 on macOS was used for both baselines. Desktop settings are 1350×940, DPR 1, simulated RTT 40ms, throughput 10240Kbps and CPU slowdown 1. Mobile settings are those above. Local source hashes and build IDs are in each directory's `identity.txt`; the unchanged local source was audited before the video boundary edits. Public deployment source/build identity is unknown. HTTP 200, Vercel cache HIT and ETag `"f4503311a1558d2e081704eb64a37fc1"` were observed at 2026-10-08T06:50:19Z; this is response identity, not source parity.

The directories `deployed-baseline` and `local-baseline` are exploratory, excluded from acceptance/comparison because their initial runs overlapped; the local run was interrupted. Qualifying baselines use `deployed-serial-baseline` and `local-serial-baseline`, captured sequentially without concurrent audits or builds.
### deployed-serial-baseline


| mobile metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 834.42, 831.41, 824.01 | 831.41 | 824.01–834.42 |
| largest-contentful-paint | 3442.92, 3440.91, 3432.51 | 3440.91 | 3432.51–3442.92 |
| cumulative-layout-shift | 0.0134, 0.01427, 0.01507 | 0.01427 | 0.0134–0.01507 |
| total-blocking-time | 40.5, 38.5, 36.5 | 38.5 | 36.5–40.5 |

Capture times (UTC): 2026-10-08T06:53:00.546Z, 2026-10-08T06:53:11.659Z, 2026-10-08T06:53:22.669Z

| desktop metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 284.89, 279.86, 280.48 | 280.48 | 279.86–284.89 |
| largest-contentful-paint | 700.89, 675.86, 697.98 | 697.98 | 675.86–700.89 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |
| total-blocking-time | 0, 0, 0 | 0 | 0–0 |

Capture times (UTC): 2026-10-08T06:53:33.747Z, 2026-10-08T06:53:44.869Z, 2026-10-08T06:53:55.988Z

### local-serial-baseline


| mobile metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 1206.48, 1205.79, 1205.01 | 1205.79 | 1205.01–1206.48 |
| largest-contentful-paint | 4812.96, 4851.58, 4810.02 | 4812.96 | 4810.02–4851.58 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |
| total-blocking-time | 0, 0, 0 | 0 | 0–0 |

Capture times (UTC): 2026-10-08T06:54:08.327Z, 2026-10-08T06:54:19.040Z, 2026-10-08T06:54:29.691Z

| desktop metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 325.17, 326.34, 325.39 | 325.39 | 325.17–326.34 |
| largest-contentful-paint | 912.93, 915.85, 913.48 | 913.48 | 912.93–915.85 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |
| total-blocking-time | 0, 0, 0 | 0 | 0–0 |

Capture times (UTC): 2026-10-08T06:54:40.337Z, 2026-10-08T06:54:51.002Z, 2026-10-08T06:55:01.679Z
## Local candidate

Qualifying reports: `local-serial-candidate-valid`. The earlier `local-serial-candidate` attempt failed because sandbox permissions prevented the server from listening; it is excluded. Candidate reports have no runtime errors and use identical Lighthouse, Chrome and profile settings to the local baseline.

| mobile metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 1208.68, 1205.09, 1207.93 | 1207.93 | 1205.09–1208.68 |
| largest-contentful-paint | 4863.36, 4810.18, 4815.86 | 4815.86 | 4810.18–4863.36 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |
| total-blocking-time | 3, 0, 0 | 0 | 0–3 |

Capture times (UTC): 2026-10-08T06:59:42.596Z, 2026-10-08T06:59:53.442Z, 2026-10-08T07:00:04.370Z

| desktop metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 325.17, 334.92, 326.62 | 326.62 | 325.17–334.92 |
| largest-contentful-paint | 919.93, 954.8, 916.55 | 919.93 | 916.55–954.8 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |
| total-blocking-time | 0, 0, 0 | 0 | 0–0 |

Capture times (UTC): 2026-10-08T07:00:15.066Z, 2026-10-08T07:00:26.173Z, 2026-10-08T07:00:37.175Z

Local median FCP changes from 1205.79 to 1207.93ms mobile and 325.39 to 326.62ms desktop. Median LCP changes from 4812.96 to 4815.86ms mobile and 913.48 to 919.93ms desktop. CLS stays zero. These samples show no meaningful paint improvement from splitting the player; the change reduces initial JavaScript, not the dominant paint cost. Production build route size falls from 57.5 to 50.1kB and first-load JS from 256 to 249kB. No candidate was deployed, so the deployed baseline is not a candidate result.

## Demand boundaries and verification

`ProjectVideoFrame` is small initial code; Next dynamically imports `project-video.tsx` only when the open drawer's selected project has video and no screenshot gallery. That module alone imports ReactPlayer. Dynamic import failure and render exceptions show a screenshot plus feedback. Media readiness/error callbacks keep the 16:9 frame and fallback stable. URL-keyed remounts reset failures and readiness; closing or leaving a video unmounts its player, allowing ReactPlayer to stop/dispose playback. Existing `playing`, `loop`, dimensions and default controls are retained.

Browser checks used the production build, not a dev server. A local-only logging proxy forwarded unchanged responses from port 3100 to a fresh origin at 3101. `browser-requests.ndjson` records the requests. At initial load: 32 requests, zero player chunks. After opening MatterWorx (image-only): 33 requests, zero player chunks and zero iframes. At Valuation video demand: 36 requests, including `278.5bb0b8e7437f7b65.js` (ReactPlayer implementation), `317.654dd9bbc1395ded.js` (video component), and `reactPlayerYouTube.c73b47ebcc6cd162.js` at 07:02:49Z. YouTube API scripts and the video iframe appeared only after demand. All six candidate Lighthouse network reports also contain zero player/component/provider/video requests initially. The shared data chunk `162-6040ffda1670cbab.js` contains feedback copy, not ReactPlayer, and is not a video implementation request.

MatterWorx and Potato screenshots, Valuation/Owner videos, neighbor titles, navigation while loading, close, and project-button focus return were checked. Video-to-image removes the iframe; video-to-video replaces its URL. At 320px and 1350px in light/dark themes the drawer remains usable without horizontal page overflow. A second local-only proxy returned 503 for the video component chunk: the Valuation screenshot and failure text appeared, navigation to Potato and close still worked. A third proxy delayed that chunk by five seconds: leaving Valuation for Potato before completion kept Potato's screenshot with no iframe after completion. These proxies are temporary test tooling, not application changes.

Focused Node tests cover deferred module invocation/failure, loading/media error and stale readiness, render failure, URL reset keys and closed/image-only mounting guards. Reduced-motion card behavior is tested with the preference enabled (zero rotations and no pointer motion writes); the new video UI adds no animation. The existing journey's reduced-motion `matchMedia` branch is unchanged; OS-level preference emulation was not available in the browser API. Sound starts off, opt-in/on/off controls worked, and was restored off. The existing 3D journey remained absent initially and loaded only on Show 3D journey; its timeline remains readable beforehand. Pretext remains dynamically imported after description demand and its existing layout/SSR tests pass. No real contact form was submitted and no deployment was performed.

Validation: `pnpm lint`, `pnpm exec tsc --noEmit`, `node --test tests/*.test.cjs`, `pnpm build`, and `python3 tests/portfolio-html.py .next/server/app/index.html` pass. The HTML check validates readable semantic content before hydration, including the existing server-first theme provider behavior.

## Budget decisions and follow-up

Every deployed run in both profiles meets FCP <1500ms and CLS <0.1, so those checklist rows are complete for this captured lab baseline only. Mobile LCP is 3432.51–3442.92ms, above 2500ms; LCP stays open. Legacy TTI is unsupported/unmeasured and stays open; TBT is diagnostic, not equivalent. No field-performance guarantee is made. Investigating the mobile LCP element/render delay and broader critical-path costs is a separate optimization proposal, not silently added to this change.
