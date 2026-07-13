import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  BarChart3,
  Check,
  CircleDot,
  GitBranch,
  ListChecks,
  Sparkles,
  Workflow,
  Play,
  Pause,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type SurfaceId = "context" | "network" | "decisions" | "delivery";

type OrbitSurface = {
  id: SurfaceId;
  label: string;
  eyebrow: string;
  metric: string;
  icon: typeof Activity;
};

const surfaceOrder: OrbitSurface[] = [
  { id: "context", label: "Context", eyebrow: "01 / READ", metric: "42", icon: Activity },
  { id: "network", label: "Network", eyebrow: "02 / CONNECT", metric: "18", icon: GitBranch },
  { id: "decisions", label: "Decisions", eyebrow: "03 / ALIGN", metric: "07", icon: ListChecks },
  { id: "delivery", label: "Delivery", eyebrow: "04 / MOVE", metric: "92%", icon: Workflow },
];

const orbitProgress = [0, 0.25, 0.5, 0.75, 1];

// 3D coordinates for orbiting elements
const orbitX = [
  [-210, -42, 210, 118, -170],
  [176, 220, -24, -210, 152],
  [38, -158, -218, 22, -184],
  [-116, 136, 72, -222, 72],
];

const orbitY = [
  [-34, -14, 30, 152, -42],
  [88, -72, -18, 94, 66],
  [126, 72, -38, -92, 112],
  [-106, 88, 116, -44, -84],
];

const orbitZ = [
  [82, 178, -70, -150, 58],
  [-24, 92, 188, -52, -38],
  [-76, -18, 122, 188, -82],
  [144, -74, -26, 110, 168],
];

const orbitScale = [
  [0.86, 1.08, 0.84, 0.72, 0.9],
  [0.82, 0.91, 1.08, 0.84, 0.88],
  [0.8, 0.86, 0.9, 1.08, 0.82],
  [1.04, 0.82, 0.86, 0.92, 1.06],
];

const orbitOpacity = [
  [0.68, 1, 0.46, 0.22, 0.62],
  [0.42, 0.72, 1, 0.42, 0.54],
  [0.3, 0.42, 0.7, 1, 0.32],
  [0.86, 0.34, 0.4, 0.68, 1],
];

const orbitRotation = [
  [-5, -1, 5, 8, -4],
  [4, 7, -2, -7, 4],
  [7, 4, -6, -2, 6],
  [-4, -7, 3, 6, -5],
];

const reducedOrbitX = [-126, 126, -96, 96];
const reducedOrbitY = [-72, -72, 76, 76];

function SurfaceChrome({ surface, compact = false }: { surface: OrbitSurface; compact?: boolean }) {
  const Icon = surface.icon;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`flex shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/65 ${compact ? "h-5 w-5" : "h-6 w-6"}`}
        >
          <Icon className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
        </span>
        <div className="min-w-0">
          <div className={`truncate text-white/75 ${compact ? "text-[9px]" : "text-xs"}`}>
            {surface.label}
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
            {surface.eyebrow}
          </div>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[9px] text-white/45">{surface.metric}</span>
    </div>
  );
}

function ContextSurface({ compact = false }: { compact?: boolean }) {
  const rows = [
    ["Customer notes", "14"],
    ["Open threads", "09"],
    ["Quiet signals", "19"],
  ];

  return (
    <div className={compact ? "mt-2.5 space-y-1.5" : "mt-4 space-y-2"}>
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={`flex items-center justify-between rounded-md border border-white/[0.07] bg-white/[0.025] ${compact ? "px-2 py-1 text-[8px]" : "px-2.5 py-1.5 text-[9px]"}`}
        >
          <div className="flex min-w-0 items-center gap-2 text-white/55">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${index === 1 ? "bg-[#c6d478]" : "bg-white/25"}`}
            />
            <span className="truncate">{label}</span>
          </div>
          <span className="ml-2 font-mono text-white/35">{value}</span>
        </div>
      ))}
      {/* High-Fidelity Heartbeat Pulse Upgrade */}
      {!compact && (
        <div className={`flex items-center justify-between rounded-md border border-white/[0.07] bg-black/35 ${compact ? "mt-2 px-2 py-1" : "mt-3 px-2.5 py-1.5"}`}>
          <span className="text-[7.5px] uppercase tracking-[0.08em] text-white/30 font-mono">Pulse feed</span>
          <svg className="h-4 w-20 text-[#c6d478]/30" viewBox="0 0 100 30" fill="none">
            <path
              d="M0,15 L30,15 L35,5 L40,25 L45,10 L50,18 L55,15 L100,15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated pulsing path overlay */}
            <motion.path
              d="M0,15 L30,15 L35,5 L40,25 L45,10 L50,18 L55,15 L100,15"
              stroke="#c6d478"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function NetworkSurface({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "mt-2.5 h-16" : "mt-4 h-24"}`}>
      {/* Active Node Graph Upgrade */}
      <svg className="w-full h-full opacity-60" viewBox="0 0 160 80">
        <path d="M25,40 L75,20 L125,50 L85,60 Z" stroke="white" strokeWidth="0.75" strokeOpacity="0.15" fill="none" />
        <path d="M75,20 L85,60" stroke="white" strokeWidth="0.75" strokeOpacity="0.15" />
        <path d="M25,40 L85,60" stroke="white" strokeWidth="0.75" strokeOpacity="0.1" />
        
        <circle cx="25" cy="40" r="3" fill="#ffffff" fillOpacity="0.8" className="animate-[pulse_2s_infinite]" />
        <circle cx="75" cy="20" r="3" fill="#c6d478" className="animate-[pulse_1.5s_infinite]" />
        <circle cx="125" cy="50" r="3" fill="#ffffff" fillOpacity="0.5" />
        <circle cx="85" cy="60" r="3.5" fill="#ffffff" fillOpacity="0.7" />
      </svg>
      {!compact && (
        <div className="absolute bottom-0 left-0 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#c6d478]/80">
          <span className="h-1 w-1 rounded-full bg-[#c6d478] animate-ping" /> 04 active nodes
        </div>
      )}
    </div>
  );
}

function DecisionsSurface({ compact = false }: { compact?: boolean }) {
  const rows = [
    ["Reduce friction", "High", "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"],
    ["Clarify ownership", "Ready", "bg-blue-500/10 text-blue-400 border-blue-500/20"],
    ["Protect momentum", "Next", "bg-amber-500/10 text-amber-400 border-amber-500/20"],
  ];

  return (
    <div className={compact ? "mt-2.5 space-y-1.5" : "mt-4 space-y-2"}>
      {rows.map(([label, status, badgeClass], index) => (
        <div
          key={label}
          className={`flex items-center justify-between rounded-md border ${index === 0 ? "border-white/20 bg-white/[0.08]" : "border-white/[0.07] bg-white/[0.025]"} ${compact ? "px-2 py-1 text-[8px]" : "px-2.5 py-1.5 text-[9px]"}`}
        >
          <div className="flex min-w-0 items-center gap-2 text-white/65">
            <span
              className={`flex shrink-0 items-center justify-center rounded-full ${compact ? "h-3 w-3" : "h-3.5 w-3.5"} ${index === 0 ? "bg-white text-black" : "border border-white/20 text-transparent"}`}
            >
              <Check className={compact ? "h-2 w-2" : "h-2.5 w-2.5"} />
            </span>
            <span className="truncate">{label}</span>
          </div>
          <span className={`ml-2 shrink-0 rounded px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.05em] border ${badgeClass}`}>
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function DeliverySurface({ compact = false }: { compact?: boolean }) {
  const steps = ["Brief", "Review", "Release"];

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex min-w-0 flex-1 items-center">
            <div className="flex min-w-0 flex-col items-center gap-1">
              <span
                className={`flex items-center justify-center rounded-full ${compact ? "h-4 w-4" : "h-5 w-5"} ${index === 0 ? "bg-white text-black" : "border border-white/20 text-white/30"}`}
              >
                {index === 0 ? (
                  <Check className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
                ) : (
                  <CircleDot className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
                )}
              </span>
              <span className="font-mono text-[8px] text-white/30">{step}</span>
            </div>
            {index < steps.length - 1 && <div className="mx-1 h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>
      {/* High-Fidelity Radial Progress / Circle Graph */}
      {!compact ? (
        <div className={`flex items-center justify-between ${compact ? "mt-3" : "mt-4"}`}>
          <div className="h-1 flex-1 rounded-full bg-white/[0.07] mr-3">
            <div className="h-full w-[72%] rounded-full bg-white/65" />
          </div>
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="h-7 w-7 text-white/10" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <motion.circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#c6d478"
                strokeWidth="2.5"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 28 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute font-mono text-[7px] text-[#c6d478] font-bold">72%</span>
          </div>
        </div>
      ) : (
        <div className="h-1 mt-2.5 rounded-full bg-white/[0.07]">
          <div className="h-full w-[72%] rounded-full bg-white/65" />
        </div>
      )}
    </div>
  );
}

function SurfaceContent({
  surface,
  compact = false,
}: {
  surface: OrbitSurface;
  compact?: boolean;
}) {
  if (surface.id === "context") return <ContextSurface compact={compact} />;
  if (surface.id === "network") return <NetworkSurface compact={compact} />;
  if (surface.id === "decisions") return <DecisionsSurface compact={compact} />;
  return <DeliverySurface compact={compact} />;
}

function OrbitPanel({
  index,
  progress,
  surface,
  isCatalog,
  isActive,
  reducedMotion,
}: {
  index: number;
  progress: ReturnType<typeof useSpring>;
  surface: OrbitSurface;
  isCatalog: boolean;
  isActive: boolean;
  reducedMotion: boolean;
}) {
  const amplitude = isCatalog ? 0.72 : 1;
  const xValues = reducedMotion
    ? orbitProgress.map(() => reducedOrbitX[index] * amplitude)
    : orbitX[index].map((value) => value * 1.25 * amplitude);
  const yValues = reducedMotion
    ? orbitProgress.map(() => reducedOrbitY[index] * amplitude)
    : orbitY[index].map((value) => value * 1.15 * amplitude);
  const zValues = reducedMotion
    ? orbitProgress.map(() => 0)
    : orbitZ[index].map((value) => value * 1.15 * amplitude);
  const scaleValues = reducedMotion ? orbitProgress.map(() => 0.86) : orbitScale[index];
  const opacityValues = reducedMotion ? orbitProgress.map(() => 0.72) : orbitOpacity[index];
  const rotationValues = reducedMotion ? orbitProgress.map(() => 0) : orbitRotation[index];
  const x = useTransform(progress, orbitProgress, xValues);
  const y = useTransform(progress, orbitProgress, yValues);
  const z = useTransform(progress, orbitProgress, zValues);
  const scale = useTransform(progress, orbitProgress, scaleValues);
  const opacity = useTransform(progress, orbitProgress, opacityValues);
  const rotate = useTransform(progress, orbitProgress, rotationValues);

  // Dynamic CSS blur filter based on depth (Z position) to enhance 3D realism
  const zOffset = useTransform(z, [-260, 260], [1.5, 0]);
  const filter = useTransform(zOffset, (val) => (reducedMotion ? "none" : `blur(${val}px)`));

  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
      isCatalog ? "w-[110px]" : "w-[192px] sm:w-[226px]"
    }`}>
      <motion.div
        style={{
          x,
          y,
          z,
          scale,
          rotate,
          opacity,
          filter,
          zIndex: isActive ? 30 : 10 + index,
        }}
        className={`group relative w-full overflow-hidden rounded-xl border bg-[#111114]/90 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 ${
          isActive ? "border-white/25 shadow-white/[0.03]" : "border-white/[0.09]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/[0.045] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10">
          <SurfaceChrome surface={surface} compact />
          <SurfaceContent surface={surface} compact />
        </div>
      </motion.div>
    </div>
  );
}

function ActiveWorkspace({
  activeSurface,
  isCatalog,
  reducedMotion,
}: {
  activeSurface: OrbitSurface;
  isCatalog: boolean;
  reducedMotion: boolean;
}) {
  const titleInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 7, filter: "blur(3px)" };
  const titleAnimate = reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  const titleExit = reducedMotion ? { opacity: 0 } : { opacity: 0, y: -7, filter: "blur(3px)" };
  const contentInitial = reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 18, filter: "blur(4px)" };
  const contentAnimate = reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" };
  const contentExit = reducedMotion ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(4px)" };
  const transition = reducedMotion
    ? { duration: 0.12 }
    : { type: "spring" as const, stiffness: 150, damping: 25, mass: 0.5 };
  const titleTransition = reducedMotion
    ? { duration: 0.12 }
    : { type: "spring" as const, stiffness: 180, damping: 24, mass: 0.5 };

  return (
    <motion.div
      layout
      transition={transition}
      className={`relative z-20 overflow-hidden rounded-2xl border border-white/15 bg-[#101013]/[0.96] shadow-[0_45px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl ${
        isCatalog ? "w-[270px]" : "w-[min(78vw,560px)] sm:w-[min(62vw,560px)]"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b border-white/[0.08] ${isCatalog ? "h-9 px-3" : "h-11 px-4 sm:px-5"}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
            orbit / workspace
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[8px] text-[#c6d478]/80">
          <Sparkles className="h-2.5 w-2.5 text-[#c6d478] animate-pulse" /> Live system
        </div>
      </div>

      <div className={isCatalog ? "p-3" : "p-4 sm:p-5"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              Active surface
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeSurface.id}
                initial={titleInitial}
                animate={titleAnimate}
                exit={titleExit}
                transition={titleTransition}
                className="mt-1 text-lg font-medium tracking-tight text-white/85 sm:text-xl font-serif font-light"
              >
                {activeSurface.label} in focus
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-[#c6d478]/20 bg-[#c6d478]/[0.03] px-2 py-1 font-mono text-[8px] text-[#c6d478]/80 sm:flex">
            <Activity className="h-2.5 w-2.5 animate-[pulse_2s_infinite]" /> synced
          </div>
        </div>

        <motion.div
          layout
          transition={transition}
          className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0d] ${isCatalog ? "mt-3 p-3" : "mt-5 p-4 sm:p-5"}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeSurface.id}
              initial={contentInitial}
              animate={contentAnimate}
              exit={contentExit}
              transition={transition}
              className="relative"
            >
              <SurfaceChrome surface={activeSurface} />
              <SurfaceContent surface={activeSurface} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className={`grid grid-cols-3 gap-2 ${isCatalog ? "mt-2" : "mt-3"}`}>
          {["Clarity", "Flow", "Confidence"].map((label, index) => (
            <div key={label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2 hover:border-white/10 transition-colors duration-300">
              <div className="text-[8px] text-white/30">{label}</div>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-white/70">
                  {index === 0 ? "94" : index === 1 ? "81" : "88"}%
                </span>
                <BarChart3 className="h-2.5 w-2.5 text-white/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function OrbitWorkspaceShowcaseElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isCatalog = previewMode === "catalog";
  
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.32,
  });

  const reducedMotion = Boolean(prefersReducedMotion);

  // Sync scroll offset with active index
  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(surfaceOrder.length - 1, Math.floor(latest * surfaceOrder.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  // Autoplay loop using container scroll
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const nextIndex = (activeIndex + 1) % surfaceOrder.length;
      const scrollHeight = scrollRef.current.scrollHeight;
      const clientHeight = scrollRef.current.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      // Calculate target scroll location for this index
      const targetScroll = (nextIndex / (surfaceOrder.length - 1)) * maxScroll;
      
      scrollRef.current.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  // Click handler to focus a specific index
  const handleFocusIndex = (index: number) => {
    setIsPlaying(false); // Pause autoplay on user interaction
    if (!scrollRef.current) return;

    const scrollHeight = scrollRef.current.scrollHeight;
    const clientHeight = scrollRef.current.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    const targetScroll = (index / (surfaceOrder.length - 1)) * maxScroll;

    scrollRef.current.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // 3D Magnetic Cursor Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 10, y: -y * 10 }); // tilt max 10 degrees
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const activeSurface = surfaceOrder[activeIndex];
  const titleOpacity = 1;
  const travelDistance = isCatalog ? 170 : 240;
  const titleY = useTransform(
    progress,
    [0, 1],
    [0, reducedMotion ? 0 : travelDistance],
  );
  const outroOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.3, 1]);
  const outroY = useTransform(progress, [0.72, 1], [reducedMotion ? 0 : 20, 0]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto bg-[#09090b] text-white scrollbar-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative" style={{ height: isCatalog ? "980px" : "360dvh" }}>
        <section
          className="sticky top-0 flex min-h-[500px] w-full items-center overflow-hidden bg-[#09090b]"
          style={{ height: isCatalog ? "500px" : "100dvh" }}
        >
          {/* Spatial Grid Background */}
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_76%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

          {/* Mobile Title Info (hidden on desktop) */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className={`absolute left-5 top-5 z-40 sm:left-8 sm:top-8 md:hidden ${
              isCatalog ? "max-w-[180px]" : "max-w-[280px]"
            }`}
          >
            <h1 className={`font-serif font-light leading-tight tracking-tight ${
              isCatalog ? "text-sm" : "text-2xl leading-[0.98]"
            }`}>
              Keep the whole system within reach.
            </h1>
            <p className={`text-white/40 ${
              isCatalog ? "text-[8px] leading-snug mt-1.5" : "text-[10px] leading-relaxed mt-3 sm:text-xs"
            }`}>
              Move through connected surfaces without losing the center of the work.
            </p>
          </motion.div>

          {/* Desktop Title (aligned with screen edge horizontally, dashboard boundaries vertically) */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className={`absolute left-5 sm:left-8 z-40 text-left pointer-events-none hidden md:block ${
              isCatalog 
                ? "top-6 max-w-[160px]" 
                : "top-[calc(50%-184px)] max-w-[280px]"
            }`}
          >
            <h1 className={`font-serif font-light leading-tight tracking-tight ${
              isCatalog ? "text-sm" : "text-3xl leading-[0.98]"
            }`}>
              Keep the whole system within reach.
            </h1>
            <p className={`text-white/40 ${
              isCatalog ? "text-[8px] leading-snug mt-1.5 max-w-[150px]" : "text-[10px] leading-relaxed mt-3 max-w-[250px] sm:text-xs"
            }`}>
              Move through connected surfaces without losing the center of the work.
            </p>
          </motion.div>

          {/* Autoplay / Interactive Mode Controls */}
          <div className="absolute right-5 top-5 z-40 flex items-center gap-2 sm:right-8 sm:top-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-7 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 font-mono text-[8px] uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-2.5 w-2.5" /> Playing
                </>
              ) : (
                <>
                  <Play className="h-2.5 w-2.5" /> Paused
                </>
              )}
            </button>
          </div>

          {/* The 3D Perspective Card Stage */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            <motion.div 
              style={{
                rotateX: tilt.y,
                rotateY: tilt.x,
                transformStyle: "preserve-3d",
              }}
              className={`relative w-full max-w-5xl [perspective:1200px] flex items-center justify-center transition-all duration-300 ease-out ${
                isCatalog ? "h-[420px]" : "h-[380px] sm:h-[540px]"
              }`}
            >


              {/* Holographic Guide Orbit Rings */}
              <svg className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] [transform-style:preserve-3d] [transform:rotateX(62deg)_rotateY(-8deg)] ${
                isCatalog ? "h-[360px] w-[360px]" : "h-[540px] w-[540px]"
              }`}>
                <circle cx={isCatalog ? 180 : 270} cy={isCatalog ? 180 : 270} r={isCatalog ? 170 : 255} fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <svg className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] [transform-style:preserve-3d] [transform:rotateX(62deg)_rotateY(-8deg)] ${
                isCatalog ? "h-[360px] w-[360px]" : "h-[540px] w-[540px]"
              }`}>
                <circle cx={isCatalog ? 180 : 270} cy={isCatalog ? 180 : 270} r={isCatalog ? 180 : 265} fill="none" stroke="white" strokeWidth="1" />
              </svg>

              <div className="absolute inset-0 [transform-style:preserve-3d]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ActiveWorkspace
                    activeSurface={activeSurface}
                    isCatalog={isCatalog}
                    reducedMotion={reducedMotion}
                  />
                </div>
                {surfaceOrder.map((surface, index) => (
                  <OrbitPanel
                    key={surface.id}
                    index={index}
                    progress={progress}
                    surface={surface}
                    isCatalog={isCatalog}
                    isActive={index === activeIndex}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Outro info overlay */}
          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 text-center ${
              isCatalog 
                ? "bottom-12 w-[240px]" 
                : "bottom-16 sm:bottom-20 w-[min(90vw,420px)]"
            }`}
          >
            <p className={`font-serif font-light tracking-tight text-white/75 ${
              isCatalog ? "text-[10px] leading-tight" : "text-lg sm:text-2xl leading-tight"
            }`}>
              Move through the system, not around it.
            </p>
          </motion.div>

          {/* Interactive Navigation Dots Track (Upgraded) */}
          <div className="absolute bottom-5 left-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:left-8 sm:right-8">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              0{activeIndex + 1}
            </span>
            
            <div className="flex flex-1 items-center gap-4">
              {/* Progress bar track */}
              <div className="relative h-px flex-1 bg-white/10">
                <motion.div style={{ width: progressWidth }} className="h-full bg-white/60" />
              </div>
              
              {/* Click-to-focus indicators */}
              <div className="flex gap-1.5">
                {surfaceOrder.map((surface, index) => (
                  <button
                    key={surface.id}
                    onClick={() => handleFocusIndex(index)}
                    className={`h-4 px-2 rounded-full border text-[7.5px] font-mono uppercase tracking-wider transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-[#c6d478] border-[#c6d478] text-black font-semibold"
                        : "bg-transparent border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                    }`}
                  >
                    {surface.label}
                  </button>
                ))}
              </div>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              04
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
