# Tasks

## 1. One open project

- [x] 1.1 Add label helpers next to `projectCarousel` in `lib/data.ts`. With a neighbor title, format `Previous ${title}` and `Next ${title}`. With no neighbor, the names are `Previous project` and `Next project`. Verify by reading the file: the helpers are not hardcoded to one project, and they sit with the other project copy.

- [x] 1.2 In `components/projects.tsx`, keep one drawer for the section. A card sets the selected index and opens it. Previous and Next only change that index, using `Button` and `react-icons`, in a row after the media so they do not cover the image or video. Disable Previous on the first project and Next on the last. When the activated button becomes disabled, move focus to the other button if it is enabled, otherwise to the drawer content. Do not call the open or close cue on an index change. Keep the card tilt and reduced-motion behavior in `components/project.tsx`, and do not leave a second drawer on each card. Verify with `pnpm exec tsc --noEmit`, and by reading the files: one `Drawer`, the carousel controls are still named "Previous slide" and "Next slide", and `playCue` still runs only when the drawer opens or closes.

## 2. Check and update the checklist

- [x] 2.1 If something is already listening on port 3000, open MatterWorx and confirm Next's accessible name includes "Next" and "Potato V3", Previous is disabled and named "Previous project", and activating Previous leaves MatterWorx open. Activate Next and confirm the details stay open on Potato V3, the carousel position is unchanged, and with sound on the open and close cues do not play for that move. From Potato V3, Previous returns to MatterWorx and stays open. Open Lawson Smart Report and confirm Next is disabled and named "Next project". At 320 px, Previous and Next are visible and do not cover the image or video, in both themes. Closing still closes the details. Do not start the dev server. If nothing is listening, stop and leave 2.2 unchecked.

- [x] 2.2 After 2.1 passes, check checklist line 114 and set the current-spec row to 68 done, 11 partial, 34 not started, 68/113 (60%). If 2.1 did not run, leave the line and the row as they are. Verify by recounting with section 5 skipped and sections 11 and 12 counted as future.
