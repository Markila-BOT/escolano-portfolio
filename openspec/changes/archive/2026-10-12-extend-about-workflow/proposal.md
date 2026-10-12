# Proposal

## Why

About already states AI-assisted engineering, test-driven development (TDD), and spec-driven development (SDD), but the checklist now asks for a fuller picture of how work is shaped before and during delivery. Visitors who read only the intro and About should understand that specs sit on clear intent and that open questions are resolved deliberately—not only that AI writes from a spec and tests check the result.

## What Changes

- Extend the About workflow paragraph in `lib/data.ts` so it names **intent-driven development (IDD)** and **doubt-driven development (DDD)** alongside the existing AI-assisted engineering, TDD, and SDD framing.
- Explain IDD in plain language: start from what should be true for the user or system (outcome and constraints) before or while the spec is written, so the spec encodes intent rather than accidental scope.
- Explain DDD in plain language: name what is uncertain, ask targeted questions, and resolve doubt with evidence (tests, review, or a short spike) before treating assumptions as done.
- Keep the career paragraphs in `components/about.tsx` unchanged, keep the section heading "About me", and do not repeat the introduction positioning sentence.
- After copy is verified in the browser, mark checklist line 99 complete and recount progress.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `about-workflow`: Extend the daily-workflow requirement so About must surface IDD and DDD with the existing AI-assisted engineering, TDD, and SDD practices and keep the concrete daily loop (spec, Claude Code / Codex / Cursor, tests, engineer ownership).

## Impact

- Copy change in `lib/data.ts` (`aboutWorkflow` constant). `components/about.tsx` continues to render that string; no new dependencies or sections.
- Main spec `openspec/specs/about-workflow/spec.md` updates when this change is archived.
- Optional: a small static-content or HTML assertion test if the repo already guards portfolio copy elsewhere; not required unless apply finds an existing pattern for About text.
