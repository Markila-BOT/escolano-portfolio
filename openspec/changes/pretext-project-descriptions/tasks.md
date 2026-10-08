# Tasks

## 1. Layout adapter and dependency

- [x] 1.1 Capture baseline production bundle and drawer paragraph timings, then add `@chenglou/pretext` with pnpm and document its pinned/resolved version and role in `docs/technology-convention.md`; verify the installed exports match `prepareWithSegments`/`layoutWithLines` and record baseline and package costs in `docs/project-description-layout.md`.
- [x] 1.2 Implement `lib/project-description-layout.ts` with a bounded prepared-handle cache and width-only relayout path; add focused tests using the existing test style for text/font key changes, repeated-width calls, whitespace fidelity, long words, Unicode, and bidirectional text, and verify the tests pass without asserting unmeasured performance gains.

## 2. Paragraph enhancement

- [x] 2.1 Add `components/project-description.tsx` with complete initial paragraph text, lazy measurement loading, font readiness, observed content width, typography invalidation, and cancellation on unmount/content changes; verify blocked font/package loads and zero width retain readable fallback text, and test server-rendered paragraph markup independently with JavaScript disabled.
- [x] 2.2 Render measured line spans with intact semantic reading order, copying, and meaningful whitespace; use a bounded Framer Motion reveal with a settled reduced-motion path and no replay on resize. Verify text selection/copy matches the original and the full reveal completes within 500 ms with no visible layout jump.
- [x] 2.3 Replace only the drawer description call site, retaining other shared reveal consumers; verify longest/shortest descriptions at 320, 768, and 1440 px, both themes, 200% zoom, delayed fonts, and rapid neighbor navigation without stale content or overflow, recording results in `docs/project-description-layout.md`.

## 3. Integration and evidence

- [x] 3.1 Compare candidate and baseline in production for preparation, repeated resizing, compressed bundle delta, and visible line behavior; document measured results and any regressions, and verify no repeated rendered word/line geometry reads are used to compute breaks. If unresolved parity or material cost regressions require changing the approach, pause for a plan update before marking this complete.
- [x] 3.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, focused layout tests, and `tests/portfolio-html.py` against production HTML; verify drawer Previous/Next, focus restoration, media, and Carousel/Rail browsing state remain intact. Use a production server for browser checks rather than starting `pnpm dev` without permission.
- [x] 3.3 Update the current drawer-description checklist row and the overlapping future drawer-paragraph item to refer to the same completed behavior without marking unrelated hero typography complete; reconcile applicable totals and verify the documentation matches recorded acceptance results.
