# Proposal

## Why

A hiring manager can open a project and read what the product does, but the featured work does not say what the problem was, what the work was, and what came of it. Those three parts are how the cited portfolios explain a selected piece.

## What Changes

- Ten featured projects show a case study in the open details: Problem, Role, and Outcome, in that order.
- Each sentence is a restatement of that project's current `description`. No new claim, metric, client quote, or personal job title is added. The descriptions do not name a personal title, so Role is the work the description already attributes to the product.
- The other six projects keep the description paragraphs they have now.
- The carousel card does not grow a case study. The three parts appear only after the project is open.
- Featured projects show the case study in place of the repeated description paragraphs, so the same sentences are not shown twice.

## Capabilities

### New Capabilities

- `project-case-studies`: An open featured project shows Problem, Role, and Outcome taken only from its existing description. Other projects keep their description.

### Modified Capabilities

- None. Neighbor navigation still shows the open project's own copy. The case study is that copy, structured, so `project-drawer-navigation` does not change.

## Impact

- `lib/data.ts`: case-study labels, and problem, role, and outcome on the ten featured projects.
- `components/projects.tsx`: the open details render the case study when those three fields are present, and the description paragraphs otherwise.
- `CHECKLIST.MD`: the featured-work case-study item, after the behavior matches.
- No new dependency. Carousel cards, videos, links, screenshots, and neighbor controls stay as they are.
