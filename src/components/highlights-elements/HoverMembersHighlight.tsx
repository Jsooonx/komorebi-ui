import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEMBERS = [
  {
    name: "John D.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Sarah K.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Alex M.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Emily R.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "David L.",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

export default function HoverMembersHighlight() {
  const [hovered, setHovered] = useState(false);
  const [activeMemberIdx, setActiveMemberIdx] = useState<number | null>(null);

  const content = (
    <div className="relative z-10 flex justify-center items-center h-full w-full">
      <div className="flex -space-x-4">
        {MEMBERS.map((member, i) => (
          <motion.div
            key={i}
            animate={{
              x: hovered ? (i - 2) * 16 : 0,
              rotate: hovered ? (i - 2) * 4 : 0,
            }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            onMouseEnter={() => {
              setHovered(true);
              setActiveMemberIdx(i);
            }}
            onMouseLeave={() => {
              setHovered(false);
              setActiveMemberIdx(null);
            }}
            className="relative w-12 h-12"
            style={{ zIndex: activeMemberIdx === i ? 50 : hovered ? 10 + i : 1 }}
          >
            {/* Animated Tooltip */}
            <AnimatePresence>
              {activeMemberIdx === i && (
                <motion.div
                  initial={{ opacity: 0, y: 5, x: "-50%", scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1a1a1e] border border-white/10 rounded-lg shadow-2xl text-[9px] font-semibold text-white whitespace-nowrap z-50 pointer-events-none"
                >
                  {member.name}
                  {/* Tooltip triangle indicator */}
                  <div className="absolute top-full left-1/2 -translate-y-[1px] -translate-x-1/2 w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[4.5px] border-t-[#1a1a1e]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar frame container */}
            <div className="w-full h-full rounded-full border-2 border-[#121212] overflow-hidden shadow-md cursor-pointer select-none">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1c1c1c]/10 to-[#121212] opacity-40" />

      {/* Card Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          STAGGER VIEW
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Centered Avatar list */}
      <div className="relative z-10 flex justify-center items-center h-20">{content}</div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive Team
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">Hover members</h3>
      </div>
    </div>
  );
}
