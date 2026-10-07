# Proposal

## Why

The Projects section is a carousel of every project, and below the `md` breakpoint it has no previous or next control. A visitor cannot tell which project they are on, and the arrows that do exist sit on top of the cards. The checklist item asks for a clearer presentation that leads with a few pieces, with navigation, responsiveness, and interaction feedback a visitor can see.

## What Changes

- The first view shows a few projects: one card below `md`, two from `md`, three from `lg`. When more projects exist, the next card peeks so the row does not look finished.
- Previous and Next stay available at every width, sit off the project image, and keep the shared button and the names "Previous slide" and "Next slide". At the start, Previous is disabled. At the end, Next is disabled.
- A position line names the first visible project and the total, and it updates when the carousel moves. Drag and the arrow keys still move it.
- The card tilt does not run when `prefers-reduced-motion: reduce` is set.
- Every project in `projectsData` stays in the carousel, in the same order. Opening a card still opens the existing drawer.
- Assumption: "a few selected pieces" is the first view, not a shorter catalog. Case studies, the expandable rail, client and timeline, Pretext layout, and the YouTube drawer items stay on their own checklist lines.
- After the behavior is confirmed in the browser, check checklist line 107 and recount. Until then the line stays open.

## Capabilities

### New Capabilities

- `project-carousel`: The Projects carousel leads with a few visible cards, can be moved at every width, and shows where the visitor is.

### Modified Capabilities

- None. `uniform-components` still requires the shared button and the existing icon set for the carousel arrows. This change does not edit that spec.

## Impact

- `components/projects.tsx` and `components/ui/carousel.tsx`. The card tilt lives in `components/project.tsx`.
- The position line is copy, so its wording lives in `lib/data.ts`.
- No new package. The carousel stays on `embla-carousel-react`.
- Checking line 107 moves the progress row from 66 done, 11 partial, 33 not started, 66/110 (60%) to 67 done, 11 partial, 32 not started, 67/110 (61%).
