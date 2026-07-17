import { motion, useReducedMotion } from "framer-motion";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rise = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };
const Arrow = () => <span aria-hidden="true">↗</span>;

function App() {
  const reducedMotion = useReducedMotion();
  return <main className="stage"><motion.div className="hero" initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.015 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}>
    <div className="artwork" aria-hidden="true" /><div className="shade" aria-hidden="true" /><div className="vertical-line first" /><div className="vertical-line second" /><div className="vertical-line third" />
    <header className="topbar"><motion.button {...rise} transition={{ delay: .15 }} className="menu-button"><span className="menu-icon"><i /><i /><i /></span><span>Index</span></motion.button><motion.p {...rise} transition={{ delay: .22 }} className="location">Copenhagen, DK&nbsp; · &nbsp;08:41</motion.p><motion.a {...rise} transition={{ delay: .3 }} className="project-link" href="#contact">Start a brief <Arrow /></motion.a></header>
    <motion.div className="brand-tab" initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .25, duration: .55, ease: [0.16, 1, 0.3, 1] }}><span className="brand-mark">✦</span>Lumenfold</motion.div>
    <section className="headline"><motion.h1 initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32, duration: .75, ease: [0.16, 1, 0.3, 1] }}>Lumenfold</motion.h1><motion.p {...rise} transition={{ delay: .54 }}>Digital<br />Atelier</motion.p></section>
    <div className="crosses" aria-hidden="true"><b>+</b><b>+</b><b>+</b></div>
    <motion.section {...rise} transition={{ delay: .66 }} className="intro"><div className="faces" aria-label="Portraits of studio team members"><span>KA</span><span>MJ</span><span>RO</span></div><div className="count"><strong>24</strong><small>launches</small></div><p>We shape identities and digital spaces with a sense of movement, clarity, and material depth.</p><a className="story" href="#story">Enter the studio <Arrow /></a></motion.section>
    <motion.aside {...rise} transition={{ delay: .74 }} className="recognition"><span className="stars">✦ ✦ ✦ ✦ ✦</span><h2>DESIGN<br />ARCHIVE<br /><em>SELECTED ’26</em></h2><p>Independent<br />studio practice.</p></motion.aside>
    <motion.nav {...rise} transition={{ delay: .82 }} className="socials" aria-label="Social links"><a href="#x">X</a><a href="#instagram">◎</a><a href="#dribbble">◌</a></motion.nav><div id="contact" className="contact-anchor" />
  </motion.div></main>;
}
createRoot(document.getElementById("root")!).render(<App />);
