# Spec Delta

## Purpose

State which of MatterWorx, Potato V3, and House Elf expose a project video, and which URL is allowed for each one.

## ADDED Requirements

### Requirement: Potato V3 plays the published video

Potato V3 SHALL expose `https://youtu.be/KTq55vfBbGA` as its project video. Opening Potato V3 SHALL use the existing video details behavior. The URL MUST NOT be replaced with a different video in this change.

#### Scenario: Potato V3 opens its video

- **WHEN** the visitor opens Potato V3
- **THEN** the details request that YouTube URL and no other project video

#### Scenario: Potato V3 stays on that URL

- **WHEN** Potato V3's video field is read
- **THEN** the value is `https://youtu.be/KTq55vfBbGA`

### Requirement: House Elf plays the supplied video

House Elf SHALL expose `https://youtu.be/lY9wpY_IktU` as its project video. Opening House Elf SHALL use the existing video details behavior. The URL MUST NOT be replaced with Potato V3's video or another project's video.

#### Scenario: House Elf opens its video

- **WHEN** the visitor opens House Elf
- **THEN** the details request `https://youtu.be/lY9wpY_IktU`

#### Scenario: House Elf stays on that URL

- **WHEN** House Elf's video field is read
- **THEN** the value is `https://youtu.be/lY9wpY_IktU`

### Requirement: MatterWorx plays the supplied video

MatterWorx SHALL expose `https://youtu.be/vuIJBEjvYSo` as its project video. Opening MatterWorx SHALL use the existing video details behavior. The URL MUST NOT be replaced with House Elf's video, Potato V3's video, or another project's video.

#### Scenario: MatterWorx opens its video

- **WHEN** the visitor opens MatterWorx
- **THEN** the details request `https://youtu.be/vuIJBEjvYSo`

#### Scenario: MatterWorx stays on that URL

- **WHEN** MatterWorx's video field is read
- **THEN** the value is `https://youtu.be/vuIJBEjvYSo`

### Requirement: The checklist stays open until all three play

The project-video checklist row SHALL stay unchecked while Potato V3 has no `videoUrl`. Checking that row requires all three projects to play their own owner-confirmed videos.

#### Scenario: Two videos do not close the row

- **WHEN** MatterWorx has `https://youtu.be/vuIJBEjvYSo`, House Elf has `https://youtu.be/lY9wpY_IktU`, and Potato V3 has no video
- **THEN** the checklist row for those three videos remains open
