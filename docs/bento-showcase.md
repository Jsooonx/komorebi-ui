# Bento Components Grid Showcase

The Bento Grid (located in Section 3) displays 14 creative components in a balanced, responsive column layout. To maintain high performance and code legibility, the cards are fully modularized.

---

## 📦 Modular Component Extraction

The main layout file `src/components/BentoShowcase.tsx` is kept extremely lightweight (under 60 lines of code) by importing each component card from the dedicated folder [src/components/bentoshowcase-elements/](file:///d:/Productivity/Coding/Websites/%28Usecase-Webapp%29/WebApp-WebsiteAnimationLib/src/components/bentoshowcase-elements):

| Card ID | Component Name | Grid Spacing class | Key Animation Library |
| :--- | :--- | :--- | :--- |
| 1 | `ImageRevealCard` | Standard 1x1 | Framer Motion (Clip Path) |
| 2 | `HoverMembersCard` | Standard 1x1 | Framer Motion (Stagger) |
| 3 | `ThingsDragAndScrollCard` | Tall (`lg:row-span-2`) | Framer Motion (Drag Constraints) |
| 4 | `DevouringDetailsCard` | Standard 1x1 | CSS Transitions |
| 5 | `DynamicIslandCard` | Standard 1x1 | Framer Motion (Layout) |
| 6 | `DitherCard` | Standard 1x1 | React Three Fiber (Dither Shader) |
| 7 | `TextRollCard` | Standard 1x1 | GSAP / CSS transitions |
| 8 | `BorderBeamCard` | Standard 1x1 | Framer Motion (SVG Path length) |
| 9 | `InteractiveNavbarCard` | Wide (`lg:col-span-2`) | Framer Motion (Magnifier scale) |
| 10 | `InfiniteMarqueeCard` | Standard 1x1 | CSS keyframe translation |
| 11 | `MagneticCursorFieldCard` | Tall (`lg:row-span-2`) | React Bits `PixelCard` |
| 12 | `AudioEqualizerCard` | Standard 1x1 | Framer Motion (Random heights) |
| 13 | `MorphingBlobCard` | Tall (`lg:row-span-2`) | Animate Presence / Spring |
| 14 | `HolographicTerminalCard` | Standard 1x1 | React typing interval hooks |

---

## ⚡ Performance Optimizations

Because WebGL shaders, ThreeJS pipelines, and advanced vector physics packages can be heavy to load, the Bento Showcase uses strategic performance tuning:

### 1. Lazy Loading the WebGL Canvas
The dithered WebGL canvas (`DitherCard.tsx`) is lazy loaded via `React.lazy` and wrapped in React's `<Suspense>` boundary. This blocks the heavy `@react-three/fiber` and `three` bundles from loading synchronously on page start, delaying them until the user interacts with the Bento grid.

### 2. Manual Vendor Splitting
Vite chunking (`vite.config.ts`) divides the bundle manual chunks so `threejs` core, animation libraries (`framer-motion`, `gsap`), and standard route controllers are separated. This keeps the initial bundle weight low and lets browsers cache heavy static dependencies.
