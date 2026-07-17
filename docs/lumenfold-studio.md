# Lumenfold Studio Template

`references/templates/Template-Rebrand/lumenfold-studio/` is a standalone Vite, React, and Framer Motion hero-only template. It uses original Lumenfold branding, copy, and generated visual artwork.

- The menu label was updated from "Index" to "Menu".
- Click on the "Menu" button opens a left drawer (occupying 1/3 of the screen width on desktop) with Home and Work navigation links, contact information, and animated socials. Home links to `#`, Work links to `#/works`, and either link closes the drawer; the remaining portion of the screen displays a blurred, semi-transparent backdrop. Clicking on the backdrop or the close button also closes the menu drawer. It locks body scroll when open.
- The team initials avatar circles in the bottom-left intro section (originally KA, MJ, RO) were replaced with three custom brand logo images (`logo-1.png`, `logo-2.png`, `logo-3.png`) with customized backgrounds and paddings to fit concentricity.
- The text-based social media shortcut links (originally X, ◎, ◌) in both the landing page footer and overlay menu drawer were replaced with custom brand logo images (`social-x.png`, `social-instagram.png`, `social-dribbble.png`) with a consistent circular background, padding, and layout overflow clipping.
- The bottom-right editorial recognition card was replaced with an autoplay slider loop that showcases three custom vertical posters (`slide-1.jpg`, `slide-2.png`, `slide-3.jpg`) sliding one by one from right to left inside the container with responsive heights.
- Motion is limited to a reduced-motion-aware load-in, local social-link hover feedback, a premium hover transition on both CTA buttons and the Menu button (where the arrow's/icon's black background box expands to cover the entire button, and the text color transitions to white), a premium text roll-up (slide-up) animation on hover for the CTA and Menu buttons, the autoplay right-to-left slide animation on the bottom-right project carousel, staggered one-by-one entrance animations for both client logos (faces) and social media shortcuts, and the layout morphing animations on the works bento grid cards.
- The site implements a custom Hash Router (`#/works` and `#/works/:id`) allowing direct URL linking, back-button history navigation, and zero-dependency routing.
- The Works page renders a responsive asymmetrical Bento Grid (3-column on desktop, 2-column on tablet, and 1-column stack on mobile) alongside a floating sidebar filter category selector (rotating to horizontal on smaller viewports).
- Clicking a project card morphs it into a full case study layout overlay (`CaseStudyModal`) using Framer Motion's `layoutId` shared layout animation.
- Several works-page layout bugs were fixed:
  - Topbar location overlap resolved by placing the location/clock directly next to the Menu button with a stable `20px` positive margin on both desktop and tablet layout states.
  - Card hover scroll lock resolved by applying `pointer-events: none` on bento card children, stopping compositing hover states from delaying mouse wheel events.
  - Category filter switching lag resolved by removing the exit-animation AnimatePresence container, causing filtered bento items to update instantly.

Run it from its folder with `npm install` then `npm run dev`.

## Editing map

`src/main.tsx` is split into small, commented hero sections: `Topbar`, `BrandTab`, `Headline`, `GuideMarks`, `StudioIntro`, `RecognitionCard`, `SocialLinks`, `WorksPage`, and `CaseStudyModal`. Each comment identifies the copy or interaction it owns. The generated background artwork path and the styling for each named section remain in `src/styles.css`.

`src/data/projects.ts` defines the list of projects, their metadata, copy, and layout size settings.

`src/styles.css` is formatted and grouped by visual section. Each group includes a short comment explaining its ownership and, where useful, the safest property to edit for placement.

## Responsive behavior

The hero has dedicated desktop, tablet (`1280px`), narrow-screen (`800px`), phone (`560px`), and small-phone (`390px`) rules. Tablet removes the desktop-only location offset before it can collide with navigation. On narrow screens, the header uses a compact icon-only project CTA beside a centered brand tab, nonessential social controls are hidden, and the recognition card and studio summary stack vertically within a taller hero.

The Works page adapts the Bento Grid columns (3 columns on desktop, 2 columns on tablet, 1 column on mobile) and relocates the vertical floating sidebar filter into a horizontal pill selector centered above the grid. Its scroll surface has an explicit viewport height and vertical pan intent so scrolling remains available while the pointer is over a hovered bento card. The case study modal collapses its 2-column layout into a single-column stacked view on mobile devices.
