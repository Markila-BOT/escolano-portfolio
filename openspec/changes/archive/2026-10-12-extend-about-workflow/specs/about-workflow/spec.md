# Spec Delta

## MODIFIED Requirements

### Requirement: About states the daily workflow

About SHALL say that the current way of working is AI-assisted engineering, test-driven development, spec-driven development, intent-driven development, and doubt-driven development. It SHALL say how AI fits a normal day: the work starts from a spec, the change is written with Claude Code, Codex, and Cursor, and tests check the change, while the engineer remains responsible for the result. About SHALL explain intent-driven development in plain language: the outcome and constraints for the user or system are clear before or while the spec is written, so the spec encodes intent rather than accidental scope. About SHALL explain doubt-driven development in plain language: what is uncertain is named, targeted questions or checks resolve it, and assumptions are not treated as done without evidence. About MUST NOT repeat the introduction's positioning sentence. About MUST NOT add a new page section for this statement.

#### Scenario: The three practices are readable

- **WHEN** the visitor reads About
- **THEN** they can read AI-assisted engineering, test-driven development, spec-driven development, intent-driven development, and doubt-driven development in the section text

#### Scenario: Intent-driven development is concrete

- **WHEN** the visitor reads About
- **THEN** they can read that work starts from clear intent—outcome and constraints for the user or system—so the spec reflects that intent

#### Scenario: Doubt-driven development is concrete

- **WHEN** the visitor reads About
- **THEN** they can read that open questions and uncertainty are surfaced and resolved with evidence before assumptions are treated as finished

#### Scenario: A normal day is concrete

- **WHEN** the visitor reads About
- **THEN** they can read that a normal day starts from a spec, uses Claude Code, Codex, and Cursor to write the change, and uses tests to check it, with the engineer still responsible for the result

#### Scenario: The introduction sentence is not copied

- **WHEN** the visitor reads About and the introduction
- **THEN** About does not contain the introduction sentence that the work is for product teams and runs through deployment
