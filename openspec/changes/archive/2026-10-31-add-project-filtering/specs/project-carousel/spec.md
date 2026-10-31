# Spec Delta

## MODIFIED Requirements

### Requirement: The first view shows a few projects

The Projects section SHALL keep the heading "My projects". The first view SHALL show one project card below the `md` breakpoint, two from `md` up to `lg`, and three from `lg` up. The first project in the active list SHALL be in that first view. With no filter, the active list is every published project. With a filter, the active list is the matching projects in published order. The carousel MUST NOT add a new page section.

#### Scenario: Narrow width

- **WHEN** the visitor views Projects below the `md` breakpoint with no filter
- **THEN** one full project card is in the first view, and it is the first project in the published list

#### Scenario: Wide width

- **WHEN** the visitor views Projects from the `lg` breakpoint up with no filter
- **THEN** three full project cards are in the first view, and the first of them is the first project in the published list

#### Scenario: The heading stays

- **WHEN** the visitor views Projects
- **THEN** the section heading is "My projects"

#### Scenario: Filtered first view

- **WHEN** a tag filter is active
- **THEN** the first full card is the first project in the filtered list

### Requirement: The carousel shows where the visitor is

The carousel SHALL show text that gives the place of the first visible project and the total number of projects in the active list. The text SHALL update when the first visible project changes. The text SHALL be readable without hovering, in both light and dark mode. With no filter, the total is every published project.

#### Scenario: The opening position

- **WHEN** the visitor first views Projects
- **THEN** the position text gives the first project as place 1 and gives the total number of published projects

#### Scenario: Moving updates the position

- **WHEN** the visitor moves the carousel so a different project is first in view
- **THEN** the position text names that project's place and the same total

#### Scenario: Filter changes the total

- **WHEN** the visitor selects a tag
- **THEN** the position total equals the number of matching projects

### Requirement: Every project stays in the carousel

The carousel SHALL include every project in the active list, once, in that list's order. Moving through the carousel SHALL reach the last project in the active list. With no filter, the active list is every published project.

#### Scenario: The full list is reachable

- **WHEN** the visitor moves from the first view to the end with no filter
- **THEN** each published project appears once, in list order, and the last project is fully visible

#### Scenario: The filtered list is reachable

- **WHEN** a tag filter is active and the visitor moves to the end
- **THEN** each matching project appears once, in published order, and no non-matching project appears
