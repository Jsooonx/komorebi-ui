import { motion } from "framer-motion";

const TECH_TAGS = [
  "React", "TypeScript", "WebGL", "GSAP", "TailwindCSS", "Framer Motion", "ThreeJS", "Vite"
];

function getTechIcon(tech: string) {
  switch (tech) {
    case "React":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="-11.5 -10.23 23 20.46" xmlns="http://www.w3.org/2000/svg">
          <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
          <circle r="2" fill="#61DAFB" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg className="w-3.5 h-3.5 shrink-0 rounded-[2px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#3178C6" />
          <path d="M12.9 11.2h2.9v1.3h-2.9v2.2c0 .5.3.7.8.7H15v1.3h-1.5c-1.3 0-1.9-.6-1.9-1.9V11.2zM21 13.5c0 1.9-1.4 3.2-3.3 3.2-1.7 0-3.1-1.1-3.2-2.7h1.4c0 .8.8 1.4 1.8 1.4 1 0 1.8-.7 1.8-1.8v-.4h-3.6V12h3.6v-.4c0-1.1-.8-1.8-1.8-1.8-1 0-1.8.6-1.8 1.4h-1.4c.1-1.6 1.5-2.7 3.2-2.7 1.9 0 3.3 1.3 3.3 3.2v4.3z" fill="white" />
        </svg>
      );
    case "WebGL":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#BECB6D" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 7v10M12 12v10M22 7v10" />
        </svg>
      );
    case "GSAP":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#88CE02" />
          <path d="M12.5 15.5c-2.2 0-3.5-1.3-3.5-3.5s1.3-3.5 3.5-3.5c1.4 0 2.4.6 2.8 1.5h-1.5c-.3-.4-.7-.6-1.3-.6-1.1 0-1.7.7-1.7 1.9s.6 1.9 1.7 1.9c.7 0 1.2-.3 1.4-.8h-1.7v-1.2h3v3c-.7.7-1.7 1.2-2.8 1.2z" fill="black" />
        </svg>
      );
    case "TailwindCSS":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6.018C15.6 2.418 20.4 3.618 24 7.218c-3.6 3.6-8.4 2.4-12-1.2-3.6-3.6-8.4-2.4-12 1.2 3.6-3.6 8.4-2.4 12 1.2zm0 10.8c3.6-3.6 8.4-2.4 12 1.2-3.6 3.6-8.4 2.4-12-1.2-3.6-3.6-8.4-2.4-12 1.2 3.6-3.6 8.4-2.4 12 1.2z" fill="#38BDF8"/>
        </svg>
      );
    case "Framer Motion":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0h16v8h-8zM12 8h8v8H4zM4 16h8v8z" fill="#F0F"/>
        </svg>
      );
    case "ThreeJS":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="1.2" fill="none">
          <path d="M12 2L22 19H2L12 2Z" />
          <path d="M12 2V19" />
          <path d="M12 10L22 19" />
          <path d="M12 10L2 19" />
        </svg>
      );
    case "Vite":
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.783 2.656L12 14.544 5.217 2.656h13.566z" fill="url(#vite-grad)" />
          <path d="M22 6.83L12 21.6 2 6.83l3.656-.913L12 14.887l6.344-9.014L22 6.83z" fill="#BD34FE" />
          <defs>
            <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC517" />
              <stop offset="100%" stopColor="#FFE600" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}

export default function InfiniteMarqueeCard() {
  return (
    <div className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-[#BECB6D]/5 to-[#121212] opacity-55" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          PERPETUAL SCROLL
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Infinite Scroll Area */}
      <div className="relative z-10 w-full flex items-center h-16 overflow-hidden">
        {/* Double-wrapper for seamless loop */}
        <div className="flex gap-4 w-max animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {/* First loop */}
          {TECH_TAGS.map((tech, idx) => (
            <div 
              key={`tech1-${idx}`} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 border border-white/5"
            >
              {getTechIcon(tech)}
              <span className="text-[10px] font-mono text-white/90 font-medium tracking-wide uppercase">
                {tech}
              </span>
            </div>
          ))}
          {/* Second identical loop */}
          {TECH_TAGS.map((tech, idx) => (
            <div 
              key={`tech2-${idx}`} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 border border-white/5"
            >
              {getTechIcon(tech)}
              <span className="text-[10px] font-mono text-white/90 font-medium tracking-wide uppercase">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Infinite Loop
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Infinite marquee
        </h3>
      </div>
    </div>
  );
}
