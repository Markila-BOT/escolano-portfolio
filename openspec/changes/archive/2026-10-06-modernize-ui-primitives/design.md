# Design

## Context

See proposal.md for motivation. Card already uses named functions, derived props, and `data-slot`. The other modules use React 18 `forwardRef`; Drawer also aliases several Vaul primitives directly. Button has local `pill` and `chrome` variants. Carousel uses Embla and local ArrowLeft/ArrowRight/Home/End handling. Projects passes refs to drawer navigation buttons and composes DrawerClose with Button through `asChild`.

The technology and React conventions prohibit major upgrades and React 19 APIs. The Radix conventions explicitly prescribe `forwardRef`. Interpret “same shape” as the compatible component and slot conventions, with a documented ref exception.

## Goals / Non-Goals

**Goals:** Stable slot markers, recognizable function names, derived props, and intact ref composition on the installed stack.

**Non-Goals:** Removing working React 18 ref forwarding, introducing card's size prop to unrelated components, changing styles, replacing installed packages, or fixing unrelated carousel lifecycle issues.

## Decisions

### Keep React 18 ref forwarding

Use named render functions inside `React.forwardRef` for ref-bearing exports, retaining display names and public prop/export compatibility. Plain function components are appropriate for wrappers without ref responsibilities. Replacing every wrapper with a React 19 ref-as-prop function would silently lose refs on React 18; upgrading React is outside scope. Keep ButtonProps available and preserve Slot composition.

### Add slots at existing rendered boundaries

Use `button`; `label`; `drawer-trigger`, `drawer-close`, `drawer-overlay`, `drawer-content`, `drawer-header`, `drawer-footer`, `drawer-title`, `drawer-description`; and `carousel`, `carousel-content`, `carousel-item`, `carousel-previous`, `carousel-next`. Carousel content's marker belongs on the inner flex track, leaving the Embla viewport ref intact. Previous/Next pass their specific marker through Button's existing props spread.

Drawer Root and Portal do not render host elements: retain their public wrappers without introducing DOM solely for `data-slot`. Wrap Trigger and Close with typed ref-forwarding components so their markers reach existing elements, including `asChild` children. Do not force unsupported slot props onto non-DOM Vaul APIs. Keep default markers overridable by caller props, consistent with Card and composed arrow buttons.

### Preserve installed component behavior and styling

Edit the existing modules in place with their current Radix, Vaul, Embla, cva, cn, semantic tokens, and react-icons dependencies. Preserve all variants, defaults, orientation support, event handlers, accessible names, disabled states, and caller class overrides. Copying upstream templates wholesale risks Tailwind 4 syntax, changed Vaul defaults, and lost local keyboard behavior. Local conventions and the observed Card are sufficient references for this bounded refactor.

### Record the compatibility boundary

Update the primitive-shape paragraph in Radix conventions to describe slot markers and named functions while retaining React 18 forwarding. Rewrite the checklist context to acknowledge that exception, and check only the selected row after checks pass. No spec delta is needed because portfolio behavior remains unchanged.

## Risks / Trade-offs

- Ref forwarding lost through a wrapper → Check typed refs and runtime drawer navigation focus, Slot composition, and focus return.
- Button's default marker masks carousel markers → Preserve props spread ordering and inspect rendered arrow slots.
- Extra wrappers alter drawer or carousel layout → Add no host elements; retain Portal and Embla nesting.
- “Current shape” mistaken for React 19 parity → Document the deliberate React 18 exception in the conventions and checklist.

## Migration Plan

Update the four modules and related documentation in one change. Run formatting, lint, and strict type checks, then targeted browser verification on an already-running app if available. Do not start the dev server unless requested. Record any unavailable browser verification as pending and keep the checklist item open until completed. Roll back the primitive and documentation edits together if integration fails; there is no data migration.

## Authorized verification follow-up

On 2026-10-06, the user authorized fixing lint compatibility and starting the app to finish verification. Pin ESLint to 8.57.1, the compatible final ESLint 8 release, retain Next 14 and the existing rules, and document the compatibility requirement. Package and lockfile edits are limited to that correction. A dev server may now be started for browser checks.

The user also authorized a discovered focus-return fix. Projects opens the drawer without a Vaul Trigger, so it must retain the opening card element and restore that element through onCloseAutoFocus. Use onOpenAutoFocus to focus the composed close button, give it an accessible name, and leave Vaul responsible for trapping focus. Project's onOpen prop carries the originating click event; no extra DOM or global focus query is needed.
