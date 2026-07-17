import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { createRoot } from "react-dom/client";
import { projects, Project } from "./data/projects";
import "./styles.css";

// Shared entrance state for the smaller hero elements.
const rise = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

// Stagger animation variants for logo lists and social icons.
const logoContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.66,
    }
  }
};

const logoItemVariants = {
  initial: { opacity: 0, scale: 0.8, y: 12 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const socialsContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.82,
    }
  }
};

const socialItemVariants = {
  initial: { opacity: 0, scale: 0.8, y: 15 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
  }
};

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
    <motion.a href="#" className="brand-tab" initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      <span className="brand-mark">✦</span>Lumenfold
    </motion.a>
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
      <motion.div 
        variants={logoContainerVariants} 
        initial="initial"
        animate="animate"
        className="faces" 
        aria-label="Studio brand marks"
      >
        <motion.span variants={logoItemVariants} className="logo-1"><img src="/assets/logo-1.png" alt="Logo 1" /></motion.span>
        <motion.span variants={logoItemVariants} className="logo-2"><img src="/assets/logo-2.png" alt="Logo 2" /></motion.span>
        <motion.span variants={logoItemVariants} className="logo-3"><img src="/assets/logo-3.png" alt="Logo 3" /></motion.span>
      </motion.div>
      <div className="count"><strong>24</strong><small>launches</small></div>
      <p>We shape identities and digital spaces with a sense of movement, clarity, and material depth.</p>
      <a className="story" href="#/works">
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
    <motion.nav 
      variants={socialsContainerVariants} 
      initial="initial"
      animate="animate"
      className="socials" 
      aria-label="Social links"
    >
      <motion.a variants={socialItemVariants} href="#x" aria-label="X"><img src="/assets/social-x.png" alt="X" /></motion.a>
      <motion.a variants={socialItemVariants} href="#instagram" aria-label="Instagram"><img src="/assets/social-instagram.png" alt="Instagram" /></motion.a>
      <motion.a variants={socialItemVariants} href="#dribbble" aria-label="Dribbble"><img src="/assets/social-dribbble.png" alt="Dribbble" /></motion.a>
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

            <motion.nav
              className="menu-navigation"
              aria-label="Primary navigation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#/works" onClick={onClose}>
                <span>Work</span>
                <span aria-hidden="true">↗</span>
              </a>
            </motion.nav>

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

function CaseStudyModal({ project }: { project: Project }) {
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="case-study-overlay"
      onClick={() => window.location.hash = "#/works"}
    >
      <motion.div 
        layoutId={`project-card-${project.id}`}
        className="case-study-modal"
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="case-study-grid">
          {/* Left / Top Side: Large Image */}
          <div className="case-study-media">
            <motion.img 
              src={project.image} 
              alt={project.title} 
              layoutId={`project-image-${project.id}`}
              className="case-study-image"
            />
          </div>

          {/* Right / Bottom Side: Case Study Details */}
          <div className="case-study-details">
            <button 
              className="case-study-close" 
              onClick={() => window.location.hash = "#/works"}
              aria-label="Close case study"
            >
              ✕
            </button>
            <div className="case-study-meta">
              <div className="meta-item">
                <span className="meta-label">Client</span>
                <span className="meta-val">{project.client}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Year</span>
                <span className="meta-val">{project.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-val">{project.category}</span>
              </div>
            </div>
            <h2 className="case-study-title">{project.title}</h2>
            <p className="case-study-desc">{project.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WorksPage({ activeProjectId }: { activeProjectId: string | null }) {
  const [filter, setFilter] = useState("All");
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const gridContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="works-wrapper">
      {/* Floating Sidebar Filter */}
      <nav className="floating-filter" aria-label="Project categories">
        {["All", "Branding", "Editorial", "3D Art", "Digital"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Bento Grid */}
      <motion.div 
        variants={gridContainerVariants}
        initial="initial"
        animate="animate"
        className="bento-grid"
        layout
      >
        {filteredProjects.map((project) => (
          <motion.a
            key={project.id}
            href={`#/works/${project.id}`}
            variants={cardVariants}
            layoutId={`project-card-${project.id}`}
            className={`bento-card bento-${project.gridSize}`}
            style={{ originY: 0 }}
          >
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="bento-image"
              layoutId={`project-image-${project.id}`}
            />
            <div className="bento-card-overlay" />
            <div className="bento-card-info">
              <span className="bento-category">{project.category}</span>
              <h3 className="bento-title">{project.title}</h3>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Case Study Detail Modal (morphing open) */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal project={activeProject} />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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

  const isWorks = currentHash.startsWith("#/works");
  let activeProjectId: string | null = null;
  if (isWorks) {
    const match = currentHash.match(/^#\/works\/([^/]+)$/);
    if (match) activeProjectId = match[1];
  }

  return (
    <main className="stage">
      <AnimatePresence mode="wait">
        {!isWorks ? (
          <motion.div 
            key="landing"
            className="hero" 
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.015 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.985 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="artwork" aria-hidden="true" />
            <div className="shade" aria-hidden="true" />
            <div className="vertical-line first" /><div className="vertical-line second" /><div className="vertical-line third" />
            
            <Topbar onMenuClick={() => setMenuOpen(true)} />
            <BrandTab />
            <Headline />
            <GuideMarks />
            <StudioIntro />
            <RecognitionCard />
            <SocialLinks />
            <div id="contact" className="contact-anchor" />
          </motion.div>
        ) : (
          <motion.div
            key="works"
            className="hero works-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="artwork works-artwork" aria-hidden="true" />
            <div className="shade" aria-hidden="true" />
            
            <Topbar onMenuClick={() => setMenuOpen(true)} />
            <BrandTab />
            <WorksPage activeProjectId={activeProjectId} />
          </motion.div>
        )}
      </AnimatePresence>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
