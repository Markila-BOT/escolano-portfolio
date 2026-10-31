# Spec Delta

## Purpose

List Truck Driver Guide as a personal project whose public copy matches the live route desk the owner supplied.

## ADDED Requirements

### Requirement: The card is present only with a real screenshot

The project list SHALL include Truck Driver Guide after the current last project when a real screenshot of `https://truck-driver-guide-web.vercel.app/` is committed. The card MUST NOT appear with a generated image, a screenshot of a different product, or a placeholder.

#### Scenario: A real screenshot is committed

- **WHEN** a screenshot captured from the live Truck Driver Guide route desk is committed
- **THEN** the project list ends with a Truck Driver Guide card that shows that image

#### Scenario: No real screenshot exists

- **WHEN** no real screenshot of Truck Driver Guide is committed
- **THEN** the published project list does not contain a Truck Driver Guide card

### Requirement: Copy states the live route desk

The Truck Driver Guide description SHALL say that it builds an HGV route from one trip brief, places required fuel and rest events, and draws estimated daily logs. It SHALL say that the desk uses normal-condition property-carrier HOS assumptions and that the route, parking, and actual duty record still need verification. It MUST NOT describe the current product as a health check, and it MUST NOT claim a completed trip, a metric, or a video.

#### Scenario: Visitor reads the description

- **WHEN** the visitor reads the Truck Driver Guide description
- **THEN** they can read that the desk builds an HGV route and that the route, parking, and actual duty record still need verification

### Requirement: The live client is the outbound link

Open Truck Driver Guide details SHALL link to `https://truck-driver-guide-web.vercel.app/`. They MUST NOT show the Build heading, and they MUST NOT include a `videoUrl`.

#### Scenario: Open details

- **WHEN** the visitor opens Truck Driver Guide
- **THEN** the outbound link is that live client, the heading Build is absent, and no video is set

### Requirement: Tags name the personal project and the repository stack

The card SHALL tag Personal, Django, React, TypeScript, and Git. It MUST NOT tag a technology the repository README does not use for this project, except the Personal label the owner requested.

#### Scenario: Tags on the card

- **WHEN** the visitor views the Truck Driver Guide card
- **THEN** Personal, Django, React, TypeScript, and Git are visible
