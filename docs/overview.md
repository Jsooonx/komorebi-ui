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
|  |- components-elements/     # Canonical reusable component implementations
|  |- components-preview-elements/ # Compact sizing adapters used only by the Components catalog
|  |- highlights-elements/     # Standalone Bento curation used only on the landing page
|  |- blocks-elements/         # Canonical full-page block implementations
|  |- blocks-preview-elements/ # Compact adapters used only by the Blocks catalog
|  |- terminal-elements/       # Large playground previews
|  `- ui/                      # Shared UI/animation primitives
|- lib/
|  |- components-manifest.ts   # COMPONENTS_MANIFEST and BLOCKS_MANIFEST
|  |- component-previews.ts    # Catalog adapter registries for Components and Blocks
|  |- component-elements.ts    # Canonical Components registry for detail and Highlights
|  `- component-code-loader.ts # On-demand source loader
`- routes/
   |- index.tsx                # Landing page
   |- components.index.tsx     # Components catalog
   |- components.$id.tsx       # Shared detail/playground route
   `- blocks.index.tsx          # Blocks catalog
```

## Registry boundaries

`COMPONENTS_MANIFEST` contains the 19 reusable components shown in `/components`.

`BLOCKS_MANIFEST` contains the 32 layout blocks shown in `/blocks`, including Siena Parallax, Oliver Parallax, Atlas Horizontal Parallax, and Depth Lens Parallax in the Parallax category, four Preloader blocks, four Product Showcase blocks, three Testimonials & Social Proof blocks, three Pricing & Conversion blocks, and three Call to Action blocks. Blocks expose category routes such as `/blocks/parallax`, `/blocks/preloader`, `/blocks/product-showcase`, `/blocks/testimonials`, `/blocks/pricing`, and `/blocks/cta`, and each block has a fullscreen page route such as `/blocks/parallax/siena-parallax`, `/blocks/preloader/morphing-lens-preloader`, `/blocks/product-showcase/version-fold-showcase`, `/blocks/testimonials/community-mosaic-testimonials`, `/blocks/pricing/commitment-window-pricing`, or `/blocks/cta/proof-signal-cta`.

Both catalogs are deliberately split by surface. `src/components/components-preview-elements/` serves compact `/components` sizing adapters, while `src/components/components-elements/` owns the canonical reusable source used by the detail playground. `src/components/highlights-elements/` separately owns the landing-page Bento curation. `src/components/blocks-preview-elements/` serves the compact `/blocks` catalog, while `src/components/blocks-elements/` owns the full-page entries used by fullscreen preview. This prevents catalog viewport sizing from leaking into the canonical component or full block-page experience.

The Components detail route resolves canonical component elements and has no nested fullscreen state; the Blocks nested routes resolve full-page block implementations. Both catalog routes consume only their own manifest.

## Performance notes

- The command palette is lazy-loaded.
- The main landing sections are currently loaded directly for navigation/re-entry testing.
- The WebGL dither preview remains lazy-loaded because it pulls in the heavy Three.js/WebGL stack.
- Vite separates heavy animation and Three.js-related dependencies into dedicated chunks.
- Runtime assets stay in `public/`; references and experiments stay under `references/`.
