# Proposal

## Why

The timeline's current role is "Senior Software Engineer", dated 2022-Present, in Quezon City. The record should show that in 2023 that work became Senior Full Stack Engineer (AI Engineer), without inventing a new employer.

## What Changes

- Add one experience at the front of the timeline: "Senior Full Stack Engineer (AI Engineer)", dated 2023-Present, in Quezon City, Philippines.
- End the existing "Senior Software Engineer" entry at 2023. Keep its location, description, and technology names.
- Give the new entry the same technology names as that 2022 role, in the same order. Do not add Claude Code, Codex, or Cursor to the role.
- Add a matching journey stop. The trip from "Senior Software Engineer" to the new role stays in the Philippines, so it is a walk. The journey then has 13 stops.
- Leave the introduction's role loop and the public SEO role as "Senior Software Engineer".

## Capabilities

### New Capabilities

- `current-engineering-role`: The 2023 title, its date, place, description, and technology names, and the closed date on the 2022 role.

### Modified Capabilities

- `experience-journey`: The journey count becomes 13, and the last stop is the new role, reached on foot from "Senior Software Engineer".

## Impact

`lib/data.ts` (`experiencesData`, `experienceJourneyScenes`, `skillEvidenceWorkRoles`), journey stop-count expectations, and the experience timeline. No new dependency. `role-title-loop`, `intro-call-to-action`, and `portfolio-discovery` stay as written. Skill-group membership does not change.
