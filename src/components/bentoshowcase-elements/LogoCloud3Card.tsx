import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

// Helper Component: VerticalSlider
// Renders children in an infinite vertical marquee using useAnimationFrame for dynamic speed scaling
interface VerticalSliderProps {
  children: React.ReactNode;
  speed?: number; // duration of one full cycle in seconds
  gap?: number; // gap between items in pixels
  speedOnHover?: number; // duration of one full cycle when hovered (higher = slower)
  direction?: "up" | "down";
}

function VerticalSlider({
  children,
  speed = 25,
  gap = 16,
  speedOnHover = 60,
  direction = "up",
}: VerticalSliderProps) {
  const items = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [halfHeight, setHalfHeight] = useState(0);

  // Measure the height of one loop cycle (exactly half of scrollHeight)
  useEffect(() => {
    if (containerRef.current) {
      setHalfHeight(containerRef.current.scrollHeight / 2);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setHalfHeight(containerRef.current.scrollHeight / 2);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  // Frame-by-frame animation to allow smooth, non-snapping speed change when hovering
  useAnimationFrame((time, delta) => {
    if (!halfHeight) return;

    // Convert duration (seconds per cycle) to velocity (pixels per millisecond)
    const activeDuration = isHovered ? speedOnHover : speed;
    const pixelsPerMs = halfHeight / (activeDuration * 1000);

    const step = pixelsPerMs * delta;
    let nextY = direction === "up" ? y.get() - step : y.get() + step;

    // Wrap around once we've slid past one full cycle
    if (direction === "up") {
      if (nextY <= -halfHeight) {
        nextY = nextY + halfHeight;
      }
    } else {
      if (nextY >= 0) {
        nextY = nextY - halfHeight;
      }
    }
    y.set(nextY);
  });

  return (
    <div
      className="relative h-full overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex flex-col w-full"
        style={{ 
          y, 
          willChange: "transform",
          transform: "translateZ(0)" 
        }}
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
      </motion.div>
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

export default function LogoCloud3Card({ minimal = false }: { minimal?: boolean }) {
  // Brand listings split into two columns of 5 brands each
  const col1Brands = [
    { name: "Vercel", path: "/logos/vercel.com-logo.webp" },
    { name: "Supabase", path: "/logos/supabase.com-logo.webp" },
    { name: "Stripe", path: "/logos/stripe.com-logo.webp" },
    { name: "Claude", path: "/logos/claude.com-logo.webp" },
    { name: "Figma", domain: "figma.com" },
  ];

  const col2Brands = [
    { name: "Spotify", path: "/logos/spotify.com-logo.webp" },
    { name: "Slack", domain: "slack.com" },
    { name: "Hulu", path: "/logos/hulu.jp-logo.webp" },
    { name: "Netflix", path: "/logos/netflix.com-logo.webp" },
    { name: "Cisco", path: "/logos/cisco.com-logo.webp" },
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
          <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white tracking-normal">
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
            <VerticalSlider speed={22} speedOnHover={60} direction="up" gap={12}>
              {col1Brands.map((brand, idx) => {
                const imgSrc = brand.path
                  ? brand.path
                  : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 w-full hover:bg-white/[0.05] hover:border-white/10 transition-all select-none cursor-pointer"
                  >
                    <img
                      src={imgSrc}
                      alt={brand.name}
                      className={`h-5 w-auto object-contain rounded opacity-85 transition-all duration-300 shrink-0 select-none ${
                        brand.name === "Vercel" || brand.name === "Supabase" ? "h-4" : ""
                      }`}
                    />
                    <span className="font-heading text-xs font-semibold text-white/55 transition-colors tracking-wide select-none">
                      {brand.name}
                    </span>
                  </div>
                );
              })}
            </VerticalSlider>
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="flex-1 h-full overflow-hidden">
            <VerticalSlider speed={26} speedOnHover={65} direction="down" gap={12}>
              {col2Brands.map((brand, idx) => {
                const imgSrc = brand.path
                  ? brand.path
                  : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 w-full hover:bg-white/[0.05] hover:border-white/10 transition-all select-none cursor-pointer"
                  >
                    <img
                      src={imgSrc}
                      alt={brand.name}
                      className={`h-5 w-auto object-contain rounded opacity-85 transition-all duration-300 shrink-0 select-none ${
                        brand.name === "Vercel" || brand.name === "Supabase" ? "h-4" : ""
                      }`}
                    />
                    <span className="font-heading text-xs font-semibold text-white/55 transition-colors tracking-wide select-none">
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
