import { useState } from "react";
import { motion } from "framer-motion";

export default function AudioEqualizerElement() {
  const [hovered, setHovered] = useState(false);
  const barCount = 14;

  return (
    <div
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          EQUALIZER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Visual Bar Equalizer */}
      <div className="relative w-full h-28 flex items-end justify-center gap-1.5 px-4 bg-black/45 border border-white/5 rounded-xl overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#E8A969]/10 to-transparent pointer-events-none" />

        {Array.from({ length: barCount }).map((_, i) => {
          // Generate unique animated height constraints
          const delay = i * 0.08;
          const duration = 0.5 + Math.random() * 0.6;
          return (
            <motion.div
              key={i}
              className="w-1.5 rounded-t-full bg-gradient-to-t from-[#BECB6D] to-[#E8A969]"
              animate={{
                height: hovered
                  ? [8, 48 + Math.random() * 40, 16, 72 + Math.random() * 20, 8]
                  : [8, 20 + Math.sin(i) * 12, 8],
              }}
              transition={{
                repeat: Infinity,
                duration: hovered ? duration : 1.2,
                delay: delay,
                ease: "easeInOut",
              }}
              style={{ height: 8 }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Frequency visualizer
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Responsive equalizer
        </h3>
      </div>
    </div>
  );
}
