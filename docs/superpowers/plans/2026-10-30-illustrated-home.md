# Illustrated Rostok Home Implementation Plan

> **For agentic workers:** Execute inline with superpowers:executing-plans; user approved the visual and said «Ставь». No additional design approval is needed.

**Goal:** Publish the approved illustrated home as Rostok4.42.
**Architecture:** One transparent3×2 WebP atlas supplies decorative CSS backgrounds. Existing HTML/SVG renders real data and actions. Only the home presentation changes.
**Tech Stack:** Existing static HTML/CSS/JavaScript, ImageGen, cwebp, Node/JSDOM, GitHub Pages.
**Spec:** `docs/superpowers/specs/2026-10-30-illustrated-home-design.md`

## Global Constraints
- Preserve `courses.js`, `plan.js`, permanent ids and `dnevnik-state` schema.
- Retain the selected2×2 layout, marketing resume, real day progress, repeat queue and quick actions.
- Decorative artwork must not overlap text or receive focus; usable from320px and in the existing light theme.
- Ship atlas in the service worker cache and align all version references at4.42.

## Review Focus
- Long course titles and320px viewport: text stays in its own column without cropping.
- Completed marketing courses: catalogue action remains available.
- Light theme: readable foregrounds and visible keyboard focus.
- First load/offline: versioned asset exists and is cached.
- Pending sessions, imports and multi-tab state: existing behavior is unchanged.

### Task1: Approved artwork and home presentation
**Files:** `img/home-illustrations-v1.webp`, `app.js`, `alive.css`, `index.html`, `sw.js`, `HANDOFF.md`.
**Interfaces:** Existing `aliveHome()`, `tile(...)`, `homePromotionTarget()` and data attributes remain the navigation/data contract. Art uses `.home-art` and per-cell classes.
- [x] Read spec, inspect home and confirm146 baseline tests pass.
- [x] Optimize transparent atlas to WebP and preserve approved mockup in documentation.
- [x] Add decorative spans and scoped responsive CSS matching the approved graphic composition.
- [x] Align4.42 references and add the atlas to offline cache.
- [x] Run existing tests, syntax/CSS/resource checks; review diff for state/content changes.
- [ ] Commit, fast-forward main and publish; verify Pages deployment and HTTPS file equality.

No new tests for this reversible appearance change: existing transition/data tests cover behavior; asset and CSS checks cover the new delivery surface.
