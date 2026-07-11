import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  Inbox,
  ToggleLeft,
  Eye,
  Upload,
  Menu,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TooltipItem {
  text: string;
  shortcut?: string;
}

const tooltips: TooltipItem[] = [
  { text: "Comment", shortcut: "C" },
  { text: "Inbox", shortcut: "I" },
  { text: "Toggle theme", shortcut: "T" },
  { text: "Preview", shortcut: "P" },
  { text: "Share project", shortcut: "S" },
  { text: "Menu", shortcut: "⌘K" },
];

const icons = [MessageSquare, Inbox, ToggleLeft, Eye, Upload, Menu];
const blueDotIndices = [1, 5]; // Inbox and Menu have blue dots

const springTransition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export default function VercelTooltipElement() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState<{ x: number } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex === null) {
      // Small delay to prevent coordinate jump during unmount
      const timeout = setTimeout(() => {
        setCoords(null);
      }, 100);
      return () => clearTimeout(timeout);
    }

    const button = buttonRefs.current[hoveredIndex];
    const container = containerRef.current;
    if (!button || !container) return;

    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate center offset relative to the toolbar container
    const x = buttonRect.left - containerRect.left + buttonRect.width / 2;
    setCoords({ x });
  }, [hoveredIndex]);

  const handleHoverStart = (index: number) => {
    setPrevIndex(hoveredIndex);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setPrevIndex(hoveredIndex);
    setHoveredIndex(null);
  };

  const direction = prevIndex !== null && hoveredIndex !== null 
    ? hoveredIndex > prevIndex ? 1 : -1 
    : 0;

  return (
    <div className="w-full h-full flex items-center justify-center select-none bg-[#090909]">
      <div 
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center gap-1.5 bg-[#0f0f11] border border-white/10 rounded-full px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
      >
        {/* Shared Sliding Morphing Tooltip */}
        <AnimatePresence>
          {hoveredIndex !== null && coords && (
            <motion.div
              key="vercel-tooltip-root"
              initial={{ opacity: 0, scale: 0.95, y: 4 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: coords.x
              }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={springTransition}
              style={{
                position: "absolute",
                bottom: "100%",
                left: 0,
                marginBottom: "12px",
                transform: "translateX(-50%)",
                originX: 0.5,
                originY: 1,
              }}
              className="z-50 pointer-events-none -translate-x-1/2"
            >
              <motion.div
                layout
                transition={springTransition}
                className="relative bg-black border border-white/10 px-3 py-1.5 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.6)] flex items-center gap-2"
              >
                {/* Directional Slide & Fade Text Wrapper */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0, x: direction * 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 8 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[11px] font-sans font-medium text-white/90 whitespace-nowrap">
                      {tooltips[hoveredIndex].text}
                    </span>
                    {tooltips[hoveredIndex].shortcut && (
                      <span className="text-[9px] font-mono text-white/35 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 flex items-center justify-center min-w-[16px] h-4">
                        {tooltips[hoveredIndex].shortcut}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar Buttons */}
        {icons.map((Icon, index) => {
          const isHovered = hoveredIndex === index;
          const hasBlueDot = blueDotIndices.includes(index);

          return (
            <button
              key={index}
              ref={(el) => { buttonRefs.current[index] = el; }}
              onMouseEnter={() => handleHoverStart(index)}
              className="group relative w-10 h-10 flex items-center justify-center rounded-full text-white/55 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {/* Button Circular Hover Background */}
              <div className="absolute inset-0 rounded-full scale-75 group-hover:scale-100 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
              
              {/* Icon */}
              <Icon className="relative z-10 w-4 h-4 transition-transform duration-200 group-active:scale-95" />

              {/* Blue Dot Indicator */}
              {hasBlueDot && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0091ff] rounded-full border border-[#0f0f11] shadow-[0_0_8px_rgba(0,145,255,0.7)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
