# Proposal

## Why

The performance checklist contains stale rendering claims and unmeasured targets. Current source already renders theme-provider children and defers 3D/Pretext, but eagerly imports the video player; measurable evidence is needed before claiming improved performance.

## What Changes

- Defer the existing video-player implementation until a video project drawer opens, with reserved media dimensions and readable loading/failure states.
- Preserve existing video playback settings, drawer navigation/focus, screenshots, and server-rendered content; never start media before the drawer is opened.
- Establish repeatable mobile/desktop production audits for `https://escolano-portfolio.vercel.app/` and comparable local builds, reporting FCP, LCP, CLS, and TBT with explicit conditions and raw evidence.
- Keep FCP <1.5s, LCP <2.5s, and CLS <0.1 as targets, not assumed results. Explain legacy TTI measurement availability rather than silently substituting TBT for the 3.5s TTI target.
- Correct code-splitting/lazy-loading and known-cost checklist entries using source and network evidence. Only mark timing targets complete when supported by qualifying deployed measurements.

## Capabilities

### New Capabilities

- `project-media-loading`: On-demand video loading with stable layout and recoverable failure.

### Modified Capabilities

None. Existing drawer navigation and rendering behavior remain intact. Audit tooling and evidence are implementation documentation, not a new user-facing capability.

## Impact

`components/projects-interactive.tsx`, a small deferred video component if needed, existing ReactPlayer dependency, focused tests, audit tooling/reports, `docs/portfolio-rendering.md`, and `CHECKLIST.MD`. No extra player library, new routes, paid monitoring, analytics collection, framework upgrade, deployment, or speculative optimization beyond video loading. Public-site fetch failed during planning; deployed version and timings are unverified. Implementation must record deployed and local versions separately.
