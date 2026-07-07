# Komorebi UI - Project Overview & Architecture

Komorebi UI is a premium, high-fidelity website animation component library designed for rapid development. It features interactive playrooms, bento-grid modular components, and prompt sharing templates.

---

## 🛠️ Technology Stack & Dependencies

*   **Framework:** [React](https://react.dev) + [Vite](https://vitejs.dev)
*   **Routing System:** [TanStack Router](https://tanstack.com/router)
*   **State Management:** Standard React Hooks (`useState`, `useEffect`, `useRef`)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
*   **Styling:** Tailwind CSS + Vanilla CSS (`src/styles.css`)
*   **Icons:** [Lucide React](https://lucide.dev)
*   **ThreeJS/WebGL Elements:** [React Three Fiber](https://r3f.docs.pmnd.rs/) + [OGL](https://github.com/oogl/ogl) (used in Shader & Dither canvas visualizers)

---

## 📂 Directory Structure

```text
├── .output/                 # Production-built bundle assets
├── docs/                    # Architectural & feature documentation
├── public/                  # Static assets (videos, brand logos, etc.)
├── src/
│   ├── components/          # Core reusable interface sections
│   │   ├── bentoshowcase-elements/  # Extracted modular bento cards (14 cards)
│   │   ├── terminal-elements/       # Playground terminal preview mockups
│   │   ├── ui/                      # Base shared assets (DarkVeil, dither, etc.)
│   │   ├── BentoShowcase.tsx        # Main Bento showcase layout grid
│   │   ├── DynamicIsland.tsx        # Floating navbar pill component
│   │   ├── Footer.tsx               # Premium dark website footer
│   │   ├── Hero.tsx                 # Landing page hero header
│   │   ├── ShowcaseTerminal.tsx     # 3-panel playroom playground
│   │   └── TemplateShowcase.tsx     # Copy-prompt templates grid
│   ├── routes/              # TanStack Router page entry points
│   │   ├── __root.tsx       # Root layout configuration
│   │   └── index.tsx        # Homepage route manager
│   ├── styles.css           # Global custom typography and keyframe animations
│   ├── router.tsx           # TanStack router setup
│   └── main.tsx             # Client entry mount point
```

---

## 🚀 Navigation & Flow

1.  **Entry Point:** When a user visits the website, they land on the homepage route `src/routes/index.tsx` which wraps the primary components: `<DynamicIsland />`, `<Hero />`, `<ShowcaseTerminal />`, `<BentoShowcase />`, `<TemplateShowcase />`, and `<Footer />`.
2.  **Smooth Scrolling:** Clicking any menu items in the floating navbar or footer triggers a smooth scroll animation. The click events are intercepted by a JS scroll helper to smoothly glide to the target ID without appending `#` hash values to the browser URL.
3.  **Codebase Cleanliness:** Unused Shadcn/UI template components have been deleted to keep the output stylesheet weight under 62kB, boosting page load speeds significantly.
