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
- Layout block headers (like the titles inside **Features 1**, **Features 2**, **Features 3**, **Features 4**, **Features 5**, **Siena Parallax**, and **Logo Cloud 3**) are static, use the established sans-serif weight treatment, and scroll away naturally with the layout. Siena Parallax is the exception for motion behavior: its image starts flush at the top edge at half-scene height, then its image and copy are intentionally tied to the preview scroll progress.

---

## 🔠 Typography Constraints

Headings within layout blocks must remain modern, generic, and clean:

- **Default Font:** Use generic modern sans-serif fonts (like Inter or site sans-serif) for block headers.
- **Font Styling:** Headings should be styled with `font-sans font-semibold tracking-tight` rather than `font-serif` or light font weights, unless explicitly requested.
- Serif fonts (like `font-serif`) are reserved for core interactive cards (e.g. `PixelShimmerCard` or `ImageRevealCard` layout experiments) and should not be used for generic layout block headings.

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
