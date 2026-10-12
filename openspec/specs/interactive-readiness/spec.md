# interactive-readiness Specification

## Purpose

Preserve the portfolio's legacy initial-load TTI budget through reproducible lab evidence, with explicit invalid-evidence handling and truthful acceptance reporting.

## Requirements

### Requirement: TTI evidence remains distinct from other metrics

The performance evidence SHALL report legacy Time to Interactive in milliseconds from the version-pinned audit, with individual values, median and range for each profile. TBT, INP, LCP and overall performance score MUST NOT substitute for TTI or establish its acceptance.

#### Scenario: Valid interactive timing is available

- **WHEN** three valid reports for each profile provide legacy TTI
- **THEN** the summary presents all six TTI values and separate mobile and desktop statistics alongside, not derived from, other metrics

#### Scenario: TTI evidence is unavailable or invalid

- **WHEN** any report has no TTI, an errored audit, a nonnumeric or nonfinite value, a negative value or a non-millisecond unit
- **THEN** verification rejects that evidence with a report-specific reason and does not infer TTI from another metric

### Requirement: Production TTI acceptance uses every qualifying run

The TTI checklist SHALL be complete only when each of three valid cold mobile and three valid cold desktop production runs is strictly below 3500ms. Evidence MUST use consistent pinned profiles and identify one served deployment, URL, audit version, browser and capture time. Local-only evidence, unknown deployment identity, warnings, runtime errors or development resources MUST NOT establish production acceptance.

#### Scenario: Every production run qualifies

- **WHEN** all six valid runs against an identified production deployment are below 3500ms
- **THEN** the checklist records a dated lab pass with linked raw evidence and does not imply field performance or another metric's acceptance

#### Scenario: A threshold failure cannot be hidden by statistics

- **WHEN** any qualifying run is at least 3500ms even if its profile median is below 3500ms
- **THEN** the TTI requirement remains open and the summary identifies the failing run

#### Scenario: Evidence cannot establish a production verdict

- **WHEN** reports are incomplete, profiles are inconsistent, a report is contaminated or the served deployment identity cannot be established
- **THEN** the checklist remains unverified and the evidence distinguishes measured timing from production acceptance
