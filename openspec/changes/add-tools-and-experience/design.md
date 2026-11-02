# Design

## Context

See proposal.md for why. Skills, experience tags, and project tags all live in `lib/data.ts`. `resolveSkillEvidence` matches a chip label to a tag string, with aliases only for Next.js, Tailwind, and Nest.js. A work-role match yields "Used professionally" and is listed before project matches. `SkillSelector` renders `label` and `icon` and drops `note`. The journey reads the same `tags` array the timeline uses. The project filter lists tag labels in first-seen order across `projectsData`. `react-icons` 5.7 exports `FaAws`, `VscAzureDevops`, and `SiStripe`. It does not export S3, SES, SQS, SNS, or Azure DevOps marks.

## Goals / Non-Goals

**Goals:**

- Add the seven labels in data so the existing chips, timeline, journey, evidence panel, and project filter show them without a new component or a resolver change.
- Keep the six technology names already on the two WealthPark-era roles, then append the seven.

**Non-Goals:**

- Rendering skill notes, renaming the timeline employer to WealthPark, or tagging Potato V3, House Elf, Valuation, Owner Web App, Workflow, or Chat-Admin.
- Adding the seven labels to the 2021 South Melbourne role.
- Changing About, the introduction, the role loop, or `/tools`.

## Decisions

### Seven chips, not one AWS chip

S3, SES, SQS, and SNS are separate Tools chips after Cursor. A single AWS chip would hide those names: the `note` field is required by the skill type and is not rendered. One umbrella chip was the alternative. It matches the spoken grouping and loses the only visitor-visible place those four services can appear.

### Icons already installed

Use `FaAws` for AWS, Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS. Use `VscAzureDevops` for Azure DevOps and `SiStripe` for Stripe. Add those three named imports. Do not add a dependency or a custom SVG. The alternative, upgrading `react-icons` for service-specific marks, is a separate dependency change and is not required for the labels to be readable.

### Where the labels are stored

Append the seven strings to `tags` on "Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)" only. Both arrays stay identical, so the 2023 role still matches the 2022 role. Leave both descriptions untouched.

On MerchantSpring, insert AWS and Stripe immediately before Git. Git stays the last tag, which is the pattern on the other cards that end with Git. Do not add the four services or Azure DevOps there. Do not add aliases: each chip matches its own label.

Each new skill gets a factual `note` with no employer, metric, or personal claim, in the same style as the existing notes. The section still does not render it.

### Evidence and the filter fall out of the tags

Do not edit `resolveSkillEvidence`. The two roles are already in `skillEvidenceWorkRoles`, and `experiencesData` lists the 2023 role before the 2022 role, so those are the first two sources. MerchantSpring is the only project source for AWS and Stripe. The filter picks up AWS and Stripe because they appear on that project, and it does not pick up the other five.

## Risks / Trade-offs

- [Five chips share the AWS mark] → The label is the distinction. A later icon upgrade can replace `FaAws` on the four services without a data-model change.
- [Both WealthPark-era roles list every service, including any that started in only one of those years] → The owner asked for all of them on WealthPark, and the 2023 role is specified to show the same names as the 2022 role. Splitting the lists would break that match.
- [MerchantSpring is tagged AWS, which is broader than S3, SES, SQS, and SNS] → The owner named AWS and Stripe as that project's link, and named the four services as WealthPark work. The project does not gain the service labels.

## Migration Plan

Static content only. Rollback is reverting `lib/data.ts` and `tests/skill-evidence.test.cjs`. No deploy step and no data migration.

## Open Questions

None.
