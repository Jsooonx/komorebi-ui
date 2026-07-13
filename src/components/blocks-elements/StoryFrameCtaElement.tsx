import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

function EditorialVisual({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{ clipPath: active ? "inset(0% 0% 0% 0%)" : "inset(7% 8% 7% 8%)" }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
      className="relative h-full min-h-[280px] overflow-hidden bg-[#c6d0d9]"
    >
      <motion.img
        animate={{ scale: active ? 1.08 : 1, x: active ? -12 : 0, y: active ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        src="/images/story-frame-cta.png"
        alt="Quiet architectural workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1c3041]/20 mix-blend-multiply" />
      <div className="absolute inset-x-[13%] bottom-0 top-[13%] border border-white/55 bg-white/[0.07] backdrop-blur-[2px]" />
      <div className="absolute left-[21%] top-[17%] h-[68%] w-px bg-white/70" />
      <div className="absolute bottom-[22%] left-[13%] right-[13%] h-px bg-white/70" />
      <motion.div
        animate={{ x: active ? 20 : 0, y: active ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 28 }}
        className="absolute right-[14%] top-[16%] h-24 w-24 rounded-full border border-white/75 bg-[#1e3447]/55 shadow-[0_15px_45px_rgba(19,37,52,.35)]"
      />
      <motion.div
        animate={{ y: active ? 14 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 28 }}
        className="absolute bottom-[13%] left-[14%] right-[25%] border border-white/60 bg-[#f4f0e7]/80 p-3 text-[#172430] shadow-[0_12px_30px_rgba(19,37,52,.2)]"
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#172430]/55">
          Field signal
        </p>
        <p className="mt-1 text-xs font-medium">A steadier way to begin.</p>
      </motion.div>
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-5 top-5 border border-white/60 bg-[#f4f0e7]/80 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#172430]"
          >
            Your frame is open
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StoryFrameCtaElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const compact = previewMode === "catalog";
  return (
    <section className="flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#f0ede5] p-4 text-[#172430] sm:p-6 md:p-10">
      <div
        className={`mx-auto grid w-full overflow-hidden border border-[#172430]/20 bg-[#f7f4ed] shadow-[12px_12px_0_rgba(23,36,48,.14)] ${compact ? "max-w-[860px] md:grid-cols-[.92fr_1.08fr]" : "max-w-6xl md:grid-cols-[.9fr_1.1fr]"}`}
      >
        <div className={`${compact ? "p-6" : "p-7 md:p-12"} flex flex-col justify-between`}>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.19em] text-[#172430]/48">
              A useful next move
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active ? "open" : "rest"}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 9, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 29 }}
              >
                <h2
                  className={`${compact ? "mt-5 text-4xl" : "mt-7 text-5xl md:text-6xl"} font-serif leading-[.93] tracking-[-.065em]`}
                >
                  {active
                    ? "The first page is already waiting."
                    : "Give the work a clearer place to land."}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[#172430]/65">
                  {active
                    ? "Start with the context you have. The next shape can reveal itself from there."
                    : "A focused workspace for the notes, decisions, and signals that usually get lost between conversations."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8">
            <motion.button
              type="button"
              onClick={() => setActive((current) => !current)}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-[#172430] px-5 py-3 text-sm font-semibold text-[#f7f4ed] transition-colors hover:bg-[#314b60]"
            >
              {active ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              {active ? "The frame is ready" : "Open the workspace"}
            </motion.button>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[.16em] text-[#172430]/48">
              One calm start · no setup theatre
            </p>
          </div>
        </div>
        <EditorialVisual active={active} />
      </div>
    </section>
  );
}
