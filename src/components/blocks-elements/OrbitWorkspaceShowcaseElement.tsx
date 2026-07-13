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
  Layers3,
  ListChecks,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";

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
    <div className={compact ? "mt-3 space-y-1.5" : "mt-5 space-y-2"}>
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={`flex items-center justify-between rounded-md border border-white/[0.07] bg-white/[0.025] ${compact ? "px-2 py-1.5 text-[8px]" : "px-2.5 py-2 text-[9px]"}`}
        >
          <div className="flex min-w-0 items-center gap-2 text-white/55">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${index === 1 ? "bg-white/80" : "bg-white/25"}`}
            />
            <span className="truncate">{label}</span>
          </div>
          <span className="ml-2 font-mono text-white/35">{value}</span>
        </div>
      ))}
    </div>
  );
}

function NetworkSurface({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "mt-3 h-16" : "mt-5 h-24"}`}>
      <div className="absolute left-[12%] top-[52%] h-px w-[76%] rotate-[-18deg] bg-white/15" />
      <div className="absolute left-[22%] top-[28%] h-px w-[58%] rotate-[26deg] bg-white/10" />
      <div className="absolute left-[48%] top-[17%] h-[70%] w-px rotate-[24deg] bg-white/10" />
      {[
        ["left-[9%] top-[42%]", "bg-white/50"],
        ["left-[42%] top-[9%]", "bg-white/80"],
        ["left-[72%] top-[34%]", "bg-white/35"],
        ["left-[55%] top-[72%]", "bg-white/55"],
      ].map(([position, color], index) => (
        <span
          key={index}
          className={`absolute ${position} ${compact ? "h-2 w-2" : "h-2.5 w-2.5"} rounded-full ${color} shadow-[0_0_12px_rgba(255,255,255,0.12)]`}
        />
      ))}
      <div className="absolute bottom-0 left-0 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
        04 connected spaces
      </div>
    </div>
  );
}

function DecisionsSurface({ compact = false }: { compact?: boolean }) {
  const rows = [
    ["Reduce friction", "High"],
    ["Clarify ownership", "Ready"],
    ["Protect momentum", "Next"],
  ];

  return (
    <div className={compact ? "mt-3 space-y-1.5" : "mt-5 space-y-2"}>
      {rows.map(([label, status], index) => (
        <div
          key={label}
          className={`flex items-center justify-between rounded-md border ${index === 0 ? "border-white/20 bg-white/[0.08]" : "border-white/[0.07] bg-white/[0.025]"} ${compact ? "px-2 py-1.5 text-[8px]" : "px-2.5 py-2 text-[9px]"}`}
        >
          <div className="flex min-w-0 items-center gap-2 text-white/65">
            <span
              className={`flex shrink-0 items-center justify-center rounded-full ${compact ? "h-3 w-3" : "h-3.5 w-3.5"} ${index === 0 ? "bg-white text-black" : "border border-white/20 text-transparent"}`}
            >
              <Check className={compact ? "h-2 w-2" : "h-2.5 w-2.5"} />
            </span>
            <span className="truncate">{label}</span>
          </div>
          <span className="ml-2 shrink-0 font-mono text-white/35">{status}</span>
        </div>
      ))}
    </div>
  );
}

function DeliverySurface({ compact = false }: { compact?: boolean }) {
  const steps = ["Brief", "Review", "Release"];

  return (
    <div className={compact ? "mt-4" : "mt-6"}>
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
      <div className={`${compact ? "mt-3" : "mt-5"} h-1 rounded-full bg-white/[0.07]`}>
        <div className="h-full w-[72%] rounded-full bg-white/65" />
      </div>
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
  const amplitude = isCatalog ? 0.62 : 1;
  const xValues = reducedMotion
    ? orbitProgress.map(() => reducedOrbitX[index] * amplitude)
    : orbitX[index].map((value) => value * amplitude);
  const yValues = reducedMotion
    ? orbitProgress.map(() => reducedOrbitY[index] * amplitude)
    : orbitY[index].map((value) => value * amplitude);
  const zValues = reducedMotion
    ? orbitProgress.map(() => 0)
    : orbitZ[index].map((value) => value * amplitude);
  const scaleValues = reducedMotion ? orbitProgress.map(() => 0.86) : orbitScale[index];
  const opacityValues = reducedMotion ? orbitProgress.map(() => 0.72) : orbitOpacity[index];
  const rotationValues = reducedMotion ? orbitProgress.map(() => 0) : orbitRotation[index];
  const x = useTransform(progress, orbitProgress, xValues);
  const y = useTransform(progress, orbitProgress, yValues);
  const z = useTransform(progress, orbitProgress, zValues);
  const scale = useTransform(progress, orbitProgress, scaleValues);
  const opacity = useTransform(progress, orbitProgress, opacityValues);
  const rotate = useTransform(progress, orbitProgress, rotationValues);

  return (
    <div className="absolute left-1/2 top-1/2 w-[172px] -translate-x-1/2 -translate-y-1/2 sm:w-[206px]">
      <motion.div
        style={{ x, y, z, scale, rotate, opacity, zIndex: isActive ? 30 : 10 + index }}
        className={`group relative w-full overflow-hidden rounded-xl border bg-[#111114]/90 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors ${isActive ? "border-white/25" : "border-white/[0.09]"}`}
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
    <div className="relative z-20 w-[min(78vw,560px)] overflow-hidden rounded-2xl border border-white/15 bg-[#101013]/[0.96] shadow-[0_45px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl sm:w-[min(62vw,560px)]">
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
        <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/35">
          <Sparkles className="h-2.5 w-2.5 text-white/60" /> Live system
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
                className="mt-1 text-lg font-medium tracking-tight text-white/85 sm:text-xl"
              >
                {activeSurface.label} in focus
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 px-2 py-1 font-mono text-[8px] text-white/35 sm:flex">
            <Activity className="h-2.5 w-2.5" /> synced
          </div>
        </div>

        <div
          className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0d] ${isCatalog ? "mt-3 min-h-[148px] p-3" : "mt-5 min-h-[190px] p-4 sm:min-h-[220px] sm:p-5"}`}
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
        </div>

        <div className={`grid grid-cols-3 gap-2 ${isCatalog ? "mt-2" : "mt-3"}`}>
          {["Clarity", "Flow", "Confidence"].map((label, index) => (
            <div key={label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
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
    </div>
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
  const isCatalog = previewMode === "catalog";
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.32,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(surfaceOrder.length - 1, Math.floor(latest * surfaceOrder.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeSurface = surfaceOrder[activeIndex];
  const reducedMotion = Boolean(prefersReducedMotion);
  const titleOpacity = useTransform(progress, [0, 0.12, 0.82, 1], [1, 1, 0.72, 0.4]);
  const titleY = useTransform(
    progress,
    [0, 0.4, 1],
    [0, reducedMotion ? 0 : -22, reducedMotion ? 0 : -34],
  );
  const outroOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.3, 1]);
  const outroY = useTransform(progress, [0.72, 1], [reducedMotion ? 0 : 20, 0]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto bg-[#09090b] text-white scrollbar-none"
    >
      <div className="relative" style={{ height: isCatalog ? "980px" : "360dvh" }}>
        <section
          className="sticky top-0 flex min-h-[500px] w-full items-center overflow-hidden bg-[#09090b]"
          style={{ height: isCatalog ? "500px" : "100dvh" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_76%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute left-5 top-5 z-40 sm:left-8 sm:top-8"
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
              Orbit workspace / 03
            </div>
            <h1 className="mt-2 max-w-[280px] text-2xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
              Keep the whole system within reach.
            </h1>
            <p className="mt-3 max-w-[250px] text-[10px] leading-relaxed text-white/40 sm:text-xs">
              Move through connected surfaces without losing the center of the work.
            </p>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            <div className="relative h-[380px] w-full max-w-5xl [perspective:1200px] sm:h-[500px]">
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
            </div>
          </div>

          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className="pointer-events-none absolute bottom-16 left-1/2 z-30 w-[min(90vw,420px)] -translate-x-1/2 text-center sm:bottom-20"
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
              One view / many threads
            </div>
            <p className="mt-2 text-lg font-medium leading-tight tracking-[-0.04em] text-white/75 sm:text-2xl">
              Move through the system, not around it.
            </p>
          </motion.div>

          <div className="absolute bottom-5 left-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:left-8 sm:right-8">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              0{activeIndex + 1}
            </span>
            <div className="h-px flex-1 bg-white/10">
              <motion.div style={{ width: progressWidth }} className="h-full bg-white/60" />
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
