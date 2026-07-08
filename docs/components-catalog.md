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
