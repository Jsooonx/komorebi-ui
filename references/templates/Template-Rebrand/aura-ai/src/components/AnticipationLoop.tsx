import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const moments = [
  { id: "friction", number: "01", label: "Friction noticed", title: "The smallest signal can be enough.", copy: "Aura notices the change in behaviour before a customer has to translate it into a support request.", status: "Pattern recognised", position: "is-friction", focus: "22% 60%", point: [22, 60] },
  { id: "guidance", number: "02", label: "Guidance arrives", title: "Helpful context meets the moment early.", copy: "A clear next step can arrive while the customer is still moving, not after they have stopped to ask.", status: "Guidance prepared", position: "is-guidance", focus: "55% 51%", point: [55, 51] },
  { id: "momentum", number: "03", label: "Momentum protected", title: "The customer keeps their momentum.", copy: "When the path stays clear, support becomes part of the experience rather than an interruption to it.", status: "Path protected", position: "is-momentum", focus: "83% 40%", point: [83, 40] },
] as const;

const reveal = { hidden: { opacity: 0, y: 28, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
const viewport = { once: true, amount: 0.2 };
const ease = [0.16, 1, 0.3, 1] as const;
const transition = { duration: 0.78, ease };

export default function AnticipationLoop() {
  const [activeMoment, setActiveMoment] = useState<string | null>(null);
  const active = moments.find((moment) => moment.id === activeMoment);

  return (
    <section className="anticipation-loop" id="pricing" aria-labelledby="anticipation-title">
      <div className="anticipation-loop__header">
        <motion.p initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={transition}>06 — Anticipation loop</motion.p>
        <motion.h2 id="anticipation-title" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ ...transition, delay: 0.1 }}>The best support often starts before a ticket.</motion.h2>
      </div>

      <motion.div className={`anticipation-loop__scene${active ? " is-tracing" : ""}`} initial={{ opacity: 0, scale: 0.975, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={viewport} transition={{ ...transition, delay: 0.18 }} onMouseLeave={() => setActiveMoment(null)}>
        <img src="/aura-anticipation-loop.png" alt="An aqua support current travelling through three early customer moments in a sunlit forest" />
        <div className="anticipation-loop__wash" aria-hidden="true" />
        <motion.div className="anticipation-loop__focus" aria-hidden="true" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.28, ease }} style={{ background: active ? `radial-gradient(circle 230px at ${active.focus}, transparent 0 32%, rgba(16, 49, 32, 0.5) 86%)` : undefined }} />
        <svg className="anticipation-loop__trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <AnimatePresence initial={false}>
            {active && <motion.g key={active.id}>
              <motion.path d={`M 2 70 C 30 67, 40 58, ${active.point[0]} ${active.point[1]}`} initial={{ pathLength: 0, opacity: 0.35 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} />
              <motion.circle r="1.05" initial={{ cx: 2, cy: 70, opacity: 0 }} animate={{ cx: active.point[0], cy: active.point[1], opacity: [0, 1, 1, 0] }} transition={{ duration: 0.56, ease }} />
            </motion.g>}
          </AnimatePresence>
        </svg>
        <div className="anticipation-loop__moments" aria-label="Proactive support moments">
          {moments.map((moment) => <motion.button layout className={`anticipation-loop__moment ${moment.position}${activeMoment === moment.id ? " is-active" : ""}`} type="button" key={moment.id} onMouseEnter={() => setActiveMoment(moment.id)} onFocus={() => setActiveMoment(moment.id)} onClick={() => setActiveMoment(moment.id)} aria-pressed={activeMoment === moment.id} transition={{ type: "spring", stiffness: 290, damping: 26 }}>
            {activeMoment === moment.id && <motion.span className="anticipation-loop__moment-highlight" layoutId="aura-anticipation-active-highlight" transition={{ type: "spring", stiffness: 330, damping: 30, mass: 0.52 }} />}
            <span>{moment.number}</span><b>{moment.label}</b>
            <AnimatePresence initial={false}>{activeMoment === moment.id && <motion.small initial={{ width: 0, opacity: 0, filter: "blur(4px)" }} animate={{ width: "auto", opacity: 1, filter: "blur(0px)" }} exit={{ width: 0, opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.22, ease }}>{moment.status}</motion.small>}</AnimatePresence>
          </motion.button>)}
        </div>
        <div className="anticipation-loop__scene-note" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={active?.id ?? "resting"} initial={{ opacity: 0, y: 7, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -5, filter: "blur(4px)" }} transition={{ duration: 0.22, ease }}><span>{active ? `${active.number} / ${active.label}` : "Aura anticipation"}</span><strong>{active?.title ?? "A quieter path to resolution."}</strong><p>{active?.copy ?? "Hover a moment to see how Aura turns an early signal into a helpful next step."}</p></motion.div></AnimatePresence></div>
      </motion.div>

      <motion.div className="anticipation-loop__footer" initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} transition={{ ...transition, delay: 0.28 }}>
        <p>Aura gets ahead of known friction so customers can stay focused on what they came to do.</p>
        <ol>{moments.map((moment) => <li className={activeMoment === moment.id ? "is-active" : ""} key={moment.id}><span>{moment.number}</span><strong>{moment.label}</strong><small>{moment.status}</small></li>)}</ol>
      </motion.div>
    </section>
  );
}
