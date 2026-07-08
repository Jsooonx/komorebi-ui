import ImageRevealCard from "../components/bentoshowcase-elements/ImageRevealCard";
import HoverMembersCard from "../components/bentoshowcase-elements/HoverMembersCard";
import ThingsDragAndScrollCard from "../components/bentoshowcase-elements/ThingsDragAndScrollCard";
import DevouringDetailsCard from "../components/bentoshowcase-elements/DevouringDetailsCard";
import DynamicIslandCard from "../components/bentoshowcase-elements/DynamicIslandCard";
import DitherCard from "../components/bentoshowcase-elements/DitherCard";
import TextRollCard from "../components/bentoshowcase-elements/TextRollCard";
import BorderBeamCard from "../components/bentoshowcase-elements/BorderBeamCard";
import InteractiveNavbarCard from "../components/bentoshowcase-elements/InteractiveNavbarCard";
import InfiniteMarqueeCard from "../components/bentoshowcase-elements/InfiniteMarqueeCard";
import MagneticCursorFieldCard from "../components/bentoshowcase-elements/MagneticCursorFieldCard";
import AudioEqualizerCard from "../components/bentoshowcase-elements/AudioEqualizerCard";
import MorphingBlobCard from "../components/bentoshowcase-elements/MorphingBlobCard";
import HolographicTerminalCard from "../components/bentoshowcase-elements/HolographicTerminalCard";

// Raw code text imports using Vite ?raw dynamic loader
import ImageRevealCode from "../components/bentoshowcase-elements/ImageRevealCard.tsx?raw";
import HoverMembersCode from "../components/bentoshowcase-elements/HoverMembersCard.tsx?raw";
import ThingsDragAndScrollCode from "../components/bentoshowcase-elements/ThingsDragAndScrollCard.tsx?raw";
import DevouringDetailsCode from "../components/bentoshowcase-elements/DevouringDetailsCard.tsx?raw";
import DynamicIslandCode from "../components/bentoshowcase-elements/DynamicIslandCard.tsx?raw";
import DitherCode from "../components/bentoshowcase-elements/DitherCard.tsx?raw";
import TextRollCode from "../components/bentoshowcase-elements/TextRollCard.tsx?raw";
import BorderBeamCode from "../components/bentoshowcase-elements/BorderBeamCard.tsx?raw";
import InteractiveNavbarCode from "../components/bentoshowcase-elements/InteractiveNavbarCard.tsx?raw";
import InfiniteMarqueeCode from "../components/bentoshowcase-elements/InfiniteMarqueeCard.tsx?raw";
import MagneticCursorFieldCode from "../components/bentoshowcase-elements/MagneticCursorFieldCard.tsx?raw";
import AudioEqualizerCode from "../components/bentoshowcase-elements/AudioEqualizerCard.tsx?raw";
import MorphingBlobCode from "../components/bentoshowcase-elements/MorphingBlobCard.tsx?raw";
import HolographicTerminalCode from "../components/bentoshowcase-elements/HolographicTerminalCard.tsx?raw";

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ComponentType<any>;
  code: string;
  dependencies?: string[];
  cliCommand?: string;
}

export const COMPONENTS_DATA: ComponentItem[] = [
  {
    id: "image-reveal",
    name: "Image Reveal",
    category: "Visuals",
    description: "Hover reactive image clipping path mask overlay with organic animations.",
    component: ImageRevealCard,
    code: ImageRevealCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add image-reveal"
  },
  {
    id: "hover-members",
    name: "Hover Members",
    category: "Visuals",
    description: "Card list stagger scale animations on cursor enter events.",
    component: HoverMembersCard,
    code: HoverMembersCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add hover-members"
  },
  {
    id: "things-drag-and-scroll",
    name: "Things Drag & Scroll",
    category: "Interactions",
    description: "A drag and scroll interaction workspace panel with smooth inertia.",
    component: ThingsDragAndScrollCard,
    code: ThingsDragAndScrollCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add things-drag-and-scroll"
  },
  {
    id: "devouring-details",
    name: "Devouring Details",
    category: "Reveal",
    description: "Expanding interactive list block with smooth element height transitions.",
    component: DevouringDetailsCard,
    code: DevouringDetailsCode,
    cliCommand: "npx komorebi-ui add devouring-details"
  },
  {
    id: "dynamic-island",
    name: "Dynamic Island Nav Card",
    category: "Navigation",
    description: "Apple-style Dynamic Island expanding notification controller card.",
    component: DynamicIslandCard,
    code: DynamicIslandCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add dynamic-island"
  },
  {
    id: "dither-canvas",
    name: "WebGL Dither Shader",
    category: "Canvas",
    description: "Retro dithered image shader visualizer card running in WebGL canvas.",
    component: DitherCard,
    code: DitherCode,
    dependencies: ["@react-three/fiber", "three"],
    cliCommand: "npx komorebi-ui add dither-canvas"
  },
  {
    id: "text-roll",
    name: "Text Roll Animator",
    category: "Visuals",
    description: "Smooth 3D keyframe text roll effect on word hover events.",
    component: TextRollCard,
    code: TextRollCode,
    dependencies: ["gsap"],
    cliCommand: "npx komorebi-ui add text-roll"
  },
  {
    id: "border-beam",
    name: "SVG Border Beam",
    category: "Visuals",
    description: "Outline path SVG glowing animation border runner card.",
    component: BorderBeamCard,
    code: BorderBeamCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add border-beam"
  },
  {
    id: "interactive-navbar",
    name: "Mac-Dock Navbar",
    category: "Navigation",
    description: "Smooth layout-scale magnifying glass Mac-dock navigator element.",
    component: InteractiveNavbarCard,
    code: InteractiveNavbarCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add interactive-navbar"
  },
  {
    id: "infinite-marquee",
    name: "Infinite Icon Marquee",
    category: "Visuals",
    description: "Continuous horizontal marquee ticker animation showcasing brand elements.",
    component: InfiniteMarqueeCard,
    code: InfiniteMarqueeCode,
    dependencies: ["lucide-react"],
    cliCommand: "npx komorebi-ui add infinite-marquee"
  },
  {
    id: "magnetic-cursor-field",
    name: "Magnetic Pixel Grid",
    category: "Canvas",
    description: "Hover reactive magnetic grid selector with coordinate tracking.",
    component: MagneticCursorFieldCard,
    code: MagneticCursorFieldCode,
    cliCommand: "npx komorebi-ui add magnetic-cursor-field"
  },
  {
    id: "audio-equalizer",
    name: "Audio Reactive Equalizer",
    category: "Visuals",
    description: "Simulated audio frequency bar graph visualizer reacting to hover coordinates.",
    component: AudioEqualizerCard,
    code: AudioEqualizerCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add audio-equalizer"
  },
  {
    id: "morphing-blob",
    name: "Fluid Morphing Blob",
    category: "Canvas",
    description: "Continuous morphing organic vector blob stepper control interface.",
    component: MorphingBlobCard,
    code: MorphingBlobCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add morphing-blob"
  },
  {
    id: "holographic-terminal",
    name: "Typewriter CLI Terminal",
    category: "Controls",
    description: "Simulated console window outputting text strings dynamically.",
    component: HolographicTerminalCard,
    code: HolographicTerminalCode,
    cliCommand: "npx komorebi-ui add holographic-terminal"
  }
];

export const COMPONENTS_DB = COMPONENTS_DATA;

export function getComponentInfo(id: string) {
  return COMPONENTS_DB.find((c) => c.id === id);
}
