import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PixelCard from "../ui/PixelCard";

export default function MagneticCursorFieldCard({ minimal = false }: { minimal?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 3D Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (minimal) {
    return (
      <div className="w-full h-full select-none bg-transparent">
        <PixelCard variant="gold" className="w-full h-full border-none bg-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateY: tilt.x, rotateX: tilt.y }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="relative w-full h-[544px] rounded-lg border border-white/5 overflow-hidden lg:row-span-2 group cursor-pointer select-none bg-[#121212]"
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <PixelCard variant="gold" className="w-full h-full border-none bg-transparent">
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10" style={{ transform: "translateZ(30px)" }}>
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
              PIXEL CANVAS
            </span>
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
          </div>

          {/* Center text visual */}
          <div className="w-full flex justify-center items-center h-28 pointer-events-none select-none">
            <span className="text-3xl font-sans font-medium text-[#E8A969] tracking-tight">
              Komorebi
            </span>
          </div>

          {/* Footer */}
          <div>
            <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
              Interactive pixel grid
            </span>
            <h3 className="font-sans text-base font-medium tracking-tight text-white">
              Shimmer pixel card
            </h3>
          </div>
        </div>
      </PixelCard>
    </motion.div>
  );
}
