import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, BarChart3, Shuffle, Sparkles } from "lucide-react";

// Shared grid backdrop (reuses the established radial-mask pattern)
function GridBackdrop({ opacity = 20, size = "16px" }: { opacity?: number; size?: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: opacity / 100,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${size} ${size}`,
        backgroundPosition: "center",
        maskImage: "radial-gradient(circle at center, black 25%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 25%, transparent 70%)",
      }}
    />
  );
}

// PREVIEW 1: Living Interfaces (magnetic hover tracking)
function LivingInterfacesPreview() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative w-full h-full flex items-center justify-center rounded-lg bg-black/40 border border-white/5 overflow-hidden cursor-crosshair"
    >
      <GridBackdrop />
      
      {/* Interactive hover magnetic pulse */}
      {hovering && (
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-white/20 bg-white/[0.02] pointer-events-none"
          style={{
            left: mouse.x - 40,
            top: mouse.y - 40,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        />
      )}
      
      {/* Center magnetic point */}
      <motion.div
        animate={hovering ? {
          x: (mouse.x - 120) * 0.25, // magnetic attract towards cursor
          y: (mouse.y - 100) * 0.25,
        } : { x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)] flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-black" />
      </motion.div>

      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest select-none">
        {hovering ? "Hover Active - Magnetized" : "Ambient State"}
      </span>
    </div>
  );
}

// PREVIEW 2: Data in Motion (scroll-linked spline telemetry)
function DataInMotionPreview() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate varying refresh rate telemetry
      setFps(Math.floor(138 + Math.random() * 6));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg bg-black/40 border border-white/5 overflow-hidden p-6 flex flex-col justify-between">
      <GridBackdrop />
      
      {/* Metrics telemetry row */}
      <div className="flex justify-between items-start z-10">
        <div className="text-left">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">TELEMETRY</span>
          <span className="text-sm font-sans font-bold text-white tracking-tight">Active FPS</span>
        </div>
        <div className="text-right font-mono">
          <motion.span 
            key={fps}
            initial={{ opacity: 0.5, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white tracking-tight"
          >
            {fps}
          </motion.span>
          <span className="text-[9px] text-white/40 ml-1">Hz</span>
        </div>
      </div>

      {/* Telemetry spline graph path */}
      <div className="h-16 w-full relative z-10 flex items-end">
        <svg className="w-full h-full text-white/40" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Spline area */}
          <motion.path
            d="M 0 25 Q 20 5 40 18 T 80 8 T 100 15 L 100 30 L 0 30 Z"
            fill="url(#chart-grad)"
          />
          {/* Spline line */}
          <motion.path
            d="M 0 25 Q 20 5 40 18 T 80 8 T 100 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest select-none">
        Telemetry Spline
      </span>
    </div>
  );
}

// PREVIEW 3: Seamless Transitions (shared layout switcher tabs)
function SeamlessTransitionsPreview() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 rounded-lg bg-black/40 border border-white/5 overflow-hidden p-4">
      <GridBackdrop />
      
      {/* Tab selector menu */}
      <div className="flex bg-[#0f0f11] border border-white/5 rounded-full p-1 z-10">
        {["Tab 1", "Tab 2", "Tab 3"].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className="relative px-3.5 py-1 text-[10px] font-sans font-medium text-white/60 hover:text-white transition-colors rounded-full"
          >
            {activeTab === idx && (
              <motion.div
                layoutId="transition-pill"
                className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content card morph */}
      <div className="w-40 h-16 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-3 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-[10px] font-mono text-white/50"
          >
            {activeTab === 0 && "📁 Render Module: Alpha"}
            {activeTab === 1 && "⚡ Speed Index: 98.2"}
            {activeTab === 2 && "🔒 Security: Encrypted"}
          </motion.div>
        </AnimatePresence>
      </div>

      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest select-none">
        Shared Layout
      </span>
    </div>
  );
}

// PREVIEW 4: Pixel Craft (clip-path wireframe reveal slider)
function PixelCraftPreview() {
  const [slideX, setSlideX] = useState(50);
  
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 0.03;
      setSlideX(50 + Math.sin(start) * 35); // oscillates between 15% and 85%
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-black/40 border border-white/5 overflow-hidden">
      <GridBackdrop />
      
      <div className="relative w-44 h-28 rounded-xl overflow-hidden border border-white/10 bg-[#0b0b0d] flex items-center justify-center shadow-lg">
        {/* Left side: Wireframe / Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20 select-none">
          <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-dashed border-white/10" />
          </div>
        </div>

        {/* Right side: Finished glow card, revealed via clipPath */}
        <div 
          className="absolute inset-0 bg-[#16161a] flex items-center justify-center text-white"
          style={{
            clipPath: `polygon(0 0, ${slideX}% 0, ${slideX}% 100%, 0 100%)`
          }}
        >
          {/* Glowing grid and circles */}
          <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-full border border-white/30 bg-white/[0.04] shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white/90" />
          </div>
        </div>

        {/* Slide divider line */}
        <div 
          className="absolute inset-y-0 w-px bg-white/40 shadow-[0_0_8px_white]"
          style={{ left: `${slideX}%` }}
        />
      </div>

      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest select-none">
        Clip Path
      </span>
    </div>
  );
}

// Feature definitions
interface Feature {
  icon: React.ReactNode;
  title: string;
  eyebrow: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  supportLabel: string;
  supportValue: string;
  bullets: string[];
  preview: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    icon: <Wind className="w-5 h-5 text-white/80 stroke-[1.5]" />,
    title: "Living Interfaces",
    eyebrow: "Presence systems",
    description:
      "Surfaces that respond to presence with magnetic fields, cursor trails, and organic drift.",
    metricLabel: "Response field",
    metricValue: "24ms",
    supportLabel: "Motion layer",
    supportValue: "Cursor-aware",
    bullets: ["Magnetic hover zones", "Ambient trail echoes", "Breathing idle states"],
    preview: <LivingInterfacesPreview />,
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-white/80 stroke-[1.5]" />,
    title: "Data in Motion",
    eyebrow: "Narrated telemetry",
    description:
      "Animate graphs, counters, and progress rings with scroll-linked reveal sequences.",
    metricLabel: "Signal cadence",
    metricValue: "6 tracks",
    supportLabel: "Sync mode",
    supportValue: "Scroll-linked",
    bullets: ["Staggered chart reveals", "Narrated counters", "Adaptive progress rails"],
    preview: <DataInMotionPreview />,
  },
  {
    icon: <Shuffle className="w-5 h-5 text-white/80 stroke-[1.5]" />,
    title: "Seamless Transitions",
    eyebrow: "Shared-element flow",
    description: "Layout morphs, shared-element handoffs, and route-aware page choreography.",
    metricLabel: "Handoff depth",
    metricValue: "3 layers",
    supportLabel: "Swap mode",
    supportValue: "Layout-driven",
    bullets: ["Shared-layout capsules", "Page-to-page choreography", "Soft state handoffs"],
    preview: <SeamlessTransitionsPreview />,
  },
  {
    icon: <Sparkles className="w-5 h-5 text-white/80 stroke-[1.5]" />,
    title: "Pixel Craft",
    eyebrow: "Surface illusion",
    description:
      "Shader-grade visuals achieved with lightweight CSS masks and clip-path illusions.",
    metricLabel: "Render stack",
    metricValue: "CSS only",
    supportLabel: "Surface pass",
    supportValue: "Masked glow",
    bullets: ["Clip-path reveals", "Soft shimmer sweeps", "Low-cost glossy depth"],
    preview: <PixelCraftPreview />,
  },
];

export default function Features3Card({ minimal = false }: { minimal?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((i) => (i + 1) % FEATURES.length);
      }
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;
  const activeFeature = FEATURES[activeIndex];

  const content = (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-16 select-none flex flex-col justify-center items-center">
      {/* Block Header */}
      <div className="text-center mb-6 md:mb-8 shrink-0">
        <h3 className="font-sans text-3xl sm:text-4xl font-semibold leading-tight text-white tracking-tight">
          Spotlight features, in motion
        </h3>
        <p className="text-xs sm:text-sm text-white/45 mt-3 font-sans max-w-lg mx-auto leading-relaxed select-text">
          Hover any pillar to focus its live preview. The showcase auto-rotates and pauses the
          moment you take control.
        </p>
      </div>

      {/* Spotlight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {/* Left: Feature List */}
        <div className="flex flex-col gap-2.5">
          {FEATURES.map((feat, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => {
                  setActiveIndex(i);
                  setPaused(true);
                }}
                onMouseLeave={() => setPaused(false)}
                onClick={() => setActiveIndex(i)}
                className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden w-full ${
                  isActive
                    ? "bg-white/[0.03] border-white/10"
                    : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="f3-active-surface"
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <div className="relative z-10 flex items-start gap-3 pl-3">
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-[#09090b]/80 backdrop-blur flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:border-white/20">
                    {feat.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.24em] text-white/28 mb-1.5">
                      {feat.eyebrow}
                    </span>
                    <h4 className="text-sm sm:text-base font-sans font-semibold text-white/90 tracking-tight transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/45 mt-1.5 font-sans leading-relaxed select-text">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Preview Panel */}
        <div className="relative rounded-2xl bg-[#0b0b0d] border border-white/[0.04] p-4 flex flex-col overflow-hidden">
          <div className="absolute top-3 right-4 text-[10px] font-mono text-white/30 tracking-widest select-none">
            {String(activeIndex + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
          </div>
          <div className="mb-3 flex items-center justify-between gap-3 pr-12">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                {activeFeature.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/28">
                  {activeFeature.eyebrow}
                </div>
                <div className="text-sm font-sans font-semibold text-white/88 truncate">
                  {activeFeature.title}
                </div>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[9px] font-mono uppercase tracking-[0.22em] text-white/42">
              Live preview
            </div>
          </div>

          <div className="relative w-full h-[220px] md:h-[260px] rounded-lg bg-black/20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
                style={{ willChange: "transform, opacity" }}
              >
                {activeFeature.preview}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeIndex}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/30">
                      {activeFeature.metricLabel}
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight text-white/90">
                      {activeFeature.metricValue}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/30">
                      {activeFeature.supportLabel}
                    </div>
                    <div className="mt-2 text-sm font-semibold tracking-tight text-white/82">
                      {activeFeature.supportValue}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/28">
                      Active composition
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/38">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {activeFeature.bullets.map((bullet, index) => (
                      <motion.div
                        key={`${activeFeature.title}-${bullet}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: index * 0.06, ease: "easeOut" }}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.04] bg-black/20 px-3 py-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/55 shrink-0" />
                        <span className="text-[11px] text-white/56 leading-relaxed">{bullet}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#09090b]"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[640px] rounded-lg bg-[#09090b] border border-white/5 overflow-y-auto scrollbar-none select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
