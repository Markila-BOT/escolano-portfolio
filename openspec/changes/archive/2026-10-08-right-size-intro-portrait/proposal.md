# Proposal

## Why

The supplied localhost Lighthouse finding reports a 66.5 KiB portrait response with an estimated 57.2 KiB saving. The current portrait declares 240×240 pixels while its Tailwind box is 160×160 pixels and has no responsive size hint, encouraging an unnecessarily large image request.

## What Changes

- Match portrait delivery hints to its existing fixed 160px display size and let browsers select an appropriate density-aware variant.
- Preserve the portrait source, accessible name, circular crop, border, shadow, initial HTML and priority loading.
- Add regression checks and compare cold production image requests and audit results before/after. Report actual savings rather than promising Lighthouse's estimate or an LCP budget pass.

## Capabilities

### New Capabilities

- `portrait-delivery`: Density-aware delivery of the initial portrait while preserving its visible appearance, accessibility and stable layout.

### Modified Capabilities

None. Existing image-independent component and intro CTA requirements remain unchanged.

## Impact

Targets `components/intro.tsx`, portrait-focused tests and performance evidence documentation. Uses the existing Next.js 14 image pipeline and source asset; no new dependency, deployment, global image configuration change or other image optimization is planned.
