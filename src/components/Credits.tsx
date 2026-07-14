import { motion } from "framer-motion";
import SplitText from "./ui/SplitText";

interface LogoItem {
  name: string;
  src: string;
  url?: string;
}

const INSPIRATIONS: LogoItem[] = [
  { name: "Skiper UI", src: "/logos/skiperui.png", url: "https://skiper-ui.vercel.app" },
  { name: "Aceternity UI", src: "/logos/aceternity.png", url: "https://ui.aceternity.com" },
  { name: "Tailark", src: "/logos/tailark.png", url: "https://tailark.com" },
  { name: "Shadcn UI", src: "/logos/shadcnui.png", url: "https://ui.shadcn.com" },
  { name: "React Bits", src: "/logos/reactbits.png", url: "https://reactbits.dev" },
];

const STACK: LogoItem[] = [
  { name: "React.js", src: "/logos/react.svg", url: "https://react.dev" },
  { name: "Tailwind CSS", src: "/logos/tailwindcss.svg", url: "https://tailwindcss.com" },
  { name: "Vercel", src: "/logos/vercel.com-logo.webp", url: "https://vercel.com" },
  { name: "Supabase", src: "/logos/supabase.com-logo.webp", url: "https://supabase.com" },
  { name: "Claude AI", src: "/logos/claude.com-logo.webp", url: "https://claude.ai" },
];

export default function Credits() {
  return (
    <section
      id="credits"
      className="relative z-10 bg-[#090909] border-t border-white/5 py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center select-none animate-fade-in"
    >
      {/* ── HEADER ── */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-12 w-full">
        <SplitText
          text="Shaped by the open ecosystem"
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-3 leading-tight inline-block"
          tag="h2"
          splitType="words"
          delay={80}
          duration={0.8}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-120px"
        />
        <SplitText
          text="we respect & build upon"
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white/50 mb-6 leading-tight inline-block italic"
          tag="h2"
          splitType="words"
          delay={120}
          duration={0.8}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-120px"
        />
      </div>

      <div className="w-full max-w-[900px] flex flex-col items-center">
        {/* ── SECTION: RESOURCES & INSPIRATION ── */}
        <div className="relative w-full flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-white/10" />
          </div>
          <div className="relative bg-[#090909] px-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              Resources & Inspiration
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 w-full px-6 py-4"
        >
          {INSPIRATIONS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-6 sm:h-7 w-auto object-contain transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100"
              />
            </a>
          ))}
        </motion.div>

        {/* ── SECTION: TOOLS & STACK ── */}
        <div className="relative w-full flex items-center justify-center my-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-white/10" />
          </div>
          <div className="relative bg-[#090909] px-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              Tools & Stack
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 w-full px-6 py-4"
        >
          {STACK.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-5.5 sm:h-6.5 w-auto object-contain transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100"
              />
            </a>
          ))}
        </motion.div>

        {/* ── FOOTER NOTE ── */}
        <div className="w-full border-t border-dashed border-white/10 my-10" />

        <div className="text-center font-heading text-xs text-white/30">
          Komorebi is made possible thanks to all mentioned above{" "}
          <a
            href="https://github.com/Jsooonx/komorebi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors duration-300 font-medium inline-flex items-center gap-1 ml-1"
          >
            be a part <span className="text-[10px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
