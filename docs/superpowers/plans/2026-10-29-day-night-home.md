# Day and Night Home Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Publish the approved realistic tree homepage with automatic and manual day/night appearance.
**Architecture:** Reuse rostok-theme for manual preference; resolve automatic appearance from device hours. Crossfade two clean background images underneath real DOM course controls. Update appearance in place without interrupting lessons.
**Tech Stack:** Existing vanilla JS, CSS, SVG, jsdom/Node tests and GitHub Pages.
**Spec:** docs/superpowers/specs/2026-10-29-day-night-home-design.md

## Global Constraints
- Keep courses.js and lesson/exam ids unchanged.
- Preserve saved progress and current learning sessions.
- Automatic day 07:00–19:59; night 20:00–06:59; manual preference survives reload.
- Both backgrounds cached offline; existing five branches and navigation remain reachable.
- Reduced-motion disables transitions.

## Review Focus
- Hour boundaries and returning to a backgrounded tab update theme without resetting lesson inputs.
- Existing manual settings and reset to automatic remain consistent with the home button.
- Blocked theme localStorage degrades to in-memory preference and keeps learning progress intact.
- Narrow phones and wide desktop have readable, non-overlapping targets and visible navigation.
- Clean art contains no painted UI, and day/night coordinates align.

### Task 1: Appearance behavior
**Files:** Modify app.js, app.test.cjs, settings appearance copy.
**Interfaces:** effective scene day/night -> root data-scene and data-theme; existing rostok-theme values light/dark.
- [x] Add UI behavior tests for boundaries, manual persistence/reset, timer/visibility refresh preserving lesson DOM, and unavailable storage.
- [x] Run focused tests, observe missing day/night behavior failures.
- [x] Implement scene resolution, button, settings, minute/visibility/storage refresh without lesson rerenders.
- [x] Run full npm test, expect all green.
- [x] Commit appearance logic and tests after integration with Task 2.

### Task 2: Approved art, layout and publication
**Files:** Create tree-day.webp/tree-night.webp; modify tree-mobile.css, app.js treeHome, index.html, sw.js, HANDOFF.md.
**Interfaces:** root data-scene from Task 1 controls background crossfade and nav colors.
- [x] Prepare clean day/night backgrounds from approved image references and inspect them.
- [x] Position real DOM nodes and header to match the selected tree; keep existing destinations.
- [x] Bump version to 4.18 consistently and cache both backgrounds.
- [x] Run npm test, JS/CSS syntax checks and offline asset existence checks.
- [x] Inspect mobile/desktop layouts and day/night switching using available browser; record any unavailable checks.
- [x] Review final diff, update HANDOFF, commit, merge safely onto current main, push and verify GitHub Pages response files.

