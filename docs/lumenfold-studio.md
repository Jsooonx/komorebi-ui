# Lumenfold Studio Template

`references/templates/Template-Rebrand/lumenfold-studio/` is a standalone Vite, React, and Framer Motion hero-only template. It uses original Lumenfold branding, copy, and generated visual artwork.

- The hero artwork is `public/assets/lumenfold-hero.png`.
- Motion is limited to a reduced-motion-aware load-in and local social-link hover feedback.

Run it from its folder with `npm install` then `npm run dev`.

## Editing map

`src/main.tsx` is split into small, commented hero sections: `Topbar`, `BrandTab`, `Headline`, `GuideMarks`, `StudioIntro`, `RecognitionCard`, and `SocialLinks`. Each comment identifies the copy or interaction it owns. The generated background artwork path and the styling for each named section remain in `src/styles.css`.

`src/styles.css` is formatted and grouped by visual section. Each group includes a short comment explaining its ownership and, where useful, the safest property to edit for placement.

## Responsive behavior

The hero has dedicated desktop, tablet (`1280px`), narrow-screen (`800px`), phone (`560px`), and small-phone (`390px`) rules. Tablet removes the desktop-only location offset before it can collide with navigation. On narrow screens, the recognition card and studio summary stack vertically within a taller hero instead of sharing the lower row, preventing overlap and horizontal overflow.
