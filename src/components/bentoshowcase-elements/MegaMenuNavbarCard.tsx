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

// ── Card Wrapper ───────────────────────────────────────────────────────────────

export default function MegaMenuNavbarCard({ minimal = false }: { minimal?: boolean }) {
  const [activeTab, setActiveTab] = useState("Home");

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties;

  if (minimal) {
    return (
      <div
        className="w-full h-full flex items-start justify-center pt-5 px-4 select-none"
        style={cssVariables}
      >
        <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[440px] rounded-2xl bg-[#0e0e0e] border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      style={cssVariables}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-60 pointer-events-none" />

      {/* Top: label + navbar stacked right at the top */}
      <div className="relative z-10 w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            Navigation Menu
          </span>
          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
        </div>
        <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Bottom: title */}
      <div className="relative z-10">
        <span className="text-xs text-white/40 tracking-wider uppercase block mb-0.5">
          Interactive navigation
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Mega menu navbar
        </h3>
      </div>
    </div>
  );
}
