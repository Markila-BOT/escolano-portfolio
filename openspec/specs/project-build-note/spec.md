# project-build-note Specification

## Purpose

The open MerchantSpring details add one short Build note, taken only from that project's description, so a reader can see how the product is put together without a public repository.

## Requirements

### Requirement: MerchantSpring shows a Build note

When MerchantSpring's details are open, the details SHALL show the heading Build after Problem, Role, and Outcome. The note SHALL be one sentence. The details MUST NOT show a repository link, and MUST NOT render MerchantSpring's description paragraphs. The case study headings SHALL remain.

#### Scenario: MerchantSpring opens with a build note

- **WHEN** the visitor opens MerchantSpring
- **THEN** the details show Problem, then Role, then Outcome, then Build, and do not show a repository link or the description paragraphs

### Requirement: The note only restates the description

The Build sentence SHALL restate MerchantSpring's current description. It MUST NOT add a claim, metric, client quote, or personal job title that the description does not already contain.

#### Scenario: The sentence uses only the description

- **WHEN** the visitor reads the MerchantSpring build note
- **THEN** the note says it pulls the latest numbers, notes, and charts into a brand report for the accounts those teams manage across those marketplaces

### Requirement: Other projects do not show a build note

A project other than MerchantSpring SHALL NOT show the heading Build in its open details.

#### Scenario: Lagoon has no build note

- **WHEN** the visitor opens Lagoon
- **THEN** the heading Build is absent

#### Scenario: MatterWorx has no build note

- **WHEN** the visitor opens MatterWorx
- **THEN** the heading Build is absent

### Requirement: The carousel card does not show the build note

The MerchantSpring card in the carousel SHALL NOT show the heading Build or the build-note sentence before the project is opened.

#### Scenario: The card stays free of the note

- **WHEN** the visitor sees the MerchantSpring card in the carousel and has not opened it
- **THEN** the card does not show the heading Build or the build-note sentence

### Requirement: Neighbor navigation shows that project's note

When Previous or Next changes the open project, the details SHALL show the Build note only when the project now open is MerchantSpring.

#### Scenario: Next leaves the note behind

- **WHEN** MerchantSpring is open and the visitor activates Next
- **THEN** the details stay open on Lagoon and the heading Build is absent

#### Scenario: Previous brings the note back

- **WHEN** Lagoon is open and the visitor activates Previous
- **THEN** the details stay open on MerchantSpring and show the heading Build after Outcome
