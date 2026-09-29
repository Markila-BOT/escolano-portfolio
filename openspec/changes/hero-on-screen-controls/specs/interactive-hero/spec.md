# Spec Delta

## Purpose

Give the introduction a contained scene the visitor can edit, with the controls written in ordinary text beside the canvas.

## ADDED Requirements

### Requirement: Introduction shows an editable stage

The introduction SHALL show a bounded stage after the Contact link. The stage SHALL show a grid and at least one cube before the visitor interacts. Editing the stage MUST NOT move the portrait, greeting, role-title loop, positioning sentence, or Contact link, and MUST NOT change the size of the stage.

#### Scenario: Stage is visible on load

- **WHEN** the visitor views the introduction
- **THEN** a grid and at least one cube are visible in a stage below the Contact link

#### Scenario: Edits stay inside the stage

- **WHEN** the visitor adds or removes a cube
- **THEN** the portrait, greeting, role titles, positioning sentence, and Contact link remain in the same layout positions and the stage keeps the same height

### Requirement: Controls are written on screen

The stage SHALL show a text instruction that names click to add a cube, Shift-click to remove a cube, drag to rotate, scroll to zoom, and pan to move the view. That instruction SHALL be readable without hovering, in both light and dark mode, and MUST NOT be painted into the canvas or hidden from assistive technology.

#### Scenario: Instruction is readable on load

- **WHEN** the visitor views the stage in either theme
- **THEN** the instruction is visible without hovering or focusing the stage

#### Scenario: Instruction is not canvas text

- **WHEN** assistive technology reads the stage
- **THEN** the instruction is available as text and the canvas is not a control that must be operated to learn the controls

### Requirement: Pointer edits cubes and the camera separately

A click that stays within a small movement SHALL add one cube snapped to the grid. The same click while Shift is held SHALL remove the cube under the pointer and SHALL NOT remove the ground. A drag SHALL rotate the view, scroll SHALL zoom, and the pan gesture SHALL move the view. A drag, zoom, or pan MUST NOT also add or remove a cube. The stage MUST NOT play an interaction sound.

#### Scenario: Click adds one snapped cube

- **WHEN** the visitor clicks the stage without holding Shift and without dragging
- **THEN** one cube appears on a grid cell and no interaction sound plays

#### Scenario: Shift-click removes one cube

- **WHEN** the visitor Shift-clicks a cube without dragging
- **THEN** that cube is removed and the ground remains

#### Scenario: Camera gestures do not edit cubes

- **WHEN** the visitor drags, scrolls, or pans on the stage
- **THEN** the view changes and the set of cubes stays the same

### Requirement: The stage stays out of the other introduction controls

A pointer event on the stage MUST NOT advance the greeting or the role-title loop. Keyboard focus MUST still be able to reach the greeting and the Contact link. The stage MUST NOT animate the camera by itself, including when the visitor prefers reduced motion.

#### Scenario: Greeting and titles stay independent

- **WHEN** the visitor clicks the stage
- **THEN** the greeting and the current role title do not change

#### Scenario: Keyboard path remains

- **WHEN** the visitor moves through the page with the keyboard
- **THEN** focus can reach the greeting and the Contact link without entering the canvas

#### Scenario: Reduced motion stays still

- **WHEN** the visitor prefers reduced motion and has not moved the view
- **THEN** the camera does not animate on its own
