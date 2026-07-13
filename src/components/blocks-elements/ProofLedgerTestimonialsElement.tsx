import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

type ProofRecord = {
  name: string;
  role: string;
  company: string;
  outcome: string;
  metric: string;
  before: string;
  after: string;
  quote: string;
  source: string;
};

const records: ProofRecord[] = [
  {
    name: "Sasha Reid",
    role: "Program lead",
    company: "Ostra Collective",
    outcome: "Fewer stalled reviews",
    metric: "-38% review drag",
    before: "Signals scattered across the week",
    after: "One shared view for the next move",
    quote: "The work finally has a visible shape before it becomes urgent.",
    source: "Post-launch reflection / 2026",
  },
  {
    name: "Milan Reyes",
    role: "Operations director",
    company: "North Bank",
    outcome: "Handoffs carry context",
    metric: "2x clearer handoff",
    before: "Updates arrived without their reasoning",
    after: "Decisions travel with their context",
    quote: "We spend less time reconstructing the why behind every handoff.",
    source: "Team retrospective / 2026",
  },
  {
    name: "Noor Ahmed",
    role: "Design systems lead",
    company: "Common Thread",
    outcome: "Calmer approvals",
    metric: "-11 hrs / cycle",
    before: "Feedback lived in disconnected passes",
    after: "Review became one usable record",
    quote: "The conversation is still rigorous, but it no longer feels noisy.",
    source: "Design review note / 2026",
  },
  {
    name: "Elliot Tan",
    role: "Product founder",
    company: "Harbour Studio",
    outcome: "Releases feel settled",
    metric: "+24% release confidence",
    before: "Final decisions stayed ambiguous",
    after: "Open questions have a clear owner",
    quote: "We now know what is ready, what needs care, and who moves it forward.",
    source: "Founder field note / 2026",
  },
];

function EvidenceField({
  record,
  activeIndex,
  compact,
  reducedMotion,
}: {
  record: ProofRecord;
  activeIndex: number;
  compact: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="relative min-h-[285px] overflow-hidden border-y border-white/10 py-5 sm:min-h-[310px] md:py-7">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={record.name}
          className="absolute inset-0 flex flex-col justify-between py-5 md:py-7"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(3px)" }}
          transition={{ type: "spring", stiffness: 290, damping: 31, mass: 0.55 }}
        >
          <div className="flex items-start justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.18em] text-white/34 md:text-[9px]">
            <span>{String(activeIndex + 1).padStart(2, "0")} / proof record</span>
            <span className="text-right text-white/54">{record.metric}</span>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2 text-[10px] uppercase tracking-[0.14em] sm:grid-cols-[68px_1fr] sm:gap-5 md:text-[11px]">
              <span className="font-mono text-white/27">Before</span>
              <span className="text-white/42">{record.before}</span>
            </div>
            <motion.div
              layout="position"
              className="grid gap-2 border-l border-white/40 pl-3 sm:grid-cols-[68px_1fr] sm:gap-5 md:pl-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55 md:text-[11px]">
                After
              </span>
              <span
                className={`font-medium text-white ${compact ? "text-base" : "text-lg md:text-xl"}`}
              >
                {record.after}
              </span>
            </motion.div>
          </div>

          <div>
            <p
              className={`max-w-2xl font-serif font-light tracking-[-0.035em] text-white ${compact ? "text-xl leading-[1.02]" : "text-3xl leading-[1.02] md:text-4xl"}`}
            >
              &ldquo;{record.quote}&rdquo;
            </p>
            <motion.p
              key={`${activeIndex}-source`}
              initial={reducedMotion ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 font-mono text-[8px] uppercase tracking-[0.17em] text-white/28 md:text-[9px]"
            >
              {record.source}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Ledger({
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
      {records.map((record, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={record.name}
            type="button"
            layout
            aria-pressed={isActive}
            onPointerEnter={() => onActiveChange(index)}
            onFocus={() => onActiveChange(index)}
            onClick={() => onActiveChange(index)}
            className={`group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/[0.07] text-left outline-none last:border-b-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/35 ${compact ? "px-3 py-3" : "px-4 py-4"}`}
            whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.025)" }}
            transition={{ type: "spring", stiffness: 360, damping: 31, mass: 0.5 }}
          >
            {isActive && (
              <motion.div
                layoutId="proof-ledger-active"
                className="absolute inset-0 bg-white/[0.055]"
                transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.5 }}
              />
            )}
            <span
              className={`relative font-mono text-[8px] tracking-[0.16em] ${isActive ? "text-white/78" : "text-white/24"}`}
            >
              0{index + 1}
            </span>
            <span className="relative min-w-0">
              <span
                className={`block truncate font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-white/48 group-hover:text-white/78"} ${compact ? "text-[10px]" : "text-xs"}`}
              >
                {record.company}
              </span>
              <span className="mt-1 block truncate text-[8px] text-white/28 transition-colors duration-200 group-hover:text-white/42 md:text-[9px]">
                {record.name} &middot; {record.role}
              </span>
            </span>
            <span className="relative flex items-center gap-1 text-right font-mono text-[8px] uppercase tracking-[0.12em] text-white/26 transition-colors duration-200 group-hover:text-white/42">
              {isActive ? (
                <ArrowUpRight className="h-2.5 w-2.5" />
              ) : (
                <ArrowDownRight className="h-2.5 w-2.5" />
              )}
              {record.outcome}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ProofLedgerTestimonialsElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const compact = previewMode === "catalog";
  const activeRecord = records[activeIndex];

  return (
    <div className="h-full min-h-[500px] w-full overflow-hidden bg-[#0a0a0b] text-white">
      <div className="relative h-full min-h-[500px]">
        <div
          className={`flex h-full min-h-[500px] w-full overflow-hidden px-5 md:px-12 ${compact ? "items-start" : "items-center"}`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className={`relative mx-auto w-full max-w-6xl ${compact ? "py-8" : "py-5"}`}>
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
                  Evidence ledger / 02
                </div>
                <h2
                  className={`mt-3 font-sans font-semibold tracking-[-0.04em] text-white ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}
                >
                  What changed, in their words.
                </h2>
              </div>
              <div className="hidden text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/28 md:block">
                Hover to inspect
                <br />
                the evidence
              </div>
            </div>

            <div className="grid items-start gap-8 py-7 md:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] md:gap-16 md:py-10">
              <EvidenceField
                record={activeRecord}
                activeIndex={activeIndex}
                compact={compact}
                reducedMotion={reducedMotion}
              />
              <Ledger activeIndex={activeIndex} compact={compact} onActiveChange={setActiveIndex} />
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.17em] text-white/28 md:text-[9px]">
              <span>From observation to outcome</span>
              <span>Komorebi / proof ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
