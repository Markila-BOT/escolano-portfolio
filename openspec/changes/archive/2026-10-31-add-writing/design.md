# Design

## Context

`app/sitemap.ts` currently needs to list the homepage and `/tools` once `add-browser-tools` is the source of truth. The main spec text still says homepage only; this delta lists homepage, `/tools`, and `/writing`. The footer is the existing place for a secondary route. The technology convention forbids a CMS. There is no Markdown renderer in `package.json`.

## Goals / Non-Goals

**Goals:**

- `/writing` with an empty state.
- A file-based post path that is unused until the owner adds a file.
- Sitemap entries that match real routes.

**Non-Goals:**

- Sample essays, comments, tags, RSS, or a header link.
- A headless CMS.

## Decisions

### Route

Add `app/writing/page.tsx` as a server component. Empty copy lives in `lib/data.ts`. Title and description go through `lib/seo.ts` the same way `/tools` does, with canonical `/writing`.

### Posts later

Reserve `content/writing/*.md`. Do not add a Markdown dependency in this change, because there are zero posts. When the first post is added, the task that adds it also adds the renderer and the convention-table row. Until then the index reads an empty directory and renders the empty state.

### Sitemap and footer

Extend `app/sitemap.ts` with `/writing`. Do not remove `/tools`. Add one footer link. Leave `components/header.tsx` navigation data unchanged.

## Risks / Trade-offs

- Applying this before `add-browser-tools` is archived can fight the sitemap assertion. The delta includes `/tools` so the merged requirement does not drop it.
- An empty writing page is a thin public URL. That matches the decision not to invent articles.
