# Design

## Context

See proposal.md for motivation. `components/intro.tsx` uses a static PNG import and Next Image with width/height 240, quality 95 and priority. `h-40 w-40` renders a fixed 10rem (160px at the default root font size) box across breakpoints. `next.config.js` uses defaults. Installed Next 14's `getWidths` emits density descriptors from declared width when `sizes` is absent; width 240 maps to 256/640 candidates. An explicit fixed-pixel `sizes` uses width descriptors from configured image sizes, including 256 and 384.

The provided audit's 240px displayed-size claim differs from current CSS. Implementation will record actual bounding box, DPR and currentSrc before changes rather than treating the pasted estimate as verified current-build evidence. Existing production HTML checks already assert the portrait's accessible name. Performance audit tooling and evidence conventions exist in `scripts/audit-performance.sh` and `docs/portfolio-performance.md`.

## Goals / Non-Goals

**Goals:** Correct source selection with the smallest focused change; preserve visual appearance and source quality; provide reproducible image-request evidence.

**Non-Goals:** Asset replacement, quality reduction, new formats/dependencies, custom loaders, global candidate configuration, project image changes, automatic deployment or claiming the whole page's LCP target is solved.

## Decisions

1. Set intrinsic width/height to 160 and supply `sizes="160px"`, retaining existing CSS, priority and quality 95. The size hint aligns source selection and preload metadata with the fixed box; dimensions preserve a square aspect ratio. Keep default optimizer candidates rather than adding global 160/320 variants for one image. The default 384px candidate supplies DPR 2 without 640px; higher densities may legitimately select 640px. Merely changing width without sizes supplies density candidates but omits the explicit display-size contract; merely lowering quality does not address oversized resolution.
2. Preserve the PNG source and current optimizer negotiation. Compression tuning may improve bytes further, but doing it now would mix causes and introduce visual trade-offs. Any remaining warning is recorded for a separate decision, not silently expanded scope.
3. Verify production HTML and generated Image props with installed Next APIs, then fresh browser requests at DPR 1/2. Use supported browser controls; if DPR emulation is unavailable, verify source-selection arithmetic in focused tests and disclose the runtime coverage gap rather than claim a browser check passed. Capture three sequential cold mobile/desktop Lighthouse runs before and after with the existing pinned command, identical profiles/tool/browser and build identities. Compare actual portrait encoded bytes/requested widths, image-delivery findings and FCP/LCP/CLS values; an estimate is not a measured byte guarantee. Local audits do not prove deployed performance.

## Risks / Trade-offs

- Root font changes could invalidate a fixed 160px hint → verify computed dimensions and record the default-font-size assumption; keep future hint changes aligned with CSS.
- Browser caches and density influence candidate selection → use fresh cache contexts, record DPR/currentSrc, compare equivalent conditions.
- Default candidates round upward and may leave residual estimated savings → report actual improvement; do not promise the full 57.2 KiB.
- Other resources may dominate LCP → retain existing open timing budgets unless new deployed evidence meets their criteria.

## Migration Plan

Apply a local component/test update, validate and record evidence. No data migration or deployment is required. Rollback restores the old image props without changing source or styling; keep immutable before/after reports.
