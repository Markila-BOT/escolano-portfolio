# Design

## Context

The drawer maps `project.description` paragraphs to `TextGenerateEffect`, which renders one semantic `motion.p` with a 450 ms reveal. That shared component is used outside this feature and contains no DOM line measurements. Pretext is not installed. The current README documents `prepareWithSegments` and `layoutWithLines` for text-bearing lines; `prepare` plus `layout` returns height/count only. See [Pretext documentation](https://github.com/chenglou/pretext). No existing OpenSpec capability governs description line layout.

## Goals / Non-Goals

**Goals:** Isolate measured layout to drawer descriptions, cache expensive preparation, and retain faithful accessible text and normal wrapping as a fallback.

**Non-Goals:** Hero typography, variable-width portrait wrapping, rail previews, changes to project copy, a second animation library, or claims of eliminating browser layout. The browser still lays out rendered DOM.

## Decisions

### Dedicated paragraph enhancement

Add `components/project-description.tsx` and a typed layout adapter in `lib/project-description-layout.ts`. Replace only the drawer description call site. Keep `TextGenerateEffect` intact for other consumers. A normal semantic paragraph is the initial server/client render; enhance only after font readiness and a positive content width. Adding behavior to the shared reveal component would widen scope and load Pretext for unrelated text.

### Cached measurement and observed width

Lazy-load `@chenglou/pretext` when descriptions mount. Use `prepareWithSegments` once per text/font/options combination and `layoutWithLines` for width changes. Cache prepared handles with a bounded session cache keyed by text and actual computed font shorthand, letter spacing, whitespace options, and relevant font-load generation. Wait for the required Geist face, reprepare on font-metric changes, and use whole-pixel font size/line height where supported by the current typography. Keep paragraph spacing unchanged.

Observe the paragraph content box with ResizeObserver, coalesce updates in animation frames, and ignore zero widths. Font-size and text-zoom changes must invalidate metrics even when container width is unchanged. Read computed typography when relevant inputs change; do not poll geometry or read the bounds of every rendered word/line. Reading available container width is necessary and is distinct from measuring line breaks through forced DOM layout.

### Faithful semantic line rendering

Use measured line spans within a single `p`, preserving inter-line whitespace and original text order. Validate the chosen API's whitespace normalization and segment boundaries against source text before adopting the renderer. No canvas-only copy, duplicated screen-reader text, or aria-label substitute. If a paragraph cannot be faithfully materialized, show its ordinary text instead. Keep selectable text and use normal wrapping as an overflow safety net when measurement and browser metrics differ.

### Font-safe enhancement and restrained reveal

Use the existing Framer Motion easing and a short stagger derived from line count, capping the total at 500 ms. Keep initial text readable and opacity-only transitions; reduced motion is settled immediately. Width updates change wrapping without entrance replay. Do not replace a visible fallback with a differently sized block mid-read: compare fixture/browser parity and defer or keep ordinary wrapping when metrics do not match. Ignore stale asynchronous results on project change or unmount and disconnect observers on cleanup.

### Verification before performance claims

Benchmark the current paragraph renderer and measured candidate in a production build, recording compressed bundle delta, preparation time, repeated width-layout time, visible stability, and browser layout work. Existing CSS does not repeatedly measure text through JavaScript, so Pretext may add cost. The justified benefit here is controlled line presentation. If parity or material bundle/latency regressions cannot be resolved within this approach, report the evidence and update the plan with the user rather than silently accepting a weaker implementation.

## Risks / Trade-offs

- [Font/canvas metrics disagree with browser shaping] → Test Geist, long words, Unicode and bidi fixtures, zoom, and fallback rendering; never clip text.
- [Whitespace or copy behavior changes] → Test exact paragraph content, selection, and clipboard output, not only screenshots.
- [New dependency adds first-load cost] → Load on drawer demand and publish the measured bundle delta.
- [Closed drawer is absent from no-JavaScript UI] → Test the paragraph component's server-rendered fixture separately; this change does not make the existing interactive drawer open without JavaScript.
- [Observer churn or stale project results] → Coalesce width work, bound caching, and cancel obsolete results.

## Migration Plan

Add only `@chenglou/pretext` with pnpm, record the installed version and library role in the technology convention, and preserve the existing fallback. Rollback restores the drawer's `TextGenerateEffect` call site and removes the dedicated adapter/dependency. No data migration is required.
