# Design

## Context

See proposal.md for motivation. `components/skills.tsx` currently renders static TagChip spans, then `SkillEvidence`, then My toolkit. `components/skill-evidence.tsx` repeats all groups as status rows with native details. The pure resolver already preserves exact matching, professional precedence and deduplication. Existing tests now include explicit project tags for Git and AI tools; acceptance must use current data rather than the earlier 11/4/7 snapshot.

The main skill-categories spec still describes static chips. Completed but unarchived skill-evidence-indicators adds evidence requirements with a separate-block contract. This proposal intentionally supersedes that presentation, not its classification. Sync/archive order is recorded below.

## Goals / Non-Goals

**Goals:** One scan-friendly list, one selected skill, reusable evidence rendering, and reliable keyboard/touch access.

**Non-Goals:** Changing evidence records or rules, consolidating My toolkit, adding subjective levels, persistent selection, a modal, or a new component library.

## Decisions

### Section-specific buttons and one selection

Use React state holding a selected skill label or null in the skills section or a section-specific child. Preserve the category mapping and replace static chip rendering with real buttons styled using existing Button/token conventions. Do not make the globally shared TagChip interactive: projects and other static tags use it. No new reusable disclosure primitive is necessary for this one-off selection layout.

Use a stable panel ID per skill and aria-expanded/aria-controls on each chip. Keep a corresponding hidden panel shell when collapsed so controls reference valid IDs; render source content only for the selected skill. Position the active shell beneath the complete chip list in its category, not within the wrapping chip row. Button activation toggles selection, with a single selected label ensuring exclusivity across categories. Keep focus on the trigger. Use a labelled region for the selected panel and a clear selected-chip treatment.

Alternatives: native details per chip would distort wrapping when expanded and repeat panels; a popover could obscure neighboring content and require another primitive; a dialog would add focus and dismissal work to a simple inspection. An inline category panel keeps the content readable on phones.

### Reuse the resolver; narrow the evidence renderer

Refactor SkillEvidence into a renderer for one selected skill's resolved status and sources. Remove its standalone heading, category loops and nested source disclosures. Keep exact titles/dates/tags and Experience-before-Project order. All skills activate the same interaction, including unlinked skills whose panel contains explanatory text without an empty list.

Keep a brief instruction and evidence caveat beneath My skills, sourced through lib/data.ts. Show status icons and text in the panel, leaving chips compact with icon and label only. Use semantic tokens and existing spacing; target at least 44px height even when visually compact. Do not add automatic scrolling or necessary entrance animation. Respect reduced motion for any touched skill animation.

Alternative: embedding source arrays or status labels in skillGroups duplicates the existing resolver and becomes stale when source tags change.

### Preserve adjacent behavior

Keep id=skills, section observation/navigation, group headings, all 22 labels/icons/order and toolkit controls/notes. Update docs to describe chip selection rather than separate evidence rows. Resolver tests remain focused on classification; browser checks cover the changed interaction.

## Risks / Trade-offs

- [Evidence is less visible initially] → Add a concise click instruction and obvious focus/selection styles; show the status immediately on selection.
- [Long source lists increase the selected category height] → Wrap text in normal document flow; allow only one panel and keep the toggle available above it. Avoid inner scrolling that adds a second navigation surface.
- [Two unarchived changes modify the same capability] → Sync/archive skill-evidence-indicators before this change. Do not rewrite the completed predecessor artifacts during apply.
- [Shared build output can collide with a user dev server] → Use an isolated build output/source snapshot when an existing server owns .next. Do not start pnpm dev without a request.

## Migration Plan

Apply the presentation change over the implemented evidence resolver. Verify browser interaction and source parity against current data, then update maintainer docs. Before syncing/archiving this delta, sync/archive skill-evidence-indicators so its added requirement names exist in main specs. My toolkit requires no migration. Rollback restores the former chip list and separate evidence renderer without changing source data.
