import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SunlightLeafLogo } from "../DynamicIsland";

// ── Types ──────────────────────────────────────────────────────────────────────

interface FeatureItem {
  title: string;
  description: string;
  color: string;
}

interface ResourceItem {
  title: string;
  description: string;
}

// ── Static data ────────────────────────────────────────────────────────────────

const FEATURES: FeatureItem[] = [
  {
    title: "Global CDN",
    description: "Deploy to 200+ edge locations worldwide.",
    color: "#E8A969",
  },
  {
    title: "Zero-Trust Security",
    description: "End-to-end encryption by default.",
    color: "#BECB6D",
  },
  { title: "Instant Deploys", description: "Push to live in under 30 seconds.", color: "#E8A969" },
  {
    title: "Live Analytics",
    description: "Real-time performance metrics dashboard.",
    color: "#BECB6D",
  },
];

const RESOURCES: ResourceItem[] = [
  { title: "Documentation", description: "Guides, API references, and examples." },
  { title: "Changelog", description: "What's new in each release." },
  { title: "Status Page", description: "Live uptime and incident reports." },
];

// ── Subcomponents ──────────────────────────────────────────────────────────────

function FeatureCard({ item }: { item: FeatureItem }) {
  return (
    <div className="p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      <p className="text-xs font-medium text-white/90 group-hover:text-white transition-colors">
        {item.title}
      </p>
      <p className="text-[11px] text-white/45 leading-relaxed mt-0.5">{item.description}</p>
    </div>
  );
}

function ResourceRow({ item }: { item: ResourceItem }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      <div>
        <p className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
          {item.title}
        </p>
        <p className="text-[10px] text-white/35 mt-0.5">{item.description}</p>
      </div>
    </div>
  );
}

// ── Navbar Content ─────────────────────────────────────────────────────────────

function NavbarContent({
  activeTab,
  onTabChange,
  isMorphed,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMorphed: boolean;
}) {
  return (
    <div className="inline-flex items-center justify-center rounded-2xl bg-black/60 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/[0.08] backdrop-blur-xl px-4 py-2 mt-3 transition-all duration-300 ease-in-out select-none">
      {/* Brand - CSS Grid 1fr to 0fr transition for exact intrinsic sizing and zero clipping */}
      <div
        className={`grid transition-all duration-300 ease-in-out shrink-0 ${
          isMorphed
            ? "grid-cols-[0fr] opacity-0 pr-0 mr-0 border-r-0 border-transparent pointer-events-none"
            : "grid-cols-[1fr] opacity-100 pr-3.5 mr-1 border-r border-white/10"
        }`}
      >
        <div className="overflow-hidden flex items-center gap-2 shrink-0 pr-0.5">
          <SunlightLeafLogo className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold tracking-tight font-heading text-white whitespace-nowrap">
            Komorebi
          </span>
        </div>
      </div>

      {/* Center Navigation - Anchored right in exact center, never clipped or moved */}
      <div className="flex items-center justify-center shrink-0">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .mega-menu-nav-3 [data-state="closed"] {
            animation-duration: 200ms !important;
            --tw-exit-scale: 0.9 !important;
            --tw-exit-opacity: 0 !important;
          }
          .mega-menu-nav-3 [data-state="open"] {
            animation-duration: 200ms !important;
            --tw-enter-scale: 0.9 !important;
          }
        `,
          }}
        />
        <NavigationMenu className="mega-menu-nav-3">
          <NavigationMenuList className="gap-0">
            {/* Home */}
            <NavigationMenuItem>
              <button
                onClick={() => onTabChange("Home")}
                className={[
                  navigationMenuTriggerStyle(),
                  "!bg-transparent !text-white/60 hover:!text-white hover:!bg-white/5",
                  "!px-3 !py-1.5 !text-xs font-heading font-medium !h-auto transition-colors cursor-pointer",
                  activeTab === "Home" ? "!text-white" : "",
                ].join(" ")}
              >
                Home
              </button>
            </NavigationMenuItem>

            {/* Features dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="!bg-transparent !text-white/60 hover:!text-white hover:!bg-white/5 !px-3 !py-1.5 !text-xs font-heading font-medium !h-auto transition-colors cursor-pointer">
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-2 w-[360px] bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-1">
                    {FEATURES.map((f) => (
                      <FeatureCard key={f.title} item={f} />
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="!bg-transparent !text-white/60 hover:!text-white hover:!bg-white/5 !px-3 !py-1.5 !text-xs font-heading font-medium !h-auto transition-colors cursor-pointer">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-3 w-[260px] bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl">
                  <div className="flex flex-col gap-0.5">
                    {RESOURCES.map((r) => (
                      <ResourceRow key={r.title} item={r} />
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <button
                onClick={() => onTabChange("Pricing")}
                className={[
                  navigationMenuTriggerStyle(),
                  "!bg-transparent !text-white/60 hover:!text-white hover:!bg-white/5",
                  "!px-3 !py-1.5 !text-xs font-heading font-medium !h-auto transition-colors cursor-pointer",
                  activeTab === "Pricing" ? "!text-white" : "",
                ].join(" ")}
              >
                Pricing
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* CTA - CSS Grid 1fr to 0fr transition so Get Started is full width and never clipped */}
      <div
        className={`grid transition-all duration-300 ease-in-out shrink-0 ${
          isMorphed
            ? "grid-cols-[0fr] opacity-0 pl-0 ml-0 border-l-0 border-transparent pointer-events-none"
            : "grid-cols-[1fr] opacity-100 pl-3.5 ml-1 border-l border-white/10"
        }`}
      >
        <div className="overflow-hidden flex items-center justify-end shrink-0 pl-0.5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-heading font-medium hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ── Mock Website Body Content (Same as Navbar 2) ───────────────────────────────

function MockContent() {
  return (
    <div className="px-6 py-8 space-y-8 select-none pointer-events-none">
      {/* Hero */}
      <div className="text-center py-6">
        <h4 className="text-white text-lg font-semibold tracking-tight">Design the Future</h4>
        <p className="text-[11px] text-white/40 mt-1 max-w-xs mx-auto">
          High-performance primitives designed for the modern web applications.
        </p>
      </div>

      {/* Section features */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8A969] mb-1.5" />
          <h5 className="text-[11px] text-white/80 font-medium">Ultra Fast</h5>
          <p className="text-[9px] text-white/30 mt-0.5">
            Sub-millisecond interactive response times.
          </p>
        </div>
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#BECB6D] mb-1.5" />
          <h5 className="text-[11px] text-white/80 font-medium">Safe By Default</h5>
          <p className="text-[9px] text-white/30 mt-0.5">Zero-trust architecture configurations.</p>
        </div>
      </div>

      {/* Dummy text lines to allow scrolling */}
      <div className="space-y-2 pt-2">
        <div className="h-1.5 w-1/3 bg-white/5 rounded" />
        <div className="h-1.5 w-full bg-white/5 rounded" />
        <div className="h-1.5 w-5/6 bg-white/5 rounded" />
        <div className="h-1.5 w-2/3 bg-white/5 rounded" />
      </div>

      <div className="space-y-2 pt-2">
        <div className="h-1.5 w-1/4 bg-white/5 rounded" />
        <div className="h-1.5 w-11/12 bg-white/5 rounded" />
        <div className="h-1.5 w-3/4 bg-white/5 rounded" />
      </div>
    </div>
  );
}

// ── Card Wrapper ───────────────────────────────────────────────────────────────

export default function MegaMenuNavbar3Card({ minimal = false }: { minimal?: boolean }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMorphed, setIsMorphed] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsMorphed(scrollTop > 24);
  };

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties;

  if (minimal) {
    return (
      <div
        onScroll={handleScroll}
        className="w-full h-[400px] bg-[#050506] border border-white/10 rounded-xl overflow-y-auto scrollbar-none select-none relative"
        style={cssVariables}
      >
        <div className="sticky top-0 z-20 w-full flex justify-center">
          <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} isMorphed={isMorphed} />
        </div>
        <MockContent />
        <div className="py-20 text-center text-[10px] text-white/20">End of Page Preview</div>
      </div>
    );
  }

  return (
    <div
      onScroll={handleScroll}
      className="relative w-full h-[440px] rounded-2xl bg-[#050506] border border-white/10 overflow-y-auto scrollbar-none flex flex-col select-none group"
      style={cssVariables}
    >
      {/* Sticky morphing header */}
      <div className="sticky top-0 z-20 w-full flex justify-center">
        <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} isMorphed={isMorphed} />
      </div>

      {/* Main scrolling dummy area */}
      <div className="flex-1">
        <MockContent />

        {/* Footer indicator inside bento to remind scroll action */}
        <div className="px-6 pb-6 pt-16 flex items-center justify-between text-[10px] text-white/30 border-t border-white/[0.02] mt-8 bg-black/10">
          <span>Scroll down inside this card to morph navbar</span>
          <span>Interactive</span>
        </div>
      </div>
    </div>
  );
}
