# Design

## Context

See proposal.md for why. `components/projects.tsx` maps every `projectsData` entry into `CarouselItem` with `md:basis-1/2 lg:basis-1/3`. Previous and Next are wrapped in `hidden md:block` and positioned with `left-4` and `right-4`, so they sit on the cards and disappear below `md`. `components/ui/carousel.tsx` already disables a control when Embla cannot scroll that way, and it handles ArrowLeft and ArrowRight while focus is inside the region. The card tilt is `rotateX` / `rotateY` on the trigger in `components/project.tsx`. `uniform-components` requires those arrows to stay on `Button` and `react-icons`. The carousel library stays `embla-carousel-react` (`docs/technology-convention.md`). Copy lives in `lib/data.ts`.

## Goals / Non-Goals

**Goals:**

- One, two, and three full cards at the breakpoints in the spec, with a peek of the next card when more projects remain.
- A control row under the track that holds Previous, the position text, and Next.
- The tilt respects reduced motion.

**Non-Goals:**

- A second carousel library, dots, or autoplay.
- Changing the card face, the drawer, or the project list.
- Editing `uniform-components`.

## Decisions

### Slide size owns the peek

Set each slide to about 85% below `md`, 46% from `md`, and 30% from `lg`, and scroll one slide at a time. That leaves one, two, or three full cards plus a sliver of the next. Use Embla's trim so the last snap does not leave an empty gap. Drop the extra `gap-4` on `CarouselContent` and keep the slide padding already on `CarouselItem`, so spacing is not doubled.

Alternative considered: `basis-full`, `md:basis-1/2`, and `lg:basis-1/3` with no peek. That matches the counts, and it hides that more projects exist until the visitor finds a control. The peek is the affordance the spec asks for.

### Controls sit under the track

Remove `hidden md:block`. Render Previous, the position text, and Next in one row under the carousel, and override the primitive's absolute placement so the buttons are in that row. The accessible names stay "Previous slide" and "Next slide". The primitive already disables a button when `canScrollPrev` or `canScrollNext` is false.

The position string lives in `lib/data.ts` as a function of the 1-based index of the first visible snap and the slide count, formatted `1 of 16`. Read the index from the carousel api on `select` and `reInit`. Do not hardcode the total.

Alternative considered: dots, one per project. Sixteen dots are noise, and the position text already answers "where am I".

### Reduced motion only drops the tilt

In `components/project.tsx`, skip the pointer tilt when `prefers-reduced-motion: reduce` matches. Leave the gradient cycle and the drawer as they are. The drawer is how a card's details open, and this change does not restyle it.

Alternative considered: also stop the gradient cycle. The spec names the tilt. The cycle is a separate visual and stays.

## Risks / Trade-offs

- [The peek percentages clip a title] → Tune the three widths until one, two, and three cards read as full and the next card is only a sliver. Check 320 px, `md`, and `lg`.
- [Absolute button classes fight the control row] → Override position, inset, and transform on the instances in `projects.tsx`. Leave the primitive's defaults for any other caller.
- [Arrow keys already fire from the region] → Keep that handler. The spec only requires the keys while focus is on Previous or Next, which sits inside the region.

## Migration Plan

No data migration. To roll back, restore the hidden overlay arrows, the old slide widths, and the tilt, and remove the position string.
