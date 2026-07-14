import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const entrance = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const entranceViewport = { once: true, amount: 0.22 };
const entranceTransition = { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const };

const stages = [
  {
    id: "signal",
    label: "Signal",
    eyebrow: "Incoming request",
    title: "Listen before the queue fills.",
    copy: "Aura identifies intent, urgency, and the customer behind every message before a response is composed.",
    detail: "Intent recognised",
  },
  {
    id: "context",
    label: "Context",
    eyebrow: "Relevant memory",
    title: "Bring the right history into view.",
    copy: "Past conversations, account details, and your operating knowledge meet in one calm decision layer.",
    detail: "Context assembled",
  },
  {
    id: "resolve",
    label: "Resolve",
    eyebrow: "Confident outcome",
    title: "Resolve with a clear next move.",
    copy: "Aura takes the approved path, or carries the full record forward when a person should step in.",
    detail: "Resolution ready",
  },
] as const;

export default function ResolutionRelay() {
  const [activeStage, setActiveStage] = useState(0);
  const active = stages[activeStage];

  return (
    <section className="resolution-relay" id="widget" aria-labelledby="relay-title">
      <div className="resolution-relay__glow" aria-hidden="true" />
      <motion.div
        className="resolution-relay__header"
        initial="hidden"
        whileInView="visible"
        viewport={entranceViewport}
        variants={entrance}
        transition={entranceTransition}
      >
        <p className="resolution-relay__kicker">02 — Resolution relay</p>
        <h2 id="relay-title">Every answer starts with context.</h2>
        <p>
          A quiet system for moving customer signals from first contact to a
          confident outcome.
        </p>
      </motion.div>

      <div className="resolution-relay__stage" onMouseLeave={() => setActiveStage(0)}>
        <motion.div
          className="resolution-relay__request"
          aria-label="Incoming customer signal"
          initial="hidden"
          whileInView="visible"
          viewport={entranceViewport}
          variants={entrance}
          transition={{ ...entranceTransition, delay: 0.1 }}
        >
          <span className="resolution-relay__request-dot" />
          <span>Subscription renewal is tomorrow. Can we update the billing contact?</span>
          <small>Incoming signal</small>
        </motion.div>

        <motion.div
          className="resolution-relay__path"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={entranceViewport}
          transition={{ ...entranceTransition, delay: 0.22 }}
        >
          <span className="resolution-relay__path-line" />
          <motion.span
            className="resolution-relay__pulse"
            animate={{ left: `${activeStage * 50}%` }}
            transition={{ type: "spring", stiffness: 165, damping: 23 }}
          />
        </motion.div>

        <motion.div
          className="resolution-relay__controls"
          aria-label="Resolution stages"
          initial="hidden"
          whileInView="visible"
          viewport={entranceViewport}
          variants={entrance}
          transition={{ ...entranceTransition, delay: 0.22 }}
        >
          {stages.map((stage, index) => {
            const isActive = activeStage === index;
            return (
              <button
                className={`resolution-relay__control${isActive ? " is-active" : ""}`}
                key={stage.id}
                type="button"
                onFocus={() => setActiveStage(index)}
                onMouseEnter={() => setActiveStage(index)}
                onClick={() => setActiveStage(index)}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    className="resolution-relay__control-active"
                    layoutId="aura-resolution-active"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                )}
                <span className="resolution-relay__control-index">0{index + 1}</span>
                <span>{stage.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          className="resolution-relay__detail"
          aria-live="polite"
          initial="hidden"
          whileInView="visible"
          viewport={entranceViewport}
          variants={entrance}
          transition={{ ...entranceTransition, delay: 0.34 }}
        >
          <span className="resolution-relay__detail-mark" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="resolution-relay__detail-eyebrow">{active.eyebrow}</p>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
            </motion.div>
          </AnimatePresence>
          <span className="resolution-relay__detail-status">{active.detail}</span>
        </motion.div>

        <motion.div
          className="resolution-relay__outcome"
          initial="hidden"
          whileInView="visible"
          viewport={entranceViewport}
          variants={entrance}
          transition={{ ...entranceTransition, delay: 0.46 }}
        >
          <img
            className="resolution-relay__outcome-art"
            src="/aura-resolution-relay.png"
            alt="An abstract Aura signal resolving into a luminous loop"
          />
          <div className="resolution-relay__outcome-copy">
            <span>Outcome</span>
            <strong>Resolved with continuity</strong>
            <small>Or handed to the right person with the full record intact.</small>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
