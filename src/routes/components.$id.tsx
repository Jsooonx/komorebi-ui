import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  RotateCcw, 
  Code2, 
  Terminal, 
  Maximize2, 
  Minimize2, 
  Menu, 
  X, 
  ArrowLeft, 
  Check, 
  Copy,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { COMPONENTS_DATA, getComponentInfo } from "../lib/components-data";

// Helper function to resolve component by ID
const getComponent = (id: string) => {
  return COMPONENTS_DATA.find((c) => c.id === id);
};

export const Route = createFileRoute("/components/$id")({
  component: ComponentDetail,
  meta: ({ params }) => {
    const comp = getComponent(params.id);
    const title = comp ? `${comp.name} - Komorebi UI` : "Component Sandbox";
    const desc = comp 
      ? `Explore the interactive code, live playground, and installation guide for ${comp.name} on Komorebi UI.`
      : "Interactive component playroom and copy-paste code snippets sandbox.";
    return [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc }
    ];
  }
});

// A lightweight, highly performant syntax highlighter using custom regex tokenization
function SimpleHighlighter({ code }: { code: string }) {
  const tokenize = (txt: string) => {
    // Escape HTML special characters
    let html = txt
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Comments (both single-line and block)
    html = html.replace(/(\/\/.*)/g, '<span class="text-white/30">$1</span>');

    // Keywords
    const keywords = [
      "import", "export", "default", "const", "let", "var", "function", 
      "return", "as", "from", "interface", "type", "class", "extends", 
      "true", "false", "null", "undefined", "use client", "new"
    ];
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      html = html.replace(regex, '<span class="text-[#E8A969] font-medium">$1</span>');
    });

    // React hooks / state indicators
    const reactKeywords = ["useState", "useEffect", "useRef", "useMemo", "useCallback"];
    reactKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      html = html.replace(regex, '<span class="text-[#00f5a0]">$1</span>');
    });

    // Tag names and parameters
    html = html.replace(/&lt;([a-zA-Z0-9\.\:]+)/g, '&lt;<span class="text-[#8cd6ff]">$1</span>');
    
    // String literals
    html = html.replace(/(["'])(.*?)\1/g, '<span class="text-[#BECB6D]">$1$2$1</span>');
    html = html.replace(/(`)([\s\S]*?)\1/g, '<span class="text-[#BECB6D]">$1$2$1</span>');

    return html;
  };

  return (
    <pre 
      className="font-mono text-[11px] leading-relaxed overflow-auto h-full w-full p-6 text-white/70 bg-[#07070a] select-text selection:bg-white/10"
      dangerouslySetInnerHTML={{ __html: tokenize(code) }}
    />
  );
}

function ComponentDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const comp = getComponent(id);

  // Fallback if component is not found
  if (!comp) {
    useEffect(() => {
      toast.error("Component not found. Redirecting to home...");
      navigate({ to: "/" });
    }, [navigate]);
    return null;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  // Reset scroll offsets on component load
  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
    const codeContainer = document.getElementById("code-pane-container");
    if (codeContainer) {
      codeContainer.scrollTop = 0;
    }
  }, [id]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(comp.code);
      setCopiedCode(true);
      toast.success("Component source code copied!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  const handleCopyCli = async () => {
    const cli = comp.cliCommand || `npx komorebi-ui add ${comp.id}`;
    try {
      await navigator.clipboard.writeText(cli);
      setCopiedCli(true);
      toast.success("CLI command copied!");
      setTimeout(() => setCopiedCli(false), 2000);
    } catch (err) {
      toast.error("Failed to copy CLI command.");
    }
  };

  const activeIndex = COMPONENTS_DATA.findIndex((c) => c.id === id);

  const PreviewComponent = comp.component;

  return (
    <div className="relative w-screen h-screen bg-[#090909] text-white flex flex-col overflow-hidden font-sans select-none antialiased">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      {!isFullscreen && (
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-30 bg-[#090909]/85 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <img 
                src="/KomorebiLogoUpdate1_transparent.png" 
                alt="Komorebi UI" 
                className="w-6 h-6 object-contain rounded"
              />
              <span className="text-sm font-semibold tracking-tight font-heading">Komorebi UI</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-white/20" />
            <Link 
              to="/components" 
              className="text-xs font-medium text-white/40 hover:text-white/85 transition-colors font-mono"
            >
              Components
            </Link>
            <ChevronRight className="w-4 h-4 text-white/20" />
            <div className="flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-medium text-white/70">
              <span className="text-white/40 font-mono text-[10px] mr-1">#{String(activeIndex + 1).padStart(2, '0')}</span>
              <span>{comp.name}</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (sessionStorage.getItem("komorebi_visited_index") === "true") {
                  window.history.back();
                } else {
                  navigate({ to: "/" });
                }
              }}
              className="text-xs font-medium text-white/60 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer border-none bg-transparent p-0"
            >
              Back to Components
            </button>
          </nav>
        </header>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* 2. SLIDE-OUT LEFT SIDEBAR DRAWER */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop veil overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              
              {/* Drawer panel */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 bottom-0 left-0 w-80 bg-[#090909] border-r border-white/5 z-50 flex flex-col p-6 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8A969]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80">Components Menu</h3>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-white/5 rounded border border-white/5 text-white/50 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar select-none">
                  {COMPONENTS_DATA.map((item, idx) => {
                    const isActive = item.id === id;
                    return (
                      <Link
                        key={item.id}
                        to="/components/$id"
                        params={{ id: item.id }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all ${
                          isActive 
                            ? "bg-[#E8A969]/10 border-[#E8A969]/30 text-[#E8A969]" 
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono ${isActive ? "text-[#E8A969]/60" : "text-white/20"}`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-medium">{item.name}</span>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E8A969]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 3. CORE PLAYROOM CONTENT SPLIT PANEL */}
        <main className={`flex-1 grid ${codeOpen && !isFullscreen ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} h-full overflow-hidden transition-all duration-300`}>
          
          {/* CODE EDITOR CONTAINER (LEFT PANE) */}
          {codeOpen && !isFullscreen && (
            <section 
              id="code-pane-container"
              className="h-full border-r border-white/5 bg-[#07070a] flex flex-col overflow-hidden relative"
            >
              {/* Code pane header bar */}
              <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-[#07070a] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
                  <span className="text-[10px] font-mono text-white/40 ml-3">{comp.id}.tsx</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-medium text-white/80 hover:text-white cursor-pointer transition-all active:scale-[0.98]"
                  title="Copy Component Code"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-[#00f5a0]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>

              {/* Code display block */}
              <div className="flex-1 overflow-auto">
                <SimpleHighlighter code={comp.code} />
              </div>
            </section>
          )}

          {/* INTERACTIVE CANVAS VIEWPORT (RIGHT PANE) */}
          <section className="h-full flex flex-col bg-[#090909] overflow-hidden relative px-6 md:px-12 pb-6 pt-2 gap-6">
            
            {/* The main workspace container card with thin border */}
            <div 
              key={reloadKey}
              className="flex-1 rounded-2xl border border-white/5 bg-[#090909] flex flex-col items-center justify-center p-8 relative overflow-hidden group/workspace animate-fade-in"
            >
              {/* Control floating tools pill */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 bg-black/60 border border-white/5 backdrop-blur-md rounded-xl shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    sidebarOpen ? "bg-[#E8A969]/15 text-[#E8A969]" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Toggle Menu Drawer"
                >
                  {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                </button>

                <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

                <button
                  onClick={() => setReloadKey(k => k + 1)}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Reset Animation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setCodeOpen(!codeOpen)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    codeOpen && !isFullscreen ? "bg-[#E8A969]/15 text-[#E8A969]" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Toggle Code Editor Split Pane"
                >
                  <Code2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyCli}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors relative cursor-pointer"
                  title="Copy Command CLI Line"
                >
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-[#00f5a0]" /> : <Terminal className="w-3.5 h-3.5" />}
                </button>

                <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Dynamic Component Element Render (Maximized) */}
              <div className="w-full flex-1 flex items-center justify-center pointer-events-auto max-w-4xl h-full">
                <PreviewComponent minimal={true} />
              </div>
            </div>

            {/* Dynamic details description & dependencies tags (Static, below the bordered workspace) */}
            {!isFullscreen && (
              <div className="text-left space-y-2.5 pb-2 shrink-0 select-text">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-white/95">{comp.name}</h2>
                  <p className="text-[11px] text-white/45 leading-relaxed max-w-2xl mt-1">{comp.description}</p>
                </div>
                
                {comp.dependencies && comp.dependencies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {comp.dependencies.map((dep) => (
                      <span 
                        key={dep} 
                        className="text-[8px] font-mono text-white/30 px-1.5 py-0.5 rounded bg-white/5 border border-white/10"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Exit fullscreen floating button */}
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-8 left-8 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-md text-xs text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
