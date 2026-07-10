import { useState } from "react";
import { motion } from "framer-motion";
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
import HeaderPageContent from "./HeaderPageContent";

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
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="w-full flex items-center justify-between rounded-2xl bg-black/60 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/[0.08] backdrop-blur-xl px-5 py-2.5">
      {/* Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <SunlightLeafLogo className="w-6 h-6" />
        <span className="text-xs font-semibold tracking-tight font-heading text-white">
          Komorebi
        </span>
      </div>

      {/* Nav */}
      <div className="hidden md:flex items-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .mega-menu-nav [data-state="closed"] {
            animation-duration: 200ms !important;
            --tw-exit-scale: 0.9 !important;
            --tw-exit-opacity: 0 !important;
          }
          .mega-menu-nav [data-state="open"] {
            animation-duration: 200ms !important;
            --tw-enter-scale: 0.9 !important;
          }
        `,
          }}
        />
        <NavigationMenu className="mega-menu-nav">
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

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-heading font-medium hover:bg-white/20 transition-colors cursor-pointer shrink-0"
      >
        Get Started
      </motion.button>
    </div>
  );
}

// ── Mock Website Body Content ──────────────────────────────────────────────────

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
    </div>
  );
}

// ── Card Wrapper ───────────────────────────────────────────────────────────────

export default function MegaMenuNavbarCard({
  minimal = false,
  previewMode = "catalog",
}: {
  minimal?: boolean;
  previewMode?: "catalog" | "fullscreen";
}) {
  const [activeTab, setActiveTab] = useState("Home");

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties;

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#09090b]"
        style={cssVariables}
      >
        <div className="sticky top-4 z-20 w-full flex justify-center px-4 pb-2">
          <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        {previewMode === "fullscreen" ? (
          <HeaderPageContent />
        ) : (
          <div className="min-h-full">
            <MockContent />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[440px] rounded-2xl bg-[#0e0e0e] border border-white/5 overflow-y-auto scrollbar-none flex flex-col select-none group animate-in fade-in duration-500 pt-4"
      style={cssVariables}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-60 pointer-events-none" />

      {/* Sticky floating navbar wrapper (completely transparent backdrop) */}
      <div className="sticky top-4 z-20 w-full flex justify-center px-4 pb-2">
        <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Scrollable body content */}
      <div className="flex-1">
        {/* Top static label/logo (scrolls away) */}
        <div className="px-6 pt-2 flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            Navigation Menu
          </span>
          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
        </div>

        <MockContent />

        {/* Bottom indicator + title inside scroll area */}
        <div className="px-6 pb-6 pt-16 flex items-center justify-between text-[10px] text-white/30 border-t border-white/[0.02] mt-8 bg-black/10">
          <div>
            <span className="text-[10px] text-white/40 tracking-wider uppercase block mb-0.5">
              Interactive navigation
            </span>
            <h3 className="font-sans text-xs font-medium tracking-tight text-white">
              Mega menu navbar
            </h3>
          </div>
          <span>Scroll down inside this card to explore page</span>
        </div>
      </div>
    </div>
  );
}
