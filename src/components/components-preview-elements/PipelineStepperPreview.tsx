import { useState } from "react";

const steps = ["Configure", "Verify", "Launch"];

export default function PipelineStepperPreview() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-full w-full flex-col justify-center bg-[#101114] p-5">
      <div className="relative flex justify-between before:absolute before:left-4 before:right-4 before:top-4 before:h-px before:bg-white/10">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => setActive(index)}
            className="relative z-10 flex flex-col items-center gap-3 text-[10px] text-white/40"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${index <= active ? "border-white bg-white text-black" : "border-white/15 bg-[#101114] text-white/45"}`}
            >
              {index + 1}
            </span>
            {step}
          </button>
        ))}
      </div>
      <p className="mt-7 text-center text-xs text-white/60">{steps[active]} deployment flow</p>
    </div>
  );
}
