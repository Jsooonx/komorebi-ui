import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

const usageSteps = [
  {
    seats: 6,
    label: "Small circle",
    total: 32,
    included: "Up to 8 seats",
    forecast: "A calm starting point",
  },
  {
    seats: 18,
    label: "Working team",
    total: 68,
    included: "Up to 24 seats",
    forecast: "The most common rhythm",
  },
  {
    seats: 42,
    label: "Growing practice",
    total: 136,
    included: "Up to 56 seats",
    forecast: "Room for the next layer",
  },
  {
    seats: 96,
    label: "Shared system",
    total: 264,
    included: "Up to 120 seats",
    forecast: "A clear scale path",
  },
];

export default function UsageHorizonPricingElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const active = usageSteps[activeIndex];
  const compact = previewMode === "catalog";

  const select = (next: number) =>
    setActiveIndex(Math.max(0, Math.min(usageSteps.length - 1, next)));

  return (
    <section className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#0a0a0b] px-5 py-8 text-white sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className={`relative mx-auto w-full ${compact ? "max-w-[820px]" : "max-w-5xl"}`}>
        <header
          className={`flex items-end justify-between gap-5 border-b border-white/10 ${compact ? "pb-3" : "pb-4"}`}
        >
          <div>
            <h2
              className={`font-sans font-semibold tracking-[-0.045em] ${compact ? "text-xl" : "text-3xl md:text-4xl"}`}
            >
              Price the pace, not the guesswork.
            </h2>
          </div>
          <p className="hidden max-w-[185px] text-right font-mono text-[9px] uppercase tracking-[0.16em] text-white/28 sm:block">
            Set a team horizon to trace the monthly shape
          </p>
        </header>

        <div
          className={`${compact ? "mt-4 gap-4" : "mt-6 gap-6"} grid md:grid-cols-[1.08fr_0.92fr]`}
        >
          <div
            className={`border border-white/10 bg-white/[0.018] ${compact ? "p-4" : "p-5 md:p-6"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                  Team horizon
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active.seats}
                    initial={
                      reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5, filter: "blur(2px)" }
                    }
                    transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.55 }}
                    className={`${compact ? "mt-2 text-3xl" : "mt-3 text-5xl"} font-semibold tracking-[-0.06em]`}
                  >
                    {active.seats}{" "}
                    <span className="text-base font-medium text-white/45">seats</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex gap-1 border border-white/10 p-1">
                <button
                  type="button"
                  aria-label="Reduce team size"
                  onClick={() => select(activeIndex - 1)}
                  className="grid h-7 w-7 place-items-center text-white/45 transition-colors hover:text-white focus-visible:text-white"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Increase team size"
                  onClick={() => select(activeIndex + 1)}
                  className="grid h-7 w-7 place-items-center text-white/45 transition-colors hover:text-white focus-visible:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="relative mt-7 pb-7 pt-3">
              <div className="absolute left-2 right-2 top-[18px] h-px bg-white/14" />
              <motion.div
                animate={{ width: `${(activeIndex / (usageSteps.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 310, damping: 30, mass: 0.6 }}
                className="absolute left-2 top-[18px] h-px bg-white/75"
              />
              <div className="relative grid grid-cols-4">
                {usageSteps.map((step, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={step.seats}
                      type="button"
                      onClick={() => select(index)}
                      aria-pressed={selected}
                      className="group relative flex flex-col items-center outline-none"
                    >
                      {selected && (
                        <motion.span
                          layoutId="usage-horizon-marker"
                          transition={{ type: "spring", stiffness: 350, damping: 29, mass: 0.5 }}
                          className="absolute top-0 h-4 w-4 rounded-full border border-white/75 bg-[#0a0a0b] shadow-[0_0_0_4px_#0a0a0b]"
                        />
                      )}
                      {!selected && (
                        <span className="absolute top-[3px] h-2.5 w-2.5 rounded-full border border-white/25 bg-[#0a0a0b] transition-colors group-hover:border-white/70" />
                      )}
                      <span className="mt-7 font-mono text-[8px] uppercase tracking-[0.1em] text-white/36">
                        {step.seats}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.label}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -6, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 320, damping: 31, mass: 0.55 }}
              >
                <p className="text-sm font-medium text-white">{active.label}</p>
                <p className="mt-1 text-xs text-white/48">
                  {active.forecast} — {active.included}.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className={`relative overflow-hidden border border-white/15 bg-white/[0.035] ${compact ? "p-4" : "p-5 md:p-6"}`}
          >
            <motion.div
              layoutId="usage-horizon-lens"
              transition={{ type: "spring", stiffness: 300, damping: 31, mass: 0.7 }}
              className="pointer-events-none absolute inset-0 border border-white/25"
            />
            <p className="relative font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              Transparent monthly shape
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.total}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 330, damping: 30, mass: 0.55 }}
                className="relative mt-4"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${compact ? "text-4xl" : "text-5xl"} font-semibold tracking-[-0.065em]`}
                  >
                    ${active.total}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/38">
                    monthly
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/58">
                  $24 platform access + a clear per-seat rate. You can see the next capacity
                  threshold before you reach it.
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="relative mt-5 border-y border-white/10 py-3 text-xs text-white/53">
              <span className="flex justify-between">
                <span>Included capacity</span>
                <span className="text-white">{active.included}</span>
              </span>
              <span className="mt-2 flex justify-between">
                <span>Forecast cap</span>
                <span className="text-white">No surprise overages</span>
              </span>
            </div>
            <span className="relative mt-4 inline-flex items-center gap-2 text-xs font-medium text-white">
              Choose this horizon <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <footer
          className={`${compact ? "mt-4 pt-3" : "mt-5 pt-4"} flex justify-between border-t border-white/10 font-mono text-[8px] uppercase tracking-[0.16em] text-white/28`}
        >
          <span>Value grows with visible capacity</span>
          <span className="hidden sm:block">Komorebi / usage horizon</span>
        </footer>
      </div>
    </section>
  );
}
