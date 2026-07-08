import { useState } from "react";

export default function BorderBeamCard({ minimal = false }: { minimal?: boolean }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#121212] border border-white/5">
      {/* rotating border glow */}
      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 ease-out overflow-hidden">
        <div 
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_60%,#E8A969_90%,transparent_100%)] animate-[spin_4s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
      </div>
      <div className="absolute inset-[1px] bg-black rounded-[11px] z-10 pointer-events-none" />
      
      {/* Small center beam visual */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">glowing outline</span>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div 
        className="w-full h-full p-2 select-none group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* rotating border glow */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700 ease-out overflow-hidden">
        <div 
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_60%,#E8A969_90%,transparent_100%)] animate-[spin_4s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
      </div>
      <div className="absolute inset-[1px] bg-[#121212] rounded-[15px] z-10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          BORDER GLOW
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      <div className="relative z-20">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          CSS Borders
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Border beam
        </h3>
      </div>
    </div>
  );
}
