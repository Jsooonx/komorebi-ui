import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface OliverParallaxElementProps {
  minimal?: boolean;
  previewMode?: "catalog" | "fullscreen";
}

export default function OliverParallaxElement({
  previewMode = "fullscreen",
}: OliverParallaxElementProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Intro Panel Wipe Y translation (slides up to hide)
  const introY = useTransform(smoothProgress, [0, 0.18], ["0%", "-100%"]);

  // 2. Outro Panel Wipe Y translation (slides up to cover)
  const outroY = useTransform(smoothProgress, [0.82, 0.98], ["100%", "0%"]);

  // 3. Staggered vertical translations for the 3 image columns
  const col1Y = useTransform(smoothProgress, [0.12, 0.88], ["0%", "-38%"]);
  const col2Y = useTransform(smoothProgress, [0.12, 0.88], ["-38%", "5%"]);
  const col3Y = useTransform(smoothProgress, [0.12, 0.88], ["-5%", "-42%"]);

  // Group of images
  const col1Images = [
    "/assets/shared/editorial/pinterest/unraveling.jpg",
    "/assets/shared/editorial/pinterest/shattered.jpg",
    "/assets/shared/editorial/pinterest/fightclub.jpg",
  ];

  const col2Images = [
    "/assets/shared/editorial/pinterest/mountain2.jpg",
    "/assets/shared/editorial/pinterest/random1.jpg",
    "/assets/shared/editorial/pinterest/sunset.jpg",
  ];

  const col3Images = [
    "/assets/shared/editorial/pinterest/hestia.jpg",
    "/assets/shared/editorial/pinterest/dune.jpg",
    "/assets/shared/editorial/pinterest/soul.jpg",
  ];

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full overflow-y-auto bg-[#09090b] scrollbar-none select-none"
    >
      {/* Scrollable canvas length */}
      <div
        className="relative w-full"
        style={{ height: previewMode === "fullscreen" ? "500dvh" : "400%" }}
      >
        {/* Sticky viewport window */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: previewMode === "fullscreen" ? "100dvh" : "500px" }}
        >
          {/* LAYER 1: Intro Panel (Off-white) */}
          {/* LAYER 1: Intro Panel (Off-white) */}
          <motion.div
            style={{ y: introY }}
            className="absolute inset-0 z-30 bg-[#f2f0e9] text-[#111111] flex items-center justify-center p-6 sm:p-12 font-sans border-b border-black/5"
          >
            {/* Centered Serif Titles */}
            <div className="text-center space-y-3 sm:space-y-4">
              <h1 className="font-serif text-4xl sm:text-7xl font-light tracking-tight text-neutral-900 leading-none">
                OLIVER PARALLAX
              </h1>
              <div className="w-16 h-[1px] bg-neutral-900 mx-auto" />
              <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                Scroll down to uncover gallery
              </p>
            </div>
          </motion.div>

          {/* LAYER 2: Parallax Columns Gallery (Dark Theme) */}
          <div className="absolute inset-0 z-10 bg-[#09090b] flex items-center justify-center overflow-hidden">
            {/* The 3-column container */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-5xl h-full px-4 sm:px-8 py-10 relative">
              {/* Column 1 */}
              <motion.div
                style={{ y: col1Y }}
                className="flex flex-col gap-3 sm:gap-6 w-full h-fit"
              >
                {col1Images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-[2/3] sm:aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 shadow-2xl bg-neutral-950"
                  >
                    <img
                      src={src}
                      alt={`col1-${idx}`}
                      className="w-full h-full object-cover pointer-events-none select-none brightness-[0.8] hover:brightness-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div
                style={{ y: col2Y }}
                className="flex flex-col gap-3 sm:gap-6 w-full h-fit"
              >
                {col2Images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-[2/3] sm:aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 shadow-2xl bg-neutral-950"
                  >
                    <img
                      src={src}
                      alt={`col2-${idx}`}
                      className="w-full h-full object-cover pointer-events-none select-none brightness-[0.8] hover:brightness-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Column 3 */}
              <motion.div
                style={{ y: col3Y }}
                className="flex flex-col gap-3 sm:gap-6 w-full h-fit"
              >
                {col3Images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-[2/3] sm:aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 shadow-2xl bg-neutral-950"
                  >
                    <img
                      src={src}
                      alt={`col3-${idx}`}
                      className="w-full h-full object-cover pointer-events-none select-none brightness-[0.8] hover:brightness-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Vignette Overlay to frame the columns nicely */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] opacity-80" />
            </div>
          </div>

          {/* LAYER 3: Outro Panel (Off-white) */}
          <motion.div
            style={{ y: outroY }}
            className="absolute inset-0 z-20 bg-[#f2f0e9] text-[#111111] flex items-center justify-center p-6 sm:p-12 font-sans border-t border-black/5"
          >
            {/* Outro serif content */}
            <div className="text-center space-y-4">
              <h2 className="font-serif text-3xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-none">
                CURATED ARCHIVE
              </h2>
              <div className="w-12 h-[1px] bg-neutral-900 mx-auto" />
              <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Refined pacing through scroll offsets. Inspired by Olivier Larose.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
