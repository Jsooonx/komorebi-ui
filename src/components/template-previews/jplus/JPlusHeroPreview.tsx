import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./JPlusHeroPreview.css";

const MEDIA = "https://qclay.design/lovable/codeba/";
const ICONS = "https://qclay.design/lovable/codeba/icons/";
const bgAsset = { url: MEDIA + "Bg.png" };
const macDotUrl = ICONS + "MacDot.svg";
const typeUrl = ICONS + "type.svg";
const imagePlusUrl = ICONS + "image-plus.svg";
const mousePointerUrl = ICONS + "mouse-pointer.svg";
const squareUrl = ICONS + "square.svg";
const plusUrl = ICONS + "plus.svg";
const searchUrl = ICONS + "search.svg";
const srUrl = ICONS + "Sr.svg";
const nmUrl = ICONS + "Nm.svg";
const blueArrowUrl = ICONS + "blueArrow.svg";

function JPlusMark() {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1 60%, #a855f7)" }}>
      <span className="text-white font-semibold text-[17px] tracking-tight relative z-10">J+</span>
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.6), transparent 55%)" }} />
    </div>
  );
}

function ToolIcon({ src, className, delay }: { src: string; className?: string; delay: number }) {
  return (
    <div 
      className={`w-9 h-9 relative bg-white/10 rounded-lg flex items-center justify-center anim-rise ${className ?? ""}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={src} alt="" className="w-5 h-5" />
    </div>
  );
}

function SidebarItem({ icon, label, count, active }: { icon: string; label: string; count?: number; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 h-11 px-3 rounded-lg ${active ? "bg-white/[0.08] outline outline-1 outline-white/5" : ""}`}>
      <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-blue-500" : "bg-white/5"}`}>
        <img src={icon} alt="" className="w-4 h-4" style={active ? undefined : { opacity: 0.7 }} />
      </span>
      <span className={`text-sm flex-1 ${active ? "text-neutral-100 font-medium" : "text-neutral-300 opacity-70"}`}>{label}</span>
      {typeof count === "number" && (
        <span className={`text-xs opacity-40 px-1.5 py-0.5 rounded-full ${active ? "text-neutral-100" : "text-neutral-300"}`}>
          {count}
        </span>
      )}
    </div>
  );
}

export default function JPlusHeroPreview() {
  const [heroReady, setHeroReady] = useState(false);
  const [typedText, setTypedText] = useState("");
  const inputPlaceholder = "Search ChatGPT Plus, Netflix, Canva Pro…";

  useEffect(() => {
    setHeroReady(false);
    const readyTimer = setTimeout(() => setHeroReady(true), 2100);

    // Typewriter search simulation
    let charIdx = 0;
    const typingDelay = setTimeout(() => {
      const interval = setInterval(() => {
        charIdx++;
        setTypedText(inputPlaceholder.slice(0, charIdx));
        if (charIdx >= inputPlaceholder.length) {
          clearInterval(interval);
        }
      }, 55);
      return () => clearInterval(interval);
    }, 2000);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(typingDelay);
    };
  }, []);

  return (
    <div className="jplus-preview w-full h-full p-6 select-none text-left">
      {/* Header */}
      <header className="flex items-center px-5 pt-4">
        <div className="shrink-0 anim-rise flex items-center gap-2.5" style={{ animationDelay: "480ms" }}>
          <JPlusMark />
          <span className="text-[17px] font-semibold text-neutral-100 tracking-tight">JPlus</span>
        </div>
        <nav className="flex items-center gap-7 ml-12">
          {["Products", "Categories", "How it works", "Support"].map((label, i) => (
            <span
              key={label}
              className={`text-[15px] text-neutral-100 ${i === 0 ? "opacity-100 font-medium" : "opacity-50"} hover:opacity-100 transition-opacity anim-rise cursor-pointer`}
              style={{ animationDelay: `${600 + i * 60}ms` }}
            >
              {label}
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[15px] text-neutral-100/70 hover:text-neutral-100 transition-colors anim-rise cursor-pointer" style={{ animationDelay: "840ms" }}>
            Sign in
          </span>
          <button
            className="bg-white text-black rounded-lg py-2 px-5 text-[15px] font-medium hover:bg-neutral-200 transition-colors anim-pop cursor-pointer"
            style={{ animationDelay: "900ms" }}
          >
            Start shopping
          </button>
        </div>
      </header>

      {/* Browser Viewport */}
      <div className="relative mt-4 mx-5 rounded-2xl overflow-hidden anim-rise bg-[#0F0D0F]" style={{ animationDelay: "0ms" }}>
        {/* Top bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/5">
          <div className="flex-1 flex items-center">
            <img src={macDotUrl} alt="" width={60} height={12} className="opacity-80" />
          </div>
          <div className="flex items-center gap-3">
            <ToolIcon src={typeUrl} delay={1140} />
            <ToolIcon src={imagePlusUrl} delay={1200} />
            <ToolIcon src={mousePointerUrl} delay={1260} />
            <ToolIcon src={squareUrl} delay={1320} />
            <ToolIcon src={plusUrl} delay={1380} />
          </div>
          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-[10px] px-4 py-1.5 transition-colors anim-pop" style={{ animationDelay: "1440ms" }}>
              Cart · 0
            </button>
            <div className="flex items-center -space-x-2.5">
              <img src={srUrl} alt="" className="w-9 h-9 relative z-0 border border-stone-950 rounded-full anim-pop" style={{ animationDelay: "1500ms" }} />
              <img src={nmUrl} alt="" className="w-9 h-9 relative z-10 border border-stone-950 rounded-full anim-pop" style={{ animationDelay: "1560ms" }} />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative overflow-hidden mx-4 mb-4 border border-white/10 rounded-2xl flex flex-col items-center text-center pt-10 px-6 pb-6 min-h-[580px]">
          <img src={bgAsset.url} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
          <div className="absolute inset-0 bg-black/70 z-0" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 anim-pop" style={{ animationDelay: "260ms" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-neutral-300">Instant Telegram delivery · 99% uptime</span>
          </div>

          {/* Heading */}
          <h1 className="relative z-10 text-[32px] leading-tight font-medium text-neutral-100 max-w-3xl tracking-tight mb-4 anim-rise" style={{ animationDelay: "300ms" }}>
            Premium digital subscriptions, delivered in seconds.
          </h1>

          {/* Subtitle */}
          <p className="relative z-10 text-sm max-w-xl opacity-60 text-neutral-200 mb-6 anim-rise" style={{ animationDelay: "450ms" }}>
            Shop verified ChatGPT Plus, Netflix, Spotify, Canva Pro and more — with 24/7 support and instant delivery to your Telegram.
          </p>

          {/* Search bar */}
          <div className="relative z-10 w-full max-w-[500px] h-11 mb-8">
            <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-xl flex items-center px-4 gap-3 anim-reveal-right" style={{ animationDelay: "1620ms" }}>
              <img src={searchUrl} alt="" className="w-5 h-5 opacity-60" />
              <input
                type="text"
                readOnly
                placeholder={typedText || "Search..."}
                className="flex-grow bg-transparent text-sm text-neutral-100 placeholder:text-neutral-400 outline-none"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg h-7 px-3 transition-colors shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Catalog panel */}
          <div className="w-full max-w-[1000px] h-[280px] bg-black rounded-2xl border border-white/10 flex overflow-hidden relative z-10 anim-rise" style={{ animationDelay: "2100ms" }}>
            {/* Sidebar */}
            <aside className="w-48 shrink-0 h-full bg-[#070707] border-r border-white/5 flex flex-col p-3">
              <div className="flex items-center gap-4 px-2 py-2 mb-2 text-xs font-medium text-neutral-100">
                <span>Categories</span>
                <span className="opacity-30">Featured</span>
              </div>
              <div className="flex flex-col gap-1">
                <SidebarItem icon={squareUrl} label="AI Tools" active={true} count={12} />
                <SidebarItem icon={imagePlusUrl} label="Streaming" count={8} />
                <SidebarItem icon={typeUrl} label="Productivity" count={6} />
                <SidebarItem icon={mousePointerUrl} label="Design" count={5} />
              </div>
            </aside>

            {/* Dashboard contents */}
            <div className="flex-grow p-4 flex gap-4 overflow-hidden items-start">
              {/* Beige stats card */}
              <motion.div
                className="w-72 h-[240px] relative bg-[#D0C9B9] rounded-xl p-4 flex flex-col justify-between text-[#131113]"
                animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] opacity-45 uppercase tracking-wide">Orders today</span>
                    <span className="text-lg font-bold mt-0.5">1,247 delivered</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] opacity-45 uppercase tracking-wide">Success</span>
                    <span className="text-lg font-bold mt-0.5">99%</span>
                  </div>
                </div>

                {/* Line chart */}
                <div className="h-20 w-full opacity-80">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    <path
                      d="M0,80 Q30,40 60,60 T120,30 T180,50 T240,20 T300,10"
                      fill="none"
                      stroke="#131113"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between w-full text-[10px] opacity-45">
                  <span>Mon</span>
                  <span>Sun</span>
                </div>
              </motion.div>

              {/* Pink card */}
              <motion.div
                className="w-40 h-[240px] rounded-xl flex flex-col justify-center items-center text-center p-4 text-[#1a0508]"
                style={{ background: "linear-gradient(160deg, #ffb6d5 0%, #f77fb0 100%)" }}
                animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-[10px] opacity-50 uppercase tracking-wide">Customers</span>
                <span className="text-3xl font-extrabold my-2">10k+</span>
                <span className="text-[10px] opacity-60">Verified users globally</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
