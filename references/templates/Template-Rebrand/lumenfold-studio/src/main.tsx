import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Shared entrance state for the smaller hero elements.
const rise = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

// Reused arrow treatment inside the two primary calls to action.
const Arrow = () => <span className="arrow" aria-hidden="true">→</span>;

// Top navigation: edit the location label, menu label, and primary CTA here.
function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="topbar">
      <motion.button {...rise} transition={{ delay: 0.15 }} className="menu-button" onClick={onMenuClick}>
        <span className="menu-icon"><i /><i /><i /></span>
        <span className="text-wrapper">
          <span className="text-original">Menu</span>
          <span className="text-hover" aria-hidden="true">Menu</span>
        </span>
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
      <div className="faces" aria-label="Studio brand marks">
        <span className="logo-1"><img src="/assets/logo-1.png" alt="Logo 1" /></span>
        <span className="logo-2"><img src="/assets/logo-2.png" alt="Logo 2" /></span>
        <span className="logo-3"><img src="/assets/logo-3.png" alt="Logo 3" /></span>
      </div>
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

// Bottom-right editorial card: replaced with a sliding loop showcasing the Aespa, Vogue, and Urban Style posters.
const slides = [
  "/assets/slide-1.jpg",
  "/assets/slide-2.png",
  "/assets/slide-3.jpg",
];

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

function RecognitionCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Transitions every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.aside {...rise} transition={{ delay: 0.74 }} className="recognition slider-card">
      <div className="slider-container">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={index}
            src={slides[index]}
            alt={`Project Slide ${index + 1}`}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="slide-image"
          />
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

// Bottom social shortcuts: replace placeholder anchors with the production URLs.
function SocialLinks() {
  return (
    <motion.nav {...rise} transition={{ delay: 0.82 }} className="socials" aria-label="Social links">
      <a href="#x" aria-label="X"><img src="/assets/social-x.png" alt="X" /></a>
      <a href="#instagram" aria-label="Instagram"><img src="/assets/social-instagram.png" alt="Instagram" /></a>
      <a href="#dribbble" aria-label="Dribbble"><img src="/assets/social-dribbble.png" alt="Dribbble" /></a>
    </motion.nav>
  );
}

function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onClose}
        >
          <motion.div
            className="menu-drawer"
            initial={{ x: reducedMotion ? 0 : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button at top-left */}
            <button className="menu-close-button" onClick={onClose} aria-label="Close menu">
              ✕
            </button>

            {/* Bottom left contact details & socials */}
            <div className="menu-content">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="menu-contact"
              >
                <a href="tel:+0278346236" className="menu-phone">+027 834 6236</a>
                <a href="mailto:hello@norvin.agency" className="menu-email">hello@norvin.agency</a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="menu-socials"
              >
                <a href="#x" aria-label="X"><img src="/assets/social-x.png" alt="X" /></a>
                <a href="#instagram" aria-label="Instagram"><img src="/assets/social-instagram.png" alt="Instagram" /></a>
                <a href="#dribbble" aria-label="Dribbble"><img src="/assets/social-dribbble.png" alt="Dribbble" /></a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="stage">
      <motion.div className="hero" initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.015 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}>
        {/* Background image and its readable dark overlay. Swap the artwork path in styles.css. */}
        <div className="artwork" aria-hidden="true" />
        <div className="shade" aria-hidden="true" />
        {/* Vertical composition rules; they are decorative and can be removed. */}
        <div className="vertical-line first" /><div className="vertical-line second" /><div className="vertical-line third" />
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <BrandTab />
        <Headline />
        <GuideMarks />
        <StudioIntro />
        <RecognitionCard />
        <SocialLinks />
        {/* Target for the top-right CTA until a real contact section is added. */}
        <div id="contact" className="contact-anchor" />
      </motion.div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
