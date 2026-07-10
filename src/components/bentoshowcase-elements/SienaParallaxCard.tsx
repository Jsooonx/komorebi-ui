import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function CornerMark({ className }: { className: string }) {
  return (
    <span className={`pointer-events-none absolute h-2.5 w-2.5 border-white/80 ${className}`} />
  );
}

function SienaScene() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const imageTop = useTransform(
    progress,
    [0, 0.25, 0.58, 0.82, 1],
    ["0%", "16%", "18%", "-34%", "-42%"],
  );
  const imageWidth = useTransform(
    progress,
    [0, 0.25, 0.58, 0.82, 1],
    ["100%", "82%", "82%", "82%", "82%"],
  );
  const imageHeight = useTransform(
    progress,
    [0, 0.25, 0.58, 0.82, 1],
    ["50%", "39%", "39%", "39%", "39%"],
  );
  const imageRadius = useTransform(
    progress,
    [0, 0.25, 0.58, 0.82, 1],
    ["0px", "20px", "20px", "20px", "20px"],
  );
  const imageScale = useTransform(progress, [0, 0.25, 0.58, 0.82, 1], ["1.04", "1", "1", "1", "1"]);
  const playOpacity = useTransform(progress, [0.18, 0.33, 0.7, 0.82], [0, 1, 1, 0]);
  const openingOpacity = useTransform(progress, [0, 0.23, 0.42], [1, 1, 0]);
  const openingY = useTransform(progress, [0, 0.23, 0.42], [0, 0, -72]);
  const closingOpacity = useTransform(progress, [0.36, 0.58, 0.82], [0, 0.45, 1]);
  const closingY = useTransform(progress, [0.36, 0.58, 0.82], [100, 30, 0]);
  const linksOpacity = useTransform(progress, [0.62, 0.82, 1], [0, 0.5, 1]);

  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full overflow-y-auto bg-[#f2f0e9] text-[#111111] scrollbar-none"
    >
      <div className="relative h-[1480px] min-h-full">
        <div className="sticky top-0 h-[720px] min-h-[620px] overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-[9px] font-medium uppercase tracking-[0.18em] sm:px-8">
            <span className="rounded-full bg-[#111111] px-2 py-1 text-[#f2f0e9]">Siena / 01</span>
            <span className="text-black/45">Scroll to explore</span>
          </div>

          <motion.div
            className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-black shadow-[0_24px_60px_rgba(0,0,0,0.2)] will-change-[top,width,height,border-radius]"
            style={{
              top: imageTop,
              width: imageWidth,
              height: imageHeight,
              borderRadius: imageRadius,
            }}
          >
            <motion.img
              src="/siena-parallax-editorial.png"
              alt="Monochrome editorial portrait"
              className="h-full w-full object-cover object-[58%_center]"
              style={{ scale: imageScale }}
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

          <motion.div
            style={{ opacity: openingOpacity, y: openingY }}
            className="absolute inset-x-0 top-[64%] z-20 flex -translate-y-1/2 flex-col items-center px-6 text-center"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-black/45">
              Field notes / 2026
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-6xl md:text-7xl">
              Make space for the work that matters.
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: closingOpacity, y: closingY }}
            className="absolute inset-x-0 top-[64%] z-20 flex -translate-y-1/2 flex-col items-center px-6 text-center"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-black/45">
              A quieter operating system
            </span>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-6xl">
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

export default function SienaParallaxCard({ minimal = false }: { minimal?: boolean }) {
  return (
    <div
      className={`${minimal ? "h-full" : "h-[720px]"} relative w-full overflow-hidden border border-white/5 bg-[#f2f0e9]`}
    >
      <SienaScene />
    </div>
  );
}
