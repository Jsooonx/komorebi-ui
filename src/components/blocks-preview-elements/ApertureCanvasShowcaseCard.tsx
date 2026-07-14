import { AnimatePresence, motion } from "framer-motion";
import { Check, Image } from "lucide-react";
import { useState } from "react";
import type { ComponentPreviewProps } from "../../lib/components-manifest";

const stages = ["Gather", "Arrange", "Commit"];

export default function ApertureCanvasShowcaseCard(_: ComponentPreviewProps) {
  const [stage, setStage] = useState(0);
  const complete = stage === 2;
  return (
    <div className="flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#e7e2d8] p-5 text-[#18191d] sm:p-7">
      <div className="relative mx-auto h-[420px] w-full max-w-4xl overflow-hidden border border-[#18191d]/15 bg-[#ece7dd] p-5 sm:p-7">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(24,25,29,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(24,25,29,.06)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative flex items-center justify-between border-b border-[#18191d]/15 pb-3">
          <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#18191d]/50">
            Aperture canvas
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[.15em] text-[#18191d]/45">
            Click to arrange
          </span>
        </div>
        <div className="relative h-[310px]">
          <motion.div
            animate={{ x: stage === 0 ? -44 : -14, y: stage === 0 ? -30 : 2 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="absolute left-[6%] top-[27%] z-20 w-32 border border-[#18191d]/15 bg-[#faf8f2] p-2.5 shadow-[0_10px_24px_rgba(27,29,33,.1)]"
          >
            <div className="font-mono text-[7px] uppercase tracking-[.14em] text-[#18191d]/45">
              Field note
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-[#18191d]/72">
              Keep the decision in one visible place.
            </p>
          </motion.div>
          <motion.div
            animate={{ x: stage === 0 ? 54 : 12, y: stage === 0 ? -38 : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="absolute right-[4%] top-[9%] z-20 w-36 overflow-hidden border border-[#18191d]/15 shadow-[0_10px_24px_rgba(27,29,33,.12)]"
          >
            <img
              src="/images/aperture-canvas-source.png"
              alt="Tracing paper source reference"
              className="h-24 w-full object-cover"
            />
            <div className="flex items-center justify-between bg-[#1c1d22] px-2 py-1 font-mono text-[7px] uppercase tracking-[.14em] text-white/65">
              <span>Source 03</span>
              <Image className="h-2.5 w-2.5" />
            </div>
          </motion.div>
          <motion.div
            animate={{ x: stage === 0 ? 38 : 10, y: stage === 0 ? 46 : 24 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="absolute bottom-[8%] right-[11%] z-20 w-28 border border-[#18191d]/15 bg-[#1c1d22] p-2.5 text-[#f7f4ed] shadow-[0_10px_24px_rgba(27,29,33,.16)]"
          >
            <div className="font-mono text-[7px] uppercase tracking-[.14em] text-white/42">
              Signal
            </div>
            <div className="mt-1 text-xl tracking-[-.07em]">4.2×</div>
            <div className="font-mono text-[7px] uppercase tracking-[.12em] text-white/42">
              clearer review
            </div>
          </motion.div>
          <motion.button
            type="button"
            onClick={() => setStage((current) => (current + 1) % 3)}
            animate={{ scale: stage === 0 ? 0.9 : 1, y: stage === 2 ? -5 : 8 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="absolute left-1/2 top-1/2 z-10 w-[min(58vw,330px)] -translate-x-1/2 -translate-y-1/2 border border-[#18191d]/25 bg-[#faf8f2] p-4 text-left shadow-[0_22px_50px_rgba(27,29,33,.18)]"
          >
            <div className="flex items-center justify-between border-b border-[#18191d]/12 pb-2 font-mono text-[7px] uppercase tracking-[.15em] text-[#18191d]/48">
              <span>Decision brief</span>
              <span>0{stage + 1}/03</span>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
              >
                <div className="mt-4 font-serif text-xl leading-[.9] tracking-[-.055em]">
                  {stage === 0
                    ? "Make the handoff visible."
                    : stage === 1
                      ? "Group context around one call."
                      : "Confirm the next move."}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#18191d]/12 pt-2 text-[8px]">
                  <span className="text-[#18191d]/55">Mara Ellison</span>
                  <span className="flex items-center gap-1 font-medium">
                    {complete && <Check className="h-2.5 w-2.5" />}
                    {complete ? "Ready to share" : "Taking shape"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
        <div className="relative mt-1 flex gap-2">
          <div className="flex h-px flex-1 bg-[#18191d]/15">
            {stages.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setStage(index)}
                className={`h-2 flex-1 -translate-y-1 ${index === stage ? "bg-[#18191d]" : ""}`}
                aria-label={`Show ${item}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
