import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  RotateCcw,
  Code2,
  Terminal,
  Menu,
  X,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { loadComponentCode } from "../lib/component-code-loader";
import { getComponentElement } from "../lib/component-elements";
import { COMPONENTS_MANIFEST } from "../lib/components-manifest";
import { clearNavigationOrigin, getNavigationOrigin } from "../lib/navigation-state";

const getComponent = (id: string) => {
  const manifestItem = COMPONENTS_MANIFEST.find((item) => item.id === id);
  const element = getComponentElement(id);

  if (!manifestItem || !element) {
    return null;
  }

  return {
    ...manifestItem,
    component: element,
  };
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
      { property: "og:description", content: desc },
    ];
  },
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
      className="font-mono text-[11px] leading-relaxed overflow-auto h-full w-full p-6 text-white/70 bg-[#07070a] select-text selection:bg-white/10"
      dangerouslySetInnerHTML={{ __html: tokenize(code) }}
    />
  );
}

function ComponentDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const comp = getComponent(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [dynamicIslandState, setDynamicIslandState] = useState<string>("idle");

  useEffect(() => {
    if (!comp) {
      toast.error("Component not found. Redirecting to home...");
      navigate({ to: "/" });
    }
  }, [comp, navigate]);

  useEffect(() => {
    let isActive = true;

    if (!comp) {
      setCode("");
      return;
    }

    setIsCodeLoading(true);
    loadComponentCode(comp.id)
      .then((value) => {
        if (isActive) {
          setCode(value);
        }
      })
      .catch(() => {
        if (isActive) {
          setCode("// Code preview unavailable.");
          toast.error("Component source code could not be loaded.");
        }
      })
      .finally(() => {
        if (isActive) {
          setIsCodeLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [comp]);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
    const codeContainer = document.getElementById("code-pane-container");
    if (codeContainer) {
      codeContainer.scrollTop = 0;
    }
  }, [id]);

  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.success("Component source code copied!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  const handleCopyCli = async () => {
    if (!comp) return;
    const cli = comp.cliCommand || `npx komorebi-ui add ${comp.id}`;
    try {
      await navigator.clipboard.writeText(cli);
      setCopiedCli(true);
      toast.success("CLI command copied!");
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      toast.error("Failed to copy CLI command.");
    }
  };

  const activeIndex = COMPONENTS_MANIFEST.findIndex((c) => c.id === id);
  const navigationOrigin = getNavigationOrigin();

  if (!comp) {
    return null;
  }

  const PreviewComponent = comp.component;

  return (
    <div className="relative w-screen h-screen bg-[#090909] text-white flex flex-col overflow-hidden font-sans select-none antialiased">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-30 bg-[#090909]/85 backdrop-blur-xl shrink-0">
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
          <Link
            to="/components"
            className="text-xs font-medium text-white/40 hover:text-white/85 transition-colors font-mono"
          >
            Components
          </Link>
          <ChevronRight className="w-4 h-4 text-white/20" />
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-medium text-white/70">
            <span className="text-white/40 font-mono text-[10px] mr-1">
              #{String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span>{comp.name}</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              const destination = navigationOrigin?.path || "/";
              if (destination === "/" && navigationOrigin) {
                sessionStorage.setItem("komorebi_home_scroll_y", String(navigationOrigin.scrollY));
              }
              clearNavigationOrigin();
              navigate({ to: destination });
            }}
            className="text-xs font-medium text-white/60 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer border-none bg-transparent p-0"
          >
            Back to Components
          </button>
        </nav>
      </header>

      <div className="flex-1 flex relative overflow-hidden">
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

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
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80">
                      Components Menu
                    </h3>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-white/5 rounded border border-white/5 text-white/50 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar select-none">
                  {COMPONENTS_MANIFEST.map((item, idx) => {
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
                          <span
                            className={`text-[10px] font-mono ${isActive ? "text-[#E8A969]/60" : "text-white/20"}`}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-medium">{item.name}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#E8A969]" />}
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          <AnimatePresence>
            {codeOpen && (
              <motion.section
                id="code-pane-container"
                initial={isLargeScreen ? { width: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                animate={
                  isLargeScreen ? { width: "40%", opacity: 1 } : { height: "50%", opacity: 1 }
                }
                exit={isLargeScreen ? { width: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[40%] h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-white/5 bg-[#07070a] flex flex-col overflow-hidden relative"
              >
                <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-[#07070a] shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
                    <span className="text-[10px] font-mono text-white/40 ml-3">{comp.id}.tsx</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    disabled={isCodeLoading}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 text-[10px] font-medium text-white/80 hover:text-white cursor-pointer transition-all active:scale-[0.98]"
                    title="Copy Component Code"
                  >
                    {copiedCode ? (
                      <Check className="w-3 h-3 text-[#00f5a0]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="flex-1 overflow-auto">
                  <SimpleHighlighter
                    code={isCodeLoading ? "// Loading component source..." : code}
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <section className="h-full flex-1 flex flex-col bg-[#090909] overflow-hidden relative px-6 md:px-12 pb-6 pt-2 gap-6">
            <div
              key={reloadKey}
              className="flex-1 rounded-2xl border border-white/5 bg-[#0c0c0e] flex flex-col items-center justify-center p-8 relative overflow-hidden group/workspace animate-fade-in"
            >
              <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 bg-[#222225]/80 border border-white/10 backdrop-blur-md rounded-xl shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    sidebarOpen
                      ? "bg-[#E8A969]/15 text-[#E8A969]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Toggle Menu Drawer"
                >
                  {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                </button>

                <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Reset Animation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setCodeOpen(!codeOpen)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    codeOpen
                      ? "bg-[#E8A969]/15 text-[#E8A969]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
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
                  {copiedCli ? (
                    <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                  ) : (
                    <Terminal className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {comp.id === "dynamic-island" && (
                <div className="absolute top-16 right-4 z-30 w-72 bg-[#0c0c0e]/95 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3.5 animate-fade-in select-none">
                  <div className="flex items-center justify-between text-white/40">
                    <div className="flex items-center gap-1.5">
                      <div className="grid grid-cols-3 gap-0.5 w-3 h-3 opacity-60">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <span key={index} className="w-0.5 h-0.5 bg-current rounded-full" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase font-mono">
                        Options
                      </span>
                    </div>

                    <button
                      onClick={() => setDynamicIslandState("idle")}
                      className="p-1 hover:bg-white/5 rounded text-white/50 hover:text-white transition-colors cursor-pointer"
                      title="Reset to Idle"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 gap-1.5">
                      {["idle", "ring", "timer", "record"].map((state) => (
                        <button
                          key={state}
                          onClick={() => setDynamicIslandState(state)}
                          className={`py-1.5 rounded-lg text-[10px] font-medium border transition-all cursor-pointer ${
                            dynamicIslandState === state
                              ? "bg-[#E8A969]/15 border-[#E8A969]/40 text-[#E8A969]"
                              : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/60 hover:text-white"
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {["music", "airdrop", "airdropMini"].map((state) => (
                        <button
                          key={state}
                          onClick={() => setDynamicIslandState(state)}
                          className={`py-1.5 rounded-lg text-[10px] font-medium border transition-all cursor-pointer ${
                            dynamicIslandState === state
                              ? "bg-[#E8A969]/15 border-[#E8A969]/40 text-[#E8A969]"
                              : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/60 hover:text-white"
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {["lowBattery", "phone", "findmy"].map((state) => (
                        <button
                          key={state}
                          onClick={() => setDynamicIslandState(state)}
                          className={`py-1.5 rounded-lg text-[10px] font-medium border transition-all cursor-pointer ${
                            dynamicIslandState === state
                              ? "bg-[#E8A969]/15 border-[#E8A969]/40 text-[#E8A969]"
                              : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/60 hover:text-white"
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setDynamicIslandState("screenRecord")}
                      className={`w-full py-1.5 rounded-lg text-[10px] font-medium border transition-all cursor-pointer ${
                        dynamicIslandState === "screenRecord"
                          ? "bg-[#E8A969]/15 border-[#E8A969]/40 text-[#E8A969]"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/60 hover:text-white"
                      }`}
                    >
                      screenRecord
                    </button>
                  </div>
                </div>
              )}

              <div className="w-full flex-1 flex items-center justify-center pointer-events-auto max-w-4xl h-full">
                <PreviewComponent
                  activeState={comp.id === "dynamic-island" ? dynamicIslandState : undefined}
                />
              </div>
            </div>

            <div className="text-left space-y-2.5 pb-2 shrink-0 select-text">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-white/95">{comp.name}</h2>
                <p className="text-[11px] text-white/45 leading-relaxed max-w-2xl mt-1">
                  {comp.description}
                </p>
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
          </section>
        </main>
      </div>
    </div>
  );
}
