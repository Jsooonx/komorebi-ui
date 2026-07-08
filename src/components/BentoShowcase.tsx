import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SplitText from "./ui/SplitText";
import ImageRevealCard from "./bentoshowcase-elements/ImageRevealCard";
import HoverMembersCard from "./bentoshowcase-elements/HoverMembersCard";
import ThingsDragAndScrollCard from "./bentoshowcase-elements/ThingsDragAndScrollCard";
import DevouringDetailsCard from "./bentoshowcase-elements/DevouringDetailsCard";
import DynamicIslandCard from "./bentoshowcase-elements/DynamicIslandCard";
import DitherCard from "./bentoshowcase-elements/DitherCard";
import TextRollCard from "./bentoshowcase-elements/TextRollCard";
import BorderBeamCard from "./bentoshowcase-elements/BorderBeamCard";
import InteractiveNavbarCard from "./bentoshowcase-elements/InteractiveNavbarCard";
import InfiniteMarqueeCard from "./bentoshowcase-elements/InfiniteMarqueeCard";
import AudioEqualizerCard from "./bentoshowcase-elements/AudioEqualizerCard";
import MorphingBlobCard from "./bentoshowcase-elements/MorphingBlobCard";
import HolographicTerminalCard from "./bentoshowcase-elements/HolographicTerminalCard";

function BentoCell({ 
  id, 
  className, 
  children 
}: { 
  id: string; 
  className?: string; 
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [pointerCoords, setPointerCoords] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setPointerCoords({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const diffX = Math.abs(e.clientX - pointerCoords.x);
    const diffY = Math.abs(e.clientY - pointerCoords.y);
    if (diffX < 6 && diffY < 6) {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("input") || target.closest("a")) {
        return;
      }
      navigate({ to: "/components/$id", params: { id } });
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`block hover:opacity-95 transition-opacity cursor-pointer select-none ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default function BentoShowcase() {
  return (
    <section 
      id="bento-showcase" 
      className="relative z-10 bg-[#090909] py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center select-none"
    >
      {/* ── HEADER ── */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-20 w-full">
        <SplitText
          text="17+ Creative components"
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-tight inline-block"
          tag="h2"
          splitType="words"
          delay={80}
          duration={0.8}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-120px"
        />
        <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed font-heading">
          No extra packages - just copy the code or install directly with our CLI <code className="text-[#E8A969] bg-white/5 px-1.5 py-0.5 rounded font-mono">npx komorebi-ui init</code>.
        </p>
      </div>

      {/* ── BENTO GRID ── */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BentoCell id="image-reveal">
          <ImageRevealCard />
        </BentoCell>
        <BentoCell id="hover-members">
          <HoverMembersCard />
        </BentoCell>
        <BentoCell id="things-drag-and-scroll" className="lg:row-span-2">
          <ThingsDragAndScrollCard />
        </BentoCell>
        <BentoCell id="devouring-details">
          <DevouringDetailsCard />
        </BentoCell>
        <BentoCell id="dynamic-island">
          <DynamicIslandCard />
        </BentoCell>
        <BentoCell id="dither-canvas">
          <DitherCard />
        </BentoCell>
        <BentoCell id="text-roll">
          <TextRollCard />
        </BentoCell>
        <BentoCell id="border-beam">
          <BorderBeamCard />
        </BentoCell>
        <BentoCell id="interactive-navbar" className="lg:col-span-2">
          <InteractiveNavbarCard />
        </BentoCell>
        <BentoCell id="infinite-marquee">
          <InfiniteMarqueeCard />
        </BentoCell>
        <BentoCell id="audio-equalizer">
          <AudioEqualizerCard />
        </BentoCell>
        <BentoCell id="morphing-blob" className="lg:row-span-2">
          <MorphingBlobCard />
        </BentoCell>
        <BentoCell id="holographic-terminal">
          <HolographicTerminalCard />
        </BentoCell>
      </div>
    </section>
  );
}
