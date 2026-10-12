# Proposal

## Why

Fresh production audits still miss the mobile 2.5s LCP target, although the hero's first role already renders visibly and the isolated Mono-preload experiment did not establish a reliable improvement. The change therefore expands from initial-render/font hypotheses to trace-backed critical-path attribution, without changing the portfolio's design or weakening acceptance.

## What Changes

- Preserve the verified visible initial role and its regression coverage; complete browser acceptance for cycling, greeting interaction, reserved layout and accessibility.
- Capture trace/network artifacts to explain observed versus simulated LCP, candidate timing during hydration and role transitions, and font/CSS/script dependencies. Preserve the rejected font experiment as evidence rather than reintroducing it as a fix.
- Run controlled experiments against evidenced critical-path bottlenecks, including nonessential work from below-fold components if it delays hero paint. Retain only attributable improvements that preserve behavior and presentation.
- Compare equivalent local production baseline/candidate audits, then retest the public deployment after the user deploys. Target LCP below 2500ms on every qualifying mobile and desktop run without regressing existing FCP/CLS budgets.
- Record raw evidence, deployment identity limitations and any remaining blockers. Leave the LCP checklist open until the deployed gate passes; local improvement alone is insufficient.

## Capabilities

### New Capabilities

- `hero-initial-paint`: Visible initial hero content and evidence-based acceptance of its production lab paint budget.

### Modified Capabilities

- `role-title-loop`: Clarify that the first title is visible in the initial document and remains readable during hydration, while retaining ordered cycling.

## Impact

Performance diagnostics, tests and reports are the first targets. Trace-confirmed changes may affect hero components, font/CSS delivery, providers, or scheduling/loading boundaries of below-fold components that demonstrably delay hero paint. Existing libraries and server-first architecture remain in use. No new runtime dependency, framework migration, content removal, automatic deployment, visual redesign, removal of title cycling, or contact/API contract change is planned; unrelated cleanup remains out of scope.
