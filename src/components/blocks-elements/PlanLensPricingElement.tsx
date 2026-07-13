import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PreviewMode = "catalog" | "fullscreen";

type Plan = {
  name: string;
  audience: string;
  price: string;
  summary: string;
  capabilities: string[];
  markerCount: number;
};

const plans: Plan[] = [
  {
    name: "Field",
    audience: "For a focused starting point",
    price: "$18",
    summary: "Give a small team one calm place to see the work that matters next.",
    capabilities: ["3 active spaces", "Shared field notes", "Weekly signal view"],
    markerCount: 3,
  },
  {
    name: "Studio",
    audience: "For teams finding their rhythm",
    price: "$42",
    summary: "Turn moving work into a durable operating picture your team can keep building from.",
    capabilities: ["Unlimited spaces", "Decision trails", "Review rituals"],
    markerCount: 5,
  },
  {
    name: "Scale",
    audience: "For systems that need to travel",
    price: "$86",
    summary: "Keep growing teams aligned as their context, decisions, and delivery surface expand.",
    capabilities: ["Cross-team signals", "Custom operating views", "Priority partnership"],
    markerCount: 7,
  },
];

function CapabilityField({ plan, active }: { plan: Plan; active: boolean }) {
  return (
    <div className="relative mt-4 h-14 overflow-hidden border-y border-white/10 py-3">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <motion.div
        animate={{ opacity: active ? 1 : 0.38, scaleX: active ? 1 : 0.72 }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.55 }}
        className="absolute left-0 right-0 top-1/2 h-px origin-left bg-white/65"
      />
      <div className="relative flex h-full items-center justify-between gap-1.5">
        {Array.from({ length: plan.markerCount }, (_, index) => (
          <motion.span
            key={index}
            animate={{ opacity: active ? 1 : 0.32, y: active ? 0 : index % 2 === 0 ? 4 : -4 }}
            transition={{ delay: active ? index * 0.025 : 0, duration: 0.2 }}
            className="h-2 w-2 rounded-full border border-white/50 bg-[#0a0a0b] shadow-[0_0_0_3px_#0a0a0b]"
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex gap-1">
        {Array.from({ length: plan.markerCount + 1 }, (_, index) => (
          <motion.span
            key={index}
            animate={{ scaleX: active ? 1 : 0.48, opacity: active ? 0.72 : 0.24 }}
            transition={{ delay: active ? index * 0.02 : 0 }}
            className="h-px flex-1 origin-left bg-white/55"
          />
        ))}
      </div>
    </div>
  );
}

export default function PlanLensPricingElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const compact = previewMode === "catalog";

  return (
    <section className="relative flex h-full min-h-[500px] w-full items-center overflow-hidden bg-[#0a0a0b] px-5 py-8 text-white sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
      <div className={`relative mx-auto w-full max-w-6xl ${compact ? "py-0" : "py-5"}`}>
        <header className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Plan lens / 01
            </p>
            <h2
              className={`mt-3 font-sans font-semibold tracking-[-0.045em] ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
            >
              Pick the shape that fits the work.
            </h2>
          </div>
          <p className="hidden max-w-[180px] text-right font-mono text-[9px] uppercase tracking-[0.16em] text-white/28 sm:block">
            Inspect a plan to trace its capacity
          </p>
        </header>

        <div
          onPointerLeave={(event) => {
            if (event.pointerType !== "touch") setActiveIndex(1);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveIndex(1);
          }}
          className="mt-6 flex flex-col gap-3 md:flex-row md:gap-4"
        >
          {plans.map((plan, index) => {
            const active = index === activeIndex;

            return (
              <motion.button
                key={plan.name}
                type="button"
                layout="position"
                aria-pressed={active}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                animate={
                  reducedMotion
                    ? { flexGrow: 1 }
                    : { flexGrow: active ? 1.48 : 0.76, opacity: active ? 1 : 0.62 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.65 }}
                className="group relative h-[160px] flex-1 overflow-hidden border border-white/10 bg-white/[0.018] p-3 text-left outline-none transition-colors hover:border-white/25 focus-visible:border-white/50 md:h-[350px] md:p-4"
              >
                {active && (
                  <motion.div
                    layoutId="plan-lens-active"
                    className="absolute inset-0 border border-white/35 bg-white/[0.045]"
                    transition={{ type: "spring", stiffness: 330, damping: 31, mass: 0.58 }}
                  />
                )}
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                        0{index + 1} / tier
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/44">{plan.audience}</p>
                    </div>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-colors ${active ? "text-white" : "text-white/25"}`}
                    />
                  </div>

                  <div className="mt-4 flex items-baseline gap-1 md:mt-5">
                    <span className="text-3xl font-semibold tracking-[-0.06em]">{plan.price}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                      per month
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        key={`${plan.name}-detail`}
                        initial={
                          reducedMotion ? { opacity: 0 } : { opacity: 0, y: 9, filter: "blur(3px)" }
                        }
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={
                          reducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -6, filter: "blur(2px)" }
                        }
                        transition={{ type: "spring", stiffness: 300, damping: 29, mass: 0.55 }}
                      >
                        <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/64">
                          {plan.summary}
                        </p>
                        <ul className="mt-3 hidden space-y-1.5 md:block">
                          {plan.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="flex items-center gap-2 text-xs text-white/56"
                            >
                              <Check className="h-3 w-3 text-white/70" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto hidden md:block">
                    <CapabilityField plan={plan} active={active} />
                    <span
                      className={`mt-3 inline-flex items-center gap-2 text-xs font-medium transition-colors ${active ? "text-white" : "text-white/38"}`}
                    >
                      Start with {plan.name}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <footer className="mt-5 flex justify-between border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/28">
          <span>Transparent terms, clear next move</span>
          <span className="hidden sm:block">Komorebi / plan lens</span>
        </footer>
      </div>
    </section>
  );
}
