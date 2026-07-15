import React from "react";

// Helper Component: VerticalSlider
// Renders children in an infinite vertical marquee using pure CSS animations for hardware-accelerated smoothness
interface VerticalSliderProps {
  children: React.ReactNode;
  gap?: number; // gap between items in pixels
  direction?: "up" | "down";
}

function VerticalSlider({ children, gap = 12, direction = "up" }: VerticalSliderProps) {
  const items = React.Children.toArray(children);
  const marqueeClass = direction === "up" ? "animate-marquee-up" : "animate-marquee-down";

  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full">
      <div
        className={`flex flex-col w-full ${marqueeClass} hover:[animation-play-state:paused] cursor-pointer`}
        style={{ willChange: "transform" }}
      >
        {/* First Set */}
        {items.map((child, idx) => (
          <div
            key={`first-${idx}`}
            className="w-full shrink-0"
            style={{ paddingBottom: `${gap}px` }}
          >
            {child}
          </div>
        ))}
        {/* Second Set (identical duplicate for seamless transition) */}
        {items.map((child, idx) => (
          <div
            key={`second-${idx}`}
            className="w-full shrink-0"
            style={{ paddingBottom: `${gap}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper Component: VerticalProgressiveBlur
// Creates a multi-layered vertical gradient overlay for progressive top/bottom edge blur
function VerticalProgressiveBlur({ direction }: { direction: "top" | "bottom" }) {
  const isTop = direction === "top";

  return (
    <div
      className="absolute left-0 right-0 h-16 pointer-events-none z-20"
      style={{
        top: isTop ? 0 : "auto",
        bottom: !isTop ? 0 : "auto",
        background: `linear-gradient(to ${isTop ? "bottom" : "top"}, #09090b, transparent)`,
      }}
    />
  );
}

export default function LogoCloud3Card({
  minimal = false,
  previewMode = "catalog",
}: {
  minimal?: boolean;
  previewMode?: "catalog" | "fullscreen";
}) {
  // Brand listings split into two columns of 5 brands each
  const col1Brands = [
    { name: "Vercel", path: "/assets/shared/logos/vercel.com-logo.webp" },
    { name: "Supabase", path: "/assets/shared/logos/supabase.com-logo.webp" },
    { name: "Stripe", path: "/assets/shared/logos/stripe.com-logo.webp" },
    { name: "Claude", path: "/assets/shared/logos/claude.com-logo.webp" },
    { name: "Figma", domain: "figma.com" },
  ];

  const col2Brands = [
    { name: "Spotify", path: "/assets/shared/logos/spotify.com-logo.webp" },
    { name: "Slack", domain: "slack.com" },
    { name: "Hulu", path: "/assets/shared/logos/hulu.jp-logo.webp" },
    { name: "Netflix", path: "/assets/shared/logos/netflix.com-logo.webp" },
    { name: "Cisco", path: "/assets/shared/logos/cisco.com-logo.webp" },
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Side: Static Text */}
        <div className="md:col-span-5 text-left">
          <h3 className="font-sans text-3xl sm:text-4xl font-semibold leading-tight text-white tracking-tight">
            Trusted by industry leaders worldwide.
          </h3>
          <p className="text-xs sm:text-sm text-white/50 mt-3 font-sans leading-relaxed">
            Komorebi UI powers product, design, and engineering teams across modern web development.
          </p>
        </div>

        {/* Right Side: Split Vertical Sliders */}
        <div className="md:col-span-7 relative h-[250px] overflow-hidden bg-black/20 rounded-2xl border border-white/5 p-4 flex gap-4 w-full">
          {/* Column 1 (Scrolls Up) */}
          <div className="flex-1 h-full overflow-hidden">
            <VerticalSlider direction="up" gap={12}>
              {col1Brands.map((brand, idx) => {
                const imgSrc = brand.path
                  ? brand.path
                  : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

                return (
                  <div
                    key={idx}
                    className="group/logo flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-white/15 hover:bg-white/[0.06] select-none"
                  >
                    <img
                      src={imgSrc}
                      alt={brand.name}
                      className={`h-5 w-auto shrink-0 select-none rounded object-contain opacity-85 transition-all duration-300 group-hover/logo:opacity-100 ${
                        brand.name === "Vercel" || brand.name === "Supabase" ? "h-4" : ""
                      }`}
                    />
                    <span className="select-none font-heading text-xs font-semibold tracking-wide text-white/55 transition-colors group-hover/logo:text-white">
                      {brand.name}
                    </span>
                  </div>
                );
              })}
            </VerticalSlider>
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="flex-1 h-full overflow-hidden">
            <VerticalSlider direction="down" gap={12}>
              {col2Brands.map((brand, idx) => {
                const imgSrc = brand.path
                  ? brand.path
                  : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

                return (
                  <div
                    key={idx}
                    className="group/logo flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-white/15 hover:bg-white/[0.06] select-none"
                  >
                    <img
                      src={imgSrc}
                      alt={brand.name}
                      className={`h-5 w-auto shrink-0 select-none rounded object-contain opacity-85 transition-all duration-300 group-hover/logo:opacity-100 ${
                        brand.name === "Vercel" || brand.name === "Supabase" ? "h-4" : ""
                      }`}
                    />
                    <span className="select-none font-heading text-xs font-semibold tracking-wide text-white/55 transition-colors group-hover/logo:text-white">
                      {brand.name}
                    </span>
                  </div>
                );
              })}
            </VerticalSlider>
          </div>

          {/* Fades for vertical progressive blur */}
          <VerticalProgressiveBlur direction="top" />
          <VerticalProgressiveBlur direction="bottom" />
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center bg-[#09090b] select-none scrollbar-none ${
          previewMode === "fullscreen" ? "overflow-hidden" : "overflow-y-auto"
        }`}
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
