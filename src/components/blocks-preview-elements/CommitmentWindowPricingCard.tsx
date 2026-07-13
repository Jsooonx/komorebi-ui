import { motion } from "framer-motion";
import { useState } from "react";
import type { ComponentPreviewProps } from "../../lib/components-manifest";

const options = {
  monthly: { price: "$54", note: "Flexible by default" },
  annual: { price: "$486", note: "Three months held back" },
};

export default function CommitmentWindowPricingCard(_: ComponentPreviewProps) {
  const [active, setActive] = useState<keyof typeof options>("annual");
  return (
    <div className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#e9e6de] p-6 text-[#171716]">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(23,23,22,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,22,0.06)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative mx-auto w-full max-w-[760px]">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/45">
          Commitment window
        </p>
        <h3 className="mt-2 font-serif text-3xl tracking-[-0.055em]">
          Choose the time you want to hold.
        </h3>
        <div className="mt-5 grid gap-3 border-t border-black/15 pt-4 sm:grid-cols-[0.72fr_1.28fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className="relative border border-black/15 p-3 text-left outline-none hover:border-black/40"
              >
                {active === key && (
                  <motion.span
                    layoutId="commitment-window-card-selection"
                    className="absolute inset-0 border-2 border-[#171716] bg-[#171716]/[0.035]"
                  />
                )}
                <span className="relative text-sm font-medium capitalize">{key}</span>
              </button>
            ))}
          </div>
          <div className="border border-black/20 bg-[#f4f1ea] p-4 shadow-[7px_7px_0_rgba(23,23,22,0.1)]">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/45">
              Studio / commitment
            </p>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 font-serif text-5xl tracking-[-0.07em]"
            >
              {options[active].price}
            </motion.p>
            <p className="mt-2 text-xs text-black/60">{options[active].note}</p>
            <div className="mt-6 flex gap-1">
              {Array.from({ length: 12 }, (_, index) => (
                <span
                  key={index}
                  className={`h-3 flex-1 ${active === "annual" || index === 0 ? "bg-[#171716]" : "bg-black/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
