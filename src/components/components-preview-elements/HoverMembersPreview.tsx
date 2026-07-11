const members = ["AC", "MJ", "RK", "SL"];

export default function HoverMembersPreview() {
  return (
    <div className="group flex h-full w-full flex-col justify-between overflow-hidden bg-[#101114] p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">
        Team presence
      </span>
      <div className="flex items-end justify-between">
        <div className="flex -space-x-3">
          {members.map((member, index) => (
            <div
              key={member}
              style={{ transitionDelay: `${index * 35}ms` }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-[10px] font-medium text-white/80 transition duration-300 group-hover:-translate-y-3 group-hover:scale-110 group-hover:border-white/35"
            >
              {member}
            </div>
          ))}
        </div>
        <span className="text-xs text-white/45 transition group-hover:text-white">+12</span>
      </div>
    </div>
  );
}
