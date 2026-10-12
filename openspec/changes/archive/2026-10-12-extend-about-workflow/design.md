# Design

## Context

The About section renders a fixed career narrative in `components/about.tsx` and a single workflow paragraph from `aboutWorkflow` in `lib/data.ts`. The archived `about-ai-workflow` change established that pattern. Spec `about-workflow` now needs IDD and DDD called out in that paragraph without new UI or sections.

## Goals / Non-Goals

**Goals:**

- One revised `aboutWorkflow` string that satisfies the modified requirement and stays readable in the existing centered, balanced layout.
- Preserve paragraph length similar to today so mobile line count does not jump sharply.

**Non-Goals:**

- Changing intro positioning, skills chips, or OpenSpec/process documentation on the site.
- Defining IDD/DDD as separate pages, glossary, or blog posts.
- Renaming the capability or splitting About into multiple workflow paragraphs unless copy cannot fit one paragraph during apply.

## Decisions

1. **Edit only `lib/data.ts` for workflow copy** — `components/about.tsx` already imports `aboutWorkflow`. Rationale: matches static-content convention and the prior about-workflow implementation. Alternative: inline copy in the component — rejected because it duplicates the data layer pattern.

2. **Spell out acronyms once in the paragraph** — Use "intent-driven development (IDD)" and "doubt-driven development (DDD)" on first mention if space allows, or full phrases without acronyms if the paragraph reads cleaner. Rationale: visitors may not know IDD/DDD; TDD/SDD are already spelled out in the current copy style. Alternative: acronym-only — rejected for clarity.

3. **One paragraph, two short clauses for IDD and DDD** — Fold intent and doubt into the existing daily loop (spec → AI tools → tests → ownership) instead of new `<p>` elements. Rationale: no spec change to layout; `Balancer` already wraps multiple paragraphs. Alternative: second workflow paragraph — acceptable fallback during apply if readability fails in one block.

4. **Verification** — Manual read in light and dark at 320px and desktop; confirm intro sentence is not duplicated. Add a test only if apply finds an existing test file that asserts portfolio copy substrings.

## Risks / Trade-offs

- [Long paragraph on small screens] → Keep sentences short; prefer one `<p>` but split to two if line length hurts scanability.
- [Jargon overload] → Lead with plain-language clauses; acronyms optional, not required in every sentence.
- [Spec vs marketing tone] → Stay first-person and concrete like the current `aboutWorkflow` sentence; avoid methodology essay length.

## Migration Plan

Ship as a content-only deploy. Rollback: restore the previous `aboutWorkflow` string from git. Archive syncs the main `about-workflow` spec when the change completes.
