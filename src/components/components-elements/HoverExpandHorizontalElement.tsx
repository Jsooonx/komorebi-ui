import { motion } from "framer-motion";
import { useState } from "react";

interface AccordionItem {
  id: string;
  image: string;
  renderOverlay: (isExpanded: boolean) => React.ReactNode;
  bgClass?: string;
}

const springTransition = {
  type: "spring",
  stiffness: 280,
  damping: 26,
  mass: 0.85,
};

export default function HoverExpandHorizontalElement() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items: AccordionItem[] = [
    {
      id: "velvet",
      image: "/references/media/images/editorial_model_velvet.png",
      bgClass: "brightness-[0.95] contrast-[1.05] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {/* Left Vertical text */}
          <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[8px] font-mono tracking-[0.2em] text-white/50 uppercase select-none [writing-mode:vertical-rl] rotate-180">
            <span>BEYOND THE NEW PLAN</span>
            <span>BEYOND THE NEW PLAN</span>
          </div>
          
          {/* Center Editorial Text */}
          <div className="text-center max-w-[180px] space-y-1 select-none">
            <p className="font-serif text-[11px] text-white/90 leading-tight uppercase tracking-wider">
              FOREVER REMAINING
            </p>
            <p className="font-serif text-[10px] text-white/50 leading-tight uppercase tracking-wide">
              THINGS
            </p>
            <p className="font-serif text-[8px] text-white/40 leading-relaxed uppercase tracking-normal">
              BLACK AND THUNDERBOLT<br />
              STATIONS IN PLACES WE HAD<br />
              UNCOVERED
            </p>
          </div>

          {/* Right Bottom label */}
          <span className="absolute bottom-4 right-4 text-[10px] font-mono text-white/50">
            # 23
          </span>
        </div>
      ),
    },
    {
      id: "neon",
      image: "/references/media/images/editorial_painting_neon.png",
      bgClass: "brightness-[0.8] contrast-[1.1] hue-rotate-[200deg] saturate-[2]", // blue tone
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-blue-900/40 mix-blend-color-burn">
          <div className="text-center select-none">
            <h3 className="font-sans font-black text-6xl md:text-7xl tracking-tighter text-white uppercase opacity-95">
              ROD
            </h3>
            <p className="text-[7px] font-mono tracking-widest text-white/40 uppercase mt-2">
              visual campaign
            </p>
          </div>
          <span className="absolute bottom-4 right-4 text-[10px] font-mono text-white/60">
            # 23
          </span>
        </div>
      ),
    },
    {
      id: "midnight",
      image: "/references/media/images/editorial_portrait_midnight.png",
      bgClass: "brightness-[0.4] contrast-[1.2]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center justify-center select-none">
            {/* Centered red block */}
            <div className="w-16 h-16 bg-[#ff2d2d] flex items-center justify-center shadow-lg rounded-sm relative group-hover:scale-105 transition-transform duration-300">
              <span className="text-[7px] font-mono text-white/40 absolute bottom-1">03 / 10</span>
            </div>
            {/* Signature font script overlay */}
            <span className="absolute font-serif italic text-lg sm:text-2xl text-white/95 drop-shadow-md whitespace-nowrap mt-2 pointer-events-none">
              Red Block
            </span>
          </div>
          <span className="absolute bottom-4 right-4 text-[10px] font-mono text-white/40">
            # 23
          </span>
        </div>
      ),
    },
    {
      id: "echo",
      image: "/references/media/images/editorial_portrait_echo.png",
      bgClass: "brightness-[0.7] contrast-[1.3] saturate-[2.5] hue-rotate-[320deg] mix-blend-lighten", // bright red/orange tone
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#ff2a00]/30">
          <div className="text-center select-none rotate-90">
            <h4 className="font-serif italic text-5xl text-black/90 uppercase tracking-tighter font-semibold">
              99
            </h4>
          </div>
          <span className="absolute bottom-4 left-4 text-[8px] font-mono text-black/60 tracking-wider uppercase">
            EST. 2026
          </span>
        </div>
      ),
    },
    {
      id: "brutalist",
      image: "/references/media/images/editorial_brutalist_architecture.png",
      bgClass: "brightness-[0.4] contrast-[1.3] grayscale mix-blend-luminosity",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-emerald-950/60 mix-blend-color-burn">
          {/* Green typography grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-serif text-lg md:text-xl text-[#e8ffd0]/85 uppercase font-medium tracking-widest text-center select-none">
            <span>C</span><span>O</span>
            <span>H</span><span>A</span>
            <span>N</span><span>I</span>
            <span>G</span><span>P</span>
            <span>H</span><span>I</span>
            <span>U</span><span>N</span>
          </div>
        </div>
      ),
    },
    {
      id: "cosmic",
      image: "/references/media/images/editorial_design_cosmic.png",
      bgClass: "opacity-0", // hidden to reveal the white background card
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 bg-[#f4f4f4] flex flex-col items-center justify-center p-4">
          <div className="flex gap-2 select-none">
            {/* Split displays in center */}
            <div className="w-10 h-14 bg-black/90 rounded-sm flex items-center justify-center overflow-hidden">
              <span className="text-[8px] font-mono text-white/50">A</span>
            </div>
            <div className="w-10 h-14 bg-[#d03232] rounded-sm flex items-center justify-center overflow-hidden">
              <span className="text-[8px] font-mono text-white/50">B</span>
            </div>
          </div>
          <span className="text-[9px] font-serif text-black/60 uppercase tracking-widest mt-3">
            portfolio
          </span>
        </div>
      ),
    },
    {
      id: "horizon",
      image: "/references/media/images/editorial_sculpture_horizon.png",
      bgClass: "brightness-[0.8] contrast-[1.1] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/5">
          <div className="text-center select-none">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
              the
            </h4>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
              fighting
            </h4>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
              win
            </h4>
          </div>
        </div>
      ),
    },
    {
      id: "waves",
      image: "/references/media/images/editorial_nature_waves.png",
      bgClass: "brightness-[0.7] grayscale contrast-[1.15]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[7px] font-mono text-white/40 select-none">
            <span>ALIGN: 01</span>
            <span>ALIGN: 02</span>
          </div>
          <div className="rotate-90 select-none text-center">
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-white/80">
              Tommy
            </span>
          </div>
          <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between text-[7px] font-mono text-white/40 select-none">
            <span>RUNNING</span>
            <span>RUNNING</span>
          </div>
        </div>
      ),
    },
    {
      id: "stellar",
      image: "/references/media/images/editorial_interior_stellar.png",
      bgClass: "brightness-[0.3] contrast-[1.2] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-left select-none">
          <div className="space-y-1">
            <span className="block text-[8px] font-mono text-white/40 tracking-wider">
              (022.4)
            </span>
            <span className="block text-[9px] font-sans font-bold text-white/85 uppercase tracking-widest leading-tight">
              ESTABLISHED ALIGN
            </span>
            <span className="block text-[7px] font-serif text-white/50">
              by Morris Templeman
            </span>
          </div>
          
          <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3333] animate-pulse" />
          </div>

          <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">
            version: 04/326
          </span>
        </div>
      ),
    },
    {
      id: "prism",
      image: "/references/media/images/editorial_still_life_prism.png",
      bgClass: "brightness-[0.7] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-center select-none">
          <span className="text-[7px] font-mono text-white/40 tracking-widest uppercase">
            still life series
          </span>
          <div className="space-y-0.5">
            <h5 className="font-serif italic text-sm text-white/90">
              Prism & refraction
            </h5>
            <p className="text-[7px] font-mono text-white/30 uppercase">
              plate # 12
            </p>
          </div>
          <span className="text-[7px] font-mono text-white/40">
            © 2026
          </span>
        </div>
      ),
    },
  ];

  return (
    <div 
      onMouseLeave={() => setHoveredId(null)}
      className="w-full h-full flex bg-[#0c0c0e] select-none overflow-hidden p-2 sm:p-3 border border-white/5 rounded-3xl relative"
    >
      <div className="flex w-full h-full gap-1.5 sm:gap-2.5 overflow-hidden">
        {items.map((item) => {
          const isExpanded = hoveredId === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              transition={springTransition}
              onHoverStart={() => setHoveredId(item.id)}
              className="relative h-full flex cursor-pointer overflow-hidden rounded-2xl bg-[#141416] border border-white/5"
              animate={{
                flexGrow: hoveredId === null ? 1 : isExpanded ? 5.5 : 0.65,
              }}
              style={{ flexBasis: "0%" }}
            >
              {/* Backing Image */}
              <img
                src={item.image}
                alt={item.id}
                className={`w-full h-full object-cover pointer-events-none select-none transition-all duration-700 ease-out ${item.bgClass}`}
              />

              {/* Clip-masked Layout Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Wrap in a fixed-width container matching expanded size to prevent overlay elements from shrinking/squeezing */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full transition-opacity duration-300"
                  style={{ 
                    width: "280px", 
                    opacity: isExpanded ? 1 : 0 
                  }}
                >
                  {item.renderOverlay(isExpanded)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
