# Proposal

## Why

The project list is one long carousel and rail. Tags already exist on every card, and there is no way to show only the projects that use a given technology.

## What Changes

- Add a control that filters the carousel and the rail by a tag label already present on projects. "All" is the default and shows the published order.
- Keep one project openable at a time. Previous and Next in the drawer move through the filtered order.
- An empty match shows a readable empty state and does not invent projects.
- Filtering is client state on the Projects section. It does not add a route, a query library, or a new tag taxonomy.

## Capabilities

### New Capabilities

- `project-filtering`: Filter the existing project list by its own tags, including the empty state and drawer order.

### Modified Capabilities

- `project-carousel`: The carousel's "project list" is the active filtered subset, in published order. With no filter, the list is every published project, as it is today.

## Impact

`components/projects.tsx`, the carousel, and the rail. `project-drawer-navigation` still moves to the neighbor of the open project; the neighbor becomes the neighbor in the filtered list. No change to project copy or tag evidence rules.
