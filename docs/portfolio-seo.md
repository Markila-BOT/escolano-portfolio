# Portfolio SEO

`lib/seo.ts` owns the canonical production URL, title, description, share-image identity and JSON-LD serializer. The canonical remains `https://escolano-portfolio.vercel.app/` even when testing through localhost or a preview hostname. A domain migration must change this shared value and rerun the checks below.

`app/layout.tsx` exports server metadata for canonical, Open Graph and Twitter large-image previews. `/og` generates a 1200 × 630 PNG with built-in fonts and no remote fetches. Both sharing formats advertise the same image, dimensions and alternative text. The image route is not a content page.

`app/page.tsx` renders one schema.org Person/WebSite graph in the initial HTML. The public role and name match portfolio content; social URLs come directly from `professionalSocialLinks`. The WebSite author references the Person's stable identifier. Serialization escapes less-than characters to prevent script termination. No private contact data or unverified credentials are included. This markup does not guarantee a rich search result.

`/sitemap.xml` lists only the homepage. Sections are fragments, not separate pages. There is no fabricated modification timestamp. `/robots.txt` allows general crawlers and points to the canonical sitemap; this does not change Vercel preview indexing policy.

## Verification

```sh
python3 -m unittest discover -s tests -p 'seo_html_test.py' -v
pnpm exec tsc --noEmit
pnpm lint
node --test tests/*.test.cjs
pnpm build
pnpm start --port 3128
```

In a separate terminal, with the production server running:

```sh
python3 tests/seo-html.py http://localhost:3128/
python3 tests/portfolio-html.py http://localhost:3128/
```

The SEO verifier checks final head metadata, exactly one main and h1, section h2 placement, English language and native header/navigation/footer, JSON-LD relationships and visible profile links, XML sitemap, robots policy, and image status/content type/dimensions. Saved HTML is supported with `python3 tests/seo-html.py /path/to/homepage.html`, but explicitly does not verify endpoints. Live endpoint requests use the supplied serving host while checking that advertised URLs retain the production identity.

Fixture tests reject missing and duplicate metadata, alternate origins, nested and duplicate headings, missing landmarks, wrong graph references, mismatched profiles, invalid sitemap entries, blocking robots rules and incorrect image dimensions. The safety test executes the actual TypeScript serializer with a script terminator and parses its output rather than checking a replica.

Visually inspect `/og` for clipping and readable name/role. In the browser, wait for hydration and a greeting/role transition; verify the heading hierarchy remains intact and the hero stays readable. Run these checks against the deployed public URL only after a separately authorized deployment. Local production-build evidence is not deployed evidence; indexing and cached platform previews are outside this acceptance gate.

## Evidence

Local production verification on 2026-10-09 used `http://127.0.0.1:3128/` and build `ptrFT661SmsigpLHhT4-w`. This is the working-tree build, not a deployed Vercel candidate.

- Eight Python fixture tests passed, including the actual serializer's script-terminator test. All 43 Node regression tests passed, including the added compact/desktop navigation-landmark check.
- `pnpm lint`, `pnpm exec tsc --noEmit`, Prettier checks for touched application files, and the final `pnpm build` passed. An intermediate build hit a transient `/og` collection error; a serial rebuild with the temporary server stopped passed. The build notes the expected dynamic Edge image endpoint.
- Both live HTML verifiers passed against the same local production build. `/og`, `/sitemap.xml`, and `/robots.txt` returned 200 with their expected content types and contents; the PNG was 1200 × 630.
- The generated share image was visually reviewed: name and role are readable and unclipped. The image uses inline ImageResponse styles because it renders an independent bitmap, not the site's DOM/Tailwind theme.
- The initial compact header was missing a native navigation landmark despite the desktop branch having one. Wrapping the compact menu controls in a named nav corrected this actual violation without changing modal or focus behavior. Existing headings were already correct and remained unchanged.
- Headless Chrome checks at 390px and 1280px widths passed after hydration, a greeting activation from Welcome to Mabuhay, and a timed role transition from Senior Software Engineer to Full Stack Engineer. Each retained one h1, five section h2s, one header nav and visible hero text with opacity 1; no nested headings appeared.
- Next.js normalizes root metadata URLs by removing the trailing slash. The verifier accepts the equivalent HTTPS root URLs while rejecting changed origins, paths, queries and fragments.

No deployment or search submission was performed. Public endpoint availability and social-platform cache refresh after deployment remain unverified; local results do not imply that live metadata has changed.
