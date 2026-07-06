import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail } from "lucide-react";

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

      {/* Card Header & Footer (always visible/on top of image) */}
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
      className="relative w-full h-[300px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
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
      <div className="relative z-10 w-full bg-[#161616] border border-white/5 rounded-xl p-4 flex flex-col gap-2">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
          Sign in command
        </span>
        <div className="flex items-center justify-between bg-black/45 border border-white/5 rounded-lg px-3 py-2.5 h-11">
          <div className="flex items-center gap-1.5 font-mono text-xs text-white/90">
            <Mail className="w-3.5 h-3.5 text-white/40" />
            <span>{emailText}</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 h-3 bg-sun-gold"
            />
          </div>
          <motion.div 
            animate={{ 
              borderColor: hovered ? "rgba(232, 169, 105, 0.4)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: hovered ? "0 0 10px rgba(232, 169, 105, 0.15)" : "none"
            }}
            className="flex items-center gap-1 text-[10px] font-mono text-sun-gold border border-white/10 px-2 py-0.5 rounded bg-white/5 select-none"
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
      className="relative w-full h-[300px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
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
      <div className="relative z-10 flex items-center justify-center h-28 w-full">
        <motion.div
          animate={{ 
            width: hovered ? 220 : 120,
            height: hovered ? 76 : 28,
            borderRadius: hovered ? 24 : 14,
            backgroundColor: hovered ? "#1a1a1a" : "#000000"
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="border border-white/5 flex items-center justify-center p-3 relative overflow-hidden shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!hovered ? (
              <motion.div 
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold text-white/60 tracking-wider uppercase">
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
                className="w-full flex flex-col justify-center items-center gap-1.5"
              >
                <div className="w-full flex items-center justify-between px-1">
                  <Smartphone className="w-4 h-4 text-sun-gold" />
                  <span className="text-[10px] font-mono font-medium text-white/80">
                    Find My iPhone
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                </div>
                <div className="w-full flex items-center justify-between px-1 mt-1 bg-black/35 rounded-lg py-1 px-2 border border-white/5">
                  <span className="text-[9px] font-mono text-white/40">Searching...</span>
                  <div className="flex gap-0.5 items-center">
                    <span className="w-0.5 h-2.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-0.5 h-3 bg-sun-gold animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-0.5 h-1.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-0.5 h-3.5 bg-sun-gold animate-bounce" style={{ animationDelay: "0.3s" }} />
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

// ── SUB-COMPONENT 5: THINGS DRAG AND SCROLL CARD ──
const DRAG_ITEMS = [
  { emoji: "🍔", label: "Burger", color: "from-[#FCD34D] to-[#F59E0B]" },
  { emoji: "🍎", label: "Apple", color: "from-[#FCA5A5] to-[#EF4444]" },
  { emoji: "🐟", label: "Fish", color: "from-[#93C5FD] to-[#3B82F6]" },
  { emoji: "🪐", label: "Planet", color: "from-[#C084FC] to-[#8B5CF6]" },
  { emoji: "🧥", label: "Coat", color: "from-[#FDBA74] to-[#F97316]" },
  { emoji: "🐠", label: "Fishy", color: "from-[#6EE7B7] to-[#10B981]" },
  { emoji: "⛳", label: "Golf", color: "from-[#A7F3D0] to-[#34D399]" }
];

function ThingsDragAndScrollCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      className="relative w-full h-[580px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#121212] via-transparent to-[#1a1a1a]/20 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          PHYSICS DRAG
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Dragging Container Area */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full h-[380px] bg-black/45 border border-white/5 rounded-xl p-4 overflow-hidden flex flex-wrap gap-3 justify-center items-center content-center"
      >
        <span className="absolute top-3 text-[8px] font-mono text-white/20 uppercase tracking-widest select-none pointer-events-none">
          Drag any item inside
        </span>
        
        {DRAG_ITEMS.map((item, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={containerRef}
            dragElastic={0.15}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            className={`flex items-center gap-1.5 px-3 py-2 bg-gradient-to-br ${item.color} rounded-full cursor-grab active:cursor-grabbing shadow-lg border border-white/10 shrink-0 select-none`}
          >
            <span className="text-base">{item.emoji}</span>
            <span className="text-[10px] font-mono font-bold text-black uppercase tracking-wider">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive Physics
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Things drag and scroll
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
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-tight">
          12+ Creative components
        </h2>
        <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed font-heading">
          No extra packages - just copy the code or install directly with our CLI <code className="text-[#E8A969] bg-white/5 px-1.5 py-0.5 rounded font-mono">npx komorebi-ui init</code>.
        </p>

      </div>

      {/* ── BENTO GRID ── */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Column 1 */}
        <div className="flex flex-col gap-6 w-full">
          <ImageRevealCard />
          <DevouringDetailsCard />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6 w-full">
          <HoverMembersCard />
          <DynamicIslandCard />
        </div>

        {/* Column 3 (Tall Column spanned vertically) */}
        <div className="flex flex-col gap-6 w-full lg:col-span-1 md:col-span-2 lg:h-auto">
          <ThingsDragAndScrollCard />
        </div>

      </div>
    </section>
  );
}
