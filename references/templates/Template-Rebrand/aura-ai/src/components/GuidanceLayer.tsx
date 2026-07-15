import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const gates = [
  { id: "voice", number: "01", label: "Voice", title: "Clear, calm, and recognisably yours.", copy: "Aura carries your preferred tone through every response without losing the human texture.", status: "Tone held", position: "is-voice", focus: "24% 52%", point: [24, 52] },
  { id: "knowledge", number: "02", label: "Knowledge", title: "Answers stay within approved sources.", copy: "Relevant guidance enters the response only when it is current, trusted, and useful to the moment.", status: "Source bounded", position: "is-knowledge", focus: "50% 52%", point: [50, 52] },
  { id: "escalation", number: "03", label: "Escalation", title: "Sensitive moments reach the right person.", copy: "Aura recognises the boundary, preserves context, and leaves the next conversation ready to continue.", status: "Safety held", position: "is-escalation", focus: "76% 52%", point: [76, 52] },
] as const;

const reveal = { hidden: { opacity: 0, y: 28, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
const viewport = { once: true, amount: 0.2 };
const ease = [0.16, 1, 0.3, 1] as const;
const transition = { duration: 0.78, ease };

export default function GuidanceLayer() {
  const [activeGate, setActiveGate] = useState<string | null>(null);
  const active = gates.find((gate) => gate.id === activeGate);

  return (
    <section className="guidance-layer" id="docs" aria-labelledby="guidance-title">
      <motion.svg className="guidance-layer__incoming-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.28 }}>
        <motion.path d="M 39 0 C 39 25, 34 42, 43 61 C 48 74, 44 88, 39 100" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.72, ease }} />
      </motion.svg>
      <div className="guidance-layer__header">
        <motion.p initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={transition}>05 — Guidance layer</motion.p>
        <motion.h2 id="guidance-title" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ ...transition, delay: 0.1 }}>Intelligence should still sound like you.</motion.h2>
      </div>

      <motion.div className={`guidance-layer__scene${active ? " is-guiding" : ""}`} initial={{ opacity: 0, scale: 0.975, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={viewport} transition={{ ...transition, delay: 0.18 }} onMouseLeave={() => setActiveGate(null)}>
        <img src="/aura-guidance-layer.png" alt="A calm aqua current flowing through three glass guidance gates in a sunlit forest" />
        <div className="guidance-layer__wash" aria-hidden="true" />
        <motion.div className="guidance-layer__focus" aria-hidden="true" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.28, ease }} style={{ background: active ? `radial-gradient(ellipse 250px 270px at ${active.focus}, transparent 0 32%, rgba(20, 47, 31, 0.47) 86%)` : undefined }} />
        <svg className="guidance-layer__trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <AnimatePresence initial={false}>
            {active && <motion.g key={active.id}>
              <motion.path d={`M 3 52 C 23 49, ${active.point[0] - 9} 55, ${active.point[0]} ${active.point[1]}`} initial={{ pathLength: 0, opacity: 0.35 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} />
              <motion.circle r="1.05" initial={{ cx: 3, cy: 52, opacity: 0 }} animate={{ cx: active.point[0], cy: active.point[1], opacity: [0, 1, 1, 0] }} transition={{ duration: 0.56, ease }} />
            </motion.g>}
          </AnimatePresence>
        </svg>
        <div className="guidance-layer__gates" aria-label="Aura guidance principles">
          {gates.map((gate) => <motion.button layout className={`guidance-layer__gate ${gate.position}${activeGate === gate.id ? " is-active" : ""}`} type="button" key={gate.id} onMouseEnter={() => setActiveGate(gate.id)} onFocus={() => setActiveGate(gate.id)} onClick={() => setActiveGate(gate.id)} aria-pressed={activeGate === gate.id} transition={{ type: "spring", stiffness: 290, damping: 26 }}>
            {activeGate === gate.id && <motion.span className="guidance-layer__gate-highlight" layoutId="aura-guidance-active-highlight" transition={{ type: "spring", stiffness: 330, damping: 30, mass: 0.52 }} />}
            <span>{gate.number}</span><b>{gate.label}</b>
            <AnimatePresence initial={false}>{activeGate === gate.id && <motion.small initial={{ width: 0, opacity: 0, filter: "blur(4px)" }} animate={{ width: "auto", opacity: 1, filter: "blur(0px)" }} exit={{ width: 0, opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.22, ease }}>{gate.status}</motion.small>}</AnimatePresence>
          </motion.button>)}
        </div>
      </motion.div>

      <motion.div className="guidance-layer__footer" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ ...transition, delay: 0.28 }}>
        <div className="guidance-layer__resting-copy"><span>One quiet operating layer</span><p>Your guidance shapes the response before it reaches a customer.</p><ul><li>Voice remains recognisable.</li><li>Knowledge remains approved.</li><li>Escalation remains human.</li></ul></div>
        <div className="guidance-layer__detail" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={active?.id ?? "resting"} initial={{ opacity: 0, y: 8, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -6, filter: "blur(5px)" }} transition={{ duration: 0.24, ease }}><span>{active ? `${active.number} / ${active.label}` : "Aura guidance"}</span><strong>{active?.title ?? "The customer meets one considered voice."}</strong><p>{active?.copy ?? "Hover a gate to see how Aura carries your standards through every moment."}</p></motion.div></AnimatePresence></div>
      </motion.div>
    </section>
  );
}
