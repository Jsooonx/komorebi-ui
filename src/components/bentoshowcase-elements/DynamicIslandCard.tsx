import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, Volume2, Sparkles } from "lucide-react";

export default function DynamicIslandCard({ minimal = false }: { minimal?: boolean }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div className="relative z-10 flex items-center justify-center h-full w-full">
      <motion.div
        animate={{ 
          width: hovered ? 200 : 110,
          height: hovered ? 64 : 26,
          borderRadius: hovered ? 20 : 12,
          backgroundColor: hovered ? "#1a1a1a" : "#000000"
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="border border-white/5 flex items-center justify-center p-2 relative overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!hovered ? (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono font-semibold text-white/60 tracking-wider uppercase">
                ACTIVE
              </span>
            </motion.div>
          ) : (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full flex flex-col justify-center items-center gap-1"
            >
              <div className="w-full flex items-center justify-between px-1">
                <Smartphone className="w-3 h-3 text-sun-gold" />
                <span className="text-[9px] font-mono font-medium text-white/80">
                  Find My iPhone
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              </div>
              <div className="w-full flex items-center justify-between px-1 mt-0.5 bg-black/35 rounded-md py-0.5 px-1.5 border border-white/5">
                <span className="text-[8px] font-mono text-white/45">Searching...</span>
                <div className="flex gap-0.5 items-center">
                  <span className="w-0.5 h-2 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
                  <span className="w-0.5 h-2.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-0.5 h-1.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  if (minimal) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center cursor-pointer select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-transparent to-[#1c1c1c]/10 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          HARDWARE MORPH
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Centered Dynamic Island capsule */}
      <div className="relative z-10 flex items-center justify-center h-20 w-full">
        {content}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Hardware Interface
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Dynamic island
        </h3>
      </div>
    </div>
  );
}
