export interface ComponentPreviewProps {
  minimal?: boolean;
  activeState?: string;
}

export interface ComponentManifestItem {
  id: string;
  name: string;
  category: string;
  description: string;
  dependencies?: string[];
  isNew?: boolean;
  gridClass?: string;
  viewportHeightClass?: string;
}

export const COMPONENTS_MANIFEST: ComponentManifestItem[] = [
  {
    id: "image-reveal",
    name: "Image Reveal",
    category: "Masking & Accordions",
    description: "Hover reactive image clipping path mask overlay with organic animations.",
    dependencies: ["framer-motion"],
    isNew: true,
  },
  {
    id: "hover-members",
    name: "Hover Members",
    category: "Card & Border Effects",
    description: "Card list stagger scale animations on cursor enter events.",
    dependencies: ["framer-motion"],
    isNew: true,
  },
  {
    id: "toolkit-stack-swiper",
    name: "Toolkit Stack Swiper",
    category: "3D & Swipers",
    description: "A deck-style stack swiper with 3D tilt tracking and spring physics.",
    dependencies: ["framer-motion"],
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "devouring-details",
    name: "Devouring Details",
    category: "Masking & Accordions",
    description: "Expanding interactive list block with smooth element height transitions.",
  },
  {
    id: "dynamic-island",
    name: "Dynamic Island Nav Card",
    category: "Floating UI & Docks",
    description: "Apple-style Dynamic Island expanding notification controller card.",
    dependencies: ["framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[240px]",
  },
  {
    id: "dither-canvas",
    name: "WebGL Dither Shader",
    category: "WebGL & Shaders",
    description: "Retro dithered image shader visualizer card running in WebGL canvas.",
    dependencies: ["@react-three/fiber", "three"],
  },
  {
    id: "text-roll",
    name: "Text Roll Animator",
    category: "Typography & Tickers",
    description: "Smooth 3D keyframe text roll effect on word hover events.",
    dependencies: ["gsap"],
  },
  {
    id: "border-beam",
    name: "SVG Border Beam",
    category: "Card & Border Effects",
    description: "Outline path SVG glowing animation border runner card.",
    dependencies: ["framer-motion"],
  },
  {
    id: "interactive-navbar",
    name: "Mac-Dock Navbar",
    category: "Floating UI & Docks",
    description: "Smooth layout-scale magnifying glass Mac-dock navigator element.",
    dependencies: ["framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[180px]",
  },
  {
    id: "infinite-marquee",
    name: "Infinite Icon Marquee",
    category: "Typography & Tickers",
    description: "Continuous horizontal marquee ticker animation showcasing brand elements.",
    dependencies: ["lucide-react"],
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[130px]",
  },
  {
    id: "audio-equalizer",
    name: "Audio Reactive Equalizer",
    category: "CLI & Stepper Controls",
    description: "Simulated audio frequency bar graph visualizer reacting to hover coordinates.",
    dependencies: ["framer-motion"],
  },
  {
    id: "pixel-shimmer",
    name: "Pixel Shimmer Card",
    category: "Card & Border Effects",
    description: "Interactive pixel-surface shimmer card with hover and focus-aware glow pulses.",
    dependencies: [],
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "pipeline-stepper",
    name: "Pipeline Stepper",
    category: "CLI & Stepper Controls",
    description: "Interactive multi-step deployment pipeline stepper controller.",
    dependencies: ["framer-motion"],
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "holographic-terminal",
    name: "Typewriter CLI Terminal",
    category: "CLI & Stepper Controls",
    description: "Simulated console window outputting text strings dynamically.",
  },
  {
    id: "mega-menu-navbar-1",
    name: "Mega Menu Navbar 1",
    category: "Headers & Menus",
    description: "Shadcn-based floating navbar with premium animated mega menu dropdown panels.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "mega-menu-navbar-2",
    name: "Mega Menu Navbar 2",
    category: "Headers & Menus",
    description:
      "Scroll-responsive morphing navbar that transitions from a flat fixed header to a premium floating pill layout on scroll.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[500px]",
  },
  {
    id: "mega-menu-navbar-3",
    name: "Mega Menu Navbar 3",
    category: "Headers & Menus",
    description:
      "Floating mega menu navbar where logo and CTA dynamically morph inside on scroll, leaving only clean core navigation.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[500px]",
  },
  {
    id: "interactive-accordion",
    name: "Accordion",
    category: "Masking & Accordions",
    description: "Ambient glowing feature details accordion with responsive badge state highlights.",
    dependencies: ["@radix-ui/react-accordion", "framer-motion"],
    isNew: true,
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[400px]",
  },
  {
    id: "nested-accordion",
    name: "Nested Accordion",
    category: "Masking & Accordions",
    description: "Hierarchical accordion design showcasing nested sub-menu dropdown panels inside a unified wrapper.",
    dependencies: ["@radix-ui/react-accordion", "framer-motion"],
    isNew: true,
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[400px]",
  },
  {
    id: "logo-cloud-1",
    name: "Logo Cloud 1",
    category: "Logo Cloud",
    description: "Clean minimalist layout presenting partner brands with monochromatic white filters and hover highlight states.",
    dependencies: [],
    isNew: true,
    gridClass: "md:row-span-1",
    viewportHeightClass: "h-[320px]",
  },
  {
    id: "logo-cloud-2",
    name: "Logo Cloud 2",
    category: "Logo Cloud",
    description: "Infinite scrolling loop slider of brand lockups with smooth progressive edge blurs.",
    dependencies: ["framer-motion"],
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-1",
    viewportHeightClass: "h-[320px]",
  },
];

export function getComponentManifestItem(id: string) {
  return COMPONENTS_MANIFEST.find((item) => item.id === id);
}
