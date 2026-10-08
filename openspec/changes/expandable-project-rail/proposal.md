# Proposal

## Why

The Projects section currently offers only a carousel. An optional expandable rail lets visitors scan project titles together and focus on one preview while retaining the established carousel and detail drawer.

## What Changes

- Add a visible Carousel/Rail view switch under “My projects”; Carousel remains the initial view.
- In Rail view, expand one project preview and keep the other projects as compact, readable title controls in list order.
- Provide a horizontal rail on desktop and a stacked accordion layout on narrow screens, with keyboard access and reduced-motion support.
- Open the existing project drawer from a separate action in the expanded preview; retain drawer neighbor navigation and return focus to its opener.
- Preserve each view's browsing state when switching during the current page session, and retain readable initial project content without JavaScript.

## Capabilities

### New Capabilities

- `project-rail`: Optional view selection, single expanded project previews, responsive compact titles, and drawer integration.

### Modified Capabilities

None. The `project-carousel` requirements continue to apply in Carousel view; `project-drawer-navigation` remains unchanged. The rail does not replace or reinterpret carousel controls.

## Impact

Expected implementation areas are `components/projects-interactive.tsx`, a section-specific `components/project-rail.tsx`, copy in `lib/data.ts`, and the Projects checklist row. Reuse existing Button, Card, TagChip, Next Image, Framer Motion, and Vaul drawer; no new dependency or content backend is required. The reference portfolio's local `Portfolio/` copy is absent, so the plan is grounded in the selected checklist behavior and this repository rather than a reproduction of its source.
