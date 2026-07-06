import { motion } from "framer-motion";
import { ArrowDown, Copy, Check, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import SplitText from "./ui/SplitText";
import DarkVeil from "./ui/DarkVeil";
import TextRoll from "./ui/TextRoll";
import RotatingText from "./ui/RotatingText";

// Brand Logo
import { SunlightLeafLogo } from "./DynamicIsland";

const COMPAT_BRANDS = [
  { domain: "lovable.dev", name: "Lovable" },
  { domain: "claude.ai", name: "Claude Code" },
  { domain: "v0.dev", name: "v0.dev" },
  { domain: "stackblitz.com", name: "Bolt.new" },
  { domain: "antigravity.google", name: "Antigravity" },
  { domain: "manus.space", name: "Manus" },
  { domain: "cursor.com", name: "Cursor" },
  { domain: "kimi.ai", name: "Kimi" }
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const commandText = "npx komorebi-ui init";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Trigger canvas-confetti with brand colors
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#BECB6D", "#E8A969", "#112115", "#EAF1C1"]
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-warm-cream flex flex-col justify-between py-16 px-6 md:px-12 select-none">
      
      {/* ── AMBIENT WEBGL DARK VEIL BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.03}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={6.0}
          warpAmount={0.06}
          resolutionScale={0.85}
        />
      </div>

      {/* Smooth transition gradient to Page 2 (Matte Black) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-warm-cream via-warm-cream/50 to-transparent pointer-events-none z-10" />

      {/* Spacer to push content below Dynamic Island */}
      <div className="h-20 sm:h-24 md:h-28 w-full shrink-0"></div>

      {/* ── HERO CONTENT ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center flex-grow text-center max-w-4xl mx-auto w-full my-auto"
      >


        {/* Large Editorial Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-moss-green font-serif text-6xl sm:text-7xl md:text-8xl leading-[1.2] tracking-tight"
        >
          <span className="block font-normal overflow-hidden py-1">
            <RotatingText
              texts={["Light", "Shadow", "Organic"]}
              mainClassName="text-moss-green font-serif font-normal justify-center overflow-hidden py-1"
              staggerFrom="first"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-2"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
            />
          </span>
          <span className="block font-normal">
            <SplitText
              text="flow for"
              className="text-moss-green font-serif font-normal"
              delay={200}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0, delay: 0.6 } as any}
            />{" "}
            <SplitText
              text="modern webs."
              className="font-normal text-sun-gold underline decoration-sage-green decoration-2 underline-offset-8 inline-block"
              delay={200}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0, delay: 1.2 } as any}
            />
          </span>
        </motion.h1>




        {/* CTA Section: CLI Command & Browse */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* CLI Command Pill (Inspired by Skiper UI) */}
          <div 
            onClick={handleCopy}
            className="group flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-white/5 text-moss-green border border-white/10 shadow-lg cursor-pointer hover:bg-white/10 active:scale-[0.98] transition-all w-full sm:w-auto font-mono text-sm max-w-[310px]"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sage-green shrink-0" />
              <span className="select-all">{commandText}</span>
            </div>
            <button 
              className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-moss-green/80 group-hover:text-moss-green shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-sage-green" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Browse Components Button */}
          <motion.a
            href="#showcase"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-moss-green hover:bg-moss-green/90 text-warm-cream border border-moss-green/10 font-sans font-medium text-sm transition-colors w-full sm:w-auto max-w-[310px] shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <TextRoll hovered={btnHovered}>Browse Components</TextRoll>
            <ArrowDown className="w-4 h-4 text-sun-gold animate-bounce" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── FOOTER BRANDS & METADATA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between pt-8 mt-12 gap-6"
      >
        {/* Left: compatibility list marquee */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-moss-green/50">
            COMPATIBLE WITH
          </span>
          <div className="relative w-[340px] sm:w-[480px] h-12 overflow-hidden">
            {/* Left Edge Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-warm-cream to-transparent pointer-events-none z-10" />
            {/* Right Edge Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-warm-cream to-transparent pointer-events-none z-10" />
            
            <div className="flex items-center animate-marquee gap-10 w-max shrink-0 h-12">
              {COMPAT_BRANDS.concat(COMPAT_BRANDS).map((brand, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
                >
                  <img
                    src={`https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`}
                    alt={brand.name}
                    className={`h-7 w-auto object-contain grayscale group-hover:grayscale-0 opacity-45 group-hover:opacity-100 transition-all duration-300 shrink-0 ${
                      brand.name === "v0.dev" ? "invert" : "mix-blend-multiply"
                    }`}
                  />
                  <span className="font-heading text-xs font-semibold text-moss-green/55 group-hover:text-moss-green transition-colors tracking-wide select-none">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>



    </section>
  );
}
