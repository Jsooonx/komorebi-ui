# Navigation & Website Footer

Komorebi UI features a premium, floating navbar pill (Dynamic Island) at the top of the viewport and a comprehensive dark footer at the bottom of the page, both optimized for smooth, hash-less scroll transitions.

---

## 🏝️ Dynamic Island Navbar

The top navigation pill (`src/components/DynamicIsland.tsx`) floats fixed at the top of the screen:
*   **Contextual Status:** Detects the current page route. When browsing sub-component details pages, it slides out a back button and displays a golden badge indicating the active component ID.
*   **Search Palette Trigger:** Features a search command trigger button that broadcasts a custom window event (`open-search-palette`) on click, displaying the modal command menu.

---

## 🗄️ Premium Dark Footer

The footer (`src/components/Footer.tsx`) mirrors professional high-fidelity site matrices:
*   **Operational Telemetry:** Renders an animated operational status badge (`All systems operational`) with a green dot pulsing via tailwind keyframes (`animate-ping`).
*   **Theme Controller Mockup:** Displays a border-outlined button with a `Contrast` icon. Clicking this triggers a toast letting the user know they are already experiencing the dark interface theme.

---

## 🌀 Hash-less Smooth Scroll Transitions

To keep the URL clean without cluttering browser routing history:
1.  **Intercepting Clicks:** Navbar links and footer local anchor links are intercepted on click using a `handleScroll` helper:
    ```typescript
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };
    ```
2.  **Smooth scrolling animation** is enabled globally via CSS in `src/styles.css` using `html { scroll-behavior: smooth; }`.
3.  **Result:** The browser smoothly glides to the target section (Playground, Components, Templates, or page top) while keeping the URL bar clean (e.g. `komorebi-ui.vercel.app/` without trailing `#showcase` hash tags).
