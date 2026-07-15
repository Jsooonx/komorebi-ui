import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const sources = [
  { id: "crm", label: "CRM", copy: "Account history, ready when it matters.", position: "is-crm", focus: "23% 32%", point: [23, 32] },
  { id: "billing", label: "Billing", copy: "The latest payment and renewal state.", position: "is-billing", focus: "29% 80%", point: [29, 80] },
  { id: "knowledge", label: "Knowledge", copy: "Trusted guidance behind every answer.", position: "is-knowledge", focus: "71% 21%", point: [71, 21] },
  { id: "product", label: "Product data", copy: "Live details from the product itself.", position: "is-product", focus: "82% 47%", point: [82, 47] },
  { id: "support", label: "Support history", copy: "The conversation never begins from zero.", position: "is-support", focus: "72% 80%", point: [72, 80] },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const viewport = { once: true, amount: 0.2 };
const transition = { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const };

export default function ConnectedContext() {
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const active = sources.find((source) => source.id === activeSource);

  return (
    <section className="connected-context" id="integrations" aria-labelledby="context-title">
      <motion.div
        className="connected-context__intro"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={reveal}
        transition={transition}
      >
        <p>04 — Connected context</p>
        <h2 id="context-title">Aura sees the systems behind the question.</h2>
      </motion.div>

      <motion.div
        className={`connected-context__visual${active ? " is-tracing" : ""}`}
        initial={{ opacity: 0, scale: 0.975, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={viewport}
        transition={{ ...transition, delay: 0.16 }}
        onMouseLeave={() => setActiveSource(null)}
      >
        <img
          src="/aura-connected-context.png"
          alt="Five connected glass sources flowing into Aura's central context intelligence"
        />
        <div className="connected-context__wash" aria-hidden="true" />
        <motion.div
          className="connected-context__focus"
          aria-hidden="true"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: active
              ? `radial-gradient(circle 220px at ${active.focus}, transparent 0 34%, rgba(15, 48, 31, 0.48) 82%)`
              : undefined,
          }}
        />
        <svg className="connected-context__trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <AnimatePresence initial={false}>
            {active && (
              <motion.g key={active.id}>
                <motion.path
                  d={`M ${active.point[0]} ${active.point[1]} C ${active.point[0]} 50, 42 49, 50 49`}
                  initial={{ pathLength: 0, opacity: 0.35 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  r="1.15"
                  initial={{ cx: active.point[0], cy: active.point[1], opacity: 0 }}
                  animate={{ cx: 50, cy: 49, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
        {sources.map((source, index) => (
          <motion.button
            layout
            className={`connected-context__source ${source.position}${activeSource === source.id ? " is-active" : ""}`}
            type="button"
            key={source.id}
            onMouseEnter={() => setActiveSource(source.id)}
            onFocus={() => setActiveSource(source.id)}
            onClick={() => setActiveSource(source.id)}
            aria-pressed={activeSource === source.id}
            transition={{ type: "spring", stiffness: 290, damping: 26 }}
          >
            {activeSource === source.id && <motion.span className="connected-context__source-highlight" layoutId="aura-context-active-highlight" transition={{ type: "spring", stiffness: 330, damping: 30, mass: 0.52 }} />}
            <span>0{index + 1}</span>
            <b>{source.label}</b>
            <AnimatePresence initial={false}>
              {activeSource === source.id && (
                <motion.small
                  initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  record attached
                </motion.small>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
        <div className="connected-context__core">
          <span>Aura context</span>
          <strong>One complete view</strong>
        </div>
        <motion.p
          className="connected-context__caption"
          key={active?.id ?? "resting"}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {active?.copy ?? "Every source arrives as one calm, usable context layer."}
        </motion.p>
      </motion.div>

      <div className="connected-context__mobile-list" aria-label="Connected Aura sources">
        {sources.map((source, index) => (
          <button
            className={activeSource === source.id ? "is-active" : ""}
            type="button"
            key={source.id}
            onFocus={() => setActiveSource(source.id)}
            onClick={() => setActiveSource(source.id)}
            aria-pressed={activeSource === source.id}
          >
            <span>0{index + 1}</span>
            <b>{source.label}</b>
            <small>{activeSource === source.id ? source.copy : "Tap to trace"}</small>
          </button>
        ))}
      </div>

      <motion.div
        className="connected-context__footer"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={reveal}
        transition={{ ...transition, delay: 0.3 }}
      >
        <p>
          Connect what your team already trusts. Aura assembles the relevant
          record before it decides what to do next.
        </p>
        <span>Hover a source to trace its context.</span>
      </motion.div>
    </section>
  );
}
