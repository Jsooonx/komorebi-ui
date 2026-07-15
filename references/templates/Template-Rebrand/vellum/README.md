# Vellum

Vellum is a standalone contemporary-editions landing page rebuilt from the interaction scope of `Lovable-Design/Pallet-Ross` without modifying that reference project.

## Design direction

- Quiet museum editorial composition: limestone, charcoal, ivory, and restrained oxblood.
- Six surfaces: Hero, Selected Editions, Collector's Lens, Artist Notes, Private Viewing, and Footer.
- Local Framer Motion interactions: hover/focus morphs, in-place detail transitions, and no autoplay carousel.
- Collector's Lens keeps its control geometry and an explicitly anchored detail wrapper stable during selection changes, so hover/tap cannot shift labels, flash stale copy, or escape into another section.
- Box CTAs invert to black on hover; underline CTAs draw a black line over the resting rule from left to right.
- Native mobile layout: visual stages retain the art while spatial controls become direct tap surfaces.

## Assets

All Vellum visual assets live in `public/vellum/`. They are original generated editorial-art images and are not copied from Pallet-Ross.

## Development

```bash
npm run dev
npm run lint
npm run build
```
