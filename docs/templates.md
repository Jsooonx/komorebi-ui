# Website Template Prompt Library

The Template Showcase (located in Page 4) features 8 premium landing page templates built for rapid deployment. It acts as an AI prompt library, enabling developers to build production-grade animated interfaces with a single prompt.

---

## 🎨 Visual Assets & Deferrals

*   **Aura AI Video Mockup:** The Aura B2B AI landing page (`aura`) features a 4MB MP4 video mockup. The video tag is set to `preload="none"` to block the browser from loading video files on the initial load, saving bandwidth and reducing initial CPU layout recalculations.
*   **Smooth Hover Playhead Reset:** When a developer hovers over the Aura template card, the video starts playing from frame 0 (`videoRef.current.currentTime = 0; videoRef.current.play()`). This is handled via a ref pointer rather than unmounting and remounting react keys, removing black frame flashing.
*   **Aura Resolution Relay:** The section after Aura's hero translates one incoming customer signal through intent, context, and resolution. Its warm forest, sunlight, and soft-aqua palette extends Aura's hero image rather than introducing a disconnected dark dashboard. An original generated aqua-glass artwork acts as the resolution visual, while the header, signal, stage controls, detail, and outcome enter in a single hero-style staggered sequence; the interaction remains a native motion-driven relay instead of a browser mockup or fake chat interface.
*   **Coming Soon Placeholders:** 7 of the templates (`jplus`, `shyen`, `synergeus`, `vesper`, `aeon`, `apex`, `kora`) display a stylized "Coming Soon / In Queue" dashboard placeholder overlay, indicating templates scheduled for upcoming releases.

---

## 📋 Copy Prompt Sharing

1.  **Prompt Storage:** The structured prompts containing typography specifications, layout structures, HSL tokens, and animation directives are stored in the templates data list (`TemplateShowcase.tsx`).
2.  **Clipboard Copying:** Clicking "Copy Prompt" on any card copies the string to the user's clipboard and triggers a toast notification via `sonner`. Developers can paste this prompt directly into LLM builders like Claude, Lovable, or v0 to generate full page templates in seconds.
