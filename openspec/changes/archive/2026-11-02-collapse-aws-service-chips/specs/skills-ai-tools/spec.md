# Spec Delta

## MODIFIED Requirements

### Requirement: The existing chips stay

The chips other than Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS SHALL remain, with the same labels. HTML SHALL be the first chip in the section. The chip before Claude Code SHALL be Framer Motion. The chip after Cursor SHALL be AWS. The chip before the databases SHALL be React Aria. The databases SHALL follow the Tools group, so Framer Motion is not last among the chips that existed before Claude Code, Codex, and Cursor.

#### Scenario: The list still starts with HTML

- **WHEN** the visitor reads the skills section
- **THEN** the first chip is HTML and the chip before Claude Code is Framer Motion

#### Scenario: Databases follow the Tools group

- **WHEN** the visitor reads past React Aria
- **THEN** the next chips are MongoDB, MySQL, PostgreSQL, and Firebase, in that order

#### Scenario: AWS follows Cursor

- **WHEN** the visitor reads past Cursor
- **THEN** the next chip is AWS, and Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS do not appear before the databases
