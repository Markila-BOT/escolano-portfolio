# Spec Delta

## Purpose

Give the introduction a contained scene the visitor can edit, with the controls written in real text, without replacing the portrait, greeting, role titles, positioning sentence, or Contact link.

## ADDED Requirements

### Requirement: The introduction keeps a contained editable stage

The introduction SHALL include one contained stage after the Contact link. The stage MUST NOT be the full viewport and MUST NOT replace the portrait, greeting, role-title loop, positioning sentence, or Contact link. The page SHALL still have one heading. Adding or removing a cube MUST NOT move the portrait, greeting, role titles, positioning sentence, or Contact link.

#### Scenario: Existing introduction stays in place

- **WHEN** the visitor views the introduction
- **THEN** the portrait, greeting, role titles, positioning sentence, and Contact link are still present, and the stage is a bounded region after the Contact link

#### Scenario: Editing the stage does not reflow the introduction

- **WHEN** the visitor adds or removes a cube
- **THEN** the portrait, greeting, role titles, positioning sentence, and Contact link stay in the same layout positions

### Requirement: The visitor can place and remove cubes

The stage SHALL show a grid and at least one cube before the visitor interacts. A click on the grid SHALL add one cube, snapped to the grid. Shift-click on a cube SHALL remove that cube. The stage MUST NOT add or remove a cube on its own.

#### Scenario: A cube is already visible

- **WHEN** the visitor first views the stage
- **THEN** a grid and at least one cube are visible before any click

#### Scenario: Click adds a cube

- **WHEN** the visitor clicks an empty grid cell
- **THEN** one new cube appears on that cell

#### Scenario: Shift-click removes a cube

- **WHEN** the visitor Shift-clicks an existing cube
- **THEN** that cube is removed and no other introduction content changes

### Requirement: The visitor can move the view

Dragging on the stage SHALL rotate the view. Scrolling SHALL zoom the view. A pan gesture SHALL move the view across the grid. The view MUST NOT rotate, zoom, or pan until the visitor does so, including when reduced motion is preferred.

#### Scenario: Drag rotates the view

- **WHEN** the visitor drags on the stage
- **THEN** the view rotates and the cubes stay on the grid

#### Scenario: Reduced motion does not move the camera

- **WHEN** the visitor loads the introduction with reduced motion enabled and does not drag, scroll, or pan
- **THEN** the view stays still

### Requirement: The controls are written on the stage

The stage SHALL show real text, outside the drawn scene, that names click to add a cube, Shift-click to remove a cube, drag to rotate, scroll to zoom, and pan to move the view. That text SHALL be readable in light and dark mode without hovering, and SHALL be available to assistive technology. The stage MUST NOT trap keyboard focus. Tab order SHALL still reach the greeting and the Contact link.

#### Scenario: Instructions are readable on load

- **WHEN** the visitor views the stage in either theme
- **THEN** the written controls are readable without hovering or clicking the stage

#### Scenario: Keyboard navigation still leaves the stage

- **WHEN** the visitor tabs through the introduction
- **THEN** focus can reach the greeting and the Contact link, and the stage does not trap focus

### Requirement: The stage stays quiet and fails open

Adding a cube, removing a cube, or moving the view MUST NOT play an interaction sound. If the scene cannot be drawn, the written controls and the rest of the introduction SHALL remain usable.

#### Scenario: Cube edits are silent

- **WHEN** sound is on and the visitor adds or removes a cube
- **THEN** no interaction sound plays

#### Scenario: The scene cannot be drawn

- **WHEN** the scene cannot be created
- **THEN** the written controls, greeting, role titles, positioning sentence, and Contact link remain usable
