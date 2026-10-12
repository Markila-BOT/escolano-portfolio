# Design

## Context

See `proposal.md` for motivation and `specs/portfolio-discovery/spec.md` for the observable contract. The repository uses Next.js 14.2.35, server-rendered App Router entry points, static content in `lib/data.ts`, and Python standard-library production HTML checks in `tests/portfolio-html.py`. `app/layout.tsx` exports only title and description; metadata routes and JSON-LD are absent. `Intro` currently has no heading wrapper; `IntroGreeting` owns the single `motion.h1`, and the other five sections use `SectionHeading` h2 elements. Existing semantic structure needs verification, not a speculative rewrite.

## Goals / Non-Goals

**Goals:** Keep canonical identity synchronized across server metadata, identity graph, and discovery endpoints; verify generated output rather than just source objects; preserve server-first content and existing interactions.

**Non-Goals:** New libraries, new portfolio routes, SEO ranking guarantees, Search Console submission, custom-domain migration, deployment automation, preview indexing policy changes, or a broad accessibility redesign.

## Decisions

### One explicit production identity

Add `lib/seo.ts` as the shared source for the canonical origin, existing title/description, and structured-data serialization. Use `https://escolano-portfolio.vercel.app/`, the existing audited public deployment, as the recorded assumption. Reuse published social links from `lib/data.ts` instead of copying their URLs. Do not derive the canonical from request headers or `VERCEL_URL`: these produce local/preview identities. An environment-variable override adds configuration failure modes without an existing domain-migration requirement, so keep the origin explicit and documented.

### Framework-native server metadata and share image

Type the root metadata with Next's `Metadata`; set `metadataBase`, homepage canonical, Open Graph website identity, and Twitter `summary_large_image`. Preserve the current title/description and use the same absolute image in both formats with dimensions and alternative text. Generate the share image with an explicit `app/og/route.tsx` ImageResponse endpoint: a deterministic 1200 by 630 PNG with the owner's name and role, using built-in fonts and no external fetches. This is a metadata asset, not a new content page. An explicit shared endpoint avoids duplicate file-based OG/Twitter metadata overriding config. Reusing the small portrait alone would not meet the wide readable preview requirement; a second image library is unnecessary.

### Server-rendered minimal identity graph

Add one JSON-LD script to `app/page.tsx`, with schema.org context and an `@graph` containing Person and WebSite nodes. Use stable canonical `#person` and `#website` identifiers; the WebSite author references the Person. Restrict Person facts to the existing name, public senior software engineer role, canonical URL, and published GitHub/LinkedIn `sameAs` URLs. Do not add private contact data, employer affiliations, awards, or inferred credentials. Serialize JSON while escaping `<` to `\\u003c` so content cannot close its script element. Client-injected JSON-LD would miss the initial HTML requirement; a schema library is unnecessary for this small static graph.

### Native single-page discovery routes

Implement typed `app/sitemap.ts` and `app/robots.ts` metadata routes. Sitemap lists only `/`; section anchors are not separate pages and the OG asset is not a page. Omit `lastModified` rather than publishing a new timestamp on every build. Robots allows `/` for general crawlers and advertises the canonical sitemap. Do not add competing public static files or a sitemap package. Preview indexing controls remain hosting-policy work, not part of this change.

### Output-level regression checks

Add `tests/seo-html.py` beside the existing Python HTML verifier. Accept saved HTML or a supplied production-server base URL; use the standard library to parse HTML, JSON, XML and fetch endpoints. Check metadata uniqueness, matching canonical/social URLs, Person/WebSite relationships, actual landmarks/heading ancestry and section heading placement, sitemap membership, and robots rules. For live URL mode, verify the share image's status, image content type, and PNG dimensions. Add fixture-backed unittest cases for missing/duplicate metadata, nested/duplicate h1, bad graph references, preview-origin leakage, unsafe serialization, extra sitemap URLs and blocking robots rules. Test serializer escaping with a script-terminator sentinel rather than only benign production copy.

Run the existing `tests/portfolio-html.py` against the same production build to guard first-paint and navigation contracts. Inspect the hydrated heading structure and share-image render manually without starting `pnpm dev`; use a temporary production server only when validation is authorized. Record commands, serving URL, build identity, and outputs in `docs/portfolio-seo.md`. Local success supports implemented checks, not a claim that the live Vercel deployment already contains them.

## Risks / Trade-offs

- Canonical domain changes later → Update the single shared origin and rerun all discovery assertions; document the current domain assumption.
- Social clients cache previews or do not honor every field → Verify image delivery and visual legibility; do not promise platform cache refresh or richer search results for Person markup.
- Framework metadata merging or duplication → Assert final production HTML, not source snapshots alone.
- Shared content changes could affect JSON-LD safety → Escape serialization and include malicious-text regression coverage.
- Existing UI interactions or first paint regress during unrelated semantic edits → Preserve working headings, skip link, section IDs and initial visibility; make only evidence-driven corrections.

## Migration Plan

Apply code and tests together, validate a fresh production build, and then update the five SEO checklist entries with scoped evidence, correcting the obsolete nested-heading note. Preserve all unrelated user-accepted closures. Deployment requires separate authorization; after deployment, rerun the same endpoint checks against the public URL and label that evidence separately. Roll back the SEO files and metadata/JSON-LD additions together if identity or crawl routes are incorrect.

## References

- [Next.js 14 metadata and JSON-LD](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata)
- [Next.js 14 sitemap convention](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js 14 robots convention](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots)
