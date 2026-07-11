# Components Catalog

The Components surface lives at `/components`. It contains reusable interaction, animation, visual, and utility components—not complete page sections.

## Current component entries

The catalog currently contains 19 components:

- Image Reveal
- Hover Members
- Toolkit Stack Swiper
- Devouring Details
- Hover Expand Accordion
- Hover Expand Horizontal
- Hover Expand Vertical
- Dynamic Island Nav Card
- Expandable Tab Dock
- Vercel Tooltip
- WebGL Dither Shader
- Text Roll Animator
- SVG Border Beam
- Mac-Dock Navbar
- Infinite Icon Marquee
- Audio Reactive Equalizer
- Pixel Shimmer Card
- Pipeline Stepper
- Typewriter CLI Terminal

The source of truth is `src/lib/components-manifest.ts` through `COMPONENTS_MANIFEST`. Catalog adapters are mapped in `src/lib/component-previews.ts`, canonical elements are mapped in `src/lib/component-elements.ts`, and source code is loaded on demand by `src/lib/component-code-loader.ts`.

## Catalog behavior

- Search and filtering use component metadata only.
- Component cards use compact catalog adapters from `src/components/components-preview-elements/`. They render the canonical element unchanged, flatten its presentation wrapper, hide its internal card chrome, and expand the interaction area to the catalog viewport.
- Opening an entry loads its canonical element and source code lazily in the detail playground at `/components/$id`. The playground flattens the element's presentation shell so its main interaction is the focus.
- The detail playground is the only component-level enlarged view. It intentionally has no second fullscreen mode or fullscreen controls.
- The landing-page `Highlights` section is a curated subset of these entries.
- The command palette searches only `COMPONENTS_MANIFEST`.

## Components versus Blocks

Full layout sections are intentionally excluded from this catalog. They belong to `/blocks` and are stored in `BLOCKS_MANIFEST`:

- Mega Menu Navbar 1, 2, and 3
- Logo Cloud 1, 2, and 3
- Features 1, 2, 3, 4, and 5
- Siena Parallax
- Words Preloader
- Stairs Preloader
- Double Stair Preloader

Features 2 keeps its interactive CLI terminal engine, while its decorative inline code snippets have been removed from the visual block preview.
Features 3 is a minimal six-cell Komorebi feature layout with original product-focused copy, centered typography, tight heading-to-description spacing matching Features 2’s scale, thin dividers, and restrained icons.
Features 4 is a dashboard-led SaaS layout with original Komorebi copy, a generated workspace visual, and four workflow pillars with restrained hover feedback. Its feature icons brighten to white on hover.
Features 5 is a premium SaaS workflow layout with generated operations and scheduling visuals, plus a compact orchestration panel. Its internal feature containers use sharp corners with subtle corner brackets to preserve the structured dashboard framing, while small controls retain subtle rounding and bright white icon hover states.
Siena Parallax is a Parallax-category block with a scroll-driven editorial image transition: the visual starts flush at the top edge, becomes a floating card, and gives way to a closing statement below it without overlapping the copy. The compact catalog starts with a smaller image so its opening copy is fully visible; fullscreen uses the real viewport height with an initial half-page image and vertically centered closing copy. It uses a generated monochrome editorial asset and spring-smoothed Framer Motion transforms.
Words Preloader is a Preloader-category block that functions as a full-screen loader. It cycles through greeting words in 10 languages with a custom speed curve (symmetric delay: slow-fast-slow). At the end, the preloader screen and final text slide up elastically, using an SVG wave path warp transition to reveal the main website screen.
Stairs Preloader is a Preloader-category block that serves as a full-screen entry loader. It features deep dark background staging where a silver cinematic title fades in, shines with a horizontal sweep shimmer gradient, and fades out. The transition is then driven by five white vertical columns (stairs) sliding up staggeredly from bottom to top, revealing the mock landing page content.
Double Stair Preloader is a Preloader-category block that operates as a full-screen entry loader. It stages a silver cinematic title that fades in, glows with a shimmer sweep, and fades out. When completed, the transition splits into 5 vertical columns, each hosting a top half (sliding down) and a bottom half (sliding up) that meet in the center, and then part away in staggered delay steps to reveal the mock portfolio page content.

This keeps reusable pieces separate from ready-made page/layout sections.

## Components rendering boundaries

- `src/components/components-elements/` contains the canonical, reusable component implementations. Their public API must not include catalog-only flags such as `minimal` or `previewMode`.
- `src/components/components-preview-elements/` contains compact catalog adapters. They may override presentation-only layout, sizing, border, background, and chrome around the canonical component, but must never change its implementation or recreate its interaction.
- The detail playground applies the same presentation-only flattening around canonical elements. Its workspace is the visible large-format shell; it does not show a second Bento/card shell inside it.
- `src/components/highlights-elements/` contains the separate 13-item Bento curation used only by `src/components/Highlights.tsx`. Highlights remain clickable links to their matching component details, but do not share implementation source with the catalog or detail playground.
- Two retired accordion sources remain in `components-elements/` for source continuity, but the active `/components` catalog follows the 17 entries in `COMPONENTS_MANIFEST`.

## Blocks rendering boundaries

- `src/components/blocks-preview-elements/` contains catalog-only wrappers used inside `/blocks` cards.
- `src/components/blocks-elements/` contains the visual implementations and full-page entry components. Fullscreen resolves these entries directly, never the catalog registry or a preview wrapper.
- Header catalog previews stay compact. Their fullscreen version uses a short, complete dummy landing page (about 1.25 viewport heights), enough to exercise scroll-responsive navbar states without an oversized empty canvas.
- Every fullscreen block is rendered as a complete viewport page rather than a centered catalog card. The close control is supplied by the fullscreen host and is intentionally not part of the block implementation.

Blocks use nested routes: `/blocks/$category` renders a category catalog, while `/blocks/$category/$block` renders the block’s full-page implementation. Fullscreen navigation uses these routes so browser back, forward, refresh, and direct links preserve the selected category and block.
