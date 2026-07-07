import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Folder, Terminal, Settings, Mail, User } from "lucide-react";

const DOCK_ITEMS = [
  { label: "Home", icon: <Home className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Files", icon: <Folder className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Terminal", icon: <Terminal className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Settings", icon: <Settings className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Mail", icon: <Mail className="w-5 h-5 text-[#E8A969]" /> },
  { label: "Profile", icon: <User className="w-5 h-5 text-[#E8A969]" /> }
];

function DockIcon({ 
  mouseX, 
  icon, 
  idx, 
  setHoveredIdx 
}: { 
  mouseX: any; 
  label: string; 
  icon: React.ReactNode; 
  idx: number;
  setHoveredIdx: (idx: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-100, 0, 100], [40, 56, 40]);
  const yTransform = useTransform(distance, [-100, 0, 100], [0, -14, 0]);

  const width = useSpring(widthTransform, { stiffness: 450, damping: 25 });
  const y = useSpring(yTransform, { stiffness: 450, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width, y }}
      onMouseEnter={() => setHoveredIdx(idx)}
      className="rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-lg relative group/item hover:border-[#E8A969]/30 cursor-pointer shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />
      {icon}
    </motion.div>
  );
}

export default function InteractiveNavbarCard() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState("");
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    if (hoveredIdx !== null) {
      setTooltipText(DOCK_ITEMS[hoveredIdx].label);
    }
  }, [hoveredIdx]);

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:col-span-2 md:col-span-2 group"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-60" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          INTERACTIVE DOCK
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Center Dock Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-28 gap-4">
        {/* Tooltip display */}
        <div className="h-6 flex items-center justify-center">
          <div
            className={`px-2.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono font-semibold text-[#E8A969] tracking-wider uppercase shadow-xl transition-all duration-200 ease-out ${
              hoveredIdx !== null 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-1.5 scale-90"
            }`}
          >
            {tooltipText}
          </div>
        </div>

        {/* Dock Bar */}
        <div 
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            setHoveredIdx(null);
          }}
          className="flex items-end justify-center gap-3.5 bg-black/35 border border-white/5 rounded-lg px-5 h-16 pb-2.5 backdrop-blur-md shadow-2xl"
        >
          {DOCK_ITEMS.map((item, idx) => (
            <DockIcon
              key={idx}
              mouseX={mouseX}
              label={item.label}
              icon={item.icon}
              idx={idx}
              setHoveredIdx={setHoveredIdx}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive navigation
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Mac-style magnifying dock
        </h3>
      </div>
    </div>
  );
}
