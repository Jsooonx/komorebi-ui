import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Circle,
  Eye,
  Gauge,
  Layers3,
  LockKeyhole,
  Play,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type TourStepId = "overview" | "automations" | "review" | "launch";

type TourStep = {
  id: TourStepId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Eye;
};

const tourSteps: TourStep[] = [
  {
    id: "overview",
    label: "Overview",
    eyebrow: "01 / ORIENT",
    title: "See the system at a glance.",
    description: "One calm surface for the work that needs your attention now.",
    icon: Eye,
  },
  {
    id: "automations",
    label: "Automations",
    eyebrow: "02 / COMPOSE",
    title: "Shape the repeatable work.",
    description: "Turn the handoffs your team repeats into visible, reliable motion.",
    icon: Workflow,
  },
  {
    id: "review",
    label: "Review",
    eyebrow: "03 / ALIGN",
    title: "Review without losing context.",
    description: "Keep decisions close to the details that made them matter.",
    icon: Layers3,
  },
  {
    id: "launch",
    label: "Launch",
    eyebrow: "04 / RELEASE",
    title: "Launch with the full picture.",
    description: "Move from ready to released with the right signals in view.",
    icon: Rocket,
  },
];

const spring = { type: "spring" as const, stiffness: 95, damping: 22, mass: 0.85 };

function OverviewPanel() {
  return (
    <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 sm:p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
            Workspace health
          </div>
          <div className="mt-1 text-lg font-medium tracking-tight text-white/85">82.4</div>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 font-mono text-[8px] text-white/45">
          <Gauge className="h-2.5 w-2.5 text-[#c6d478]" /> steady
        </span>
      </div>
      <div className="mt-5 flex h-12 items-end gap-1">
        {[32, 45, 38, 61, 52, 68, 58, 76, 72, 88, 81, 94].map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-sm bg-white/25"
            style={{ height: `${height}%`, opacity: 0.35 + index / 24 }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
        <div className="rounded-lg border border-white/[0.07] px-2.5 py-2 text-white/45">
          Active threads <span className="float-right text-white/75">24</span>
        </div>
        <div className="rounded-lg border border-white/[0.07] px-2.5 py-2 text-white/45">
          Open loops <span className="float-right text-white/75">08</span>
        </div>
      </div>
    </div>
  );
}

function AutomationPanel() {
  return (
    <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">Automation map</div>
          <div className="mt-1 text-xs font-medium text-white/75">Release readiness</div>
        </div>
        <Sparkles className="h-3.5 w-3.5 text-white/35" />
      </div>
      <div className="mt-5 flex items-center gap-2 text-[9px]">
        {[
          ["Brief", "captured"],
          ["Review", "assigned"],
          ["Release", "queued"],
        ].map(([label, status], index) => (
          <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/20 px-2.5 py-2">
              <div className="truncate text-white/70">{label}</div>
              <div className="mt-1 truncate font-mono text-[8px] text-white/30">{status}</div>
            </div>
            {index < 2 && <ArrowUpRight className="h-3 w-3 shrink-0 text-white/25" />}
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 rounded-full bg-white/[0.07]">
        <div className="h-full w-[68%] rounded-full bg-white/55" />
      </div>
    </div>
  );
}

function ReviewPanel() {
  return (
    <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">Review queue</div>
          <div className="mt-1 text-xs font-medium text-white/75">Decisions in context</div>
        </div>
        <span className="font-mono text-[8px] text-white/30">03 ITEMS</span>
      </div>
      <div className="mt-4 space-y-2">
        {(
          [
            ["Navigation audit", "Ready to approve", true],
            ["Content handoff", "Needs one note", false],
            ["Launch checklist", "Assigned to you", false],
          ] as const
        ).map(([label, status, complete]) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] px-2.5 py-2"
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${complete ? "bg-white text-black" : "border border-white/20 text-white/20"}`}
            >
              {complete ? (
                <Check className="h-2.5 w-2.5" />
              ) : (
                <Circle className="h-1.5 w-1.5 fill-current" />
              )}
            </span>
            <span className="min-w-0 flex-1 truncate text-[9px] text-white/70">{label}</span>
            <span className="shrink-0 text-[8px] text-white/30">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchPanel() {
  return (
    <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 sm:p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">Release window</div>
          <div className="mt-1 text-xs font-medium text-white/75">Thursday / 09:40</div>
        </div>
        <LockKeyhole className="h-3.5 w-3.5 text-white/35" />
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-2.5">
        <div className="flex items-center justify-between text-[9px] text-white/55">
          <span>Launch confidence</span>
          <span className="text-white/80">94%</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-white/[0.07]">
          <div className="h-full w-[94%] rounded-full bg-[#c6d478]" />
        </div>
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2 text-[9px] font-medium text-white/80 transition-colors hover:bg-white/[0.14]">
        <Play className="h-3 w-3 fill-current" /> Open release view
      </button>
    </div>
  );
}

function ProductWorkspace({
  activeStep,
  reducedMotion,
}: {
  activeStep: number;
  reducedMotion: boolean;
}) {
  const panels = [
    { id: "overview", content: <OverviewPanel /> },
    { id: "automations", content: <AutomationPanel /> },
    { id: "review", content: <ReviewPanel /> },
    { id: "launch", content: <LaunchPanel /> },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#101012]/95 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
            focus / workspace
          </span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c6d478]" /> Live view
        </div>
      </div>

      <div className="grid min-h-[300px] grid-cols-[62px_minmax(0,1fr)] sm:grid-cols-[92px_minmax(0,1fr)]">
        <aside className="border-r border-white/[0.07] bg-black/10 p-2.5 sm:p-3.5">
          <div className="mb-7 flex items-center gap-1.5 px-1 text-[9px] font-semibold text-white/65">
            <Sparkles className="h-3 w-3 text-white/70" />
            <span className="hidden sm:inline">Komorebi</span>
          </div>
          <div className="space-y-1">
            {tourSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`relative flex items-center gap-2 rounded-md px-2 py-2 text-[9px] transition-colors duration-300 ${activeStep === index ? "text-white" : "text-white/30"}`}
                >
                  {activeStep === index && (
                    <motion.div
                      layoutId="focus-tour-sidebar-pill"
                      className="absolute inset-0 rounded-md bg-white/[0.09] z-0"
                      transition={spring}
                    />
                  )}
                  <div className="relative z-10 flex w-full min-w-0 items-center gap-2">
                    <Icon className="h-3 w-3 shrink-0" />
                    <span className="hidden truncate sm:inline">{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 hidden space-y-2 sm:block">
            <div className="h-1.5 w-12 rounded-full bg-white/[0.06]" />
            <div className="h-1.5 w-8 rounded-full bg-white/[0.06]" />
          </div>
        </aside>

        <div className="min-w-0 p-3.5 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                Product tour / live workspace
              </div>
              <div className="mt-1 text-sm font-medium tracking-tight text-white/85">
                Everything in its place
              </div>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 px-2 py-1 font-mono text-[8px] text-white/35 sm:flex">
              <LockKeyhole className="h-2.5 w-2.5" /> private
            </span>
          </div>

          <div className="relative grid min-h-[310px] grid-cols-2 gap-2.5 sm:min-h-[340px] sm:gap-3 overflow-hidden rounded-xl">
            {panels.map(({ id, content }, index) => (
              <div key={id} className="relative min-h-0">
                {content}
                {activeStep === index && (
                  <motion.div
                    layoutId="focus-tour-spotlight"
                    transition={reducedMotion ? { duration: 0.12 } : spring}
                    className="pointer-events-none absolute inset-0 z-20 rounded-xl border border-white/75 bg-white/[0.015] shadow-[0_0_0_999px_rgba(9,9,11,0.56),0_0_24px_rgba(255,255,255,0.06)]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FocusTourShowcaseElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentStep = tourSteps[activeStep];
  const reducedMotion = Boolean(prefersReducedMotion);

  const handleStepChange = (nextStep: number) => {
    if (nextStep === activeStep) return;
    setDirection(nextStep > activeStep ? 1 : -1);
    setActiveStep(nextStep);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#09090b] text-white">
      <div
        className="flex h-full min-h-[500px] w-full items-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12"
        style={{ height: previewMode === "fullscreen" ? "100dvh" : "500px" }}
      >
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(230px,0.32fr)_minmax(0,1fr)] lg:gap-12">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />
          <div className="relative z-10 min-h-[170px]">
            <div className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Guided product tour
            </div>
            <div className="relative min-h-[152px] max-w-[300px] sm:min-h-[164px]">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentStep.id}
                  custom={direction}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction * 18, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction * -18, filter: "blur(4px)" }
                  }
                  transition={reducedMotion ? { duration: 0.12 } : spring}
                  className="absolute inset-0"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                    {currentStep.eyebrow}
                  </div>
                  <h1 className="mt-2 text-3xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
                    {currentStep.title}
                  </h1>
                  <p className="mt-3 max-w-[270px] text-xs leading-relaxed text-white/45">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="mt-7 flex items-center gap-1.5 overflow-x-auto scrollbar-none pr-4"
              role="tablist"
              aria-label="Product tour steps"
            >
              {tourSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <div key={step.id} className="flex shrink-0 items-center gap-1.5">
                    <motion.button
                      layout
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show ${step.label}`}
                      onClick={() => handleStepChange(index)}
                      transition={reducedMotion ? { duration: 0.12 } : spring}
                      className={`group relative flex h-8 items-center justify-center rounded-full border transition-colors shrink-0 ${
                        isActive
                          ? "border-white/30 text-white px-3 w-auto"
                          : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/75 w-8 p-0"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="focus-tour-active-step"
                          transition={reducedMotion ? { duration: 0.12 } : spring}
                          className="absolute inset-0 rounded-full bg-white/[0.08]"
                        />
                      )}
                      <motion.span
                        layout="position"
                        className="relative z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center"
                        transition={reducedMotion ? { duration: 0.12 } : spring}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </motion.span>
                      <span
                        className={`relative z-10 overflow-hidden whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.12em] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          isActive
                            ? "opacity-100 max-w-[100px] ml-1.5"
                            : "opacity-0 max-w-0 ml-0"
                        }`}
                      >
                        {step.label}
                      </span>
                    </motion.button>
                    {index < tourSteps.length - 1 && (
                      <span className="h-px w-2 shrink-0 bg-white/10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 min-w-0">
            <ProductWorkspace activeStep={activeStep} reducedMotion={reducedMotion} />
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={`annotation-${currentStep.id}`}
                custom={direction}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, x: direction * 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, x: direction * -10 }}
                transition={reducedMotion ? { duration: 0.12 } : spring}
                className="mt-3 flex items-center justify-between gap-3 px-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30"
              >
                <span>Spotlight / {currentStep.label}</span>
                <span>0{activeStep + 1} / 04</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
