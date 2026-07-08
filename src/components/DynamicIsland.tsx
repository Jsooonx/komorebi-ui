import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Command, Search, CornerDownLeft, Sparkles, ChevronDown } from "lucide-react";
import TextRoll from "./ui/TextRoll";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

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
      onClick={handleScroll}
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
          
          {/* Navigation Menu (Hidden on small screens) */}
          <div className="hidden lg:block text-moss-green">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                
                {/* Home (Static Link) */}
                <NavigationMenuItem>
                  <Link to="/" className={`${navigationMenuTriggerStyle()} !bg-transparent text-moss-green/75 hover:text-moss-green hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors cursor-pointer`}>
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Components (Dropdown) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent text-moss-green/75 hover:text-moss-green hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors gap-1 cursor-pointer">
                    Components
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 w-[420px] bg-[#0c0c0e]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-3 select-none">
                      <div className="col-span-2 pb-1 border-b border-white/5">
                        <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase">Featured Library</span>
                      </div>
                      
                      <Link 
                        to="/components" 
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover/item:text-[#E8A969] transition-colors">Hover Members</span>
                          <span className="text-[8px] bg-[#E8A969]/10 text-[#E8A969] px-1.5 py-0.5 rounded-full font-mono uppercase">Pop</span>
                        </div>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Staggered member avatar stack with tooltip titles.
                        </span>
                      </Link>

                      <Link 
                        to="/components" 
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover/item:text-[#E8A969] transition-colors">Dynamic Island</span>
                          <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded-full font-mono uppercase">Morph</span>
                        </div>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Interactive Apple-style notification pill with 11 states.
                        </span>
                      </Link>

                      <Link 
                        to="/components" 
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover/item:text-[#E8A969] transition-colors">WebGL Dither</span>
                          <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded-full font-mono uppercase">Shader</span>
                        </div>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Retro-dithered image visualizer running in WebGL.
                        </span>
                      </Link>

                      <Link 
                        to="/components" 
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover/item:text-[#E8A969] transition-colors">View Gallery</span>
                          <Sparkles className="w-3 h-3 text-[#BECB6D] animate-pulse" />
                        </div>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Explore our full library of interactive workspace widgets.
                        </span>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Templates (Dropdown) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent text-moss-green/75 hover:text-moss-green hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors gap-1 cursor-pointer">
                    Templates
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 w-[320px] bg-[#0c0c0e]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-3 select-none">
                      <div className="pb-1 border-b border-white/5">
                        <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase">Pre-Built Layouts</span>
                      </div>

                      <a 
                        href="#templates" 
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <span className="text-xs font-semibold text-white group-hover/item:text-[#BECB6D] transition-colors">JPlus e-Commerce</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Dark luxury dashboard layout and categories sidebar.
                        </span>
                      </a>

                      <a 
                        href="#templates" 
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                      >
                        <span className="text-xs font-semibold text-white group-hover/item:text-[#BECB6D] transition-colors">Aura AI Obsidian</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          High-end B2B AI chat interface with organic glossy sphere.
                        </span>
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Playground (Scroll Link) */}
                <NavigationMenuItem>
                  <a 
                    href="#showcase" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`${navigationMenuTriggerStyle()} !bg-transparent text-moss-green/75 hover:text-moss-green hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors cursor-pointer`}
                  >
                    Playground
                  </a>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Fallback Simple Navigation Links (Shown on medium screens, hidden on large desktop) */}
          <nav className="hidden sm:flex lg:hidden items-center gap-5 text-xs font-heading font-medium text-moss-green/75">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#showcase">Playground</NavLink>
            <NavLink to="/components">Components</NavLink>
            <NavLink href="#templates">Templates</NavLink>
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
