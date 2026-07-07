import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Clipboard, Check } from "lucide-react";
import SplitText from "./ui/SplitText";
import JPlusHeroPreview from "./template-previews/jplus/JPlusHeroPreview";
import KubrikHeroPreview from "./template-previews/kubrik/KubrikHeroPreview";
import ShyenHeroPreview from "./template-previews/shyen/ShyenHeroPreview";
import SynergeusHeroPreview from "./template-previews/synergeus/SynergeusHeroPreview";

interface TemplateItem {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  sections: string;
  badgeType: "copy" | "get" | "premium";
  tags: string[];
  prompt: string;
  PreviewComponent: React.ComponentType;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "jplus",
    title: "JPlus - Subscription E-Commerce",
    creator: "E-Commerce",
    creatorAvatar: "/KomorebiLogoUpdate1.png",
    sections: "2 Sections",
    badgeType: "copy",
    tags: ["E-Commerce", "Dark UI", "Subscription", "Subtle Animation"],
    prompt: "Create a premium e-commerce landing page called JPlus for digital subscriptions. The design must be ultra-dark and modern with a browser viewport frame. The header has a JPlus logo, navigation, and 'Start shopping' button. Inside the browser window, display a sidebar listing categories (AI Tools, Streaming, Productivity, Design) and a main content grid. The grid should feature a beige analytics card ('Orders today: 1,247 delivered', 'Success: 99%') with a smooth line chart, and a pink customer card ('10k+ verified users'). Add subtle entrance animations on mount.",
    PreviewComponent: JPlusHeroPreview,
  },
  {
    id: "kubrik",
    title: "Kubrik - B2B AI Widget",
    creator: "AI / SaaS",
    creatorAvatar: "/KomorebiLogoUpdate1.png",
    sections: "6 Sections",
    badgeType: "get",
    tags: ["B2B", "SaaS", "Luxury Tech", "Staggered Text"],
    prompt: "Build a luxury tech landing page based on the Kubrik design system. The page should feature a deep black slate obsidian background (#08090c) and a top header nav-pill with transparent blurs and a glowing integrations badge. The hero has a centered header with staggered typing animations: 'Automating customer delight at scale — is an Algorithm'. On the right, place a side navigation, and at the bottom left, stats about the vision. On the bottom right, display an interactive white 'SDK Integration' card with a 3D organic glossy sphere.",
    PreviewComponent: KubrikHeroPreview,
  },
  {
    id: "shyen",
    title: "Shyen - AI Mental Wellness",
    creator: "AI Wellness",
    creatorAvatar: "/KomorebiLogoUpdate1.png",
    sections: "9 Sections",
    badgeType: "copy",
    tags: ["Healthcare", "Split Screen", "Ambient Video", "Clinician Chat"],
    prompt: "Build a mental wellness AI platform landing page called Shyen. The layout must be a split-screen design. The left column features a dark green-yellow atmospheric blurred lighting gradient, a serif heading 'Your mind never gonna stop.', description lines, and a dark pill-shaped waitlist form. The right column features an ambient video overlay, clinician-designed chat simulation bubbles ('This helped me organize my thoughts...'), Lara Simon's avatar, and green-tinted feature tags ('AI Meditation', 'Full Body syncing', 'AI Data Insights').",
    PreviewComponent: ShyenHeroPreview,
  },
  {
    id: "synergeus",
    title: "Synergeus - AI Fintech Portal",
    creator: "AI Fintech",
    creatorAvatar: "/KomorebiLogoUpdate1.png",
    sections: "10 Sections",
    badgeType: "premium",
    tags: ["Fintech", "Mux Video", "Analytics Overlay", "Luxury Black"],
    prompt: "Build a minimal, dark financial assistant landing page called Synergeus. The hero section has a fullscreen ambient Mux stream video background, a dark linear gradient overlay, and a centered white navigation menu. The headline reads 'Our AI simplify your financial life' in a bold serif display. Below it, place a white rounded 'Start free trial now' CTA. On the right, render a floating glass transaction history card with user picture overlays and automated transaction slides.",
    PreviewComponent: SynergeusHeroPreview,
  },
];

function TemplateCard({ item }: { item: TemplateItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 1400); // 1400px is target preview width
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      toast.success(`${item.title.split(" - ")[0]} Prompt Copied!`, {
        description: "Paste it into Claude, Lovable, or v0 to generate the page.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt.");
    }
  };

  const { PreviewComponent } = item;

  return (
    <div className="flex flex-col bg-[#0f0f12] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all select-none group">
      {/* Visual Live Preview Viewport Mock */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video bg-[#08090c] border-b border-white/5 overflow-hidden"
      >
        <div 
          className="absolute origin-top-left pointer-events-none"
          style={{ 
            width: 1400, 
            height: 800, 
            transform: `scale(${scale})` 
          }}
        >
          <PreviewComponent />
        </div>

        {/* Scaled browser overlay mock dots */}
        <div className="absolute top-3 left-4 flex gap-1.5 z-20">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>

        {/* CTA Button Badge inside Viewport */}
        <div className="absolute top-3 right-4 z-20">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
              copied 
                ? "bg-[#00f5a0]/15 text-[#00f5a0] border border-[#00f5a0]/25" 
                : "bg-white/10 hover:bg-white/20 text-white/80 border border-white/10"
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
            {item.badgeType === "premium" && !copied ? "Get Premium Prompt" : copied ? "Copied" : "Copy Prompt"}
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-5 flex flex-col flex-grow text-left">
        {/* Creator Info */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <img 
            src={item.creatorAvatar} 
            alt={item.creator} 
            className="w-5 h-5 rounded-full border border-white/10"
          />
          <span className="text-[11px] text-white/40 font-medium">{item.creator}</span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="text-[11px] text-white/40 font-mono">{item.sections}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white/95 leading-tight mb-2">
          {item.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
          {item.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] font-medium text-white/50 px-2 py-0.5 rounded bg-white/5 border border-white/[0.03]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplateShowcase() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      id="templates"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="relative z-10 bg-[#07070a] py-24 sm:py-32 px-6 md:px-12 border-t border-white/5 select-none"
    >
      <div className="max-w-[1500px] mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center mb-16 max-w-2xl">
          <div className="mb-6">
            <SplitText
              text="Build entire websites in one prompt."
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-normal text-white leading-[1.2] inline-block"
              tag="h2"
              splitType="words"
              delay={60}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
            />
          </div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-white/50 leading-relaxed font-heading"
          >
            Select a premium template layout, copy its structured AI prompt parameters, and spin up production-ready React pages in Claude, Lovable, or v0.
          </motion.p>
        </div>

        {/* 1 Row Grid of 4 Cards */}
        <motion.div 
          variants={itemVariants}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TEMPLATES.map((item) => (
            <TemplateCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
