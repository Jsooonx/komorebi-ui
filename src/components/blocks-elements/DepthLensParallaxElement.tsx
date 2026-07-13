import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

type PreviewMode = "catalog" | "fullscreen";

export default function DepthLensParallaxElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 112,
    damping: 30,
    mass: 0.3,
  });
  const intensity = prefersReducedMotion ? 0.3 : 1;

  const introY = useTransform(progress, [0, 0.18], ["0%", "-100%"]);
  const outroY = useTransform(progress, [0.82, 0.98], ["100%", "0%"]);
  const backgroundY = useTransform(progress, [0.08, 0.78], [0, -26 * intensity]);
  const midgroundY = useTransform(progress, [0.1, 0.76], [18 * intensity, -34 * intensity]);
  const midgroundScale = useTransform(progress, [0.1, 0.76], [1.04, 1.1]);
  const focalY = useTransform(progress, [0.12, 0.78], [30 * intensity, -54 * intensity]);
  const focalScale = useTransform(progress, [0.12, 0.78], [0.94, 1.05]);
  const focalGrayscale = useTransform(
    progress,
    [0.15, 0.45, 0.55, 0.8],
    ["100%", "0%", "0%", "100%"],
  );
  const focalBrightness = useTransform(progress, [0.15, 0.45, 0.55, 0.8], [0.72, 1.04, 1.04, 0.72]);
  const focalContrast = useTransform(progress, [0.15, 0.45, 0.55, 0.8], [1.18, 1.14, 1.14, 1.18]);
  const focalFilter = useMotionTemplate`grayscale(${focalGrayscale}) brightness(${focalBrightness}) contrast(${focalContrast})`;
  const sceneLabelColor = useTransform(
    progress,
    [0, 0.17, 0.19, 0.82, 0.84, 1],
    [
      "rgba(17,17,17,0.45)",
      "rgba(17,17,17,0.45)",
      "rgba(242,240,233,0.48)",
      "rgba(242,240,233,0.48)",
      "rgba(17,17,17,0.45)",
      "rgba(17,17,17,0.45)",
    ],
  );
  const progressTrackColor = useTransform(
    progress,
    [0, 0.17, 0.19, 0.82, 0.84, 1],
    [
      "rgba(17,17,17,0.12)",
      "rgba(17,17,17,0.12)",
      "rgba(242,240,233,0.16)",
      "rgba(242,240,233,0.16)",
      "rgba(17,17,17,0.12)",
      "rgba(17,17,17,0.12)",
    ],
  );
  const progressFillColor = useTransform(
    progress,
    [0, 0.17, 0.19, 0.82, 0.84, 1],
    ["#111111", "#111111", "#f2f0e9", "#f2f0e9", "#111111", "#111111"],
  );
  const progressWidth = useTransform(progress, [0.18, 0.82], ["0%", "100%"]);

  return (
    <div ref={scrollRef} className="h-full w-full overflow-y-auto bg-[#09090b] scrollbar-none">
      <div
        className="relative"
        style={{ height: previewMode === "fullscreen" ? "460dvh" : "1800px" }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#09090b]"
          style={{
            height: previewMode === "fullscreen" ? "100dvh" : "500px",
            minHeight: previewMode === "fullscreen" ? "520px" : "auto",
          }}
        >
          <div className="absolute inset-0 overflow-hidden bg-[#09090b]">
            <motion.img
              src="/images/pinterest/soul.jpg"
              alt=""
              style={{ y: backgroundY, scale: 1.08 }}
              className="absolute inset-[-8%] h-[116%] w-[116%] object-cover object-center opacity-65 grayscale brightness-[0.42] contrast-[1.2] will-change-transform"
            />
            <motion.img
              src="/images/pinterest/sunset.jpg"
              alt=""
              style={{ y: midgroundY, scale: midgroundScale }}
              className="absolute inset-[8%] h-[84%] w-[84%] object-cover object-center opacity-35 mix-blend-screen grayscale brightness-[0.6] will-change-transform"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_8%,rgba(9,9,11,0.42)_65%,rgba(9,9,11,0.96)_100%)]" />

            <motion.div
              style={{ y: focalY, scale: focalScale }}
              className="absolute left-1/2 top-1/2 aspect-[3/4] w-[min(48vw,360px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.52)] will-change-transform sm:w-[min(34vw,420px)]"
            >
              <motion.img
                src="/images/pinterest/fightclub.jpg"
                alt=""
                style={{ filter: focalFilter }}
                className="h-full w-full object-cover object-[center_34%]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
          </div>

          <motion.div
            style={{ y: introY }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#f2f0e9] px-6 text-[#111111]"
          >
            <div className="max-w-3xl text-center">
              <h1 className="font-serif text-5xl font-light leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
                Look closer at the quiet layers.
              </h1>
              <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-black/50">
                Distance changes what the eye decides to keep.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ y: outroY }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f2f0e9] px-6 text-[#111111]"
          >
            <div className="max-w-2xl text-center">
              <h2 className="font-serif text-5xl font-light leading-[0.9] tracking-tight sm:text-7xl">
                The frame is never the whole story.
              </h2>
            </div>
          </motion.div>

          <motion.div
            style={{ backgroundColor: progressTrackColor }}
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
