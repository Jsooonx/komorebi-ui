import { Link } from "@tanstack/react-router";
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
        <Link to="/components/$id" params={{ id: "image-reveal" }} className="block hover:opacity-95 transition-opacity">
          <ImageRevealCard />
        </Link>
        <Link to="/components/$id" params={{ id: "hover-members" }} className="block hover:opacity-95 transition-opacity">
          <HoverMembersCard />
        </Link>
        <Link to="/components/$id" params={{ id: "things-drag-and-scroll" }} className="block lg:row-span-2 hover:opacity-95 transition-opacity">
          <ThingsDragAndScrollCard />
        </Link>
        <Link to="/components/$id" params={{ id: "devouring-details" }} className="block hover:opacity-95 transition-opacity">
          <DevouringDetailsCard />
        </Link>
        <Link to="/components/$id" params={{ id: "dynamic-island" }} className="block hover:opacity-95 transition-opacity">
          <DynamicIslandCard />
        </Link>
        <Link to="/components/$id" params={{ id: "dither-canvas" }} className="block hover:opacity-95 transition-opacity">
          <DitherCard />
        </Link>
        <Link to="/components/$id" params={{ id: "text-roll" }} className="block hover:opacity-95 transition-opacity">
          <TextRollCard />
        </Link>
        <Link to="/components/$id" params={{ id: "border-beam" }} className="block hover:opacity-95 transition-opacity">
          <BorderBeamCard />
        </Link>
        <Link to="/components/$id" params={{ id: "interactive-navbar" }} className="block lg:col-span-2 hover:opacity-95 transition-opacity">
          <InteractiveNavbarCard />
        </Link>
        <Link to="/components/$id" params={{ id: "infinite-marquee" }} className="block hover:opacity-95 transition-opacity">
          <InfiniteMarqueeCard />
        </Link>
        <Link to="/components/$id" params={{ id: "audio-equalizer" }} className="block hover:opacity-95 transition-opacity">
          <AudioEqualizerCard />
        </Link>
        <Link to="/components/$id" params={{ id: "morphing-blob" }} className="block lg:row-span-2 hover:opacity-95 transition-opacity">
          <MorphingBlobCard />
        </Link>
        <Link to="/components/$id" params={{ id: "holographic-terminal" }} className="block hover:opacity-95 transition-opacity">
          <HolographicTerminalCard />
        </Link>
      </div>
    </section>
  );
}
