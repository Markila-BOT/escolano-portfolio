# Spec Delta

## Purpose

Keep device-level visit records off the public site, and define the only dashboard shape this repository will accept later.

## ADDED Requirements

### Requirement: Public pages do not show visit records

No public page SHALL render a visitor id, referrer, UTM value, screen size, or raw beacon body from the visit beacon. The existing beacon SHALL keep posting when `NEXT_PUBLIC_ANALYTICS_URL` is set. This change MUST NOT add a dashboard route.

#### Scenario: Public homepage and tools

- **WHEN** a visitor opens the homepage or `/tools`
- **THEN** the document does not display visit identifiers or raw analytics payloads

#### Scenario: Beacon unchanged

- **WHEN** an analytics URL is configured and a visit is recorded
- **THEN** the beacon behavior remains the one already specified for device visits

### Requirement: A future dashboard is totals only

A dashboard SHALL be allowed only as server-rendered totals that contain no visitor id, referrer, UTM value, or raw payload, and only from a collector outside this repository. Until that collector exists, the analytics dashboard checklist row SHALL stay open. The site MUST NOT add a login to view analytics.

#### Scenario: No collector

- **WHEN** this repository has no aggregate analytics source
- **THEN** no dashboard is served and the checklist row stays open

#### Scenario: No login gate

- **WHEN** the public site is reviewed for this change
- **THEN** no new sign-in route exists for analytics
