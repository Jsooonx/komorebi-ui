export interface ComponentItem {
  id: string;
  name: string;
  category: "Layout Flow" | "Living Data" | "Micro-Breeze";
  description: string;
  aiPrompt: string;
  reactCode: string;
  dependencies?: string[];
  tailwindConfig?: string;
}

export const COMPONENTS_DB: ComponentItem[] = [
  {
    id: "curved-vertical-slider",
    name: "Curved Vertical Slider",
    category: "Layout Flow",
    description: "A vertical navigation slider featuring an elastic curved indicator line that slides and morphs dynamically to track active menu items, mimicking advanced SVG drawing without performance lag.",
    aiPrompt: "Build a vertical menu slider in React. On the right, display a curved indicator line (using a static vertical curve SVG). Position a circular white tracker dot directly on the curve's bend. When a menu item is hovered, translate the entire line container vertically using a smooth cubic-bezier transition (cubic-bezier(0.22, 1, 0.36, 1)) so the curve's bend aligns perfectly with the centered y-coordinate of the active menu icon. On the right column, reveal the card content using a fade-up animation.",
    dependencies: ["framer-motion", "lucide-react"],
    reactCode: `// Source code for Curved Vertical Slider
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Moon, Eye, Sparkles } from 'lucide-react';

const ITEMS = [
  { icon: Smile, label: 'Relaxation & Focus', desc: 'Guided breathing and mood checks to calm your mind.' },
  { icon: Moon, label: 'Sleep & Recovery', desc: 'Wind down routines synced with wearable tracker metrics.' },
  { icon: Eye, label: 'Mental Clarity', desc: 'Daily check-ins powered by emotion indicators.' },
  { icon: Sparkles, label: 'AI Science Tips', desc: 'Science-backed insights customized to your habits.' }
];

export default function CurvedVerticalSlider() {
  const [active, setActive] = useState(0);
  const step = 80 + 72; // icon size + gap
  const menuHeight = ITEMS.length * 80 + (ITEMS.length - 1) * 72;
  const targetY = active * step + 40;
  const lineTranslate = targetY - menuHeight / 2 - 91;

  return (
    <div className="flex items-center relative min-h-[500px] w-full max-w-4xl bg-warm-cream p-12 rounded-3xl border border-moss-green/10">
      {/* Left Menu Items */}
      <div className="flex flex-col gap-[72px] z-10">
        {ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = active === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActive(idx)}
              className="flex items-center gap-6 cursor-pointer transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#DDE3B9] border-2 border-moss-green/5 shadow-inner">
                <Icon className="w-8 h-8 text-moss-green" />
              </div>
              <span className="font-serif text-3xl text-moss-green">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Center Sliding SVG Line Indicator */}
      <div className="absolute left-[380px] top-1/2 -translate-y-1/2 w-[220px] h-[400px] pointer-events-none overflow-hidden mask-fade-vertical">
        <div 
          className="absolute left-0 top-1/2 w-[220px] h-[1088px] transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: \`translateY(calc(-50% + \${lineTranslate}px))\` }}
        >
          {/* Main Curve Line SVG */}
          <svg className="absolute left-0 top-0 w-full h-full" viewBox="0 0 220 1088" fill="none">
            <path d="M110 0V535C110 575 160 585 160 635C160 685 110 695 110 735V1088" stroke="#112115" strokeWidth="2" strokeOpacity="0.15" />
            <circle cx="160" cy="635" r="28" fill="#EAF1C1" stroke="#112115" strokeWidth="2" />
            <circle cx="160" cy="635" r="6" fill="#E8A969" />
          </svg>
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="ml-auto w-[360px] min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h3 className="font-serif text-4xl text-moss-green mb-4">{ITEMS[active].label}</h3>
            <p className="font-sans text-moss-green/70 text-lg leading-relaxed">{ITEMS[active].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}`
  },
  {
    id: "categorization-tree",
    name: "Responsive Connected Tree",
    category: "Living Data",
    description: "An animated responsive SVG tree diagram that connects parent and child nodes with smooth bezier paths, automatically recalculated on resize. Features pulsing energy dots moving along paths.",
    aiPrompt: "Build a responsive tree layout in React. Render parent and child boxes as HTML nodes. Place an absolute-positioned SVG layer underneath. Use React refs and a ResizeObserver to calculate the exact bounding boxes of each node. Draw dynamic SVG cubic bezier paths ('M x1 y1 C x1 midY, x2 midY, x2 y2') between child-top and parent-bottom coordinates. Animate the path drawing using Framer Motion pathLength. Animate a small white glow circle traveling infinitely along each path using standard SVG animateMotion linked to the path's ID.",
    dependencies: ["framer-motion", "lucide-react"],
    reactCode: `// Source code for Responsive Connected Tree
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

export default function CategorizationTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const leftChildRef = useRef<HTMLDivElement>(null);
  const rightChildRef = useRef<HTMLDivElement>(null);

  const [points, setPoints] = useState({ left: '', right: '' });
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = () => {
    const container = containerRef.current;
    const root = rootRef.current;
    const left = leftChildRef.current;
    const right = rightChildRef.current;

    if (!container || !root || !left || !right) return;

    const cr = container.getBoundingClientRect();
    setSize({ w: cr.width, h: cr.height });

    const getCenterBot = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height };
    };

    const getCenterTop = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - cr.left + r.width / 2, y: r.top - cr.top };
    };

    const pRoot = getCenterBot(root);
    const pLeft = getCenterTop(left);
    const pRight = getCenterTop(right);

    const makeBezier = (p1: any, p2: any) => {
      const midY = (p1.y + p2.y) / 2;
      return \`M \${p1.x} \${p1.y} C \${p1.x} \${midY}, \${p2.x} \${midY}, \${p2.x} \${p2.y}\`;
    };

    setPoints({
      left: makeBezier(pRoot, pLeft),
      right: makeBezier(pRoot, pRight)
    });
  };

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[360px] bg-moss-green p-12 rounded-3xl flex flex-col items-center justify-between gap-16 border border-white/10 overflow-hidden">
      {/* SVG Path Layer */}
      <svg width={size.w} height={size.h} className="absolute inset-0 pointer-events-none overflow-visible">
        {['left', 'right'].map((dir, idx) => {
          const pathD = dir === 'left' ? points.left : points.right;
          if (!pathD) return null;
          const pathId = \`tree-path-\${dir}\`;
          return (
            <g key={dir}>
              {/* Animated Path Reveal */}
              <motion.path
                id={pathId}
                d={pathD}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.2 }}
              />
              {/* Traveling energy dot */}
              <motion.circle
                r="3"
                fill="#E8A969"
                style={{ filter: 'drop-shadow(0 0 4px #E8A969)' }}
              >
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="\${idx * 0.4}s">
                  <mpath href={\`#\${pathId}\`} />
                </animateMotion>
              </motion.circle>
            </g>
          );
        })}
      </svg>

      {/* Root Node */}
      <div ref={rootRef} className="z-10 font-serif italic text-xl px-6 py-2.5 rounded-full border border-white/20 bg-white/10 text-warm-cream backdrop-blur-md">
        Categorization
      </div>

      {/* Child Nodes */}
      <div className="flex gap-16 z-10 w-full justify-center">
        <div ref={leftChildRef} className="font-sans text-sm font-medium bg-white text-moss-green rounded-xl p-4 shadow-xl max-w-[160px] text-center">
          🍔 Food & Groceries
        </div>
        <div ref={rightChildRef} className="font-sans text-sm font-medium bg-white text-moss-green rounded-xl p-4 shadow-xl max-w-[160px] text-center">
          🚗 Rides & Transit
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: "svg-progress-wheel",
    name: "Trigonometric Progress Wheel",
    category: "Living Data",
    description: "An animated responsive SVG progress wheel that uses React state hooks and standard mathematical trigonometry to redraw dynamic path wedges in real-time, delivering clean vector arcs.",
    aiPrompt: "Build a dynamic progress dial in React. Using an SVG element, render a circular progress tracker. Compute the start and end coordinates of the progress arc based on an angle state ranging from 0 to 90 degrees. Translate the angle to radians: rad = (angle - 90) * (Math.PI / 180). Calculate endX = cx + r * cos(rad) and endY = cy + r * sin(rad). Build a custom SVG path command dynamically: 'M cx cy L startX startY A r r 0 largeArc 1 endX endY Z'. Animate the angle state from 0 to 90 using requestAnimationFrame with cubic-bezier easing on scroll/intersection.",
    dependencies: ["framer-motion"],
    reactCode: `// Source code for Trigonometric Progress Wheel
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function SVGProgressWheel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setAngle(0);
      return;
    }

    const start = performance.now();
    const duration = 1600;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setAngle(90 * easeOutCubic(progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  // SVG trigonometry definitions
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 2.5;
  const r = size / 2 - stroke;
  
  // Angle calculations
  const rad = (angle - 90) * (Math.PI / 180);
  const endX = cx + r * Math.cos(rad);
  const endY = cy + r * Math.sin(rad);
  const largeArc = angle > 180 ? 1 : 0;
  const startX = cx;
  const startY = cy - r;
  
  const arcPath = angle <= 0.05
    ? ''
    : \`M \${cx} \${cy} L \${startX} \${startY} A \${r} \${r} 0 \${largeArc} 1 \${endX} \${endY} Z\`;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 bg-[#EAF1C1] rounded-3xl border border-moss-green/10 w-full max-w-sm">
      <div className="relative w-[260px] h-[260px]">
        {/* Trigonometric progress SVG */}
        <svg width={size} height={size} viewBox={\`0 0 \${size} \${size}\`} className="fill-none">
          <defs>
            <linearGradient id="wheel-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BECB6D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#BECB6D" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Base outer circle */}
          <circle cx={cx} cy={cy} r={r} stroke="#112115" strokeWidth={stroke} strokeOpacity="0.15" />
          
          {/* Dynamic computed path wedge */}
          {arcPath && (
            <path d={arcPath} fill="url(#wheel-gradient)" stroke="#112115" strokeWidth={stroke} strokeLinejoin="round" />
          )}

          {/* Tick lines */}
          <line x1={cx} y1={size - 16} x2={cx} y2={size - 2} stroke="#112115" strokeWidth={stroke} strokeOpacity="0.5" />
          <line x1={16} y1={cy} x2={2} y2={cy} stroke="#112115" strokeWidth={stroke} strokeOpacity="0.5" />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-serif text-5xl text-moss-green">{Math.round((angle / 360) * 100)}%</span>
          <span className="text-xs uppercase tracking-widest font-mono text-moss-green/60 mt-1">Calm Ratio</span>
        </div>
      </div>
    </div>
  );
}`
  }
];
