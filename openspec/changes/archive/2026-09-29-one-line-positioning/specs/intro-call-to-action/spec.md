# Spec Delta

## MODIFIED Requirements

### Requirement: Introduction names the audience and the approach

The introduction SHALL state, in one sentence, who the work is for and what gets built. That sentence SHALL say the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript. The sentence SHALL be readable without hovering or animating the greeting, in both light and dark mode. The introduction MUST NOT repeat either claim in a second sentence.

#### Scenario: Audience and approach are visible on load

- **WHEN** the visitor views the introduction in either theme
- **THEN** they can read one sentence that the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript, without interacting with the greeting

#### Scenario: One positioning sentence

- **WHEN** the visitor reads the introduction
- **THEN** who the work is for and what gets built appear in a single sentence, and neither claim is repeated in another sentence in the introduction
