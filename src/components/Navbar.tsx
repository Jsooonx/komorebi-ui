import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  targetId: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", targetId: "hero" },
  { label: "Playground", targetId: "playground" },
  { label: "Components", targetId: "bento-showcase" }
];

export default function Navbar() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show/Hide on Scroll & Track Active Section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hiding/Showing logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Track active section based on viewport scroll position
      const scrollPos = currentScrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.targetId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("open-search-palette"));
  };

  return (
    <>
      <motion.nav
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1200px] h-14 bg-black/35 backdrop-blur-xl border border-white/5 rounded-full px-6 flex items-center justify-between shadow-2xl z-50 select-none"
      >
        {/* Left Side: Logo */}
        <div 
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8A969] to-[#c78848] flex items-center justify-center shadow-lg shadow-[#E8A969]/10">
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-serif text-lg text-white font-medium tracking-tight">
            Komorebi <span className="text-[#E8A969]">UI</span>
          </span>
        </div>

        {/* Center: Desktop Navigation Items */}
        <div className="hidden md:flex items-center gap-1.5 relative h-full py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <div
                key={item.targetId}
                onMouseEnter={() => setHoveredTab(item.targetId)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => handleNavClick(item.targetId)}
                className="relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase cursor-pointer transition-colors z-10"
                style={{
                  color: isActive ? "#E8A969" : hoveredTab === item.targetId ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)"
                }}
              >
                {/* Sliding highlight indicator */}
                <AnimatePresence>
                  {hoveredTab === item.targetId && (
                    <motion.div
                      layoutId="navbar-hover-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </AnimatePresence>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right Side: Command/Search Shortcut */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
          >
            <Search className="w-3.5 h-3.5 text-white/40 group-hover:text-[#E8A969] transition-colors" />
            <span className="hidden sm:inline text-[9px] font-mono text-white/30 tracking-widest uppercase">
              Search...
            </span>
            <span className="hidden sm:inline text-[9px] font-mono bg-white/10 text-white/50 px-1 py-0.5 rounded leading-none">
              ⌘K
            </span>
          </button>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white/60" />
            ) : (
              <Menu className="w-5 h-5 text-white/60" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-6 right-6 bg-black/95 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex flex-col gap-4 shadow-3xl z-40 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId;
                return (
                  <div
                    key={item.targetId}
                    onClick={() => handleNavClick(item.targetId)}
                    className={`px-4 py-3 rounded-xl font-mono text-sm font-semibold tracking-wider uppercase transition-colors ${
                      isActive 
                        ? "bg-[#E8A969]/10 text-[#E8A969] border border-[#E8A969]/20" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
