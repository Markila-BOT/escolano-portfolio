# Proposal

## Why

The selected checklist item asks for measured line wrapping in project drawers. Current descriptions render normal paragraphs with a 450 ms paragraph reveal; there is no word-level layout reader to remove, so this change must demonstrate useful line layout rather than claim an existing reflow bottleneck.

## What Changes

- Enhance drawer description paragraphs with cached Pretext line measurements at the available text width, including resize and font readiness handling.
- Retain complete semantic paragraph text before enhancement, on failure, and when JavaScript is unavailable; preserve the existing drawer interaction contract.
- Use measured lines for a bounded Framer Motion reveal, with readable initial text and an immediate reduced-motion presentation.
- Benchmark preparation, resize layout, bundle cost, and visible behavior against the existing paragraph renderer; record results without asserting an unmeasured performance gain.
- Scope this change to drawer descriptions, not hero typography, rail previews, case studies, or other `TextGenerateEffect` consumers.

## Capabilities

### New Capabilities

- `project-description-layout`: Responsive measured paragraph wrapping, faithful text, fallback readability, and restrained line reveal in project details.

### Modified Capabilities

None. Drawer navigation and shared component requirements remain unchanged.

## Impact

Expected areas are a dedicated `components/project-description.tsx`, a small layout adapter in `lib/`, and the description call site in `components/projects-interactive.tsx`. Implementation adds `@chenglou/pretext` with pnpm and documents its role in `docs/technology-convention.md`; Framer Motion remains the animation library. The checklist and a focused verification document are updated after acceptance checks. No project copy changes are needed.
