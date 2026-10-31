# Tasks

## 1. Screenshot gate

- [x] 1.1 Capture the live route desk at `https://truck-driver-guide-web.vercel.app/` and save it under `public/projects/`. Verify the file is a real capture of that page. If the capture fails, leave the project list unchanged. Do not generate an image.

## 2. Project entry

- [x] 2.1 Append the Truck Driver Guide object after the last project with the route-desk description, the live client `websiteUrl`, no video, and Personal, Django, React, TypeScript, and Git tags. Verify a Node test asserts that copy, the client URL, the absence of a Build heading and a video, and the tag labels.
- [x] 2.2 Confirm the card is last in published order and the drawer link points at the live client. Verify the existing project-list and drawer tests still pass, then run `pnpm lint` and `pnpm exec tsc --noEmit`. Do not start the dev server.
