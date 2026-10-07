# Design

## Context

Each card in `components/project.tsx` owns its own drawer. `onOpenChange` plays the open cue when that drawer opens and the close cue when it closes. The carousel in `components/projects.tsx` already has controls named "Previous slide" and "Next slide". See proposal.md for why the open project needs its own neighbor controls.

## Goals / Non-Goals

**Goals:**

- One open details surface whose content follows a selected index in `projectsData`.
- Previous and Next change that index without closing the surface.

**Non-Goals:**

- Moving the carousel to the selected project.
- A new sound cue.
- Editing `project-carousel`, `interaction-sound`, or `uniform-components`.

## Decisions

### One drawer for the section

`Projects` holds the open flag and the selected index. A card sets the index and opens the drawer. Previous and Next only change the index. The drawer markup that today lives inside each `Project` renders once, from the selected entry.

Alternative: leave a drawer on every card and swap that drawer's content to another project. The card that opened it would no longer match the details, and closing one drawer to open the next would play the close and open cues. One drawer avoids both.

### Labels live with the other project copy

Add label helpers next to `projectCarousel` in `lib/data.ts`. With a neighbor, the visible text and the accessible name are `Previous ${title}` or `Next ${title}`. With no neighbor, the accessible name is `Previous project` or `Next project`.

Alternative: hardcode the strings in the component. The carousel position string already lives in `lib/data.ts`, and these are the same kind of copy.

### The row sits below the media

Render Previous and Next with `Button` from `components/ui/button.tsx`, in one row after the drawer grid, so they do not cover the image or video. Use `react-icons` for the chevrons, the same set the carousel arrows use. Give each button a disabled state at the ends. When the activated button becomes disabled, move focus to the other button when that button is enabled, otherwise leave focus on the drawer content.

Alternative: an empty cell instead of a disabled button, as on paco.fyi. A disabled button keeps a stable name and matches the carousel.

### Do not call the open or close cue for an index change

Keep `playCue("open")` and `playCue("close")` on the drawer's open-state change only. Changing the index must not call `onOpenChange`.

## Risks / Trade-offs

- [The drawer content is tall, so the new row sits below the fold at 320 px] → Put the row in the drawer, outside the media, and let the drawer scroll to it. Do not overlay the player.
- [Disabling the active button drops focus] → Move focus to the remaining enabled control, or to the drawer content, before the button is disabled.
- [Lifting the drawer splits `Project`] → Keep the card, the tilt, and reduced motion in `Project`. Pass an open handler in. Do not start a second drawer per card.
