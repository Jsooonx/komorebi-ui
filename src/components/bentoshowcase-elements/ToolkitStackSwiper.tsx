import { useState, useRef } from "react";
import { motion } from "framer-motion";

const CARD_DATA = [
  {
    id: 0,
    glow: "rgba(190, 203, 109, 0.25)",
    src: "/scenery_aurora.png",
    title: "Aurora Scenery"
  },
  {
    id: 1,
    glow: "rgba(232, 169, 105, 0.25)",
    src: "/scenery_sunset.png",
    title: "Sunset Scenery"
  },
  {
    id: 2,
    glow: "rgba(232, 169, 105, 0.2)",
    src: "/scenery_mountains.png",
    title: "Mountain Scenery"
  }
];

export default function ToolkitStackSwiper({ minimal = false }: { minimal?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [stack, setStack] = useState([0, 1, 2]);

  // 3D Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 14, y: -y * 14 }); // Tilt up to 14 degrees
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSwipe = () => {
    setStack((prev) => {
      const next = [...prev];
      const top = next.shift()!;
      next.push(top);
      return next;
    });
  };

  const content = (
    <motion.div
      animate={{ rotateY: tilt.x, rotateX: tilt.y }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative z-20 w-full h-full flex items-center justify-center"
    >
      <span 
        style={{ transform: "translateZ(40px)" }}
        className="absolute top-4 text-[9px] font-mono text-white/30 uppercase tracking-widest select-none pointer-events-none z-30"
      >
        Swipe cards left or right
      </span>

      {/* Card Pile */}
      <div className="relative w-[150px] h-[190px] flex items-center justify-center">
        {stack.map((cardId, index) => {
          const card = CARD_DATA.find((c) => c.id === cardId)!;
          const isTop = index === 0;

          return (
            <motion.div
              key={card.id}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 85) {
                  handleSwipe();
                }
              }}
              animate={{
                scale: 1 - index * 0.06,
                y: index * 12,
                z: (3 - index) * 10,
                opacity: 1 - index * 0.25
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24
              }}
              style={{
                zIndex: 3 - index,
                boxShadow: `0 20px 45px -15px ${card.glow}`
              }}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              className="absolute w-full h-full rounded-lg border border-white/10 bg-black flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
            >
              <img 
                src={card.src} 
                alt={card.title} 
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none" 
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  if (minimal) {
    return (
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full flex items-center justify-center select-none relative overflow-hidden"
        style={{ perspective: 1000 }}
      >
        {content}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[544px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:row-span-2 group"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#121212] via-transparent to-[#1a1a1a]/20 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          DECK SWIPER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* 3D Tilt Sandbox */}
      <div className="relative z-20 w-full h-[340px] flex items-center justify-center">
        {content}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive layout
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Toolkit stack swiper
        </h3>
      </div>
    </div>
  );
}
