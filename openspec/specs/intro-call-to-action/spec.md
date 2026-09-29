# intro-call-to-action Specification

## Purpose

Tell a visitor, in the introduction, who the work is for, that it runs through deployment with a stated approach, and give them one way to start that reaches the contact section already on the page.

## Requirements

### Requirement: Introduction names the audience and the approach

The introduction SHALL state, in one sentence, who the work is for and what gets built. That sentence SHALL say the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript. The sentence SHALL be readable without hovering or animating the greeting, in both light and dark mode. The introduction MUST NOT repeat either claim in a second sentence.

#### Scenario: Audience and approach are visible on load

- **WHEN** the visitor views the introduction in either theme
- **THEN** they can read one sentence that the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript, without interacting with the greeting

#### Scenario: One positioning sentence

- **WHEN** the visitor reads the introduction
- **THEN** who the work is for and what gets built appear in a single sentence, and neither claim is repeated in another sentence in the introduction

### Requirement: Introduction offers one way to start

The introduction SHALL offer one start control. Activating it SHALL bring the existing contact section into view, including the contact form. The control MUST NOT open a second form, a new email address, or a new page.

#### Scenario: Start reaches contact

- **WHEN** the visitor activates the start control
- **THEN** the contact section is shown and the contact form is available there

#### Scenario: One start path

- **WHEN** the visitor views the introduction
- **THEN** there is a single start control, and it does not add another form or email address

### Requirement: Start control is a named link

The start control SHALL be a link the visitor can reach and activate with the keyboard. Its accessible name SHALL say that it goes to contact. It SHALL keep a visible focus treatment in both themes, and it SHALL match the CV control in fill, text, and shape.

#### Scenario: Keyboard activation

- **WHEN** the visitor moves keyboard focus to the start control and activates it
- **THEN** focus is visible on the control before activation, and activation shows the contact section

#### Scenario: Start control matches the CV control

- **WHEN** the visitor views the start control and the CV control in either theme
- **THEN** both match in fill, text, and shape
