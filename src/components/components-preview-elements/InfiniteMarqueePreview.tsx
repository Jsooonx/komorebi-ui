const labels = [
  "Design",
  "Motion",
  "System",
  "Signal",
  "Studio",
  "Design",
  "Motion",
  "System",
  "Signal",
  "Studio",
];

export default function InfiniteMarqueePreview() {
  return (
    <div className="flex h-full w-full items-center overflow-hidden bg-[#101114]">
      <div className="flex min-w-max animate-[marquee_14s_linear_infinite] items-center gap-8 px-4">
        {labels.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex items-center gap-3 text-sm font-medium text-white/50"
          >
            <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
