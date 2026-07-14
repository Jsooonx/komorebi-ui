import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleDot, Link2, MoveRight, Network } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type NodeId = "foundation" | "flow" | "signal" | "release";

type WeaveNode = {
  id: NodeId;
  index: string;
  label: string;
  status: string;
  title: string;
  description: string;
  blockers: string;
  unblocks: string;
  milestone: string;
  image: string;
  position: string;
};

const nodes: WeaveNode[] = [
  {
    id: "foundation",
    index: "01",
    label: "Foundation",
    status: "Research mapped",
    title: "Set the ground before the work begins.",
    description:
      "The source material and operating constraints are visible before the system branches.",
    blockers: "None",
    unblocks: "Flow, Signal",
    milestone: "Brief confirmed",
    image: "/images/dependency-weave/artifact-foundation.png",
    position: "left-[4%] top-[8%]",
  },
  {
    id: "flow",
    index: "02",
    label: "Flow",
    status: "Dependencies aligned",
    title: "Make handoffs legible while they are still flexible.",
    description:
      "The critical path turns into a shared outline instead of an invisible dependency chain.",
    blockers: "Foundation",
    unblocks: "Release",
    milestone: "Path reviewed",
    image: "/images/dependency-weave/artifact-flow.png",
    position: "bottom-[8%] left-[14%]",
  },
  {
    id: "signal",
    index: "03",
    label: "Signal",
    status: "Direction tested",
    title: "Give the important signals a place to converge.",
    description:
      "Evidence arrives beside the decision it changes, keeping the next move easy to trace.",
    blockers: "Foundation",
    unblocks: "Release",
    milestone: "Direction locked",
    image: "/images/dependency-weave/artifact-signal.png",
    position: "right-[5%] top-[8%]",
  },
  {
    id: "release",
    index: "04",
    label: "Release",
    status: "Ready to move",
    title: "Ship with the full chain in view.",
    description: "A release becomes calmer when its prerequisites and consequences stay connected.",
    blockers: "Flow, Signal",
    unblocks: "Field learning",
    milestone: "Release window",
    image: "/images/dependency-weave/artifact-release.png",
    position: "bottom-[8%] right-[13%]",
  },
];

const paths = [
  {
    id: "foundation-flow",
    d: "M 205 132 C 245 206, 274 270, 330 354",
    from: "foundation",
    to: "flow",
  },
  {
    id: "foundation-signal",
    d: "M 218 120 C 350 48, 625 48, 780 120",
    from: "foundation",
    to: "signal",
  },
  { id: "flow-release", d: "M 390 366 C 506 442, 646 442, 748 366", from: "flow", to: "release" },
  {
    id: "signal-release",
    d: "M 795 132 C 750 210, 735 278, 712 350",
    from: "signal",
    to: "release",
  },
] as const;

const transition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

function isRelatedPath(path: (typeof paths)[number], activeId: NodeId) {
  return path.from === activeId || path.to === activeId;
}

export default function DependencyWeaveShowcaseElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<NodeId>("release");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[3];
  const compact = previewMode === "catalog";

  return (
    <section className="h-full w-full overflow-hidden bg-[#09090a] text-white">
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden ${compact ? "px-4 py-6" : "px-5 py-10 sm:px-10"}`}
        style={{ height: compact ? "500px" : "100dvh" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className={`relative z-10 w-full ${compact ? "max-w-[780px]" : "max-w-7xl"}`}>
          <div
            className={`mb-4 flex items-end justify-between border-b border-white/10 ${compact ? "pb-3" : "mb-6 pb-4"}`}
          >
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Dependency weave
              </div>
              <h1
                className={`mt-2 font-semibold tracking-[-0.05em] ${compact ? "text-xl" : "text-3xl sm:text-4xl"}`}
              >
                See what every move touches.
              </h1>
            </div>
            <span className="hidden max-w-36 text-right font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 sm:block">
              Select a project to trace its path
            </span>
          </div>
          <div
            onMouseLeave={() => setActiveId("release")}
            className={`relative overflow-hidden border border-white/15 bg-[#101012] ${compact ? "h-[362px]" : "h-[610px]"}`}
          >
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {paths.map((path) => {
                const related = isRelatedPath(path, activeId);
                return (
                  <g key={path.id}>
                    <path d={path.d} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                    <motion.path
                      d={path.d}
                      fill="none"
                      stroke="rgba(255,255,255,0.82)"
                      strokeWidth="1.35"
                      animate={{ pathLength: related ? 1 : 0, opacity: related ? 0.95 : 0 }}
                      transition={reducedMotion ? { duration: 0.01 } : transition}
                    />
                  </g>
                );
              })}
            </svg>
            {nodes.map((node) => {
              const isActive = node.id === activeId;
              const isRelated = paths.some(
                (path) =>
                  isRelatedPath(path, activeId) && (path.from === node.id || path.to === node.id),
              );
              return (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setActiveId(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group absolute z-10 w-[19%] min-w-[76px] overflow-hidden border text-left transition-colors duration-150 ${compact ? "" : "sm:w-[21%]"} ${node.position} ${isActive ? "border-white/75" : isRelated ? "border-white/35" : "border-white/10 hover:border-white/35"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                    <img
                      src={node.image}
                      alt=""
                      className={`h-full w-full object-cover transition-[filter,transform] duration-300 ${isActive ? "scale-[1.04] brightness-110" : "brightness-[0.56] grayscale group-hover:brightness-90"}`}
                    />
                    <div className="absolute inset-0 bg-black/15" />
                    <span className="absolute left-2 top-2 font-mono text-[8px] tracking-[0.16em] text-white/70">
                      {node.index}
                    </span>
                  </div>
                  <div className={`bg-[#111113] ${compact ? "px-2 py-1.5" : "px-3 py-2.5"}`}>
                    <div className="truncate text-[10px] font-medium text-white/85">
                      {node.label}
                    </div>
                    <div className="mt-0.5 hidden truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/35 sm:block">
                      {node.status}
                    </div>
                  </div>
                </button>
              );
            })}
            <article
              className={`absolute left-1/2 top-1/2 z-20 w-[43%] min-w-[180px] -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-[#141416]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur ${compact ? "p-3" : "p-6 sm:w-[46%] sm:p-7"}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
                  <Network className="h-3 w-3" /> Impact view
                </span>
                <span className="font-mono text-[8px] text-white/35">{active.index} / 04</span>
              </div>
              <div className={`relative ${compact ? "mt-3 min-h-[118px]" : "mt-5 min-h-[142px]"}`}>
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={active.id}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={reducedMotion ? { duration: 0.1 } : transition}
                    className="absolute inset-0"
                  >
                    <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                      {active.status}
                    </div>
                    <h2
                      className={`mt-2 font-serif font-light leading-[0.95] tracking-[-0.045em] ${compact ? "text-[clamp(1.25rem,2.7vw,1.8rem)]" : "text-[clamp(1.8rem,3.5vw,3.1rem)]"}`}
                    >
                      {active.title}
                    </h2>
                    <p
                      className={`max-w-sm text-white/50 ${compact ? "mt-2 text-[9px] leading-relaxed" : "mt-3 text-xs leading-relaxed"}`}
                    >
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div
                className={`grid grid-cols-2 gap-3 border-t border-white/10 ${compact ? "mt-2 pt-2" : "mt-4 pt-4"}`}
              >
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                    Blocked by
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[9px] text-white/70">
                    <Link2 className="h-2.5 w-2.5" />
                    {active.blockers}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                    Unblocks
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[9px] text-white/70">
                    <MoveRight className="h-2.5 w-2.5" />
                    {active.unblocks}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
                <span className="flex items-center gap-1.5 text-[9px] text-white/55">
                  <CircleDot className="h-3 w-3" />
                  {active.milestone}
                </span>
                <ArrowRight className="h-3 w-3 text-white/40" />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
