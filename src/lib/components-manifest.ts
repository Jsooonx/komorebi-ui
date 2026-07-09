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
  cliCommand?: string;
  isNew?: boolean;
  gridClass?: string;
  viewportHeightClass?: string;
}

export const COMPONENTS_MANIFEST: ComponentManifestItem[] = [
  {
    id: "image-reveal",
    name: "Image Reveal",
    category: "Image Reveal",
    description: "Hover reactive image clipping path mask overlay with organic animations.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add image-reveal",
    isNew: true,
  },
  {
    id: "hover-members",
    name: "Hover Members",
    category: "Hover Members",
    description: "Card list stagger scale animations on cursor enter events.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add hover-members",
    isNew: true,
  },
  {
    id: "toolkit-stack-swiper",
    name: "Toolkit Stack Swiper",
    category: "Stack Swiper",
    description: "A deck-style stack swiper with 3D tilt tracking and spring physics.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add toolkit-stack-swiper",
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "devouring-details",
    name: "Devouring Details",
    category: "Devouring Details",
    description: "Expanding interactive list block with smooth element height transitions.",
    cliCommand: "npx komorebi-ui add devouring-details",
  },
  {
    id: "dynamic-island",
    name: "Dynamic Island Nav Card",
    category: "Dynamic Island",
    description: "Apple-style Dynamic Island expanding notification controller card.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add dynamic-island",
    isNew: true,
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[240px]",
  },
  {
    id: "dither-canvas",
    name: "WebGL Dither Shader",
    category: "WebGL Dither",
    description: "Retro dithered image shader visualizer card running in WebGL canvas.",
    dependencies: ["@react-three/fiber", "three"],
    cliCommand: "npx komorebi-ui add dither-canvas",
  },
  {
    id: "text-roll",
    name: "Text Roll Animator",
    category: "Text Roll",
    description: "Smooth 3D keyframe text roll effect on word hover events.",
    dependencies: ["gsap"],
    cliCommand: "npx komorebi-ui add text-roll",
  },
  {
    id: "border-beam",
    name: "SVG Border Beam",
    category: "Border Beam",
    description: "Outline path SVG glowing animation border runner card.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add border-beam",
  },
  {
    id: "interactive-navbar",
    name: "Mac-Dock Navbar",
    category: "Mac-Dock",
    description: "Smooth layout-scale magnifying glass Mac-dock navigator element.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add interactive-navbar",
    isNew: true,
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[180px]",
  },
  {
    id: "infinite-marquee",
    name: "Infinite Icon Marquee",
    category: "Icon Marquee",
    description: "Continuous horizontal marquee ticker animation showcasing brand elements.",
    dependencies: ["lucide-react"],
    cliCommand: "npx komorebi-ui add infinite-marquee",
    gridClass: "md:col-span-2",
    viewportHeightClass: "h-[130px]",
  },
  {
    id: "audio-equalizer",
    name: "Audio Reactive Equalizer",
    category: "Audio Equalizer",
    description: "Simulated audio frequency bar graph visualizer reacting to hover coordinates.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add audio-equalizer",
  },
  {
    id: "pixel-shimmer",
    name: "Pixel Shimmer Card",
    category: "Pixel Shimmer",
    description: "Interactive pixel-surface shimmer card with hover and focus-aware glow pulses.",
    cliCommand: "npx komorebi-ui add pixel-shimmer",
    dependencies: [],
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "pipeline-stepper",
    name: "Pipeline Stepper",
    category: "Pipeline Stepper",
    description: "Interactive multi-step deployment pipeline stepper controller.",
    dependencies: ["framer-motion"],
    cliCommand: "npx komorebi-ui add pipeline-stepper",
    gridClass: "md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "holographic-terminal",
    name: "Typewriter CLI Terminal",
    category: "CLI Terminal",
    description: "Simulated console window outputting text strings dynamically.",
    cliCommand: "npx komorebi-ui add holographic-terminal",
  },
  {
    id: "mega-menu-navbar",
    name: "Mega Menu Navbar",
    category: "Mega Menu 1",
    description: "Shadcn-based floating navbar with premium animated mega menu dropdown panels.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    cliCommand: "npx komorebi-ui add mega-menu-navbar",
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[380px]",
  },
  {
    id: "mega-menu-navbar-2",
    name: "Mega Menu Navbar 2",
    category: "Mega Menu 2",
    description:
      "Scroll-responsive morphing navbar that transitions from a flat fixed header to a premium floating pill layout on scroll.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    cliCommand: "npx komorebi-ui add mega-menu-navbar-2",
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[500px]",
  },
  {
    id: "mega-menu-navbar-3",
    name: "Mega Menu Navbar 3",
    category: "Mega Menu 3",
    description:
      "Floating mega menu navbar where logo and CTA dynamically morph inside on scroll, leaving only clean core navigation.",
    dependencies: ["@radix-ui/react-navigation-menu", "framer-motion"],
    cliCommand: "npx komorebi-ui add mega-menu-navbar-3",
    isNew: true,
    gridClass: "md:col-span-2 md:row-span-2",
    viewportHeightClass: "h-[500px]",
  },
];

export function getComponentManifestItem(id: string) {
  return COMPONENTS_MANIFEST.find((item) => item.id === id);
}
