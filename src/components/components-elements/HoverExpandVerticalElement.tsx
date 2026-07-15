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

export default function HoverExpandVerticalElement() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items: AccordionItem[] = [
    {
      id: "velvet",
      image: "/assets/shared/editorial/pinterest/unraveling.jpg",
      bgClass: "brightness-[0.95] contrast-[1.05] grayscale object-[center_30%]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between select-none">
          {/* Left Title */}
          <span className="font-serif text-[11px] sm:text-xs text-white/90 tracking-widest uppercase font-medium">
            VELVET ® DREAMS STUDIO
          </span>

          {/* Center Editorial Text */}
          <div className="hidden md:block text-center max-w-[240px] space-y-0.5">
            <p className="font-serif text-[8px] text-white/40 leading-relaxed uppercase tracking-normal">
              BLACK AND THUNDERBOLT STATIONS IN PLACES WE HAD UNCOVERED
            </p>
          </div>

          {/* Right label */}
          <span className="text-[10px] font-mono text-white/50 tracking-wider"># 23 / 2024</span>
        </div>
      ),
    },
    {
      id: "neon",
      image: "/assets/shared/editorial/pinterest/shattered.jpg",
      bgClass:
        "brightness-[0.8] contrast-[1.1] hue-rotate-[200deg] saturate-[2] object-[center_40%]", // blue tone
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between bg-blue-900/10 mix-blend-color-burn select-none">
          <h3 className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-white uppercase opacity-95">
            ROD
          </h3>
          <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">
            visual campaign
          </span>
          <span className="text-[10px] font-mono text-white/60"># 23</span>
        </div>
      ),
    },
    {
      id: "midnight",
      image: "/assets/shared/editorial/pinterest/fightclub.jpg",
      bgClass: "brightness-[0.4] contrast-[1.2] object-[center_35%]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            {/* Small red block */}
            <div className="w-8 h-8 bg-[#ff2d2d] flex items-center justify-center shadow-lg rounded-sm relative shrink-0">
              <span className="text-[6px] font-mono text-white/40 absolute bottom-0.5">03/10</span>
            </div>
            {/* Signature font script overlay */}
            <span className="font-serif italic text-sm sm:text-base text-white/95 whitespace-nowrap">
              Red Block
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/40"># 23</span>
        </div>
      ),
    },
    {
      id: "echo",
      image: "/assets/shared/editorial/pinterest/mountain2.jpg",
      bgClass:
        "brightness-[0.7] contrast-[1.3] saturate-[2.5] hue-rotate-[320deg] mix-blend-lighten object-[center_25%]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between bg-[#ff2a00]/20 select-none">
          <span className="text-[8px] font-mono text-black/60 tracking-wider uppercase">
            EST. 2026 / METADATA
          </span>
          <h4 className="font-serif italic text-4xl text-black/90 uppercase tracking-tighter font-semibold">
            99
          </h4>
        </div>
      ),
    },
    {
      id: "brutalist",
      image: "/assets/shared/editorial/pinterest/random1.jpg",
      bgClass: "brightness-[0.4] contrast-[1.3] grayscale mix-blend-luminosity",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-center bg-emerald-950/40 mix-blend-color-burn select-none">
          {/* Green typography row */}
          <div className="flex gap-4 sm:gap-8 font-serif text-sm sm:text-base text-[#e8ffd0]/85 uppercase font-medium tracking-[0.2em] text-center">
            <span>C</span>
            <span>O</span>
            <span>H</span>
            <span>A</span>
            <span>N</span>
            <span>I</span>
            <span>G</span>
            <span>P</span>
            <span>H</span>
            <span>I</span>
            <span>U</span>
            <span>N</span>
          </div>
        </div>
      ),
    },
    {
      id: "cosmic",
      image: "/assets/shared/editorial/pinterest/sunset.jpg",
      bgClass: "opacity-0",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-0 bg-[#f4f4f4] flex items-center justify-between px-4 select-none">
          <span className="text-[9px] font-serif text-black/60 uppercase tracking-widest">
            portfolio display
          </span>
          <div className="flex gap-2">
            {/* Split displays in center */}
            <div className="w-6 h-8 bg-black/90 rounded-sm flex items-center justify-center overflow-hidden">
              <span className="text-[7px] font-mono text-white/50">A</span>
            </div>
            <div className="w-6 h-8 bg-[#d03232] rounded-sm flex items-center justify-center overflow-hidden">
              <span className="text-[7px] font-mono text-white/50">B</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "horizon",
      image: "/assets/shared/editorial/pinterest/hestia.jpg",
      bgClass: "brightness-[0.8] contrast-[1.1] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between bg-white/5 select-none">
          <h4 className="font-serif text-base sm:text-lg font-bold tracking-tight text-white lowercase">
            the fighting win
          </h4>
          <span className="text-[8px] font-mono text-white/35">ARCHIVE NO. 74</span>
        </div>
      ),
    },
    {
      id: "waves",
      image: "/assets/shared/editorial/pinterest/dune.jpg",
      bgClass: "brightness-[0.7] grayscale contrast-[1.15]",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between select-none">
          <span className="text-[7px] font-mono text-white/40 uppercase">ALIGN: 01 / RUNNING</span>
          <span className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80">
            Tommy
          </span>
          <span className="text-[7px] font-mono text-white/40 uppercase">ALIGN: 02 / RUNNING</span>
        </div>
      ),
    },
    {
      id: "stellar",
      image: "/assets/shared/editorial/pinterest/soul.jpg",
      bgClass: "brightness-[0.3] contrast-[1.2] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between select-none">
          <div className="flex flex-col text-left">
            <span className="text-[7px] font-mono text-white/40 tracking-wider">(022.4)</span>
            <span className="text-[9px] font-sans font-bold text-white/85 uppercase tracking-widest leading-none mt-0.5">
              ESTABLISHED ALIGN
            </span>
          </div>

          <div className="w-6 h-6 border border-white/10 rounded flex items-center justify-center bg-white/[0.02]">
            <span className="w-1 h-1 rounded-full bg-[#ff3333] animate-pulse" />
          </div>

          <span className="text-[7px] font-mono text-white/35 uppercase tracking-widest">
            version: 04/326
          </span>
        </div>
      ),
    },
    {
      id: "prism",
      image: "/assets/shared/editorial/pinterest/alexander.jpg",
      bgClass: "brightness-[0.7] grayscale",
      renderOverlay: (isExpanded) => (
        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between select-none">
          <span className="text-[7px] font-mono text-white/40 tracking-widest uppercase">
            still life series
          </span>
          <h5 className="font-serif italic text-xs sm:text-sm text-white/90">Prism & refraction</h5>
          <span className="text-[7px] font-mono text-white/40">© 2026</span>
        </div>
      ),
    },
  ];

  return (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className="w-full h-full flex flex-col bg-[#0c0c0e] select-none overflow-hidden p-2 sm:p-3 border border-white/5 rounded-3xl relative"
    >
      <div className="flex flex-col w-full h-full gap-1.5 sm:gap-2.5 overflow-hidden">
        {items.map((item) => {
          const isExpanded = hoveredId === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              transition={springTransition}
              onHoverStart={() => setHoveredId(item.id)}
              className="relative w-full flex cursor-pointer overflow-hidden rounded-2xl bg-[#141416] border border-white/5"
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
                {/* Wrap in a container that matches the expanded height to prevent overlay layout squeezing */}
                <div
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transition-opacity duration-300"
                  style={{
                    height: "60px",
                    opacity: isExpanded ? 1 : 0,
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
