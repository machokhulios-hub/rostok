# Mobile Tree Implementation Plan

> Execute inline using executing-plans and test-driven-development.

**Goal:** Apply the approved mobile tree design to GitHub Rostok.
**Architecture:** Scoped mobile HTML/CSS added to the existing home view. Existing handlers and persisted data power every control; desktop rendering remains available.
**Tech Stack:** Static HTML, CSS, vanilla JavaScript, jsdom Node tests.
**Spec:** docs/superpowers/specs/2026-10-29-tree-mobile-design.md

## Global Constraints

Preserve all existing course IDs and dnevnik-state. Use real XP and streak, no example metrics. Responsive touch targets and reduced motion. Existing GitHub Pages main deployment.

## Review Focus

Empty state, existing progress, narrow phones, language/programming filters, navigation to plan/favourites/awards must work. No static text or buttons baked into the background. Desktop home must remain functional.

### Task 1: Working mobile tree composition

- [x] Write tests for real XP, all five map actions and favourites shortcut; run and see missing mobile tree fail.
- [x] Prepare clean background from approved reference, implement tree home and scoped mobile CSS, use existing click handlers.
- [x] Run complete test suite, verify syntax, assets and version/cache consistency. Check browser availability and disclose any unavailable visual QA.
- [ ] Review diff, commit and push main, verify Pages deployment and live asset contents.
