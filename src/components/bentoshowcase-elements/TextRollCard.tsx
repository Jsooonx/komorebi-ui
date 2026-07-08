import { useState } from "react";
import { motion } from "framer-motion";

export default function TextRollCard({ minimal = false }: { minimal?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const word = "KOMOREBI";

  if (minimal) {
    return (
      <div
        className="w-full h-full flex items-center justify-center select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex overflow-hidden py-1">
          {word.split("").map((letter, index) => (
            <div key={index} className="relative h-8 w-5 sm:w-6 overflow-hidden flex justify-center">
              <motion.span
                animate={{ y: hovered ? "-100%" : "0%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="absolute text-xl sm:text-2xl font-heading font-bold text-white/60 tracking-wider"
              >
                {letter}
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: hovered ? "0%" : "100%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="absolute text-xl sm:text-2xl font-heading font-bold text-sun-gold tracking-wider"
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-transparent to-[#1a1a1a]/30 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          TEXT WAVE
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Text Roll Canvas area */}
      <div className="relative z-10 w-full flex items-center justify-center h-20">
        <div className="flex overflow-hidden py-1">
          {word.split("").map((letter, index) => (
            <div key={index} className="relative h-8 w-5 sm:w-6 overflow-hidden flex justify-center">
              <motion.span
                animate={{ y: hovered ? "-100%" : "0%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="absolute text-xl sm:text-2xl font-heading font-bold text-white/60 tracking-wider"
              >
                {letter}
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: hovered ? "0%" : "100%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="absolute text-xl sm:text-2xl font-heading font-bold text-sun-gold tracking-wider"
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Letter Shifter
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Text roll hover
        </h3>
      </div>
    </div>
  );
}
