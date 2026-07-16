import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  { title: "Verdant Relay", image: "/assets/portfolio/verdant-relay.png", className: "relay", rotate: 8 },
  { title: "Soft Signal", image: "/assets/portfolio/soft-signal.png", className: "signal", rotate: -4 },
  { title: "Night Index", image: "/assets/portfolio/night-index.png", className: "index", rotate: 5 },
  { title: "Tide Form", image: "/assets/portfolio/tide-form.png", className: "tide", rotate: -8 },
];

const ease = [0.16, 1, 0.3, 1] as const;

function BrandMark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark${small ? " small" : ""}`} aria-hidden="true"><Sparkles size={small ? 13 : 17} strokeWidth={1.8} /></span>;
}

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="page-shell">
      <div className="page-grid" aria-hidden="true" />

      <motion.nav
        className="site-nav"
        aria-label="Primary navigation"
        initial={reducedMotion ? false : { opacity: 0, y: -14, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.65, ease }}
      >
        <a className="nav-brand" href="#top"><BrandMark small /><span>Morrow</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#notes">Notes</a></div>
        <a className="nav-contact" href="mailto:hello@morrow.studio">Contact</a>
      </motion.nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <motion.p className="availability" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.14, ease }}><span /> Taking select work for October</motion.p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(7px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.75, delay: 0.22, ease }}><span>Ideas with</span> <strong>real pull.</strong></motion.h1>
          <motion.p className="intro" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.36, ease }}><b>Strategic design that earns attention and keeps it.</b> We shape identities, digital experiences, and the systems that make them stick.</motion.p>
          <motion.a className="hero-cta" href="mailto:hello@morrow.studio" initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 0.46 }}><BrandMark small /> <span>Plan a project</span> <ArrowUpRight size={15} /></motion.a>
        </div>

        <div className="portfolio-stack" aria-label="Selected Morrow work">
          {projects.map((project, index) => <motion.figure key={project.title} className={`portfolio-card ${project.className}`} initial={reducedMotion ? false : { opacity: 0, scale: 0.91, x: 34, y: 30, rotate: project.rotate - 5 }} animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: project.rotate }} transition={{ duration: 0.72, delay: 0.22 + index * 0.11, ease }} whileHover={reducedMotion ? undefined : { y: -11, scale: 1.018, transition: { duration: 0.25, ease } }}><img src={project.image} alt={`${project.title} portfolio artwork`} /></motion.figure>)}
        </div>
      </section>

      <motion.div className="proof-bar" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.7 }}>
        <div className="avatar-group" aria-hidden="true"><i>R</i><i>A</i><i>K</i><i>N</i><i>M</i></div>
        <div className="proof-copy"><span className="stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span><span>120+ partners worldwide</span></div>
      </motion.div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
