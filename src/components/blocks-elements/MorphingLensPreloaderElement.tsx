import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

type PreviewMode = "catalog" | "fullscreen";
type Phase = 0 | 1 | 2 | 3;

const copy = [
  {
    index: "01",
    label: "Setting the field",
    detail: "A quiet beginning for the details to arrive.",
  },
  {
    index: "02",
    label: "Composing the frame",
    detail: "The important parts move closer together.",
  },
  {
    index: "03",
    label: "Ready to enter",
    detail: "The page was already waiting underneath.",
  },
] as const;

export default function MorphingLensPreloaderElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const frameLayoutId = useId();
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isInView) setHasStarted(true);
  }, [isInView]);

  useEffect(() => {
    if (!hasStarted || isRevealed) return;

    if (prefersReducedMotion) {
      setPhase(3);
      const reducedTimer = setTimeout(() => setIsRevealed(true), 160);
      return () => clearTimeout(reducedTimer);
    }

    const phaseOneTimer = setTimeout(() => setPhase(1), 650);
    const phaseTwoTimer = setTimeout(() => setPhase(2), 1350);
    const phaseThreeTimer = setTimeout(() => setPhase(3), 1950);
    const revealTimer = setTimeout(() => setIsRevealed(true), 2550);

    return () => {
      clearTimeout(phaseOneTimer);
      clearTimeout(phaseTwoTimer);
      clearTimeout(phaseThreeTimer);
      clearTimeout(revealTimer);
    };
  }, [hasStarted, isRevealed, prefersReducedMotion]);

  const activeCopy = copy[Math.min(phase, 2)];
  const frameState = [
    {
      width: "220px",
      height: "96px",
      borderRadius: "999px",
      padding: "16px",
      borderColor: "rgba(255,255,255,0.36)",
      backgroundColor: "rgba(8,8,10,0.72)",
      boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
    },
    {
      width: "min(70%, 360px)",
      height: "180px",
      borderRadius: "28px",
      padding: "24px",
      borderColor: "rgba(255,255,255,0.48)",
      backgroundColor: "rgba(8,8,10,0.78)",
      boxShadow: "0 24px 90px rgba(0,0,0,0.38)",
    },
    {
      width: "min(82%, 780px)",
      height: "min(64%, 480px)",
      borderRadius: "16px",
      padding: "32px",
      borderColor: "rgba(255,255,255,0.58)",
      backgroundColor: "rgba(8,8,10,0.82)",
      boxShadow: "0 30px 110px rgba(0,0,0,0.48)",
    },
    {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
      padding: "clamp(24px, 6vw, 80px)",
      borderColor: "rgba(255,255,255,0)",
      backgroundColor: "rgba(8,8,10,0)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
  ][phase];

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#09090b] font-sans text-[#f2f0e9]"
      data-preview-mode={previewMode}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{ opacity: isRevealed ? 1 : 0.48 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: "easeOut" }}
      >
        <img
          src="/references/media/images/editorial_interior_stellar.png"
          alt=""
          loading="eager"
          className="absolute inset-[-8%] h-[116%] w-[116%] object-cover object-center grayscale brightness-[0.48] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,10,0.88),rgba(8,8,10,0.38)_50%,rgba(8,8,10,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_8%,rgba(8,8,10,0.78)_78%)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <motion.div
            animate={{ opacity: isRevealed ? 1 : 0.64, y: isRevealed ? 0 : 18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/50">
              A considered interface
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-6xl md:text-7xl">
              Make room for a quieter kind of momentum.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/55">
              Thoughtful systems begin with enough space for the right details to surface.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-[#08080a]"
        animate={
          prefersReducedMotion
            ? { opacity: isRevealed ? 0 : 1 }
            : { y: isRevealed ? "-100%" : "0%" }
        }
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.95,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ pointerEvents: isRevealed ? "none" : "auto" }}
      >
        <motion.div
          layout
          layoutId={`morphing-lens-frame-${frameLayoutId}`}
          animate={frameState}
          transition={{
            layout: { type: "spring", stiffness: 138, damping: 24, mass: 0.55 },
            default: { type: "spring", stiffness: 138, damping: 24, mass: 0.55 },
          }}
          className="relative flex shrink-0 items-center justify-center overflow-hidden border will-change-transform"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.03))]" />
          <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
            <div className={`flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.3em] text-white/45 transition-all duration-300 ${phase === 0 || phase === 3 ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}>
              <span>{activeCopy.index}</span>
              <span className="h-px w-8 bg-white/25" />
              <span>Lens study</span>
            </div>

            <div className={`relative w-full overflow-hidden transition-all duration-300 ${phase === 0 ? "mt-0 min-h-[16px]" : "mt-5 min-h-[76px]"}`}>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeCopy.label}
                  initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(5px)" }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-0"
                >
                  <p className={`font-semibold leading-none tracking-[-0.05em] transition-all duration-300 ${phase === 0 ? "text-[10px] tracking-[0.25em] uppercase text-white/80" : phase === 3 ? "opacity-0 text-3xl sm:text-5xl font-light" : "text-2xl sm:text-4xl"}`}>
                    {activeCopy.label}
                  </p>
                  <p className={`mx-auto max-w-xs text-xs leading-relaxed text-white/45 transition-all duration-300 ${phase === 0 || phase === 3 ? "opacity-0 h-0 overflow-hidden mt-0" : "opacity-100 h-auto mt-3"}`}>
                    {activeCopy.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`flex items-center gap-1.5 transition-all duration-300 ${phase === 0 || phase === 3 ? "opacity-0 h-0 overflow-hidden mt-0 pointer-events-none" : "opacity-100 h-auto mt-6"}`}>
              {copy.map((item, index) => (
                <motion.span
                  key={item.index}
                  layout
                  animate={{
                    width: index === Math.min(phase, 2) ? 28 : 5,
                    opacity: index <= Math.min(phase, 2) ? 0.8 : 0.24,
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="h-1 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
