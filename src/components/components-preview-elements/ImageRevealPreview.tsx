import { motion } from "framer-motion";

export default function ImageRevealPreview() {
  return (
    <div className="group relative h-full w-full overflow-hidden bg-[#101114]">
      <img
        src="/scenery_aurora.png"
        alt=""
        className="h-full w-full object-cover opacity-50 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#111114]"
        initial={false}
        animate={{ x: 0 }}
        whileHover={{ x: "105%" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 flex items-end justify-between p-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/70">
        <span>Reveal</span>
        <span>Hover</span>
      </div>
    </div>
  );
}
