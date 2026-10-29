# Sections Redesign Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Apply approved inner-screen mockups while preserving the homepage and learning data.
**Architecture:** Scoped sections.css loaded after tree-mobile.css; render-time sections-ui class isolates the design from the home. Existing actions/data and DOM contracts are retained, with small semantic wrappers for course and lesson layouts.
**Tech Stack:** Vanilla JS/CSS, existing Onest, jsdom tests, browser verification, GitHub Pages.
**Spec:** docs/superpowers/specs/2026-10-29-sections-redesign-design.md

## Global Constraints
- No edits to courses.js, treeHome(), tree-mobile.css, home images or progress formats.
- All real navigation/actions remain usable, including full-screen lessons/exams and fixed mobile menu.
- Auto appearance: warm light inner screens; explicit dark theme: forest night palette.

## Review Focus
- Returning home removes all scoped appearance and keeps home markup unchanged.
- Mobile filters, long titles, code blocks and navigation do not overflow or hide buttons.
- New lesson note column displays only notes for the current lesson and escapes user text.
- Real lesson answers, exams, task checks and backup/restore survive styling.
- All style resources load offline and deployed versions match.

### Task 1: Shell and layout contracts
Files: app.js, app.test.cjs, sections.css, index.html.
- [x] Test new catalog filter reachability on phone and lesson-note isolation/escaping through real DOM; observe missing behavior.
- [x] Add scoped inner body class, manual-dark handling, shared sidebar/headers, catalog controls and genuine lesson note rail.
- [x] Implement approved card, course, learning, planning, profile and settings styling without changing application state.
- [x] Run npm test and audit desktop/mobile CSS against approved references. Browser verification remains unavailable: CUA returns disabled after user enabled it; alternate verification was not authorized.

### Task 2: Integration and publication
Files: sw.js, index.html, app.js version, HANDOFF.md.
- [x] Review all routes, syntax, layout at narrow/mobile/desktop widths, keyboard/lesson navigation and unchanged homepage.
- [x] Independent review, fix material findings, run full tests.
- [ ] Record exact verification, preserve parallel main updates, publish next available version and verify HTTPS file contents.

