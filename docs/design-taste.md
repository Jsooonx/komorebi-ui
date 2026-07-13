# Design Taste & Guidelines

This document details the established design taste, layouts, typography, and motion rules built during collaborative feature sessions for Komorebi UI.

---

## 📐 Layout & Container Margins

To maintain layout breathing room and avoid elements feeling cramped:

### 1. Scrollable Preview Blocks

- Preview block containers (such as **Features 1**, **Features 2**, **Features 3**, **Features 4**, **Features 5**, **Siena Parallax**, and **Logo Clouds**) are displayed inside scrollable viewports (`h-[580px]`, `h-[650px]`, or `h-[720px]`) on the Blocks page. These catalog visuals live in `blocks-preview-elements/` and must remain compact. Fullscreen resolves a separate full-page entry from `blocks-elements/`, covers the whole viewport like a normal page, and must not inherit a centered-card constraint from the catalog.
- **Scroll Padding Rule:** Never force `h-full` on the inner flex wrapper containing the block content. When `h-full` is combined with `overflow-y-auto`, browsers clip/ignore the bottom padding on scroll.
- **Correct Padding:** Use `py-12 md:py-16 px-6` on the inner content wrapper and let the height grow naturally. This guarantees a consistent, beautiful gap at both the top and bottom of the container when scrolled to the limits.

### 2. Block Grid Spacing

- Internal elements should have breathing room:
  - Icon grids: `w-24 h-24 mb-3` or similar.
  - Title and descriptions: `mt-3` or `mt-4`.

---

## 🧭 Navigation & Sticky/Floating States

Different header/navbar blocks have specific top-docking behaviors in minimal preview modes:

| Block ID             | Component Name     | Minimal Mode Layout Behavior                                 | Styling Class            |
| :------------------- | :----------------- | :----------------------------------------------------------- | :----------------------- |
| `mega-menu-navbar-1` | Mega Menu Navbar 1 | **Floating** - Does not touch the container borders.         | `sticky top-4 px-4 pb-2` |
| `mega-menu-navbar-2` | Mega Menu Navbar 2 | **Docked** - Touches the top/sides of the preview container. | `sticky top-0 pb-2`      |
| `mega-menu-navbar-3` | Mega Menu Navbar 3 | **Docked** - Touches the top/sides of the preview container. | `sticky top-0 pb-2`      |

- The Header catalog previews use their normal compact document height. Fullscreen uses a complete but short dummy landing page, so navbar morphing can be tested with a natural page scroll instead of an empty extended canvas.
- Logo Cloud fullscreen pages are static (`overflow-hidden`): the content is centered within one viewport and should not expose a vertical scrollbar. Each logo has a deliberate hover hit area that brightens its mark and label.
- Features fullscreen pages center their content vertically in the viewport while preserving internal scroll for layouts that exceed the available height.
- The fullscreen host locks document-level scrolling while open, so the underlying `/blocks` catalog never leaks a browser scrollbar into the fullscreen experience.
- Layout block headers inside **Features 1**, **Features 2**, **Features 3**, **Features 4**, **Features 5**, and **Logo Cloud 3** are static, use the established sans-serif weight treatment, and scroll away naturally with the layout. Editorial Parallax blocks are the typography exception: Siena, Atlas, and Depth Lens use light serif headlines for their cover/outro moments, while Oliver already uses the same editorial serif language. Siena Parallax is also distinct in motion behavior: its image starts flush at the top edge at half-scene height, then its image and copy are intentionally tied to the preview scroll progress.
- Parallax blocks should remain distinct patterns: Siena focuses on image-to-card transformation, Oliver on staggered gallery depth, Atlas on a horizontally traveling chapter track, and Depth Lens on layered cinematic depth. Oliver, Atlas, and Depth Lens use the locally curated `public/images/pinterest/` collection; Siena retains its dedicated generated monochrome image. Depth Lens uses a clipped atmospheric background, midground texture, focal image, and foreground frame with restrained spring-smoothed scroll offsets; it should stay DOM/Framer-based and avoid WebGL, drag controls, and forced snap points.
- Product Showcase blocks should show one product workspace in action rather than another feature grid or decorative Bento. Signal Workflow Showcase uses a stable DOM/CSS workspace anchor and a natural vertical scroll narrative across three states; the UI panels morph in place, while copy and status details transition locally. Catalog and fullscreen share the interaction pattern but keep separate viewport surfaces, with no dashboard image reuse from Features 4/5.
- Focus Tour Product Showcase extends this rule with a click-driven tour: the workspace remains stable while one shared spotlight lens, active indicator, and annotation move between product areas. It should borrow the project’s tooltip and expandable-tab motion language without importing Components source, using directional spring transitions, local hover feedback, no forced autoplay, and no nested Bento shell.
- Orbit Workspace Showcase extends the Product Showcase family into a centered spatial system: one workspace remains the stable anchor while Context, Network, Decisions, and Delivery surfaces orbit around it through natural vertical scroll. Use DOM/CSS perspective and restrained `translateZ`, scale, opacity, and rotation to create 2.5D depth; keep every orbit panel mounted, avoid forced snap and drag controls, and let only the hovered panel receive a local light-up. The catalog uses reduced orbit amplitude, while fullscreen may use a longer sticky scene. Reduced motion should flatten the depth travel and preserve readable state changes.
- Testimonials & Social Proof blocks should feel like human editorial evidence, not another product showcase. Voice Index Testimonials uses a large quote field and a persistent identity index: hovering or focusing a row traces four voices while the quote changes in place, and leaving the rail restores the opening voice; touch users may select a row directly. Keep the composition asymmetrical and typographic, with no dashboard, workspace chrome, orbit, card stack, autoplay, drag carousel, forced snap, decorative metric wall, or scroll-driven quote switching. Give the heading, quote field, identity rail, and closing note explicit layout regions; oversized editorial type must never escape its quote region and collide with the heading. The active identity row may receive a restrained local shared-layout highlight, while the quote uses only a short local opacity/position morph and the whole group remains quiet. Fullscreen editorial compositions should center their complete visual group vertically when the scene does not require scroll travel. Quote copy may use a light editorial serif; names, roles, companies, outcomes, and index labels stay sans-serif or mono.
- Proof Ledger Testimonials is the outcome-led counterpart: compact proof records should reveal a stable evidence field with before state, after state, restrained result, and quote excerpt. It may use the same local hover/focus/tap interaction and reset-to-entry-one resting behavior, but must not repeat Voice Index’s quote archive composition. Treat the result as supporting evidence rather than a decorative metric wall; rows, metadata, and labels remain quiet while the active record’s local shared highlight and content morph carry the interaction.
- Community Mosaic Testimonials is the breadth-of-community counterpart: a tall three-column masonry wall of human notes and generated fictional portraits. It is allowed to use individual testimonial cards because the cards are the actual proof content, not a generic product Bento; avoid a surrounding inner card shell, global card highlight, or state-switching interaction. Avoid a uniform card grid: intentionally mix feature, standard, compact, and quiet card density, then stagger desktop columns modestly through padding offsets, type scale, portrait size, and surface contrast. Keep every card static on mount and use only local hover feedback—subtle lift, contrast increase, and portrait brightening—so the wall remains calm and naturally readable. Fullscreen may scroll as a complete editorial page when the content requires it; the catalog may use a contained scroll viewport.
- Pricing & Conversion blocks should help people self-select with a small number of outcome-led choices, transparent price language, and one obvious next step. Plan Lens Pricing uses one stable three-tier surface: the active tier may widen through a local shared-layout lens while its scope and capacity markers reveal in place. When no tier is hovered or focused, restore the middle/default tier; keep card height fixed so the surrounding composition stays still while content changes locally. Do not turn pricing into a dashboard, decorative image collage, dense feature matrix, autoplay carousel, or scroll narrative. Use DOM/CSS visuals only when they clarify the tier's capacity; the default tier should provide a clear resting state and reduced motion should preserve hierarchy with short state fades.
- Active-plan light-up is immediate: do not combine a generic hover-border transition with a delayed shared-lens spring. Keep the lens handoff instantaneous, while only the plan width and local content retain restrained motion.
- Usage-based pricing should remain a calm value-metric explorer, not a billing calculator. Keep one visible capacity track, a small number of understandable horizons, a stable transparent total, and an explicit forecast/cap. Move the shared marker and only the adjacent details; do not turn the surface into a dense input form, dashboard, checkout, or animated chart.
- Billing-cadence pricing may use a distinct editorial direction when it makes the trade-off clearer. Treat monthly versus annual as a visible commitment decision: keep the two terms click-selected, morph one stable price-and-terms document, and give time a simple tangible line. Do not reduce it to a generic toggle or hide the annual up-front cost behind a savings badge.
- CTA blocks should have one primary thought and one primary action. The action may reveal a short local confirmation state, but must not become a fake signup form or a second hero. Keep supporting proof and decorative effects subordinate; the click target, message, and next step remain the stable visual anchor.
- A split CTA may use one focused visual proof frame, but the visual must clarify the same promise as the copy rather than compete with it. Prefer an original generated composition or a carefully selected clean image; avoid borrowed in-image text, dashboard screenshots, or a second action inside the media panel.

---

## 🔠 Typography Constraints

Headings within layout blocks must remain modern, generic, and clean. Use the following hierarchy:

- **Default Font:** Use generic modern sans-serif fonts (like Inter or site sans-serif) for block headers.
- **Default Styling:** Standard layout blocks should use `font-sans font-semibold tracking-tight` with restrained leading and compact line length.
- **Editorial Exceptions:** Cover and closing headlines in Siena, Oliver, Atlas, and Depth Lens may use `font-serif font-light tracking-tight`. Testimonial quote copy in Testimonials & Social Proof blocks may also use a light editorial serif. These exceptions should not spread to generic headings, dashboard copy, identity metadata, metrics, controls, feature grids, or spatial product UI.

---

## 🎨 Visual Aesthetics (Taste Profile)

The visual design language is built on extreme minimalism and clean contrast:

- **Color Palette:** Pure black, white, and translucent gray scales.
- **Icon Boxes:** Small outline icon boxes with thin borders (`border-white/10`), glassmorphism (`bg-[#09090b]/80 backdrop-blur`), and subtle shadow hover transitions.
- **Icon Colors:** Revert to simple white outline icons (`text-white/80` or `text-white/90`). Do not introduce colored accents (like olive/brand colors) on outline icons unless requested.
- **Grid Backgrounds:** Custom circular grid patterns created using repeating linear-gradients (`16px 16px`) masked with soft radial-gradients:
  `maskImage: 'radial-gradient(circle at center, black 25%, transparent 65%)'`

---

## ⚡ Motion & Performance Rules

To achieve butter-smooth 60fps/144fps animations without layout jitter:

### 1. Static Catalog Controls

- Sidebar labels, category buttons, icons, and helper text must remain static while the active category changes.
- Animate only the sidebar container when opening or collapsing it; do not replay child entrance animations on category selection.
- Block preview rows render statically without entrance animation so embedded previews do not blink. The Blocks sidebar may use one grouped entrance on mount, but must remain static when the active category changes.
- Changing a Blocks category resets the page scroll position to the top so every category starts from a consistent viewport.
- Fullscreen preview mode must cover the entire viewport with only a hover-revealed close icon. Do not keep the catalog toolbar, metadata, header, or sidebar visible inside fullscreen. Non-header blocks are centered within the viewport; header blocks stay top-aligned and retain a long scrollable page so navbar morphing can be experienced.

### 2. CSS Keyframe Animations vs JS Loops

- Continuous marquees (vertical and horizontal scroll paths, like **Logo Cloud 2** and **Logo Cloud 3**) must run on **native CSS animations** (`@keyframes marquee-up` / `@keyframes marquee-down`) instead of JS-based frame loops.
- JS frame intervals cause fractional pixel anti-aliasing text jitter, which degrades readability.

### 3. GPU Layer Promotion

- Elements with active translations must have compositor properties to prevent browser repaint delays:
  - `willChange: "transform"`
  - `transform: "translateZ(0)"`

### 4. Hover Interaction

- Loop marquees should pause smoothly on hover rather than slowing down:
  `hover:[animation-play-state:paused]`

### 5. Seamless Loops (alignment offset)

- Avoid using `gap` classes on flex containers inside endless loops. Instead, apply inline `marginRight` styles to child elements. This eliminates sub-pixel rounding offsets and prevents visual "jumping" when the loop resets.

## Komorebi Motion Taste

The preferred interaction language is minimal UI with high-quality morphing motion. The interface should look simple at rest and gain character through movement, continuity, and responsive state changes.

### Core visual principles

- Keep the visual surface simple: restrained dark containers, few decorative layers, clear hierarchy, and compact controls.
- Let motion provide polish instead of adding visual noise, gradients, badges, or excessive decoration.
- Preserve a stable anchor while related content expands, collapses, or changes around it.
- Prefer adaptive layouts that follow the active content's natural height over fixed-height panels.
- Treat catalog previews and detail playgrounds as focused interaction surfaces; remove redundant nested card shells when the host container already provides the frame.

### Preferred motion patterns

- Use spring-driven layout animation for expansion, collapse, reflow, and container resizing. Favor a responsive spring with controlled damping over a generic duration/easing transition.
- Use Framer Motion `layout` or `layout="size"` so neighboring elements morph into their new positions instead of blinking or jumping.
- Use `layoutId` for shared visual elements such as active indicators, selected backgrounds, and tab highlights so they travel continuously between states.
- Use `AnimatePresence` for content replacement, combining opacity, a small directional translation, and a subtle blur/focus shift.
- Make directional transitions follow user intent: moving from a left tab to a right tab should move the outgoing content left and incoming content from the right; reverse the directions when navigating back.
- Measure dynamic content when necessary (for example with `ResizeObserver`) so expand/collapse height transitions animate to the actual content size.
- Use small stagger delays only for child items entering a newly revealed panel. Keep them short and subordinate to the parent morph.
- Use hover motion locally: the hovered icon or control may brighten, lift, scale slightly, or gain a restrained glow. Avoid lighting up an entire group when one item is hovered.
- Use `whileTap` or a similarly subtle press response for controls, without making the interface feel bouncy or game-like.
- Preloader blocks should prefer one persistent visual anchor that morphs through its states. A frame, label, or progress mark may change size and context with spring continuity, but the transition must not rely on repeated hard wipes, blinking remounts, or an artificial global loading gate. Showcase preloaders should reveal a page layer underneath and use a short static/dissolve fallback when reduced motion is requested.

### Motion quality constraints

- Avoid abrupt state swaps, hard fades, or content replacement that causes a visible blink.
- Avoid animating unrelated siblings or moving a primary anchor when a secondary panel expands.
- Avoid large travel distances, excessive blur, overshoot, and decorative motion that competes with the interaction.
- Preserve continuity: the user should be able to understand that the new state is the same object transforming, not a different object appearing.
- Prefer the smallest number of animated properties that produces a convincing morph: layout/size, position, opacity, focus, and a restrained scale when useful.

### 6. Component Catalog Boundaries

- Component fullscreen is intentionally unavailable. The regular `/components/$id` playground is the largest Components surface and must not expose a second fullscreen state, control, or exit overlay.
- Compact catalog treatment belongs to `components-preview-elements/`. Canonical component source in `components-elements/` must not expose catalog-only flags such as `minimal` or `previewMode`.
- Components Catalog previews and landing-page Highlights are separate visual surfaces. Highlights own their exclusive Bento implementation, while catalog adapters render the canonical component unchanged and only override presentation. The component's own header, footer, border, radius, background shell, and Bento spacing must be removed in the catalog so the interaction fills the available viewport and the catalog card remains the sole visible container.
- The Components detail playground follows the same rule at large size: its workspace is the only visible shell, and the canonical element's Bento/card chrome is removed so the interaction occupies the layout.
