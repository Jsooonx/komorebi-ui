import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function DevouringDetailsElement() {
  const [hovered, setHovered] = useState(false);
  const [emailText, setEmailText] = useState("");
  const fullEmail = "youremail@gmail.com";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setEmailText(fullEmail.slice(0, index));
      index = (index + 1) % (fullEmail.length + 3); // pause a bit at the end
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-transparent to-[#1a1a1a]/30 opacity-50" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          MOTION INPUT
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Sign in Mockup Box */}
      <div className="relative z-10 w-full bg-[#161616] border border-white/5 rounded-xl p-3 flex flex-col gap-1.5">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">
          Sign in command
        </span>
        <div className="flex items-center justify-between bg-black/45 border border-white/5 rounded-lg px-3 py-2 h-9">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/90">
            <Mail className="w-3 h-3 text-white/40" />
            <span>{emailText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1 h-3 bg-[#E8A969]"
            />
          </div>
          <motion.div
            animate={{
              borderColor: hovered ? "rgba(232, 169, 105, 0.4)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: hovered ? "0 0 10px rgba(232, 169, 105, 0.15)" : "none",
            }}
            className="flex items-center gap-0.5 text-[9px] font-mono text-[#E8A969] border border-white/10 px-1.5 py-0.5 rounded bg-white/5 select-none"
          >
            enter ↵
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Devouring Inputs
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Devouring details sign in
        </h3>
      </div>
    </div>
  );
}
