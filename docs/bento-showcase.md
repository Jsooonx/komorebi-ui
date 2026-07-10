# Landing-page Highlights

The landing page highlight section is implemented by `src/components/Highlights.tsx` and is separate from both catalogs.

## Current highlight cards

The section currently presents 13 reusable components:

- Image Reveal
- Hover Members
- Toolkit Stack Swiper
- Devouring Details
- Dynamic Island
- WebGL Dither Shader
- Text Roll
- SVG Border Beam
- Mac-Dock Navbar
- Infinite Icon Marquee
- Audio Reactive Equalizer
- Pipeline Stepper
- Typewriter CLI Terminal

Each card is wrapped in `BentoCell`. Clicking a card opens its reusable component detail view at `/components/$id`.

`DitherCard` remains lazy-loaded because it pulls in the Three.js/WebGL stack. The Highlights section itself is loaded directly from the landing route so navigation and scroll restoration can be tested without deferred page sections.

The highlight selection is intentionally curated. A component can be available in the Components catalog without appearing here, and a layout block must never be treated as a highlight component unless it is deliberately added to this list.
