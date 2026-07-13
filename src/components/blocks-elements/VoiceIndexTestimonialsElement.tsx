import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  outcome: string;
  quote: string;
  note: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Mara Ellison",
    role: "Operations lead",
    company: "Northline Studio",
    outcome: "Clarity arrived earlier",
    quote:
      "We stopped mistaking activity for progress. The whole team can see what deserves attention before the week starts moving.",
    note: "A calmer operating rhythm",
  },
  {
    name: "Jon Bell",
    role: "Product director",
    company: "Morrow Labs",
    outcome: "Handoffs feel lighter",
    quote:
      "The work is still ambitious, but the space around it is quieter. Decisions now travel with the context that made them possible.",
    note: "Less ceremony, more momentum",
  },
  {
    name: "Ari Okafor",
    role: "Design partner",
    company: "Fieldwork Co.",
    outcome: "Reviews became clearer",
    quote:
      "Our critique changed from a meeting people endured into a shared record people could actually build from.",
    note: "A better hand for detail",
  },
  {
    name: "Elena Park",
    role: "Founder",
    company: "Juniper House",
    outcome: "Releases feel ready",
    quote:
      "It gives the final mile a shape. We know what is settled, what is still open, and who is carrying it forward.",
    note: "Confidence without noise",
  },
];

function QuoteLayer({
  item,
  index,
  progress,
  compact,
}: {
  item: Testimonial;
  index: number;
  progress: MotionValue<number>;
  compact: boolean;
}) {
  const center = (index + 0.5) / testimonials.length;
  const fade = index === 0 ? 0.05 : 0.08;
  const opacity = useTransform(
    progress,
    [
      Math.max(0, center - 0.2),
      Math.max(0, center - fade),
      center,
      Math.min(1, center + fade),
      Math.min(1, center + 0.2),
    ],
    [0, 0.2, 1, 0.2, 0],
  );
  const y = useTransform(
    progress,
    [
      Math.max(0, center - 0.2),
      Math.max(0, center - fade),
      center,
      Math.min(1, center + fade),
      Math.min(1, center + 0.2),
    ],
    [compact ? 14 : 28, compact ? 5 : 10, 0, compact ? -5 : -10, compact ? -14 : -28],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, center - 0.2), center, Math.min(1, center + 0.2)],
    [0.98, 1, 0.98],
  );
  const blur = useTransform(
    progress,
    [Math.max(0, center - 0.2), center, Math.min(1, center + 0.2)],
    [6, 0, 6],
  );
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y, scale, filter }}
      aria-hidden="true"
    >
      <p
        className={`max-w-3xl font-serif font-light tracking-[-0.045em] text-white ${compact ? "text-2xl leading-[1.05]" : "text-5xl leading-[0.98] md:text-7xl"}`}
      >
        “{item.quote}”
      </p>
      <p
        className={`mt-6 font-mono uppercase tracking-[0.18em] text-white/35 ${compact ? "text-[8px]" : "text-[10px]"}`}
      >
        {item.note}
      </p>
    </motion.div>
  );
}

function IdentityRail({ activeIndex, compact }: { activeIndex: number; compact: boolean }) {
  return (
    <div className="border-y border-white/10">
      {testimonials.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={item.name}
            layout
            className={`group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/[0.07] last:border-b-0 ${compact ? "px-3 py-3" : "px-4 py-4 md:px-5"}`}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
          >
            {isActive && (
              <motion.div
                layoutId="voice-index-active"
                className="absolute inset-0 bg-white/[0.055]"
              />
            )}
            <div className="relative min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono tracking-[0.14em] ${isActive ? "text-white/80" : "text-white/25"} ${compact ? "text-[8px]" : "text-[9px]"}`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`truncate font-medium ${isActive ? "text-white" : "text-white/48"} ${compact ? "text-[10px]" : "text-xs"}`}
                >
                  {item.name}
                </span>
              </div>
              <div
                className={`mt-1 truncate text-white/30 ${compact ? "pl-5 text-[8px]" : "pl-6 text-[10px]"}`}
              >
                {item.role} · {item.company}
              </div>
            </div>
            <div className="relative text-right">
              <div
                className={`font-medium ${isActive ? "text-white/85" : "text-white/38"} ${compact ? "text-[9px]" : "text-[11px]"}`}
              >
                {item.outcome}
              </div>
              <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/22">
                {isActive ? (
                  <ArrowUpRight className="h-2.5 w-2.5" />
                ) : (
                  <ArrowDownRight className="h-2.5 w-2.5" />
                )}
                field note
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function VoiceIndexTestimonialsElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const reducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const compact = previewMode === "catalog";
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 300 : 120,
    damping: reducedMotion ? 45 : 26,
    mass: 0.45,
  });
  const headerOpacity = useTransform(progress, [0, 0.14, 0.84, 1], [1, 0.65, 0.65, 0.2]);
  const footerOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.7, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    const nextIndex = Math.min(
      testimonials.length - 1,
      Math.floor(Math.max(0, Math.min(0.999, value)) * testimonials.length),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div
      ref={scrollRef}
      className={`h-full w-full overflow-y-auto overflow-x-hidden bg-[#0a0a0b] text-white scrollbar-none ${compact ? "" : "overscroll-contain"}`}
    >
      <div ref={sceneRef} className={compact ? "relative h-[1040px]" : "relative h-[300dvh]"}>
        <div className="sticky top-0 flex h-[100dvh] min-h-[500px] w-full items-center overflow-hidden px-5 py-8 md:px-12 md:py-12">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-between gap-8 md:gap-12">
            <motion.div
              style={{ opacity: headerOpacity }}
              className="flex items-start justify-between border-b border-white/10 pb-4"
            >
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
                  Voices / 01—04
                </div>
                <h2
                  className={`mt-3 font-sans font-semibold tracking-[-0.04em] text-white ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}
                >
                  Proof, in their own words.
                </h2>
              </div>
              <div className="hidden text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/28 md:block">
                Scroll to trace
                <br />
                the record
              </div>
            </motion.div>

            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] md:gap-16">
              <div
                className={`relative ${compact ? "min-h-[210px]" : "min-h-[300px] md:min-h-[360px]"}`}
              >
                <div className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                  {String(activeIndex + 1).padStart(2, "0")} / testimony
                </div>
                <div className="relative h-full pt-8">
                  {testimonials.map((item, index) => (
                    <QuoteLayer
                      key={item.name}
                      item={item}
                      index={index}
                      progress={progress}
                      compact={compact}
                    />
                  ))}
                </div>
              </div>
              <IdentityRail activeIndex={activeIndex} compact={compact} />
            </div>

            <motion.div
              style={{ opacity: footerOpacity }}
              className="flex items-end justify-between border-t border-white/10 pt-4"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/28">
                A quieter kind of proof
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/28">
                Komorebi / field notes
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
