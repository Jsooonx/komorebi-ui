import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const viewport = { once: true, amount: 0.25 };
const transition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const };

export default function AuraFooter() {
  return (
    <footer className="aura-footer" aria-label="Aura footer">
      <motion.div className="aura-footer__top" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={transition}>
        <div className="aura-footer__brand"><span className="aura-footer__mark" aria-hidden="true">✦</span><div><strong>Aura</strong><p>A more considered way to support customers.</p></div></div>
        <nav className="aura-footer__links" aria-label="Footer navigation">
          <div><span>Product</span><a href="#widget">Widget</a><a href="#integrations">Context</a><a href="#docs">Guidance</a></div>
          <div><span>Company</span><a href="#automation">Approach</a><a href="#contact">Contact</a><a href="#pricing">Journal</a></div>
        </nav>
        <button className="aura-footer__cta" type="button">Request a demo <span>↗</span></button>
      </motion.div>
      <motion.div className="aura-footer__bottom" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ ...transition, delay: 0.1 }}>
        <span>© 2026 Aura Systems</span><span>All systems considered.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
      </motion.div>
    </footer>
  );
}
