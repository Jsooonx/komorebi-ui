import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function InteractiveAccordionCard({ minimal = false }: { minimal?: boolean }) {
  const [activeItem, setActiveItem] = useState<string | undefined>("security");

  const accordionItems = [
    {
      id: "security",
      title: "Zero-Trust Security",
      desc: "End-to-end encrypted tunnels with automatic session rotation. Secure your data with multi-region compliance protocols automatically enforced.",
      details: [
        "AES-256 GCM encryption at rest",
        "TLS 1.3 cryptographic protocols",
        "Continuous vulnerability scanning"
      ]
    },
    {
      id: "performance",
      title: "Real-time Synchronization",
      desc: "Distributed replication engines process requests under 50ms. Sync states globally with offline-first local databases.",
      details: [
        "Multi-region master node replication",
        "Delta synchronization algorithms",
        "Automatic network reconnection"
      ]
    },
    {
      id: "ai",
      title: "AI-Powered Orchestration",
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
    <div className="w-full flex flex-col justify-center p-6 h-full">
      <Accordion
        type="single"
        collapsible
        value={activeItem}
        onValueChange={setActiveItem}
        className="space-y-2.5 border-none"
      >
        {accordionItems.map((item) => {
          const isOpen = activeItem === item.id;

          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={`border rounded-md transition-all duration-200 bg-transparent ${
                isOpen 
                  ? "border-white/10 bg-white/[0.01]"
                  : "border-white/[0.03] hover:border-white/10"
              }`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline select-none text-xs font-semibold text-white/90">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2.5"
                >
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Bullet details */}
                  <div className="grid grid-cols-1 gap-1 pl-1">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-white/30">
                        <span className="w-1 h-1 rounded-full bg-white/20" />
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
      className="relative w-full h-[400px] rounded-lg bg-[#0e0e0e] border border-white/5 overflow-hidden flex flex-col select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
