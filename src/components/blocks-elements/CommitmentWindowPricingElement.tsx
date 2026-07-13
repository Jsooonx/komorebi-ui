import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type Cadence = "monthly" | "annual";

const options = {
  monthly: {
    label: "Monthly",
    eyebrow: "Keep the door open",
    price: "$54",
    cadence: "paid each month",
    summary: "A light commitment for teams still finding their operating rhythm.",
    terms: ["Cancel before the next cycle", "Full Studio access", "Upgrade whenever the work asks"],
    note: "Flexible by default",
  },
  annual: {
    label: "Annual",
    eyebrow: "Reserve the runway",
    price: "$486",
    cadence: "paid once today",
    summary: "Twelve calm months of Studio, with the commitment reflected in the price.",
    terms: [
      "Save $162 across the year",
      "Priority onboarding window",
      "A fixed rate through renewal",
    ],
    note: "Three months held back",
  },
};

export default function CommitmentWindowPricingElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const [active, setActive] = useState<Cadence>("annual");
  const reducedMotion = useReducedMotion();
  const compact = previewMode === "catalog";
  const selection = options[active];

  return (
    <section className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#e9e6de] px-5 py-8 text-[#171716] sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(23,23,22,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,22,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className={`relative mx-auto w-full ${compact ? "max-w-[830px]" : "max-w-5xl"}`}>
        <header className="flex items-end justify-between gap-5 border-b border-black/15 pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">
              Commitment window
            </p>
            <h2
              className={`mt-2 font-serif tracking-[-0.055em] ${compact ? "text-3xl" : "text-5xl md:text-6xl"}`}
            >
              Choose the time you want to hold.
            </h2>
          </div>
          <p className="hidden max-w-[170px] text-right font-mono text-[8px] uppercase tracking-[0.16em] text-black/43 sm:block">
            A pricing decision with the trade-off in view
          </p>
        </header>

        <div
          className={`${compact ? "mt-5 gap-4" : "mt-7 gap-7"} grid lg:grid-cols-[0.88fr_1.12fr]`}
        >
          <div className="grid grid-cols-2 gap-2 self-start border-b border-black/15 pb-4 lg:grid-cols-1 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            {(Object.keys(options) as Cadence[]).map((key, index) => {
              const option = options[key];
              const selected = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  aria-pressed={selected}
                  className="relative min-h-28 overflow-hidden border border-black/15 px-4 py-4 text-left outline-none transition-colors hover:border-black/40 focus-visible:border-black/65"
                >
                  {selected && (
                    <motion.span
                      layoutId="commitment-window-selection"
                      transition={{ type: "spring", stiffness: 370, damping: 32, mass: 0.55 }}
                      className="absolute inset-0 border-2 border-[#171716] bg-[#171716]/[0.035]"
                    />
                  )}
                  <span className="relative font-mono text-[9px] uppercase tracking-[0.16em] text-black/45">
                    0{index + 1} / term
                  </span>
                  <span className="relative mt-4 block text-xl font-medium tracking-[-0.04em]">
                    {option.label}
                  </span>
                  <span className="relative mt-1 block text-xs text-black/54">
                    {option.eyebrow}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[300px] overflow-hidden border border-black/20 bg-[#f4f1ea] p-5 shadow-[10px_10px_0_rgba(23,23,22,0.1)] md:p-7">
            <div className="absolute left-0 top-0 h-2 w-20 bg-[#171716]" />
            <div className="flex items-start justify-between gap-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/48">
                Studio / commitment
              </p>
              <motion.p
                layout="position"
                className="text-right font-mono text-[9px] uppercase tracking-[0.15em] text-black/45"
              >
                {selection.note}
              </motion.p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(3px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -7, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 310, damping: 29, mass: 0.55 }}
              >
                <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.18em] text-black/48">
                  {selection.eyebrow}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className={`${compact ? "text-5xl" : "text-6xl"} font-serif tracking-[-0.07em]`}
                  >
                    {selection.price}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/45">
                    {selection.cadence}
                  </span>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-black/65">
                  {selection.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-black/12 pt-4">
                  {selection.terms.map((term) => (
                    <li key={term} className="flex items-center gap-2 text-xs text-black/65">
                      <Check className="h-3.5 w-3.5" />
                      {term}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold">
              Hold this window <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div
          className={`${compact ? "mt-5" : "mt-7"} overflow-hidden border-y border-black/15 py-3`}
        >
          <div className="flex items-center gap-1.5">
            <span className="mr-3 font-mono text-[8px] uppercase tracking-[0.16em] text-black/44">
              12 month line
            </span>
            {Array.from({ length: 12 }, (_, index) => (
              <motion.span
                key={index}
                animate={{
                  backgroundColor:
                    active === "annual" || index === 0 ? "#171716" : "rgba(23,23,22,0.18)",
                  scaleY: active === "annual" ? 1 : index === 0 ? 1 : 0.55,
                }}
                transition={{ delay: reducedMotion ? 0 : index * 0.018, duration: 0.2 }}
                className="h-3 flex-1 origin-center"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
