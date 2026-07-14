import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Image } from "lucide-react";
import { useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

const phases = [
  {
    label: "Gather",
    title: "Give every fragment a place to land.",
    copy: "A reference, a field note, and a quiet signal can share one working surface.",
  },
  {
    label: "Arrange",
    title: "Let the pattern find its own frame.",
    copy: "The canvas groups related context into one clear view.",
  },
  {
    label: "Commit",
    title: "Turn the shape into a decision people can move with.",
    copy: "One brief carries the context, the choice, and the next accountable step.",
  },
];

function NoteFragment({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`border border-[#18191d]/15 bg-[#faf8f2] shadow-[0_12px_30px_rgba(27,29,33,.1)] ${compact ? "p-2" : "p-3.5"}`}
    >
      <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[.16em] text-[#18191d]/45">
        <span>Field note</span>
        <span>12:41</span>
      </div>
      <p
        className={`${compact ? "mt-2 text-[9px]" : "mt-3 text-xs"} leading-relaxed text-[#18191d]/75`}
      >
        The review needs a single shared decision, not another thread.
      </p>
      <div className="mt-3 h-px w-2/3 bg-[#18191d]/12" />
    </div>
  );
}

function MetricFragment({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`border border-[#18191d]/15 bg-[#1c1d22] text-[#f7f4ed] shadow-[0_12px_30px_rgba(27,29,33,.18)] ${compact ? "p-2" : "p-3.5"}`}
    >
      <div className="font-mono text-[7px] uppercase tracking-[.16em] text-white/45">Signal</div>
      <div className={`${compact ? "mt-1 text-xl" : "mt-2 text-3xl"} tracking-[-.07em]`}>4.2×</div>
      <p className="mt-1 font-mono text-[7px] uppercase tracking-[.13em] text-white/48">
        clearer review cycles
      </p>
    </div>
  );
}

function SourceFragment({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border border-[#18191d]/15 bg-[#d8d4cb] shadow-[0_12px_30px_rgba(27,29,33,.14)] ${compact ? "h-[94px]" : "h-[164px]"}`}
    >
      <img
        src="/images/aperture-canvas-source.png"
        alt="Tracing paper source reference"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#18191d]/62 px-2 py-1.5 font-mono text-[7px] uppercase tracking-[.14em] text-white/70 backdrop-blur-sm">
        <span>Source / 03</span>
        <Image className="h-2.5 w-2.5" />
      </div>
    </div>
  );
}

function DecisionArtifact({ phase, compact = false }: { phase: number; compact?: boolean }) {
  const headlines = [
    "Make the handoff visible before it becomes urgent.",
    "Group the right context around one clear call.",
    "Confirm the release brief and let the team move.",
  ];
  return (
    <div
      className={`relative overflow-hidden border border-[#18191d]/25 bg-[#faf8f2] text-[#18191d] shadow-[0_26px_70px_rgba(27,29,33,.2)] ${compact ? "h-[214px] p-3" : "h-[326px] p-5 sm:p-7"}`}
    >
      <div className="flex items-center justify-between border-b border-[#18191d]/12 pb-3 font-mono text-[7px] uppercase tracking-[.18em] text-[#18191d]/50">
        <span>Decision brief</span>
        <span>0{phase + 1} / 03</span>
      </div>
      <div className={`relative ${compact ? "mt-4 h-[150px]" : "mt-6 h-[218px]"}`}>
        <div className="absolute inset-0">
          <p className={`${compact ? "text-[9px]" : "text-xs"} text-[#18191d]/48`}>
            Northline / release review
          </p>
          <h2
            className={`relative ${compact ? "mt-1 h-[66px] text-lg" : "mt-2 h-[128px] text-3xl sm:text-4xl"} max-w-sm font-serif leading-[1] tracking-[-.06em]`}
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 5, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0, y: -5, clipPath: "inset(0 0 100% 0)" }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.42 }}
                className="absolute inset-x-0 top-0 block will-change-transform"
              >
                {headlines[phase]}
              </motion.span>
            </AnimatePresence>
          </h2>
          <div
            className={`${compact ? "mt-4 gap-2" : "mt-6 gap-3"} grid grid-cols-2 border-t border-[#18191d]/12 pt-3`}
          >
            <div>
              <div className="font-mono text-[7px] uppercase tracking-[.15em] text-[#18191d]/40">
                Owner
              </div>
              <div className="mt-1 text-[9px] font-medium">Mara Ellison</div>
            </div>
            <div>
              <div className="font-mono text-[7px] uppercase tracking-[.15em] text-[#18191d]/40">
                State
              </div>
              <div className="mt-1 text-[9px] font-medium">Review ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApertureCanvasShowcaseElement({
  previewMode = "fullscreen",
}: {
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [phase, setPhase] = useState(0);
  const isCatalog = previewMode === "catalog";
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  const movement = reducedMotion ? 0 : 1;

  useMotionValueEvent(progress, "change", (value) => {
    const next = value < 0.35 ? 0 : value < 0.72 ? 1 : 2;
    setPhase((current) => (current === next ? current : next));
  });

  const noteX = useTransform(
    progress,
    [0, 0.48, 1],
    [-118 * movement, -36 * movement, -18 * movement],
  );
  const noteY = useTransform(
    progress,
    [0, 0.48, 1],
    [-88 * movement, -10 * movement, 22 * movement],
  );
  const sourceX = useTransform(
    progress,
    [0, 0.48, 1],
    [128 * movement, 42 * movement, 16 * movement],
  );
  const sourceY = useTransform(
    progress,
    [0, 0.48, 1],
    [-64 * movement, -12 * movement, 28 * movement],
  );
  const metricX = useTransform(
    progress,
    [0, 0.48, 1],
    [114 * movement, 26 * movement, 32 * movement],
  );
  const metricY = useTransform(
    progress,
    [0, 0.48, 1],
    [104 * movement, 42 * movement, 124 * movement],
  );
  const lineWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto overscroll-contain bg-[#e7e2d8] text-[#18191d] scrollbar-none"
    >
      <div className="relative" style={{ height: isCatalog ? "1250px" : "320dvh" }}>
        <section
          className={`${isCatalog ? "h-[500px]" : "h-dvh"} sticky top-0 min-h-[500px] w-full overflow-hidden bg-[#e7e2d8]`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(24,25,29,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(24,25,29,.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_24%,transparent_79%)]" />
          <div
            className={`relative mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto] gap-5 px-5 sm:px-8 lg:px-12 ${isCatalog ? "py-6" : "py-8 sm:py-10"}`}
          >
            <div className="flex items-end justify-between border-b border-[#18191d]/15 pb-4">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[.2em] text-[#18191d]/50">
                  Aperture / canvas
                </div>
                <div className="mt-2 text-xl font-semibold tracking-[-.045em] sm:text-2xl">
                  From fragments to a shared next move.
                </div>
              </div>
              <span className="hidden max-w-28 text-right font-mono text-[8px] uppercase tracking-[.15em] text-[#18191d]/45 sm:block">
                Scroll to gather the field
              </span>
            </div>

            <div className="relative mx-auto min-h-0 w-full max-w-4xl self-stretch [perspective:1200px]">
              <motion.div
                style={{ x: noteX, y: noteY }}
                className="absolute left-[5%] top-[23%] z-20 w-[clamp(132px,20vw,220px)] will-change-transform"
              >
                <NoteFragment compact={isCatalog} />
              </motion.div>
              <motion.div
                style={{ x: sourceX, y: sourceY }}
                className="absolute right-[3%] top-[8%] z-20 w-[clamp(138px,22vw,250px)] will-change-transform"
              >
                <SourceFragment compact={isCatalog} />
              </motion.div>
              <motion.div
                style={{ x: metricX, y: metricY }}
                className="absolute bottom-[8%] right-[9%] z-20 w-[clamp(120px,18vw,190px)] will-change-transform"
              >
                <MetricFragment compact={isCatalog} />
              </motion.div>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-[min(67vw,530px)]">
                  <DecisionArtifact phase={phase} compact={isCatalog} />
                </div>
              </div>
              <motion.div
                style={{ width: lineWidth }}
                className="absolute bottom-[5%] left-0 h-px bg-[#18191d]/45"
              />
              <div className="absolute bottom-3 left-0 flex w-full items-center justify-between font-mono text-[8px] uppercase tracking-[.16em] text-[#18191d]/45">
                <span>
                  {phases[phase].label} / 0{phase + 1}
                </span>
                <span>Northline field system</span>
              </div>
            </div>

            <div className="relative min-h-[44px] max-w-sm self-end">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className="max-w-sm"
                >
                  <p className="font-mono text-[8px] uppercase tracking-[.16em] text-[#18191d]/45">
                    {phases[phase].label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#18191d]/70">
                    {phases[phase].copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
