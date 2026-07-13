import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

function QuoteField({
  item,
  activeIndex,
  compact,
  reducedMotion,
}: {
  item: Testimonial;
  activeIndex: number;
  compact: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={item.name}
          className="absolute inset-0 flex flex-col justify-center"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.55 }}
        >
          <p
            className={`max-w-3xl font-serif font-light tracking-[-0.045em] text-white ${compact ? "text-2xl leading-[1.05]" : "text-5xl leading-[0.98] md:text-7xl"}`}
          >
            &ldquo;{item.quote}&rdquo;
          </p>
          <motion.p
            key={`${activeIndex}-note`}
            initial={reducedMotion ? false : { opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mt-6 font-mono uppercase tracking-[0.18em] text-white/35 ${compact ? "text-[8px]" : "text-[10px]"}`}
          >
            {item.note}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IdentityRail({
  activeIndex,
  compact,
  onActiveChange,
}: {
  activeIndex: number;
  compact: boolean;
  onActiveChange: (index: number) => void;
}) {
  return (
    <div className="border-y border-white/10" onPointerLeave={() => onActiveChange(0)}>
      {testimonials.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={item.name}
            type="button"
            layout
            aria-pressed={isActive}
            onPointerEnter={() => onActiveChange(index)}
            onFocus={() => onActiveChange(index)}
            onClick={() => onActiveChange(index)}
            className={`group relative grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-white/[0.07] text-left outline-none last:border-b-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/35 ${compact ? "px-3 py-3" : "px-4 py-4 md:px-5"}`}
            whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.025)" }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
          >
            {isActive && (
              <motion.div
                layoutId="voice-index-active"
                className="absolute inset-0 bg-white/[0.055]"
                transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.5 }}
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
                  className={`truncate font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-white/48 group-hover:text-white/80"} ${compact ? "text-[10px]" : "text-xs"}`}
                >
                  {item.name}
                </span>
              </div>
              <div
                className={`mt-1 truncate text-white/30 transition-colors duration-200 group-hover:text-white/42 ${compact ? "pl-5 text-[8px]" : "pl-6 text-[10px]"}`}
              >
                {item.role} &middot; {item.company}
              </div>
            </div>
            <div className="relative text-right">
              <div
                className={`font-medium transition-colors duration-200 ${isActive ? "text-white/85" : "text-white/38 group-hover:text-white/65"} ${compact ? "text-[9px]" : "text-[11px]"}`}
              >
                {item.outcome}
              </div>
              <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/22 transition-colors duration-200 group-hover:text-white/40">
                {isActive ? (
                  <ArrowUpRight className="h-2.5 w-2.5" />
                ) : (
                  <ArrowDownRight className="h-2.5 w-2.5" />
                )}
                field note
              </div>
            </div>
          </motion.button>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const compact = previewMode === "catalog";
  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="h-full min-h-[500px] w-full overflow-hidden bg-[#0a0a0b] text-white">
      <div className="relative h-full min-h-[500px]">
        <div
          className={`flex h-full min-h-[500px] w-full overflow-hidden px-5 md:px-12 ${compact ? "items-start" : "items-center"}`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div
            className={`relative mx-auto flex w-full max-w-6xl flex-col ${compact ? "gap-6 py-8" : "gap-10"}`}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
                  Voices / 01-04
                </div>
                <h2
                  className={`mt-3 font-sans font-semibold tracking-[-0.04em] text-white ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}
                >
                  Proof, in their own words.
                </h2>
              </div>
              <div className="hidden text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/28 md:block">
                Hover to trace
                <br />
                the record
              </div>
            </div>

            <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] md:gap-16">
              <div className="relative">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                  {String(activeIndex + 1).padStart(2, "0")} / testimony
                </div>
                <div
                  className={`relative mt-5 ${compact ? "h-[205px]" : "h-[355px] md:h-[380px]"}`}
                >
                  <QuoteField
                    item={activeTestimonial}
                    activeIndex={activeIndex}
                    compact={compact}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
              <div className={compact ? "" : "md:pt-14"}>
                <IdentityRail
                  activeIndex={activeIndex}
                  compact={compact}
                  onActiveChange={setActiveIndex}
                />
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/28">
                A quieter kind of proof
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/28">
                Komorebi / field notes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
