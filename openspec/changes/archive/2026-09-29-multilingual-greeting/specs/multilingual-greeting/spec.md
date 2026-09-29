# Spec Delta

## Purpose

Show one greeting in the introduction that changes through a glitch of about 1.5 seconds across English, Filipino, and Japanese when a visitor hovers or activates it.

## ADDED Requirements

### Requirement: Greeting is readable on load

The introduction SHALL show one greeting before the visitor interacts. That greeting SHALL be "Welcome!🇬🇧🇺🇸 👋". The visitor SHALL be able to read it in both light and dark mode without hovering or animating it.

#### Scenario: First greeting on load

- **WHEN** the visitor views the introduction in either theme
- **THEN** they can read "Welcome!🇬🇧🇺🇸 👋" without interacting with it

### Requirement: Hover or activation advances one greeting

The greeting SHALL advance to the next greeting when a pointing device enters it. It SHALL advance only once while that pointer remains over it and SHALL require the pointer to leave before another hover can advance it. A touch or keyboard activation SHALL also advance it once. The order SHALL be "Welcome!🇬🇧🇺🇸 👋", then "Mabuhay!🇵🇭 👋", then "ようこそ🇯🇵 🙇", then back to "Welcome!🇬🇧🇺🇸 👋". The greeting SHALL settle on the one it advanced to. The control's accessible name SHALL include the settled or incoming greeting.

#### Scenario: Pointer entry advances once

- **WHEN** a pointer enters the greeting that reads "Welcome!🇬🇧🇺🇸 👋" and remains over it
- **THEN** the greeting settles on "Mabuhay!🇵🇭 👋" and does not advance again until that pointer leaves and enters again

#### Scenario: Order wraps

- **WHEN** the visitor hovers or activates the greeting that reads "ようこそ🇯🇵 🙇"
- **THEN** the greeting settles on "Welcome!🇬🇧🇺🇸 👋"

#### Scenario: Touch or keyboard advances one greeting

- **WHEN** the visitor activates the greeting by touch or keyboard
- **THEN** focus is visible on the control before activation, and the greeting settles on the next one in order

### Requirement: The transition glitches the exact greeting

The current greeting SHALL leave and the next greeting SHALL enter through a glitch that lasts about 1.5 seconds and then settles. The glitch MAY slice, offset, skew, or flicker those greetings. Every visible transition state MUST use exact text from the current or next greeting. It MUST NOT replace characters with random letters. The transition MUST keep the introduction readable and MUST NOT cause the neighboring name, role, or positioning sentence to jump.

#### Scenario: Glitch lasts about one and a half seconds

- **WHEN** the visitor hovers or activates the greeting and does not prefer reduced motion
- **THEN** the greeting is still changing a moment later, has settled on the next greeting by about 1.5 seconds, and every visible fragment is exact greeting text

#### Scenario: Japanese greeting stays intact

- **WHEN** the greeting is changing to "ようこそ🇯🇵 🙇"
- **THEN** every visible greeting is real greeting text, and the settled greeting reads "ようこそ🇯🇵 🙇" with the Japanese, flag, and bow intact

### Requirement: Reduced motion skips the transition

When the visitor prefers reduced motion, hovering or activating the greeting SHALL show the next greeting at once. It MUST NOT play the glitch.

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion and hovers or activates the greeting
- **THEN** the next greeting is readable immediately, with no animated transition

### Requirement: The moment stays on the greeting

The page SHALL have one heading. The greeting MUST NOT be a second heading. The moment MUST NOT change the name, the role, or the positioning sentence.

#### Scenario: Neighboring introduction text stays put

- **WHEN** the visitor hovers or activates the greeting
- **THEN** the name, the Senior Software Engineer role, and the positioning sentence stay readable and unchanged
