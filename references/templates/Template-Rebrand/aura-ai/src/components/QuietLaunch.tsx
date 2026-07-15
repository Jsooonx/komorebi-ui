import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const proofMarks = [
  { id: "knowledge", number: "01", label: "Trusted knowledge", detail: "Connected and bounded", position: "is-knowledge" },
  { id: "handoff", number: "02", label: "Human handoff", detail: "Prepared to continue", position: "is-handoff" },
  { id: "channel", number: "03", label: "First channel", detail: "Ready when you are", position: "is-channel" },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;
const reveal = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
const viewport = { once: true, amount: 0.2 };

export default function QuietLaunch() {
  const [activeMark, setActiveMark] = useState<string | null>(null);
  const active = proofMarks.find((mark) => mark.id === activeMark);

  return (
    <section className="quiet-launch" id="contact" aria-labelledby="quiet-launch-title">
      <motion.div className={`quiet-launch__scene${active ? " is-active" : ""}`} initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={viewport} transition={{ duration: 0.82, ease }} onMouseLeave={() => setActiveMark(null)}>
        <img src="/aura-quiet-launch.png" alt="A calm glass threshold carrying Aura's signal through a sunlit forest clearing" />
        <div className="quiet-launch__wash" aria-hidden="true" />
        <motion.div className="quiet-launch__threshold-glow" aria-hidden="true" animate={{ opacity: active ? 1 : 0.28, scale: active ? 1.08 : 1 }} transition={{ duration: 0.34, ease }} />
        <div className="quiet-launch__intro">
          <motion.p initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ duration: 0.72, ease }}>07 — Quiet launch</motion.p>
          <motion.h2 id="quiet-launch-title" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ duration: 0.78, delay: 0.08, ease }}>Start with one conversation. Let it earn the next.</motion.h2>
        </div>
        <div className="quiet-launch__marks" aria-label="Launch readiness checks">
          {proofMarks.map((mark) => <motion.button layout type="button" key={mark.id} className={`quiet-launch__mark ${mark.position}${activeMark === mark.id ? " is-active" : ""}`} onMouseEnter={() => setActiveMark(mark.id)} onFocus={() => setActiveMark(mark.id)} onClick={() => setActiveMark(mark.id)} aria-pressed={activeMark === mark.id} transition={{ type: "spring", stiffness: 290, damping: 26 }}>{activeMark === mark.id && <motion.span className="quiet-launch__mark-highlight" layoutId="aura-launch-active-highlight" transition={{ type: "spring", stiffness: 330, damping: 30, mass: 0.52 }} />}<span>{mark.number}</span><b>{mark.label}</b><AnimatePresence initial={false}>{activeMark === mark.id && <motion.small initial={{ opacity: 0, width: 0, filter: "blur(4px)" }} animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }} exit={{ opacity: 0, width: 0, filter: "blur(4px)" }} transition={{ duration: 0.22, ease }}>{mark.detail}</motion.small>}</AnimatePresence></motion.button>)}
        </div>
        <motion.p className="quiet-launch__active" key={active?.id ?? "resting"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease }}>{active?.detail ?? "A considered rollout, not a leap of faith."}</motion.p>
      </motion.div>
      <motion.div className="quiet-launch__cta" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ duration: 0.76, ease, delay: 0.14 }}>
        <p>Bring your knowledge, your standards, and one customer moment worth improving.</p>
        <button type="button">Plan your first conversation <span>↗</span></button>
      </motion.div>
    </section>
  );
}
