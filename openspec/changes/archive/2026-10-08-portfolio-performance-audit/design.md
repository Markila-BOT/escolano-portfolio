# Design

## Context

See proposal.md for motivation. ThemeContextProvider currently always renders children. The 3D stage uses `next/dynamic` and mounts on request; Pretext uses a lazy module import. ProjectsInteractive eagerly imports ReactPlayer 2.16 and renders it only for video details. It currently sets `playing`, `loop`, and 16:9 styling; this change preserves those playback settings rather than inventing an existing no-autoplay contract. The site is one route, so introducing route splits is not useful.

The deployed URL is owner-supplied; a planning fetch failed, so no deployment parity or speed is asserted. Existing `server-first-portfolio` planning covers static rendering and must not be reimplemented or silently rewritten.

## Goals / Non-Goals

**Goals:** Bound the known video cost, establish comparable performance evidence, and make checklist claims accurate.

**Non-Goals:** Guarantee scores across all devices, automatically deploy, send form email, add monitoring/analytics, remove features, upgrade Next/React, or optimize unrelated code without a separate decision.

## Decisions

1. Use the installed Next dynamic-loading mechanism in the existing client boundary to defer a small video component containing the sole ReactPlayer import. Mount it only for an open video project. Reserve an aspect-video wrapper for loading, ready, and fallback states. Handle import/render and media errors with a screenshot and accessible status text, resetting per project. Alternatives: a second player library is unnecessary; splitting static section shells could remove initial content without targeting this cost.

2. Prove loading boundaries with cold network evidence, not only build chunk existence: initial page, image drawer, first video drawer, video-to-image switch, rapid navigation, and close while loading. Verify 3D/Pretext remain deferred, screenshots/keyboard focus/reduced-motion/sound preferences are intact, and no departed video continues. Maintain static-HTML regression coverage.

3. Use a pinned audit CLI version compatible with the project's Node runtime as development tooling only, preferably a reproducible pnpm command rather than a production dependency. Capture three cold runs per mobile/desktop profile for local baseline and candidate with identical CPU/network/cache settings, browser/tool version, viewport, timestamp, source snapshot and dirty-file/build identity. Save raw reports and all run values, median and range; do not compare localhost latency directly with Vercel delivery.

4. Audit the deployed URL separately with the same pinned profiles. Identify its build from available public metadata; if unavailable, record an unknown deployed version and timestamp instead of assuming parity. Field data, if available, must be reported separately with its population/window; missing field data is not a pass. A future deployed candidate audit requires an owner-managed deployment and is not authorized here.

5. Preserve the checklist targets FCP <1500ms, LCP <2500ms and CLS <0.1. Mark a target complete only if all three valid deployed cold runs in both documented profiles meet it; otherwise keep it open and list the result or blocker. TBT is a useful separately reported diagnostic, not TTI. Modern Lighthouse removed TTI: retain the legacy TTI row as unverified/unsupported with an explanation; do not mark it complete or replace its budget without owner approval. Source: https://developer.chrome.com/blog/lighthouse-10-0 (checked 2026-10-08).

## Risks / Trade-offs

- [Cold video opening takes longer] → Stable loading feedback and screenshot fallback keep details usable.
- [Deployment differs from local work] → Separate reports and identities; no inferred deployed improvement from a local bundle reduction.
- [Noisy benchmarks or unreachable deployment] → Record all runs and failures, never fabricate timing values; pause on tooling/access blockers with evidence intact.
- [Missed timing budgets] → Document findings and remaining work, without claiming completion or expanding optimization scope automatically.

## Migration Plan

Save the unchanged local/deployed baselines first, implement the deferred video boundary, validate behavior and candidate local reports, and reconcile checklist claims. No deployment is performed. Rollback removes only the deferred component wiring; preserve baseline reports and prior rendering work.
