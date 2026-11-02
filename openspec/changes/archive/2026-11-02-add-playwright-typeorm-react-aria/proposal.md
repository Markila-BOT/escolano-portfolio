# Proposal

## Why

Playwright, TypeORM, and React Aria were used at WealthPark and at MerchantSpring, and the portfolio does not name them. A chip with no matching role or project tag tells the visitor there is no linked evidence.

## What Changes

- Add three Tools chips after Stripe, in this order: Playwright, TypeORM, React Aria. Keep the chips already on the page, including AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe. No note under a chip, and no proficiency mark.
- Append those three names, in that order, to the technology chips on "Senior Software Engineer" (2022-2023) and "Senior Full Stack Engineer (AI Engineer)" (2023-Present). Leave every other experience entry unchanged, including the 2021 South Melbourne role.
- Leave those two role descriptions as they are. Do not add the name WealthPark, a metric, or a new employer to the timeline prose.
- Add Playwright, TypeORM, and React Aria to the MerchantSpring project tags, immediately before Git. Do not add them to any other project.
- Skill evidence then marks all three as used professionally from those two roles, and each also lists MerchantSpring. The project filter gains the three labels. Selecting one shows MerchantSpring and no other project.

## Capabilities

### New Capabilities

- `app-stack-tools`: Playwright, TypeORM, and React Aria on the WealthPark-era roles and on MerchantSpring.

### Modified Capabilities

- `skill-categories`: The Tools group gains Playwright, TypeORM, and React Aria after Stripe. The membership list also keeps the chips already published, because the main spec still ends at Cursor.
- `skills-ai-tools`: Claude Code, Codex, and Cursor stay immediately after Framer Motion. The databases follow React Aria.
- `current-engineering-role`: The 2023 role shows the names already on the 2022 role, including the three new names. It still does not show Claude Code, Codex, or Cursor. Dates, locations, descriptions, and the introduction stay.

## Impact

- `lib/data.ts`: `skillGroups`, the two experience `tags` arrays, and MerchantSpring's project `tags`. Each new skill still needs the required `note` string. The skills section does not render it.
- `tests/skill-evidence.test.cjs` and `docs/skill-evidence.md`: the skill count moves from 29 to 32.
- Icons already in `react-icons` 5.7: `SiTypeorm` for TypeORM. This version has no Playwright or React Aria mark.
- `add-tools-and-experience` is implemented and not archived. Its delta still describes the seven platform tools. This change does not remove those tools.
- About, the introduction, the role loop, and the `/tools` page stay as they are.
