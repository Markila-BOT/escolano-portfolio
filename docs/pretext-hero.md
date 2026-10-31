# Pretext hero benchmark

Measured 2026-10-31 with `node scripts/pretext-hero-bench.mjs`. The hero effect does not ship. The benchmark row in `CHECKLIST.MD` section 11.1 is recorded. The effect rows stay open, and the pretext bullet in `docs/technology-convention.md` stays drawer-only.

## Gzip

The hero import is the package entry `@chenglou/pretext` (`prepareWithSegments`, `layoutWithLines`, `layoutNextLineRange`). That entry pulls these unminified modules: `bidi.js`, `analysis.js`, `measurement.js`, `line-break.js`, `line-text.js`, and `layout.js`.

Concatenated gzip of those files is **21,552 bytes**. The gate is 15kB (15,000 bytes). 21,552 exceeds it. The same comparison against 15×1024 (15,360) also fails.

The production drawer already loads this package as a separate chunk. [Project description layout](project-description-layout.md) recorded that chunk at about **15,876 gzip bytes** on 2026-10-08, and recorded that the lazy chunk is not part of the initial route payload. 15,876 also exceeds 15,000. A hero dynamic import would share that chunk rather than add 15kB to Next's first-load JavaScript, and it would still download it for the introduction. The design treats that hero-path chunk as the gate.

## Prepare and resize

Headless Chrome prepared the three greetings and the positioning sentence once, with the font string `16px Geist` and `letterSpacing: 0`. Headless Chrome was not given the site's Geist file, so the widths are that browser's fallback for the requested family. The cost is still the canvas preparation of those four strings.

| Measure | Result |
| --- | --- |
| Cold `prepareWithSegments` for all four strings | 55.1 ms |
| `layoutWithLines` across 31 widths (280–520 px, step 8) for all four strings | 0.60 ms for 124 layouts |
| Average layout after preparation | 0.0048 ms |
| `layoutNextLineRange` of the positioning sentence at 160 px | 7 ranges |

An earlier virtual-time dump in the same session reported 39.8 ms and 54.6 ms for the same cold prepare. One virtual-time sample collapsed `performance.now()` to 0 ms and was discarded. The script's printed run is the 55.1 ms row.

## Current production LCP

No new production build was taken. `next dev` is already using `.next`, and the gzip gate failed before an effect build.

The recorded lab in [portfolio performance](portfolio-performance.md) is the current production LCP reference:

| Profile | LCP | Captured |
| --- | --- | --- |
| Local mobile median | 4815.86 ms | 2026-10-08 |
| Local desktop median | 919.93 ms (916.55–954.8) | 2026-10-08 |
| Deployed mobile | 3432.51–3442.92 ms | same lab |

These figures are not a run of this checkout. LCP delta versus an effect build: **not measured**. The byte gate already failed, so the effect was not built and was not left half-wired.

## Decision

The hero stays on `react-wrap-balancer` and the current greeting glitch. No portrait wrap, no hero pretext import, and no checklist rows closed.
