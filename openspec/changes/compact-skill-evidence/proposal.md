# Proposal

## Why

My skills and Skill evidence currently repeat the same 22 skills in two separate lists. Unifying them makes the section easier to scan while keeping documented usage available when a visitor selects a skill.

## What Changes

- Keep one compact, categorized My skills chip list with the existing labels, icons and order; remove the separate repeated Skill evidence list.
- Make every skill chip an accessible control. Clicking a chip reveals its usage status and sources in one inline panel beneath its category; clicking another replaces that panel, and clicking the selected chip closes it.
- Start with no selection. Keep statuses and source lists hidden until selection, including a neutral explanation for skills with no linked evidence.
- Preserve exact evidence classification, aliases, source content and the separate My toolkit section.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `skill-categories`: Unify categorized skill chips and on-demand evidence, replacing the separate evidence list and per-row disclosures.

## Impact

Affected implementation: `components/skills.tsx`, `components/skill-evidence.tsx`, skill evidence presentation copy in `lib/data.ts`, maintainer documentation and browser verification. Reuse the existing evidence resolver and tests; no new dependencies or changes to project/experience records are required.

This builds on the implemented, unarchived `skill-evidence-indicators` change. Its delta must be synced or archived before this delta is synced or archived, so the evidence requirements modified here exist in the main specification. My toolkit remains outside this change's scope.
