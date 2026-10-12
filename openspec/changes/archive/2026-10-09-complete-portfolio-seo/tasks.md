# Tasks

## 1. Search and social identity

- [x] 1.1 Add shared canonical identity in `lib/seo.ts` and typed metadata in `app/layout.tsx`; verify production HTML has one canonical, title/description, matching Open Graph identity and Twitter large-image fields pointing to the documented production origin.
- [x] 1.2 Add deterministic `app/og/route.tsx` share-image generation with built-in ImageResponse; verify HTTP 200, PNG content type, 1200 by 630 dimensions and readable name/role without external resource fetches.
- [x] 1.3 Add metadata and image assertions to `tests/seo-html.py` plus fixture-based unittest coverage for missing/duplicate fields and preview-origin leakage; verify valid fixtures pass and invalid fixtures fail.
- [x] 1.4 Create `docs/portfolio-seo.md` documenting canonical configuration, share-image route and metadata-check commands; verify instructions match the implemented verifier interface.

## 2. Structured data and semantic document

- [x] 2.1 Add the minimal Person/WebSite graph and safe serializer in `lib/seo.ts`, rendered by `app/page.tsx`; verify initial HTML JSON-LD parses, author references resolve and `sameAs` matches published links from `lib/data.ts`.
- [x] 2.2 Add regression coverage that executes the actual serializer with a script-terminator sentinel and parses its HTML output; verify the value round-trips while no extra element or executable script is created.
- [x] 2.3 Extend semantic HTML assertions for one main, one nonempty h1, native header/nav/footer, English language and each section's h2; verify nested/duplicate heading fixtures fail and the current production structure passes, correcting components only if an actual violation is found.
- [x] 2.4 Add identity-graph negative fixtures for invalid references, noncanonical identity and mismatched profile links; verify failures and document structured-data limits and semantic checks in `docs/portfolio-seo.md`.

## 3. Crawl discovery

- [x] 3.1 Add typed `app/sitemap.ts` with only the canonical homepage and no fabricated modification timestamp; verify `/sitemap.xml` returns 200, XML content type and the single expected URL.
- [x] 3.2 Add typed `app/robots.ts` allowing general crawlers and advertising the canonical sitemap; verify `/robots.txt` returns 200, text content type and no blocking policy for the page or rendering assets.
- [x] 3.3 Extend the SEO verifier with sitemap and robots checks and negative fixtures for extra/hash URLs, wrong origins and blocking directives; verify fixture tests pass and document endpoint checks in `docs/portfolio-seo.md`.

## 4. Integration acceptance

- [x] 4.1 Run focused fixture tests, `pnpm lint`, TypeScript checking, existing regression tests and a fresh `pnpm build` when validation is authorized; verify no new failures and run both SEO and existing portfolio HTML verifiers against the same temporary production server, without starting `pnpm dev`.
- [x] 4.2 Inspect the rendered share image and hydrated headings through a greeting/role change; verify preview legibility, one h1, retained section headings and readable initial hero content, recording checks and any limitations in `docs/portfolio-seo.md`.
- [x] 4.3 Update only the five SEO checklist rows with implementation evidence, replacing the stale nested-h1 claim; verify recorded URL/build/commands distinguish local from deployed evidence and preserve Mobile LCP and Contact readiness closures. Do not deploy without separate authorization.
