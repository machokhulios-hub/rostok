# Alive design Implementation Plan
> **For agentic workers:** use superpowers:executing-plans in this session, followed by an independent whole-branch review.
**Goal:** Implement the user-approved mockup 38 across Rostok while preserving all progress and course content.
**Architecture:** Add scoped alive.css and a standalone alive.js motion controller. Extend existing render functions with real-data home, progress rings, weekly summary and rewards. Theme selection keeps rostok-theme light/dark values; default and legacy dark become Alive, light keeps Paper colours. No changes to dnevnik-state schema.
**Tech Stack:** Vanilla JS/CSS, local Rubik woff2, Node/JSDOM.
**Spec:** docs/superpowers/specs/2026-10-30-alive-design.md (explicitly approved by user's implementation request).
## Global constraints
Do not modify courses.js, plan.js, IDs, progress or state format. Preserve 4.35–4.38 routes, works, review, exports and sync. Never display mockup numbers as data. No recurring animations; respect prefers-reduced-motion.
## Review focus
Background rendering must not replay motion; repeat completions and historic exam results must not celebrate; XP deltas must match awarded XP including linked tasks; reduced motion and manual light preference must work without resetting answers; all local fonts and new assets must be cached offline.
## Task 1 — Theme and motion controller
- [x] Add failing tests for stable Alive default, manual Paper, first-only celebration, reduced motion, background render, accessible nav and real-data home.
- [x] Implement alive.js: cancellable rAF counters, transform fills, entry rings/bars, single-use action feedback and confetti.
- [x] Integrate motion intent and memory-only reward data with render/lesson/exam/task handlers.
## Task 2 — Actual screens
- [x] Replace circle-only home with current day minutes/tasks, next step, review queue and compact directions; keep promotion entry.
- [x] Add course rings, true reward screen and current-week summary; preserve existing secondary actions and stats.
- [x] Add local Rubik fonts/licence and scoped dark glass styles, mobile pill nav and desktop sidebar; Paper remains selectable.
## Task 3 — Verification and release
- [x] Run npm test and npm run audit:courses, JS syntax, CSS parse, unique IDs and offline-asset checks. Check unchanged courses.js/plan.js.
- [x] Attempt visual QA through permitted browser tools; record unavailable access honestly if Work disables it.
- [x] Independent review, fix important findings, update HANDOFF, release 4.39, publish under user's implementation authorization and verify deployed bytes.

## Execution ledger
- Existing spec and user's explicit implementation instruction supply design/publication authorization. Worked on codex/alive-design-4-39; baseline127/127.
- New motion/controller and real-data integration assertions observed failing before implementation; targeted checks then green. Updated superseded automatic-time/circle-only requirements to the approved design.
- Fixed three review findings: current-answer shake (RED→GREEN), mobile search/notifications and non-recurring profile illustration. Repeated lessons/exams, same-score XP, linked-task XP, storage updates, reduced motion, manual Paper and calendar navigation are covered.
- Ruling: new Today always shows today; calendar dates open their dated Plan — otherwise selecting a historic date would show today's tasks. No saved-state schema change.
- Active elapsed lesson time is memory-only and labelled as this session; do not invent previous sessions after reload. Kept independent resume alongside the route action and kept promotion entry from4.38.
- Verification:140 tests pass; full curriculum audit242/38/2068 with runtimeErrors0. CSS parsed and38 cached resources/8 font binaries checked. CUA visual QA is disabled by Work settings.
