import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Check,
  Circle,
  Inbox,
  Layers,
  Send,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

const workflowSteps = [
  { label: "Collect signal", icon: Inbox },
  { label: "Shape the next move", icon: SlidersHorizontal },
  { label: "Ship with confidence", icon: Send },
];

function MiniBar({ width, muted = false }: { width: string; muted?: boolean }) {
  return (
    <div
      className={`h-1.5 rounded-full ${muted ? "bg-white/[0.06]" : "bg-white/15"}`}
      style={{ width }}
    />
  );
}

function SignalRows() {
  return (
    <div className="space-y-2.5">
      {[
        ["Customer interviews", "42 notes", "bg-white/80"],
        ["Support patterns", "18 signals", "bg-[#c6d478]"],
        ["Product feedback", "09 themes", "bg-white/45"],
      ].map(([label, value, dot]) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            <span className="truncate text-[10px] text-white/70">{label}</span>
          </div>
          <span className="ml-3 shrink-0 font-mono text-[9px] text-white/35">{value}</span>
        </div>
      ))}
    </div>
  );
}

function DecisionRows() {
  return (
    <div className="space-y-2.5">
      {(
        [
          ["Reduce setup time", "High confidence", true],
          ["Clarify team roles", "In review", false],
          ["Improve handoffs", "Ready next", false],
        ] as const
      ).map(([label, value, selected]) => (
        <div
          key={label}
          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${selected ? "border-white/20 bg-white/[0.08]" : "border-white/[0.07] bg-white/[0.025]"}`}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-white/60 bg-white text-black" : "border-white/20 text-transparent"}`}
            >
              <Check className="h-2.5 w-2.5" />
            </span>
            <span className="truncate text-[10px] text-white/70">{label}</span>
          </div>
          <span className="ml-3 shrink-0 font-mono text-[9px] text-white/35">{value}</span>
        </div>
      ))}
    </div>
  );
}

function DeliveryRows() {
  return (
    <div className="space-y-2.5">
      {[
        ["Release brief", "Published"],
        ["Team handoff", "In motion"],
        ["Outcome review", "Tomorrow"],
      ].map(([label, value], index) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${index === 0 ? "bg-[#c6d478] text-black" : "border border-white/20 text-white/30"}`}
            >
              {index === 0 ? (
                <Check className="h-2.5 w-2.5" />
              ) : (
                <Circle className="h-1.5 w-1.5 fill-current" />
              )}
            </span>
            <span className="truncate text-[10px] text-white/70">{label}</span>
          </div>
          <span className="ml-3 shrink-0 font-mono text-[9px] text-white/35">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SignalWorkflowShowcaseElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 118,
    damping: 28,
    mass: 0.28,
  });
  const movement = prefersReducedMotion ? 0 : 1;

  useMotionValueEvent(progress, "change", (latest) => {
    const nextStep = latest < 0.34 ? 0 : latest < 0.68 ? 1 : 2;
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  });

  const collectOpacity = useTransform(progress, [0, 0.25, 0.39, 0.47], [1, 1, 0, 0]);
  const shapeOpacity = useTransform(progress, [0.26, 0.4, 0.59, 0.73], [0, 1, 1, 0]);
  const shipOpacity = useTransform(progress, [0.58, 0.72, 1], [0, 1, 1]);
  const collectY = useTransform(progress, [0, 0.47], [0, -18 * movement]);
  const shapeY = useTransform(progress, [0.26, 0.73], [18 * movement, -14 * movement]);
  const shipY = useTransform(progress, [0.58, 1], [18 * movement, 0]);
  const workspaceY = useTransform(progress, [0, 0.5, 1], [10 * movement, 0, -8 * movement]);
  const workspaceScale = useTransform(progress, [0, 0.18, 0.82, 1], [0.97, 1, 1, 0.985]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto bg-[#09090b] text-white scrollbar-none"
    >
      <div
        className="relative"
        style={{ height: previewMode === "fullscreen" ? "300dvh" : "1350px" }}
      >
        <section
          className="sticky top-0 flex min-h-[500px] w-full items-center overflow-hidden bg-[#09090b]"
          style={{ height: previewMode === "fullscreen" ? "100dvh" : "500px" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

          <div className="relative mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(210px,0.34fr)_minmax(0,1fr)] lg:gap-12 lg:px-12">
            <div className="relative z-10 flex min-h-[174px] flex-col justify-center">
              <div className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c6d478]" />
                Signal desk / 01
              </div>

              <div className="relative h-[108px] max-w-[310px] sm:h-[120px]">
                <motion.div
                  style={{ opacity: collectOpacity, y: collectY }}
                  className="absolute inset-0"
                >
                  <h1 className="text-3xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
                    Start with what the work is telling you.
                  </h1>
                  <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-white/45">
                    Bring scattered notes, patterns, and quiet signals into one readable surface.
                  </p>
                </motion.div>
                <motion.div
                  style={{ opacity: shapeOpacity, y: shapeY }}
                  className="absolute inset-0"
                >
                  <h1 className="text-3xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
                    Turn signal into a clear next move.
                  </h1>
                  <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-white/45">
                    Give the team a shared shape for deciding what deserves attention now.
                  </p>
                </motion.div>
                <motion.div style={{ opacity: shipOpacity, y: shipY }} className="absolute inset-0">
                  <h1 className="text-3xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
                    Keep the momentum visible.
                  </h1>
                  <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-white/45">
                    Make the handoff calm, accountable, and ready to move.
                  </p>
                </motion.div>
              </div>

              <div className="mt-7 flex max-w-[310px] items-center gap-2">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex min-w-0 items-center gap-1.5">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${activeStep === index ? "border-white/50 bg-white text-black" : "border-white/10 text-white/30"}`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      {index < workflowSteps.length - 1 && (
                        <span className="h-px w-4 bg-white/10 sm:w-7" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div
              style={{ y: workspaceY, scale: workspaceScale }}
              className="relative z-10 w-full will-change-transform"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101012]/95 shadow-[0_35px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-3.5 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                      signal desk
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-white/35">
                    <Activity className="h-3 w-3" /> Live workspace
                  </div>
                </div>

                <div className="grid min-h-[250px] grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[112px_minmax(0,1fr)]">
                  <aside className="border-r border-white/[0.07] bg-black/10 p-2.5 sm:p-3.5">
                    <div className="mb-6 flex items-center gap-1.5 px-1 text-[9px] font-semibold text-white/65">
                      <Sparkles className="h-3 w-3 text-white/70" />{" "}
                      <span className="hidden sm:inline">Komorebi</span>
                    </div>
                    <div className="space-y-1">
                      {workflowSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.label}
                            className={`flex items-center gap-2 rounded-md px-2 py-2 text-[9px] ${activeStep === index ? "bg-white/[0.09] text-white" : "text-white/30"}`}
                          >
                            <Icon className="h-3 w-3 shrink-0" />
                            <span className="hidden truncate sm:inline">
                              {step.label.split(" ")[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-10 hidden space-y-2 sm:block">
                      <MiniBar width="58px" muted />
                      <MiniBar width="42px" muted />
                    </div>
                  </aside>

                  <div className="min-w-0 p-3.5 sm:p-5">
                    <div className="mb-4 flex items-end justify-between gap-3">
                      <div>
                        <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                          Workspace overview
                        </div>
                        <div className="mt-1 text-sm font-medium tracking-tight text-white/85">
                          A clearer way forward
                        </div>
                      </div>
                      <div className="hidden items-center gap-1.5 rounded-full border border-white/10 px-2 py-1 font-mono text-[8px] text-white/40 sm:flex">
                        <Zap className="h-2.5 w-2.5 text-[#c6d478]" /> synced
                      </div>
                    </div>

                    <div className="relative min-h-[164px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0d] p-3.5 sm:p-4">
                      <motion.div
                        style={{ opacity: collectOpacity, y: collectY }}
                        className="absolute inset-3.5 sm:inset-4"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <div className="text-xs font-medium text-white/75">Incoming signal</div>
                            <div className="mt-1 text-[9px] text-white/35">Updated moments ago</div>
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 text-white/30" />
                        </div>
                        <SignalRows />
                      </motion.div>
                      <motion.div
                        style={{ opacity: shapeOpacity, y: shapeY }}
                        className="absolute inset-3.5 sm:inset-4"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <div className="text-xs font-medium text-white/75">Decision map</div>
                            <div className="mt-1 text-[9px] text-white/35">
                              Three priorities are taking shape
                            </div>
                          </div>
                          <Layers className="h-3.5 w-3.5 text-white/30" />
                        </div>
                        <DecisionRows />
                      </motion.div>
                      <motion.div
                        style={{ opacity: shipOpacity, y: shipY }}
                        className="absolute inset-3.5 sm:inset-4"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <div className="text-xs font-medium text-white/75">Delivery pulse</div>
                            <div className="mt-1 text-[9px] text-white/35">
                              The next handoff is ready
                            </div>
                          </div>
                          <Send className="h-3.5 w-3.5 text-white/30" />
                        </div>
                        <DeliveryRows />
                      </motion.div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {["Clarity", "Velocity", "Trust"].map((label, index) => (
                        <div
                          key={label}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5"
                        >
                          <div className="text-[8px] text-white/35">{label}</div>
                          <div className="mt-2 flex items-end justify-between gap-2">
                            <span className="text-xs text-white/70">
                              {index === 0 ? "92" : index === 1 ? "76" : "88"}%
                            </span>
                            <MiniBar width={`${index === 0 ? 38 : index === 1 ? 29 : 34}px`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center gap-3 sm:bottom-7 sm:left-8 sm:right-8">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              0{activeStep + 1}
            </span>
            <div className="h-px flex-1 bg-white/10">
              <motion.div style={{ width: progressWidth }} className="h-full bg-white/60" />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              03
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
