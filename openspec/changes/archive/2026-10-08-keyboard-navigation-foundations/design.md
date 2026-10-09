# Design

## Context

See proposal.md for motivation. `Header` owns menu state and switches layouts at 960px. `MobileNav` is a hidden/shown Framer Motion overlay with no modal semantics or keyboard handling; its current close toggle sits outside the overlay. `app/page.tsx` has an unidentified, non-focusable main landmark and `app/layout.tsx` renders Header before content. Existing accessible-navigation specs cover control names and expanded state, which remain unchanged. Installed Radix Dialog has no shared wrapper yet. Existing tests use Node's test runner and TypeScript transpilation; browser focus behavior needs real-browser evidence.

## Goals / Non-Goals

**Goals:** Delegate modal behavior to the installed primitive and preserve existing appearance, native anchors, context updates and opt-in navigation sound.

**Non-Goals:** Full WCAG certification, redesign, carousel/drawer/3D keyboard changes, contrast-wide audit, heading/SEO cleanup, dependency upgrades or production deployment. The already-single Intro heading is not a new task.

## Decisions

1. Add a minimal React 18-compatible Radix dialog wrapper in `components/ui/dialog.tsx`, following named exports, data-slot markers, ref forwarding and token styling. Compose a controlled Root/Trigger/Portal/Content/Title/Close from Header/MobileNav. Do not hand-roll a focus trap or add a library. A nonmodal disclosure was considered but conflicts with the current full-screen blocking overlay.
2. Put an explicit close button inside Content at the current top-right position; focus it initially. Keep the external trigger named according to existing open state, with `aria-expanded` and `aria-controls` referencing the actual controlled content ID. Provide a visually hidden dialog title and a named navigation landmark. Avoid misleading `role=menu`: these are ordinary section links, not application-menu commands. Ensure the portal stacks above header, theme and sound chrome and keeps a closed overlay out of tab order.
3. Preserve native section anchors and existing active-section/time/sound updates; close via the controlled state after link activation. Let Radix restore focus to the trigger on compact-layout closure. Restore focus on link selection as well, per repo conventions, without cancelling the anchor hash/scroll. This deliberately does not focus the destination heading; a future change could revise that navigation contract.
4. Handle the desktop transition explicitly: clear open state, let modal scroll/pointer/focus locks clean up, and focus the visible active desktop link (first desktop link as fallback) only if focus was inside the modal. Prevent stale state from reopening the menu when shrinking. Never focus a disconnected trigger. Use effects/event lifecycle only where necessary; don't interfere with focus for ordinary closed-menu resize.
5. Render a plain skip anchor before Header with focus-only visibility and sufficient stacking. Give the existing main landmark a stable ID and `tabIndex={-1}` with a visible focus treatment. Use native fragment focus so no client-only skip handler or dependency is needed. Validate actual no-JavaScript behavior rather than assuming scroll equals focus. Respect reduced motion for new/affected menu animations and preserve both themes.
6. Test static contracts/state logic with the existing Node harness and verify focus/inertness/scroll behavior in a real browser. Inventory focused regressions in header, theme/sound controls, project rail/drawer, journey and contact without redesigning those components. Update the keyboard checklist only when that focused regression pass is complete; leave WCAG, comprehensive screen-reader and contrast rows open. Record skip-link completion and reconcile the stale heading subitem without claiming an unrelated audit.

## Risks / Trade-offs

- Trigger unmount during breakpoint transition → explicit visible desktop focus fallback and closed-state reset, verified above/below 960px.
- Portal styles/z-index change the appearance or leave background clickable → preserve token/full-screen styles, inspect both themes, and test modal background isolation and scroll unlock.
- Framer Motion force-mounted exit elements remain tabbable → prefer primitive-managed mounting, avoid retaining interactive hidden content, and disable decorative motion for reduced preference.
- Native skip navigation scrolls but does not focus → test active focus and the next Tab with JavaScript disabled before acceptance.
- Checklist broadness suggests compliance beyond scope → record exactly which keyboard flows were verified; retain remaining accessibility claims as open.

## Migration Plan

No content/data migration. Implement and verify locally without building over a running dev server's `.next`; use an isolated production build if production HTML is required. Roll back the navigation/skip-link changes together if regression is found. User controls deployment separately.
