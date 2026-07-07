import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticCursorFieldCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Generate grid dots
    const cols = 7;
    const rows = 3;
    const temp: { id: number; x: number; y: number }[] = [];
    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        temp.push({
          id: count++,
          x: 20 + c * 35,
          y: 20 + r * 30
        });
      }
    }
    setDots(temp);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -100, y: -100 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-40" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          ATTRACTOR FIELD
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Grid Canvas area */}
      <div className="relative z-10 w-full h-24 flex items-center justify-center">
        <div className="relative w-[250px] h-[90px] border border-white/5 rounded-xl bg-black/45 overflow-hidden">
          {dots.map((dot) => {
            // Calculate distance to mouse
            const dx = mousePos.x - dot.x - 12; // offset to align with border padding inside container
            const dy = mousePos.y - dot.y - 12;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 70;
            
            // Push direction
            let angle = Math.atan2(dy, dx);
            let pull = 0;
            if (dist < maxDist) {
              pull = (1 - dist / maxDist) * 12; // pull up to 12px
            }

            return (
              <motion.div
                key={dot.id}
                animate={{
                  x: Math.cos(angle) * pull,
                  y: Math.sin(angle) * pull,
                  backgroundColor: dist < maxDist ? "#E8A969" : "rgba(255,255,255,0.15)",
                  scale: dist < maxDist ? 1.3 : 1
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: dot.x,
                  top: dot.y
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Cursor Attraction
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Magnetic cursor field
        </h3>
      </div>
    </div>
  );
}
