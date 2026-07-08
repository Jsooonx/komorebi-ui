import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, Volume2, Sparkles, Phone, PhoneOff } from "lucide-react";

const STATE_CONFIGS: Record<string, { width: number; height: number; borderRadius: number; bg: string }> = {
  idle: { width: 110, height: 26, borderRadius: 13, bg: "#000000" },
  ring: { width: 170, height: 32, borderRadius: 16, bg: "#000000" },
  timer: { width: 180, height: 32, borderRadius: 16, bg: "#000000" },
  record: { width: 180, height: 32, borderRadius: 16, bg: "#000000" },
  music: { width: 250, height: 72, borderRadius: 24, bg: "#0a0a0c" },
  airdrop: { width: 210, height: 50, borderRadius: 18, bg: "#000000" },
  airdropMini: { width: 130, height: 28, borderRadius: 14, bg: "#000000" },
  lowBattery: { width: 220, height: 60, borderRadius: 20, bg: "#0d0b0b" },
  phone: { width: 260, height: 70, borderRadius: 22, bg: "#000000" },
  findmy: { width: 210, height: 64, borderRadius: 20, bg: "#000000" },
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
            className="flex items-center justify-between w-full px-3"
          >
            <span className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-white/90">Silent Mode</span>
            </span>
            <span className="text-[9px] font-mono text-orange-400 font-semibold uppercase tracking-wider">ON</span>
          </motion.div>
        );
      case "timer":
        return (
          <motion.div 
            key="timer" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-3"
          >
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-orange-500/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono font-semibold text-orange-400">00:14.2</span>
            </span>
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Timer</span>
          </motion.div>
        );
      case "record":
        return (
          <motion.div 
            key="record" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-3"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-mono font-medium text-white/90">Voice Memo</span>
            </span>
            <span className="text-[9px] font-mono text-red-500 font-semibold tracking-wider">0:04</span>
          </motion.div>
        );
      case "music":
        return (
          <motion.div 
            key="music" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="flex items-center gap-3 w-full px-3 py-1.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden group/art">
              <Sparkles className="w-4 h-4 text-white/90 animate-spin" style={{ animationDuration: "8s" }} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[11px] font-semibold text-white/95 truncate">Midnight City Beats</div>
              <div className="text-[9px] font-mono text-white/50 truncate mt-0.5">M83 & Komorebi Lab</div>
            </div>
            <div className="flex gap-0.5 items-end h-4 pb-1 pr-1">
              <span className="w-0.5 h-3 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-0.5 h-4 bg-sun-gold animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="w-0.5 h-2 bg-sun-gold animate-bounce" style={{ animationDelay: "0.3s" }} />
              <span className="w-0.5 h-3.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.1s" }} />
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
            className="flex items-center justify-between w-full px-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-semibold text-white/90 leading-tight">AirDrop File</div>
                <div className="text-[8px] font-mono text-white/45 mt-0.5">MacBook Pro (M3 Max)</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-blue-400 font-semibold pr-1">82%</span>
          </motion.div>
        );
      case "airdropMini":
        return (
          <motion.div 
            key="airdropMini" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center gap-2 px-2"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[9px] font-mono font-medium text-white/85">AirDrop Sent</span>
          </motion.div>
        );
      case "lowBattery":
        return (
          <motion.div 
            key="lowBattery" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-3 py-1"
          >
            <div className="text-left">
              <div className="text-[8px] font-mono font-semibold text-red-400 uppercase tracking-wider">BATTERY ALERT</div>
              <div className="text-[11px] text-white/90 font-medium mt-0.5">20% Remaining</div>
            </div>
            <div className="w-8 h-4 border border-red-500/60 rounded p-0.5 flex items-center">
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
            className="flex items-center justify-between w-full px-3"
          >
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-full bg-sun-gold/20 border border-sun-gold/40 flex items-center justify-center font-bold text-xs text-sun-gold shrink-0">
                A
              </div>
              <div className="min-w-0">
                <div className="text-[8px] font-mono text-white/45 uppercase tracking-wider">Incoming Call</div>
                <div className="text-[11px] font-semibold text-white/95 truncate max-w-[90px]">Alex Rivers</div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 rounded-full bg-red-500/25 border border-red-500/50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 rounded-full bg-green-500/25 border border-green-500/50 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
              </motion.button>
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
            className="w-full flex flex-col justify-center items-center gap-1.5 px-3 py-1"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-sun-gold" />
                <span className="text-[10px] font-mono font-medium text-white/90">Find My iPhone</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </div>
            <div className="w-full flex items-center justify-between bg-black/40 rounded-lg py-1 px-2 border border-white/5">
              <span className="text-[8px] font-mono text-white/50 uppercase tracking-wider">Precision Finding...</span>
              <div className="flex gap-0.5 items-center">
                <span className="w-0.5 h-2 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-0.5 h-3 bg-sun-gold animate-bounce" style={{ animationDelay: "0.1s" }} />
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
            className="flex items-center justify-between w-full px-3"
          >
            <span className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white/20 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-white/90">Screen Recording</span>
            </span>
            <span className="text-[9px] font-mono text-red-500 font-semibold">0:12.8</span>
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
            className="flex items-center gap-2 px-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-semibold text-white/70 tracking-widest uppercase">
              DYNAMIC ISLAND
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
        className="border border-white/10 flex items-center justify-center p-2 relative overflow-hidden shadow-2xl"
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
        className="w-full h-full flex items-center justify-center cursor-pointer select-none relative z-10 p-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-[460px] h-[340px] sm:h-[360px] mx-auto bg-[#0f0f12]/95 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 cursor-pointer select-none group/card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-transparent to-[#1c1c1c]/15 opacity-60" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-sun-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/50 tracking-[0.24em] uppercase group-hover/card:text-white/70 transition-colors duration-300">
            APPLE DYNAMIC ISLAND
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-black/60 border border-white/20" />
        </div>
      </div>

      {/* Centered Dynamic Island capsule */}
      <div className="relative z-10 flex items-center justify-center flex-1 w-full my-3">
        {content}
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono text-sun-gold/85 tracking-widest uppercase block mb-1">
            Hardware Interface
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-light tracking-tight text-white/95 group-hover/card:text-white transition-colors duration-300">
            Notification Controller
          </h3>
        </div>
        <div className="text-[10px] font-mono text-white/40 border border-white/10 px-2.5 py-1 rounded-full bg-black/40">
          iOS 18 Interface
        </div>
      </div>
    </div>
  );
}
