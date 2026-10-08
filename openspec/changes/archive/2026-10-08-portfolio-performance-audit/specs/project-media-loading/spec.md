# Spec Delta

## Purpose

Keep optional project video resources off the initial page load while preserving usable, stable project details during loading and failure.

## ADDED Requirements

### Requirement: Video loads on drawer demand

Video playback resources SHALL be requested only after a visitor opens details for a project with video. Initial page load and image-only project details MUST NOT request the video-player implementation or video media. Existing screenshot behavior SHALL remain available independently of video loading.

#### Scenario: Initial visit
- **WHEN** the visitor loads the portfolio without opening video details
- **THEN** no video-player implementation or video media is requested

#### Scenario: Image-only details
- **WHEN** the visitor opens a project without video
- **THEN** its screenshot is shown without requesting video playback resources

### Requirement: Media layout remains stable while loading

Video details SHALL reserve a 16:9 media region and display a readable loading state until the player is ready. Project text, navigation, and close controls SHALL remain usable while loading. On completion, existing playback settings SHALL be retained without starting media outside an open video drawer.

#### Scenario: Slow player load
- **WHEN** a video project's player is still loading
- **THEN** the reserved media region shows loading feedback without moving surrounding project controls

### Requirement: Media failure does not block project details

Player or video failure SHALL show readable feedback with the project's screenshot fallback. The visitor SHALL still be able to navigate to another project and close the drawer. Leaving or closing video details SHALL stop the old player's playback and prevent stale loading results from replacing the current project's media.

#### Scenario: Video unavailable
- **WHEN** the video player or media cannot load
- **THEN** a screenshot and failure feedback remain visible while project navigation and close continue to work

#### Scenario: Navigation during loading
- **WHEN** the visitor leaves video details before loading completes
- **THEN** subsequent completion does not display or start the departed project's video
