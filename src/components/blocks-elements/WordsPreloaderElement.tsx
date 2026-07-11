import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",        // English
  "Bonjour",      // French
  "Ciao",         // Italian
  "Olá",          // Portuguese
  "Hallo",        // German
  "Hola",         // Spanish
  "Konnichiwa",   // Japanese
  "Ni Hao",       // Chinese
  "Namaste",      // Hindi
  "Halo",         // Indonesian
];

// Speed curve delays (slow -> fast -> slow)
const delays = [1000, 750, 500, 300, 160, 160, 300, 500, 750, 1200];

export default function WordsPreloaderElement() {
  const [index, setIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWiped, setIsWiped] = useState(false);

  // Recurse timeout loop for speed curve
  useEffect(() => {
    if (isCompleted) return;

    if (index >= greetings.length - 1) {
      // Last word stays for its delay, then trigger slide up
      const timer = setTimeout(() => {
        setIsCompleted(true);
        // Set wiped state after transition completes
        setTimeout(() => setIsWiped(true), 850);
      }, delays[index]);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delays[index]);

    return () => clearTimeout(timer);
  }, [index, isCompleted]);

  const handleRestart = () => {
    setIsWiped(false);
    setIsCompleted(false);
    setIndex(0);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#090909] flex flex-col items-center justify-center font-sans">
      
      {/* Mock Page Content Revealed Underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isCompleted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="space-y-6 max-w-md"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0091ff]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">Loader Finished</span>
          </div>
          
          <h2 className="text-3xl font-serif tracking-tight text-white font-normal">
            Velvet Dreams Studio
          </h2>
          
          <p className="text-xs text-white/50 leading-relaxed font-heading max-w-sm mx-auto">
            A premium architectural portfolio grid that was smoothly loaded behind the typographic greeting preloader.
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold text-xs rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg mx-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Preloader
          </button>
        </motion.div>
      </div>

      {/* Slide up Preloader Screen Panel */}
      <motion.div
        animate={isCompleted ? { y: "-120vh" } : { y: "0vh" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0c0c0e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: isWiped ? "none" : "auto",
        }}
      >
        {/* Typographic Greeting Text */}
        <div className="relative overflow-hidden h-24 sm:h-36 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {!isCompleted && (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: index === 0 ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  y: -25,
                  transition: { duration: 0.15 } 
                }}
                transition={{ 
                  duration: index === 0 ? 1.4 : 0.22, 
                  ease: index === 0 ? [0.16, 1, 0.3, 1] : "easeOut" 
                }}
                className="flex items-center gap-4 sm:gap-6 select-none"
              >
                {/* Progress counter index */}
                <span className="text-white/20 font-mono text-base sm:text-2xl font-semibold tracking-wider">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                
                {/* Glowing cyan dot divider */}
                <span className="w-2.5 h-2.5 rounded-full bg-[#0091ff] shadow-[0_0_12px_rgba(0,145,255,0.8)]" />
                
                {/* Greeting text word */}
                <span className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter">
                  {greetings[index]}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Elastic Liquid SVG Wave Wipe at bottom border */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          className="absolute top-[99%] left-0 w-full h-[15vh] fill-[#0c0c0e] pointer-events-none"
        >
          <motion.path
            animate={isCompleted 
              ? { d: "M0,0 Q50,0 100,0 L100,100 L0,100 Z" } 
              : { d: "M0,0 Q50,70 100,0 L100,100 L0,100 Z" }
            }
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
