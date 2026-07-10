import React from "react";
import { Cpu, Fingerprint, PenLine, SlidersHorizontal, Sparkles, Zap } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Zap className="h-4 w-4 stroke-[1.5]" />,
    title: "Fluid Motion",
    description:
      "Create responsive experiences with animation that feels natural from the first interaction.",
  },
  {
    icon: <Cpu className="h-4 w-4 stroke-[1.5]" />,
    title: "Composable",
    description:
      "Combine focused primitives into distinctive interfaces without unnecessary overhead.",
  },
  {
    icon: <Fingerprint className="h-4 w-4 stroke-[1.5]" />,
    title: "Reliable",
    description: "Build with deliberate states and dependable behavior across every viewport.",
  },
  {
    icon: <PenLine className="h-4 w-4 stroke-[1.5]" />,
    title: "Your Visual Language",
    description: "Tune the details until every component feels native to your product and brand.",
  },
  {
    icon: <SlidersHorizontal className="h-4 w-4 stroke-[1.5]" />,
    title: "Developer Control",
    description: "Adjust timing, structure, and interaction logic directly in clean React code.",
  },
  {
    icon: <Sparkles className="h-4 w-4 stroke-[1.5]" />,
    title: "Ready to Ship",
    description:
      "Start from a considered foundation and move from prototype to production with confidence.",
  },
];

function FeatureCell({ icon, title, description }: FeatureItem) {
  return (
    <div className="group flex min-h-[142px] flex-col justify-center px-6 py-8 text-left transition-colors duration-300 hover:bg-white/[0.02] sm:px-8">
      <div className="flex items-center gap-2.5 text-white/90">
        <span className="text-white/85">{icon}</span>
        <h4 className="text-xs font-medium tracking-tight text-white/90 sm:text-sm">{title}</h4>
      </div>
      <p className="mt-3 max-w-[230px] text-xs leading-relaxed text-white/55 sm:text-sm">
        {description}
      </p>
    </div>
  );
}

export default function Features3Card({ minimal = false }: { minimal?: boolean }) {
  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-14 text-center md:py-20">
      <header className="max-w-4xl">
        <h3 className="text-3xl font-sans font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Motion that gives your product
          <br className="hidden sm:block" /> a distinct point of view
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-white/60 sm:text-sm">
          A focused collection of expressive building blocks for teams who care about how their
          interfaces feel, not only how they function.
        </p>
      </header>

      <div className="mt-16 grid w-full max-w-5xl grid-cols-1 overflow-hidden border border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCell key={feature.title} {...feature} />
        ))}
      </div>
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
      className="relative h-[650px] w-full overflow-y-auto rounded-lg border border-white/5 bg-[#09090b] scrollbar-none"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
