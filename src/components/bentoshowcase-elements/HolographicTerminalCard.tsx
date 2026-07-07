import { useState, useEffect } from "react";

const terminalContent = [
  "> npx komorebi-ui init",
  "✔ Project initialized",
  "✔ Added 12 components",
  "> npm run dev",
  "✔ Server running on port 3000",
  "✔ Compiled successfully in 23ms"
];

export default function HolographicTerminalCard() {
  const [lines, setLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState("");
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // If resetting to the start, clear previous output
    if (currentLineIdx === 0 && charIdx === 0 && lines.length > 0) {
      setLines([]);
    }

    const currentFullLine = terminalContent[currentLineIdx];

    // If it's a command (starts with ">"), type it char-by-char
    if (currentFullLine.startsWith(">")) {
      const timer = setTimeout(() => {
        setActiveLine(currentFullLine.slice(0, charIdx + 1));
        if (charIdx + 1 < currentFullLine.length) {
          setCharIdx(prev => prev + 1);
        } else {
          // Finished typing line, commit to main lines array
          setTimeout(() => {
            setLines(prev => {
              const next = [...prev, currentFullLine];
              if (next.length > 4) next.shift();
              return next;
            });
            setActiveLine("");
            setCharIdx(0);
            setCurrentLineIdx(prev => (prev + 1) % terminalContent.length);
          }, 600);
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      // If it's status output, print it instantly after a small delay
      const timer = setTimeout(() => {
        setLines(prev => {
          const next = [...prev, currentFullLine];
          if (next.length > 4) next.shift();
          return next;
        });
        setCurrentLineIdx(prev => (prev + 1) % terminalContent.length);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx, charIdx, lines.length]);

  return (
    <div 
      className="relative w-full h-[260px] bg-[#121212] rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase">
          TERMINAL
        </span>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10" />
      </div>

      {/* macOS Style Terminal Window */}
      <div className="relative w-full z-10 flex flex-col mt-1">
        {/* Title bar with macOS buttons */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-black/60 border border-white/5 border-b-0 w-full rounded-t-xl shrink-0">
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[8px] font-mono text-white/35 uppercase tracking-widest">
            bash
          </span>
          <div className="w-10" />
        </div>

        {/* Console logs output */}
        <div className="relative w-full h-[105px] bg-black/85 border border-white/5 rounded-b-xl p-3 font-mono text-[9px] text-white/80 overflow-hidden flex flex-col justify-start gap-1">
          {/* Scanline hologram shader */}
          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent bg-[size:100%_4px] animate-[pulse_1s_infinite] pointer-events-none z-20" />
          )}

          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-1.5 leading-relaxed">
              <span className={line.startsWith(">") ? "text-[#E8A969]" : "text-[#BECB6D]"}>
                {line}
              </span>
            </div>
          ))}
          
          {activeLine && (
            <div className="flex items-center gap-1.5 leading-relaxed">
              <span className="text-[#E8A969]">{activeLine}</span>
              <span className="inline-block w-[4px] h-[10px] bg-[#E8A969] animate-pulse" />
            </div>
          )}

          {lines.length === 0 && !activeLine && (
            <div className="flex items-center gap-1.5 leading-relaxed">
              <span className="text-[#E8A969]">&gt;</span>
              <span className="inline-block w-[4px] h-[10px] bg-[#E8A969] animate-pulse" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-xs text-white/50 tracking-wider uppercase block mb-1">
          Live stream logger
        </span>
        <h3 className="font-sans text-base font-medium tracking-tight text-white">
          Holographic terminal logs
        </h3>
      </div>
    </div>
  );
}
