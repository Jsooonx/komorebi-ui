import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

export default function FocusedConversionCtaElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const reducedMotion = useReducedMotion();
  const compact = previewMode === "catalog";

  return (
    <section className="relative flex h-full min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#10130f] p-6 text-[#f3f0e8] sm:p-10">
      <motion.div
        animate={
          confirmed && !reducedMotion ? { scale: 1.16, opacity: 0.86 } : { scale: 1, opacity: 0.66 }
        }
        transition={{ type: "spring", stiffness: 180, damping: 30, mass: 1.1 }}
        className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-[#b8d273]/[0.18] blur-[100px]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(243,240,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(243,240,232,0.05)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div
        className={`relative w-full border border-[#f3f0e8]/20 bg-black/20 p-6 backdrop-blur-sm ${compact ? "max-w-[720px]" : "max-w-4xl p-8 md:p-12"}`}
      >
        <div className="flex items-center justify-between border-b border-[#f3f0e8]/15 pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#f3f0e8]/50">
          <span>Komorebi / next step</span>
          <span>{confirmed ? "Ready" : "Open invitation"}</span>
        </div>
        <div className={`${compact ? "py-10" : "py-16 md:py-20"} mx-auto max-w-2xl text-center`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={confirmed ? "confirmed" : "default"}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.6 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c9dc90]">
                {confirmed ? "A clearer beginning" : "Built for the work ahead"}
              </p>
              <h2
                className={`${compact ? "mt-4 text-4xl" : "mt-5 text-5xl md:text-7xl"} font-serif leading-[0.92] tracking-[-0.065em]`}
              >
                {confirmed
                  ? "Make room for what comes next."
                  : "Bring the next decision into focus."}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#f3f0e8]/65">
                {confirmed
                  ? "A quiet workspace is ready to hold the context, decisions, and momentum that matter."
                  : "Start with one calm place for the context your team needs to move with intention."}
              </p>
            </motion.div>
          </AnimatePresence>
          <motion.button
            type="button"
            onClick={() => setConfirmed((current) => !current)}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-3 border border-[#f3f0e8]/30 bg-[#f3f0e8] px-5 py-3 text-sm font-semibold text-[#151713] transition-colors hover:bg-[#c9dc90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3f0e8]/70"
          >
            {confirmed ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            {confirmed ? "Your next step is held" : "Start with clarity"}
          </motion.button>
        </div>
        <div className="flex justify-between border-t border-[#f3f0e8]/15 pt-4 font-mono text-[8px] uppercase tracking-[0.15em] text-[#f3f0e8]/42">
          <span>One focused conversion</span>
          <span>Nothing to configure</span>
        </div>
      </div>
    </section>
  );
}
