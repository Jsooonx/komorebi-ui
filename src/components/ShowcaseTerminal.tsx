import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Play, RotateCcw, ArrowUpRight, ChevronDown } from "lucide-react";
import StoryCard from "./StoryCard";
import Analytics from "./Analytics";
import RotatingText from "./ui/RotatingText";

const TABS = [
  { id: "hero", label: "Hero Sections" },
  { id: "features", label: "Features", disabled: true },
  { id: "bento", label: "Bento Grids" },
  { id: "parallax", label: "Parallax Blocks", disabled: true },
  { id: "keyboard", label: "Keyboard", disabled: true },
  { id: "canvas", label: "Canvas Card" },
  { id: "text-reveal", label: "Text Reveal", disabled: true },
];

function AuraHeroPreview() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const line1 = "Automating customer";
  const line2 = "delight at scale — is an";
  const line3 = "Algorithm";

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#08090c] text-white flex flex-col justify-between p-8 font-heading select-none text-left">
      {/* Background Natural Scenery */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aura-hero-bg.png"
          alt="Aura Natural Scenery"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/75" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between w-full shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg className="w-20 h-6 overflow-visible" viewBox="0 0 120 30" fill="none">
            <motion.circle
              cx="14.3"
              cy="14.9"
              r="7"
              stroke="#fff"
              strokeWidth="2.5"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              d="M28.5 14.6C28.4 12.3 27.7 10 26.5 8C25.3 6 23.6 4.3 21.5 3.2C19.4 2 17.1 1.5 14.7 1.5C12.4 1.5 10.1 2.2 8.1 3.4"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.path
              d="M37.5 14.9C37.5 12.2 36.6 9.5 35.1 7.3C33.5 5 31.3 3.3 28.7 2.4"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.g
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <text x="46" y="22" fontFamily="Inter Tight" fontSize="22" fontWeight="700" fill="#fff" letterSpacing="-0.5">
                Aura
              </text>
              <text x="96" y="10" fontSize="10" fill="#fff">
                ™
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Navigation pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-6 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[13px] font-medium text-white/70 shadow-lg"
        >
          <span className="hover:text-white transition-colors cursor-pointer">Widget</span>
          <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
            Integrations
            <span className="px-1.5 py-0.5 rounded-full bg-[#00f5a0]/15 text-[#00f5a0] text-[10px] font-bold">12</span>
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">Pricing</span>
          <span className="hover:text-white transition-colors cursor-pointer">Docs</span>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-medium text-[13px] hover:bg-white/90 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Request Demo
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Main Slogan in Center-Left */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl text-left mt-8 select-none"
      >
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
          <span className="block overflow-hidden pb-1">
            {line1.split("").map((ch, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block whitespace-pre">
                {ch}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden pb-1">
            {line2.split("").map((ch, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block whitespace-pre">
                {ch}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {line3.split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                className="inline-block italic font-serif font-normal text-white/90 whitespace-pre"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>
      </motion.div>

      {/* Side Links on Right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 items-end text-xs font-mono">
        <div className="flex items-center gap-2 text-white">
          <span>Home</span>
          <span className="w-3 h-[1px] bg-white" />
        </div>
        <div className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">Automation</div>
        <div className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">Integrations</div>
        <div className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">Pricing Plan</div>
        <div className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">Contact Us</div>
      </div>

      {/* Bottom Panel */}
      <div className="relative z-10 flex items-end justify-between w-full shrink-0 gap-8 mt-4">
        {/* Left Side: Stats and Desc */}
        <div className="flex flex-col gap-2 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs font-mono uppercase tracking-widest text-[#00f5a0]"
          >
            01 — Our vision
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xs text-white/50 leading-relaxed font-heading"
          >
            We power the next generation of B2B support, transforming manual ticketing backlogs into instant self-learning conversations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-4 mt-2"
          >
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium text-[13px] cursor-pointer">
              Explore integrations
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white cursor-pointer group">
              <span>Scroll down</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>
        </div>

        {/* Right Side: Conversational SDK Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="flex w-[320px] bg-white text-black p-1.5 rounded-lg overflow-hidden shadow-2xl shrink-0 cursor-pointer"
        >
          <div className="w-[110px] h-[85px] shrink-0 rounded overflow-hidden p-0.5 bg-black/5">
            <img src="/aura-about-card.png" alt="Aura Orb" className="w-full h-full object-cover rounded" />
          </div>
          <div className="flex flex-col justify-between p-2 flex-grow">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-black">SDK Integration</h4>
              <p className="text-[10px] text-black/60 leading-snug mt-1 font-heading">
                Deploy a self-learning widget that integrates directly with your codebase in under two minutes.
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-black/35 self-end transition-colors group-hover:text-black" />
          </div>
        </motion.div>
      </div>

      {/* 8-layer progressive blur backdrop bar simulation */}
      <div className="absolute left-0 right-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-black/80 to-transparent z-5" />
    </div>
  );
}

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
