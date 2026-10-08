# Spec Delta

## MODIFIED Requirements

### Requirement: The skills list includes the three tools

The Tools group SHALL show Claude Code, then Codex, then Cursor, immediately after Framer Motion. Each SHALL be a chip in that Tools group. They MUST NOT be their own group.

#### Scenario: The three chips follow Framer Motion

- **WHEN** the visitor reads the Tools group
- **THEN** Claude Code, Codex, and Cursor appear in that order, immediately after Framer Motion, in that group

### Requirement: The existing chips stay

The chips already in the skills list SHALL remain, with the same labels. HTML SHALL be the first chip in the section. The chip before Claude Code SHALL be Framer Motion. The databases SHALL follow the Tools group, so Framer Motion is not last among the chips that existed before the three tools.

#### Scenario: The list still starts with HTML

- **WHEN** the visitor reads the skills section
- **THEN** the first chip is HTML and the chip before Claude Code is Framer Motion

#### Scenario: Databases follow the Tools group

- **WHEN** the visitor reads past Cursor
- **THEN** the next chips are MongoDB, MySQL, PostgreSQL, and Firebase, in that order
