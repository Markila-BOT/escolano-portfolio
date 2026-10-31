# Design

## Context

Potato V3 has a screenshot and no `videoUrl`. House Elf uses `https://youtu.be/lY9wpY_IktU`. MatterWorx uses the owner-supplied `https://youtu.be/vuIJBEjvYSo`. Other projects already set `videoUrl` to a `youtu.be` URL. `components/project-details-drawer.tsx` plays that field with the demand-loaded player. The checklist gives one URL for Potato V3.

## Goals / Non-Goals

**Goals:**

- Play `https://youtu.be/KTq55vfBbGA` for Potato V3.
- Keep MatterWorx on `https://youtu.be/vuIJBEjvYSo` and House Elf on `https://youtu.be/lY9wpY_IktU`.
- Keep the checklist row open until all three play.

**Non-Goals:**

- A new player, captions, or a change to loading and failure behavior.
- Replacing the owner-supplied MatterWorx or House Elf URLs.

## Decisions

### Add the field on the existing object

Set `videoUrl` on the Potato V3 object in `lib/data.ts`. Do not add a parallel video map. The drawer already narrows with `"videoUrl" in project`.

### Stop without a URL

House Elf and MatterWorx already have owner-supplied URLs. Keep both. Do not browse for a substitute video.

## Risks / Trade-offs

- Potato V3 video adds a player request only after that drawer opens. The older image-only MatterWorx note in `docs/portfolio-performance.md` describes a measurement from before this URL.
- An unlisted or private YouTube video will hit the existing failure fallback. That is acceptable; do not swap in a different public video.
