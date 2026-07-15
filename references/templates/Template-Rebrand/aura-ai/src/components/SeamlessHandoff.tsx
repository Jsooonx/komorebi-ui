import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const viewport = { once: true, amount: 0.2 };
const transition = { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const };
const recordList = {
  hidden: {},
  visible: { transition: { delayChildren: 0.46, staggerChildren: 0.13 } },
};
const recordItem = {
  hidden: { opacity: 0, x: 18, filter: "blur(5px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition },
};

export default function SeamlessHandoff() {
  return (
    <section className="seamless-handoff" id="automation" aria-labelledby="handoff-title">
      <div className="seamless-handoff__header">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={reveal}
          transition={transition}
        >
          03 — Human continuity
        </motion.p>
        <motion.h2
          id="handoff-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={reveal}
          transition={{ ...transition, delay: 0.1 }}
        >
          When a human steps in, nothing starts over.
        </motion.h2>
      </div>

      <motion.figure
        className="seamless-handoff__scene"
        initial={{ opacity: 0, scale: 0.975, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={viewport}
        transition={{ ...transition, delay: 0.2 }}
      >
        <img
          src="/assets/aura/aura-seamless-handoff.png"
          alt="Two connected glass forms carrying one continuous signal through a sunlit forest"
        />
        <div className="seamless-handoff__scene-wash" aria-hidden="true" />
        <div className="seamless-handoff__origin">
          <span>Aura</span>
          <strong>Intent held</strong>
        </div>
        <div className="seamless-handoff__bridge">
          <span>Context stays whole</span>
        </div>
        <div className="seamless-handoff__recipient">
          <span>Specialist</span>
          <strong>Ready to continue</strong>
        </div>
      </motion.figure>

      <div className="seamless-handoff__bottom">
        <motion.p
          className="seamless-handoff__copy"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={reveal}
          transition={{ ...transition, delay: 0.34 }}
        >
          Aura carries intent, account history, urgency, and the next best action forward—so the
          customer never has to repeat themselves.
        </motion.p>
        <motion.ul
          className="seamless-handoff__record"
          aria-label="Context carried into a handoff"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={recordList}
        >
          <motion.li variants={recordItem}>
            <span>01</span> Customer intent
          </motion.li>
          <motion.li variants={recordItem}>
            <span>02</span> Account context
          </motion.li>
          <motion.li variants={recordItem}>
            <span>03</span> Suggested next action
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
