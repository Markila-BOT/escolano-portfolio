# Spec Delta

## Purpose

Let a visitor step through MatterWorx's existing case study inside the open details without hiding that text from no-JavaScript readers.

## ADDED Requirements

### Requirement: The walkthrough uses only MatterWorx's case study

When MatterWorx details are open, the visitor SHALL be able to show Problem, then Role, then Outcome, one at a time, using that project's existing sentences. The walkthrough MUST NOT add a sentence. Other projects MUST NOT gain this control.

#### Scenario: Step through MatterWorx

- **WHEN** the visitor opens MatterWorx and activates the next step
- **THEN** the visible step changes to the next of Problem, Role, and Outcome, using the existing sentence

#### Scenario: Another project

- **WHEN** the visitor opens a project other than MatterWorx
- **THEN** that project has no walkthrough control

### Requirement: The full case study stays available

Before the visitor starts the walkthrough, and when JavaScript is off, MatterWorx SHALL show Problem, Role, and Outcome together as it does today. Starting the walkthrough MUST NOT remove those sentences from the no-JavaScript document.

#### Scenario: Before interaction

- **WHEN** the visitor opens MatterWorx and does not use the walkthrough
- **THEN** Problem, Role, and Outcome are all readable

#### Scenario: Scripts unavailable

- **WHEN** MatterWorx details are in the document without JavaScript
- **THEN** all three sentences remain readable and no step is required to see them

### Requirement: The control is keyboard operable

The walkthrough controls SHALL have visible labels, visible focus in both themes, and keyboard activation. Reduced motion SHALL show the selected step immediately. The control MUST NOT load a second 3D scene or an iframe.

#### Scenario: Keyboard

- **WHEN** the visitor focuses a walkthrough control and activates it
- **THEN** the selected step is readable and focus is visible

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion and activates a step
- **THEN** that step is readable immediately, with no animated transition
