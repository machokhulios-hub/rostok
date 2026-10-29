# Personal route implementation plan

> **For agentic workers:** Use superpowers:executing-plans inline, with one independent final review. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver the accepted personal learning workflow, practical evidence, manageable plans and scheduled revision in Rostok.

**Architecture:** A browser/CommonJS pure module owns route presets, scheduling and validation. Existing app owns rendering, persistence and integrations. Add isolated CSS, retain all course content and legacy state.

**Tech Stack:** Buildless HTML/CSS/JavaScript, Node test runner and existing JSDOM.

**Spec:** docs/superpowers/specs/2026-10-30-personal-route-design.md

## Global Constraints

- Preserve `dnevnik-state`, every existing course/lesson id and legacy progress.
- No new production dependency or backend. Self-assessment must be labelled explicitly.
- Route budgets 15–240 minutes; intervals 1/3/7/14/30 days; mastery threshold 80%.
- New optional state must survive export/import and Gist without exporting tokens.
- Preserve parallel main changes; publish existing GitHub Pages after checks.

## Review Focus

- A route is changed after today's tasks have been completed: history and finished minutes remain.
- A practice link or text is malicious, empty or very long: render safely, reject invalid schemes.
- A file contains malformed new state or legacy state: reject malformed input, retain compatibility.
- Two devices merge different goal or day-plan records: preserve usable records without corrupting arrays.
- Date rolls past the original plan or repeated attempts occur on the same day: no frozen date or accelerated review schedule.

### Task 1: Route, planner and review domain

**Files:** create `journey.js`, `journey.test.cjs`.

**Interfaces:** `window.RostokJourney` / CommonJS module with presets, createRoute(input,date,id), nextStep(state,courses,route), buildDay(state,courses,date,mode), recordReview(state,key,correct,date), dueReviews(state,courses,date), mastery(state,lessonId), validate(state), saveWork(state,routeId,stage,text,url,date), acceptWork(state,routeId,stage,checks,date). State fields per spec.

- [x] Write tests for budgets, prerequisite exams, snapshot stability, review date intervals/same-day answers, invalid state and links, work version/reset/criteria.
- [x] Run `node --test journey.test.cjs`; Expected: feature assertions fail against missing module.
- [x] Implement the pure module, preserving existing state fields and validating optional new data.
- [x] Run `node --test journey.test.cjs`; Expected: all tests pass.
- [x] Commit domain implementation and tests.

### Task 2: Complete user workflow in the app

**Files:** modify `app.js`, `app.test.cjs`, `index.html`, `vitrina/index.html`; create `journey.css`.

**Interfaces:** consumes Task 1 module; existing `save`, `render`, `startLesson`, `nextInCourse`, `tasksFor`, `validState`, `finishLesson`, `viewCards`, `exportFile`. Existing state remains authoritative.

- [x] Write behavioral integration tests: create/restore route and today's budget; complete a work and revise it; due review persists; main resumes work; actual minutes and transfer; original-date rollover; invalid import; Vitrina links open selected lesson. Update intentional old home-only expectation to include focus card.
- [x] Run `node --test app.test.cjs`; Expected: new feature assertions fail.
- [x] Add goal setup/stages, focus home card, budgeted daily snapshot and carry action, honest mastery and review status, word schedules and work self-check/copy actions.
- [x] Add optional-state validation, date window expansion, new script/CSS assets, safe deep links and file share with download fallback. All 59 Vitrina entries route into the real course.
- [x] Run `npm test`; Expected: entire suite passes, old progress unchanged.
- [x] Commit UI and behavior.

### Task 3: Review, release and publish

**Files:** version references in `app.js`, `index.html`, `sw.js`; `HANDOFF.md`, plan checkboxes.

**Interfaces:** consumes completed domain and app, existing Pages deployment.

- [x] Validate JS syntax, CSS and offline resource presence; run full suite. Expected: no failures or missing assets.
- [x] Independent final review against spec/plan and full diff. Fix important issues with reproducing tests.
- [x] Reconcile current origin/main content before release; bump next free version and precache both new assets. Expected: course objects match current origin/main.
- [x] Commit verified release, merge/push authorized existing site and verify live assets byte-for-byte. Expected: Pages built and HTTP 200 exact content.
- [x] Record browser QA limit and final evidence, finish branch/worktree.
