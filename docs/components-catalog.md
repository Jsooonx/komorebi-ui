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
- Features 1, 2, 3, 4, and 5
- Siena Parallax

Features 2 keeps its interactive CLI terminal engine, while its decorative inline code snippets have been removed from the visual block preview.
Features 3 is a minimal six-cell Komorebi feature layout with original product-focused copy, centered typography, tight heading-to-description spacing matching Features 2’s scale, thin dividers, and restrained icons.
Features 4 is a dashboard-led SaaS layout with original Komorebi copy, a generated workspace visual, and four workflow pillars with restrained hover feedback. Its feature icons brighten to white on hover.
Features 5 is a premium SaaS workflow layout with generated operations and scheduling visuals, plus a compact orchestration panel. Its internal feature containers use sharp corners with subtle corner brackets to preserve the structured dashboard framing, while small controls retain subtle rounding and bright white icon hover states.
Siena Parallax is a Parallax-category block with a scroll-driven editorial image transition: the visual starts flush at the top edge and fills the upper half of the scene, becomes a floating card, and gives way to a closing statement below it without overlapping the copy. It uses a generated monochrome editorial asset and spring-smoothed Framer Motion transforms.

This keeps reusable pieces separate from ready-made page/layout sections.

## Blocks rendering boundaries

- `src/components/blocks-preview-elements/` contains catalog-only block visuals used inside `/blocks` cards.
- `src/components/blocks-elements/` contains the full-page entry components. Fullscreen resolves these entries, never the catalog registry directly.
- Header catalog previews stay compact. Their extended scroll canvas exists only in the corresponding fullscreen page, where it can exercise the navbar’s scroll-responsive states.
- Every fullscreen block is rendered as a complete viewport page rather than a centered catalog card. The close control is supplied by the fullscreen host and is intentionally not part of the block implementation.
