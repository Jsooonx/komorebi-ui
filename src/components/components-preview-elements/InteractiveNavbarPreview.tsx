import { Bell, Command, FileText, Search, Settings } from "lucide-react";

const icons = [Command, Search, FileText, Bell, Settings];

export default function InteractiveNavbarPreview() {
  return (
    <div className="flex h-full w-full items-end justify-center overflow-hidden bg-[#101114] pb-5">
      <nav className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/60 p-2">
        {icons.map((Icon, index) => (
          <button
            key={index}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition-all duration-200 hover:-translate-y-2 hover:scale-125 hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </nav>
    </div>
  );
}
