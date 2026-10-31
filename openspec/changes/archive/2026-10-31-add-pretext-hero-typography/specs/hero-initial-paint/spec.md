# Spec Delta

## MODIFIED Requirements

### Requirement: Initial hero content is readable without client readiness

The introductory heading, first role, positioning copy and Contact link SHALL be readable in the initial document without waiting for hydration, entrance animations or client measurements. Hydration MUST NOT temporarily hide this content. Later line measurement, including pretext, MUST NOT delay, hide, or replace that initial text. The portrait SHALL retain its existing priority discovery and reserved dimensions.

#### Scenario: Scripts delayed or unavailable

- **WHEN** a visitor loads the portfolio with page scripts delayed or disabled
- **THEN** the introductory content and native Contact link remain visible and readable

#### Scenario: Hydration completes

- **WHEN** page scripts initialize the introduction
- **THEN** initially readable content remains visible without a hydration-induced blank interval or new layout shift

#### Scenario: Line measurement runs later

- **WHEN** client line measurement runs after the initial text is visible
- **THEN** that text was already readable and stays readable if measurement fails
