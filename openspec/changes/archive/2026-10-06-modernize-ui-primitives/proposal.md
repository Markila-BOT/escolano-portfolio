# Proposal

## Why

The checklist calls for button, drawer, label, and carousel to follow the modernized card primitive's shape. Consistent slot markers and component structure make these shared primitives easier to maintain, but copying React 19 source would break the repository's React 18 ref handling.

## What Changes

- Add consistent shadcn-style `data-slot` markers to rendered elements in the four primitive modules.
- Use named function implementations and derived props types where compatible with React 18; retain `forwardRef` for ref-bearing exports.
- Preserve existing exports, variants, classes, composition, focus handling, and carousel behavior.
- Document the React 18 compatibility exception and update the selected checklist item after verification.

## Capabilities

### New Capabilities

None. This is an implementation refactor; `skip_specs: true` explicitly omits spec deltas.

### Modified Capabilities

None. Existing uniform-components, project-carousel, and project-drawer-navigation requirements continue to apply unchanged.

## Impact

Implementation targets are `components/ui/button.tsx`, `drawer.tsx`, `label.tsx`, and `carousel.tsx`. Documentation targets are `docs/radix-ui-conventions.md` and `CHECKLIST.MD`. Existing callers, especially the project drawer's Previous/Next focus refs, are regression-check targets. No dependency or framework upgrades, redesign, new variants, or changes to card and local field/tag/text primitives are included.
