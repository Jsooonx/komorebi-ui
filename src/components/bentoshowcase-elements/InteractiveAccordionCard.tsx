import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Shield, Sparkles, Zap, Terminal, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveAccordionCard({ minimal = false }: { minimal?: boolean }) {
  const [activeItem, setActiveItem] = useState<string | undefined>("security");

  const accordionItems = [
    {
      id: "security",
      icon: Shield,
      title: "Zero-Trust Security",
      badge: "Enterprise",
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
      accentColor: "#3b82f6",
      desc: "End-to-end encrypted tunnels with automatic session rotation. Secure your data with multi-region compliance protocols automatically enforced.",
      details: [
        "AES-256 GCM encryption at rest",
        "TLS 1.3 cryptographic protocols",
        "Continuous vulnerability scanning"
      ]
    },
    {
      id: "performance",
      icon: Zap,
      title: "Real-time Synchronization",
      badge: "Ultra-Fast",
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30",
      accentColor: "#f59e0b",
      desc: "Distributed replication engines process requests under 50ms. Sync states globally with offline-first local databases.",
      details: [
        "Multi-region master node replication",
        "Delta synchronization algorithms",
        "Automatic network reconnection"
      ]
    },
    {
      id: "ai",
      icon: Sparkles,
      title: "AI-Powered Orchestration",
      badge: "Experimental",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      accentColor: "#a855f7",
      desc: "Heuristics-driven load allocation optimizes server resources. Auto-generate semantic database indexes based on querying habits.",
      details: [
        "LLM context window optimizations",
        "Predictive scaling analytics",
        "Natural language search translation"
      ]
    }
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full flex flex-col h-full justify-between p-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Terminal className="w-4 h-4 text-white/40" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 font-mono">
            Platform Capabilities
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white tracking-tight">
          System Specifications
        </h3>
        <p className="text-[11px] text-white/50 mt-0.5">
          Expand a module to inspect runtime configurations.
        </p>
      </div>

      {/* Accordion container */}
      <div className="my-5 flex-1 flex flex-col justify-center">
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={setActiveItem}
          className="space-y-2.5 border-none"
        >
          {accordionItems.map((item) => {
            const Icon = item.icon;
            const isOpen = activeItem === item.id;

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`border rounded-xl bg-white/[0.01] transition-all duration-300 ${
                  isOpen 
                    ? `bg-gradient-to-r ${item.color} ${item.borderColor}`
                    : "border-white/[0.03] hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline select-none">
                  <div className="flex items-center justify-between w-full pr-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-black/45 border border-white/[0.06] ${item.iconColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-white/90">
                        {item.title}
                      </span>
                    </div>
                    <span className={`text-[8px] font-mono font-medium px-1.5 py-0.5 rounded-full border bg-black/40 ${
                      isOpen ? `${item.borderColor} ${item.iconColor}` : "border-white/5 text-white/30"
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <p className="text-[11px] text-white/60 leading-relaxed pl-1">
                      {item.desc}
                    </p>
                    
                    {/* Bullet details */}
                    <div className="grid grid-cols-1 gap-1.5 pl-1.5">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] text-white/40">
                          <div className={`w-3.5 h-3.5 rounded-full bg-black/30 flex items-center justify-center border border-white/5`}>
                            <Check className={`w-2 h-2 ${item.iconColor}`} />
                          </div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Footer status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] text-white/35 font-mono select-none">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          All nodes operational
        </span>
        <span className="hover:text-white/60 transition-colors cursor-pointer">
          Logs & Metrics &rarr;
        </span>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#0e0e0e]"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] rounded-2xl bg-[#0e0e0e] border border-white/5 overflow-hidden flex flex-col select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
