# Proposal

## Why

The future-enhancements list still includes a content management system. `docs/technology-convention.md` already says portfolio copy is static TypeScript in `lib/data.ts` and that a CMS, database, or data-fetching client must not be added. The checklist has not recorded that decision.

## What Changes

- Make the static authoring rule a spec, so a later change cannot add a CMS without changing the spec on purpose.
- On apply, mark the CMS checklist row user-accepted closed, with the date and a pointer to the convention. Do not describe that as proof of a CMS.
- Do not add a package, an admin route, or a content API.

## Capabilities

### New Capabilities

- `static-content-authoring`: Portfolio copy ships with the repository and is not loaded from a CMS or database at runtime.

### Modified Capabilities

None.

## Impact

`CHECKLIST.MD` and the convention doc stay aligned. `add-writing` may add Markdown files in the repo; that is still static authoring, not a CMS. This change does not block that one. It does block Sanity, Contentful, a database, and any client that fetches portfolio copy.
