import ImageRevealCard from "../components/bentoshowcase-elements/ImageRevealCard";
import HoverMembersCard from "../components/bentoshowcase-elements/HoverMembersCard";
import ToolkitStackSwiper from "../components/bentoshowcase-elements/ToolkitStackSwiper";
import DevouringDetailsCard from "../components/bentoshowcase-elements/DevouringDetailsCard";
import DynamicIslandCard from "../components/bentoshowcase-elements/DynamicIslandCard";
import DitherCard from "../components/bentoshowcase-elements/DitherCard";
import TextRollCard from "../components/bentoshowcase-elements/TextRollCard";
import BorderBeamCard from "../components/bentoshowcase-elements/BorderBeamCard";
import InteractiveNavbarCard from "../components/bentoshowcase-elements/InteractiveNavbarCard";
import InfiniteMarqueeCard from "../components/bentoshowcase-elements/InfiniteMarqueeCard";
import AudioEqualizerCard from "../components/bentoshowcase-elements/AudioEqualizerCard";
import PipelineStepperCard from "../components/bentoshowcase-elements/PipelineStepperCard";
import HolographicTerminalCard from "../components/bentoshowcase-elements/HolographicTerminalCard";
import MegaMenuNavbarCard from "../components/bentoshowcase-elements/MegaMenuNavbarCard";
import MegaMenuNavbar2Card from "../components/bentoshowcase-elements/MegaMenuNavbar2Card";
import PixelShimmerCard from "../components/bentoshowcase-elements/PixelShimmerCard";

// Raw code text imports using Vite ?raw dynamic loader
import ImageRevealCode from "../components/bentoshowcase-elements/ImageRevealCard.tsx?raw";
import HoverMembersCode from "../components/bentoshowcase-elements/HoverMembersCard.tsx?raw";
import ToolkitStackSwiperCode from "../components/bentoshowcase-elements/ToolkitStackSwiper.tsx?raw";
import DevouringDetailsCode from "../components/bentoshowcase-elements/DevouringDetailsCard.tsx?raw";
import DynamicIslandCode from "../components/bentoshowcase-elements/DynamicIslandCard.tsx?raw";
import DitherCode from "../components/bentoshowcase-elements/DitherCard.tsx?raw";
import TextRollCode from "../components/bentoshowcase-elements/TextRollCard.tsx?raw";
import BorderBeamCode from "../components/bentoshowcase-elements/BorderBeamCard.tsx?raw";
import InteractiveNavbarCode from "../components/bentoshowcase-elements/InteractiveNavbarCard.tsx?raw";
import InfiniteMarqueeCode from "../components/bentoshowcase-elements/InfiniteMarqueeCard.tsx?raw";
import AudioEqualizerCode from "../components/bentoshowcase-elements/AudioEqualizerCard.tsx?raw";
import PipelineStepperCode from "../components/bentoshowcase-elements/PipelineStepperCard.tsx?raw";
import HolographicTerminalCode from "../components/bentoshowcase-elements/HolographicTerminalCard.tsx?raw";
import MegaMenuNavbarCode from "../components/bentoshowcase-elements/MegaMenuNavbarCard.tsx?raw";
import MegaMenuNavbar2Code from "../components/bentoshowcase-elements/MegaMenuNavbar2Card.tsx?raw";
import PixelShimmerCode from "../components/bentoshowcase-elements/PixelShimmerCard.tsx?raw";

export interface ComponentPreviewProps {
  minimal?: boolean;
  activeState?: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ComponentType<ComponentPreviewProps>;
  code: string;
  dependencies?: string[];
  cliCommand?: string;
  isNew?: boolean;
  gridClass?: string;
  viewportHeightClass?: string;
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
    cliCommand: "npx komorebi-ui add image-reveal",
    isNew: true,
  },
  {
    id: "hover-members",
    name: "Hover Members",
    category: "Visuals",
    description: "Card list stagger scale animations on cursor enter events.",
    component: HoverMembersCard,
    code: HoverMembersCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add hover-members",
    isNew: true,
  },
  {
    id: "toolkit-stack-swiper",
    name: "Toolkit Stack Swiper",
    category: "Interactions",
    description: "A deck-style stack swiper with 3D tilt tracking and spring physics.",
    component: ToolkitStackSwiper,
    code: ToolkitStackSwiperCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add toolkit-stack-swiper",
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "devouring-details",
    name: "Devouring Details",
    category: "Reveal",
    description: "Expanding interactive list block with smooth element height transitions.",
    component: DevouringDetailsCard,
    code: DevouringDetailsCode,
    cliCommand: "npx komorebi-ui add devouring-details",
  },
  {
    id: "dynamic-island",
    name: "Dynamic Island Nav Card",
    category: "Navigation",
    description: "Apple-style Dynamic Island expanding notification controller card.",
    component: DynamicIslandCard,
    code: DynamicIslandCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add dynamic-island",
    isNew: true,
  },
  {
    id: "dither-canvas",
    name: "WebGL Dither Shader",
    category: "Canvas",
    description: "Retro dithered image shader visualizer card running in WebGL canvas.",
    component: DitherCard,
    code: DitherCode,
    dependencies: ["@react-three/fiber", "three"],
    cliCommand: "npx komorebi-ui add dither-canvas",
  },
  {
    id: "text-roll",
    name: "Text Roll Animator",
    category: "Visuals",
    description: "Smooth 3D keyframe text roll effect on word hover events.",
    component: TextRollCard,
    code: TextRollCode,
    dependencies: ["gsap"],
    cliCommand: "npx komorebi-ui add text-roll",
  },
  {
    id: "border-beam",
    name: "SVG Border Beam",
    category: "Visuals",
    description: "Outline path SVG glowing animation border runner card.",
    component: BorderBeamCard,
    code: BorderBeamCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add border-beam",
  },
  {
    id: "interactive-navbar",
    name: "Mac-Dock Navbar",
    category: "Navigation",
    description: "Smooth layout-scale magnifying glass Mac-dock navigator element.",
    component: InteractiveNavbarCard,
    code: InteractiveNavbarCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add interactive-navbar",
    isNew: true,
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[180px]",
  },
  {
    id: "infinite-marquee",
    name: "Infinite Icon Marquee",
    category: "Visuals",
    description: "Continuous horizontal marquee ticker animation showcasing brand elements.",
    component: InfiniteMarqueeCard,
    code: InfiniteMarqueeCode,
    dependencies: ["lucide-react"],
    cliCommand: "npx komorebi-ui add infinite-marquee",
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[130px]",
  },
  {
    id: "audio-equalizer",
    name: "Audio Reactive Equalizer",
    category: "Visuals",
    description: "Simulated audio frequency bar graph visualizer reacting to hover coordinates.",
    component: AudioEqualizerCard,
    code: AudioEqualizerCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add audio-equalizer",
  },
  {
    id: "pixel-shimmer",
    name: "Pixel Shimmer Card",
    category: "Visuals",
    description: "Interactive pixel-surface shimmer card with hover and focus-aware glow pulses.",
    component: PixelShimmerCard,
    code: PixelShimmerCode,
    cliCommand: "npx komorebi-ui add pixel-shimmer",
    dependencies: [],
    viewportHeightClass: "h-[250px]",
  },
  {
    id: "pipeline-stepper",
    name: "Pipeline Stepper",
    category: "Controls",
    description: "Interactive multi-step deployment pipeline stepper controller.",
    component: PipelineStepperCard,
    code: PipelineStepperCode,
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add pipeline-stepper",
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "holographic-terminal",
    name: "Typewriter CLI Terminal",
    category: "Controls",
    description: "Simulated console window outputting text strings dynamically.",
    component: HolographicTerminalCard,
    code: HolographicTerminalCode,
    cliCommand: "npx komorebi-ui add holographic-terminal",
  },
  {
    id: "mega-menu-navbar",
    name: "Mega Menu Navbar",
    category: "Navigation",
    description: "Shadcn-based floating navbar with premium animated mega menu dropdown panels.",
    component: MegaMenuNavbarCard,
    code: MegaMenuNavbarCode,
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    cliCommand: "npx komorebi-ui add mega-menu-navbar",
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "mega-menu-navbar-2",
    name: "Mega Menu Navbar 2",
    category: "Navigation",
    description:
      "Scroll-responsive morphing navbar that transitions from a flat fixed header to a premium floating pill layout on scroll.",
    component: MegaMenuNavbar2Card,
    code: MegaMenuNavbar2Code,
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    cliCommand: "npx komorebi-ui add mega-menu-navbar-2",
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[500px]",
  },
];
