export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  description: string;
  gridSize: "large" | "medium" | "small" | "tall" | "wide";
}

export const projects: Project[] = [
  {
    id: "aespa",
    title: "AESPA — AUTUMN",
    category: "Editorial",
    image: "/assets/slide-1.jpg",
    client: "SM Entertainment",
    year: "2025",
    description: "Visual art direction and promotional artwork for Aespa's 6th mini album 'Autumn Come Back'. The design merges cyberpunk aesthetic with gritty grain textures and futuristic typographic layouts.",
    gridSize: "large"
  },
  {
    id: "vogue",
    title: "VOGUE — LOOK FAMOUS",
    category: "Branding",
    image: "/assets/slide-2.png",
    client: "Condé Nast",
    year: "2026",
    description: "A digital editorial design cover and brand campaign featuring Timothée Chalamet. Blending high-fashion monochrome photography with minimalist geometric frames and crimson color blocks.",
    gridSize: "tall"
  },
  {
    id: "urban-style",
    title: "LOST IN THE NOISE",
    category: "Editorial",
    image: "/assets/slide-3.jpg",
    client: "Urban Style",
    year: "2026",
    description: "An experimental street fashion editorial poster exploring halftone visual styles, massive typography integration, and intense contrast composition.",
    gridSize: "medium"
  },
  {
    id: "kinetic-type",
    title: "KINETIC TEXTURES",
    category: "3D Art",
    image: "/assets/project-kinetic.png",
    client: "Self-Initiated",
    year: "2026",
    description: "A series of abstract 3D experiments exploring kinetic typography, procedural glass shaders, and dynamic lighting simulations.",
    gridSize: "small"
  },
  {
    id: "fuse-branding",
    title: "FUSE BRAND SYSTEM",
    category: "Branding",
    image: "/assets/project-fuse.png",
    client: "Fuse Inc.",
    year: "2025",
    description: "A comprehensive brand identity overhaul for Fuse, focusing on fluid logos, monochrome letterforms, and generative branding guidelines.",
    gridSize: "wide"
  },
  {
    id: "fluid-shapes",
    title: "FLUID SHAPE GENERATOR",
    category: "Digital",
    image: "/assets/project-fluid.png",
    client: "Norvin Agency",
    year: "2026",
    description: "A generative web tool that renders liquid metal blobs reacting to physics and audio frequencies in real-time.",
    gridSize: "small"
  }
];
