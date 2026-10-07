# Proposal

## Why

A hiring manager can open MerchantSpring and read the problem, the work, and the outcome, but nothing on the page says, in one short note, how that product is put together. The checklist asks for public code or a short build note on at least one project. There is no public repository to link, so the note is the honest form.

## What Changes

- MerchantSpring's open details show one extra part, headed Build, after Problem, Role, and Outcome.
- The note is one sentence restated from MerchantSpring's current description. It adds no claim, metric, client quote, personal job title, or repository URL.
- The description paragraphs stay hidden on MerchantSpring. The case study stays. The note is not those paragraphs pasted again.
- The other fifteen projects do not show a Build heading.
- The carousel card does not show the note. It appears only after MerchantSpring is open.

## Capabilities

### New Capabilities

- `project-build-note`: The open MerchantSpring details include one Build note taken only from that project's existing description. No other project shows it, and it is not a source link.

### Modified Capabilities

- None. Previous and Next still show the project that is now open. The note is that project's copy, so `project-drawer-navigation` does not change. The in-flight case-study behavior stays: featured details keep Problem, Role, and Outcome and do not render the description paragraphs.

## Impact

- `lib/data.ts`: a Build label, and one `buildNote` string on MerchantSpring. The description and the case study stay.
- The open-details description card: when a build note is present, render it after the case study.
- `CHECKLIST.MD`: the public-code-or-build-note item, after the behavior matches.
- No new dependency. No repository URL. Carousel cards, videos, links, screenshots, and neighbor controls stay as they are.
