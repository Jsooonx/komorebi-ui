import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  Search, 
  Sparkles, 
  Terminal, 
  Check, 
  Copy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Cpu,
  Layers,
  MousePointer,
  Compass,
  Layout,
  BookOpen
} from "lucide-react";
import { COMPONENTS_DATA, ComponentItem } from "../lib/components-data";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
  meta: () => [
    { title: "Components Catalog - Komorebi UI" },
    { name: "description", content: "Explore the complete library of custom, high-fidelity components and interactive canvases on Komorebi UI." }
  ]
});

// Category Icon Mapping helper
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "visuals":
      return <Cpu className="w-4 h-4" />;
    case "interactions":
      return <MousePointer className="w-4 h-4" />;
    case "canvas":
      return <Layers className="w-4 h-4" />;
    case "navigation":
      return <Compass className="w-4 h-4" />;
    case "reveal":
      return <Layout className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function ComponentCard({ item, isBackNavigation }: { item: ComponentItem; isBackNavigation?: boolean }) {
  const [copiedCli, setCopiedCli] = useState(false);
  const PreviewComp = item.component;
  const navigate = useNavigate();
  const [pointerCoords, setPointerCoords] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setPointerCoords({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const diffX = Math.abs(e.clientX - pointerCoords.x);
    const diffY = Math.abs(e.clientY - pointerCoords.y);
    if (diffX < 6 && diffY < 6) {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("input") || target.closest("a")) {
        return;
      }
      // Set flag to skip entrance staggers on return/back navigation
      sessionStorage.setItem("komorebi_from_catalog", "true");
      navigate({ to: "/components/$id", params: { id: item.id } });
    }
  };

  const handleCopyCli = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cli = item.cliCommand || `npx komorebi-ui add ${item.id}`;
    try {
      await navigator.clipboard.writeText(cli);
      setCopiedCli(true);
      toast.success(`${item.name} CLI Command Copied!`);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch (err) {
      toast.error("Failed to copy CLI command.");
    }
  };

  const getIdxStr = () => {
    const idx = COMPONENTS_DATA.findIndex((c) => c.id === item.id);
    return idx >= 0 ? `komorebi${String(idx + 1).padStart(2, '0')}` : item.id;
  };

  return (
    <motion.div 
      variants={isBackNavigation ? undefined : itemVariants} 
      className={item.gridClass || ""}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="group flex flex-col bg-[#0c0c0e] border border-white/[0.04] hover:border-white/10 rounded-2xl overflow-hidden p-4 select-none cursor-pointer relative transition-all duration-300 h-full"
      >
        {/* Main Viewport Area */}
        <div className={`relative w-full rounded-xl bg-black border border-white/5 overflow-hidden flex items-center justify-center transition-colors ${item.viewportHeightClass || "h-[180px]"}`}>
          {/* Mock Browser Dots */}
          <div className="absolute top-2.5 left-3 flex gap-1 z-15">
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>



          {/* Actual component preview rendering */}
          <div className="w-full h-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity overflow-hidden">
            <PreviewComp minimal={true} />
          </div>
        </div>

        {/* Footer text row */}
        <div className="flex items-center justify-between mt-3.5 px-1 pb-1">
          <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
            {item.name}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/35 group-hover:text-white/60 transition-colors">
            <span>{getIdxStr()}</span>
            {item.isNew && (
              <span className="text-[9px] uppercase tracking-wider bg-[#E8A969]/10 border border-[#E8A969]/20 px-1.5 py-0.5 rounded text-[#E8A969] ml-1">New</span>
            )}
            <span className="text-white/40 group-hover:translate-x-0.5 transition-transform ml-1">↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComponentsIndex() {
  const [isBackNavigation] = useState(() => {
    if (typeof window !== "undefined") {
      const fromCatalog = sessionStorage.getItem("komorebi_from_catalog");
      if (fromCatalog === "true") {
        sessionStorage.removeItem("komorebi_from_catalog");
        return true;
      }
    }
    return false;
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCli, setCopiedCli] = useState<string | null>(null);

  // Group components and count totals
  const categories = ["All", ...Array.from(new Set(COMPONENTS_DATA.map(c => c.category)))];

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return COMPONENTS_DATA.length;
    return COMPONENTS_DATA.filter(c => c.category === cat).length;
  };

  const filteredComponents = COMPONENTS_DATA.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCli = async (e: React.MouseEvent, item: ComponentItem) => {
    e.preventDefault();
    e.stopPropagation();
    const cli = item.cliCommand || `npx komorebi-ui add ${item.id}`;
    try {
      await navigator.clipboard.writeText(cli);
      setCopiedCli(item.id);
      toast.success(`${item.name} CLI Command Copied!`);
      setTimeout(() => setCopiedCli(null), 2000);
    } catch (err) {
      toast.error("Failed to copy CLI command.");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("komorebi_visited_index", "true");
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col select-none antialiased">
      
      {/* ── TOP HEADER / NAV BAR ── */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-40 bg-[#090909]/85 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <img 
              src="/KomorebiLogoUpdate1_transparent.png" 
              alt="Komorebi UI" 
              className="w-6 h-6 object-contain rounded"
            />
            <span className="text-sm font-semibold tracking-tight font-heading">
              Komorebi UI
            </span>
          </Link>
          <ChevronRight className="w-4 h-4 text-white/20" />
          <span className="text-xs font-medium text-white/40 font-mono">Components</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link 
            to="/"
            className="text-xs font-medium text-white/60 hover:text-white transition-all flex items-center gap-1.5"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      {/* ── MAIN CONTENT SIDEBAR LAYOUT ── */}
      <div className="flex-1 flex pt-16 relative w-full gap-0">
        
        {/* LEFT SIDEBAR: Categories selector list (Aceternity style) - Pinned to left edge */}
        <aside className="hidden lg:flex w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 pt-10 pb-8 flex-col justify-between border-r border-white/5 overflow-hidden pl-6 md:pl-12 pr-6">
          <div className="space-y-8 min-w-[200px]">
            <div className="flex items-center gap-2 px-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80">Filter Categories</h3>
            </div>

            <nav className="space-y-1.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition-all group cursor-pointer ${
                      isActive 
                        ? "bg-[#E8A969]/10 border-[#E8A969]/30 text-[#E8A969]" 
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? "text-[#E8A969]" : "text-white/40 group-hover:text-white/60"}`}>
                        {getCategoryIcon(cat)}
                      </span>
                      <span className="text-xs font-medium">{cat}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                      isActive ? "bg-[#E8A969]/20 text-[#E8A969]" : "bg-white/5 text-white/40"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick installation tip card */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 min-w-[200px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#BECB6D]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60">Developer CLI</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Initialize the styling system and dependencies in one step:
            </p>
            <div className="flex items-center justify-between gap-2 bg-black/60 border border-white/5 rounded-lg px-3 py-1.5 font-mono text-[9px] text-[#BECB6D]">
              <span>npx komorebi-ui init</span>
              <button 
                onClick={async () => {
                  await navigator.clipboard.writeText("npx komorebi-ui init");
                  toast.success("Init command copied!");
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT AREA: Header, Search, Grid lists */}
        <main className="flex-1 pt-10 pb-24 overflow-hidden flex flex-col px-6 md:px-12 lg:pl-8 lg:pr-12">
          
          {/* Header titles */}
          <div className="mb-10 text-left">
            <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
              Explore Components
            </h1>
            <p className="text-sm text-white/50 leading-relaxed max-w-2xl font-heading">
              A curated catalog of premium animations, interactive workspaces, and dithered shaders. Built with Framer Motion, GSAP, and ThreeJS. Copy the codebase parameters or deploy directly with the developer CLI.
            </p>
          </div>

          {/* Controls: Search and mobile categories scroll */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch sm:items-center">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search animations, prompts, tags..."
                className="w-full pl-11 pr-5 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.04] border border-white/5 focus:border-white/10 text-sm font-heading font-medium placeholder-white/30 focus:outline-none transition-all"
              />
            </div>

            {/* Mobile Categories (Horizontal Scrollable) */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar select-none shrink-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer shrink-0 transition-all ${
                      isActive 
                        ? "bg-[#E8A969]/10 border-[#E8A969]/30 text-[#E8A969]" 
                        : "bg-white/[0.01] border-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Component cards grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredComponents.length > 0 ? (
                <div className="space-y-12">
                  
                  {/* Section 1: New Releases */}
                  {filteredComponents.filter(c => c.isNew).length > 0 && (
                    <div>
                      <div className="mb-6 text-left">
                        <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                          <span className="text-white/85 font-semibold text-base font-heading">New Releases</span>
                          <span>[{filteredComponents.filter(c => c.isNew).length}]</span>
                        </div>
                        <span className="text-[10px] text-white/30 font-heading">Latest components [Hover to preview]</span>
                      </div>
                      <motion.div 
                        variants={containerVariants}
                        initial={isBackNavigation ? "visible" : "hidden"}
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        {filteredComponents.filter(c => c.isNew).map((item) => (
                          <ComponentCard key={item.id} item={item} isBackNavigation={isBackNavigation} />
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* Section 2: Out of the Box */}
                  {filteredComponents.filter(c => !c.isNew).length > 0 && (
                    <div>
                      <div className="mb-6 text-left">
                        <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                          <span className="text-white/85 font-semibold text-base font-heading">Out of the box</span>
                          <span>[{filteredComponents.filter(c => !c.isNew).length}]</span>
                        </div>
                        <span className="text-[10px] text-white/30 font-heading">Collection of components [Hover to preview]</span>
                      </div>
                      <motion.div 
                        variants={containerVariants}
                        initial={isBackNavigation ? "visible" : "hidden"}
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        {filteredComponents.filter(c => !c.isNew).map((item) => (
                          <ComponentCard key={item.id} item={item} isBackNavigation={isBackNavigation} />
                        ))}
                      </motion.div>
                    </div>
                  )}

                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center text-white/30 space-y-2"
                >
                  <BookOpen className="w-8 h-8 opacity-40" />
                  <span className="text-sm font-heading font-medium">No components match your query.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
