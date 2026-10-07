# Design

## Context

See proposal.md for why. `skillsData` in `lib/data.ts` is the only source for the skills chips. `components/skills.tsx` maps that array into one `ul` of `TagChip`s. The last entry is Framer Motion. About already names the three tools. The installed `react-icons` set has `SiClaudecode` and `SiCursor`. It has no Codex glyph. `data.ts` already imports from `react-icons/tb`.

## Goals / Non-Goals

**Goals:**

- Three new entries at the end of `skillsData`, using icons already in `react-icons`.
- The skills section keeps one list.

**Non-Goals:**

- A new icon package, a second list, categories, or one-line notes.
- Editing About or the introduction.

## Decisions

Append, in order:

- Claude Code, icon `SiClaudecode`
- Codex, icon `TbBrandOpenai`
- Cursor, icon `SiCursor`

`SiClaudecode` is the Claude Code mark. `SiCursor` is the Cursor mark. Codex has no icon in the installed set, and Codex is an OpenAI product, so the chip uses the OpenAI mark already shipped in `react-icons`.

Alternative: omit icons for the three chips. Rejected. Every current chip has an icon, and a labelless gap would make these three look like a different kind of item.

Alternative: add a dependency for a Codex glyph. Rejected. The technology convention says not to add a package when `react-icons` already covers section icons.

`components/skills.tsx` stays a single map over `skillsData`. No title check and no second list.

## Risks / Trade-offs

- [The OpenAI mark is not a Codex wordmark] → The visible label is Codex. The icon is the brand mark available in the installed set.
- [A later reorder of `skillsData` would move the three chips] → The spec checks that they follow Framer Motion. Add them at the end and leave the earlier entries alone.

## Migration Plan

Add the three entries. Rollback is removing them. No data migration and no dependency install.

## Open Questions

None.
