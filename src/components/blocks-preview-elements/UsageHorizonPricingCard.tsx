import type { ComponentPreviewProps } from "../../lib/components-manifest";
import { motion } from "framer-motion";
import { useState } from "react";

const horizons = [
  { seats: 6, total: 32 },
  { seats: 18, total: 68 },
  { seats: 42, total: 136 },
  { seats: 96, total: 264 },
];

export default function UsageHorizonPricingCard(_: ComponentPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = horizons[activeIndex];

  return (
    <div className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#0a0a0b] p-5 text-white sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="relative mx-auto w-full max-w-[760px]">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
          Usage horizon / 02
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.045em]">
          Price the pace, not the guesswork.
        </h3>
        <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1.08fr_0.92fr]">
          <div className="border border-white/10 bg-white/[0.018] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                  Team horizon
                </p>
                <motion.p
                  key={active.seats}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-3xl font-semibold tracking-[-0.06em]"
                >
                  {active.seats} <span className="text-sm font-medium text-white/45">seats</span>
                </motion.p>
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/36">
                Visible cap
              </span>
            </div>
            <div className="relative mt-7 pb-5 pt-3">
              <div className="absolute left-2 right-2 top-[18px] h-px bg-white/14" />
              <motion.div
                animate={{ width: `${(activeIndex / 3) * 100}%` }}
                transition={{ type: "spring", stiffness: 310, damping: 30 }}
                className="absolute left-2 top-[18px] h-px bg-white/75"
              />
              <div className="relative grid grid-cols-4">
                {horizons.map((horizon, index) => (
                  <button
                    key={horizon.seats}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex flex-col items-center outline-none"
                  >
                    {index === activeIndex ? (
                      <motion.span
                        layoutId="usage-horizon-card-marker"
                        className="absolute top-0 h-4 w-4 rounded-full border border-white/75 bg-[#0a0a0b] shadow-[0_0_0_4px_#0a0a0b]"
                      />
                    ) : (
                      <span className="absolute top-[3px] h-2.5 w-2.5 rounded-full border border-white/25 bg-[#0a0a0b] group-hover:border-white/70" />
                    )}
                    <span className="mt-7 font-mono text-[8px] text-white/36">{horizon.seats}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/56">A clear capacity threshold before it arrives.</p>
          </div>
          <div className="border border-white/15 bg-white/[0.035] p-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
              Monthly shape
            </p>
            <motion.p
              key={active.total}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-4xl font-semibold tracking-[-0.065em]"
            >
              ${active.total}
            </motion.p>
            <p className="mt-2 text-xs leading-relaxed text-white/52">
              Platform access and team capacity, traced in one view.
            </p>
            <div className="mt-5 border-y border-white/10 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
              No surprise overages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
