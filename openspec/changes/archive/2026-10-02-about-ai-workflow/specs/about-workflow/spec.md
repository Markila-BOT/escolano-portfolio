# Spec Delta

## Purpose

Let a visitor read, in About, the career that led here and the current daily workflow: AI-assisted engineering, test-driven development, and spec-driven development.

## ADDED Requirements

### Requirement: About keeps the career story

The About section SHALL keep the heading "About me". It SHALL still say that the work started on an embedded team at an automotive company, on how ECUs talk over standardized networks. It SHALL still say that a later travel site, used by millions of people, is when the focus moved to the web. It SHALL still name React, Next.js, Node.js, and TypeScript as the stack most of the work uses. It SHALL still say that time away from coding matters, and that the next problem can be one not seen before. The text SHALL be readable without hovering, in both light and dark mode.

#### Scenario: The earlier career is still there

- **WHEN** the visitor reads About in either theme
- **THEN** they can read the automotive start, the travel site and the move to the web, and React, Next.js, Node.js, and TypeScript, without hovering

#### Scenario: The heading stays

- **WHEN** the visitor views About
- **THEN** the section heading is "About me"

### Requirement: About states the daily workflow

About SHALL say that the current way of working is AI-assisted engineering, test-driven development, and spec-driven development. It SHALL say how AI fits a normal day: the work starts from a spec, the change is written with Claude Code, Codex, and Cursor, and tests check the change, while the engineer remains responsible for the result. About MUST NOT repeat the introduction's positioning sentence. About MUST NOT add a new page section for this statement.

#### Scenario: The three practices are readable

- **WHEN** the visitor reads About
- **THEN** they can read AI-assisted engineering, test-driven development, and spec-driven development in the section text

#### Scenario: A normal day is concrete

- **WHEN** the visitor reads About
- **THEN** they can read that a normal day starts from a spec, uses Claude Code, Codex, and Cursor to write the change, and uses tests to check it, with the engineer still responsible for the result

#### Scenario: The introduction sentence is not copied

- **WHEN** the visitor reads About and the introduction
- **THEN** About does not contain the introduction sentence that the work is for product teams and runs through deployment
