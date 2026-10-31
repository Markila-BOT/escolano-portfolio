# Tasks

## 1. Timeline entry

- [x] 1.1 Insert "Senior Full Stack Engineer (AI Engineer)" at the start of `experiencesData` with date "2023-Present", location "Quezon City, Philippines", the design's description, the six 2022 technology names, and `CgWorkAlt`. Set "Senior Software Engineer" to "2022-2023" and leave its other fields. Verify a data read shows one Present date and that the 2023 description names no employer other than the property-management technology company.
- [x] 1.2 Add the matching `experienceJourneyScenes` visual and add the new title to `skillEvidenceWorkRoles`. Verify `pnpm exec tsc --noEmit` passes and the journey helper's last stop is that title in Quezon City with a walk from "Senior Software Engineer". Do not start the dev server.

## 2. Counts and the introduction

- [x] 2.1 Update the journey stop total from 12 to 13 wherever a test or the experience section asserts it. Verify stop 1 is still Education, the last stop is the 2023 role, and one Read More click still shows six timeline entries.
- [x] 2.2 Confirm `introRoleTitles` and the SEO role are still "Senior Software Engineer" and the role loop has the same four titles. Verify the existing hero title test still passes, and run `node --test tests/skill-evidence.test.cjs` to confirm the professional skill set did not gain Claude Code, Codex, or Cursor.
