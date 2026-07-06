import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, Volume2, Sparkles, Terminal, Cpu, Zap, GitBranch, Shield, Home, Folder, Settings, User } from "lucide-react";
import Dither from "./ui/dither";
import SplitText from "./ui/SplitText";

// ── SUB-COMPONENT 1: IMAGE REVEAL CARD ──
function ImageRevealCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Underneath: Premium image reveal */}
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
          alt="Abstract Background" 
          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        {/* Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Red logo cover layer */}
      <motion.div
        animate={{ y: hovered ? "-100%" : "0%" }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="absolute inset-0 bg-[#E11D48] z-20 flex items-center justify-center"
      >
        <span className="font-serif text-white text-[120px] font-bold select-none tracking-tight select-none">
          K
        </span>
      </motion.div>

      {/* Card Header & Footer */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          REVEAL STYLE
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Widget Preview
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Image reveal
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 2: HOVER MEMBERS CARD ──
const MEMBERS = [
  { name: "John D.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Sarah K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Alex M.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "Emily R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" },
  { name: "David L.", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80" }
];

function HoverMembersCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1c1c1c]/10 to-[#121212] opacity-40" />

      {/* Card Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          STAGGER VIEW
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Centered Avatar list */}
      <div className="relative z-10 flex justify-center items-center h-20">
        <div className="flex -space-x-4">
          {MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: hovered ? (i - 2) * 16 : 0,
                rotate: hovered ? (i - 2) * 4 : 0
              }}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              className="relative w-12 h-12 rounded-full border-2 border-[#121212] overflow-hidden"
              style={{ zIndex: hovered ? 10 + i : 1 }}
            >
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive Team
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Hover members
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 3: DEVOURING DETAILS SIGN IN CARD ──
function DevouringDetailsCard() {
  const [hovered, setHovered] = useState(false);
  const [emailText, setEmailText] = useState("");
  const fullEmail = "guri@gmail.com";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setEmailText(fullEmail.slice(0, index));
      index = (index + 1) % (fullEmail.length + 3); // pause a bit at the end
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-transparent to-[#1a1a1a]/30 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          MOTION INPUT
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Sign in Mockup Box */}
      <div className="relative z-10 w-full bg-[#161616] border border-white/5 rounded-xl p-3 flex flex-col gap-1.5">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">
          Sign in command
        </span>
        <div className="flex items-center justify-between bg-black/45 border border-white/5 rounded-lg px-3 py-2 h-9">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/90">
            <Mail className="w-3 h-3 text-white/40" />
            <span>{emailText}</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1 h-3 bg-sun-gold"
            />
          </div>
          <motion.div 
            animate={{ 
              borderColor: hovered ? "rgba(232, 169, 105, 0.4)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: hovered ? "0 0 10px rgba(232, 169, 105, 0.15)" : "none"
            }}
            className="flex items-center gap-0.5 text-[9px] font-mono text-sun-gold border border-white/10 px-1.5 py-0.5 rounded bg-white/5 select-none"
          >
            enter ↵
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Devouring Inputs
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Devouring details sign in
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 4: DYNAMIC ISLAND CARD ──
function DynamicIslandCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
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
                  <span className="text-[8px] font-mono text-white/40">Searching...</span>
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

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Hardware Interface
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Dynamic island
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 5: THINGS DRAG AND SCROLL CARD (Orbital Gravity Sandbox) ──
function ThingsDragAndScrollCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      className="relative w-full h-[544px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:row-span-2 group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#121212] via-transparent to-[#1a1a1a]/20 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          ORBITAL PHYSICS
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Orbit Sandbox Area */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full h-[340px] bg-black/45 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center"
      >
        <span className="absolute top-3 text-[8px] font-mono text-white/20 uppercase tracking-widest select-none pointer-events-none z-30">
          Drag nodes to warp orbits
        </span>

        {/* Concentric Orbit Paths */}
        <div className="absolute w-32 h-32 border border-dashed border-white/5 rounded-full pointer-events-none" />
        <div className="absolute w-52 h-52 border border-dashed border-white/5 rounded-full pointer-events-none" />

        {/* Center core */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8A969] to-[#c78848] flex items-center justify-center shadow-xl shadow-[#E8A969]/10 relative z-20"
        >
          <Sparkles className="w-6 h-6 text-black" />
        </motion.div>

        {/* Node 1: Terminal */}
        <OrbitalNode 
          containerRef={containerRef}
          defaultX={-65}
          defaultY={-45}
          icon={<Terminal className="w-4 h-4 text-[#E8A969]" />}
        />

        {/* Node 2: CPU */}
        <OrbitalNode 
          containerRef={containerRef}
          defaultX={65}
          defaultY={-45}
          icon={<Cpu className="w-4 h-4 text-[#E8A969]" />}
        />

        {/* Node 3: Zap */}
        <OrbitalNode 
          containerRef={containerRef}
          defaultX={-75}
          defaultY={55}
          icon={<Zap className="w-4 h-4 text-[#E8A969]" />}
        />

        {/* Node 4: GitBranch */}
        <OrbitalNode 
          containerRef={containerRef}
          defaultX={75}
          defaultY={55}
          icon={<GitBranch className="w-4 h-4 text-[#E8A969]" />}
        />

        {/* Node 5: Shield */}
        <OrbitalNode 
          containerRef={containerRef}
          defaultX={0}
          defaultY={85}
          icon={<Shield className="w-4 h-4 text-[#E8A969]" />}
        />
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive gravity
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Orbital gravity sandbox
        </h3>
      </div>
    </div>
  );
}

function OrbitalNode({ 
  containerRef, 
  defaultX, 
  defaultY, 
  icon 
}: { 
  containerRef: React.RefObject<HTMLDivElement>;
  defaultX: number;
  defaultY: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      whileDrag={{ scale: 1.15, zIndex: 100 }}
      animate={{ x: defaultX, y: defaultY }}
      transition={{ type: "spring", stiffness: 80, damping: 10 }}
      className="absolute w-11 h-11 rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing hover:border-[#E8A969]/30 transition-colors shadow-lg z-10"
    >
      {icon}
    </motion.div>
  );
}

// ── SUB-COMPONENT 6: RETRO DITHER CARD ──
function DitherCard() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group">
      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          RETRO SHADER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Dither Shader Area */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden border border-white/5 bg-black">
        {isClient && (
          <Dither 
            waveSpeed={0.08}
            waveFrequency={3.5}
            waveAmplitude={0.4}
            waveColor={[0.1, 0.25, 0.7]} // Indigo-blue glow
            baseColor={[0.02, 0.03, 0.08]} // Very dark midnight blue
            colorNum={4}
            pixelSize={3}
          />
        )}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          WebGL Canvas
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Dither waves
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 7: TEXT ROLL GLITCH CARD ──
function TextRollCard() {
  const [hovered, setHovered] = useState(false);
  const word = "KOMOREBI";
  
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
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
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Text roll hover
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 8: BORDER BEAM CARD ──
function BorderBeamCard() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* rotating border glow */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700 ease-out overflow-hidden">
        <div 
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_60%,#E8A969_90%,transparent_100%)] animate-[spin_4s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
      </div>
      <div className="absolute inset-[1px] bg-[#121212] rounded-[15px] z-10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          BORDER GLOW
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Soundwave Visualizer Area */}
      <div className="relative z-20 w-full flex flex-col gap-2.5 bg-black/45 border border-white/5 rounded-xl p-3 h-20 justify-center">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-sun-gold/75 animate-pulse" />
          <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">
            Audio wave rendering
          </span>
        </div>
        
        {/* Animated Bar graph lines */}
        <div className="flex items-end justify-center w-full h-8 px-2 gap-[3px]">
          {[2.5, 1.2, 3.8, 2.0, 1.0, 3.2, 4.5, 1.8, 2.8, 3.5, 1.4, 2.9, 4.0, 2.2, 1.5].map((val, idx) => (
            <motion.div 
              key={idx}
              animate={{ 
                height: hovered 
                  ? [`${val * 6}px`, `${Math.max(4, val * 2.5)}px`, `${val * 6}px`]
                  : "6px"
              }}
              transition={
                hovered 
                  ? { 
                      repeat: Infinity, 
                      duration: 0.6 + (idx % 4) * 0.15, 
                      ease: "easeInOut" 
                    }
                  : { 
                      duration: 0.35,
                      ease: "easeOut"
                    }
              }
              className="bg-gradient-to-t from-sun-gold/20 to-sun-gold rounded-full shrink-0 w-[3.5px]"
            />
          ))}
        </div>
      </div>

      <div className="relative z-20">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          CSS Borders
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Border beam
        </h3>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 9: INTERACTIVE DOCK/NAVBAR CARD (Card 9 - New Wide!) ──
const DOCK_ITEMS = [
  { label: "Home", icon: <Home className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Files", icon: <Folder className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Terminal", icon: <Terminal className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Settings", icon: <Settings className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Mail", icon: <Mail className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Profile", icon: <User className="w-5 h-5 text-[#E8A969]" /> }
];

import { useMotionValue, useSpring, useTransform } from "framer-motion";

function InteractiveNavbarCard() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState("");
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    if (hoveredIdx !== null) {
      setTooltipText(DOCK_ITEMS[hoveredIdx].label);
    }
  }, [hoveredIdx]);

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:col-span-2 md:col-span-2 group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-60" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          INTERACTIVE DOCK
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Center Dock Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-28 gap-4">
        {/* Tooltip display */}
        <div className="h-6 flex items-center justify-center">
          <div
            className={`px-2.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono font-semibold text-[#E8A969] tracking-wider uppercase shadow-xl transition-all duration-200 ease-out ${
              hoveredIdx !== null 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-1.5 scale-90"
            }`}
          >
            {tooltipText}
          </div>
        </div>

        {/* Dock Bar */}
        <div 
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            setHoveredIdx(null);
          }}
          className="flex items-end justify-center gap-3.5 bg-black/35 border border-white/5 rounded-2xl px-5 h-16 pb-2.5 backdrop-blur-md shadow-2xl"
        >
          {DOCK_ITEMS.map((item, idx) => (
            <DockIcon
              key={idx}
              mouseX={mouseX}
              label={item.label}
              icon={item.icon}
              idx={idx}
              setHoveredIdx={setHoveredIdx}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive navigation
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Mac-style magnifying dock
        </h3>
      </div>
    </div>
  );
}

function DockIcon({ 
  mouseX, 
  icon, 
  idx, 
  setHoveredIdx 
}: { 
  mouseX: any; 
  label: string; 
  icon: React.ReactNode; 
  idx: number;
  setHoveredIdx: (idx: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-100, 0, 100], [40, 56, 40]);
  const yTransform = useTransform(distance, [-100, 0, 100], [0, -14, 0]);

  const width = useSpring(widthTransform, { stiffness: 450, damping: 25 });
  const y = useSpring(yTransform, { stiffness: 450, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width, y }}
      onMouseEnter={() => setHoveredIdx(idx)}
      className="rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-lg relative group/item hover:border-[#E8A969]/30 cursor-pointer shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />
      {icon}
    </motion.div>
  );
}


// ── SUB-COMPONENT 10: INFINITE MARQUEE (Card 10 - New!) ──
const TECH_TAGS = [
  "React", "TypeScript", "WebGL", "GSAP", "TailwindCSS", "Framer Motion", "ThreeJS", "Vite"
];

function InfiniteMarqueeCard() {
  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-transparent to-[#1c1c1c]/10 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          INFINITE LOOP
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="relative z-10 w-full overflow-hidden h-12 flex items-center bg-black/35 border border-white/5 rounded-xl px-2">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="flex gap-3 w-max shrink-0"
        >
          {TECH_TAGS.concat(TECH_TAGS).map((tag, index) => (
            <div 
              key={index}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/70"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8A969]/80" />
              {tag}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Seamless loops
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Infinite marquee
        </h3>
      </div>
    </div>
  );
}

// ── MAIN BENTO SHOWCASE COMPONENT ──
export default function BentoShowcase() {
  return (
    <section 
      id="bento-showcase" 
      className="relative z-10 bg-[#090909] py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center select-none"
    >
      {/* ── HEADER ── */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-20 w-full">
        <SplitText
          text="12+ Creative components"
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-tight inline-block"
          tag="h2"
          splitType="words"
          delay={80}
          duration={0.8}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-120px"
        />
        <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed font-heading">
          No extra packages - just copy the code or install directly with our CLI <code className="text-[#E8A969] bg-white/5 px-1.5 py-0.5 rounded font-mono">npx komorebi-ui init</code>.
        </p>
      </div>

      {/* ── BENTO GRID ── */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ImageRevealCard />
        <HoverMembersCard />
        <ThingsDragAndScrollCard />
        <DevouringDetailsCard />
        <DynamicIslandCard />
        <DitherCard />
        <TextRollCard />
        <BorderBeamCard />
        <InteractiveNavbarCard />
        <InfiniteMarqueeCard />
      </div>
    </section>
  );
}
