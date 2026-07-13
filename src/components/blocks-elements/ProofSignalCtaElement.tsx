import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

export default function ProofSignalCtaElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const compact = previewMode === "catalog";
  return (
    <section className="flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#15120f] p-5 text-[#f6f0e5] sm:p-8 md:p-12">
      <div
        className={`relative mx-auto w-full overflow-hidden border border-[#f6f0e5]/20 bg-[#1c1814] ${compact ? "max-w-[860px]" : "max-w-6xl"}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(246,240,229,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(246,240,229,.045)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className={`${compact ? "p-6" : "p-8 md:p-12"} relative`}>
          <div className="flex justify-between border-b border-[#f6f0e5]/15 pb-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#f6f0e5]/45">
            <span>Proof signal</span>
            <span>Outcome / 04</span>
          </div>
          <div
            className={`${compact ? "py-10" : "py-16 md:py-20"} grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end`}
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#e6ab61]">
                A decision with evidence behind it
              </p>
              <h2
                className={`${compact ? "mt-4 text-4xl" : "mt-5 text-5xl md:text-6xl"} max-w-xl font-serif leading-[.92] tracking-[-.065em]`}
              >
                Let the next move carry its own proof.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#f6f0e5]/63">
                One deliberate system can give the work enough shape to stay visible, shareable, and
                ready for the next review.
              </p>
              <motion.button
                type="button"
                onClick={() => setActive((current) => !current)}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-3 border border-[#e6ab61] bg-[#e6ab61] px-5 py-3 text-sm font-semibold text-[#21180f] transition-colors hover:bg-[#f6f0e5]"
              >
                {active ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                {active ? "The next review is in view" : "Bring the work into view"}
              </motion.button>
            </div>
            <div className="relative border-l border-[#f6f0e5]/15 pl-6 md:pl-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active ? "active" : "rest"}
                  initial={
                    reducedMotion ? { opacity: 0 } : { opacity: 0, x: 14, filter: "blur(3px)" }
                  }
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -9 }}
                  transition={{ type: "spring", stiffness: 280, damping: 29 }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#f6f0e5]/45">
                    Observed outcome
                  </p>
                  <div className="mt-4 flex items-end gap-3">
                    <span
                      className={`${compact ? "text-6xl" : "text-7xl md:text-8xl"} font-serif leading-none tracking-[-.08em] text-[#e6ab61]`}
                    >
                      {active ? "4.2×" : "1→4"}
                    </span>
                    <span className="mb-1 max-w-[11ch] text-xs leading-relaxed text-[#f6f0e5]/55">
                      {active ? "clearer review cycles" : "signals held in one place"}
                    </span>
                  </div>
                  <p className="mt-6 max-w-sm border-t border-[#f6f0e5]/15 pt-4 text-sm leading-relaxed text-[#f6f0e5]/76">
                    “The important things stopped disappearing between the work and the people doing
                    it.”
                  </p>
                  <p className="mt-3 font-mono text-[8px] uppercase tracking-[.16em] text-[#f6f0e5]/42">
                    Mara Ellison / Northline Studio
                  </p>
                </motion.div>
              </AnimatePresence>
              <motion.div
                animate={{ scaleX: active ? 1 : 0.3 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="mt-8 h-px origin-left bg-[#e6ab61]"
              />
            </div>
          </div>
          <div className="flex justify-between border-t border-[#f6f0e5]/15 pt-4 font-mono text-[8px] uppercase tracking-[.16em] text-[#f6f0e5]/40">
            <span>One action, backed by one signal</span>
            <span className="hidden sm:block">Komorebi / proof</span>
          </div>
        </div>
      </div>
    </section>
  );
}
