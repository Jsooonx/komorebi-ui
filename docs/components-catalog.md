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
- Siena Parallax, Oliver Parallax, Atlas Horizontal Parallax, and Depth Lens Parallax
- Words Preloader
- Stairs Preloader
- Double Stair Preloader
- Morphing Lens Preloader
- Signal Workflow Showcase
- Focus Tour Product Showcase
- Orbit Workspace Showcase
- Voice Index Testimonials
- Proof Ledger Testimonials

Features 2 keeps its interactive CLI terminal engine, while its decorative inline code snippets have been removed from the visual block preview.
Features 3 is a minimal six-cell Komorebi feature layout with original product-focused copy, centered typography, tight heading-to-description spacing matching Features 2’s scale, thin dividers, and restrained icons.
Features 4 is a dashboard-led SaaS layout with original Komorebi copy, a generated workspace visual, and four workflow pillars with restrained hover feedback. Its feature icons brighten to white on hover.
Features 5 is a premium SaaS workflow layout with generated operations and scheduling visuals, plus a compact orchestration panel. Its internal feature containers use sharp corners with subtle corner brackets to preserve the structured dashboard framing, while small controls retain subtle rounding and bright white icon hover states.
Siena Parallax is a Parallax-category block with a scroll-driven editorial image transition: the visual starts flush at the top edge, becomes a floating card, and gives way to a closing statement below it without overlapping the copy. The compact catalog starts with a smaller image so its opening copy is fully visible; fullscreen uses the real viewport height with an initial half-page image and vertically centered closing copy. Its cover and closing headlines use the light serif editorial treatment, while the rest of the scene remains restrained and sans-serif. It uses a generated monochrome editorial asset and spring-smoothed Framer Motion transforms.
Oliver Parallax is a Parallax-category block modeled after Awwwards-style multi-column staggered layouts. It features an initial off-white cover page with elegant light serif typography that slides up on scroll, revealing a three-column gallery of editorial images that move at different rates under spring physics, followed by a sliding off-white outro page that wipes across the screen.
Atlas Horizontal Parallax is a Parallax-category block that turns natural vertical scroll into a pinned horizontal editorial journey across four chapters. The catalog compresses the interaction into a compact scrollable surface, while fullscreen uses a 360dvh sticky scene with subtle image, typography, and oversized-index depth offsets. Its cover and closing headlines use the same light serif treatment as the other editorial Parallax blocks.
Depth Lens Parallax is a Parallax-category block built as a layered cinematic scene. A slower atmospheric background, midground texture, focal portrait, and morphing foreground frame move at different rates before resolving into a quiet closing statement. Its opening and closing headlines use light serif typography to reinforce the cinematic lens metaphor. It uses DOM layers, Framer Motion scroll transforms, and clip-path rather than WebGL or drag interaction.
Words Preloader is a Preloader-category block that functions as a full-screen loader. It cycles through greeting words in 10 languages with a custom speed curve (symmetric delay: slow-fast-slow). At the end, the preloader screen and final text slide up elastically, using an SVG wave path warp transition to reveal the main website screen.
Stairs Preloader is a Preloader-category block that serves as a full-screen entry loader. It features deep dark background staging where a silver cinematic title fades in, shines with a horizontal sweep shimmer gradient, and fades out. The transition is then driven by five white vertical columns (stairs) sliding up staggeredly from bottom to top, revealing the mock landing page content.
Double Stair Preloader is a Preloader-category block that operates as a full-screen entry loader. It stages a silver cinematic title that fades in, glows with a shimmer sweep, and fades out. When completed, the transition splits into 5 vertical columns, each hosting a top half (sliding down) and a bottom half (sliding up) that meet in the center, and then part away in staggered delay steps to reveal the mock portfolio page content.
Morphing Lens Preloader is a Preloader-category showcase built around one persistent centered frame. The frame morphs from a compact capsule into a larger editorial lens, changes its label in place, and expands into a full-page reveal without hard remounts or repeated wipes. It uses one existing grayscale editorial image, Framer Motion layout springs, and a reduced-motion dissolve. It is a visual block only and does not act as the application's global loading gate.
Signal Workflow Showcase is the first Product Showcase block. It keeps one DOM/CSS SaaS workspace anchored while natural vertical scroll moves through three product states: collecting signal, shaping the next move, and shipping with confidence. The catalog uses a compact internal scroll surface, while fullscreen uses a 300dvh sticky narrative. Its dashboard panels crossfade and translate in place with spring-smoothed scroll progress; it does not reuse Features 4/5 dashboard assets, add a nested Bento, or introduce a new dependency.
Focus Tour Product Showcase is the second Product Showcase block. It uses a persistent DOM/CSS workspace with four click-driven areas—Overview, Automations, Review, and Launch. A shared Framer Motion spotlight lens and active step indicator morph between targets while directional annotations change beside the workspace. It stays centered in fullscreen, uses the host container directly in the catalog, avoids forced autoplay and drag interaction, and keeps reduced-motion behavior to short fades.
Orbit Workspace Showcase is the third Product Showcase block. It presents a centered product system with four persistent mini-surfaces—Context, Network, Decisions, and Delivery—that travel through a scroll-driven 2.5D orbit around the active workspace. The catalog uses a short compact scroll surface, while fullscreen uses a 360dvh sticky scene. Panels remain mounted throughout the sequence, local active-surface content morphs inside one stable frame, and hover feedback is limited to the panel under the pointer.
Voice Index Testimonials is the first Testimonials & Social Proof block. It treats social proof as an editorial archive rather than a product interface: hovering or focusing a row in the vertical identity index changes the large quote in place, while leaving the rail restores the opening voice. The active row receives a local shared-layout highlight while the quote uses a restrained local enter/exit morph; touch users can select a row directly. Header, quote, rail, and closing note use explicit vertical regions so the oversized editorial copy never overlaps the section title. The fullscreen composition is vertically centered, while the catalog remains top-aligned for its compact card surface. Both are fixed compositions without autoplay, drag, snap, nested Bento, dashboard chrome, or scroll-driven quote switching. The quote may use a light editorial serif while names, roles, outcomes, and controls remain sans-serif/mono.
Proof Ledger Testimonials is the second Testimonials & Social Proof block. It frames customer evidence as a compact outcome ledger instead of a quote archive: hovering or focusing a proof record morphs a stable evidence field between its before state, after state, result metric, and quote excerpt; touch users can select a record directly, while leaving the ledger restores entry 01. The shared active-row highlight, local quote transition, monochrome archive labels, and non-scrollable centered fullscreen preserve the project’s quiet proof language without becoming a dashboard, carousel, or card wall.
This keeps reusable pieces separate from ready-made page/layout sections.

## Components rendering boundaries

- `src/components/components-elements/` contains the canonical, reusable component implementations. Their public API must not include catalog-only flags such as `minimal` or `previewMode`.
- `src/components/components-preview-elements/` contains compact catalog adapters. They may override presentation-only layout, sizing, border, background, and chrome around the canonical component, but must never change its implementation or recreate its interaction.
- The detail playground applies the same presentation-only flattening around canonical elements. Its workspace is the visible large-format shell; it does not show a second Bento/card shell inside it.
- `src/components/highlights-elements/` contains the separate 13-item Bento curation used only by `src/components/Highlights.tsx`. Highlights remain clickable links to their matching component details, but do not share implementation source with the catalog or detail playground.
- Two retired accordion sources remain in `components-elements/` for source continuity, but the active `/components` catalog follows the 19 entries in `COMPONENTS_MANIFEST`.

## Blocks rendering boundaries

- `src/components/blocks-preview-elements/` contains catalog-only wrappers used inside `/blocks` cards.
- `src/components/blocks-elements/` contains the visual implementations and full-page entry components. Fullscreen resolves these entries directly, never the catalog registry or a preview wrapper.
- Header catalog previews stay compact. Their fullscreen version uses a short, complete dummy landing page (about 1.25 viewport heights), enough to exercise scroll-responsive navbar states without an oversized empty canvas.
- Every fullscreen block is rendered as a complete viewport page rather than a centered catalog card. The close control is supplied by the fullscreen host and is intentionally not part of the block implementation.

Blocks use nested routes: `/blocks/$category` renders a category catalog, while `/blocks/$category/$block` renders the block’s full-page implementation. Fullscreen navigation uses these routes so browser back, forward, refresh, and direct links preserve the selected category and block.
