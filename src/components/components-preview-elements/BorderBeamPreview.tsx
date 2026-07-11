export default function BorderBeamPreview() {
  return (
    <div className="group h-full w-full overflow-hidden bg-[#101114] p-4">
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-[conic-gradient(from_0deg,transparent_0_65%,rgba(255,255,255,.85)_75%,transparent_85%)] p-px transition duration-500 group-hover:rotate-45">
        <div className="flex h-full items-center justify-center rounded-[7px] bg-[#101114]">
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/35">
            Beam trace
          </span>
        </div>
      </div>
    </div>
  );
}
