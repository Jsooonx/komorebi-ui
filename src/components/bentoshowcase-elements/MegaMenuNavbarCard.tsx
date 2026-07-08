import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Zap, ArrowRight, Terminal, Activity } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// ── Types ──────────────────────────────────────────────────────────────────────

interface FeatureItem {
  title: string;
  description: string;
  color: string;
  icon: "globe" | "shield" | "zap" | "activity";
}

interface ResourceItem {
  title: string;
  description: string;
}

// ── Static data (no JSX at module scope) ───────────────────────────────────────

const FEATURES: FeatureItem[] = [
  { icon: "globe",    title: "Global CDN",          description: "Deploy to 200+ edge locations worldwide.", color: "#E8A969" },
  { icon: "shield",   title: "Zero-Trust Security", description: "End-to-end encryption by default.",         color: "#BECB6D" },
  { icon: "zap",      title: "Instant Deploys",     description: "Push to live in under 30 seconds.",         color: "#E8A969" },
  { icon: "activity", title: "Live Analytics",      description: "Real-time performance metrics dashboard.",  color: "#BECB6D" },
];

const RESOURCES: ResourceItem[] = [
  { title: "Documentation", description: "Guides, API references, and examples." },
  { title: "Changelog",     description: "What's new in each release." },
  { title: "Status Page",   description: "Live uptime and incident reports." },
];

// ── Icon resolver (JSX inside function scope) ──────────────────────────────────

function FeatureIcon({ type, color }: { type: FeatureItem["icon"]; color: string }) {
  const cls = `w-4 h-4`;
  const style = { color };
  switch (type) {
    case "globe":    return <Globe    className={cls} style={style} />;
    case "shield":   return <Shield   className={cls} style={style} />;
    case "zap":      return <Zap      className={cls} style={style} />;
    case "activity": return <Activity className={cls} style={style} />;
  }
}

// ── Subcomponents ──────────────────────────────────────────────────────────────

function FeatureCard({ item }: { item: FeatureItem }) {
  return (
    <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="mt-0.5 shrink-0">
        <FeatureIcon type={item.icon} color={item.color} />
      </div>
      <div>
        <p className="text-xs font-medium text-white/90 group-hover:text-white transition-colors">
          {item.title}
        </p>
        <p className="text-[11px] text-white/45 leading-relaxed mt-0.5">
          {item.description}
        </p>
      </div>
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
      <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
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
        <div className="w-6 h-6 rounded-md bg-[#E8A969] flex items-center justify-center text-black font-bold text-[10px] select-none shadow">
          K
        </div>
        <span className="text-xs font-semibold tracking-tight font-heading text-white">
          Komorebi
        </span>
      </div>

      {/* Nav */}
      <div className="hidden md:flex items-center">
        <NavigationMenu>
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
                <div className="p-3 w-[380px] bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl">
                  <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-white/5">
                    <span className="text-[10px] font-mono text-white/35 uppercase tracking-widest">Platform</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#E8A969] font-medium">
                      <Sparkles className="w-3 h-3" />
                      New in v2.0
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {FEATURES.map((f) => <FeatureCard key={f.title} item={f} />)}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 px-2">
                    <NavigationMenuLink asChild>
                      <button className="flex items-center gap-1.5 text-[11px] text-[#BECB6D] hover:text-white transition-colors font-medium cursor-pointer">
                        <Terminal className="w-3 h-3" />
                        View all features
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </NavigationMenuLink>
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
                    {RESOURCES.map((r) => <ResourceRow key={r.title} item={r} />)}
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8A969]/15 border border-[#E8A969]/25 text-[#E8A969] text-xs font-heading font-medium hover:bg-[#E8A969]/25 transition-colors cursor-pointer shrink-0"
      >
        <Sparkles className="w-3 h-3" />
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
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Navigation Menu</span>
          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
        </div>
        <NavbarContent activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Bottom: title */}
      <div className="relative z-10">
        <span className="text-xs text-white/40 tracking-wider uppercase block mb-0.5">Interactive navigation</span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">Mega menu navbar</h3>
      </div>
    </div>
  );
}
