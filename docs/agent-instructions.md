# Agent Instructions & Workflow Rules

This document outlines the strict guidelines and constraints for AI agents (Gemini, Antigravity, Codex, etc.) working on this repository. These rules must be followed without exception to maintain code integrity and respect user styling decisions.

---

## 🎯 Scope Limitations & Modification Boundaries

### 1. Strict Target Scope
- **Do not modify elements, files, or components that were not explicitly requested.**
- Example: If the user requests a modification to Mega Menu Navbar 1, **never** apply adjustments to Mega Menu Navbar 2 or 3. Keep edits localized only to the target item.

### 2. Domino-Effect Changes (Reasoning-based)
- Agents are permitted to perform dependent edits on files outside the primary request *only if they are logically required* to compile or register the new feature successfully.
- Valid domino edits include:
  - Registering new components in `components-manifest.ts`, `component-previews.ts`, and `component-code-loader.ts`.
  - Adding keyframes or global styles to `src/styles.css` if required by a newly added component.
  - Adding categories or routes for components/blocks mapping.

---

## 🎨 Design Replications vs. Improvisation

- **Do Not Improvise:** Replicate existing visual layouts, components, borders, spacing structures, and color choices. Do not invent new styling directions or color schemes unless explicitly prompted by the user.
- **Consultation first:** If you believe a design decision could be improved, present your suggestions or ask for advice first, rather than applying the style change directly.
- **Repeat patterns:** Re-use standard tailwind grids, backdrop blurs, and glassmorphic designs established in the codebase instead of writing bespoke, inconsistent styling formulas.

---

## 🔐 Repository Cleanliness

- **Git Exclusions:** The Obsidian vault and local synchronization python scripts are private tools and must stay out of git commits.
- Never push files inside:
  - `obsidian_memory_vault/`
  - `scripts/sync_memory.py`
  - `scripts/sync_codex_memory.py`
