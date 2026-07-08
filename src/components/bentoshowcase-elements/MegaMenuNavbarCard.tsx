import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Terminal, Activity, ArrowRight, Menu, Globe, Shield, Zap } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function MegaMenuNavbarCard({ minimal = false }: { minimal?: boolean }) {
  const [activeTab, setActiveTab] = useState("Home");

  // Local overrides for shadcn css variables to theme the dropdown viewport
  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Floating Pill Style Navigation Bar */}
      <div className="w-full flex items-center justify-between rounded-2xl bg-black/60 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/5 backdrop-blur-xl px-5 py-2.5">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#E8A969] flex items-center justify-center text-black font-bold text-xs select-none shadow">
            K
          </div>
          <span className="text-xs font-semibold tracking-tight font-heading text-white">
            Komorebi
          </span>
        </div>

        {/* Navigation Menu using Radix Primitives */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-0.5">
              
              {/* Simple Item: Home */}
              <NavigationMenuItem>
                <button
                  onClick={() => setActiveTab("Home")}
                  className={`${navigationMenuTriggerStyle()} !bg-transparent text-white/60 hover:text-white hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors cursor-pointer ${
                    activeTab === "Home" ? "!text-white" : ""
                  }`}
                >
                  Home
                </button>
              </NavigationMenuItem>

              {/* Mega Menu Dropdown: Features */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent text-white/60 hover:text-white hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors gap-1 cursor-pointer">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-[420px] bg-transparent border-0 shadow-none">
                  <div className="grid grid-cols-2 gap-3 select-none">
                    <div className="col-span-2 pb-1 border-b border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase">Products & Services</span>
                      <span className="text-[8px] font-mono text-[#E8A969] animate-pulse">v2.1 updated</span>
                    </div>

                    <div className="group/item flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-[#E8A969]/10 border border-[#E8A969]/20 flex items-center justify-center text-[#E8A969] shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white group-hover/item:text-[#E8A969] transition-colors">Instant Engines</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Supercharged deployment pipelines.
                        </span>
                      </div>
                    </div>

                    <div className="group/item flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white group-hover/item:text-blue-400 transition-colors">Live Telemetry</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Realtime performance tracking data.
                        </span>
                      </div>
                    </div>

                    <div className="group/item flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white group-hover/item:text-purple-400 transition-colors">Obsidian Lock</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          End-to-end security compliance vault.
                        </span>
                      </div>
                    </div>

                    <div className="group/item flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white group-hover/item:text-green-400 transition-colors">Global Edge</span>
                        <span className="text-[10px] text-white/50 leading-normal">
                          Multi-region low-latency static hosting.
                        </span>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Mega Menu Dropdown: Docs */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent text-white/60 hover:text-white hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors gap-1 cursor-pointer">
                  Developers
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-[320px] bg-transparent border-0 shadow-none">
                  <div className="flex flex-col gap-3.5 select-none">
                    <div className="pb-1 border-b border-white/5 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#BECB6D]" />
                      <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase">Reference Guides</span>
                    </div>

                    <div className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <span className="text-xs font-semibold text-white group-hover/item:text-[#BECB6D] transition-colors">CLI Quick Start</span>
                      <span className="text-[10px] text-white/50 leading-normal">
                        Initialize styled workspaces in single step commands.
                      </span>
                    </div>

                    <div className="group/item flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all text-left cursor-pointer">
                      <span className="text-xs font-semibold text-white group-hover/item:text-[#BECB6D] transition-colors">API References</span>
                      <span className="text-[10px] text-white/50 leading-normal">
                        Configure physics bounds and spring constants details.
                      </span>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Simple Item: Pricing */}
              <NavigationMenuItem>
                <button
                  onClick={() => setActiveTab("Pricing")}
                  className={`${navigationMenuTriggerStyle()} !bg-transparent text-white/60 hover:text-white hover:bg-white/5 !px-3 !py-1.5 text-xs font-heading font-medium transition-colors cursor-pointer ${
                    activeTab === "Pricing" ? "!text-white" : ""
                  }`}
                >
                  Pricing
                </button>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow">
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button className="md:hidden p-1.5 hover:bg-white/5 rounded text-white/60 hover:text-white transition-colors cursor-pointer">
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );

  if (minimal) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center p-4 select-none"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      style={cssVariables}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#121212] via-[#E8A969]/5 to-[#121212] opacity-60" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          NAVIGATION MENU
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Center Navbar Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-28">
        {content}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Interactive navigation
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Mega menu navbar
        </h3>
      </div>
    </div>
  );
}
