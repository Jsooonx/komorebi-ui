# Interactive Component Playground

The Interactive Component Playground (located in Section 2) is a live 3-panel simulation area that lets developers tweak component variables, copy code snippets instantly, and preview changes in real time.

---

## 💻 Panel Architecture

The playground is managed by `src/components/ShowcaseTerminal.tsx` and split into three column panels:

```text
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│       Panel 1           │       Panel 2           │       Panel 3           │
│  Parameter Controls     │     Code Viewer         │    Live Preview Canvas  │
│  (Adjust variables,     │   (Reflects adjusted    │  (Simulates component   │
│   switches, details)    │    state variables)     │   under visual state)   │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

### 1. Panel 1: Parameter Controls
*   Provides slider adjustments, boolean toggles, and detail description fields.
*   Triggers state updates when users interact with the inputs (e.g. changing glow colors, speed, or sizing).

### 2. Panel 2: Code Viewer
*   Shows the exact React component code required to run the customized configuration.
*   Dynamically updates inline properties and variables matching the Panel 1 state.
*   Includes a click-to-copy button which copies the customized code block to the developer's clipboard.

### 3. Panel 3: Live Preview Canvas
*   Renders the visual output of the component in real time.
*   By default, displays the premium `AuraHeroPreview` component (`src/components/terminal-elements/AuraHeroPreview.tsx`), demonstrating conversational B2B AI features, typing scripts, and organic floating mesh particles.

---

## 🔄 Typing Simulator & CLI Output
Inside Panel 3, terminal command executions are logged in macOS-style window mockups. Lines of commands are generated through a custom typing simulator (`ShowcaseTerminal.tsx`'s logger logic) that renders characters sequentially, outputting standard status check logs on execution.

---

## 🛠️ Canvas Controls & Menu Drawer
In the component playroom detail page (`src/routes/components.$id.tsx`), all page actions are consolidated in the floating canvas tools pill in the top-right corner of the preview area:
*   **Menu Drawer Toggle (Menu/X):** Slides out the left sidebar menu to select other elements from the library. Moving it here keeps the top header navigation layout clean and static.
*   **Reset Animation:** Re-runs the component loading state and restarts GSAP/Framer animations.
*   **Toggle Code Editor:** Opens or closes the split-screen code code pane in real time.
*   **Copy CLI Command:** Copies the target `npx komorebi-ui add <component>` installer string.
*   **Fullscreen Mode:** Maximizes the workspace preview container to fill the screen.
