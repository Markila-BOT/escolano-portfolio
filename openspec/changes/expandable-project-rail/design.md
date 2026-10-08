# Design

## Context

`components/projects.tsx` composes the heading and client interaction island. `projects-interactive.tsx` owns Embla position, drawer project selection, opening/closing sound cues, and explicit focus restoration through `openedFromRef`. It currently renders every card from `projectsData`; the drawer already supports neighbor navigation, screenshots, video, case studies, and build notes. Existing carousel and drawer specifications remain binding within their views. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** Keep browsing state independent from drawer state, preserve initial server-rendered content, and make rail activation unambiguous for touch and keyboard users.

**Non-Goals:** Replacing Embla, duplicating full drawer content inside previews, changing project order, adding client/company metadata, filtering, URL state, or persistent view preferences.

## Decisions

### Section-specific controls using existing primitives

Use two existing Button controls with `aria-pressed` and a labeled group for view selection. Build `project-rail.tsx` as a one-off project layout using Button, Card, TagChip, Next Image, and semantic disclosure relationships. It is not a reusable tabs or accordion primitive. This avoids adding Radix tabs/accordion dependencies solely for this layout while retaining native keyboard activation. Keep copy in `lib/data.ts` and types derived from `projectsData`.

### Independent selection and view state

Keep `view` and `expandedRailIndex` in the existing interaction island, distinct from the drawer's `selectedIndex`. Carousel is the initial view; rail starts at index zero. Rail buttons select inline previews, and a separate details Button calls the existing `handleOpen(index, trigger)`. Drawer neighbor navigation never mutates browsing selection. No hover-to-select behavior or automatic selection on focus.

### Preserve the carousel instance

Keep the carousel mounted and hide its container with native `hidden` when Rail is active, removing it from focus and the accessibility tree. Reinitialize Embla when returning to its visible container, restoring the recorded scroll snap after measurement. Keep rail state in the parent if its subtree is conditionally mounted. This is preferable to unmounting the carousel and losing its position. View-switch buttons retain focus so hiding a view cannot strand focus inside it.

### Responsive compact labels

At `lg` and above, use a bounded horizontal layout with a flexible expanded panel and compact title lanes. Wrap complete titles within their lanes; increase rail height as needed rather than clipping titles. Below `lg`, use stacked title rows with one inline preview. This avoids the overflow risk of forcing every desktop lane into a 320 px viewport. Use semantic palette tokens and Tailwind utilities within existing project-section widths.

### Shared details, focused previews

Render an image, title, description, and tags in the preview; reuse the existing drawer for rich media and optional project fields. Keep title buttons and the details action separate, never nesting interactive elements. Use stable panel IDs, `aria-expanded`, and `aria-controls`; inactive panels are hidden or unmounted. Focus stays on an activated title, and drawer close returns to its original details action even after neighbor navigation.

### Progressive enhancement and motion

Render the current carousel on the server and expose the view switch after hydration so no-JavaScript visitors see useful content without dead switch controls. Framer Motion can animate the expanded layout using reduced-motion detection; reduced motion removes expansion movement. Rail/view selection does not invoke drawer sound cues. Avoid mounting extra video players in the rail.

## Risks / Trade-offs

- [Embla measures a hidden container incorrectly] → Reinitialize after showing the carousel and verify restoration at multiple widths.
- [Many compact labels crowd desktop space] → Wrap labels, use flexible heights, and test the full project list and long titles; retain a stacked layout below `lg`.
- [Duplicate content or focus in hidden views] → Use native hiding and verify keyboard and accessibility-tree visibility.
- [Existing rendering regression] → Run the production HTML check in `tests/portfolio-html.py` and inspect the default view with JavaScript disabled.

## Migration Plan

This is an additive client interaction with no data migration. Ship with Carousel as default. Rollback removes the rail and switch while retaining the existing carousel and drawer. Update the checklist only after interaction and regression checks pass.
