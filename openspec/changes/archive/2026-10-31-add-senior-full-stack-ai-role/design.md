# Design

## Context

`experiencesData` is newest first. The first entry is "Senior Software Engineer", "2022-Present", "Quezon City, Philippines", with the description "I work at a property-management technology company." and tags TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS. `experienceJourneyScenes` must include every experience title. The journey walks inside a country and flies between countries. `skillEvidenceWorkRoles` is typed against those titles. The introduction loop and `lib/seo.ts` role are a separate, already specified "Senior Software Engineer".

## Goals / Non-Goals

**Goals:**

- Put the 2023 title first on the timeline and last on the journey.
- Close the 2022 role at 2023.
- Keep one Present date.
- Reuse the 2022 technology names and a Philippines walk.

**Non-Goals:**

- A new employer, metric, or AI-tool chip.
- Changing `introRoleTitles`, the SEO role, or skill-group membership.
- A new 3D setting.

## Decisions

### Insert one object and close the previous date

Add this object at the start of `experiencesData`. Set the existing senior entry's date to "2022-2023" and leave its other fields alone.

Title: "Senior Full Stack Engineer (AI Engineer)". Location: "Quezon City, Philippines". Date: "2023-Present". Description: "I work at a property-management technology company as a senior full stack engineer, with AI-assisted engineering." Tags: the same six names, same order. Icon: `CgWorkAlt`, already used by the 2022 role.

### Reuse the senior scene

Append one `experienceJourneyScenes` entry with that title and the same visual as "Senior Software Engineer": office, code, senior, dual-monitors. The typed title list then stays aligned. Quezon City to Quezon City is a walk through the existing country check. The stop count becomes 13. Read More still adds three entries, so one click still shows six.

### Keep professional evidence on the same tools

Add the new title to `skillEvidenceWorkRoles`. Do not add tags. The professional skill set stays the set already produced by the 2022 role's tags.

## Risks / Trade-offs

- The first three timeline cards change, because the new role takes the first slot. The full list is still behind Read More.
- A shared 2023 on both dates is the split the request names. The 2022 role does not stay Present.
- The hero still says "Senior Software Engineer". That is intentional. The timeline is the place the new title appears.
