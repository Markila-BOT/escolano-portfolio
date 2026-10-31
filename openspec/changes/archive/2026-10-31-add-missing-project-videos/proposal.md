# Proposal

## Why

Potato V3 opens as an image-only project. House Elf plays `https://youtu.be/lY9wpY_IktU`. MatterWorx plays the owner-supplied `https://youtu.be/vuIJBEjvYSo`. The drawer already plays a YouTube URL when `videoUrl` is set, and the checklist still calls out these three. Potato V3 has a published URL that is not on the project yet.

## What Changes

- Set Potato V3's video to `https://youtu.be/KTq55vfBbGA` and play it with the existing on-demand player.
- Keep House Elf on `https://youtu.be/lY9wpY_IktU` and MatterWorx on the owner-supplied `https://youtu.be/vuIJBEjvYSo`. Do not invent, search-and-guess, or reuse another project's video.
- Leave the checklist row open until all three projects play their own video.
- Keep image-only projects, including a project whose URL is still missing, on the screenshot path.

## Capabilities

### New Capabilities

- `featured-project-videos`: Which of these three projects expose a video, and which URL each one uses.

### Modified Capabilities

None. `project-media-loading` already covers demand loading, the 16:9 region, and failure fallback for any project that has a video.

## Impact

`lib/data.ts` gains `videoUrl` on Potato V3. MatterWorx and House Elf already have owner-supplied URLs and keep them. The drawer, ReactPlayer split, and screenshot fallback stay as they are. No new player dependency. Projects other than these three are unchanged.
