import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function StairsPreloaderElement() {
  const [textState, setTextState] = useState<"hidden" | "enter" | "shimmer" | "exit">("hidden");
  const [isWiped, setIsWiped] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    if (isAnimationFinished) return;

    // Sequence timing
    // 1. Enter text
    const enterTimer = setTimeout(() => {
      setTextState("enter");
    }, 100);

    // 2. Start shimmer sweep
    const shimmerTimer = setTimeout(() => {
      setTextState("shimmer");
    }, 1400);

    // 3. Exit text
    const exitTimer = setTimeout(() => {
      setTextState("exit");
    }, 3600);

    // 4. Start stairs wipe columns
    const wipeTimer = setTimeout(() => {
      setIsWiped(true);
    }, 4500);

    // 5. Cleanup and complete
    const finishTimer = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 6200);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      clearTimeout(wipeTimer);
      clearTimeout(finishTimer);
    };
  }, [isAnimationFinished]);

  const handleRestart = () => {
    setIsAnimationFinished(false);
    setIsWiped(false);
    setTextState("hidden");
  };

  // 5 vertical columns for the stairs wipe
  const columnsCount = 5;

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#09090b] flex flex-col items-center justify-center font-sans">
      
      {/* Mock Page Content Revealed Underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none z-10">
        <div className="space-y-6 max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isWiped ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-serif tracking-tight text-white font-normal uppercase"
          >
            Aura Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isWiped ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs text-white leading-relaxed font-heading max-w-xs mx-auto"
          >
            A visual display of structural columns uncovered through a staggered stairs transition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isWiped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 text-white font-semibold text-xs rounded-full hover:bg-white/5 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Replay Stairs
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Preloader Screen Overlay (for text phase) */}
      {!isAnimationFinished && (
        <div className="absolute inset-0 z-40 bg-[#09090b] flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {textState !== "hidden" && textState !== "exit" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="px-6 flex flex-col items-center select-none"
              >
                {/* Thin shimmer text */}
                <motion.h1
                  className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.3em] text-center"
                  style={{
                    background: "linear-gradient(90deg, #555 0%, #fff 50%, #555 100%)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 30px rgba(255,255,255,0.05)",
                  }}
                  animate={textState === "shimmer" ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                >
                  Komorebi
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.0 }}
                  className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.4em] text-white mt-4"
                >
                  Creative Laboratory
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Staggered Vertical Stair Columns Wipe */}
      {!isAnimationFinished && (
        <div className="absolute inset-0 z-50 flex pointer-events-none">
          {Array.from({ length: columnsCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "100%" }}
              animate={isWiped ? { y: ["100%", "0%", "-100%"] } : { y: "100%" }}
              transition={{
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.45, 1],
                delay: i * 0.08,
              }}
              className="h-full bg-white border-l border-black/5"
              style={{
                flex: 1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
