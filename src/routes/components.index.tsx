import { useState, useEffect, useLayoutEffect, useRef, type ComponentType } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  Terminal,
  Copy,
  ChevronRight,
  Cpu,
  Layers,
  MousePointer,
  Compass,
  Layout,
  BookOpen,
  Sidebar,
} from "lucide-react";
import {
  COMPONENTS_MANIFEST,
  type ComponentManifestItem,
  type ComponentPreviewProps,
} from "../lib/components-manifest";
import { getComponentPreview } from "../lib/component-previews";

type CatalogComponentItem = ComponentManifestItem & {
  component: ComponentType<ComponentPreviewProps>;
};

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
  meta: () => [
    { title: "Components Catalog - Komorebi UI" },
    {
      name: "description",
      content:
        "Explore the complete library of custom, high-fidelity components and interactive canvases on Komorebi UI.",
    },
  ],
});

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
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ComponentCard({
  item,
  isBackNavigation,
}: {
  item: CatalogComponentItem;
  isBackNavigation?: boolean;
}) {
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

      sessionStorage.setItem("komorebi_scroll_y", String(window.scrollY));
      sessionStorage.setItem("komorebi_from_catalog", "true");
      navigate({ to: "/components/$id", params: { id: item.id } });
    }
  };

  const getIdxStr = () => {
    const idx = COMPONENTS_MANIFEST.findIndex((c) => c.id === item.id);
    return idx >= 0 ? `komorebi${String(idx + 1).padStart(2, "0")}` : item.id;
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
        <div
          className={`relative w-full rounded-xl bg-black border border-white/5 overflow-hidden flex items-center justify-center transition-colors ${item.viewportHeightClass || "h-[180px]"}`}
        >
          <div className="absolute top-2.5 left-3 flex gap-1 z-15">
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>

          <div className="w-full h-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity overflow-hidden">
            <PreviewComp minimal={true} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3.5 px-1 pb-1">
          <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
            {item.name}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/35 group-hover:text-white/60 transition-colors">
            <span>{getIdxStr()}</span>
            {item.isNew && (
              <span className="text-[9px] uppercase tracking-wider bg-[#E8A969]/10 border border-[#E8A969]/20 px-1.5 py-0.5 rounded text-[#E8A969] ml-1">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const getCategoryDescription = (cat: string, mode: string) => {
  if (mode === "all" || cat === "All") {
    return "Explore the complete library of custom, high-fidelity components [Hover to preview]";
  }
  switch (cat.toLowerCase()) {
    case "card & border effects":
      return "Dynamic borders, pixel shimmers, and interactive hover cards [Hover to preview]";
    case "typography & tickers":
      return "Word rolls, infinite marquee tickers, and text animations [Hover to preview]";
    case "masking & accordions":
      return "Organic clipping path image masks and height expanding accordion lists [Hover to preview]";
    case "3d & swipers":
      return "Deck-style card swipers with 3D cursor tilt tracking [Hover to preview]";
    case "cli & stepper controls":
      return "Typewriter CLI terminals, deployment steppers, and audio frequency visualizers [Hover to preview]";
    case "webgl & shaders":
      return "Retro dithered image shaders running in a ThreeJS canvas [Hover to preview]";
    case "headers & menus":
      return "Fixed-to-pill morphing headers, logo shrink scroll navbars, and mega menus [Hover to preview]";
    case "floating ui & docks":
      return "Apple-style dynamic island nav cards and interactive macOS-style magnifying docks [Hover to preview]";
    default:
      return "Hover component cards to preview animation states";
  }
};

function ComponentsIndex() {
  const catalogItems: CatalogComponentItem[] = COMPONENTS_MANIFEST.map((item) => ({
    ...item,
    component: getComponentPreview(item.id),
  })).filter((item): item is CatalogComponentItem => Boolean(item.component))
     .filter((item) => !["mega-menu-navbar", "mega-menu-navbar-2", "mega-menu-navbar-3", "logo-cloud-1"].includes(item.id));

  const [isBackNavigation, setIsBackNavigation] = useState(() => {
    if (typeof window !== "undefined") {
      const fromCatalog = sessionStorage.getItem("komorebi_from_catalog");
      if (fromCatalog === "true") {
        return true;
      }
    }
    return false;
  });

  const pageRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (isBackNavigation && typeof window !== "undefined") {
      const savedY = sessionStorage.getItem("komorebi_scroll_y");
      if (savedY) {
        window.scrollTo(0, parseInt(savedY, 10));
        sessionStorage.removeItem("komorebi_scroll_y");
      }
      sessionStorage.removeItem("komorebi_from_catalog");
    }
  }, [isBackNavigation]);

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const fromCatalog = sessionStorage.getItem("komorebi_from_catalog");
      if (fromCatalog === "true") {
        return sessionStorage.getItem("komorebi_active_category") || "All";
      }
    }
    return "All";
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [viewMode, setViewMode] = useState<"category" | "all">(( ) => {
    if (typeof window !== "undefined") {
      const fromCatalog = sessionStorage.getItem("komorebi_from_catalog");
      if (fromCatalog === "true") {
        return (sessionStorage.getItem("komorebi_view_mode") as "category" | "all") || "all";
      }
    }
    return "all";
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const fromCatalog = sessionStorage.getItem("komorebi_from_catalog");
      if (fromCatalog === "true") {
        const saved = sessionStorage.getItem("komorebi_sidebar_open");
        return saved === null ? true : saved === "true";
      }
    }
    return true;
  });

  useEffect(() => {
    sessionStorage.setItem("komorebi_active_category", activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    sessionStorage.setItem("komorebi_view_mode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    sessionStorage.setItem("komorebi_sidebar_open", String(isSidebarOpen));
  }, [isSidebarOpen]);

  const categories = ["All", ...Array.from(new Set(catalogItems.map((c) => c.category)))];

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return catalogItems.length;
    return catalogItems.filter((c) => c.category === cat).length;
  };

  const filteredComponents = catalogItems.filter((item) => {
    const matchesCategory = viewMode === "all" || activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    sessionStorage.setItem("komorebi_visited_index", "true");
    if (isBackNavigation) {
      // Clear the back navigation flag after mount to allow future animations to play normally
      setIsBackNavigation(false);
    }
  }, [isBackNavigation]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#090909] text-white flex flex-col select-none antialiased"
      style={{ opacity: 1 }}
    >
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-40 bg-[#090909]/85 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <img
              src="/KomorebiLogoUpdate1_transparent.png"
              alt="Komorebi UI"
              className="w-6 h-6 object-contain rounded"
            />
            <span className="text-sm font-semibold tracking-tight font-heading">Komorebi UI</span>
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

      <div className="flex-1 flex pt-16 relative w-full gap-0">
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarOpen ? 288 : 0,
            opacity: isSidebarOpen ? 1 : 0,
            paddingLeft: isSidebarOpen ? 24 : 0,
            paddingRight: isSidebarOpen ? 24 : 0,
            borderRightWidth: isSidebarOpen ? 1 : 0,
          }}
          transition={isBackNavigation ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex shrink-0 h-[calc(100vh-4rem)] sticky top-16 pt-10 pb-8 flex-col justify-between border-white/5 overflow-hidden"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.05
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="space-y-6 min-w-[220px]"
          >
            {/* Header: Filters */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex items-center justify-between pb-4 border-b border-white/5"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
                Filters
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title="Collapse Sidebar"
              >
                <Sidebar className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Section: View */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="space-y-2.5"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block">
                View
              </span>
              <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl gap-1">
                <button
                  onClick={() => {
                    setViewMode("category");
                    if (activeCategory === "All") {
                      setActiveCategory(categories[1] || "All");
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${
                    viewMode === "category"
                      ? "bg-white/10 text-white border border-white/5"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  By category
                </button>
                <button
                  onClick={() => {
                    setViewMode("all");
                    setActiveCategory("All");
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${
                    viewMode === "all"
                      ? "bg-white/10 text-white border border-white/5"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  All components
                </button>
              </div>
            </motion.div>

            {/* Section: Categories */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="space-y-3 pt-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                  Categories
                </span>
                {activeCategory !== "All" && (
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setViewMode("all");
                    }}
                    className="text-[10px] font-semibold text-[#E8A969] hover:underline transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 select-none">
                {categories.filter(c => c !== "All").map((cat) => {
                  const isActive = activeCategory === cat && viewMode === "category";
                  const count = getCategoryCount(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setViewMode("category");
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-white/10 border-white/30 text-white"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] text-white/60 hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] font-mono ${isActive ? "text-white/60" : "text-white/30"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

        </motion.aside>

        <main className="flex-1 pt-10 pb-24 overflow-hidden flex flex-col px-6 md:px-12 lg:pl-12 lg:pr-12">
          <LayoutGroup id="components-header">
            <div className="mb-10 text-left">
              <div className="flex items-center gap-4 mb-4">
                <AnimatePresence mode="popLayout">
                  {!isSidebarOpen && (
                    <motion.div
                      key="expand-btn-components"
                      initial={{ opacity: 0, scale: 0.8, x: -20, width: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, scale: 0.8, x: -20, width: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="overflow-hidden flex items-center shrink-0 pr-1"
                    >
                      <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl text-white/50 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                        title="Expand Sidebar"
                      >
                        <Sidebar className="w-4.5 h-4.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.h1
                  layout="position"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-white"
                >
                  Explore Components
                </motion.h1>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-2xl font-heading">
                Curated catalog of premium animations, interactive workspaces, and dithered shaders.
                Built with Framer Motion, GSAP, and ThreeJS. Copy the codebase parameters or deploy
                directly with the developer CLI.
              </p>
            </div>
          </LayoutGroup>


          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch sm:items-center">
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

            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar select-none shrink-0">
              {categories.map((cat) => {
                const isActive = (cat === "All" && viewMode === "all") || (cat === activeCategory && viewMode === "category");
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if (cat === "All") {
                        setViewMode("all");
                        setActiveCategory("All");
                      } else {
                        setViewMode("category");
                        setActiveCategory(cat);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer shrink-0 transition-all ${
                      isActive
                        ? "bg-white text-black border-white"
                        : "bg-white/[0.01] border-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredComponents.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <div className="mb-6 text-left">
                      <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
                        <span className="text-white/85 font-semibold text-base font-heading">
                          {viewMode === "all" ? "All Components" : activeCategory}
                        </span>
                        <span>[{filteredComponents.length}]</span>
                      </div>
                      <span className="text-[10px] text-white/30 font-heading">
                        {getCategoryDescription(activeCategory, viewMode)}
                      </span>
                    </div>

                    {viewMode === "all" ? (
                      <div className="space-y-12">
                        {categories.filter(c => c !== "All").map((cat) => {
                          const categoryComponents = filteredComponents.filter(c => c.category === cat);
                          if (categoryComponents.length === 0) return null;

                          return (
                            <div key={cat} className="space-y-4">
                              <div className="pb-2 border-b border-white/5 flex items-center justify-between">
                                <h4 className="text-xs font-bold tracking-wider text-white/60 uppercase font-mono">
                                  {cat} <span className="text-[9px] text-white/35 ml-1">[{categoryComponents.length}]</span>
                                </h4>
                                <span className="text-[9px] text-white/30 font-heading">
                                  {getCategoryDescription(cat, "category").replace(" [Hover to preview]", "")}
                                </span>
                              </div>
                              <motion.div
                                variants={containerVariants}
                                initial={isBackNavigation ? "visible" : "hidden"}
                                animate="visible"
                                exit="hidden"
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                              >
                                {categoryComponents.map((item) => (
                                  <ComponentCard
                                    key={item.id}
                                    item={item}
                                    isBackNavigation={isBackNavigation}
                                  />
                                ))}
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <motion.div
                        variants={containerVariants}
                        initial={isBackNavigation ? "visible" : "hidden"}
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        {filteredComponents.map((item) => (
                          <ComponentCard
                            key={item.id}
                            item={item}
                            isBackNavigation={isBackNavigation}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center text-white/30 space-y-2"
                >
                  <BookOpen className="w-8 h-8 opacity-40" />
                  <span className="text-sm font-heading font-medium">
                    No components match your query.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
