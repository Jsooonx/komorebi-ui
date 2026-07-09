# Components Catalog

The `Components` surface lives at `/components` and is powered by `src/routes/components.index.tsx` plus a split registry:

- `src/lib/components-manifest.ts` for metadata
- `src/lib/component-previews.ts` for preview components
- `src/lib/component-code-loader.ts` for on-demand source loading

## Responsibilities

- list every component that should appear in the catalog
- provide search and category filtering
- drive the detail sandbox at `/components/$id`
- allow catalog-only components that are not featured on the landing-page Bento-Showcase

## Registry Notes

Every catalog entry should register:

- `id`
- `name`
- `category`
- `description`
- preview component mapping
- on-demand source loader entry

Optional metadata includes CLI command, dependency tags, `isNew`, and layout hints for the catalog card grid.

## Performance Notes

- Search and filtering now depend only on the manifest metadata.
- Component source code is loaded only when a user opens a specific detail sandbox.
- This split keeps the catalog and command palette lighter than a single all-in-one registry.

## Current Special Cases

- `pixel-shimmer` is intentionally included in the catalog even though it is not rendered in the landing-page Bento-Showcase.

---

## 🏗️ Blocks Catalog Sections

The Blocks view (at `/blocks`) renders full layouts instead of individual buttons/cards. The newly unlocked categories include:

### 1. Features
- **Features 1 (`features-1`):** Clean minimalist 3-column features grid block with centered pattern design backdrops, standard white outline icons, and rebranded modern copy.
- **Features 2 (`features-2`):** Premium asymmetric Bento Grid features showcase with dynamic interactive mockups, including spring physics curve controllers, preset speed switchers, and typing CLI terminal simulators.
- **Features 3 (`features-3`):** Spotlight feature list with a left pillar column and a right live-preview panel. Auto-rotates through pillars, pauses on hover, and uses a shared-layout sliding active indicator with crossfading CSS/SVG preview mockups (magnetic pulse, scroll-linked bars, shared-layout swap, clip-path reveal).

