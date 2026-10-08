# Proposal

## Why

The Skills section names technologies without showing where they were used. The user chose evidence-based representation for the proficiency checklist item, so visitors should see documented career or project usage with traceable sources rather than subjective scores.

## What Changes

- Add a separate Skill evidence block after the existing chip groups and before My toolkit if that pending change is implemented.
- Group the same skills in the existing Languages, Tools, Databases order. Give each skill a compact icon-and-text status: Used professionally, Used in projects, or No linked evidence.
- Derive statuses from explicit technology tags on documented work-role entries and portfolio projects, with named source references. A project alone does not prove professional use.
- Let visitors open a skill's evidence inline to read matching source titles, dates, and exact technology tags. Unsupported skills retain a neutral label without an inferred rating.
- Explain that the labels show documented usage, not a proficiency score; add no percentages, stars, progress bars, or years-of-experience estimates.
- Preserve chip labels/icons, section title, category membership and order, and the separate toolkit's factual notes and disclosure behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `skill-categories`: Allow a separate evidence block in the Skills section while retaining plain chips; define evidence classification, source disclosure, neutral missing-evidence behavior, and accessible visual statuses.

## Impact

Implementation touches `lib/data.ts` for explicit matching/source metadata, a focused typed evidence helper, and `components/skills.tsx` or a section-specific child for presentation. Reuse current projects, experience tags, theme tokens, icons, and native disclosures. No new dependency, remote data, or changes to career/project facts. Mark the selected proficiency checklist item complete only after verified implementation. This change does not edit the pending `skill-toolkit` artifacts or put proficiency marks inside its disclosures.
