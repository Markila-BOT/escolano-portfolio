# Spec Delta

## Purpose

Keep the portfolio's introductory content readable during initial loading and require reproducible production evidence before declaring its paint budget satisfied.

## ADDED Requirements

### Requirement: Initial hero content is readable without client readiness

The introductory heading, first role, positioning copy and Contact link SHALL be readable in the initial document without waiting for hydration, entrance animations or client measurements. Hydration MUST NOT temporarily hide this content. The portrait SHALL retain its existing priority discovery and reserved dimensions.

#### Scenario: Scripts delayed or unavailable

- **WHEN** a visitor loads the portfolio with page scripts delayed or disabled
- **THEN** the introductory content and native Contact link remain visible and readable

#### Scenario: Hydration completes

- **WHEN** page scripts initialize the introduction
- **THEN** initially readable content remains visible without a hydration-induced blank interval or new layout shift

### Requirement: Production paint acceptance requires repeatable evidence

The production lab acceptance gate SHALL require LCP below 2500ms in each of three valid mobile and three valid desktop cold-load runs using consistent profiles. Existing FCP below 1500ms and CLS below 0.1 gates SHALL remain satisfied. Missing or failed runs, local-only results and unknown deployed candidate identity MUST NOT establish deployed candidate acceptance.

#### Scenario: Deployed candidate qualifies

- **WHEN** a deployment identified as the candidate passes every qualifying run in both profiles
- **THEN** its recorded lab evidence supports completing the LCP checklist item without claiming a field-data guarantee

#### Scenario: Evidence is insufficient

- **WHEN** a run fails its budget, candidate deployment identity is unknown or only local results exist
- **THEN** the LCP checklist remains open and the report distinguishes measured results from outstanding deployed verification
