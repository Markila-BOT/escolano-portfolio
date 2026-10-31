# Tasks

## 1. Potato V3 video

- [x] 1.1 Set Potato V3 `videoUrl` to `https://youtu.be/KTq55vfBbGA` in `lib/data.ts`. Verify a Node test reads that value, that House Elf stays on `https://youtu.be/lY9wpY_IktU`, and that MatterWorx stays on `https://youtu.be/vuIJBEjvYSo`.
- [x] 1.2 Confirm the drawer still plays a project only when `videoUrl` is set, using the existing player path. Verify the Potato V3 details request that URL and MatterWorx details request `https://youtu.be/vuIJBEjvYSo`.

## 2. Owner URLs and checklist

- [x] 2.1 Keep House Elf `videoUrl` at `https://youtu.be/lY9wpY_IktU` and MatterWorx `videoUrl` at the owner-supplied `https://youtu.be/vuIJBEjvYSo`. Verify neither value is copied from another project.
- [x] 2.2 Leave the three-video checklist row unchecked unless all three projects have their own videos. Verify `CHECKLIST.MD` matches the data file. Run `pnpm lint` and `pnpm exec tsc --noEmit` and verify both pass. Do not start the dev server.
