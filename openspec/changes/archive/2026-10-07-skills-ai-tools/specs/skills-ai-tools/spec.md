# Spec Delta

## Purpose

The skills list names Claude Code, Codex, and Cursor in the same row of chips as the other tools, so a visitor scanning that list sees the tools About already describes.

## ADDED Requirements

### Requirement: The skills list includes the three tools

The skills list SHALL show Claude Code, then Codex, then Cursor, after the chips it already shows. Each SHALL be a chip in that same list. They MUST NOT be a separate group.

#### Scenario: The three chips follow Framer Motion

- **WHEN** the visitor reads the skills list
- **THEN** Claude Code, Codex, and Cursor appear in that order, immediately after Framer Motion, in the same list

### Requirement: The existing chips stay

The chips already in the skills list SHALL remain, in their current order, with HTML first and Framer Motion last among them.

#### Scenario: The list still starts with HTML

- **WHEN** the visitor reads the skills list
- **THEN** the first chip is HTML and the chip before Claude Code is Framer Motion

### Requirement: About and the introduction stay

This change SHALL NOT change the About text or the introduction. About SHALL still name Claude Code, Codex, and Cursor in its workflow paragraph. The introduction MUST NOT gain a new mention of Cursor.

#### Scenario: About still names the tools

- **WHEN** the visitor reads About
- **THEN** the workflow paragraph still names Claude Code, Codex, and Cursor

#### Scenario: The introduction does not name Cursor

- **WHEN** the visitor reads the introduction
- **THEN** the introduction does not contain the word Cursor
