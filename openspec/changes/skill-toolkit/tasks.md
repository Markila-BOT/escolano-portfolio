# Tasks

## 1. Toolkit data

- [x] 1.1 Add the `note` from the spec to each skill in `skillGroups`, and verify the tool order is unchanged, there is no Design group, and no new tool

## 2. Toolkit block

- [x] 2.1 Render My toolkit after the chip groups in `components/skills.tsx`, using one closed `details` per non-empty group, and verify the chip list still shows only the icon and label
- [x] 2.2 Verify in the browser that My toolkit starts closed; that opening Languages shows only the Languages sentences from the spec and leaves Tools closed; that Languages and Tools can both stay open; that the tool order matches the chips; and that there is no Design category, proficiency mark, or sentence on a chip
- [x] 2.3 Run `pnpm exec tsc --noEmit` and verify it exits 0
- [x] 2.4 Check the toolkit item in `CHECKLIST.MD` and recount the progress row with the existing rules
