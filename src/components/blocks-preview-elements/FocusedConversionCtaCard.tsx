import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import type { ComponentPreviewProps } from "../../lib/components-manifest";

export default function FocusedConversionCtaCard(_: ComponentPreviewProps) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="relative flex h-full min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#10130f] p-6 text-[#f3f0e8]">
      <motion.div
        animate={{ scale: confirmed ? 1.16 : 1, opacity: confirmed ? 0.86 : 0.66 }}
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#b8d273]/[0.18] blur-[75px]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(243,240,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(243,240,232,0.05)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="relative w-full max-w-[680px] border border-[#f3f0e8]/20 bg-black/20 p-5">
        <div className="flex justify-between border-b border-[#f3f0e8]/15 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#f3f0e8]/50">
          <span>Komorebi / next step</span>
          <span>{confirmed ? "Ready" : "Invitation"}</span>
        </div>
        <div className="py-10 text-center">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#c9dc90]">
            {confirmed ? "A clearer beginning" : "Built for the work ahead"}
          </p>
          <h3 className="mt-4 font-serif text-4xl leading-[0.92] tracking-[-0.065em]">
            {confirmed ? "Make room for what comes next." : "Bring the next decision into focus."}
          </h3>
          <button
            type="button"
            onClick={() => setConfirmed((current) => !current)}
            className="mt-7 inline-flex items-center gap-2 border border-[#f3f0e8]/30 bg-[#f3f0e8] px-4 py-2.5 text-xs font-semibold text-[#151713]"
          >
            {confirmed ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5" />
            )}
            {confirmed ? "Your next step is held" : "Start with clarity"}
          </button>
        </div>
      </div>
    </div>
  );
}
