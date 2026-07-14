import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Circle, FileText, GitPullRequest, Send } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type VersionId = "draft" | "review" | "ready";

type Version = {
  id: VersionId;
  index: string;
  label: string;
  status: string;
  title: string;
  summary: string;
  owner: string;
  detail: string;
  action: string;
  icon: typeof FileText;
};

const versions: Version[] = [
  {
    id: "draft",
    index: "01",
    label: "Draft",
    status: "Shaping the brief",
    title: "Give the release a clear first shape.",
    summary: "Bring the premise, audience, and open questions into one readable starting point.",
    owner: "Mara Ellison",
    detail: "3 notes still open",
    action: "Send for review",
    icon: FileText,
  },
  {
    id: "review",
    index: "02",
    label: "Review",
    status: "Aligning the details",
    title: "Keep every decision close to its reason.",
    summary:
      "A shared record makes the important trade-offs visible before the work moves forward.",
    owner: "Northline team",
    detail: "2 decisions confirmed",
    action: "Mark decisions",
    icon: GitPullRequest,
  },
  {
    id: "ready",
    index: "03",
    label: "Ready",
    status: "Prepared to release",
    title: "Move when the whole picture is settled.",
    summary: "The final brief carries the context your team needs to ship with confidence.",
    owner: "Release desk",
    detail: "All checks complete",
    action: "Open release",
    icon: Send,
  },
];

const transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

function DocumentMarks({ version, compact }: { version: Version; compact: boolean }) {
  const widths =
    version.id === "draft" ? [84, 58, 70] : version.id === "review" ? [72, 90, 62] : [92, 66, 78];

  return (
    <div
      className={`grid grid-cols-[1.08fr_0.92fr] border-t border-black/10 ${compact ? "mt-4" : "mt-7"}`}
    >
      <div className={`${compact ? "py-3 pr-3" : "py-5 pr-5"}`}>
        <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/35">
          Decision record
        </div>
        <div className={`space-y-2 ${compact ? "mt-2.5" : "mt-4"}`}>
          {widths.map((width, index) => (
            <motion.div
              key={index}
              animate={{ width: `${width}%`, opacity: index === 0 ? 0.72 : 0.35 + index * 0.12 }}
              transition={transition}
              className="h-px bg-black"
            />
          ))}
        </div>
      </div>
      <div className={`border-l border-black/10 ${compact ? "py-3 pl-3" : "py-5 pl-5"}`}>
        <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/35">Signal</div>
        <div className={`${compact ? "mt-2.5" : "mt-4"} flex items-center gap-2`}>
          <motion.span
            animate={{
              scale: version.id === "ready" ? 1 : 0.75,
              opacity: version.id === "draft" ? 0.42 : 0.82,
            }}
            transition={transition}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-black/45"
          >
            {version.id === "ready" ? (
              <Check className="h-3 w-3" />
            ) : (
              <Circle className="h-2 w-2 fill-current" />
            )}
          </motion.span>
          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-black/55">
            {version.detail}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VersionFoldShowcaseElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<VersionId>("review");
  const [direction, setDirection] = useState(1);
  const isCatalog = previewMode === "catalog";
  const activeIndex = versions.findIndex((version) => version.id === activeId);
  const activeVersion = versions[activeIndex];
  const ActiveIcon = activeVersion.icon;
  const compact = isCatalog;

  const selectVersion = (nextId: VersionId) => {
    const nextIndex = versions.findIndex((version) => version.id === nextId);
    if (nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveId(nextId);
  };

  return (
    <section className="h-full w-full overflow-hidden bg-[#0b0b0c] text-white">
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden ${compact ? "px-5 py-6" : "px-5 py-10 sm:px-10"}`}
        style={{ height: isCatalog ? "500px" : "100dvh" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className={`relative z-10 w-full ${compact ? "max-w-[760px]" : "max-w-6xl"}`}>
          <div
            className={`mb-4 flex items-end justify-between border-b border-white/10 ${compact ? "pb-3" : "mb-6 pb-4"}`}
          >
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Version fold / 04
              </div>
              <h1
                className={`mt-2 font-semibold tracking-[-0.05em] text-white ${compact ? "text-xl" : "text-3xl sm:text-4xl"}`}
              >
                Let the release resolve in place.
              </h1>
            </div>
            <span className="hidden max-w-36 text-right font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 sm:block">
              Select a state to trace the record
            </span>
          </div>

          <LayoutGroup id={`version-fold-${previewMode}`}>
            <div
              className={`grid items-stretch gap-px overflow-hidden border border-white/15 bg-white/15 ${compact ? "grid-cols-[92px_minmax(0,1fr)]" : "grid-cols-[148px_minmax(0,1fr)] sm:grid-cols-[188px_minmax(0,1fr)]"}`}
            >
              <div className="bg-[#111113] p-2 sm:p-3">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Versions
                </div>
                <div className="mt-3 space-y-1">
                  {versions.map((version) => {
                    const Icon = version.icon;
                    const isActive = version.id === activeId;
                    return (
                      <button
                        key={version.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => selectVersion(version.id)}
                        className={`group relative flex w-full items-center gap-2 overflow-hidden rounded-sm px-2 text-left ${compact ? "py-2" : "py-2.5 sm:px-2.5"}`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId={`version-fold-selection-${previewMode}`}
                            transition={prefersReducedMotion ? { duration: 0.01 } : transition}
                            className="absolute inset-0 border border-white/20 bg-white/[0.1]"
                          />
                        )}
                        <span className="relative z-10 font-mono text-[8px] text-white/35">
                          {version.index}
                        </span>
                        <Icon
                          className={`relative z-10 h-3 w-3 transition-colors ${isActive ? "text-white" : "text-white/35 group-hover:text-white/65"}`}
                        />
                        <span
                          className={`relative z-10 truncate text-[10px] transition-colors ${isActive ? "text-white" : "text-white/45 group-hover:text-white/75"}`}
                        >
                          {version.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 hidden border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25 sm:block">
                  One artifact
                  <br />
                  three states
                </div>
              </div>

              <article
                className={`relative min-w-0 bg-[#f2f0eb] text-[#101010] ${compact ? "min-h-[304px] p-4" : "min-h-[450px] p-6 sm:p-9"}`}
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/45">
                    Northline / release brief
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    {activeVersion.index} / 03
                  </span>
                </div>

                <div
                  className={`relative ${compact ? "mt-5 min-h-[136px]" : "mt-9 min-h-[196px]"}`}
                >
                  <AnimatePresence initial={false} mode="sync" custom={direction}>
                    <motion.div
                      key={activeVersion.id}
                      custom={direction}
                      initial={
                        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 12 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }
                      }
                      transition={prefersReducedMotion ? { duration: 0.1 } : transition}
                      className="absolute inset-0"
                    >
                      <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-black/45">
                        <ActiveIcon className="h-3 w-3" /> {activeVersion.status}
                      </div>
                      <h2
                        className={`mt-3 max-w-[580px] font-serif font-light leading-[0.95] tracking-[-0.055em] ${compact ? "text-[clamp(1.45rem,4vw,2.25rem)]" : "text-[clamp(2rem,5vw,4.25rem)]"}`}
                      >
                        {activeVersion.title}
                      </h2>
                      <p
                        className={`max-w-[480px] text-black/55 ${compact ? "mt-3 text-[10px] leading-relaxed" : "mt-4 text-sm leading-relaxed"}`}
                      >
                        {activeVersion.summary}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <DocumentMarks version={activeVersion} compact={compact} />
                <div
                  className={`flex items-center justify-between border-t border-black/10 ${compact ? "mt-3 pt-3" : "mt-5 pt-5"}`}
                >
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.17em] text-black/35">
                      Owner
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-black/75">
                      {activeVersion.owner}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[10px] font-medium text-black/75 transition-colors hover:text-black"
                  >
                    {activeVersion.action} <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            </div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
