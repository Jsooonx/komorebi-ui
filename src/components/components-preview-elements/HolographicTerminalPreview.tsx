import { useEffect, useState } from "react";

const command = "npx komorebi-ui add motion-card";

export default function HolographicTerminalPreview() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setCount((value) => (value >= command.length ? 0 : value + 1)),
      55,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="flex h-full w-full flex-col justify-center bg-[#0a0b0d] p-5 font-mono">
      <div className="mb-3 flex gap-1">
        <i className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <i className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <i className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      <p className="text-[10px] text-white/80">
        <span className="mr-2 text-white/35">›</span>
        {command.slice(0, count)}
        <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white/60 align-middle" />
      </p>
      <p className="mt-3 text-[9px] text-white/30">Ready to install</p>
    </div>
  );
}
