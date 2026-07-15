import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

function CornerMark({ className }: { className: string }) {
  return (
    <span className={`pointer-events-none absolute h-2.5 w-2.5 border-white/80 ${className}`} />
  );
}

function SienaScene({ previewMode }: { previewMode: "catalog" | "fullscreen" }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 118,
    damping: 30,
    mass: 0.25,
  });
  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;
  const frameTransform = useTransform(
    progress,
    [0, 0.25, 0.58, 0.82, 1],
    prefersReducedMotion
      ? Array(5).fill("translate3d(0, 0, 0) scale3d(1, 1, 1)")
      : previewMode === "fullscreen"
        ? [
            "translate3d(0, 0, 0) scale3d(1, 1, 1)",
            "translate3d(0, 32%, 0) scale3d(0.82, 0.78, 1)",
            "translate3d(0, 36%, 0) scale3d(0.82, 0.78, 1)",
            "translate3d(0, -68%, 0) scale3d(0.82, 0.78, 1)",
            "translate3d(0, -84%, 0) scale3d(0.82, 0.78, 1)",
          ]
        : [
            "translate3d(0, 0, 0) scale3d(1, 1, 1)",
            "translate3d(0, 42%, 0) scale3d(0.82, 0.92, 1)",
            "translate3d(0, 47%, 0) scale3d(0.82, 0.92, 1)",
            "translate3d(0, -89%, 0) scale3d(0.82, 0.92, 1)",
            "translate3d(0, -111%, 0) scale3d(0.82, 0.92, 1)",
          ],
  );
  const imageClip = useTransform(
    progress,
    [0, 0.25, 1],
    prefersReducedMotion
      ? ["inset(0 round 0px)", "inset(0 round 0px)", "inset(0 round 0px)"]
      : ["inset(0 round 0px)", "inset(0 round 20px)", "inset(0 round 20px)"],
  );
  const imageTransform = useTransform(
    progress,
    [0, 0.25],
    prefersReducedMotion ? ["scale(1)", "scale(1)"] : ["scale(1.04)", "scale(1)"],
  );
  const playOpacity = useTransform(progress, [0.18, 0.33, 0.7, 0.82], [0, 1, 1, 0]);
  const openingOpacity = useTransform(progress, [0, 0.23, 0.42], [1, 1, 0]);
  const openingY = useTransform(
    progress,
    [0, 0.23, 0.42],
    prefersReducedMotion ? [0, 0, 0] : [0, 0, -72],
  );
  const closingOpacity = useTransform(progress, [0.36, 0.58, 0.82], [0, 0.45, 1]);
  const closingY = useTransform(
    progress,
    [0.36, 0.58, 0.82],
    prefersReducedMotion ? [0, 0, 0] : [100, 30, 0],
  );
  const linksOpacity = useTransform(progress, [0.62, 0.82, 1], [0, 0.5, 1]);

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full overflow-y-auto bg-[#f2f0e9] text-[#111111] scrollbar-none"
    >
      <div
        className={`relative min-h-full ${previewMode === "fullscreen" ? "h-[150dvh]" : "h-[1480px]"}`}
      >
        <div
          className={`sticky top-0 overflow-hidden ${
            previewMode === "fullscreen" ? "h-dvh min-h-[620px]" : "h-[500px]"
          }`}
        >
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-[9px] font-medium uppercase tracking-[0.18em] sm:px-8">
            <span className="rounded-full bg-[#111111] px-2 py-1 text-[#f2f0e9]">Siena / 01</span>
            <span className="text-black/45">Scroll to explore</span>
          </div>

          <div
            className={`absolute inset-x-0 top-0 z-10 flex justify-center ${previewMode === "fullscreen" ? "h-1/2" : "h-[38%]"}`}
          >
            <motion.div
              className="h-full w-full overflow-hidden bg-black shadow-[0_24px_60px_rgba(0,0,0,0.2)] will-change-transform"
              style={{
                transform: frameTransform,
                clipPath: imageClip,
                transformOrigin: "top center",
              }}
            >
              <motion.img
                src="/assets/blocks/parallax/siena/editorial.png"
                alt="Monochrome editorial portrait"
                className="h-full w-full object-cover object-[58%_center]"
                style={{ transform: imageTransform }}
              />
              <motion.div
                style={{ opacity: playOpacity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2 text-center text-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg sm:h-14 sm:w-14">
                    <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-black" />
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/80">
                    Watch the story
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: openingOpacity, y: openingY }}
            className={`absolute inset-x-0 z-20 flex -translate-y-1/2 flex-col items-center px-6 text-center ${
              previewMode === "fullscreen" ? "top-[64%]" : "top-[56%]"
            }`}
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-black/45">
              Field notes / 2026
            </span>
            <h1 className="font-serif font-light mt-4 max-w-3xl text-4xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              Make space for the work that matters.
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: closingOpacity, y: closingY }}
            className={`absolute inset-x-0 z-20 flex -translate-y-1/2 flex-col items-center px-6 text-center ${
              previewMode === "fullscreen" ? "top-1/2" : "top-[56%]"
            }`}
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-black/45">
              A quieter operating system
            </span>
            <h2 className="font-serif font-light mt-5 max-w-2xl text-4xl leading-[0.94] tracking-tight sm:text-6xl">
              Build with more intention.
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: linksOpacity }}
            className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-black/40"
          >
            <span>Index</span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              <span>Work</span>
              <span>About</span>
              <span>Contact</span>
              <span>Archive</span>
            </div>
          </motion.div>

          <CornerMark className="left-4 top-4 border-l border-t sm:left-6 sm:top-6" />
          <CornerMark className="right-4 top-4 border-r border-t sm:right-6 sm:top-6" />
          <CornerMark className="bottom-4 left-4 border-b border-l sm:bottom-6 sm:left-6" />
          <CornerMark className="bottom-4 right-4 border-b border-r sm:bottom-6 sm:right-6" />
        </div>
      </div>
    </div>
  );
}

export default function SienaParallaxCard({
  minimal = false,
  previewMode = "catalog",
}: {
  minimal?: boolean;
  previewMode?: "catalog" | "fullscreen";
}) {
  return (
    <div
      className={`${minimal ? "h-full" : "h-[720px]"} relative w-full overflow-hidden border border-white/5 bg-[#f2f0e9]`}
    >
      <SienaScene previewMode={previewMode} />
    </div>
  );
}
