# Design

## Context

See proposal.md for why. `components/about.tsx` hardcodes four paragraphs. The third ends with "I still pick up new tools, design systems, and ways of working." Portfolio copy otherwise lives in `lib/data.ts` (`docs/react-next-conventions.md`). The introduction sentence in `introCallToAction.positioning` already covers product teams, deployment, TypeScript, AI, and spec-driven development. `intro-call-to-action` forbids repeating that sentence inside the introduction. This change does not edit that sentence.

## Goals / Non-Goals

**Goals:**

- One new paragraph in About that a visitor can read without hovering.
- The automotive start, the travel site, the move to the web, the named stack, and the closing paragraph stay.
- The heading stays "About me".

**Non-Goals:**

- A new section, a diagram, or a list of tools outside that paragraph.
- Editing the introduction, skills, or experience copy.
- Restyling the existing emphasis spans.

## Decisions

### One paragraph, stored with the other copy

Add `aboutWorkflow` in `lib/data.ts` as a string. `components/about.tsx` renders it as a paragraph after the stack paragraph and before the closing paragraph. The other About paragraphs stay in the component so their existing emphasis spans stay.

The paragraph is:

> Most days I start from a spec, write the change with Claude Code, Codex, and Cursor, and check it with tests. I own the result. That is AI-assisted engineering, test-driven development, and spec-driven development.

Drop the sentence "I still pick up new tools, design systems, and ways of working." It points at the same idea without saying what the day is.

Alternative considered: move every About paragraph into `lib/data.ts` as plain strings. That matches the copy convention for all of About, and it drops the emphasis spans. Those spans are not in a spec, but changing them is a separate visual change. Leave them.

Alternative considered: name the three practices and skip the tools. The checklist item asks how AI fits the daily workflow, so the spec, the tests, and the three tools stay in the sentence.

### Do not copy the introduction

The new paragraph must not contain "product teams" or "deployment". Those words belong to the introduction sentence.

## Risks / Trade-offs

- [The paragraph is longer than the ones around it] → Four short sentences, same `mb-3` paragraph as the others. No new layout.
- [Naming three products dates the page] → They are the tools in use. Change the string in `lib/data.ts` when that set changes.
- [Dropping "I still pick up new tools" loses a line the visitor already sees] → The new paragraph replaces that claim with the actual day.

## Migration Plan

No data migration. Add the string and render it. To roll back, remove the constant and the paragraph, and restore the dropped sentence.
