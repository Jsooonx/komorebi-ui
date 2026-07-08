import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Mail, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Phone, 
  PhoneOff, 
  CheckCircle2, 
  Trash2, 
  Square 
} from "lucide-react";

export default function DynamicIslandCard({ 
  minimal = false,
  activeState 
}: { 
  minimal?: boolean;
  activeState?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const resolvedState = activeState || (hovered ? "findmy" : "idle");

  // Interactive Ring state: silent mode ON vs OFF
  const [silentMode, setSilentMode] = useState(true);

  // Real-time Timer state (starting from 00:00.0)
  const [timerTenths, setTimerTenths] = useState(0);

  // Real-time Record state (starting from 0:00)
  const [recordSecs, setRecordSecs] = useState(0);

  // AirDrop Progress state (0 to 100)
  const [airdropProgress, setAirdropProgress] = useState(0);

  // Phone Call state ("incoming" -> "active" -> "ended")
  const [phoneState, setPhoneState] = useState<"incoming" | "active" | "ended">("incoming");
  const [phoneSecs, setPhoneSecs] = useState(0);

  // Screen Record state ("recording" -> "saved" -> "deleted")
  const [screenRecordAction, setScreenRecordAction] = useState<"recording" | "saved" | "deleted">("recording");
  const [screenRecSecs, setScreenRecSecs] = useState(0);

  // Reset or run interval for Timer
  useEffect(() => {
    if (resolvedState === "timer") {
      setTimerTenths(0);
      const id = setInterval(() => {
        setTimerTenths((prev) => prev + 1);
      }, 100);
      return () => clearInterval(id);
    } else {
      setTimerTenths(0);
    }
  }, [resolvedState]);

  // Reset or run interval for Record
  useEffect(() => {
    if (resolvedState === "record") {
      setRecordSecs(0);
      const id = setInterval(() => {
        setRecordSecs((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(id);
    } else {
      setRecordSecs(0);
    }
  }, [resolvedState]);

  // Reset or run interval for AirDrop
  useEffect(() => {
    if (resolvedState === "airdrop") {
      setAirdropProgress(0);
      const id = setInterval(() => {
        setAirdropProgress((prev) => {
          if (prev >= 100) {
            clearInterval(id);
            return 100;
          }
          return prev + 2;
        });
      }, 45);
      return () => clearInterval(id);
    } else {
      setAirdropProgress(0);
    }
  }, [resolvedState]);

  // Reset or run interval for Phone Call
  useEffect(() => {
    if (resolvedState === "phone") {
      if (phoneState === "active") {
        const id = setInterval(() => {
          setPhoneSecs((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(id);
      }
    } else {
      setPhoneState("incoming");
      setPhoneSecs(0);
    }
  }, [resolvedState, phoneState]);

  // Reset or run interval for Screen Record
  useEffect(() => {
    if (resolvedState === "screenRecord") {
      if (screenRecordAction === "recording") {
        const id = setInterval(() => {
          setScreenRecSecs((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(id);
      }
    } else {
      setScreenRecordAction("recording");
      setScreenRecSecs(0);
    }
  }, [resolvedState, screenRecordAction]);

  const formatTimer = (tenths: number) => {
    const totalSecs = Math.floor(tenths / 10);
    const t = tenths % 10;
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${t}`;
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  // Dynamic config ensuring spacious dimensions so text NEVER touches borders
  const getDynamicConfig = () => {
    switch (resolvedState) {
      case "idle":
        return { width: 92, height: 30, borderRadius: 15, bg: "#000000" };
      case "ring":
        return { width: 250, height: 46, borderRadius: 23, bg: "#000000" };
      case "timer":
        return { width: 230, height: 46, borderRadius: 23, bg: "#000000" };
      case "record":
        return { width: 230, height: 46, borderRadius: 23, bg: "#000000" };
      case "music":
        return { width: 290, height: 76, borderRadius: 24, bg: "#0a0a0c" };
      case "airdrop":
        return airdropProgress >= 100
          ? { width: 260, height: 56, borderRadius: 22, bg: "#000000" }
          : { width: 290, height: 74, borderRadius: 24, bg: "#000000" };
      case "airdropMini":
        return { width: 140, height: 34, borderRadius: 17, bg: "#000000" };
      case "lowBattery":
        return { width: 270, height: 64, borderRadius: 22, bg: "#0d0a0a" };
      case "phone":
        if (phoneState === "active") return { width: 300, height: 72, borderRadius: 24, bg: "#000000" };
        if (phoneState === "ended") return { width: 210, height: 48, borderRadius: 24, bg: "#000000" };
        return { width: 300, height: 74, borderRadius: 24, bg: "#000000" };
      case "findmy":
        return { width: 280, height: 70, borderRadius: 24, bg: "#000000" };
      case "screenRecord":
        if (screenRecordAction === "saved") return { width: 280, height: 52, borderRadius: 24, bg: "#000000" };
        if (screenRecordAction === "deleted") return { width: 250, height: 52, borderRadius: 24, bg: "#000000" };
        return { width: 330, height: 64, borderRadius: 26, bg: "#000000" };
      default:
        return { width: 92, height: 30, borderRadius: 15, bg: "#000000" };
    }
  };

  const config = getDynamicConfig();

  const renderContent = () => {
    switch (resolvedState) {
      case "ring":
        return (
          <motion.div 
            key="ring" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4 py-1"
          >
            <div 
              onClick={() => setSilentMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-colors ${
                silentMode 
                  ? "bg-orange-500/25 text-orange-400 border border-orange-500/40" 
                  : "text-white/45 hover:text-white/75"
              }`}
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-semibold">Silent</span>
            </div>

            <div 
              onClick={() => setSilentMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-colors ${
                !silentMode 
                  ? "bg-emerald-500/25 text-emerald-400 border border-emerald-500/40" 
                  : "text-white/45 hover:text-white/75"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-semibold">Sound</span>
            </div>
          </motion.div>
        );

      case "timer":
        return (
          <motion.div 
            key="timer" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4.5 py-1"
          >
            <span className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <span className="text-xs font-mono font-bold text-orange-400 tracking-wide">
                {formatTimer(timerTenths)}
              </span>
            </span>
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-semibold">
              Timer
            </span>
          </motion.div>
        );

      case "record":
        return (
          <motion.div 
            key="record" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4.5 py-1"
          >
            <span className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-xs font-mono font-medium text-white/95">Voice Memo</span>
            </span>
            <span className="text-xs font-mono text-red-400 font-bold tracking-wider">
              {formatSecs(recordSecs)}
            </span>
          </motion.div>
        );

      case "music":
        return (
          <motion.div 
            key="music" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="flex items-center gap-3.5 w-full px-4 py-2"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden group/art">
              <Sparkles className="w-5 h-5 text-white/90 animate-spin" style={{ animationDuration: "10s" }} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-semibold text-white/95 truncate">Midnight City Beats</div>
              <div className="text-[10px] font-mono text-white/55 truncate mt-0.5">M83 & Komorebi Lab</div>
            </div>
            {/* Organized, rhythmic audio bar animation instead of random bounce */}
            <div className="flex items-end gap-1 h-6 px-1 shrink-0 pb-1">
              <motion.span animate={{ height: ["35%", "85%", "35%"] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0 }} className="w-1 bg-sun-gold rounded-full" />
              <motion.span animate={{ height: ["65%", "25%", "90%", "65%"] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.1 }} className="w-1 bg-sun-gold rounded-full" />
              <motion.span animate={{ height: ["20%", "100%", "45%", "20%"] }} transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-sun-gold rounded-full" />
              <motion.span animate={{ height: ["80%", "40%", "75%", "80%"] }} transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.05 }} className="w-1 bg-sun-gold rounded-full" />
              <motion.span animate={{ height: ["45%", "70%", "30%", "45%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.15 }} className="w-1 bg-sun-gold rounded-full" />
            </div>
          </motion.div>
        );

      case "airdrop":
        if (airdropProgress >= 100) {
          return (
            <motion.div 
              key="airdropSuccess" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center justify-center gap-2.5 w-full px-4 py-1.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white/95">AirDrop Completed</span>
            </motion.div>
          );
        }
        return (
          <motion.div 
            key="airdropProgress" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex flex-col justify-between w-full px-4 py-2 gap-2"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-white/95 leading-tight truncate">AirDrop File</div>
                  <div className="text-[9px] font-mono text-white/50 mt-0.5 truncate">MacBook Pro (M3 Max)</div>
                </div>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold shrink-0">{airdropProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-75"
                style={{ width: `${airdropProgress}%` }}
              />
            </div>
          </motion.div>
        );

      case "airdropMini":
        return (
          <motion.div 
            key="airdropMini" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center gap-2 px-3 py-1"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-mono font-medium text-white/90">AirDrop Sent</span>
          </motion.div>
        );

      case "lowBattery":
        return (
          <motion.div 
            key="lowBattery" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4 py-2"
          >
            <div className="text-left">
              <div className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-wider">BATTERY ALERT</div>
              <div className="text-xs text-white/95 font-medium mt-0.5">20% Remaining</div>
            </div>
            {/* Battery outline with thin bar on the left */}
            <div className="flex items-center gap-0.5 shrink-0">
              <div className="w-10 h-5 border border-red-500/70 rounded p-0.5 flex items-center justify-start bg-black/40">
                <div className="w-[20%] h-full bg-red-500 rounded-2xs animate-pulse" />
              </div>
              <div className="w-1 h-2.5 bg-red-500/70 rounded-r-2xs" />
            </div>
          </motion.div>
        );

      case "phone":
        if (phoneState === "active") {
          return (
            <motion.div 
              key="phoneActive" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center justify-between w-full px-4 py-2"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Active Call</div>
                  <div className="text-xs font-semibold text-white/95 truncate max-w-[110px]">Alex Rivers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-white/90">{formatSecs(phoneSecs)}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPhoneState("ended")}
                  className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        }

        if (phoneState === "ended") {
          return (
            <motion.div 
              key="phoneEnded" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center justify-center gap-2 w-full px-4 py-1.5"
            >
              <PhoneOff className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-xs font-semibold text-white/90">Call Ended</span>
            </motion.div>
          );
        }

        return (
          <motion.div 
            key="phoneIncoming" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4 py-2"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-sun-gold/20 border border-sun-gold/40 flex items-center justify-center font-bold text-sm text-sun-gold shrink-0">
                A
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-white/50 uppercase tracking-wider font-semibold">Incoming Call</div>
                <div className="text-xs font-semibold text-white/95 truncate max-w-[110px]">Alex Rivers</div>
              </div>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhoneState("ended")}
                className="w-8 h-8 rounded-full bg-red-500/25 border border-red-500/50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhoneState("active");
                  setPhoneSecs(0);
                }}
                className="w-8 h-8 rounded-full bg-emerald-500/25 border border-emerald-500/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
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
            className="w-full flex flex-col justify-center gap-1.5 px-4.5 py-2"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-sun-gold shrink-0" />
                <span className="text-xs font-semibold text-white/95">Find My iPhone</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </div>
            <div className="w-full flex items-center justify-between px-0.5">
              <span className="text-[11px] font-mono text-white/65">Precision Finding: Nearby</span>
              <div className="flex gap-1 items-center">
                <span className="w-1 h-3 bg-sun-gold rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
                <span className="w-1 h-4 bg-sun-gold rounded-full animate-pulse" style={{ animationDelay: "0.15s" }} />
                <span className="w-1 h-2 bg-sun-gold rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </motion.div>
        );

      case "screenRecord":
        if (screenRecordAction === "saved") {
          return (
            <motion.div 
              key="screenRecSaved" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center justify-center gap-2.5 w-full px-4 py-1.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white/95">Recording Saved to Photos</span>
            </motion.div>
          );
        }

        if (screenRecordAction === "deleted") {
          return (
            <motion.div 
              key="screenRecDeleted" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center justify-center gap-2 w-full px-4 py-1.5"
            >
              <Trash2 className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-xs font-semibold text-red-400">Recording Deleted</span>
            </motion.div>
          );
        }

        return (
          <motion.div 
            key="screenRecActive" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center justify-between w-full px-4 py-1.5"
          >
            <span className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white/20 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <span className="text-xs font-mono font-bold text-white/95">
                REC {formatSecs(screenRecSecs)}
              </span>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <div
                onClick={() => setScreenRecordAction("saved")}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Done</span>
              </div>
              <div
                onClick={() => setScreenRecordAction("deleted")}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 hover:bg-red-500/35 text-red-400 text-[11px] font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </div>
            </div>
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
            className="flex items-center justify-center gap-3 w-full px-3 py-1"
          >
            <div className="w-3 h-3 rounded-full bg-black border border-white/10 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </motion.div>
        );
    }
  };

  // When previewed or in minimal mode, keep ONLY the dynamic island capsule (remove all surrounding card elements)
  return (
    <div
      className="w-full h-full min-h-[160px] flex items-center justify-center cursor-pointer select-none relative z-10 p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          width: config.width,
          height: config.height,
          borderRadius: config.borderRadius,
          backgroundColor: config.bg,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 240 }}
        className="border border-white/10 flex items-center justify-center p-2 relative overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
