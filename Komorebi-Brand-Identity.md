# Komorebi UI — Brand & Visual Identity Guidelines

> **Komorebi (木漏れ日)** is the Japanese word for "sunlight filtering through the leaves of trees". 
> **Komorebi UI** is a premium, visual-first animation library designed for the AI-first development era, providing both optimized **AI prompts** (for Lovable, v0, Bolt.new) and **clean React code** for high-end organic animations.

---

## 1. Brand Philosophy & UVP (Unique Value Proposition)

### The Vision
Most modern component libraries look like cloned SaaS dashboards: dark mode, neon borders, and rigid geometric layouts. **Komorebi UI** celebrates the beauty of physics, nature, and print-editorial design. The animations feel lightweight, breathing, and responsive to user presence.

### Core UVP
*   **Prompt-First Workflow:** Tailored for creators who build with natural language. Users can copy a single, highly-optimized prompt, paste it into Lovable/v0, and get a premium animated section instantly.
*   **Clean-Code Handoff:** For traditional developers, it offers clean, zero-dependency React + Tailwind + Framer Motion/Anime.js implementations.
*   **Clever Layout Illusions:** We showcase animations that look incredibly complex (like custom canvas drawings) but are actually achieved using simple, performant CSS tricks (e.g., vertical translates of static SVGs, mask-images, and clip-path transitions).

---

## 2. Visual Identity & Tokens

### Color Palette (Moss & Sunlight)
A warm, organic, and high-end editorial color scheme. 

| Token Name | Hex Code | Tailwind Value | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Warm Cream** | `#FBFFE6` | `bg-[#FBFFE6]` | Main website background (evokes warm premium paper). |
| **Moss Green** | `#112115` | `text-[#112115]` / `bg-[#112115]` | Main text, primary brand color, dark-section backgrounds. |
| **Sage Green** | `#BECB6D` | `bg-[#BECB6D]` / `border-[#BECB6D]` | Secondary accents, borders, inactive tabs, and hover states. |
| **Soft Sage** | `#EAF1C1` | `bg-[#EAF1C1]` | Cards, highlights, and secondary background panels. |
| **Sun-Gold** | `#E8A969` | `bg-[#E8A969]` / `text-[#E8A969]` | Active states, interactive dot trackers, and glowing indicators. |

### Typography
To create a high-end editorial feel, we pair an organic serif heading font with a modern, clean geometric sans-serif font.

*   **Headings (H1, H2, H3):** `Halant` (Serif)
    *   *Import:* Google Fonts `Halant` (Weights: 300, 400, 500)
    *   *Usage:* Bold, elegant headings with generous letter-spacing (`tracking-tighter` or custom negative tracking). For accent headings, italicized styles are highly encouraged.
*   **Body & Code (P, Code, Inputs):** `Geist` or `Inter` (Sans-serif)
    *   *Usage:* Clean, highly legible text. Monospace subheadings are used for metadata/labels (e.g., `font-mono tracking-widest uppercase text-xs`).

### Glassmorphism Specification
Cards should appear like frosted glass panels lying over organic, soft, out-of-focus background visuals (representing sunlight filtering through trees).

*   **Background:** `background: rgba(255, 255, 255, 0.25)` or `rgba(18, 34, 22, 0.20)` (for dark cards)
*   **Border:** `1px solid rgba(255, 255, 255, 0.15)`
*   **Blur Effect:** `backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);`
*   **Box Shadow:** Inside glow `box-shadow: inset 0 0 36px 0 rgba(255,255,255,0.40)`

---

## 3. Logo Concept: "The Sunlight Leaf"

The logo for Komorebi UI is a minimalist, responsive SVG icon representing a leaf intersected by a subtle ray of light. 

### Concept Details
A single organic leaf silhouette, split diagonally. One half is filled with a solid **Moss Green**, and the other half is slightly offset with a **Sun-Gold** outline/gradient, symbolizing light filtering through.

### Raw SVG Code for Lovable Rebrand:
```xml
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Sunlight Ray (Underlay) -->
  <path d="M5 35L35 5" stroke="#E8A969" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 4" />
  
  <!-- Left Leaf Half (Solid Moss Green) -->
  <path d="M20 32C11 32 8 23 8 16C13 16 20 20 20 28V32Z" fill="#112115" />
  
  <!-- Right Leaf Half (Sun-Gold Line) -->
  <path d="M20 32C29 32 32 23 32 16C27 16 20 20 20 28V32Z" stroke="#E8A969" stroke-width="2" stroke-linecap="round" />
  
  <!-- Central Vein Dot -->
  <circle cx="20" cy="20" r="3" fill="#E8A969" />
</svg>
```

---

## 4. UI/UX Layout Guidelines (For Lovable Generator)

When you input these guidelines into Lovable, instruct the generator to structure the website as follows:

### Section 1: iPhone-Style Dynamic Island Navigation
*   **Behavior (Sticky Floating Pill):** The navbar floats at the top-center of the screen. As the user scrolls down, it collapses into a compact status pill (displaying only the brand logo + active component name) and expands back into menu options when hovered or when scrolling back up.
*   **Default State (Home):** A compact black-green capsule (`#112115`) with a frosted glass background (`rgba(17, 33, 21, 0.75)` with `backdrop-filter: blur(14px)`). Shows the "Sunlight Leaf" logo and the text `Komorebi UI`.
*   **Expanded State (Hover):** Fluidly morphs (using Framer Motion `layout` properties) to reveal links: `Home`, `Components`, `Search (Cmd+K)`.
*   **Detail State (Route Active):** Morphing layout that displays the back arrow `←`, `Komorebi` logo, active path `Components / [Name]`, and a copy icon button for the AI prompt.

### Section 2: Hero Showcase & Categories
*   **Headline:** Serif typography (`font-serif`) stating: *"Light, shadow, and organic flow for modern interfaces."*
*   **Visual Center:** A large, interactive Pinterest-style cards grid displaying 3 primary categories of components:
    1.  *Connected Flow* (Timeline path trackers, vertical slide curves).
    2.  *Living Data* (SVG trigonometry progress wheels, clip-path graph reveals).
    3.  *Micro-Breeze* (Magnetic buttons, floating cards, text stagger reveals).
*   **Performance:** Cards in the gallery should display hover-previews (like Skiper UI video clips or lightweight animations) instead of rendering full active JS components, to keep loading times fast and 60fps.

### Section 3: Dedicated Component Detail Page (Split-Panel Workspace)
*   **Routing:** Each component resides in its own dedicated path: `/components/[component-id]`.
*   **Left Column (Code & Prompt):** A tabbed layout (Prompt, React Code, Tailwind Config) with custom dark-moss coding syntax highlighting and copy buttons.
*   **Right Column (Live Preview Canvas):** A full interactive canvas with:
    *   Restart button (`RotateCcw`).
    *   Toggle Backdrop button (Moss Dark / Cream Light).
    *   Manually adjustable controls for testing states.

---

## 5. Sample Prompt & Code Structure

Every card in Komorebi UI will store its prompt in a clean format:

### Prompt Template Example (Living Data Chart)
> *"Build a minimalist line graph component inside a card for [Lovable/v0]. The graph path should be a clean SVG line. Animate the graph reveal from left to right on scroll/intersection using a CSS clip-path transition from inset(0 100% 0 0) to inset(0 0% 0 0) over 1400ms. Style the card with a warm cream (#FBFFE6) background, moss green (#112115) text, and a sun-gold (#E8A969) interactive badge showing values."*
