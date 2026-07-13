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
  Check,
  CircleDot,
  Layers3,
  Quote,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  icon: typeof Activity;
};

const testimonials: Testimonial[] = [
  {
    id: "clarity",
    name: "Mara Ellison",
    role: "Product Operations",
    company: "Northline",
    quote:
      "The work stopped feeling scattered. We could finally see the signal before deciding what deserved our attention.",
    outcome: "Operational clarity",
    metric: "42%",
    metricLabel: "less context switching",
    icon: Activity,
  },
  {
    id: "handoff",
    name: "Jon Bell",
    role: "Design Lead",
    company: "Morrow Labs",
    quote:
      "Every handoff became easier to trust. The team moved with the same picture instead of passing around another thread.",
    outcome: "Calmer handoffs",
    metric: "3.2×",
    metricLabel: "faster review cycles",
    icon: Workflow,
  },
  {
    id: "review",
    name: "Ari Okafor",
    role: "Head of Delivery",
    company: "Fieldwork",
    quote:
      "Review stopped being a meeting we prepared for and became a moment where the right decision was already visible.",
    outcome: "Clearer review",
    metric: "18",
    metricLabel: "decisions kept in context",
    icon: Layers3,
  },
  {
    id: "release",
    name: "Elena Park",
    role: "COO",
    company: "Juniper House",
    quote:
      "We did not need more ceremony. We needed confidence that the next move was ready to leave the room.",
    outcome: "Confident release",
    metric: "91%",
    metricLabel: "release confidence",
    icon: Users,
  },
];

// 0..1 timeline mapping points for transitions between 4 states
const quoteProgress = [0, 0.22, 0.25, 0.47, 0.5, 0.72, 0.75, 0.97, 1.0];

const quoteOpacity = [
  [1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
];

const quoteY = [
  [0, 0, -20, -20, -20, -20, -20, -20, -20],
  [20, 20, 0, 0, -20, -20, -20, -20, -20],
  [20, 20, 20, 20, 0, 0, -20, -20, -20],
  [20, 20, 20, 20, 20, 20, 0, 0, 0],
];

function QuoteLayer({
  testimonial,
  index,
  progress,
  reducedMotion,
  compact,
  activeIndex,
}: {
  testimonial: Testimonial;
  index: number;
  progress: ReturnType<typeof useSpring>;
  reducedMotion: boolean;
  compact: boolean;
  activeIndex: number;
}) {
  const opacityValues = reducedMotion
    ? quoteOpacity[index].map((val) => Math.max(val, 0.05))
    : quoteOpacity[index];
  const yValues = reducedMotion ? quoteY[index].map(() => 0) : quoteY[index];
  const scaleValues = quoteProgress.map((_, step) =>
    reducedMotion ? 1 : step === index * 2 || step === index * 2 + 1 ? 1 : 0.98
  );
  const blurValues = quoteOpacity[index].map((val) =>
    reducedMotion ? 0 : val > 0.8 ? 0 : 4
  );

  const opacity = useTransform(progress, quoteProgress, opacityValues);
  const y = useTransform(progress, quoteProgress, yValues);
  const scale = useTransform(progress, quoteProgress, scaleValues);
  const blur = useTransform(progress, quoteProgress, blurValues);
  const filter = useTransform(blur, (val) => `blur(${val}px)`);
  const Icon = testimonial.icon;

  return (
    <motion.div
      style={{ opacity, y, scale, filter, willChange: "transform, opacity, filter" }}
      className="absolute inset-0 flex flex-col justify-between"
      aria-hidden={activeIndex !== index}
    >
      <div>
        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          <Icon className="h-3 w-3 text-white/55" />
          {testimonial.outcome}
        </div>
        <p
          className={`mt-4 max-w-2xl font-serif font-light leading-[1.05] tracking-[-0.045em] text-white/95 ${
            compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl lg:text-[4.2rem]"
          }`}
        >
          “{testimonial.quote}”
        </p>
      </div>
      <div className="flex items-center gap-2 text-[9px] text-white/35 font-sans">
        <CircleDot className="h-3 w-3 text-white/45" />
        {testimonial.company} / {testimonial.role}
      </div>
    </motion.div>
  );
}

function IdentityRail({ activeIndex, compact }: { activeIndex: number; compact: boolean }) {
  return (
    <div
      className={`relative z-20 ${compact ? "mt-4 flex gap-1 overflow-hidden" : "space-y-1.5"}`}
      role="list"
      aria-label="Testimonial identities"
    >
      {testimonials.map((testimonial, index) => {
        const Icon = testimonial.icon;
        const isActive = activeIndex === index;

        return (
          <div
            key={testimonial.id}
            role="listitem"
            aria-current={isActive ? "true" : undefined}
            className={`group relative overflow-hidden border transition-colors duration-300 ${
              compact ? "min-w-[104px] flex-1 rounded-lg px-2 py-2" : "rounded-xl px-4 py-3.5"
            } ${
              isActive
                ? "border-white/20"
                : "border-white/[0.05] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-rail-highlight"
                className="absolute inset-0 bg-white/[0.05]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ willChange: "transform" }}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-white/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex items-start gap-2.5">
              <span
                className={`flex shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  compact ? "h-5 w-5" : "h-6 w-6"
                } ${
                  isActive ? "border-white/55 bg-white text-black" : "border-white/15 text-white/40"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isActive ? "check" : "icon"}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-center justify-center"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {isActive ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                  </motion.span>
                </AnimatePresence>
              </span>
              <div className="min-w-0">
                <div
                  className={`truncate font-medium text-white/80 ${
                    compact ? "text-[9px]" : "text-[10px]"
                  }`}
                >
                  {testimonial.name}
                </div>
                <div className="mt-0.5 truncate font-mono text-[8px] text-white/30">
                  {testimonial.company}
                </div>
              </div>
              {!compact && (
                <span className="ml-auto font-mono text-[8px] text-white/20">0{index + 1}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProofFrame({
  activeIndex,
  progress,
  reducedMotion,
  compact,
}: {
  activeIndex: number;
  progress: ReturnType<typeof useSpring>;
  reducedMotion: boolean;
  compact: boolean;
}) {
  const activeTestimonial = testimonials[activeIndex];
  const metricScale = useTransform(
    progress,
    [0.68, 0.86, 1],
    reducedMotion ? [1, 1, 1] : [0.97, 1, 1]
  );
  const metricOpacity = useTransform(progress, [0.68, 0.84, 1], [0.7, 1, 1]);

  const quoteIconY = useTransform(progress, [0, 1], reducedMotion ? [0, 0] : [0, -36]);

  // Dynamic connection pointer height mapping
  const trackHeight = compact ? 120 : 180;
  const pointerY = useTransform(progress, [0, 1], [0, trackHeight]);

  return (
    <div
      className={`relative z-10 overflow-hidden border border-white/10 bg-[#08080a]/90 shadow-[0_45px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl ${
        compact ? "rounded-2xl p-5" : "rounded-3xl p-6 sm:p-9"
      }`}
    >
      {/* Top bar info */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
            proof / in practice
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/30">
          <Sparkles className="h-2.5 w-2.5 text-white/55" /> verified context
        </span>
      </div>

      {/* Quote viewport and pointer track layout */}
      <div className="relative grid grid-cols-[1fr_auto] gap-5">
        <div
          className={`relative ${
            compact ? "mt-4 min-h-[230px]" : "mt-7 min-h-[320px] sm:min-h-[360px]"
          }`}
        >
          <motion.div
            style={{ y: quoteIconY, willChange: "transform" }}
            className="absolute right-0 top-0 pointer-events-none opacity-80"
          >
            <Quote className={`text-white/[0.06] ${compact ? "h-8 w-8" : "h-14 w-14"}`} />
          </motion.div>
          {testimonials.map((testimonial, index) => (
            <QuoteLayer
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              compact={compact}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* Dynamic vertical connection indicator pointer */}
        <div className="relative w-1 flex flex-col items-center justify-center self-stretch py-8 opacity-75">
          <div className="absolute inset-y-8 w-[1px] bg-white/[0.06]" />
          <div className="relative w-full h-[180px] self-start" style={{ height: `${trackHeight}px` }}>
            <motion.div
              style={{ y: pointerY, willChange: "transform" }}
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-6 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Metric layout */}
      <motion.div
        style={{ scale: metricScale, opacity: metricOpacity }}
        className={`grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-t border-white/[0.06] pt-4 ${
          compact ? "mt-4" : "mt-6"
        }`}
      >
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
            Observed outcome
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeTestimonial.metricLabel}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
              transition={
                reducedMotion
                  ? { duration: 0.12 }
                  : { type: "spring", stiffness: 180, damping: 24, mass: 0.5 }
              }
              className="mt-1 text-xs text-white/50 font-sans"
            >
              {activeTestimonial.metricLabel}
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeTestimonial.metric}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
            transition={
              reducedMotion
                ? { duration: 0.12 }
                : { type: "spring", stiffness: 180, damping: 24, mass: 0.5 }
            }
            className={`font-serif font-light leading-none tracking-[-0.06em] text-white/95 ${
              compact ? "text-3xl" : "text-5xl"
            }`}
          >
            {activeTestimonial.metric}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ProofRelayTestimonialsElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const isCatalog = previewMode === "catalog";
  const reducedMotion = Boolean(prefersReducedMotion);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 28,
    mass: 0.3,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(testimonials.length - 1, Math.floor(latest * testimonials.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const introOpacity = useTransform(progress, [0, 0.12, 0.82, 1], [1, 1, 0.68, 0.4]);
  const introY = useTransform(progress, [0, 1], [0, reducedMotion ? 0 : -28]);
  const outroOpacity = useTransform(progress, [0.78, 0.92, 1], [0, 0.35, 1]);
  const outroY = useTransform(progress, [0.78, 1], [reducedMotion ? 0 : 18, 0]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto bg-[#030303] text-white scrollbar-none antialiased"
    >
      <div className="relative" style={{ height: isCatalog ? "1020px" : "300dvh" }}>
        <section
          className="sticky top-0 flex min-h-[500px] w-full items-center overflow-hidden bg-[#030303]"
          style={{ height: isCatalog ? "500px" : "100dvh" }}
        >
          {/* Circular dot grid layout backdrop */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.25] bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

          {/* Left panel header */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className={`absolute left-5 top-5 z-30 sm:left-8 sm:top-8 ${
              isCatalog ? "max-w-[180px]" : "max-w-[270px]"
            }`}
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
              Testimonials / 01
            </div>
            <h1
              className={`mt-2 font-serif font-light leading-[0.98] tracking-[-0.05em] ${
                isCatalog ? "text-xl" : "text-3xl sm:text-4xl"
              }`}
            >
              Proof that stays close to the work.
            </h1>
            <p
              className={`mt-3 leading-relaxed text-white/40 font-sans ${
                isCatalog ? "text-[9px]" : "text-xs"
              }`}
            >
              Real outcomes, kept in context.
            </p>
          </motion.div>

          {/* Middle quote frame and right identity rail */}
          <div
            className={`relative mx-auto flex w-full max-w-7xl items-center justify-center px-5 sm:px-8 ${
              isCatalog
                ? "flex-col"
                : "grid md:grid-cols-[minmax(130px,0.35fr)_minmax(0,1.5fr)_minmax(180px,0.55fr)] md:gap-8 lg:gap-12"
            }`}
          >
            <div className={`${isCatalog ? "hidden" : "hidden md:block"}`}>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                Observed / together
              </div>
              <div className="mt-3 max-w-[120px] text-xs leading-relaxed text-white/40 font-sans">
                The strongest proof is specific enough to feel lived in.
              </div>
            </div>

            <ProofFrame
              activeIndex={activeIndex}
              progress={progress}
              reducedMotion={reducedMotion}
              compact={isCatalog}
            />

            <IdentityRail activeIndex={activeIndex} compact={isCatalog} />
          </div>

          {/* Outro center header */}
          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 text-center ${
              isCatalog ? "bottom-11 w-[220px]" : "bottom-16 w-[min(90vw,440px)] sm:bottom-20"
            }`}
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              What the work becomes
            </div>
            <p
              className={`mt-2 font-serif font-light leading-tight tracking-[-0.04em] text-white/70 ${
                isCatalog ? "text-sm" : "text-xl sm:text-3xl"
              }`}
            >
              Good work leaves a trace.
            </p>
          </motion.div>

          {/* Footer page indicators */}
          <div className="absolute bottom-5 left-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:left-8 sm:right-8">
            <div className="overflow-hidden h-3.5 flex items-center relative w-5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeIndex}
                  initial={reducedMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 absolute left-0"
                  style={{ willChange: "transform, opacity" }}
                >
                  0{activeIndex + 1}
                </motion.span>
              </AnimatePresence>
            </div>
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
