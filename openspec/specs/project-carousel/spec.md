# project-carousel Specification

## Purpose

The Projects carousel leads with a few cards, can be moved at every width, and shows which project is first in view.

## Requirements

### Requirement: The first view shows a few projects

The Projects section SHALL keep the heading "My projects". The first view SHALL show one project card below the `md` breakpoint, two from `md` up to `lg`, and three from `lg` up. The first project in the project list SHALL be in that first view. The carousel MUST NOT add a new page section.

#### Scenario: Narrow width

- **WHEN** the visitor views Projects below the `md` breakpoint
- **THEN** one full project card is in the first view, and it is the first project in the list

#### Scenario: Wide width

- **WHEN** the visitor views Projects from the `lg` breakpoint up
- **THEN** three full project cards are in the first view, and the first of them is the first project in the list

#### Scenario: The heading stays

- **WHEN** the visitor views Projects
- **THEN** the section heading is "My projects"

### Requirement: The next project peeks when more remain

When projects remain beyond the last full card in view, part of the next project's card SHALL be visible beside that card. When no projects remain beyond the last full card, the carousel SHALL NOT show an empty gap in place of a peek.

#### Scenario: More projects remain

- **WHEN** the visitor is on a view that is not the end of the list
- **THEN** part of the next project's card is visible beside the last full card

#### Scenario: The end of the list

- **WHEN** the visitor is on the last view
- **THEN** the last project is fully visible and no empty card stands in for a peek

### Requirement: Previous and Next work at every width

Previous and Next SHALL be visible from a 320 px wide viewport through desktop widths. They SHALL NOT cover a project image. Their accessible names SHALL stay "Previous slide" and "Next slide". When the carousel cannot move backward, Previous SHALL be disabled and activating it MUST NOT change the view. When the carousel cannot move forward, Next SHALL be disabled and activating it MUST NOT change the view.

#### Scenario: Narrow controls

- **WHEN** the visitor views Projects at 320 px wide
- **THEN** Previous and Next are visible, do not cover a project image, and their accessible names are "Previous slide" and "Next slide"

#### Scenario: The start disables Previous

- **WHEN** the first project is the first full card in view
- **THEN** Previous is disabled and activating it leaves the view unchanged

#### Scenario: The end disables Next

- **WHEN** the carousel cannot move forward
- **THEN** Next is disabled and activating it leaves the view unchanged

### Requirement: The carousel shows where the visitor is

The carousel SHALL show text that gives the place of the first visible project and the total number of projects. The text SHALL update when the first visible project changes. The text SHALL be readable without hovering, in both light and dark mode.

#### Scenario: The opening position

- **WHEN** the visitor first views Projects
- **THEN** the position text gives the first project as place 1 and gives the total number of projects

#### Scenario: Moving updates the position

- **WHEN** the visitor moves the carousel so a different project is first in view
- **THEN** the position text names that project's place and the same total

### Requirement: Drag and arrow keys move the carousel

A horizontal drag SHALL move the carousel to the neighboring view when it can move that way. ArrowLeft and ArrowRight, while focus is on Previous or Next, SHALL move the carousel in that direction when it can move that way.

#### Scenario: Drag

- **WHEN** the visitor drags the carousel toward the next projects and more projects remain
- **THEN** the first visible project changes

#### Scenario: Arrow keys

- **WHEN** focus is on Next and the visitor presses ArrowRight while more projects remain
- **THEN** the first visible project changes

### Requirement: Reduced motion drops the card tilt

When `prefers-reduced-motion: reduce` is set, a project card MUST NOT tilt with the pointer. Opening a card SHALL still show that project's details.

#### Scenario: Reduced motion

- **WHEN** the visitor hovers a project card with reduced motion set
- **THEN** the card does not tilt

#### Scenario: Details still open

- **WHEN** the visitor activates a project card
- **THEN** that project's details open

### Requirement: Every project stays in the carousel

The carousel SHALL include every project in the project list, once, in that list's order. Moving through the carousel SHALL reach the last project.

#### Scenario: The full list is reachable

- **WHEN** the visitor moves from the first view to the end
- **THEN** each project in the list appears once, in list order, and the last project is fully visible
