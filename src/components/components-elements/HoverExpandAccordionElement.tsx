import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  year: string;
  image: string;
}

const items: AccordionItem[] = [
  {
    id: "velvet",
    title: "Velvet ® Dreams Studio",
    year: "2024",
    image: "/references/media/images/editorial_model_velvet.png",
  },
  {
    id: "neon",
    title: "Neon Pulse ® Agency",
    year: "2024",
    image: "/references/media/images/editorial_painting_neon.png",
  },
  {
    id: "midnight",
    title: "Midnight Canvas",
    year: "2024",
    image: "/references/media/images/editorial_portrait_midnight.png",
  },
  {
    id: "echo",
    title: "Echo Digital Lab",
    year: "2024",
    image: "/references/media/images/editorial_portrait_echo.png",
  },
  {
    id: "skiper",
    title: "Skiper Creative ® Co",
    year: "2024",
    image: "/references/media/images/editorial_brutalist_architecture.png",
  },
  {
    id: "cosmic",
    title: "Cosmic Brew Studios",
    year: "2024",
    image: "/references/media/images/editorial_design_cosmic.png",
  },
  {
    id: "horizon",
    title: "Horizon Typography",
    year: "2024",
    image: "/references/media/images/editorial_sculpture_horizon.png",
  },
  {
    id: "waves",
    title: "Waves & ® Motion",
    year: "2024",
    image: "/references/media/images/editorial_nature_waves.png",
  },
  {
    id: "stellar",
    title: "Stellar Workshop",
    year: "2024",
    image: "/references/media/images/editorial_interior_stellar.png",
  },
  {
    id: "prism",
    title: "Prism ® Media House",
    year: "2024",
    image: "/references/media/images/editorial_still_life_prism.png",
  },
];

const springTransition = {
  type: "spring",
  stiffness: 280,
  damping: 26,
  mass: 0.8,
};

export default function HoverExpandAccordionElement() {
  const [hoveredId, setHoveredId] = useState<string | null>("velvet");

  return (
    <div className="w-full h-full flex bg-[#090909] select-none overflow-hidden p-1 sm:p-2 border border-white/5 rounded-2xl relative">
      <div className="flex w-full h-full gap-0.5 sm:gap-1.5 overflow-hidden">
        {items.map((item) => {
          const isExpanded = hoveredId === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              transition={springTransition}
              onHoverStart={() => setHoveredId(item.id)}
              className={`relative h-full flex cursor-pointer overflow-hidden transition-colors duration-300 border-r border-white/5 last:border-r-0 ${
                isExpanded ? "bg-white/[0.02]" : "bg-transparent hover:bg-white/[0.01]"
              }`}
              animate={{
                flexGrow: isExpanded ? 5 : 0.8,
              }}
              style={{ flexBasis: "0%" }}
            >
              <AnimatePresence initial={false} mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex w-full h-full overflow-hidden"
                  >
                    {/* Left Sidebar Section inside Expanded Column */}
                    <div className="w-8 sm:w-12 h-full flex flex-col justify-between items-center py-4 border-r border-white/10 shrink-0">
                      <span className="font-serif text-[10px] sm:text-xs text-white/45 tracking-wider [writing-mode:vertical-rl] rotate-180 uppercase font-medium">
                        {item.year}
                      </span>
                      <motion.span
                        layoutId={`title-${item.id}`}
                        className="font-serif text-[11px] sm:text-sm text-white/90 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-medium whitespace-nowrap pb-2"
                      >
                        {item.title}
                      </motion.span>
                    </div>

                    {/* Main Image Section inside Expanded Column */}
                    <div className="flex-1 h-full p-2 sm:p-3 overflow-hidden flex items-center justify-center">
                      <motion.div
                        layoutId={`img-container-${item.id}`}
                        transition={springTransition}
                        className="w-full h-full rounded-lg overflow-hidden border border-white/10 relative group"
                      >
                        <motion.img
                          initial={{ scale: 1.05, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.45 }}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover filter brightness-[0.9] hover:brightness-[1] transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex items-center justify-center relative py-4"
                  >
                    <motion.span
                      layoutId={`title-${item.id}`}
                      className="font-serif text-[10px] sm:text-xs text-white/30 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-medium whitespace-nowrap"
                    >
                      {item.title}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
