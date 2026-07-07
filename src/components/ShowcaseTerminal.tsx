import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Play, RotateCcw } from "lucide-react";
import StoryCard from "./StoryCard";
import Analytics from "./Analytics";
import RotatingText from "./ui/RotatingText";
import AuraHeroPreview from "./terminal-elements/AuraHeroPreview";

const TABS = [
  { id: "hero", label: "Hero Sections" },
  { id: "features", label: "Features", disabled: true },
  { id: "bento", label: "Bento Grids" },
  { id: "parallax", label: "Parallax Blocks", disabled: true },
  { id: "keyboard", label: "Keyboard", disabled: true },
  { id: "canvas", label: "Canvas Card" },
  { id: "text-reveal", label: "Text Reveal", disabled: true },
];

export default function ShowcaseTerminal() {
  const [activeTab, setActiveTab] = useState("canvas");
  const [restartKey, setRestartKey] = useState(0);

  return (
    <div className="w-full max-w-[1500px] mx-auto h-[820px] flex flex-col rounded-3xl bg-[#080B09] border border-white/10 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.05)] select-none">
      
      {/* ── WINDOW HEADER BAR ── */}
      <div className="bg-[#0B0F0C] border-b border-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        {/* Left Side: Windows Control Dots */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] opacity-80 hover:opacity-100 transition-opacity" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] opacity-80 hover:opacity-100 transition-opacity" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] opacity-80 hover:opacity-100 transition-opacity" />
          <div className="w-[1px] h-4 bg-white/10 mx-2 hidden md:block"></div>
          <span className="text-[10px] font-mono text-white/30 hidden md:block">komorebi-terminal-v1.0</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0 relative">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono tracking-wide transition-colors shrink-0 select-none ${
                  isActive
                    ? "text-white cursor-pointer"
                    : tab.disabled
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/45 hover:text-white/70 cursor-pointer"
                }`}
              >
                {/* Shared Layout Active Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabCapsule"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                
                {/* Content Layer (elevated above sliding capsule) */}
                <span className="relative z-10 flex items-center gap-1.5">
                  <FolderOpen className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-sun-gold" : tab.disabled ? "text-white/10" : "text-white/25"}`} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TERMINAL BODY (SINGLE-PANEL WORKSPACE) ── */}
      <div className="p-6 relative bg-black/10 flex-grow flex flex-col justify-between overflow-hidden">
        
        {/* Plus Crosshairs positioned at the 4 corners of the content viewport */}
        <span className="absolute top-4 left-4 font-mono text-[12px] text-white/25 z-20 pointer-events-none">+</span>
        <span className="absolute top-4 right-4 font-mono text-[12px] text-white/25 z-20 pointer-events-none">+</span>
        <span className="absolute bottom-4 left-4 font-mono text-[12px] text-white/25 z-20 pointer-events-none">+</span>
        <span className="absolute bottom-4 right-4 font-mono text-[12px] text-white/25 z-20 pointer-events-none">+</span>

        {/* Floating Restart Animation Button */}
        <button
          onClick={() => setRestartKey((prev) => prev + 1)}
          className="absolute top-6 right-6 z-30 flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer active:scale-95 shadow-md"
          title="Restart Animation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col flex-grow h-full justify-center">
          <div className="flex-grow flex items-center justify-center border border-white/5 bg-black/45 rounded-2xl relative overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex justify-center items-center p-6 overflow-hidden"
              >
                {activeTab === "canvas" && (
                  <div key={restartKey} className="w-full max-w-sm flex justify-center">
                    <StoryCard />
                  </div>
                )}
                {activeTab === "bento" && (
                  <div key={restartKey} className="w-full flex justify-center">
                    <Analytics preview={true} />
                  </div>
                )}
                {activeTab === "hero" && (
                  <div key={restartKey} className="absolute inset-0 w-full h-full z-10">
                    <AuraHeroPreview />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
