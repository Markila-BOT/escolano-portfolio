# Spec Delta

## Purpose

Measure hero lines with pretext only after a recorded benchmark passes, and keep the initial introduction readable without that measurement.

## ADDED Requirements

### Requirement: The benchmark gates the effect

The hero SHALL keep its current wrapping unless a recorded benchmark passes. The effect MUST NOT ship when pretext code added to the first-load hero path exceeds 15kB gzip, or when a local production LCP run is more than 100ms slower than the current production build. A failed benchmark SHALL leave the hero checklist rows open.

#### Scenario: Budget exceeded

- **WHEN** the benchmark exceeds either limit
- **THEN** the hero stays on its current path and the pretext hero rows stay open

#### Scenario: Budget met

- **WHEN** both limits are met
- **THEN** the measured hero effect is allowed to ship and the benchmark numbers are recorded

### Requirement: Greeting and positioning are prepared once

Each of the three greeting strings and the positioning sentence SHALL be prepared once per font configuration. A later width change SHALL rerun layout only. The implementation MUST NOT call `getBoundingClientRect` to choose line breaks. The role-title loop MUST NOT be reflowed by this measurement.

#### Scenario: Width change

- **WHEN** the hero width changes after preparation
- **THEN** layout runs again for the prepared strings and the strings are not prepared from scratch

#### Scenario: Role loop

- **WHEN** the role title changes
- **THEN** the title still follows the existing role-title loop and is not laid out by pretext

### Requirement: One portrait wrap is the flagship effect

When the benchmark passes, the positioning sentence SHALL be the only variable-width effect, flowing around the portrait from measured line ranges. The greeting glitch SHALL remain the greeting's transition. The page SHALL keep one semantic heading, and the no-JavaScript introduction SHALL stay readable.

#### Scenario: Portrait wrap

- **WHEN** the effect ships and the visitor views the introduction with JavaScript
- **THEN** the positioning sentence uses the measured ranges around the portrait and no second flagship effect is present

#### Scenario: No JavaScript

- **WHEN** JavaScript is disabled
- **THEN** the positioning sentence and the single heading remain readable without measured lines

### Requirement: Reduced motion is static

When the visitor prefers reduced motion, the hero SHALL show the settled lines without a staggered reveal. The initial text MUST NOT shift when measurement finishes.

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** the introduction text is readable at once and the staggered line reveal does not run

#### Scenario: Measurement finishes

- **WHEN** line measurement completes
- **THEN** the introduction does not move the heading, portrait, or Contact link to a new position
