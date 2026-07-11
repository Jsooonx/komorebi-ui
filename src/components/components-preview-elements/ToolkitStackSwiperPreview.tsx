import { useState } from "react";

const cards = ["/scenery_aurora.png", "/scenery_sunset.png", "/scenery_mountains.png"];

export default function ToolkitStackSwiperPreview() {
  const [active, setActive] = useState(0);
  return (
    <button
      onClick={() => setActive((active + 1) % cards.length)}
      className="group relative h-full w-full overflow-hidden bg-[#0e0f12] text-left"
      aria-label="Cycle toolkit cards"
    >
      <span className="absolute left-4 top-4 z-20 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
        Click to cycle
      </span>
      <div
        className="absolute inset-x-0 bottom-0 top-8 flex items-center justify-center"
        style={{ perspective: 800 }}
      >
        {cards.map((src, index) => {
          const position = (index - active + cards.length) % cards.length;
          return (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute h-[68%] w-[48%] rounded-lg border border-white/15 object-cover shadow-2xl transition-all duration-500"
              style={{
                transform: `translate(${position * 18}px, ${position * 13}px) rotate(${position * 4}deg)`,
                opacity: 1 - position * 0.25,
                zIndex: cards.length - position,
              }}
            />
          );
        })}
      </div>
    </button>
  );
}
