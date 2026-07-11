const bars = [25, 45, 68, 38, 82, 56, 94, 62, 35, 74, 49, 86];

export default function AudioEqualizerPreview() {
  return (
    <div className="group flex h-full w-full items-end justify-center gap-1 overflow-hidden bg-[#101114] px-5 pb-5">
      {bars.map((height, index) => (
        <span
          key={index}
          className="origin-bottom w-2 rounded-t bg-white/35 transition-transform duration-300 group-hover:scale-y-125 group-hover:bg-white/90"
          style={{ height: `${height}%`, transitionDelay: `${index * 25}ms` }}
        />
      ))}
    </div>
  );
}
