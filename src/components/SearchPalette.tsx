import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Terminal, X, CornerDownLeft } from "lucide-react";
import { COMPONENTS_MANIFEST, type ComponentManifestItem } from "@/lib/components-manifest";

export default function SearchPalette({
  initialOpen = false,
  onInitialOpenHandled,
}: {
  initialOpen?: boolean;
  onInitialOpenHandled?: () => void;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-palette", handleCustomOpen);
    };
  }, []);

  // Filter components based on search query
  const filtered = COMPONENTS_MANIFEST.filter((item) => {
    const term = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
  });

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!initialOpen) {
      return;
    }

    setIsOpen(true);
    onInitialOpenHandled?.();
  }, [initialOpen, onInitialOpenHandled]);

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  const handleSelect = (item: ComponentManifestItem) => {
    setIsOpen(false);
    navigate({ to: `/components/${item.id}` });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-warm-cream/60 backdrop-blur-md"
          />

          {/* Search Card Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative w-full max-w-2xl bg-warm-cream/95 border border-moss-green/10 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl z-10 flex flex-col max-h-[60vh]"
          >
            {/* Search Input Box */}
            <div className="relative border-b border-moss-green/10 flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-moss-green/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search animations, prompts, categories..."
                className="w-full pl-14 pr-24 py-5 bg-transparent text-moss-green text-lg font-heading font-medium focus:outline-none placeholder-moss-green/30"
              />

              {/* Keyboard indicators */}
              <div className="absolute right-5 flex items-center gap-2 pointer-events-none">
                <span className="text-[10px] font-mono font-medium border border-moss-green/20 px-1.5 py-0.5 rounded text-moss-green/50 bg-moss-green/5 uppercase tracking-wider">
                  ESC
                </span>
              </div>
            </div>

            {/* Results Pane */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-1 max-h-[40vh] custom-scrollbar">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-white/10 text-moss-green shadow-md translate-x-1"
                          : "hover:bg-white/5 text-moss-green/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl transition-colors ${
                            isSelected
                              ? "bg-white/10 text-sun-gold"
                              : "bg-white/5 text-moss-green/50"
                          }`}
                        >
                          {item.category === "Living Data" ? (
                            <Sparkles className="w-4.5 h-4.5" />
                          ) : (
                            <Terminal className="w-4.5 h-4.5" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold tracking-tight font-heading">
                            {item.name}
                          </span>
                          <span
                            className={`text-[11px] font-medium font-mono uppercase tracking-wider mt-0.5 ${
                              isSelected ? "text-moss-green/60" : "text-moss-green/40"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Action trigger icon */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1 text-[11px] font-mono text-sun-gold bg-white/10 px-2 py-1 rounded-lg"
                        >
                          <span>Open component</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <X className="w-8 h-8 text-moss-green/30 stroke-1 mb-2" />
                  <span className="text-sm font-heading font-medium text-moss-green/70">
                    No components found matching "{query}"
                  </span>
                  <p className="text-xs text-moss-green/45 mt-1 max-w-xs">
                    Try searching for terms like "marquee", "dither", "border beam", or "equalizer".
                  </p>
                </div>
              )}
            </div>

            {/* command footer */}
            <div className="bg-moss-green/5 border-t border-moss-green/10 px-5 py-3 flex items-center justify-between text-[11px] font-heading text-moss-green/50 select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5">
                  <span className="font-semibold text-moss-green">↑↓</span> to navigate
                </span>
                <span className="w-[1px] h-3.5 bg-moss-green/10"></span>
                <span className="flex items-center gap-0.5">
                  <span className="font-semibold text-moss-green">Enter</span> to select
                </span>
              </div>
              <div className="font-serif italic text-xs">Komorebi Command Center</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
