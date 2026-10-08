# Spec Delta

## Purpose

Let visitors browse projects in an expandable rail alongside the existing carousel, focusing on one preview while retaining access to every project and full details.

## ADDED Requirements

### Requirement: Visitors can choose a project view

Projects SHALL expose labeled Carousel and Rail controls with a programmatically conveyed active state. Carousel SHALL be the default. Switching SHALL show only the selected view to visitors and assistive technology, retain the “My projects” heading, and preserve each view's browsing position for the current page session.

#### Scenario: Initial presentation
- **WHEN** the page first loads
- **THEN** Carousel is selected and its established cards and navigation are available

#### Scenario: Round trip
- **WHEN** a visitor moves the carousel, switches to Rail, selects another project, and switches between views again
- **THEN** the carousel position and expanded rail project are retained independently

### Requirement: Exactly one rail preview is expanded

Rail SHALL show every project once in list order, initially expanding the first. Activating another title SHALL expand that project's preview and collapse the previous preview. Activating the expanded title SHALL leave it expanded. Collapsed projects SHALL retain readable title controls. Selection SHALL require activation and SHALL NOT change on hover or focus alone.

#### Scenario: Select another project
- **WHEN** a visitor activates a collapsed project's title
- **THEN** its preview expands, the previous preview collapses, and all other titles remain reachable

#### Scenario: Activate the selected title
- **WHEN** a visitor activates the expanded project's title again
- **THEN** exactly that preview remains expanded

### Requirement: Rail adapts to available space

At desktop widths Rail SHALL arrange compact project titles horizontally alongside the expanded preview; below the desktop breakpoint it SHALL stack compact title rows with the selected preview inline. From 320 px upward controls SHALL remain reachable without page-level horizontal overflow. Long titles SHALL have readable complete names and visible focus indicators.

#### Scenario: Mobile layout
- **WHEN** a visitor selects Rail at 320 px wide
- **THEN** titles are stacked, one preview is expanded, and every title and action fits the viewport

#### Scenario: Long desktop titles
- **WHEN** the desktop rail includes titles too long for a compact label
- **THEN** each complete title remains available through readable text and an accessible name, without depending on hover

### Requirement: Titles support keyboard and assistive technology

Each rail title SHALL be a keyboard-reachable button exposing its expanded state and controlled panel. Enter and Space SHALL select that project without moving focus from its title. Collapsed panels SHALL contain no reachable hidden controls. View controls and rail title controls SHALL have minimum 44 by 44 px targets and readable focus and state cues in both themes.

#### Scenario: Keyboard selection
- **WHEN** a visitor focuses a collapsed title with Tab and presses Space or Enter
- **THEN** its panel expands, focus stays on the title, and expanded state is announced

### Requirement: Rail previews open existing project details

The expanded preview SHALL show the project's image, title, description, and technology tags, with a separate labeled details action. That action SHALL open the same full project details used by Carousel. Drawer Previous and Next SHALL retain their existing behavior without changing rail selection or carousel position. Closing SHALL return focus to the rail details action that opened the drawer.

#### Scenario: Open and browse details
- **WHEN** a visitor opens details from Rail, moves to a neighboring project in the drawer, and closes it
- **THEN** the original rail preview stays expanded and focus returns to its details action

### Requirement: Motion and fallback preserve usability

Rail transitions SHALL honor reduced motion by changing selection without animated expansion or decorative movement. Project content SHALL remain readable in the default Carousel view without JavaScript. Switching views or selecting a rail title SHALL NOT play project open or close sounds; opening and closing the drawer SHALL retain existing sound preferences.

#### Scenario: Reduced motion
- **WHEN** reduced motion is enabled and a visitor selects a rail title
- **THEN** the selected preview changes without an animated expansion

#### Scenario: JavaScript disabled
- **WHEN** the page is loaded without JavaScript
- **THEN** the default project content is readable and no nonfunctional view switch is presented as usable
