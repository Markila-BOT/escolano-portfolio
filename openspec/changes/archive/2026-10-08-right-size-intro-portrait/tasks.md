# Tasks

## 1. Portrait delivery baseline

- [x] 1.1 Build the unchanged current app in production mode and capture three sequential cold mobile/desktop runs with the existing pinned audit script; document source/build identity, profile settings, portrait requested width/encoded bytes, image-delivery finding and FCP/LCP/CLS values in portrait-specific evidence without overwriting earlier reports. Verify valid raw reports and record actual rendered size, DPR and currentSrc to reconcile the supplied 240px finding with current CSS.

## 2. Responsive portrait sizing

- [x] 2.1 Align portrait intrinsic dimensions and explicit sizes hint with its 160px box, retaining source, quality 95, priority and styles; add focused installed-Next image-props and production-HTML assertions for width descriptors, correct size hint, accessible name and priority preload. Verify adequate sub-640px candidates for DPR 1/2 and that no other images or global image settings change.
- [x] 2.2 Verify the portrait in a fresh production browser at 320px/desktop widths and both themes, including crop, reserved square dimensions, source selection and early discovery without JavaScript; test DPR 1/2 using supported browser facilities or document unavailable runtime emulation alongside focused candidate-selection tests. Record visual and request evidence, confirming no new portrait-induced layout shift.

## 3. Integration and measured comparison

- [x] 3.1 Run lint, TypeScript, focused tests, production build and the HTML regression check; capture candidate audits under baseline-identical profiles and verify all reports. Update portrait evidence with all three run values, median/range, actual byte savings and remaining audit findings; retain unmet timing budgets and clearly distinguish local results from deployed results. Verify no dependency/config changes, real form submissions or deployment occurred.
