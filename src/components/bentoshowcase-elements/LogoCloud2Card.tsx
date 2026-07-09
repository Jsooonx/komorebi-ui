import React from "react";

// Helper Component: InfiniteSlider
// Renders children in an infinite horizontal marquee using pure CSS animations for hardware-accelerated smoothness
interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number; // duration of one full cycle in seconds
  gap?: number; // gap between items in pixels
}

function InfiniteSlider({ children, speed = 35, gap = 56 }: InfiniteSliderProps) {
  const items = React.Children.toArray(children);

  return (
    <div className="relative w-full overflow-hidden flex w-full">
      <div 
        className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer"
        style={{ 
          animationDuration: `${speed}s`,
          willChange: "transform" 
        }}
      >
        {/* First Set */}
        {items.map((child, idx) => (
          <div 
            key={`first-${idx}`} 
            className="flex items-center shrink-0"
            style={{ paddingRight: `${gap}px` }}
          >
            {child}
          </div>
        ))}
        {/* Second Set (identical duplicate for seamless transition) */}
        {items.map((child, idx) => (
          <div 
            key={`second-${idx}`} 
            className="flex items-center shrink-0"
            style={{ paddingRight: `${gap}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper Component: ProgressiveBlur
// Creates a multi-layered backdrop blur effect to achieve organic progressive blur edges
interface ProgressiveBlurProps {
  className?: string;
  direction: "left" | "right";
  blurIntensity?: number;
}

function ProgressiveBlur({ className = "", direction }: ProgressiveBlurProps) {
  const isLeft = direction === "left";
  
  return (
    <div 
      className={`absolute inset-y-0 w-24 pointer-events-none z-20 ${className}`}
      style={{
        left: isLeft ? 0 : "auto",
        right: !isLeft ? 0 : "auto",
        background: `linear-gradient(to ${isLeft ? "right" : "left"}, #09090b, transparent)`,
      }}
    />
  );
}

export default function LogoCloud2Card({ minimal = false }: { minimal?: boolean }) {
  const brands = [
    { name: "Vercel", path: "/logos/vercel.com-logo.webp" },
    { name: "Supabase", path: "/logos/supabase.com-logo.webp" },
    { name: "Stripe", path: "/logos/stripe.com-logo.webp" },
    { name: "Claude", path: "/logos/claude.com-logo.webp" },
    { name: "Figma", domain: "figma.com" },
    { name: "Spotify", path: "/logos/spotify.com-logo.webp" },
    { name: "Slack", domain: "slack.com" },
    { name: "Hulu", path: "/logos/hulu.jp-logo.webp" },
    { name: "Netflix", path: "/logos/netflix.com-logo.webp" },
    { name: "Cisco", path: "/logos/cisco.com-logo.webp" }
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full overflow-hidden py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Caption / Left Label */}
          <div className="md:max-w-44 md:border-r border-white/10 md:pr-8 text-center md:text-right shrink-0">
            <p className="text-sm font-sans font-medium text-white/75 leading-snug">
              Trusted by the best teams
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative py-4 md:w-[calc(100%-13rem)] w-full overflow-hidden">
            <InfiniteSlider speed={35} gap={56}>
              {brands.map((brand, idx) => {
                const imgSrc = brand.path
                  ? brand.path
                  : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group transition-all duration-300 w-fit cursor-pointer select-none"
                  >
                    <img
                      src={imgSrc}
                      alt={brand.name}
                      className={`h-6.5 w-auto object-contain rounded opacity-85 group-hover:opacity-100 transition-all duration-300 shrink-0 select-none ${
                        brand.name === "Vercel" || brand.name === "Supabase" ? "h-5.5" : ""
                      }`}
                    />
                    <span className="font-heading text-sm font-semibold text-white/55 group-hover:text-white transition-colors tracking-wide select-none">
                      {brand.name}
                    </span>
                  </div>
                );
              })}
            </InfiniteSlider>

            {/* Gradient Fades for Progressive Blur Effect */}
            <ProgressiveBlur direction="left" />
            <ProgressiveBlur direction="right" />
          </div>
        </div>
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
      className="relative w-full h-[320px] rounded-lg bg-[#09090b] border border-white/5 overflow-hidden flex flex-col items-center justify-center select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
