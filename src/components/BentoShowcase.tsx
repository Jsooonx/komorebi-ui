import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, Volume2 } from "lucide-react";
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
      className="relative w-full h-[544px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:row-span-2 group"
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
        className="relative z-10 w-full h-[340px] bg-black/45 border border-white/5 rounded-xl p-4 overflow-hidden flex flex-wrap gap-3 justify-center items-center content-center"
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

// ── SUB-COMPONENT 9: WIREFRAME MESH CARD (Card 9 - New Wide!) ──
function WireframeMeshCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Grid config
    const cols = 28;
    const rows = 10;
    const points: { x: number; y: number; ox: number; oy: number; cx: number; cy: number }[] = [];

    // Initialize points
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = (width / (cols - 1)) * c;
        const oy = (height / (rows - 1)) * r;
        points.push({
          x: ox,
          y: oy,
          ox: ox,
          oy: oy,
          cx: ox,
          cy: oy
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions
      points.forEach(p => {
        // Wave noise
        const wave = Math.sin(time + p.ox * 0.015) * 8;
        const targetX = p.ox;
        const targetY = p.oy + wave;

        // Mouse deform
        const dx = targetX - mx;
        const dy = targetY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120;

        let rx = targetX;
        let ry = targetY;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          // Push away
          const angle = Math.atan2(dy, dx);
          rx += Math.cos(angle) * force * 35;
          ry += Math.sin(angle) * force * 25;
        }

        // Lerp/Spring inertia
        p.cx += (rx - p.cx) * 0.12;
        p.cy += (ry - p.cy) * 0.12;
      });

      // Draw grid lines
      ctx.strokeStyle = "rgba(232, 169, 105, 0.12)";
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (c === 0) {
            ctx.moveTo(p.cx, p.cy);
          } else {
            ctx.lineTo(p.cx, p.cy);
          }
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (r === 0) {
            ctx.moveTo(p.cx, p.cy);
          } else {
            ctx.lineTo(p.cx, p.cy);
          }
        }
        ctx.stroke();
      }

      // Draw points (dots)
      points.forEach(p => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Highlight dots near mouse
        const dx = p.cx - mx;
        const dy = p.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.fillStyle = "rgba(232, 169, 105, 0.8)";
          ctx.beginPath();
          ctx.arc(p.cx, p.cy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Mouse glow
      if (mx > 0 && mx < width && my > 0 && my < height) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        grad.addColorStop(0, "rgba(232, 169, 105, 0.08)");
        grad.addColorStop(1, "rgba(232, 169, 105, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      // Re-initialize points
      points.length = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (width / (cols - 1)) * c;
          const oy = (height / (rows - 1)) * r;
          points.push({
            x: ox,
            y: oy,
            ox: ox,
            oy: oy,
            cx: ox,
            cy: oy
          });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("resize", handleResize);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-[260px] bg-[#121212] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:col-span-2 md:col-span-2 group"
    >
      {/* Background wireframe mesh */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
      />

      {/* Grid Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212] opacity-80 pointer-events-none z-10" />

      {/* Header */}
      <div className="relative z-20 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          NEURAL NETWORK
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Centered Panel */}
      <div className="relative z-20 w-full max-w-sm mx-auto bg-black/40 border border-white/5 backdrop-blur-xl rounded-xl p-4 flex flex-col items-center text-center gap-1.5 shadow-2xl">
        <h4 className="font-serif text-white text-base font-normal tracking-wide">
          Structural wireframe deformation
        </h4>
        <p className="text-[10px] text-white/45 font-heading max-w-[280px]">
          Hover and glide over the canvas backdrop to warp the coordinates of the mesh in real time.
        </p>
      </div>

      <div className="relative z-20">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          WebGL & Canvas
        </span>
        <h3 className="font-serif text-lg text-white font-normal leading-tight">
          Deformable wireframe grid
        </h3>
      </div>
    </div>
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
        <WireframeMeshCard />
        <InfiniteMarqueeCard />
      </div>
    </section>
  );
}
