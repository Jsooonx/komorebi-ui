# Komorebi UI - Project Overview & Architecture

Komorebi UI is a premium, high-fidelity website animation library with two main user-facing surfaces:

- the landing page at `/`, which includes the Bento-Showcase and template/prompt showcase
- the Components catalog at `/components`, which lists and previews the reusable component collection

The `Components` catalog and the landing-page `Bento-Showcase` are intentionally separate surfaces. A component can exist in the catalog without being featured inside the Bento-Showcase.

## Technology Stack

- **Framework:** [React](https://react.dev) + [Vite](https://vitejs.dev)
- **Routing:** [TanStack Start / TanStack Router](https://tanstack.com/router)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Styling:** Tailwind CSS + `src/styles.css`
- **Icons:** [Lucide React](https://lucide.dev)
- **WebGL / shader previews:** React Three Fiber + OGL

## Current Directory Layout

```text
.
|- docs/                       # feature and architecture notes
|- obsidian_memory_vault/      # private local memory vault (gitignored)
|- public/                     # runtime static assets used by the app
|- references/                 # design references, templates, source media, archives
|- scripts/                    # local automation helpers such as memory sync
|- src/
|  |- components/
|  |  |- bentoshowcase-elements/
|  |  |- terminal-elements/
|  |  `- ui/
|  |- lib/
|  `- routes/
|- AGENTS.md
|- eslint.config.js
|- package.json
|- tsconfig.json
`- vite.config.ts
```

## Runtime Boundaries

- **Landing page:** `src/routes/index.tsx`
- **Components catalog:** `src/routes/components.index.tsx`
- **Component detail sandbox:** `src/routes/components.$id.tsx`
- **Catalog manifest:** `src/lib/components-manifest.ts`
- **Preview registry:** `src/lib/component-previews.ts`
- **On-demand source loader:** `src/lib/component-code-loader.ts`
- **Catalog-only component examples:** `pixel-shimmer` is registered in the Components catalog but is not part of the landing-page Bento-Showcase

## Audit Notes

- `references/` is intentionally excluded from root linting because it stores non-runtime material.
- `obsidian_memory_vault/` and `scripts/sync_memory.py` are private workflow assets and should stay out of public pushes.
- The global command palette is lazy-loaded on user intent so the landing page does not pay that cost up front.
- Below-the-fold homepage sections are deferred so heavy showcase code does not need to ship before the user reaches it.
- Runtime assets live in `public/`; non-runtime source media and design explorations should live under `references/`.
