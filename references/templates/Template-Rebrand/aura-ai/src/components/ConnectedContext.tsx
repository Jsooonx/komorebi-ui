import { motion } from "framer-motion";
import { useState } from "react";

const sources = [
  { id: "crm", label: "CRM", copy: "Account history, ready when it matters.", position: "is-crm" },
  { id: "billing", label: "Billing", copy: "The latest payment and renewal state.", position: "is-billing" },
  { id: "knowledge", label: "Knowledge", copy: "Trusted guidance behind every answer.", position: "is-knowledge" },
  { id: "product", label: "Product data", copy: "Live details from the product itself.", position: "is-product" },
  { id: "support", label: "Support history", copy: "The conversation never begins from zero.", position: "is-support" },
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
        className="connected-context__visual"
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
        {sources.map((source, index) => (
          <button
            className={`connected-context__source ${source.position}${activeSource === source.id ? " is-active" : ""}`}
            type="button"
            key={source.id}
            onMouseEnter={() => setActiveSource(source.id)}
            onFocus={() => setActiveSource(source.id)}
            onClick={() => setActiveSource(source.id)}
            aria-pressed={activeSource === source.id}
          >
            <span>0{index + 1}</span>
            {source.label}
          </button>
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
