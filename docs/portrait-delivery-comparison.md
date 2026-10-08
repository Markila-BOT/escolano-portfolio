# Portrait delivery comparison

Baseline methodology and measurements: [portrait-delivery.md](portrait-delivery.md). Candidate raw reports: `performance/portrait-candidate/`; build/source identity is in `identity.txt`. Times below are milliseconds; CLS is unitless.

## mobile

Capture times: 2026-10-08T07:22:07.367Z, 2026-10-08T07:22:18.596Z, 2026-10-08T07:22:29.707Z

| Metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 1214.987, 1205.9388, 1211.2646 | 1211.2646 | 1205.9388–1214.987 |
| largest-contentful-paint | 4290.961, 4520.7858, 4539.426100000001 | 4520.7858 | 4290.961–4539.426100000001 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |

Run 1 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=384&q=95","encodedBytes":33958,"transferBytes":34377,"bytesSaved":34140,"estimatedWaste":22474}

Run 2 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=384&q=95","encodedBytes":33958,"transferBytes":34376,"bytesSaved":34140,"estimatedWaste":22474}

Run 3 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=384&q=95","encodedBytes":33958,"transferBytes":34376,"bytesSaved":34140,"estimatedWaste":22474}

## desktop

Capture times: 2026-10-08T07:22:40.813Z, 2026-10-08T07:22:51.615Z, 2026-10-08T07:23:02.395Z

| Metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 327.7713, 329.2176, 328.62480000000005 | 328.62480000000005 | 327.7713–329.2176 |
| largest-contentful-paint | 919.4282499999999, 923.044, 921.5620000000002 | 921.5620000000002 | 919.4282499999999–923.044 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |

Run 1 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"bytesSaved":0,"estimatedWaste":6993}

Run 2 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"bytesSaved":0,"estimatedWaste":6993}

Run 3 portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"bytesSaved":0,"estimatedWaste":6993}

## Interpretation and verification

Mobile audit requests changed from w=640 (68098 encoded bytes) to w=384 (33958 bytes), saving 34140 bytes / 33.34 KiB / 50.13% in every run. Desktop DPR 1 keeps w=256 and 17916 bytes, so its savings are zero. The mobile portrait estimated waste remains 22474 bytes (21.95 KiB), desktop 6993 bytes (6.83 KiB); default candidate rounding and unchanged quality 95 leave optimization headroom. The pasted 57.2 KiB is an estimate, not the measured saving. Project image findings remain outside this change.

All candidate and baseline report settings/browser versions were compared for equality; no report has a runtime error. Mobile LCP still exceeds 2.5s; no deployed budget row changes. Local results do not establish deployed savings or source parity. Portrait transfer-size savings are distinct from encoded byte savings; neither implies the entire page's LCP improved.

The component now uses intrinsic 160×160 dimensions and sizes=160px. Source PNG, priority, quality 95, circular crop, border, shadow and CSS are unchanged. Focused tests exercise the actual Intro component and installed Next image-props generator: width candidates select 256px at DPR 1 and 384px at DPR 2 under the smallest-sufficient-candidate rule. Browser heuristics can reuse larger cached candidates, which is why cold audits are authoritative for byte comparison.

Production browser checks on a fresh local origin (port 3104) observed a 160×160 box and w=384 initially; 320px and 1350px overrides observed w=256 and the same box. Both light/dark screenshots retain the subject, crop and styling. Explicit DPR emulation/native DPR reporting is unavailable in the browser API, so exact DPR 2 runtime coverage is not claimed; focused DPR 1/2 tests plus cold audit DPR 1/1.75 request evidence cover source selection. Default-font-size assumption is unchanged. CLS is zero in all six candidate audits, with no new portrait shift observed. Existing animated role text is unrelated.

Initial production HTML checks verify the accessible name, square dimensions, responsive size hint, high fetch priority, non-lazy loading and matching head preload independently of JavaScript. This establishes early discovery without a browser JavaScript toggle. Validation passes: pnpm lint, pnpm exec tsc --noEmit, node --test tests/*.test.cjs (17 tests), pnpm build, and python3 tests/portfolio-html.py .next/server/app/index.html. Build first-load JS stays 249kB. No global image configuration, dependencies or other image components were changed in this implementation; prior unrelated working-tree edits were preserved. No real form was submitted and no deployment was performed.
