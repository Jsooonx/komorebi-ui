# Components Catalog

The Components surface lives at `/components`. It contains reusable interaction, animation, visual, and utility components—not complete page sections.

## Current component entries

The catalog currently contains 16 components:

- Image Reveal
- Hover Members
- Toolkit Stack Swiper
- Devouring Details
- Dynamic Island Nav Card
- WebGL Dither Shader
- Text Roll Animator
- SVG Border Beam
- Mac-Dock Navbar
- Infinite Icon Marquee
- Audio Reactive Equalizer
- Pixel Shimmer Card
- Pipeline Stepper
- Typewriter CLI Terminal
- Accordion
- Nested Accordion

The source of truth is `src/lib/components-manifest.ts` through `COMPONENTS_MANIFEST`. Preview components are mapped in `src/lib/component-previews.ts`, and source code is loaded on demand by `src/lib/component-code-loader.ts`.

## Catalog behavior

- Search and filtering use component metadata only.
- Component previews use the registered preview map.
- Opening an entry loads its source code lazily in the detail sandbox at `/components/$id`.
- The landing-page `Highlights` section is a curated subset of these entries.
- The command palette searches only `COMPONENTS_MANIFEST`.

## Components versus Blocks

Full layout sections are intentionally excluded from this catalog. They belong to `/blocks` and are stored in `BLOCKS_MANIFEST`:

- Mega Menu Navbar 1, 2, and 3
- Logo Cloud 1, 2, and 3
- Features 1, 2, and 3

Features 2 keeps its interactive CLI terminal engine, while its decorative inline code snippets have been removed from the visual block preview.
Features 3 is a minimal six-cell foundation layout with centered two-line desktop typography matching Features 2’s heading scale, thin dividers, and restrained icons.

This keeps reusable pieces separate from ready-made page/layout sections.
