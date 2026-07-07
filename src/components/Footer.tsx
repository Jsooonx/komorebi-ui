import { motion } from "framer-motion";
import { Contrast } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const footerNavigation = {
    explore: [
      { name: "Terminal Playground", href: "#showcase" },
      { name: "Bento Components", href: "#bento-showcase" },
      { name: "Template Showcase", href: "#template-showcase" },
      { name: "CLI Tooling", href: "#" }
    ],
    components: [
      { name: "Attractor Field", href: "#bento-showcase" },
      { name: "Audio Equalizer", href: "#bento-showcase" },
      { name: "Pipeline Stepper", href: "#bento-showcase" },
      { name: "Holographic Terminal", href: "#bento-showcase" }
    ],
    templates: [
      { name: "Aura AI Website", href: "#template-showcase" },
      { name: "Showcase Queue", href: "#template-showcase" },
      { name: "Coming Soon", href: "#template-showcase" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Status Page", href: "#" },
      { name: "GitHub Repository", href: "https://github.com/Jsooonx/komorebi-ui" },
      { name: "Component Code", href: "#" }
    ],
    company: [
      { name: "Overview", href: "#" },
      { name: "Design System", href: "#" },
      { name: "Brand Identity", href: "#" },
      { name: "Contact Team", href: "#" }
    ],
    social: [
      { name: "X (Twitter)", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "GitHub", href: "https://github.com/Jsooonx/komorebi-ui" }
    ]
  };

  const handleThemeToggle = () => {
    toast.message("Color theme switch", {
      description: "You're already experiencing our premium dark mode interface.",
    });
  };

  return (
    <footer className="relative z-10 bg-[#000] border-t border-white/5 py-24 px-6 md:px-12 flex flex-col items-center select-none antialiased">
      <div className="w-full max-w-[1200px]">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Explore
            </h4>
            <ul className="space-y-4">
              {footerNavigation.explore.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Components
            </h4>
            <ul className="space-y-4">
              {footerNavigation.components.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Templates
            </h4>
            <ul className="space-y-4">
              {footerNavigation.templates.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Resources
            </h4>
            <ul className="space-y-4">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6 */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
              Social
            </h4>
            <ul className="space-y-4">
              {footerNavigation.social.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-[11px] font-sans text-white/50 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 mt-20 border-t border-white/5">
          {/* Copyright text */}
          <span className="text-[11px] font-sans text-white/40">
            &copy; 2026 Komorebi UI, Inc. All rights reserved.
          </span>

          {/* Metadata operational & theme switch */}
          <div className="flex items-center gap-5">
            {/* Operational systems status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BECB6D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BECB6D]"></span>
              </span>
              <span className="text-[11px] font-sans text-white/60">
                All systems operational
              </span>
            </div>

            {/* Premium Theme Switch Button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className="flex items-center justify-center w-7 h-7 bg-black border border-white/10 hover:border-white/20 rounded-md transition-colors cursor-pointer focus:outline-none"
            >
              <Contrast className="w-3.5 h-3.5 text-white/60 hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
