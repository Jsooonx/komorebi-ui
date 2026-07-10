# Komorebi UI - Project Overview & Architecture

Komorebi UI is a premium, high-fidelity website animation library with three distinct user-facing surfaces:

- `/`: landing page with Hero, interactive playground, Highlights, templates, and footer
- `/components`: reusable component catalog
- `/blocks`: full layout/block catalog

The terminology is intentional:

- **Components** are reusable interaction and animation pieces.
- **Blocks** are complete layout sections such as headers, logo clouds, and feature grids.
- **Highlights** are a curated selection of components shown on the landing page.

## Technology stack

- React 19 + TypeScript
- Vite
- TanStack Start / TanStack Router
- Framer Motion and GSAP
- Tailwind CSS
- Lucide React
- React Three Fiber, Three.js, OGL, and postprocessing for WebGL previews

## Runtime layout

```text
docs/                         # Architecture, design, and workflow notes
public/                       # Runtime assets
references/                   # Non-runtime templates, media, and design references
scripts/                      # Private memory synchronization helpers
src/
|- components/
|  |- bentoshowcase-elements/  # Reusable previews used by Highlights, Components, or Blocks
|  |- terminal-elements/       # Large playground previews
|  `- ui/                      # Shared UI/animation primitives
|- lib/
|  |- components-manifest.ts   # COMPONENTS_MANIFEST and BLOCKS_MANIFEST
|  |- component-previews.ts    # Preview registry for both catalogs
|  `- component-code-loader.ts # On-demand source loader
`- routes/
   |- index.tsx                # Landing page
   |- components.index.tsx     # Components catalog
   |- components.$id.tsx       # Shared detail/playground route
   `- blocks.index.tsx          # Blocks catalog
```

## Registry boundaries

`COMPONENTS_MANIFEST` contains the 16 reusable components shown in `/components`.

`BLOCKS_MANIFEST` contains the 9 layout blocks shown in `/blocks`.

Both registries share preview and source-code infrastructure, while the catalog routes consume only their own manifest. The shared detail route can resolve entries from either registry.

## Performance notes

- The command palette is lazy-loaded.
- Below-the-fold landing sections are deferred.
- The WebGL dither preview is lazy-loaded.
- Vite separates heavy animation and Three.js-related dependencies into dedicated chunks.
- Runtime assets stay in `public/`; references and experiments stay under `references/`.
