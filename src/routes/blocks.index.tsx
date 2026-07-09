import { useState, useEffect, useRef, type ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronRight,
  Code2,
  Terminal,
  RotateCcw,
  Check,
  Copy,
  Maximize2,
  Minimize2,
  Layout,
  Layers,
  MousePointer,
  Compass,
  Cpu,
  Sidebar,
} from "lucide-react";
import {
  COMPONENTS_MANIFEST,
  type ComponentManifestItem,
  type ComponentPreviewProps,
} from "../lib/components-manifest";
import { getComponentPreview } from "../lib/component-previews";
import { loadComponentCode } from "../lib/component-code-loader";

type BlockItem = ComponentManifestItem & {
  component: ComponentType<ComponentPreviewProps>;
};

export const Route = createFileRoute("/blocks/")({
  component: BlocksIndex,
  meta: () => [
    { title: "Blocks Catalog - Komorebi UI" },
    {
      name: "description",
      content:
        "Browse the complete library of custom header and navigation blocks built for modern web applications.",
    },
  ],
});

function SimpleHighlighter({ code }: { code: string }) {
  const tokenize = (txt: string) => {
    let html = txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/(\/\/.*)/g, '<span class="text-white/30">$1</span>');

    const keywords = [
      "import",
      "export",
      "default",
      "const",
      "let",
      "var",
      "function",
      "return",
      "as",
      "from",
      "interface",
      "type",
      "class",
      "extends",
      "true",
      "false",
      "null",
      "undefined",
      "use client",
      "new",
    ];
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      html = html.replace(regex, '<span class="text-[#E8A969] font-medium">$1</span>');
    });

    const reactKeywords = ["useState", "useEffect", "useRef", "useMemo", "useCallback"];
    reactKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      html = html.replace(regex, '<span class="text-[#00f5a0]">$1</span>');
    });

    html = html.replace(/&lt;([a-zA-Z0-9.:]+)/g, '&lt;<span class="text-[#8cd6ff]">$1</span>');
    html = html.replace(/(["'])(.*?)\1/g, '<span class="text-[#BECB6D]">$1$2$1</span>');
    html = html.replace(/(`)([\s\S]*?)\1/g, '<span class="text-[#BECB6D]">$1$2$1</span>');

    return html;
  };

  return (
    <pre
      className="font-mono text-[11px] leading-relaxed overflow-auto h-[500px] w-full p-6 text-white/70 bg-[#07070a] select-text selection:bg-white/10"
      dangerouslySetInnerHTML={{ __html: tokenize(code) }}
    />
  );
}

function BlockRow({ item }: { item: BlockItem }) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const PreviewComp = item.component;

  const handleCopyCli = async () => {
    try {
      const cmd = item.cliCommand || `npx komorebi-ui add ${item.id}`;
      await navigator.clipboard.writeText(cmd);
      setCopiedCli(true);
      toast.success("CLI command copied!");
      setTimeout(() => setCopiedCli(false), 2000);
    } catch (err) {
      toast.error("Failed to copy CLI command");
    }
  };

  const handleCopyCode = async () => {
    try {
      let targetCode = code;
      if (!targetCode) {
        targetCode = await loadComponentCode(item.id);
      }
      await navigator.clipboard.writeText(targetCode);
      setCopiedCode(true);
      toast.success("Component source code copied!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast.error("Failed to copy source code");
    }
  };

  const fetchCode = async () => {
    if (code) return;
    setIsCodeLoading(true);
    try {
      const data = await loadComponentCode(item.id);
      setCode(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load component code");
    } finally {
      setIsCodeLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "code") {
      fetchCode();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col border border-white/5 rounded-xl bg-[#09090b] overflow-hidden transition-all duration-300">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 bg-[#0d0d0f] border-b border-white/5">
        {/* Left: Tab options */}
        <div className="flex items-center gap-1.5 bg-black/35 p-1 rounded-lg border border-white/5 w-fit">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
              activeTab === "preview"
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
              activeTab === "code"
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Code
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* CLI code display */}
          <div
            onClick={handleCopyCli}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 border border-white/5 text-[10px] font-mono text-white/50 hover:text-white/90 cursor-pointer transition-colors"
            title="Copy CLI command"
          >
            <Terminal className="w-3.5 h-3.5 text-white/30" />
            <span>{item.cliCommand || `npx komorebi-ui add ${item.id}`}</span>
            {copiedCli ? (
              <Check className="w-3 h-3 text-[#00f5a0]" />
            ) : (
              <Copy className="w-3 h-3 text-white/20" />
            )}
          </div>

          <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

          {/* Copy code source */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Copy Source Code"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00f5a0]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Preview */}
          {activeTab === "preview" && (
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
              title="Reset Preview"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Expand Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-50 bg-[#09090b] flex flex-col pt-16" : ""}`}>
        {isFullscreen && (
          <div className="absolute top-4 right-6 z-50 flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 bg-black/60 hover:bg-black/95 border border-white/10 rounded-full text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="w-full flex-grow relative overflow-hidden bg-[#070709]">
          {activeTab === "preview" ? (
            <div
              key={reloadKey}
              className={`w-full ${isFullscreen ? "h-[calc(100vh-64px)]" : "h-[500px]"} relative`}
            >
              <PreviewComp minimal={true} />
            </div>
          ) : (
            <div className={`w-full ${isFullscreen ? "h-[calc(100vh-64px)]" : "h-[500px]"} overflow-auto`}>
              {isCodeLoading ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/40">
                  <div className="w-4 h-4 border-2 border-t-white/80 border-white/20 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono">Loading Source Code...</span>
                </div>
              ) : (
                <SimpleHighlighter code={code} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Block Information */}
      <div className="px-5 py-4 border-t border-white/5 flex flex-col text-left">
        <h4 className="text-xs font-semibold text-white/95">{item.name}</h4>
        <p className="text-[10px] text-white/45 mt-1 leading-normal font-sans">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function BlocksIndex() {
  // Selected nav block categories (matches screenshot)
  const categories = [
    { id: "header", label: "Header", icon: Layout },
    { id: "hero", label: "Hero Section", icon: Layers, locked: true },
    { id: "secondary-hero", label: "Secondary Hero", icon: Layers, locked: true },
    { id: "logo-cloud", label: "Logo Cloud", icon: Compass },
    { id: "features", label: "Features", icon: Cpu },
  ];

  const [activeCategory, setActiveCategory] = useState("header");

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("komorebi_blocks_sidebar_open");
      return saved === null ? true : saved === "true";
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("komorebi_blocks_sidebar_open", String(isSidebarOpen));
  }, [isSidebarOpen]);

  // Manifest items that are Blocks (currently headers, logo clouds, and features)
  const blockItems: BlockItem[] = COMPONENTS_MANIFEST.map((item) => ({
    ...item,
    component: getComponentPreview(item.id),
  }))
    .filter((item): item is BlockItem => Boolean(item.component))
    .filter((item) => ["mega-menu-navbar-1", "mega-menu-navbar-2", "mega-menu-navbar-3", "logo-cloud-1", "logo-cloud-2", "logo-cloud-3", "features-1", "features-2", "features-3"].includes(item.id));

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col select-none antialiased">
      {/* Top Breadcrumb Navigation */}
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
          <span className="text-xs font-medium text-white/40 font-mono">Blocks</span>
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

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex pt-16 relative w-full gap-0">
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarOpen ? 288 : 0,
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-[calc(100vh-64px)] shrink-0 border-r border-white/5 bg-[#090909] sticky top-16 overflow-y-auto hidden md:flex flex-col p-6 scrollbar-none z-10"
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
            className="flex flex-col h-full justify-between"
          >
            <div className="space-y-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <h3 className="text-[10px] font-semibold tracking-widest text-white/20 uppercase font-mono">
                    Categories
                  </h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                    title="Collapse Sidebar"
                  >
                    <Sidebar className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (!cat.locked) setActiveCategory(cat.id);
                        }}
                        disabled={cat.locked}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                          cat.locked
                            ? "opacity-35 cursor-not-allowed"
                            : activeCategory === cat.id
                              ? "bg-white/5 text-white"
                              : "text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 opacity-60" />
                          <span>{cat.label}</span>
                        </div>
                        {cat.locked && (
                          <span className="text-[8px] font-mono text-white/30 border border-white/10 rounded px-1 group-hover:border-white/20 transition-colors">
                            Soon
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar bottom guide */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="pt-6 border-t border-white/5 text-[10px] text-white/35 leading-relaxed font-sans"
            >
              Blocks are ready-made full-page layout sections (Headers, Heros, Bentos) designed to drop directly into your routes.
            </motion.div>
          </motion.div>
        </motion.aside>

        {/* Catalog Main Scrollable Section */}
        <main className="flex-1 min-h-[calc(100vh-64px)] flex flex-col p-6 md:p-12 overflow-x-hidden">
          <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col justify-between">
            <div className="space-y-8">
              <LayoutGroup id="blocks-header">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase font-mono">
                    Layout Blocks
                  </span>
                  <div className="flex items-center gap-4 mt-1">
                    <AnimatePresence mode="popLayout">
                      {!isSidebarOpen && (
                        <motion.div
                          key="expand-btn-blocks"
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
                      {categories.find((c) => c.id === activeCategory)?.label || "Header"}
                    </motion.h1>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed font-heading max-w-2xl mt-1">
                    {activeCategory === "header" && "Scroll-responsive dynamic headers, logo scaling navigators, and full drop-down mega menu designs built for modern shells."}
                    {activeCategory === "logo-cloud" && "Clean layout presenting partner brand logos with monochromatic filters, scrolling sliders, and vertical marquee columns."}
                    {activeCategory === "features" && "Premium feature section layouts with grids, inline outline animations, and interactive hover highlights."}
                  </p>
                </div>
              </LayoutGroup>
 
              {/* Stacked Preview List */}
              <div className="space-y-12">
                {activeCategory === "header" &&
                  blockItems
                    .filter((item) => item.category === "Headers & Menus")
                    .map((item) => <BlockRow key={item.id} item={item} />)}
                {activeCategory === "logo-cloud" &&
                  blockItems
                    .filter((item) => item.category === "Logo Cloud")
                    .map((item) => <BlockRow key={item.id} item={item} />)}
                {activeCategory === "features" &&
                  blockItems
                    .filter((item) => item.category === "Features")
                    .map((item) => <BlockRow key={item.id} item={item} />)}
              </div>
            </div>

            {/* Catalog Sub-Footer */}
            <footer className="pt-20 pb-4 border-t border-white/5 mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 font-mono">
              <span>All layout blocks follow Shadcn & Framer Motion specs.</span>
              <span>Interactive Viewport</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
