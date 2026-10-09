# Design

## Context

See proposal.md and the unchanged spec deltas for behavior and acceptance. Implementation evidence in docs/mobile-lcp-optimization.md confirms that actual SSR emits the settled first role at opacity 1 and that fonts already use display:swap. Initial-visibility regression tests pass. The isolated Mono-preload experiment removed its initial request but did not establish a reliable mobile LCP improvement and was not retained.

The serial repeat gave mobile medians of 4667.430ms baseline and 4288.403ms experimental, with overlapping ranges and every experimental mobile run above 2500ms. Older deployed evidence identified the role text as LCP. A captured exited span is not proof of an initially hidden title; observed breakdown timings do not equal simulated LCP. None of this establishes the remaining root cause.

The pinned audit script produces three reports per profile, and the summary now retains optional LCP nodes, observed subparts and font requests. Three tasks are complete. Browser acceptance, a qualifying local candidate and deployed acceptance remain pending. This revision changes planning only; implementation resumes through apply.

## Goals / Non-Goals

**Goals:** Attribute remaining LCP delay across the loading critical path, retain only controlled evidence-backed improvements, preserve the hero presentation and title loop, and keep local diagnosis separate from deployed acceptance.

**Non-Goals:** Visual redesign, role/content/type-size or display-cadence changes, removing cycling, replacing runtime libraries, framework migration, unrelated cleanup, automatic deployment, field-performance guarantees or substituting TBT for TTI. Do not hide/shrink real content or alter audit settings to manufacture a pass.

## Decisions

### 1. Preserve completed evidence and initial visibility

Keep the three completed tasks, initial-render tests and historical raw reports. The priority 160px portrait, server-rendered theme children and settled first role already work. Do not reintroduce the rejected Mono-preload variant or an initial-opacity edit without new attribution. Finish full browser verification alongside any retained candidate.

Use the previously supplied public target, https://escolano-portfolio.vercel.app/. Source/build parity remains unknown until verified; the audit checkout is not remote deployment identity. Rebuild isolated snapshots for new source states, leaving the user's development .next untouched and copying no environment secrets.

### 2. Trace the remaining critical path

Capture production trace and network artifacts through the pinned Lighthouse tool's supported artifact-saving facilities. Preserve Node 24, Lighthouse 13.5.0, the existing simulated mobile/desktop acceptance profiles and storage-reset behavior.

Explain the LCP candidate timeline and final candidate selection, font/CSS availability, hydration/main-thread tasks, dependency chains and the first automatic role transition. Correlate observed LCP timestamps with simulation dependency estimates where available. Explicitly mark missing attribution instead of guessing. Preserve capture configuration, browser version, build identity and raw artifacts.

Separate diagnostic controls such as delayed/blocked scripts or timer-isolated role behavior may distinguish dependencies. They are not acceptance candidates. Keep normal cycling, transition appearance and cadence in production; never shorten the acceptance audit window or substitute observed timings for simulated gate values.

Extend existing diagnostics only where attribution is missing. Fixture tests must cover absent nodes, malformed evidence and observed/simulated separation. Run captures serially without concurrent builds/audits. Repeat matched pairs when ranges overlap; earlier noisy sets remain historical evidence, not substitutes for the new trace-backed comparison.

### 3. Optimize only the attributed dependency

Authorized scope now includes font/CSS delivery, provider/hydration work and scheduling/loading of below-fold components when traces demonstrate that they delay hero paint. A below-fold feature's size alone is insufficient justification.

Select one intervention at a time in an isolated production snapshot with a falsifiable prediction about a request, task or paint timestamp. Keep existing dependencies, font appearance, server-rendered content, Contact paths and normal title cycling. Retain the existing four-second display interval, ordered transitions, reserved geometry, reduced-motion static title and hidden-document/greeting pause/resume semantics.

Land focused regression tests and documentation with each retained intervention. Reject variants whose improvement cannot be attributed or reproduced. Runtime-library replacement, framework migration, redesign, cadence/content changes or third-party/API contract changes still require separate approval. If tracing identifies no compatible fix, report the unresolved dependency rather than weakening the goal.

### 4. Verify behavior and local improvement

Complete browser checks at 320px and desktop in both themes, including initial/script-disabled readability, delayed hydration, full title cycle, reduced motion, hidden-document/greeting pause/resume, Contact access and stable layout. Node tests complement rather than silently replace required browser evidence; report unavailable checks.

Run all Node tests, lint, formatting, production/type build and HTML assertions. Compare three fresh cold runs per mobile/desktop profile between matched baseline and candidate, retaining all values, medians/ranges, LCP attribution and relevant transfer/CPU evidence. Require reproducible mobile median improvement beyond baseline variation, no FCP/CLS budget regression and preserved desktop behavior before recommending deployment. Do not retain speculative edits when evidence is inconclusive.

### 5. Keep deployed acceptance separate

After the user deploys and confirms candidate identity, repeat the same six public audits. Complete LCP only when every valid run has LCP <2500ms, FCP <1500ms and CLS <0.1. Local-only results, failed/missing reports and unknown deployment identity cannot qualify. Leave final acceptance pending and do not archive as complete prematurely.

## Risks / Trade-offs

- Noise can mimic improvement → identical profiles/tool/browser, serial captures, full ranges and repeated matched pairs.
- Observed trace data may not fully explain simulated LCP → retain both timing domains and explicitly label unavailable attribution.
- Role transitions can change the node after paint → inspect candidate timestamps rather than only final DOM state; preserve cycling in acceptance builds.
- Loading changes can break below-fold behavior or text wrapping → focused tests plus full browser interaction and layout regression checks.
- Audit tooling or deployment may require user action → document the specific prerequisite without substituting passing localhost claims.

## Migration Plan

Resume apply with trace capture and attribution before any new optimization. Build isolated snapshots, preserve rejected variants as evidence, and keep only proven changes. Present validated results for user-controlled deployment; do not commit, push or deploy. Once candidate identity is confirmed, retest public production and update only evidenced checklist status/totals. Roll back only this change's retained critical-path edits on regression, preserving unrelated work.

## References

The LCP optimization guidance already referenced in the original plan supports identifying the actual element and dependency before choosing an intervention: https://web.dev/articles/optimize-lcp/. It is methodological guidance, not proof of this portfolio's root cause.
