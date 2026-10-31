# Spec Delta

## Purpose

Rerun the existing lab budgets when the production build changes, and keep the known mobile LCP miss from being reported as passed.

## ADDED Requirements

### Requirement: The check reports the four existing budgets

The monitor SHALL record FCP, LCP, CLS, and TTI for a production build in the mobile and desktop profiles already used in `docs/portfolio-performance.md`. It SHALL compare them with the last accepted baseline in that document. It MUST NOT invent a new budget.

#### Scenario: A passing budget regresses

- **WHEN** a metric that passed its checklist budget now misses that budget, or misses the accepted baseline by more than the design's margin
- **THEN** the monitor fails and names the metric, the profile, and the measured value

#### Scenario: Results are not visitor-facing

- **WHEN** a visitor loads the public site
- **THEN** the page does not display lab scores from this monitor

### Requirement: Known mobile LCP stays open

The monitor SHALL keep reporting mobile LCP against the 2.5s budget. A mobile LCP above 2.5s that matches the accepted 2026-10-09 miss MUST NOT mark the LCP checklist item complete. The report SHALL distinguish that known miss from a new regression.

#### Scenario: Mobile LCP still misses

- **WHEN** mobile LCP is above 2.5s and within the accepted baseline band
- **THEN** the report records the miss and the LCP checklist item stays closed as a known miss rather than flipping to passed

### Requirement: The check is repeatable without the dev server

The monitor SHALL run against `pnpm build` output. It MUST NOT require `pnpm dev`. The command or workflow SHALL be recorded so a later run uses the same profiles.

#### Scenario: Local or CI run

- **WHEN** the recorded command runs
- **THEN** it measures a production build and writes a report that includes all four metrics for both profiles
