# Tasks

## 1. Bounded local utility logic

- [x] 1.1 Add pure typed JSON formatting, word/code-point counting, URL component encode/decode, and shared input-limit handling in `lib/browser-tools.ts`; verify Node tests cover valid JSON objects/scalars, malformed/blank JSON, markup strings, whitespace, emoji/combining marks, URL round trips, literal plus signs, invalid escapes/UTF-8/surrogates, and limit boundary values.
- [x] 1.2 Document JSON normalization, counting definitions, component URL semantics, the 100,000-unit limit, and local-only handling in `docs/browser-tools.md`; verify examples against the pure-function tests and avoid claims of lossless JSON processing.

## 2. Tools page and accessible interactions

- [x] 2.1 Add the server-rendered `/tools` directory and three independent client utility sections using existing tokens and primitives; verify static HTML includes one h1/main with the skip-link target, directory anchors, instructions, visible labels, and the no-JavaScript explanation.
- [x] 2.2 Wire explicit transformation actions, current-result invalidation, associated errors, bounded paste rejection, independent Reset, and live counts; add interaction tests proving retained input on errors, stale output cannot be copied, successful empty URL results remain valid, and resetting one section does not clear others.
- [x] 2.3 Add explicit clipboard copy and polite success/failure feedback with selectable output fallback; verify granted, denied, and missing clipboard APIs and focus retention in browser tests, and document the fallback in `docs/browser-tools.md`.
- [x] 2.4 Verify keyboard-only utility use, screen-reader labels/error associations/status announcements, light/dark contrast, reduced motion, 320px reflow and 200% text zoom including long results and limit-size input; record actual outcomes and any unverified checks in `docs/browser-tools.md` rather than asserting WCAG compliance.
- [x] 2.5 Verify a unique synthetic input marker never enters network requests, console logs, URL/history, local/session storage, or IndexedDB during utility use; verify no transformation request is needed with networking disabled after load, and that reload initializes empty application state; record browser evidence.

## 3. Navigation and crawler integration

- [x] 3.1 Coordinate the intro Tools entry and shared footer Tools removal with `add-intro-tools-shortcut`; retain route-aware homepage destinations without adding Tools to the header or section union. Verify both routes, correct active state, logo, modal dismissal/focus behavior and breakpoint recovery against the revised navigation.
- [x] 3.2 Define Tools-specific metadata and extend the sitemap to exactly the homepage plus Tools; update SEO tests and `docs/portfolio-seo.md`, verifying production-origin canonical/share identity from initial Tools HTML, unchanged homepage metadata, fetchable share image, and no fragment or metadata-route sitemap entries.
- [x] 3.3 Verify direct `/tools` load, intro entry, absence of footer Tools links on both routes, directory anchors, return-to-home sections, and skip-link behavior on desktop/mobile and with JavaScript disabled; refresh navigation evidence in `docs/browser-tools.md` for the same candidate verified by `add-intro-tools-shortcut`.

## 4. Integration and status

- [x] 4.1 Rerun the relevant Node and SEO suites, `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` after navigation revisions; smoke-test the production server with `pnpm start` (not `pnpm dev`) and record results, keeping any unrelated `_document` failure explicitly blocked rather than silently marking it passed.
- [x] 4.2 Update the selected Tools checklist note to its independently tracked scope and evidence only after acceptance verification; confirm Blog integration and interactive project demos remain incomplete and that no application code from unrelated changes was overwritten.
