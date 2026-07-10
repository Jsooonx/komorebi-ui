import React from "react";
import { Activity, Blocks, Bot, ShieldCheck } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Activity className="h-4 w-4 stroke-[1.5]" />,
    title: "Live Signals",
    description: "See product movement clearly with focused metrics and calm visual feedback.",
  },
  {
    icon: <Blocks className="h-4 w-4 stroke-[1.5]" />,
    title: "Composable Systems",
    description: "Connect small primitives into a coherent interface that can grow with your team.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 stroke-[1.5]" />,
    title: "Built with Care",
    description: "Keep interaction details reliable, accessible, and ready for real-world use.",
  },
  {
    icon: <Bot className="h-4 w-4 stroke-[1.5]" />,
    title: "AI-Ready Workflows",
    description: "Give generated product surfaces a strong visual foundation from the start.",
  },
];

function FeatureItemRow({ icon, title, description }: FeatureItem) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <div className="flex items-center gap-2.5 text-white/90">
        <span className="text-white/80">{icon}</span>
        <h4 className="text-xs font-medium tracking-tight text-white/90 sm:text-sm">{title}</h4>
      </div>
      <p className="max-w-[220px] text-xs leading-relaxed text-white/50 sm:text-sm">
        {description}
      </p>
    </div>
  );
}

export default function Features4Card({ minimal = false }: { minimal?: boolean }) {
  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-14 md:px-10 md:py-20">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-16">
        <h3 className="max-w-xl text-3xl font-sans font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          A clearer workspace for moving ideas forward
        </h3>
        <p className="max-w-lg text-xs leading-relaxed text-white/60 sm:text-sm">
          Bring your product signals, creative workflows, and AI-assisted building blocks into one
          focused space designed for steady momentum.
        </p>
      </div>

      <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0d] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <img
          src="/features4-saas-dashboard.png"
          alt="Abstract dark SaaS dashboard workspace"
          className="block h-auto w-full object-cover"
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {features.map((feature) => (
          <FeatureItemRow key={feature.title} {...feature} />
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
      className="relative h-[720px] w-full overflow-y-auto rounded-lg border border-white/5 bg-[#09090b] scrollbar-none"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
