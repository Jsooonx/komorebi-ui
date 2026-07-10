import React from "react";
import { CalendarClock, GitBranch, Layers3, Sparkles } from "lucide-react";

interface FeaturePill {
  icon: React.ReactNode;
  label: string;
}

const featurePills: FeaturePill[] = [
  { icon: <Layers3 className="h-4 w-4 stroke-[1.5]" />, label: "Compose" },
  { icon: <GitBranch className="h-4 w-4 stroke-[1.5]" />, label: "Connect" },
  { icon: <CalendarClock className="h-4 w-4 stroke-[1.5]" />, label: "Orchestrate" },
  { icon: <Sparkles className="h-4 w-4 stroke-[1.5]" />, label: "Refine" },
];

function FeatureVisualCard({
  eyebrow,
  title,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="group overflow-hidden border border-white/[0.08] bg-[#0b0b0d] transition-colors duration-300 hover:border-white/20">
      <div className="px-6 pb-5 pt-7 sm:px-8">
        <div className="flex items-center gap-2 text-xs text-white/50 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BECB6D] transition-transform duration-300 group-hover:scale-125" />
          {eyebrow}
        </div>
        <h4 className="mt-8 max-w-md text-xl font-sans font-semibold leading-tight tracking-tight text-white sm:text-2xl">
          {title}
        </h4>
      </div>
      <div className="overflow-hidden border-t border-white/[0.06] bg-[#09090b]">
        <img
          src={image}
          alt={alt}
          className="block aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
    </article>
  );
}

export default function Features5Card({ minimal = false }: { minimal?: boolean }) {
  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-12 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FeatureVisualCard
          eyebrow="Operational clarity"
          title="Keep every moving part visible, from signal to shipped outcome."
          image="/features5-operations-dashboard.png"
          alt="Dark SaaS operations dashboard with charts and data rows"
        />
        <FeatureVisualCard
          eyebrow="Intentional rhythm"
          title="Turn scattered plans into a schedule your team can trust."
          image="/features5-scheduling-dashboard.png"
          alt="Dark SaaS scheduling calendar dashboard with selected time slot"
        />
      </div>

      <section className="border border-white/[0.08] bg-[#0b0b0d] px-6 py-10 text-center sm:px-8">
        <h3 className="mx-auto max-w-xl text-2xl font-sans font-semibold leading-tight tracking-tight text-white sm:text-3xl">
          Turn complexity into a calmer way to build.
        </h3>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {featurePills.map(({ icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:text-sm"
            >
              <span className="text-white/60 transition-colors duration-300 group-hover:text-[#E8A969]">
                {icon}
              </span>
              {label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="relative h-full w-full overflow-y-auto bg-[#09090b] scrollbar-none"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative h-[720px] w-full overflow-y-auto border border-white/5 bg-[#09090b] scrollbar-none"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
