import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

export default function AudioEqualizerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Initialize 10 bars
    setBars(Array.from({ length: 10 }, () => 15));
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array.from({ length: 10 }, () => 10));
      return;
    }
    const interval = setInterval(() => {
      setBars(Array.from({ length: 10 }, () => Math.floor(Math.random() * 55) + 10));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      onClick={() => setIsPlaying(!isPlaying)}
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-[#E11D48]/5 to-[#121212] opacity-40" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          AUDIO EQUALIZER
        </span>
        <Volume2 className={`w-4 h-4 transition-colors ${isPlaying ? "text-[#E11D48]" : "text-white/40"}`} />
      </div>

      {/* Equalizer Visual bars */}
      <div className="relative z-10 w-full h-20 flex items-end justify-center gap-1 bg-black/45 border border-white/5 rounded-xl px-4 py-2">
        <span className="absolute top-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">
          Click to play / pause
        </span>

        {bars.map((height, i) => (
          <motion.div
            key={i}
            animate={{ height }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-1.5 rounded-t-sm"
            style={{ 
              backgroundColor: isPlaying ? "#E11D48" : "rgba(255,255,255,0.15)",
              maxHeight: "100%" 
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Sound Wave
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Interactive audio equalizer
        </h3>
      </div>
    </div>
  );
}
