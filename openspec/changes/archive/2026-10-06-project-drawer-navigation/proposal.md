# Proposal

## Why

Opening a project shows its details in a drawer, and the only way to the next project is to close that drawer and find the next card. Checklist line 114 asks for Previous and Next on the open project, in list order, with the details staying open.

## What Changes

- While a project's details are open, Previous and Next move to the neighboring project in `projectsData` order and leave the details open.
- The visible label names the neighbor. The accessible names are "Previous project" and "Next project", so they stay distinct from the carousel's "Previous slide" and "Next slide".
- On the first project, Previous is disabled. On the last project, Next is disabled. Activating a disabled control does not change the open project.
- The title, media, tags, description, and link update to the neighbor. The carousel underneath does not move, and the move does not play the open or close cue.
- Assumption: a disabled control is used at the ends, matching the carousel, rather than an empty cell. Case studies, the expandable rail, client and timeline, Pretext layout, the YouTube drawer items, the shadcn primitive update, and the skills chips stay on their own checklist lines.
- After the behavior is confirmed in the browser, check checklist line 114 and recount. Until then the line stays open.

## Capabilities

### New Capabilities

- `project-drawer-navigation`: Previous and Next on an open project move to the neighbor in list order and keep the details open.

### Modified Capabilities

- None. `project-carousel` still owns the track, the peek, and "Previous slide" / "Next slide". `interaction-sound` still cues an actual open or close. `uniform-components` still requires the shared button.

## Impact

- `components/project.tsx` and `components/projects.tsx`. Today each card owns its own drawer, so a neighbor move would close one drawer and open another.
- The labels are copy, so their wording lives in `lib/data.ts`.
- No new package.
- Checking line 114 moves the progress row from 67 done, 11 partial, 35 not started, 67/113 (59%) to 68 done, 11 partial, 34 not started, 68/113 (60%).
