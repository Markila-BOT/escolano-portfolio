# Baseline

Production build of the pre-edit snapshot passed on 2026-10-07. Route First Load JS: 256 kB; route size: 56.7 kB.

At 390px and 1280px with JavaScript disabled, parsed DOM has zero main elements, zero main sections and empty body text. Screenshots and baseline.html are alongside this report. The repeatable check `python3 tests/portfolio-html.py openspec/changes/server-first-portfolio/evidence/baseline.html` fails at the missing home section, confirming it rejects the mount-gated page rather than accepting text in serialized RSC scripts.
