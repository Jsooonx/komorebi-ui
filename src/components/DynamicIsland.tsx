import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Command, Search, CornerDownLeft, Sparkles } from "lucide-react";
import TextRoll from "./ui/TextRoll";

// Sunlight Leaf Logo
export function SunlightLeafLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img 
      src="/KomorebiLogoUpdate1_transparent.png" 
      alt="Komorebi UI" 
      className={`${className} object-contain rounded`}
    />
  );
}

function NavLink({ to, href, children }: { to?: string; href?: string; children: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const content = <TextRoll hovered={isHovered}>{children}</TextRoll>;
  const baseClass = "hover:text-sun-gold transition-colors cursor-pointer flex items-center";

  if (to) {
    return (
      <Link 
        to={to} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        className={baseClass}
      >
        {content}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={baseClass}
    >
      {content}
    </a>
  );
}

export default function DynamicIsland() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailRoute = location.pathname.startsWith("/components/");
  
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  // Parse active component ID from route if applicable
  useEffect(() => {
    if (isDetailRoute) {
      const parts = location.pathname.split("/");
      const id = parts[parts.length - 1] || parts[parts.length - 2];
      const formatted = id
        ? id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : "Component";
      setActiveComponentId(formatted);
    } else {
      setActiveComponentId(null);
    }
  }, [location.pathname, isDetailRoute]);

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search-palette"));
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-8">
      {/* Skiper-style Floating Pill Navbar */}
      <div 
        className="pointer-events-auto w-full max-w-5xl flex items-center justify-between rounded-2xl bg-warm-cream/80 text-moss-green shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/5 border-t-white/15 backdrop-blur-xl px-6 py-3"
      >
        
        {/* LEFT SIDE: Brand Logo & Title (or Back Button in Details) */}
        <div className="flex items-center gap-3">
          {isDetailRoute ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate({ to: "/" })}
                className="p-1.5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer text-moss-green/80 hover:text-moss-green flex items-center justify-center"
                title="Back to Gallery"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
            </div>
          ) : null}

          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <SunlightLeafLogo className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-tight font-heading text-moss-green">
              Komorebi UI
            </span>
          </Link>
        </div>

        {/* MIDDLE/RIGHT SIDE: Navigation & Actions */}
        <div className="flex items-center gap-6">
          
          {/* Navigation Links (Hidden on small screens) */}
          <nav className="hidden sm:flex items-center gap-5 text-xs font-heading font-medium text-moss-green/75">
            <NavLink to="/">Home</NavLink>
            <NavLink href="#showcase">Showcase</NavLink>
            <NavLink href="#about">Concept</NavLink>
          </nav>

          <div className="w-[1px] h-4 bg-white/20 hidden sm:block"></div>

          {/* Action triggers: Search button & optional status */}
          <div className="flex items-center gap-3">
            {/* Skiper-style Search command button */}
            <button
              onClick={triggerSearch}
              className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-medium text-moss-green/80 hover:text-moss-green cursor-pointer transition-all active:scale-[0.98]"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-moss-green/60" />
              <span className="text-moss-green/70">Search</span>
              <span className="flex items-center justify-center border border-white/10 w-5 h-5 rounded bg-white/5 ml-1.5 shrink-0">
                <Command className="w-3 h-3 text-sun-gold" />
              </span>
            </button>

            {isDetailRoute && activeComponentId && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl border border-sun-gold/20 bg-sun-gold/5 text-[10px] font-mono font-medium text-sun-gold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{activeComponentId}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
