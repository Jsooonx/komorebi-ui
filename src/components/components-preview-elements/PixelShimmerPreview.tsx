export default function PixelShimmerPreview() {
  return (
    <div className="group relative h-full w-full overflow-hidden bg-[#111114] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:15px_15px]">
      <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(255,255,255,.3),transparent_40%)] opacity-0 blur-xl transition duration-700 group-hover:translate-x-24 group-hover:opacity-100" />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[10px] font-mono uppercase tracking-[.22em] text-white/40">
          Pixel surface
        </span>
        <span className="font-serif text-3xl tracking-tight text-white/80">KOMOREBI</span>
      </div>
    </div>
  );
}
