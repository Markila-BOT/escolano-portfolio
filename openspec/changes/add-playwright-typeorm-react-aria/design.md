# Design

## Context

See proposal.md for why. The published Tools group in `lib/data.ts` ends with Stripe. Both WealthPark-era roles end with Stripe. MerchantSpring's tags end with AWS, Stripe, and Git. `resolveSkillEvidence` matches a chip label to a tag string. `react-icons` 5.7 exports `SiTypeorm`. It does not export a Playwright or React Aria mark. The main specs under `openspec/specs/` still end the Tools group at Cursor because `add-tools-and-experience` is not archived.

## Goals / Non-Goals

**Goals:**

- Add the three labels in data so the existing chips, timeline, journey, evidence panel, and project filter show them without a resolver change.
- Keep every chip and role tag that is already published, then append Playwright, TypeORM, and React Aria.

**Non-Goals:**

- Removing AWS, the four Amazon services, Azure DevOps, or Stripe.
- Tagging Potato V3, House Elf, Valuation, Owner Web App, Workflow, or Chat-Admin.
- Adding the three labels to the 2021 South Melbourne role.
- Changing About, the introduction, the role loop, or `/tools`.

## Decisions

### Order

Append Playwright, TypeORM, and React Aria to the Tools group after Stripe. Append the same three strings to both WealthPark-era role tag arrays. On MerchantSpring, insert the three project tags immediately before Git, after Stripe. Git stays last.

### Icons already installed

Use `SiTypeorm` for TypeORM. Use `VscBeaker` for Playwright and `FaReact` for React Aria. Those two products have no mark in this `react-icons` version. A Testing Library or Radix icon would name a different product. The label is the distinction. Do not add a dependency.

Each new skill gets a factual `note` with no employer, metric, or personal claim. The section still does not render it.

### Evidence and the filter fall out of the tags

Do not edit `resolveSkillEvidence`. The two roles are already in `skillEvidenceWorkRoles`, and `experiencesData` lists the 2023 role before the 2022 role. MerchantSpring is the only new project source. The filter picks up a label because it appears on that project.

## Risks / Trade-offs

- [Playwright and React Aria share a generic or React mark] → The label names the tool. A later `react-icons` upgrade can replace the icon without a data-model change.
- [The unarchived platform-tool change and this change both modify Tools membership] → This change's modified requirement lists the published chips and then the three new ones. Archiving it after `add-tools-and-experience` keeps both sets. Archiving this change first would still name the published chips, because they are in this delta.

## Migration Plan

Static content only. Rollback is reverting `lib/data.ts`, `tests/skill-evidence.test.cjs`, and `docs/skill-evidence.md`. No deploy step.

## Open Questions

None.
