import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type PreviewMode = "catalog" | "fullscreen";

const chapters = [
  {
    index: "01",
    eyebrow: "Field study / north",
    title: "Move toward the signal.",
    copy: "A clear direction begins with the details closest to the work.",
    image: "/references/media/images/editorial_model_velvet.png",
    position: "object-[center_35%]",
  },
  {
    index: "02",
    eyebrow: "Field study / light",
    title: "Keep the frame open.",
    copy: "Make room for the ideas that need a little longer to arrive.",
    image: "/references/media/images/editorial_painting_neon.png",
    position: "object-center",
  },
  {
    index: "03",
    eyebrow: "Field study / structure",
    title: "Build the quiet parts.",
    copy: "The strongest systems are often felt before they are noticed.",
    image: "/references/media/images/editorial_brutalist_architecture.png",
    position: "object-center",
  },
  {
    index: "04",
    eyebrow: "Field study / horizon",
    title: "Leave space to continue.",
    copy: "A useful ending should still invite the next considered step.",
    image: "/references/media/images/editorial_sculpture_horizon.png",
    position: "object-[center_38%]",
  },
] as const;

function Chapter({
  chapter,
  chapterIndex,
  progress,
}: {
  chapter: (typeof chapters)[number];
  chapterIndex: number;
  progress: MotionValue<number>;
}) {
  const focusProgress = 0.18 + chapterIndex * 0.2133;
  const imageScale = useTransform(
    progress,
    [focusProgress - 0.12, focusProgress, focusProgress + 0.12],
    [0.92, 1, 0.95],
  );
  const imageOpacity = useTransform(
    progress,
    [focusProgress - 0.12, focusProgress, focusProgress + 0.12],
    [0.38, 1, 0.62],
  );
  const imageClip = useTransform(
    progress,
    [focusProgress - 0.12, focusProgress, focusProgress + 0.12],
    ["inset(9% 10% 9% 10%)", "inset(0% 0% 0% 0%)", "inset(7% 9% 7% 9%)"],
  );
  const numberX = useTransform(progress, [focusProgress - 0.15, focusProgress + 0.15], ["-7%", "8%"]);
  const copyX = useTransform(progress, [focusProgress - 0.15, focusProgress + 0.15], ["10%", "-6%"]);

  return (
    <section className="relative flex h-full w-1/4 shrink-0 items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      <motion.span
        aria-hidden="true"
        style={{ x: numberX }}
        className="pointer-events-none absolute right-[8%] top-[8%] text-[30vw] font-semibold leading-none tracking-[-0.12em] text-white/[0.045] sm:text-[24vw]"
      >
        {chapter.index}
      </motion.span>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <motion.div
          style={{ x: copyX }}
          className="order-2 max-w-sm space-y-5 text-[#f2f0e9] lg:order-1"
        >
          <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-white/45">
            <span>{chapter.index}</span>
            <span className="h-px w-7 bg-white/25" />
            <span>{chapter.eyebrow}</span>
          </div>
          <h2 className="text-4xl font-semibold leading-[0.92] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
            {chapter.title}
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/55 sm:text-base">
            {chapter.copy}
          </p>
        </motion.div>
        <motion.div
          style={{ clipPath: imageClip, opacity: imageOpacity, scale: imageScale }}
          className="order-1 aspect-[4/5] overflow-hidden bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.35)] lg:order-2 lg:aspect-[16/10]"
        >
          <img
            src={chapter.image}
            alt=""
            className={`h-full w-full select-none object-cover brightness-[0.78] contrast-[1.08] ${chapter.position}`}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/5" />
        </motion.div>
      </div>
    </section>
  );
}

export default function AtlasHorizontalParallaxElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 108, damping: 28, mass: 0.32 });
  const trackX = useTransform(progress, [0.18, 0.82], ["0%", "-75%"]);
  const introY = useTransform(progress, [0, 0.18], ["0%", "-100%"]);
  const outroY = useTransform(progress, [0.82, 0.98], ["100%", "0%"]);
  const progressWidth = useTransform(progress, [0.18, 0.82], ["0%", "100%"]);

  // Color transitions to maintain high contrast as background wipes from off-white to dark and back
  const labelColor = useTransform(
    progress,
    [0, 0.17, 0.18, 0.82, 0.83, 1],
    [
      "rgba(17,17,17,0.45)", 
      "rgba(17,17,17,0.45)", 
      "rgba(255,255,255,0.45)", 
      "rgba(255,255,255,0.45)", 
      "rgba(17,17,17,0.45)", 
      "rgba(17,17,17,0.45)"
    ]
  );

  const progressBgColor = useTransform(
    progress,
    [0, 0.17, 0.18, 0.82, 0.83, 1],
    [
      "rgba(17,17,17,0.1)", 
      "rgba(17,17,17,0.1)", 
      "rgba(255,255,255,0.15)", 
      "rgba(255,255,255,0.15)", 
      "rgba(17,17,17,0.1)", 
      "rgba(17,17,17,0.1)"
    ]
  );

  const progressFillColor = useTransform(
    progress,
    [0, 0.17, 0.18, 0.82, 0.83, 1],
    [
      "#111111", 
      "#111111", 
      "#f2f0e9", 
      "#f2f0e9", 
      "#111111", 
      "#111111"
    ]
  );

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto bg-[#09090b] text-[#f2f0e9] scrollbar-none"
    >
      <div
        className="relative"
        style={{ height: previewMode === "fullscreen" ? "360dvh" : "1520px" }}
      >
        <div 
          className="sticky top-0 overflow-hidden bg-[#09090b]"
          style={{ 
            height: previewMode === "fullscreen" ? "100dvh" : "500px",
            minHeight: previewMode === "fullscreen" ? "520px" : "auto"
          }}
        >
          <motion.div
            style={{ x: trackX }}
            className="absolute inset-y-0 left-0 flex w-[400%] will-change-transform"
          >
            {chapters.map((chapter, index) => (
              <Chapter
                key={chapter.index}
                chapter={chapter}
                chapterIndex={index}
                progress={progress}
              />
            ))}
          </motion.div>
          <motion.div
            style={{ y: introY }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#f2f0e9] px-6 text-[#111111]"
          >
            <div className="max-w-3xl text-center">
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-black/45">
                Atlas / 03
              </span>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-7xl md:text-8xl">
                Follow the work in motion.
              </h1>
              <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-black/50">
                Four small chapters about direction, distance, and deliberate pace.
              </p>
            </div>
          </motion.div>
          <motion.div
            style={{ y: outroY }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f2f0e9] px-6 text-[#111111]"
          >
            <div className="max-w-2xl text-center">
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-black/45">
                End of the atlas
              </span>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-7xl">
                Leave room for what comes next.
              </h2>
            </div>
          </motion.div>
          
          {/* Scroll-responsive color changing text labels */}
          <motion.div 
            style={{ color: labelColor }}
            className="absolute left-6 right-6 top-6 z-40 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em] sm:left-8 sm:right-8"
          >
            <span>Atlas / horizontal study</span>
            <span>Scroll to navigate</span>
          </motion.div>
          
          {/* Scroll-responsive progress track */}
          <motion.div 
            style={{ backgroundColor: progressBgColor }}
            className="absolute bottom-7 left-6 right-6 z-40 h-px sm:left-8 sm:right-8"
          >
            <motion.div 
              style={{ width: progressWidth, backgroundColor: progressFillColor }} 
              className="h-full" 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
