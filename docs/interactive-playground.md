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
