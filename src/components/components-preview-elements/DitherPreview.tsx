export default function DitherPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#090b14] [background-image:radial-gradient(#5071c9_1px,transparent_1px),radial-gradient(#1b2f76_1px,transparent_1px)] [background-position:0_0,5px_5px] [background-size:10px_10px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(73,111,255,.52),transparent_34%)] transition duration-700 hover:scale-125" />
      <span className="absolute bottom-4 left-4 text-[9px] font-mono uppercase tracking-[0.18em] text-white/45">
        Dither field
      </span>
    </div>
  );
}
