import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const steps = [
  { title: "Configuration", desc: "Setting up parameters" },
  { title: "Project Setup", desc: "Set project identifier" },
  { title: "Deployment", desc: "Pipeline verification" }
];

export default function MorphingBlobCard() {
  const [activeStep, setActiveStep] = useState(0);
  const [params, setParams] = useState({ ssl: true, minify: false, cdn: true });
  const [projName, setProjName] = useState("my-awesome-app");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleNext = () => {
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLaunchStatus('idle');
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateY: tilt.x, rotateX: tilt.y }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="relative w-full h-[544px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:row-span-2 group antialiased"
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#121212] via-transparent to-[#1a1a1a]/20 opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          PIPELINE STEPPER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Stepper Interactive Area */}
      <div className="relative w-full z-10 flex flex-col gap-4 mt-2">
        {/* Step Indicator Header */}
        <div className="relative w-full flex items-center justify-between px-3">
          {/* Progress bar container (aligned exactly to circle centers) */}
          <div className="absolute top-[13px] left-[26px] right-[26px] h-[2px] z-0">
            {/* Background line */}
            <div className="w-full h-full bg-white/5" />
            {/* Active animated line */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#E8A969]" 
              initial={{ width: "0%" }}
              animate={{ width: activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
          </div>

          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            return (
              <button 
                key={idx} 
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center focus:outline-none cursor-pointer"
              >
                <motion.div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono border font-semibold transition-colors duration-300 ${
                    isActive 
                      ? "bg-[#E8A969] text-black border-[#E8A969]" 
                      : isCompleted
                        ? "bg-black text-[#BECB6D] border-[#BECB6D]/55"
                        : "bg-[#161616] text-white/30 border-white/5"
                  }`}
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    boxShadow: isActive ? "0 0 12px rgba(232,169,105,0.4)" : "none"
                  }}
                >
                  {isCompleted ? (
                    <motion.svg 
                      className="w-3.5 h-3.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Step Interactive Visual Box */}
        <motion.div 
          animate={{ height: activeStep === 0 ? 160 : activeStep === 1 ? 230 : 160 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full bg-black/45 border border-white/5 rounded-xl p-5 overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none" />
          
          <div className="relative z-10 w-full h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="step-0-visual"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-3 w-full"
                >
                  <span className="text-[10px] font-mono text-white/40 text-left uppercase tracking-wider block mb-1">
                    Environment Parameters
                  </span>
                  
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>SSL/TLS Certificate</span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setParams(p => ({ ...p, ssl: !p.ssl }));
                      }}
                      className={`w-8 h-4.5 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${params.ssl ? "bg-[#BECB6D] justify-end" : "bg-white/10 justify-start"}`}
                    >
                      <motion.div 
                        layout 
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-3.5 h-3.5 rounded-full bg-black" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Code Minification</span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setParams(p => ({ ...p, minify: !p.minify }));
                      }}
                      className={`w-8 h-4.5 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${params.minify ? "bg-[#BECB6D] justify-end" : "bg-white/10 justify-start"}`}
                    >
                      <motion.div 
                        layout 
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-3.5 h-3.5 rounded-full bg-black" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Global Edge CDN</span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setParams(p => ({ ...p, cdn: !p.cdn }));
                      }}
                      className={`w-8 h-4.5 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${params.cdn ? "bg-[#BECB6D] justify-end" : "bg-white/10 justify-start"}`}
                    >
                      <motion.div 
                        layout 
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-3.5 h-3.5 rounded-full bg-black" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="step-1-visual"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-2 w-full"
                >
                  <div className="flex flex-col gap-1.5 w-full text-left">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                      Project name identifier
                    </label>
                    <input 
                      type="text"
                      value={projName}
                      onChange={(e) => setProjName(e.target.value)}
                      className="w-full bg-[#161616] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E8A969] transition-colors font-mono"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Expandable Advanced Options */}
                  <div className="w-full flex flex-col gap-1.5 text-left mt-2.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAdvanced(!showAdvanced); }}
                      className="flex items-center gap-1 text-[9px] font-mono text-[#E8A969] hover:underline cursor-pointer"
                    >
                      <span>{showAdvanced ? "▼" : "▶"} Advanced Options</span>
                    </button>
                    <AnimatePresence>
                      {showAdvanced && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-black/30 border border-white/5 rounded p-2 text-[9px] font-mono text-white/50 flex flex-col gap-1"
                        >
                          <div>Hosting Provider: Cloudflare Pages</div>
                          <div>Deploy Region: Global Edge (Auto)</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-2-visual"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-3 w-full text-left font-mono"
                >
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                    Configuration Review
                  </span>
                  
                  <div className="text-[10px] text-white/70 flex flex-col gap-1">
                    <div>Project: <span className="text-white">{projName || "unnamed"}</span></div>
                    <div>SSL Certificate: <span className="text-[#BECB6D]">{params.ssl ? "Active" : "Disabled"}</span></div>
                    <div>Minification: <span className={params.minify ? "text-[#BECB6D]" : "text-white/40"}>{params.minify ? "Enabled" : "Disabled"}</span></div>
                    <div>CDN Cache: <span className="text-[#BECB6D]">{params.cdn ? "Enabled" : "Disabled"}</span></div>
                  </div>

                  {/* Launch trigger action */}
                  <div className="mt-1 w-full">
                    {launchStatus === 'idle' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLaunchStatus('loading');
                          setTimeout(() => {
                            setLaunchStatus('success');
                          }, 1600);
                        }}
                        className="w-full py-1.5 rounded bg-[#BECB6D] hover:bg-[#a9b954] text-[10px] text-black font-semibold transition-colors cursor-pointer"
                      >
                        Launch Pipeline
                      </motion.button>
                    )}
                    {launchStatus === 'loading' && (
                      <div className="flex items-center justify-center gap-2 py-1">
                        <div className="w-3.5 h-3.5 rounded-full border border-t-transparent border-[#E8A969] animate-spin" />
                        <span className="text-[9px] text-[#E8A969] animate-pulse">Deploying to edge...</span>
                      </div>
                    )}
                    {launchStatus === 'success' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-1.5 py-1 text-[#BECB6D] text-[10px] font-semibold"
                      >
                        <Sparkles className="w-3 h-3 text-[#BECB6D] animate-bounce" />
                        <span>Deployment Successful!</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Step Text Footer & Control Buttons */}
        <div className="h-10 w-full flex items-center justify-between text-xs px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col text-left"
            >
              <span className="font-sans font-medium text-white text-[11px] leading-tight">
                {steps[activeStep].title}
              </span>
              <span className="font-mono text-[9px] text-white/45 leading-none mt-0.5">
                {steps[activeStep].desc}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Actions */}
          <div className="flex gap-2">
            <AnimatePresence>
              {activeStep > 0 && (
                <motion.button 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[9px] font-mono text-white/60 transition-colors cursor-pointer"
                >
                  Back
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button 
              layout
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                if (activeStep === 2) {
                  handleReset();
                } else {
                  handleNext();
                }
              }}
              className="px-2.5 py-1 rounded bg-[#E8A969] hover:bg-[#d99855] text-[9px] font-mono text-black font-semibold transition-colors cursor-pointer"
            >
              {activeStep === 2 ? "Reset" : "Next"}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Multi-step flow
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Interactive stepper component
        </h3>
      </div>
    </motion.div>
  );
}
