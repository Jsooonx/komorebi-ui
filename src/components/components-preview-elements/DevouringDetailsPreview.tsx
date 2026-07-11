import { useState } from "react";

export default function DevouringDetailsPreview() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#101114] p-4">
      <label
        className={`w-full border p-3 transition duration-300 ${focused ? "border-white/35 bg-white/[0.07]" : "border-white/10 bg-black/30"}`}
      >
        <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.18em] text-white/35">
          Identity input
        </span>
        <div className="flex items-center gap-2">
          <span className="text-white/35">@</span>
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="your@email.com"
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
          />
          <kbd className="border border-white/10 px-1.5 py-0.5 text-[9px] text-white/45">↵</kbd>
        </div>
      </label>
    </div>
  );
}
