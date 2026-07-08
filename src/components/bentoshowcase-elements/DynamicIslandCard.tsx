import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, Volume2, Sparkles } from "lucide-react";

const STATE_CONFIGS: Record<string, { width: number; height: number; borderRadius: number; bg: string }> = {
  idle: { width: 110, height: 26, borderRadius: 13, bg: "#000000" },
  ring: { width: 170, height: 32, borderRadius: 16, bg: "#000000" },
  timer: { width: 180, height: 32, borderRadius: 16, bg: "#000000" },
  record: { width: 180, height: 32, borderRadius: 16, bg: "#000000" },
  music: { width: 230, height: 68, borderRadius: 22, bg: "#0a0a0c" },
  airdrop: { width: 200, height: 48, borderRadius: 18, bg: "#000000" },
  airdropMini: { width: 130, height: 28, borderRadius: 14, bg: "#000000" },
  lowBattery: { width: 220, height: 60, borderRadius: 20, bg: "#0d0b0b" },
  phone: { width: 250, height: 68, borderRadius: 22, bg: "#000000" },
  findmy: { width: 200, height: 64, borderRadius: 20, bg: "#000000" },
  screenRecord: { width: 180, height: 32, borderRadius: 16, bg: "#000000" },
};

export default function DynamicIslandCard({ 
  minimal = false,
  activeState 
}: { 
  minimal?: boolean;
  activeState?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const resolvedState = activeState || (hovered ? "findmy" : "idle");
  const config = STATE_CONFIGS[resolvedState] || STATE_CONFIGS.idle;

  const renderContent = () => {
    switch (resolvedState) {
      case "ring":
        return (
          <motion.div 
            key="ring" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2.5"
          >
            <span className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] font-mono font-medium text-white/90">Silent</span>
            </span>
            <span className="text-[9px] font-mono text-white/40">Muted</span>
          </motion.div>
        );
      case "timer":
        return (
          <motion.div 
            key="timer" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2.5"
          >
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-orange-500/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </div>
              <span className="text-[10px] font-mono font-semibold text-orange-500">00:14</span>
            </span>
            <span className="text-[9px] font-mono text-white/40">Timer</span>
          </motion.div>
        );
      case "record":
        return (
          <motion.div 
            key="record" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2.5"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-white/90">Voice Memo</span>
            </span>
            <span className="text-[9px] font-mono text-red-500 font-semibold">0:04</span>
          </motion.div>
        );
      case "music":
        return (
          <motion.div 
            key="music" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="flex items-center gap-3 w-full p-0.5"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-orange-500 to-[#E11D48] flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-4 h-4 text-white/90" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[10px] font-semibold text-white/95 truncate">Organic Flow</div>
              <div className="text-[8px] font-mono text-white/50 truncate">Komorebi UI</div>
            </div>
            <div className="flex gap-0.5 items-end h-3 pb-0.5 pr-1.5">
              <span className="w-0.5 h-2.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-0.5 h-3 bg-sun-gold animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="w-0.5 h-1.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </motion.div>
        );
      case "airdrop":
        return (
          <motion.div 
            key="airdrop" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-semibold text-white/90">Airdrop</div>
                <div className="text-[8px] font-mono text-white/40">GIELANG's MBP</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-blue-400 font-semibold pr-1">82%</span>
          </motion.div>
        );
      case "airdropMini":
        return (
          <motion.div 
            key="airdropMini" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center gap-1.5 px-1"
          >
            <Mail className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-mono font-medium text-white/80">AirDrop Sent</span>
          </motion.div>
        );
      case "lowBattery":
        return (
          <motion.div 
            key="lowBattery" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2 py-0.5"
          >
            <div className="text-left">
              <div className="text-[8px] font-mono font-semibold text-red-400 uppercase tracking-wider">BATTERY LOW</div>
              <div className="text-[11px] text-white/90 font-medium mt-0.5">20% Remaining</div>
            </div>
            <div className="w-8 h-4 border border-red-500/50 rounded p-0.5 flex items-center pr-1 mr-1">
              <div className="w-[80%] h-full bg-red-500 rounded-sm animate-pulse" />
            </div>
          </motion.div>
        );
      case "phone":
        return (
          <motion.div 
            key="phone" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2"
          >
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-full bg-sun-gold/25 border border-sun-gold/45 flex items-center justify-center font-bold text-xs text-sun-gold">
                G
              </div>
              <div>
                <div className="text-[8px] font-mono text-white/45 uppercase tracking-wider">Incoming Call</div>
                <div className="text-[11px] font-semibold text-white/90 truncate max-w-[80px]">GIELANG</div>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0 pr-1">
              <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <Volume2 className="w-3 h-3 text-red-400" />
              </div>
              <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                <Smartphone className="w-3 h-3 text-green-400" />
              </div>
            </div>
          </motion.div>
        );
      case "findmy":
        return (
          <motion.div 
            key="findmy" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ duration: 0.15 }} 
            className="w-full flex flex-col justify-center items-center gap-1 p-0.5"
          >
            <div className="w-full flex items-center justify-between px-1">
              <Smartphone className="w-3 h-3 text-sun-gold" />
              <span className="text-[9px] font-mono font-medium text-white/80">Find My iPhone</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            </div>
            <div className="w-full flex items-center justify-between px-1 mt-0.5 bg-black/35 rounded-md py-0.5 px-1.5 border border-white/5">
              <span className="text-[8px] font-mono text-white/40">Searching...</span>
              <div className="flex gap-0.5 items-center">
                <span className="w-0.5 h-2 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-0.5 h-2.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-0.5 h-1.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </motion.div>
        );
      case "screenRecord":
        return (
          <motion.div 
            key="screenRecord" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-2.5"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 border border-white/20 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-white/90">Screen Record</span>
            </span>
            <span className="text-[9px] font-mono text-red-500 font-semibold">0:12</span>
          </motion.div>
        );
      case "idle":
      default:
        return (
          <motion.div 
            key="idle" 
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
        );
    }
  };

  const content = (
    <div className="relative z-10 flex items-center justify-center h-full w-full">
      <motion.div
        animate={{
          width: config.width,
          height: config.height,
          borderRadius: config.borderRadius,
          backgroundColor: config.bg,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 220 }}
        className="border border-white/5 flex items-center justify-center p-2 relative overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {renderContent()}
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
