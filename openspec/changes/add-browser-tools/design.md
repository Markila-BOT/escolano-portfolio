# Design

## Context

See proposal.md for motivation and the two delta specs for acceptance contracts. The App Router currently has only a homepage plus metadata routes; there is no blog or Tools page. Root layout owns the header, footer, theme/sound providers, and native skip link. Header and mobile navigation use section-only hashes and a section-name context. Sitemap implementation and its published spec currently enumerate only the homepage. Tests use Node's test runner with TypeScript transpilation and Python HTML/browser checks.

The live reference could not be fetched during planning. Its visual details and actual utility inventory are unverified; this design adopts only the checklist's browser-utility concept.

## Goals / Non-Goals

**Goals:** Keep the new route server-rendered and indexable, isolate browser interaction, reuse installed UI primitives and theme tokens, and preserve existing homepage navigation and accessibility behavior.

**Non-Goals:** Blog creation, every reference-site tool, calculators or converters beyond the agreed URL utility, project demos, accounts, backend transformations, file import/export, persistence, code editors, schema validation, or analytics. This change does not close the separate accessibility audit or its build investigation.

## Decisions

### One server page with three independent client sections

Add `app/tools/page.tsx` with metadata, directory anchors, semantic main content (`main-content` for the existing skip link), instructions, and a no-JavaScript notice. Render focused client components for each utility, using pure functions in `lib/browser-tools.ts` and static tool copy in a small typed data module. Each section owns independent input/result/error/copy state. Prefer simple labeled native textareas and existing Button primitives, not a new editor dependency or a modal selector. Three sections need neither search nor category filters.

Alternative: separate routes per utility. Deferred because one page keeps this initial set easy to discover and avoids unnecessary routing/metadata work. Alternative: client-only page. Rejected because meaningful headings and guidance should exist before hydration.

### Native transformation APIs with documented limits

Use `JSON.parse` then `JSON.stringify(value, null, 2)` and native component URL encoding/decoding with caught errors. Explain that JSON formatting is not lossless: duplicate keys, large numbers, and numeric representations follow JavaScript parsing behavior. Count words with a Unicode whitespace split after trimming, characters by code points rather than UTF-16 length or grapheme clusters. These simple definitions avoid adding a parser/segmentation library while making expected output testable.

Enforce a shared 100,000 UTF-16-unit input ceiling in change handling, rejecting oversized changes while retaining the last accepted value. Do not silently truncate via `maxLength`. Formatting and conversion are explicit actions; the counter updates immediately within the same bounded size. Clear transformation results on edits; represent successful empty output separately from no result. Never render input with HTML injection, echo input into error logs, or persist it. No worker is needed initially; the bound constrains synchronous work.

### Clipboard is optional and explicit

Call `navigator.clipboard.writeText` only after activation. Use local polite status feedback and associated validation text, not duplicate toast announcements. Keep selectable read-only output on denial. Reset only its utility and retain button focus. Associate labels/descriptions/errors through stable IDs. Announce explicit action outcomes; do not announce the whole output or every keystroke count.

### Minimal route-aware navigation

Use the homepage introduction shortcut owned by `add-intro-tools-shortcut` as the Tools entry point. Remove the shared footer Tools link while preserving its other content; do not widen the fixed section header or extend the section-name union. The companion change owns emoji feedback and its motion verification. On `/tools`, header and mobile section links resolve to `/#section`, and logo to `/#home`; on `/` preserve existing hashes, active-section updates, sound feedback, and modal focus behavior. Prevent misleading active-section highlighting on Tools. Use pathname awareness within existing client navigation and keep shared layout server-rendered. Native links remain functional without JavaScript. Test menu dismissal and return navigation rather than treating Tools as a homepage section.

Alternative: move the entire homepage shell into route groups. Rejected as a larger migration unrelated to three utilities. Alternative: leave fragment links untouched. Rejected because Tools does not contain those targets.

### Extend existing discovery without changing homepage identity

Define page-level title, description, canonical, Open Graph and Twitter values for Tools using the existing production identity helpers. Explicitly override nested social metadata so inherited homepage URLs cannot leak in. Reuse the share image. Add exactly `/tools` to sitemap output and adjust existing exact-homepage-only tests and the discovery delta. No fabricated modified dates or tool fragment entries. No new structured-data type is needed.

## Risks / Trade-offs

The user approved a shared-layout containment correction during implementation: wrap only the decorative glows in an inert clipped layer, rather than hiding overflow on the document or its interactive content. Utility action buttons wrap and grow vertically at enlarged text sizes. This addresses the observed 480px document width at a 320px viewport with 200% text sizing, while leaving focus rings and content scrolling available.

- [JSON parsing can normalize values] → State JavaScript semantics beside the formatter; test scalars, duplicate keys, large numbers, and markup strings; make no lossless claim.
- [Large paste or output blocks the UI] → Shared input ceiling, explicit transformation actions, wrapped/contained output, and boundary-size browser verification.
- [Clipboard permissions vary] → Preserve manual selection and provide accessible failure guidance; test denied and unavailable APIs.
- [Shared navigation regression] → Target only pathname-dependent destinations and highlighting; rerun homepage/menu keyboard tests and direct Tools navigation in both layouts.
- [Existing build failure may recur] → Record it as a blocker if reproduced; do not delete artifacts or conflate this feature with the separate `_document` investigation.
- [Input privacy assertions are too broad] → Limit the notice to utility input/output handling, verify network/storage behavior, and never claim the entire site makes no network requests.

## Migration Plan

Implement utilities and route, then integrate navigation and discovery together. Run unit, semantic HTML, browser accessibility/privacy, and production build checks before updating the Tools checklist entry. Replace the prior deferred note with a scoped status and evidence link, leaving Blog and interactive project demos unchecked. No deployment is authorized by this proposal. Roll back the new route and utility files along with their footer/navigation/metadata/sitemap integration as one feature; no data migration is involved.
