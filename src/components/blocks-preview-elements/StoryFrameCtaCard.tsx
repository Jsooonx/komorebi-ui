import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { ComponentPreviewProps } from "../../lib/components-manifest";
export default function StoryFrameCtaCard(_: ComponentPreviewProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex h-full min-h-[500px] w-full items-center bg-[#f0ede5] p-5 text-[#172430]">
      <div className="mx-auto grid w-full max-w-[760px] overflow-hidden border border-[#172430]/20 bg-[#f7f4ed] shadow-[8px_8px_0_rgba(23,36,48,.14)] sm:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-between p-5">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#172430]/48">
              A useful next move
            </p>
            <h3 className="mt-5 font-serif text-4xl leading-[.93] tracking-[-.065em]">
              {active
                ? "The first page is already waiting."
                : "Give the work a clearer place to land."}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActive((current) => !current)}
            className="mt-8 inline-flex w-fit items-center gap-2 bg-[#172430] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed]"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            {active ? "Frame ready" : "Open workspace"}
          </button>
        </div>
        <div
          className={`relative min-h-[260px] overflow-hidden bg-[#c6d0d9] transition-all duration-500 ${active ? "[clip-path:inset(0)]" : "[clip-path:inset(7%_8%)]"}`}
        >
          <img
            src="/images/story-frame-cta.png"
            alt="Quiet architectural workspace"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${active ? "scale-110 -translate-x-2 -translate-y-2" : ""}`}
          />
          <div className="absolute inset-0 bg-[#1c3041]/20 mix-blend-multiply" />
          <div className="absolute inset-x-[13%] bottom-0 top-[13%] border border-white/55 bg-white/[.07]" />
          <div
            className={`absolute right-[14%] top-[16%] h-20 w-20 rounded-full border border-white/75 bg-[#1e3447]/55 transition-transform duration-500 ${active ? "translate-x-4 -translate-y-2" : ""}`}
          />
          <div
            className={`absolute bottom-[13%] left-[14%] right-[25%] border border-white/60 bg-[#f4f0e7]/80 p-3 text-xs font-medium transition-transform duration-500 ${active ? "translate-y-3" : ""}`}
          >
            A steadier way to begin.
          </div>
        </div>
      </div>
    </div>
  );
}
