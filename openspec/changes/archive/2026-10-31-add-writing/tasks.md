# Tasks

## 1. Index

- [x] 1.1 Add server-rendered `/writing` with one h1 and the empty-state sentence from `lib/data.ts`. Verify a Node render test and the production HTML both show that sentence and no sample post when `content/writing` has no markdown file.
- [x] 1.2 Add a footer link to `/writing` and leave the header navigation unchanged. Verify the footer href and a header assertion that Writing is absent.

## 2. Discovery

- [x] 2.1 Add `/writing` to `app/sitemap.ts` and keep the homepage and `/tools`. Verify the sitemap test expects those three URLs and no post URL. Set canonical metadata through `lib/seo.ts`. Verify the writing document canonical is the production `/writing` URL.
- [x] 2.2 Run `pnpm lint` and `pnpm exec tsc --noEmit`. Verify both pass. Do not add a Markdown dependency and do not start the dev server.
