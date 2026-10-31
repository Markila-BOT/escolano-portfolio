# Design

## Context

`components/projects-interactive.tsx` holds carousel and rail state. Tags are `{ label, icon }` on each project in `lib/data.ts`. Drawer Previous and Next walk the full `projectsData` array. The carousel spec's "every project" rule is amended so the active list is the filtered subset.

## Goals / Non-Goals

**Goals:**

- All, plus one button per distinct tag label.
- Carousel, rail, position text, and drawer neighbors follow that subset.
- Keyboard and a selected state.

**Non-Goals:**

- Multi-select, URL query state, a new taxonomy, or hiding the All control.

## Decisions

### Derive tags from data

Build the tag list from `projectsData` label strings, in first-seen order. Do not maintain a second category list. "All" is not a tag.

### Filter in the parent

Hold `selectedTag` in `projects-interactive.tsx`. Pass the filtered array into the carousel and `ProjectRail`. Reset the rail expansion and carousel index to the first match when the tag changes. Drawer neighbor helpers take the filtered array, not the full list, while a tag is selected.

### Empty state

If a tag somehow matches nothing, render the empty sentence from `lib/data.ts` in the Projects section. Do not render a fake card.

### Controls

One labeled shadcn Select, not a button per tag. All is a real option and the default value. The visible label names the control, and the current value is the selected tag.

## Risks / Trade-offs

- A button per tag covers the project cards. One select lists the same tags without that row of controls.
- Filtering while a drawer is open should keep the drawer on the current project if it still matches, and close it if it does not.
