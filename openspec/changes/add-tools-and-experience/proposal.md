# Proposal

## Why

The skills list and the WealthPark-era experience entries do not name the platform work already done: AWS (S3, SES, SQS, SNS), Azure DevOps, and Stripe. A visitor who opens a chip with no matching role or project tag is told there is no linked evidence. Those tools should be visible and linked, with WealthPark as the professional source and MerchantSpring as the project source for AWS and Stripe.

## What Changes

- Add seven Tools chips after Cursor, in this order: AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, Stripe. Languages, Databases, and the chips that already exist stay. No note under a chip, and no proficiency mark.
- Append those seven names, in that order, to the technology chips on both property-management roles: "Senior Software Engineer" (2022-2023) and "Senior Full Stack Engineer (AI Engineer)" (2023-Present). Leave every other experience entry unchanged, including the 2021 South Melbourne role.
- Leave those two role descriptions as they are. Do not add the name WealthPark, a metric, or a new employer to the timeline prose.
- Add AWS and Stripe to the MerchantSpring project tags. Do not add Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, or Azure DevOps to MerchantSpring, and do not add any of the seven labels to another project.
- Skill evidence then marks all seven as used professionally from those two roles. AWS and Stripe also list MerchantSpring. The project filter gains AWS and Stripe because those labels appear on a project. The four services and Azure DevOps do not become filter options.

## Capabilities

### New Capabilities

- `platform-tool-evidence`: The seven platform tools, which WealthPark-era roles carry them, and which of them MerchantSpring links.

### Modified Capabilities

- `skill-categories`: The Tools group gains the seven chips after Cursor. The rule that forbids any new chip changes to allow these seven and no others.
- `skills-ai-tools`: Claude Code, Codex, and Cursor stay immediately after Framer Motion. The databases follow Stripe, because AWS is the chip after Cursor.
- `current-engineering-role`: The 2023 role shows the existing six names plus the seven new names, matching the 2022 role. It still does not show Claude Code, Codex, or Cursor. Dates, locations, descriptions, and the introduction stay.

## Impact

- `lib/data.ts`: `skillGroups` and the two experience `tags` arrays. MerchantSpring's project `tags`. Each new skill still needs the required `note` string; the skills section does not render it.
- `tests/skill-evidence.test.cjs`: the fixed count of 22 skills and the professional classification list.
- Icons already in `react-icons` 5.7: `FaAws` for AWS and the four services, `VscAzureDevops` for Azure DevOps, `SiStripe` for Stripe. No new dependency. Simple Icons in this version has no S3, SES, SQS, SNS, or Azure DevOps mark.
- About, the introduction, the role loop, and the `/tools` page stay as they are. `/tools` is the free browser utilities, not this skills list.
