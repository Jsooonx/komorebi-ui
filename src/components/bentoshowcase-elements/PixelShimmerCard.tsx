import PixelCard from "../ui/PixelCard";

export default function PixelShimmerCard({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <PixelCard
        variant="gold"
        className="border-none rounded-none bg-transparent w-full h-full group/bento"
        style={{
          background:
            "radial-gradient(circle at top, rgba(232,169,105,0.15), transparent 48%), #0c0c0e",
        }}
      >
        <div className="flex h-full w-full flex-col justify-between p-5 sm:p-6 relative z-10 select-none">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/45 group-hover/bento:text-white/65 transition-colors duration-300">
              PIXEL SHIMMER
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8A969]/60 shadow-[0_0_8px_rgba(232,169,105,0.8)]" />
          </div>

          <div className="flex flex-1 items-center justify-center py-2">
            <div className="space-y-1.5 text-center">
              <h3 className="font-serif text-2xl sm:text-3xl text-white/90 font-light tracking-tight group-hover/bento:text-white transition-colors duration-300">
                KOMOREBI
              </h3>
              <span className="text-[10px] font-mono tracking-widest text-[#E8A969]/80 uppercase block group-hover/bento:text-[#E8A969] transition-colors duration-300">
                Interactive Surface
              </span>
            </div>
          </div>

          <div>
            <span className="mb-1 block text-[10px] uppercase tracking-widest font-mono text-white/45 group-hover/bento:text-white/60 transition-colors duration-300">
              Ambient Noise
            </span>
            <p className="max-w-[16rem] text-[11px] leading-relaxed text-white/65 group-hover/bento:text-white/80 transition-colors duration-300">
              Pixel shimmer field with soft highlight pulses and focus-aware hover response.
            </p>
          </div>
        </div>
      </PixelCard>
    );
  }

  const content = (
    <PixelCard
      variant="gold"
      className="bg-[#0f0f12]/95 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden group/card"
      style={{
        background:
          "radial-gradient(circle at top, rgba(232,169,105,0.18), transparent 45%), #0f0f12",
      }}
    >
      <div className="flex h-full w-full flex-col justify-between p-6 sm:p-7 relative z-10 select-none">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/50 group-hover/card:text-white/70 transition-colors duration-300">
            PIXEL SHIMMER
          </span>
          <div className="w-2 h-2 rounded-full bg-[#E8A969]/70 shadow-[0_0_10px_rgba(232,169,105,0.9)] animate-pulse" />
        </div>

        <div className="flex flex-1 items-center justify-center my-4">
          <div className="space-y-2 text-center">
            <h3 className="font-serif text-3xl sm:text-4xl text-white/95 font-light tracking-tight group-hover/card:text-white transition-colors duration-300">
              KOMOREBI
            </h3>
            <span className="text-[11px] font-mono tracking-widest text-[#E8A969]/85 uppercase block group-hover/card:text-[#E8A969] transition-colors duration-300">
              Interactive Surface
            </span>
          </div>
        </div>

        <div>
          <span className="mb-1 block text-[10px] uppercase tracking-widest font-mono text-white/45 group-hover/card:text-white/65 transition-colors duration-300">
            Ambient Noise
          </span>
          <p className="max-w-[17rem] text-xs leading-relaxed text-white/70 group-hover/card:text-white/85 transition-colors duration-300">
            Pixel shimmer field with soft highlight pulses and focus-aware hover response.
          </p>
        </div>
      </div>
    </PixelCard>
  );

  return (
    <div className="h-[360px] sm:h-[380px] w-full max-w-[420px] mx-auto select-none">
      {content}
    </div>
  );
}

