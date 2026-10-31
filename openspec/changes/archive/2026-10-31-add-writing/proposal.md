# Proposal

## Why

The future-enhancements list asks for a writing index, the kind of short engineering notes on the reference sites. This portfolio has no writing route. Content is static and the convention forbids a CMS.

## What Changes

- Add `/writing` as a server-rendered index. With no posts, the page says there are no notes yet. Do not invent essays, dates, or authors.
- Author a post as a Markdown file in the repo. Publishing a post requires the owner to write it. This change does not seed a sample article.
- Add a published post's URL to the sitemap only when that file exists. Keep the homepage and `/tools` on the sitemap.
- Link the index from the footer only. Do not add a header item or a second hiring call to action.

## Capabilities

### New Capabilities

- `writing`: A static writing index and the rule that unpublished copy is not invented.

### Modified Capabilities

- `portfolio-discovery`: The sitemap lists the homepage, `/tools`, and `/writing`, plus a post URL only when that post is published. This replaces the main spec's homepage-only sitemap text and keeps the `/tools` URL from the unarchived `add-browser-tools` delta.

## Impact

`app/writing/`, `content/writing/`, sitemap generation, footer, and `docs/technology-convention.md` to allow Markdown posts beside `lib/data.ts`. No CMS, database, comments, or content-fetch client. No new Markdown dependency if the repo can render a small set of files with the Next.js version already installed; otherwise record the one library in the convention table.
