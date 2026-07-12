import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
  const lensY = useTransform(progress, [0.12, 0.8], [42 * intensity, -72 * intensity]);
  const lensRotate = useTransform(progress, [0.12, 0.8], [-1 * intensity, 1 * intensity]);
  const invLensY = useTransform(lensY, (y) => -y);
  const invLensRotate = useTransform(lensRotate, (r) => -r);
  const lensClip = useTransform(
    progress,
    [0.12, 0.5, 0.82],
    [
      "inset(16% 18% 16% 18% round 999px)",
      "inset(4% 6% 4% 6% round 180px)",
      "inset(12% 16% 12% 16% round 999px)",
    ],
  );
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
              src="/references/media/images/editorial_interior_stellar.png"
              alt=""
              style={{ y: backgroundY, scale: 1.08 }}
              className="absolute inset-[-8%] h-[116%] w-[116%] object-cover object-center opacity-65 grayscale brightness-[0.42] contrast-[1.2] will-change-transform"
            />
            <motion.img
              src="/references/media/images/editorial_design_cosmic.png"
              alt=""
              style={{ y: midgroundY, scale: midgroundScale }}
              className="absolute inset-[8%] h-[84%] w-[84%] object-cover object-center opacity-35 mix-blend-screen grayscale brightness-[0.6] will-change-transform"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_8%,rgba(9,9,11,0.42)_65%,rgba(9,9,11,0.96)_100%)]" />

            <motion.div
              style={{ y: focalY, scale: focalScale }}
              className="absolute left-1/2 top-1/2 aspect-[3/4] w-[min(48vw,360px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.52)] will-change-transform sm:w-[min(34vw,420px)]"
            >
              <img
                src="/references/media/images/editorial_portrait_midnight.png"
                alt=""
                className="h-full w-full object-cover object-[center_34%] grayscale brightness-[0.72] contrast-[1.18]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" />
            </motion.div>

            <motion.div
              style={{ y: lensY, rotate: lensRotate, clipPath: lensClip }}
              className="absolute left-1/2 top-1/2 h-[66%] w-[min(64vw,560px)] -translate-x-1/2 -translate-y-1/2 border border-white/25 bg-white/[0.025] shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-[4px] will-change-transform overflow-hidden"
            >
              {/* MAGICAL LENS REVEAL: Aligned copy of portrait in full color & contrast */}
              <motion.div
                style={{ y: invLensY, rotate: invLensRotate }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  style={{ y: focalY, scale: focalScale }}
                  className="aspect-[3/4] w-[min(48vw,360px)] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.52)] sm:w-[min(34vw,420px)]"
                >
                  <img
                    src="/references/media/images/editorial_portrait_midnight.png"
                    alt=""
                    className="h-full w-full object-cover object-[center_34%] brightness-[1.04] contrast-[1.14]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                </motion.div>
              </motion.div>

              <span className="absolute left-5 top-5 text-[9px] font-medium uppercase tracking-[0.25em] text-white/65">
                Depth study / 04
              </span>
              <span className="absolute bottom-5 right-5 text-[9px] font-medium uppercase tracking-[0.25em] text-white/45">
                Focus / distance
              </span>
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
          </div>

          <motion.div
            style={{ y: introY }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#f2f0e9] px-6 text-[#111111]"
          >
            <div className="max-w-3xl text-center">
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-black/45">
                Depth lens / 04
              </span>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-7xl md:text-8xl">
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
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-black/45">
                End of the study
              </span>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-7xl">
                The frame is never the whole story.
              </h2>
            </div>
          </motion.div>

          <motion.div
            style={{ color: sceneLabelColor }}
            className="absolute left-6 right-6 top-6 z-40 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em] sm:left-8 sm:right-8"
          >
            <span>Depth lens / layered scene</span>
            <span>Scroll to reveal</span>
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
