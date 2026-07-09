import React from "react";
import { Zap, SlidersHorizontal, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#0b0b0d] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden w-full h-full select-none">
      {/* Dynamic Grid Background with fade-out radial mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at center, black 25%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 25%, transparent 65%)',
        }} 
      />

      {/* Grid Center Icon Container */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-2 shrink-0">
        <div className="w-10 h-10 rounded-lg border border-white/10 bg-[#09090b]/80 backdrop-blur flex items-center justify-center relative z-10 shadow-sm group-hover:border-white/20 group-hover:shadow-md transition-all duration-300">
          {icon}
        </div>
      </div>

      {/* Text Contents */}
      <h4 className="text-base sm:text-lg font-sans font-semibold text-white/90 tracking-tight transition-colors group-hover:text-white duration-300 shrink-0">
        {title}
      </h4>
      
      <p className="text-xs sm:text-sm text-white/45 mt-3 font-sans leading-relaxed max-w-[270px] select-text">
        {description}
      </p>
    </div>
  );
}

export default function Features1Card({ minimal = false }: { minimal?: boolean }) {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-white/80 stroke-[1.5]" />,
      title: "Customizable",
      description: "Extensive customization options, allowing you to tailor every aspect to meet your specific needs."
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-white/80 stroke-[1.5]" />,
      title: "You have full control",
      description: "From design elements to functionality, you have complete control to create a unique and personalized experience."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-white/80 stroke-[1.5]" />,
      title: "Powered By AI",
      description: "Elements to functionality, you have complete control to create a unique experience."
    }
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full max-w-6xl mx-auto px-6 py-10 md:py-16 select-none flex flex-col justify-center items-center h-full">
      {/* Block Header */}
      <div className="text-center mb-10 md:mb-14 shrink-0">
        <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white tracking-tight">
          Built to cover your needs
        </h3>
        <p className="text-xs sm:text-sm text-white/45 mt-3 font-sans max-w-md mx-auto leading-relaxed select-text">
          Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.
        </p>
      </div>

      {/* Features Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {features.map((feat, idx) => (
          <FeatureCard 
            key={idx}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#09090b] flex items-center justify-center"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[500px] rounded-lg bg-[#09090b] border border-white/5 overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center select-none group scrollbar-none"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
