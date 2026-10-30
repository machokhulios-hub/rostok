# Shop promotion Implementation Plan
> **For agentic workers:** use superpowers:executing-plans; implement in this session.
**Goal:** Add the approved store-promotion section and three practical courses.
**Architecture:** Extend COURSES in place, add marketing to existing navigation, filters and category styles. Reuse the lesson/exam engine and offline bundle.
**Tech Stack:** Static JavaScript, CSS, Node/JSDOM.
**Spec:** docs/superpowers/specs/2026-10-30-shop-promotion-design.md
## Global Constraints
Preserve existing course/lesson ids and user storage. No account actions or ad spending. Examples use a Russian shoe shop. Official references checked 2026-10-30.
## Review Focus
Navigation must expose all three courses; old progress must survive; exam references must match lessons; new resources must work offline; home entry must fit the existing circular layout.
## Task 1: Course content and integration
- [x] Add failing tests for home/filter navigation, saving a lesson and a generic course route.
- [x] Author marketing-basics/direct/seo with 30 lessons and 6 exams, official references and practical acceptance criteria.
- [x] Add category, filter, icon, home entry and theme colours. Reuse course routes for practical work.
- [x] Run npm test, npm run audit:courses and syntax/diff checks.
## Task 2: Delivery
- [x] Record scope and actual verification in HANDOFF, bump release to 4.38 including offline cache.
- [x] Review diff, commit, integrate latest origin/main and publish under user's «Ставь» instruction.
- [x] Verify GitHub Pages deployment and published files.

Verification ledger: initial 3 integration tests failed before implementation; corrected the navigation test selector to target course buttons inside cards. Lesson save, exam references and marketing route pass. Full engine audit 242/38/2068, runtime errors 0. Browser QA unavailable by Work settings. User «Ставь» supplies publication authorization.
