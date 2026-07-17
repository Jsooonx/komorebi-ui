import { motion, useReducedMotion } from "framer-motion";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Shared entrance state for the smaller hero elements.
const rise = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

// Reused arrow treatment inside the two primary calls to action.
const Arrow = () => <span aria-hidden="true">→</span>;

// Top navigation: edit the location label, menu label, and primary CTA here.
function Topbar() {
  return (
    <header className="topbar">
      <motion.button {...rise} transition={{ delay: 0.15 }} className="menu-button">
        <span className="menu-icon"><i /><i /><i /></span>
        <span>Index</span>
      </motion.button>
      <motion.p {...rise} transition={{ delay: 0.22 }} className="location">
        Copenhagen, DK&nbsp; · &nbsp;08:41
      </motion.p>
      <motion.a {...rise} transition={{ delay: 0.3 }} className="project-link" href="#contact">
        <span className="text-wrapper">
          <span className="text-original">Start a brief</span>
          <span className="text-hover" aria-hidden="true">Start a brief</span>
        </span>
        <Arrow />
      </motion.a>
    </header>
  );
}

// Centered tab logo: change the brand mark and wordmark together here.
function BrandTab() {
  return (
    <motion.div className="brand-tab" initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      <span className="brand-mark">✦</span>Lumenfold
    </motion.div>
  );
}

// Main identity message: edit the oversized title and two-line studio descriptor here.
function Headline() {
  return (
    <section className="headline">
      <motion.h1 initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
        Lumenfold
      </motion.h1>
      <motion.p {...rise} transition={{ delay: 0.54 }}>Digital<br />Atelier</motion.p>
    </section>
  );
}

// Decorative guide marks only: safe to remove or reposition without changing content.
function GuideMarks() {
  return <div className="crosses" aria-hidden="true"><b>+</b><b>+</b><b>+</b></div>;
}

// Bottom-left studio summary: update team initials, metric, body copy, and story CTA here.
function StudioIntro() {
  return (
    <motion.section {...rise} transition={{ delay: 0.66 }} className="intro">
      <div className="faces" aria-label="Portraits of studio team members"><span>KA</span><span>MJ</span><span>RO</span></div>
      <div className="count"><strong>24</strong><small>launches</small></div>
      <p>We shape identities and digital spaces with a sense of movement, clarity, and material depth.</p>
      <a className="story" href="#story">
        <span className="text-wrapper">
          <span className="text-original">Enter the studio</span>
          <span className="text-hover" aria-hidden="true">Enter the studio</span>
        </span>
        <Arrow />
      </a>
    </motion.section>
  );
}

// Bottom-right editorial card: replace this proof point with a real award, press mention, or credential.
function RecognitionCard() {
  return (
    <motion.aside {...rise} transition={{ delay: 0.74 }} className="recognition">
      <span className="stars">✦ ✦ ✦ ✦ ✦</span>
      <h2>DESIGN<br />ARCHIVE<br /><em>SELECTED ’26</em></h2>
      <p>Independent<br />studio practice.</p>
    </motion.aside>
  );
}

// Bottom social shortcuts: replace placeholder anchors with the production URLs.
function SocialLinks() {
  return (
    <motion.nav {...rise} transition={{ delay: 0.82 }} className="socials" aria-label="Social links">
      <a href="#x">X</a><a href="#instagram">◎</a><a href="#dribbble">◌</a>
    </motion.nav>
  );
}

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="stage">
      <motion.div className="hero" initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.015 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}>
        {/* Background image and its readable dark overlay. Swap the artwork path in styles.css. */}
        <div className="artwork" aria-hidden="true" />
        <div className="shade" aria-hidden="true" />
        {/* Vertical composition rules; they are decorative and can be removed. */}
        <div className="vertical-line first" /><div className="vertical-line second" /><div className="vertical-line third" />
        <Topbar />
        <BrandTab />
        <Headline />
        <GuideMarks />
        <StudioIntro />
        <RecognitionCard />
        <SocialLinks />
        {/* Target for the top-right CTA until a real contact section is added. */}
        <div id="contact" className="contact-anchor" />
      </motion.div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
