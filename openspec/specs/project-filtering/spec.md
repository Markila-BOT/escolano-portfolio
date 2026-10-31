# project-filtering Specification

## Purpose

Let a visitor narrow the existing project list to one technology tag without changing published order or inventing projects.

## Requirements

### Requirement: All is the default

Projects SHALL show one filter. It SHALL list All and every tag label that appears on at least one project. All SHALL be selected on first view. Selecting All SHALL show every published project in published order.

#### Scenario: First view

- **WHEN** the visitor opens Projects
- **THEN** All is selected and every published project is available in published order

### Requirement: A tag shows the matching subset

Selecting a tag SHALL show only projects that carry that tag label, in published order, in both the carousel and the rail. Drawer Previous and Next SHALL move through that same order. Selecting another tag SHALL replace the subset.

#### Scenario: Filter by a tag

- **WHEN** the visitor selects a tag that some projects carry
- **THEN** the carousel and the rail show only those projects, in their published order

#### Scenario: Drawer follows the subset

- **WHEN** a filtered project is open and the visitor activates Next
- **THEN** the next project is the next match in published order, and the details stay open

### Requirement: An empty tag shows an empty state

A selected tag with no remaining match SHALL show a readable empty state. It MUST NOT show a project that lacks the tag, and it MUST NOT add a project.

#### Scenario: No match

- **WHEN** the visitor selects a tag that no visible project carries
- **THEN** the list shows an empty state and no project card

### Requirement: The control is named and keyboard operable

The filter SHALL have a visible label. The visitor SHALL be able to choose a tag with the keyboard, in both themes. The selected tag SHALL be the control's current value.

#### Scenario: Keyboard selection

- **WHEN** the visitor focuses the filter and chooses a tag
- **THEN** that tag is the current value and the project list updates
