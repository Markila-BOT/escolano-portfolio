# project-drawer-navigation Specification

## Purpose

Previous and Next on an open project move to the neighbor in list order and leave the details open.

## Requirements

### Requirement: The open details name the neighbor

While a project's details are open, Previous and Next SHALL be shown. When a neighbor exists, that control's visible text SHALL include "Previous" or "Next" and the neighbor's title. Its accessible name SHALL be that same text, and it MUST NOT be "Previous slide" or "Next slide".

#### Scenario: Next names the following project

- **WHEN** the visitor opens the first project in the list
- **THEN** Next is shown, and its accessible name includes "Next" and the title of the second project

#### Scenario: Previous names the preceding project

- **WHEN** the visitor opens the second project in the list
- **THEN** Previous is shown, and its accessible name includes "Previous" and the title of the first project

### Requirement: The controls stay off the media

Previous and Next SHALL be visible from a 320 px wide viewport through desktop widths. They MUST NOT cover the open project's image or video. They SHALL be readable without hovering, in both light and dark mode.

#### Scenario: Narrow details

- **WHEN** the visitor views open project details at 320 px wide
- **THEN** Previous and Next are visible and do not cover the project's image or video

### Requirement: Next keeps the details open

Activating Next SHALL show the next project in the list in the same open details. The title, media, tags, description, and link SHALL be that next project's. The details MUST NOT close.

#### Scenario: Move forward

- **WHEN** the visitor opens the first project and activates Next
- **THEN** the details stay open and show the second project's title

### Requirement: Previous keeps the details open

Activating Previous SHALL show the previous project in the list in the same open details. The title, media, tags, description, and link SHALL be that previous project's. The details MUST NOT close.

#### Scenario: Move backward

- **WHEN** the visitor opens the second project and activates Previous
- **THEN** the details stay open and show the first project's title

### Requirement: The ends disable the missing direction

When the open project is the first in the list, Previous SHALL be disabled and its accessible name SHALL be "Previous project". When the open project is the last in the list, Next SHALL be disabled and its accessible name SHALL be "Next project". Activating a disabled control MUST NOT change the open project. When the activated control becomes disabled, focus SHALL remain inside the open details.

#### Scenario: The first project

- **WHEN** the first project is open and the visitor activates Previous
- **THEN** Previous is disabled, its accessible name is "Previous project", and the first project stays open

#### Scenario: The last project

- **WHEN** the last project is open and the visitor activates Next
- **THEN** Next is disabled, its accessible name is "Next project", and the last project stays open

### Requirement: The carousel and the open cue stay put

Moving to a neighbor MUST NOT change which project is first in the carousel, and MUST NOT play the cue for opening or closing a project. Closing the details SHALL still close them.

#### Scenario: The carousel does not follow

- **WHEN** the visitor moves to a neighbor while the carousel's first project is unchanged
- **THEN** the carousel's first project is still that same project

#### Scenario: No open or close cue

- **WHEN** sound is on and the visitor moves to a neighbor
- **THEN** the open and close cues do not play

#### Scenario: Close still closes

- **WHEN** the visitor closes the open details
- **THEN** the details close
