import { motion } from "framer-motion";
import { Cpu, Zap, GitBranch, Shield } from "lucide-react";

const TECH_TAGS = [
  "React",
  "TypeScript",
  "WebGL",
  "GSAP",
  "TailwindCSS",
  "Framer Motion",
  "ThreeJS",
  "Vite",
];

export default function InfiniteMarqueeElement() {
  const content = (
    <div className="relative z-10 w-full flex items-center h-16 overflow-hidden">
      {/* Double-wrapper for seamless loop */}
      <div className="flex w-max animate-[marquee_20s_linear_infinite] whitespace-nowrap">
        {/* First loop */}
        {TECH_TAGS.map((tech, idx) => (
          <div
            key={`tech1-${idx}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 border border-white/5 shrink-0"
            style={{ marginRight: "16px" }}
          >
            {idx % 4 === 0 && <Cpu className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 1 && <Zap className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 2 && <GitBranch className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 3 && <Shield className="w-3.5 h-3.5 text-[#BECB6D]" />}
            <span className="text-[10px] font-mono text-white/90 font-medium tracking-wide uppercase">
              {tech}
            </span>
          </div>
        ))}
        {/* Second identical loop */}
        {TECH_TAGS.map((tech, idx) => (
          <div
            key={`tech2-${idx}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 border border-white/5 shrink-0"
            style={{ marginRight: "16px" }}
          >
            {idx % 4 === 0 && <Cpu className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 1 && <Zap className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 2 && <GitBranch className="w-3.5 h-3.5 text-[#BECB6D]" />}
            {idx % 4 === 3 && <Shield className="w-3.5 h-3.5 text-[#BECB6D]" />}
            <span className="text-[10px] font-mono text-white/90 font-medium tracking-wide uppercase">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-[#BECB6D]/5 to-[#121212] opacity-55" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          PERPETUAL SCROLL
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Infinite Scroll Area */}
      {content}

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Infinite Loop
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Infinite marquee
        </h3>
      </div>
    </div>
  );
}
