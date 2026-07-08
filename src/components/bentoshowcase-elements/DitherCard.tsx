import { useState, useEffect, Suspense, lazy } from "react";

// Lazy load heavy WebGL dither canvas
const Dither = lazy(() => import("../ui/dither"));

export default function DitherCard({ minimal = false }: { minimal?: boolean }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const content = (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 bg-black">
      {isClient && (
        <Suspense fallback={<div className="w-full h-full bg-black animate-pulse" />}>
          <Dither 
            waveSpeed={0.08}
            waveFrequency={3.5}
            waveAmplitude={0.4}
            waveColor={[0.1, 0.25, 0.7]} // Indigo-blue glow
            baseColor={[0.02, 0.03, 0.08]} // Very dark midnight blue
            colorNum={4}
            pixelSize={3}
          />
        </Suspense>
      )}
    </div>
  );

  if (minimal) {
    return (
      <div className="w-full h-full select-none">
        {content}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group">
      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          RETRO SHADER
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* Dither Shader Area */}
      <div className="relative w-full h-28">
        {content}
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          WebGL Canvas
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Dither waves
        </h3>
      </div>
    </div>
  );
}
