import { motion } from "framer-motion";

const TECH_TAGS = [
  "React", "TypeScript", "WebGL", "GSAP", "TailwindCSS", "Framer Motion", "ThreeJS", "Vite"
];

function getTechLogoUrl(tech: string) {
  const token = "pk_FklYVGBwT-mKrXMQ7yPyqQ";
  let domain = "";
  switch (tech) {
    case "React":
      domain = "react.dev";
      break;
    case "TypeScript":
      domain = "typescriptlang.org";
      break;
    case "WebGL":
      domain = "khronos.org";
      break;
    case "GSAP":
      domain = "greensock.com";
      break;
    case "TailwindCSS":
      domain = "tailwindcss.com";
      break;
    case "Framer Motion":
      domain = "framer.com";
      break;
    case "ThreeJS":
      domain = "threejs.org";
      break;
    case "Vite":
      domain = "vitejs.dev";
      break;
    default:
      domain = "github.com";
  }
  return `https://img.logo.dev/${domain}?token=${token}`;
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
              <img 
                src={getTechLogoUrl(tech)} 
                alt={`${tech} logo`} 
                className="w-3.5 h-3.5 shrink-0 object-contain rounded-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
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
              <img 
                src={getTechLogoUrl(tech)} 
                alt={`${tech} logo`} 
                className="w-3.5 h-3.5 shrink-0 object-contain rounded-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
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
