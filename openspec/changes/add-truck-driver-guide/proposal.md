# Proposal

## Why

Truck Driver Guide is a public personal project and it is not in the portfolio. The owner supplied the live client at `https://truck-driver-guide-web.vercel.app/`. That page is a route desk. The GitHub README still describes an earlier health check, and that older limit is not the copy for the card.

## What Changes

- Add one project card for Truck Driver Guide, placed after the current last project.
- Link the open details to `https://truck-driver-guide-web.vercel.app/`. Do not add a video.
- Describe the live route desk. Do not describe the README health check as the current product.
- Use a screenshot captured from that live page. Do not publish the card with a generated or fake product image.
- Tag it as a personal project, with the repository stack Django, React, TypeScript, and Git.
- Do not show the MerchantSpring-only Build heading on this project.

## Capabilities

### New Capabilities

- `truck-driver-guide`: The portfolio entry for this personal project, including the live route desk and the stack named in the repository.

### Modified Capabilities

None. `project-build-note` stays limited to MerchantSpring. Carousel order rules still apply to the full list once the card exists.

## Impact

`lib/data.ts`, a static image under `public/projects/`, and a project-list test. No Django or React client code moves into this Next.js app. Skill evidence updates only if a tag on this card is the source the skills section already reads.
