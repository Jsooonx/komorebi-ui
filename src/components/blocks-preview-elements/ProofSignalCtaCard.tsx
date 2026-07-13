import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { ComponentPreviewProps } from "../../lib/components-manifest";
export default function ProofSignalCtaCard(_: ComponentPreviewProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex h-full min-h-[500px] w-full items-center bg-[#15120f] p-5 text-[#f6f0e5]">
      <div className="relative mx-auto w-full max-w-[760px] overflow-hidden border border-[#f6f0e5]/20 bg-[#1c1814] p-6">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(246,240,229,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(246,240,229,.045)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative">
          <div className="flex justify-between border-b border-[#f6f0e5]/15 pb-3 font-mono text-[8px] uppercase tracking-[.16em] text-[#f6f0e5]/45">
            <span>Proof signal</span>
            <span>Outcome / 04</span>
          </div>
          <div className="grid gap-7 py-10 sm:grid-cols-[1.05fr_.95fr] sm:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#e6ab61]">
                A decision with evidence behind it
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-[.92] tracking-[-.065em]">
                Let the next move carry its own proof.
              </h3>
              <button
                type="button"
                onClick={() => setActive((current) => !current)}
                className="mt-7 inline-flex items-center gap-2 bg-[#e6ab61] px-4 py-2.5 text-xs font-semibold text-[#21180f]"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                Bring it into view
              </button>
            </div>
            <div className="border-l border-[#f6f0e5]/15 pl-5">
              <p className="font-mono text-[8px] uppercase tracking-[.16em] text-[#f6f0e5]/45">
                Observed outcome
              </p>
              <p className="mt-4 font-serif text-6xl leading-none tracking-[-.08em] text-[#e6ab61]">
                {active ? "4.2×" : "1→4"}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#f6f0e5]/65">
                {active ? "clearer review cycles" : "signals held in one place"}
              </p>
              <div
                className={`mt-7 h-px bg-[#e6ab61] transition-all duration-500 ${active ? "w-full" : "w-1/3"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
