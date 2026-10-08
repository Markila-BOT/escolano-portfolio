# Project description layout

Drawer description paragraphs use `ProjectDescription` and `@chenglou/pretext` 0.0.9. Case-study Problem, Role, and Outcome text now uses the same measured-line renderer. Other shared text reveals, hero copy, and rail previews are unchanged.

## Rendering and fallback

The initial output is a complete semantic paragraph. Enhancement loads Pretext on paragraph demand, waits for the relevant font, and obtains the available width from the container. Prepared handles are cached by text, font, letter spacing, and font generation, with at most 64 entries. Width changes reuse preparation and compute new lines. Observers and stale results are cleaned up when content changes or unmounts.

Measured spans preserve source whitespace and text order. Unfaithful materialization, failed imports/fonts, or unavailable widths retain ordinary browser wrapping. Description paragraphs explicitly allow selection and disable drawer dragging on their text. The staggered reveal starts at 55% opacity with a 6 px rise and completes in at most 500 ms, is immediately settled under reduced motion, and does not replay during width updates.

The paragraph's server-rendered fixture works without JavaScript. This does not make the existing interactive drawer itself openable without JavaScript.

## Verification — 2026-10-08

- Four focused Node tests pass: preparation caching/invalidation/eviction, source text and whitespace fidelity including Unicode/bidi input, unfaithful-layout fallback, and complete server-rendered paragraph markup.
- Production Chrome checks pass at 320, 768, and 1440 px in both themes: exact text content, no paragraph overflow, and equal measured/native paragraph heights. WebOTX paragraphs initially measured 52 and 26 px, equal to ordinary wrapping.
- Browser text selection returns the exact original paragraph. Enlarged text, reduced motion, rapid neighbor navigation, and focus return pass.
- Blocking the lazy package and font requests leaves readable ordinary paragraphs.
- Lint, strict TypeScript, production build, and the existing production-HTML regression check pass.

## Costs and interpretation

The baseline production build reported 56.2 kB for the page and 255 kB first-load JavaScript; the enhanced build reports 57.2 kB and 256 kB. The separately loaded Pretext chunk is approximately 15,876 gzip bytes. These build figures are rounded; the lazy chunk is not part of the initial route payload.

A Chrome microbenchmark used one 229-character WebOTX paragraph, `500 16px Arial`, 26 px line height, and 1,000 width changes from 280 to 979 px. Cold preparation measured 8.2–15.4 ms across two runs; cached layout averaged 0.0029–0.0073 ms. A forced native paragraph height measurement averaged 0.0073 ms in the comparison run. This artificial native benchmark intentionally reads layout; the original renderer did not do that in an application loop. These measurements do not establish an application speedup.

The enhancement adds preparation and transfer cost to provide controlled line presentation. No rendered word or line geometry is read to choose breaks. The browser still performs normal DOM layout. Original drawer visibility measured 67 ms in one MatterWorx run; candidate timings included rail expansion and a different project, so they are not a valid latency comparison. Do not treat either as a performance budget or improvement claim.
