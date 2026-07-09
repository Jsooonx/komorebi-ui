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

// PREVIEW 1: Living Interfaces (magnetic pulse)
function LivingInterfacesPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-black/40 border border-white/5 overflow-hidden">
      <GridBackdrop />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[130px] h-[130px] rounded-full border border-white/20"
          initial={{ scale: 0.15, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2.6, delay: i * 0.7, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        />
      ))}
      <motion.div
        className="relative z-10 w-3 h-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest">
        magnetic
      </span>
    </div>
  );
}

// PREVIEW 2: Data in Motion (scroll-linked bars)
function DataInMotionPreview() {
  const bars = [42, 68, 52, 92, 64];
  return (
    <div className="relative w-full h-full rounded-lg bg-black/40 border border-white/5 overflow-hidden p-5 flex items-end justify-center gap-3">
      <GridBackdrop />
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-7 rounded-md bg-gradient-to-t from-white/10 to-white/65 border border-white/10 origin-bottom"
          style={{ height: `${h}%`, willChange: "transform, opacity" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
        />
      ))}
      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest">
        scroll-linked
      </span>
    </div>
  );
}

// PREVIEW 3: Seamless Transitions (shared layout swap)
function SeamlessTransitionsPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-black/40 border border-white/5 overflow-hidden">
      <GridBackdrop />
      <motion.div
        className="absolute w-28 h-20 rounded-xl bg-white/[0.04] border border-white/10"
        initial={{ x: -36, y: 22, rotate: -6, opacity: 0 }}
        animate={{ x: -14, y: 12, rotate: -6, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      />
      <motion.div
        className="absolute w-28 h-20 rounded-xl bg-white/[0.06] border border-white/15 shadow-lg flex items-center justify-center"
        initial={{ x: 36, y: -22, rotate: 6, opacity: 0, scale: 0.92 }}
        animate={{ x: 14, y: -12, rotate: 6, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        style={{ willChange: "transform, opacity" }}
      >
        <Shuffle className="w-5 h-5 text-white/70 stroke-[1.5]" />
      </motion.div>
      <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest">
        shared layout
      </span>
    </div>
  );
}

// PREVIEW 4: Pixel Craft (clip-path reveal + shimmer)
function PixelCraftPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-black/40 border border-white/5 overflow-hidden">
      <GridBackdrop />
      <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-white/10 bg-[#0b0b0d]">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.04), rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
          }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "360%" }}
          transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
        <span className="absolute bottom-2 left-3 text-[8px] font-mono text-white/40 uppercase tracking-widest">
          clip-path
        </span>
      </div>
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
                    layoutId="f3-active-bar"
                    className="absolute left-2 top-4 bottom-4 w-px rounded-full bg-gradient-to-b from-transparent via-white/70 to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
