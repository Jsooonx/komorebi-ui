import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const steps = [
  { title: "Configuration", desc: "Setting up parameters" },
  { title: "Project Setup", desc: "Set project identifier" },
  { title: "Deployment", desc: "Pipeline verification" },
];

export default function PipelineStepperHighlight() {
  const [activeStep, setActiveStep] = useState(0);
  const [params, setParams] = useState({ ssl: true, minify: false, cdn: true });
  const [projName, setProjName] = useState("my-awesome-app");
  const [launchStatus, setLaunchStatus] = useState<"idle" | "loading" | "success">("idle");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    setLaunchStatus("idle");
  };

  const content = (
    <div className="relative w-full z-10 flex flex-col gap-4 mt-2">
      <div className="relative w-full flex items-center justify-between px-3">
        <div className="absolute top-[13px] left-[26px] right-[26px] h-[2px] z-0">
          <div className="w-full h-full bg-white/5" />
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
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive || isCompleted ? "#E8A969" : "#1a1a1a",
                  borderColor: isActive || isCompleted ? "#E8A969" : "rgba(255,255,255,0.15)",
                }}
                className="w-[28px] h-[28px] rounded-full border flex items-center justify-center text-[10px] font-mono font-bold text-black"
              >
                {isCompleted ? "✓" : idx + 1}
              </motion.div>
            </button>
          );
        })}
      </div>

      <motion.div
        animate={{ height: activeStep === 0 ? 120 : activeStep === 1 ? 160 : 120 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full bg-black/45 border border-white/5 rounded-xl p-4 overflow-hidden flex flex-col justify-between"
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
                className="flex flex-col gap-2 w-full text-[10px]"
              >
                <div className="flex items-center justify-between text-white/70">
                  <span>SSL Certificate</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setParams((p) => ({ ...p, ssl: !p.ssl }));
                    }}
                    className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${params.ssl ? "bg-[#BECB6D] justify-end" : "bg-white/10 justify-start"}`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-3 h-3 rounded-full bg-black"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-white/70">
                  <span>JS/CSS Minify</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setParams((p) => ({ ...p, minify: !p.minify }));
                    }}
                    className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${params.minify ? "bg-[#BECB6D] justify-end" : "bg-white/10 justify-start"}`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-3 h-3 rounded-full bg-black"
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
                className="flex flex-col gap-1.5 w-full text-left"
              >
                <input
                  type="text"
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[#E8A969] transition-colors font-mono"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step-2-visual"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-1.5 w-full text-left font-mono text-[9px]"
              >
                <div className="text-white/70 flex flex-col gap-0.5">
                  <div>
                    Project: <span className="text-white">{projName || "unnamed"}</span>
                  </div>
                  <div>
                    SSL:{" "}
                    <span className="text-[#BECB6D]">{params.ssl ? "Active" : "Disabled"}</span>
                  </div>
                </div>

                <div className="mt-1 w-full">
                  {launchStatus === "idle" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLaunchStatus("loading");
                        setTimeout(() => {
                          setLaunchStatus("success");
                        }, 1200);
                      }}
                      className="w-full py-1 rounded bg-[#BECB6D] text-[9px] text-black font-semibold cursor-pointer"
                    >
                      Launch
                    </button>
                  )}
                  {launchStatus === "loading" && (
                    <div className="text-center text-[9px] text-[#E8A969] animate-pulse">
                      Deploying...
                    </div>
                  )}
                  {launchStatus === "success" && (
                    <div className="text-center text-[#BECB6D] text-[9px]">Success!</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-8 w-full flex items-center justify-between text-[10px] px-1">
        <span className="font-sans font-medium text-white/90">{steps[activeStep].title}</span>
        <div className="flex gap-1.5">
          {activeStep > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-white/60 cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (activeStep === 2) {
                handleReset();
              } else {
                handleNext();
              }
            }}
            className="px-2 py-0.5 rounded bg-[#E8A969] text-[9px] text-black font-semibold cursor-pointer"
          >
            {activeStep === 2 ? "Reset" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[544px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none lg:row-span-2 group antialiased">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#121212] via-transparent to-[#1a1a1a]/20 opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          PIPELINE STEPPER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      <div className="relative w-full z-10 flex flex-col gap-4 mt-2">{content}</div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Multi-step flow
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Interactive stepper component
        </h3>
      </div>
    </div>
  );
}
