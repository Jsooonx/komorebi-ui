import PixelCard from "../ui/PixelCard";

export default function PixelShimmerCard({ minimal = false }: { minimal?: boolean }) {
  const content = (
    <PixelCard
      variant="gold"
      className="bg-[#0f0f12]/95"
      style={{
        background:
          "radial-gradient(circle at top, rgba(232,169,105,0.14), transparent 42%), #0f0f12",
      }}
    >
      <div className="flex h-full w-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/45">
            PIXEL SHIMMER
          </span>
          <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-[#E8A969]">
            hover
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/35">
              Reactive Surface
            </div>
            <h3 className="font-serif text-2xl text-white/92">KOMOREBI</h3>
          </div>
        </div>

        <div>
          <span className="mb-1 block text-xs uppercase tracking-wider text-white/50">
            Ambient Noise
          </span>
          <p className="max-w-[16rem] text-sm leading-relaxed text-white/65">
            Pixel shimmer field with soft highlight pulses and focus-aware hover response.
          </p>
        </div>
      </div>
    </PixelCard>
  );

  if (minimal) {
    return (
      <PixelCard
        variant="gold"
        className="border-none rounded-none bg-transparent"
        style={{
          background:
            "radial-gradient(circle at top, rgba(232,169,105,0.12), transparent 45%), #0c0c0e",
        }}
      >
        <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/40">
              PIXEL SHIMMER
            </span>
            <div className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8px] font-mono text-[#E8A969]">
              hover
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-1">
            <div className="space-y-1 text-center">
              <div className="text-[8px] font-mono uppercase tracking-[0.35em] text-white/30">
                Reactive Surface
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-white/90">KOMOREBI</h3>
            </div>
          </div>

          <div>
            <span className="mb-0.5 block text-[9px] uppercase tracking-wider text-white/40">
              Ambient Noise
            </span>
            <p className="max-w-[15rem] text-[11px] leading-normal text-white/55">
              Pixel shimmer field with soft highlight pulses and focus-aware hover response.
            </p>
          </div>
        </div>
      </PixelCard>
    );
  }

  return <div className="h-[260px] w-full">{content}</div>;
}
