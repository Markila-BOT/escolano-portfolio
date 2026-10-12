# Design

## Context

See proposal.md for motivation. Existing Node VM tests and docs/keyboard-navigation.md cover compact-menu containment, skip links, and breakpoint recovery, but explicitly exclude comprehensive screen-reader and contrast verification. Field forwards placeholders without labels or ids; SubmitBtn renders only a spinner while pending. ProjectDetailsDrawer already has a DrawerTitle and focus handlers but also renders a visible h1. SkillSelector already exposes named regions and expanded state; VisitorNotice uses a polite status toast. Theme tokens coexist with raw gradient colors in project details. These are source observations, not a completed audit.

Existing accessible-navigation and portfolio-discovery requirements remain unchanged. Older greeting and role specs use the ambiguous phrase “one heading”; interpret this as one introductory h1 alongside the established section h2 hierarchy, not removal of section headings. Default role cycling and silent accessible role descriptions remain; an optional pause control complements those contracts. If a confirmed finding requires changing a contract rather than extending it, update this change's proposal and delta before implementing that behavior.

## Goals / Non-Goals

**Goals:** Use criterion-level evidence to prioritize minimal fixes; verify full interactive states rather than only initial HTML; preserve existing keyboard, rendering, and contact behavior.

**Non-Goals:** WCAG 2.2 or AAA certification, visual redesign, framework upgrades, a new modal/carousel library, a public certification badge, live email sends, or deployment during this change. Legal certification and accessibility of external destination sites are not promised; embedded media remains within the audit scope.

## Decisions

### Criterion matrix and bounded test environment

Create docs/accessibility-audit.md with a row for every WCAG 2.1 A/AA criterion, applicability rationale, observed failure, source/flow, remediation, test method, evidence, and final status. Reference https://www.w3.org/TR/WCAG21/ including full-page, complete-process, accessibility-supported technology, and non-interference requirements. Do not import WCAG 2.2 requirements as AA gates; 44px targets are not a WCAG 2.1 AA criterion. Preserve accessibility conventions where they exceed the minimum. Alternative: a Lighthouse score alone misses manual criteria and stateful defects.

Audit a recorded production build at 320, 390, and 1280 CSS pixels, light/dark, standard/reduced motion, initial/hydrated states. Exercise menu open/closed and 960px transitions; Rail and Carousel; each materially distinct drawer/media variant and neighbor boundary; the existing embedded screenshot carousel; skills; timeline/journey; greeting languages; visitor toast; sound/theme; contact invalid, pending, failure, and accepted states. Screenshot scope was confirmed by the user on 2026-10-09: verify the existing preview rather than add fullscreen expansion. Sample repeated instances only after documenting equivalent structure; do not omit unique project content.

### Minimal semantic and feedback remediation

Extend Field's typed props using native labels/id/autocomplete and existing Radix Label rather than replacing controls. Preserve server validation and add associated accessible feedback as findings require. Keep visible pending text and hide decorative spinner/icon output. Stub the email provider in automated fixtures and use a controlled failure configuration for manual tests; success fixtures exercise the real feedback path without external delivery. Avoid moving focus to transient toasts or assigning alert roles to every dynamic region.

Use existing Radix/Vaul focus management, verify rather than assume trapping/restoration, repair project heading levels, and retain the stable role-description text. Add an optional accessible pause/resume control if needed for auto-updating roles; reduced motion alone is not the normal-mode pause mechanism. Assess greeting flicker against flash thresholds, language markup, and actual media content before deciding alternatives. Do not fabricate transcripts or captions; if accurate alternatives are unavailable, keep that criterion failed/unverified or provide an accessible content-equivalent presentation that satisfies the applicable requirement.

### Contrast and adaptable presentation

Measure rendered foreground/background pairs in both themes including gradients, opacity, toast styles, selected/hover/focus states, destructive feedback, and essential borders. Correct semantic tokens or component classes within existing Tailwind conventions; no parallel stylesheet. Record ratios, font size/weight and exception rationale. Test 200% text, 400% zoom on a 1280px viewport (320 CSS-pixel equivalent), spacing overrides, and portrait/landscape. Genuine two-dimensional content exceptions require rationale, not a blanket drawer exemption.

### Layered verification and honest sign-off

Extend current Node and HTML regressions for labels, named pending state, heading hierarchy, relationships, focus, and pause behavior. Add repeatable browser accessibility scans using a pinned test-only axe-core runner when no existing tool covers the job; keep scanner code out of production bundles and record tool version. Prefer existing browser tooling over a new automation stack. Save scan outputs by build/theme/state; review incomplete/manual rules. Supplement scans with computed contrast and keyboard checks.

Manual baseline: VoiceOver/Safari on macOS and VoiceOver/Safari on iOS, with explicit user-assisted testing when devices or native AT are unavailable. Record versions, tested steps, and tester-reported versus agent-observed evidence. Browser-tree snapshots are supporting evidence only. Additional AT pairs can extend coverage; claims must be limited to verified environments, never “all screen readers.” Local completion and deployed verification are separate statuses. Keep manual acceptance tasks unchecked until evidence arrives.

## Risks / Trade-offs

- [No mobile device or native AT access] → Provide a concrete manual guide and retain pending tasks; do not replace them with headless scans.
- [Third-party media barriers] → Audit content and controls; use accurate alternatives or explicitly record unresolved failures, not third-party exemptions from full-page compliance.
- [Palette or animation changes affect identity/performance] → Make focused fixes, compare both themes, and rerun hero/keyboard/media regressions without adding runtime tooling.
- [Existing spec wording conflicts] → Surface actual behavioral conflicts and revise deltas before implementation; do not silently weaken approved contracts.
- [False compliance claim from a clean scan] → Require the complete criterion matrix and manual evidence before checklist closure.

## Migration Plan

No data migration. Apply focused component/token changes and regression tests, then rerun the recorded production-build matrix. Update only the selected accessibility checklist rows with evidence links and scope; preserve the completed keyboard row. Do not mark deployment verified without a separate deployed run. Roll back individual accessibility changes only with their related tests and retain the audit record of unresolved barriers.
