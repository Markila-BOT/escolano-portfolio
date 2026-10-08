# Project rail

Projects starts in Carousel view. After hydration, the Carousel and Rail buttons let visitors choose a view without leaving the section. Each view keeps its own browsing position during the current page session.

Rail expands the first project initially. Activate a title to expand that preview; activating the current title keeps it open. Desktop uses compact vertical title lanes, while widths below `lg` use stacked rows. The expanded preview includes an image, description, technology tags, and a separate details action that opens the existing drawer.

## Keyboard and accessibility

Tab reaches view controls, rail titles, and the expanded preview's details action. Enter or Space activates a title without moving focus. Titles expose expanded state and their panel relationships. Hidden views and collapsed preview controls are not keyboard reachable. Closing details returns focus to the original rail details action, even after using drawer Previous or Next.

Reduced motion disables rail expansion animation. Without JavaScript, the default carousel content remains readable and the view switch is absent. New controls use the existing semantic theme tokens and minimum 44 px targets.

## Verification

Verified against a local production build using installed Chrome through Playwright on 2026-10-08:

- All 16 projects remain in order; one preview is expanded and keyboard activation selects another.
- At 320, 768, 1024, and 1440 px, both themes fit without page-level horizontal overflow; the last title stays reachable.
- Reduced-motion selection, drawer close focus restoration, neighbor navigation, and round-trip carousel position restoration pass.
- Production HTML passes `tests/portfolio-html.py`; JavaScript-disabled content remains readable with no view-switch controls.
- Lint, strict TypeScript checking, and the production build pass.

The existing drawer handles video, screenshots, case studies, build notes, and optional links. Rail selection and view switching never call `playCue`; the shared drawer opener retains the existing sound preference and opening/closing cues. External video playback and audible output depend on browser and network availability.
