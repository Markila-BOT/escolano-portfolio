# Spec Delta

## Purpose

Keep portfolio copy in the repository and record that a hosted CMS is not part of this site.

## ADDED Requirements

### Requirement: Copy ships with the repository

Portfolio copy SHALL be authored in the repository. The running site MUST NOT load that copy from a CMS, a database, or a content-fetch client. Markdown files committed for writing are static authoring and SHALL remain in the repository.

#### Scenario: Homepage content

- **WHEN** the homepage is served
- **THEN** its portfolio copy comes from the built repository and not from a CMS response

#### Scenario: No admin route

- **WHEN** the route list is reviewed
- **THEN** there is no CMS admin route and no content API for portfolio copy

### Requirement: The checklist records the decision

Applying this change SHALL mark the content-management checklist row user-accepted closed, with the date and a pointer to the technology convention. That mark MUST NOT claim a CMS was installed.

#### Scenario: Checklist after apply

- **WHEN** this change is applied
- **THEN** the CMS row is user-accepted closed and the note says a CMS was not added
