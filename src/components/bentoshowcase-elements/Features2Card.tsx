import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Play, RefreshCw, Zap, Layers, Sparkles } from "lucide-react";

// ── CARD 1: DYNAMIC SPRING PLAYGROUND ──
function SpringPlayground() {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [toggleBall, setToggleBall] = useState(false);

  const triggerBounce = () => {
    setToggleBall((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Visual Canvas Area */}
      <div className="relative h-28 w-full rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden">
        {/* Dynamic Grid backdrop */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '12px 12px',
            backgroundPosition: 'center',
          }} 
        />
        
        {/* Spring Ball */}
        <motion.div
          animate={{
            x: toggleBall ? 80 : -80,
            scale: toggleBall ? [1, 0.8, 1.2, 1] : [1, 1.2, 0.8, 1],
          }}
          transition={{
            type: "spring",
            stiffness: stiffness,
            damping: damping,
          }}
          className="w-8 h-8 rounded-full bg-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10 flex items-center justify-center cursor-pointer"
          onClick={triggerBounce}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#09090b]" />
        </motion.div>

        {/* Trigger Button */}
        <button
          onClick={triggerBounce}
          className="absolute bottom-2 right-2 p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all text-white/70 hover:text-white"
          title="Bounce Ball"
        >
          <Play className="w-3 h-3 fill-current" />
        </button>
      </div>

      {/* Control Sliders */}
      <div className="space-y-2.5 mt-4">
        {/* Stiffness Slider */}
        <div className="flex flex-col gap-1 text-left">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
            <span>Stiffness: {stiffness}</span>
            <span>Fast</span>
          </div>
          <input
            type="range"
            min="10"
            max="300"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Damping Slider */}
        <div className="flex flex-col gap-1 text-left">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
            <span>Damping: {damping}</span>
            <span>Bouncy</span>
          </div>
          <input
            type="range"
            min="2"
            max="40"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>
      </div>
    </div>
  );
}

// ── CARD 2: PRESET SWITCHER ──
function PresetSwitcher() {
  const [activePreset, setActivePreset] = useState("natural");
  const presets = [
    { id: "natural", label: "Natural Flow", timing: "0.45s" },
    { id: "snappy", label: "Snappy Snap", timing: "0.20s" },
    { id: "fluid", label: "Slow Ease", timing: "0.85s" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Preset List */}
      <div className="space-y-1.5 w-full">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setActivePreset(preset.id)}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-[11px] font-medium transition-all ${
              activePreset === preset.id
                ? "bg-white/5 border-white/20 text-white shadow-sm"
                : "bg-transparent border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.01]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                activePreset === preset.id ? "bg-white scale-120" : "bg-white/10"
              }`} />
              <span>{preset.label}</span>
            </div>
            <span className="font-mono text-[9px] opacity-40">{preset.timing}</span>
          </button>
        ))}
      </div>

      {/* Preset Details Mockup */}
      <div className="h-10 mt-3 rounded border border-white/5 bg-black/20 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-white/10" />
        <motion.div
          key={activePreset}
          initial={{ width: 0, left: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: activePreset === "natural" ? 0.45 : activePreset === "snappy" ? 0.2 : 0.85,
            ease: activePreset === "snappy" ? "easeOut" : "easeInOut",
          }}
          className="absolute left-0 bottom-0 h-[1.5px] bg-white"
        />
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
          Timeline Active
        </span>
      </div>
    </div>
  );
}

// ── CARD 4: MOCK CLI TERMINAL ENGINE ──
function MockCLIEngine() {
  const [step, setStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const command = "npx komorebi-ui add features-2";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const runSimulation = () => {
      // Step 0: Initial clean state
      setStep(0);
      setTerminalLogs([]);

      // Step 1: Type command
      timer = setTimeout(() => {
        setStep(1);
        setTerminalLogs([`$ ${command}`]);
      }, 1000);

      // Step 2: Fetch manifest
      timer = setTimeout(() => {
        setStep(2);
        setTerminalLogs((prev) => [...prev, "⠋ Fetching block manifest..."]);
      }, 2500);

      // Step 3: Copying component
      timer = setTimeout(() => {
        setStep(3);
        setTerminalLogs((prev) => [
          ...prev.slice(0, -1),
          "✔ Block manifest verified.",
          "⠋ Copying Features2Card.tsx to components/..."
        ]);
      }, 4200);

      // Step 4: Successfully installed
      timer = setTimeout(() => {
        setStep(4);
        setTerminalLogs((prev) => [
          ...prev.slice(0, -1),
          "✔ Component code cloned successfully.",
          "",
          "SUCCESS: Block Features 2 added to components/motion-primitives!"
        ]);
      }, 6000);

      // Restart Loop
      timer = setTimeout(() => {
        runSimulation();
      }, 9500);
    };

    runSimulation();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#050507] border border-white/5 rounded-xl flex flex-col font-mono text-[10px] text-white/70 overflow-hidden text-left relative shadow-lg">
      {/* Terminal Titlebar */}
      <div className="h-7 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-3.5 shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <span className="text-[9px] text-white/30 uppercase tracking-widest font-sans font-medium">bash</span>
        <div className="w-6" />
      </div>

      {/* Terminal Window Body */}
      <div className="p-4 flex-grow space-y-2 overflow-y-auto scrollbar-none min-h-[120px] select-text">
        {terminalLogs.map((log, index) => {
          const isSuccess = log.startsWith("SUCCESS") || log.startsWith("✔");
          const isCommand = log.startsWith("$");
          return (
            <div 
              key={index}
              className={`leading-relaxed ${
                isSuccess 
                  ? "text-emerald-400 font-semibold" 
                  : isCommand 
                    ? "text-white" 
                    : "text-white/55"
              }`}
            >
              {log}
            </div>
          );
        })}
        {step === 0 && (
          <div className="flex items-center gap-1">
            <span className="text-white">$</span>
            <span className="w-1.5 h-3 bg-white/60 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function Features2Card({ minimal = false }: { minimal?: boolean }) {
  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 select-none flex flex-col justify-center items-center h-full">
      {/* Block Header */}
      <div className="text-center mb-8 shrink-0">
        <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white tracking-tight">
          Aesthetics meet performance
        </h3>
        <p className="text-xs sm:text-sm text-white/45 mt-3 font-sans max-w-lg mx-auto leading-relaxed select-text">
          Fine-tune every curve, load preset motion matrices, and fetch modular blocks seamlessly with zero overhead.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch flex-grow">
        {/* CARD 1: Spring curve playground (Large - md:col-span-2) */}
        <div className="md:col-span-2 group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0b0d] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden">
          <div className="flex flex-col text-left mb-6 relative z-10">
            <div className="flex items-center gap-2 text-white/90">
              <Zap className="w-4 h-4 text-white/80 stroke-[1.5]" />
              <h4 className="text-sm font-sans font-semibold tracking-tight">Spring Curve Playground</h4>
            </div>
            <p className="text-[11px] text-white/40 mt-1 font-sans leading-relaxed max-w-md select-text">
              Fine-tune kinetic curves in real-time. Slide stiffness and damping to adjust elasticity on the fly.
            </p>
          </div>
          <SpringPlayground />
        </div>

        {/* CARD 2: Preset Switcher (Small - md:col-span-1) */}
        <div className="md:col-span-1 group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0b0d] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden">
          <div className="flex flex-col text-left mb-6 relative z-10">
            <div className="flex items-center gap-2 text-white/90">
              <Layers className="w-4 h-4 text-white/80 stroke-[1.5]" />
              <h4 className="text-sm font-sans font-semibold tracking-tight">Preset Matrix</h4>
            </div>
            <p className="text-[11px] text-white/40 mt-1 font-sans leading-relaxed select-text">
              Choose pre-configured layouts or switch between timing defaults.
            </p>
          </div>
          <PresetSwitcher />
        </div>

        {/* CARD 3: 144Hz Smoothness (Small - md:col-span-1) */}
        <div className="md:col-span-1 group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0b0d] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden">
          <div className="flex flex-col text-left mb-6 relative z-10">
            <div className="flex items-center gap-2 text-white/90">
              <RefreshCw className="w-4 h-4 text-white/80 stroke-[1.5]" />
              <h4 className="text-sm font-sans font-semibold tracking-tight">Refresh-Rate Sync</h4>
            </div>
            <p className="text-[11px] text-white/40 mt-1 font-sans leading-relaxed select-text">
              Render at display rates (60Hz to 144Hz) with hardware acceleration.
            </p>
          </div>
          
          {/* Sine Wave SVG Animation */}
          <div className="h-28 w-full rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative">
            <svg className="w-[85%] h-12 text-white/20" viewBox="0 0 100 20">
              <motion.path
                d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.2"
                animate={{
                  d: [
                    "M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10",
                    "M 0 10 Q 12.5 20 25 10 T 50 10 T 75 10 T 100 10",
                    "M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut"
                }}
              />
            </svg>
            <span className="absolute bottom-2 right-3 text-[8px] font-mono text-white/30 uppercase tracking-widest">
              60Hz - 144Hz
            </span>
          </div>
        </div>

        {/* CARD 4: CLI Terminal Engine (Large - md:col-span-2) */}
        <div className="md:col-span-2 group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0b0d] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden">
          <div className="flex flex-col text-left mb-6 relative z-10">
            <div className="flex items-center gap-2 text-white/90">
              <TerminalIcon className="w-4 h-4 text-white/80 stroke-[1.5]" />
              <h4 className="text-sm font-sans font-semibold tracking-tight">CLI Terminal Engine</h4>
            </div>
            <p className="text-[11px] text-white/40 mt-1 font-sans leading-relaxed max-w-md select-text">
              Install UI blocks directly into your workspace. No bloated library, just clean, native React and Tailwind code.
            </p>
          </div>
          <MockCLIEngine />
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#09090b] flex items-center justify-center"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[650px] rounded-lg bg-[#09090b] border border-white/5 overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center select-none group scrollbar-none"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
