# Design

## Context

Project cards require `title`, `year`, `description`, `tags`, and `imageUrl`. `websiteUrl` is optional and becomes the outbound link in the drawer. The Build heading is specified only for MerchantSpring. The owner supplied `https://truck-driver-guide-web.vercel.app/` and asked for a saved screenshot, no video, and a personal-project tag. The live page is a route desk: current location, pickup, drop-off, and hours used in an 8-day cycle. The GitHub README still says the guide is only a health check. The card follows the live page. The stack tags follow the README: Django, React, TypeScript, and Git.

## Goals / Non-Goals

**Goals:**

- Append one card whose copy matches the live route desk and whose link is the owner-supplied client.
- Save a screenshot captured from that page. Refuse a generated image.

**Non-Goals:**

- Vendoring the Django or Vite app, deploying it, or showing a Build heading.
- Adding a video, a second source link, or a skill that this card is the only excuse for.
- Rewriting the GitHub README.

## Decisions

### Place and shape

Append the object at the end of `projectsData`. Year is `2026`. Description is two short paragraphs: the route desk, then the HOS assumption and the verification line already on the page. `websiteUrl` is `https://truck-driver-guide-web.vercel.app/`. There is no `videoUrl` and no `buildNote`. Tags: Personal, Django, React, TypeScript, and Git, using `react-icons` already available to `lib/data.ts`.

### Image gate

Capture the live route desk with headless Chrome and commit that file under `public/projects/truck-driver-guide.png`. If the capture fails, do not add the card and do not generate an image.

### Skill evidence

Do not hand-edit skill status. Tags on the card flow through the existing evidence derivation. Personal and Django are not skill labels, so they do not add a skill. React, TypeScript, and Git already exist and may list this project as evidence.

## Risks / Trade-offs

- The README and the live page disagree. The card would be false if it repeated the health-check sentence.
- One viewport capture includes empty space below the form. Cropping that space would cut the form under the card's `object-cover` frame, so the file stays the 1440×900 capture.
