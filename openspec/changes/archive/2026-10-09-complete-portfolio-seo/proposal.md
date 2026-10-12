# Proposal

## Why

The portfolio currently publishes only a title and description, leaving the five SEO checklist items incomplete. Search engines and shared links need a consistent public identity, crawl discovery, structured data, and verified document semantics.

## What Changes

- Add canonical, Open Graph, and Twitter card metadata plus a share image using the existing Next.js metadata APIs.
- Publish server-rendered Person and WebSite JSON-LD grounded in existing portfolio content and profile links.
- Generate `/sitemap.xml` and `/robots.txt` for the single public page.
- Verify one top-level heading, section headings, and native landmarks in production HTML. The checklist's nested-heading claim is stale: `Intro` already delegates to a single `motion.h1`; preserve that structure rather than adding a redundant fix.
- Add regression checks and evidence, then reconcile the five SEO checklist rows without treating local verification as deployed verification.

## Capabilities

### New Capabilities

- `portfolio-discovery`: Consistent search and social identity, structured identity data, crawl endpoints, and semantic structure for the public single-page portfolio.

### Modified Capabilities

None. Existing accessible-navigation and hero-initial-paint requirements remain unchanged.

## Impact

- Target `app/layout.tsx`, `app/page.tsx`, new shared SEO data in `lib/seo.ts`, and Next.js metadata route files for robots, sitemap, and a share image.
- Extend production HTML verification alongside `tests/portfolio-html.py`; document verification and update `CHECKLIST.MD` during implementation only.
- Assume the existing public deployment, `https://escolano-portfolio.vercel.app/`, remains the canonical URL; do not derive identity from localhost or preview request hosts.
- No dependency additions, route redesign, content invention, deployment, search-indexing guarantees, or reopening Mobile LCP and Contact readiness.
