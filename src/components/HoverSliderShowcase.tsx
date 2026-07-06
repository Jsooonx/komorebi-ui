import { useState } from "react";
import { Sparkles, Zap, Layers, Terminal, ArrowUpRight } from "lucide-react";

const HorizontalSvg = "https://qclay.design/lovable/shyen/horizontal.svg";
const LineSvg = "https://qclay.design/lovable/shyen/line.svg";
const BoolSvg = "https://qclay.design/lovable/shyen/bool.svg";
const SliderBg = "https://qclay.design/lovable/shyen/slider_bg.png";
const BeforeNumber = "https://qclay.design/lovable/shyen/before_number.svg";

type Item = {
  icon: React.ReactNode;
  label: string;
  title: string;
  list: string[];
};

const ITEMS: Item[] = [
  {
    icon: <Sparkles className="w-8 h-8 text-[#E8A969]" />,
    label: "Physics-Backed Motion",
    title: "Physics-Backed Motion",
    list: [
      "Drag items with realistic mass, velocity, and bounce constraints",
      "Stiff spring-based snapping that feels organic to finger drag",
      "Inertia decay algorithms for clean friction and deceleration",
      "High performance WebGL physics grids rendering at 120 FPS"
    ],
  },
  {
    icon: <Zap className="w-8 h-8 text-[#E8A969]" />,
    label: "Cascading Entry Flows",
    title: "Cascading Entry Flows",
    list: [
      "Smooth delay cascading for text, wrappers, grids, and assets",
      "GSAP split text engine reveals letters and words dynamically",
      "Custom scroll triggered viewport bounds detection",
      "Native hardware accelerated CSS transitions under the hood"
    ],
  },
  {
    icon: <Layers className="w-8 h-8 text-[#E8A969]" />,
    label: "WebGL Liquid Shaders",
    title: "WebGL Liquid Shaders",
    list: [
      "Deep neon aurora curtain backdrops built with lightweight OGL",
      "Reactive mouse coordinates coordinates warp fluid mesh paths",
      "Configurable noise parameters, scanline frequency, and color hues",
      "Fully responsive resizing optimized for high DPI Retina displays"
    ],
  },
  {
    icon: <Terminal className="w-8 h-8 text-[#E8A969]" />,
    label: "Shadcn-like CLI Install",
    title: "Shadcn-like CLI Install",
    list: [
      "Single file downloads directly into your local components folder",
      "No bloated NPM dependencies, keeping your node_modules lean",
      "Automatically resolves Tailwind variables and theme mappings",
      "Full TypeScript declarations and custom parameters config"
    ],
  },
];

const ICON_SIZE = 80;
const GAP = 72;
const STEP = ICON_SIZE + GAP; // 152px

const LINE_W = 220;
const LINE_H = 1088;
const BOOL_TOP_IN_LINE = 635;
const BOOL_OFFSET = BOOL_TOP_IN_LINE - LINE_H / 2; // 91

export default function HoverSliderShowcase() {
  const [active, setActive] = useState<number | null>(0);
  const hasActive = active !== null;
  const activeItem = hasActive ? ITEMS[active!] : null;

  const itemCenter = (i: number) => i * STEP + ICON_SIZE / 2;
  const menuHeight = ITEMS.length * ICON_SIZE + (ITEMS.length - 1) * GAP;

  const targetY = hasActive ? itemCenter(active!) : menuHeight / 2;
  const lineTranslate = targetY - menuHeight / 2 - BOOL_OFFSET;

  return (
    <section className="relative w-full overflow-hidden bg-[#090909] py-24 sm:py-32 px-6 md:px-12 select-none border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 w-full">
          <span className="text-xs font-mono text-[#E8A969] tracking-widest uppercase mb-3">
            INTERACTIVE SLIDER
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-tight">
            How Komorebi works
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed font-heading">
            Hover over the menu items to explore our layout mechanics and design architecture.
          </p>
        </div>

        {/* Desktop Slider (Hidden on Mobile) */}
        <div className="hidden lg:block relative w-full h-[620px] mt-12">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              minHeight: menuHeight + 80,
            }}
          >
            {/* LEFT COLUMN: MENU ITEMS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${GAP}px`,
                zIndex: 20,
              }}
            >
              {ITEMS.map((it, i) => {
                const isActive = active === i;
                const dim = !isActive;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActive(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 28,
                      cursor: "pointer",
                      opacity: dim ? 0.35 : 1,
                      transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {/* Circle icon wrapper */}
                    <div
                      style={{
                        display: "flex",
                        width: 80,
                        height: 80,
                        justifyContent: "center",
                        alignItems: "center",
                        aspectRatio: "1/1",
                        borderRadius: 96,
                        border: isActive
                          ? "2px solid rgba(232, 169, 165, 0.25)"
                          : "2px solid rgba(255, 255, 255, 0.05)",
                        background: isActive ? "#161616" : "#121212",
                        transition: "all 400ms ease",
                        flexShrink: 0,
                        boxShadow: isActive ? "0 0 20px rgba(232, 169, 105, 0.1)" : "none"
                      }}
                    >
                      {it.icon}
                    </div>
                    <span
                      style={{
                        color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.45)",
                        fontFamily: "var(--font-heading)",
                        fontSize: 24,
                        fontWeight: 500,
                        letterSpacing: "-0.5px",
                        transition: "color 400ms ease",
                      }}
                    >
                      {it.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* MID COLUMN: DIVISION LINE */}
            <div
              style={{
                position: "absolute",
                left: 480,
                top: "50%",
                transform: "translateY(-50%)",
                width: LINE_W,
                height: menuHeight,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {/* Vertical divider */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  marginLeft: 94,
                  height: 1000,
                  width: 10,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  pointerEvents: "none",
                }}
              >
                <img
                  src={HorizontalSvg}
                  alt=""
                  style={{ width: 10, height: 1000, display: "block", opacity: 0.15, filter: "invert(1)" }}
                />
              </div>
              
              {/* Curve + marker indicator */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: LINE_W,
                  height: menuHeight,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: LINE_W,
                    height: LINE_H,
                    transform: `translateY(calc(-50% + ${lineTranslate}px))`,
                    transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
                  <img
                    src={LineSvg}
                    alt=""
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: LINE_W,
                      height: LINE_H,
                      opacity: 0.25,
                      filter: "invert(1)"
                    }}
                  />
                  <img
                    src={BoolSvg}
                    alt=""
                    style={{
                      position: "absolute",
                      left: 20,
                      top: BOOL_TOP_IN_LINE,
                      width: 56,
                      height: 56,
                      transform: "translate(-50%, -50%)",
                      filter: "invert(1) sepia(50%) saturate(1000%) hue-rotate(340deg)" // make it goldish
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS CONTAINER */}
            <div
              style={{
                marginLeft: "auto",
                width: 500,
                minHeight: menuHeight,
                zIndex: 20,
              }}
            >
              {hasActive && activeItem && (
                <RightContent item={activeItem} key={activeItem.label} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile View (Fall back to a beautiful list stack) */}
        <div className="lg:hidden flex flex-col gap-8 mt-8">
          {ITEMS.map((item, index) => (
            <div 
              key={index}
              className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {item.label}
                </h3>
              </div>
              <div className="flex flex-col gap-3.5 bg-black/35 rounded-xl p-4 border border-white/5">
                {item.list.map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img
                      src={BeforeNumber}
                      alt=""
                      className="w-4 h-4 opacity-35 mt-1 shrink-0 filter invert"
                    />
                    <span className="text-sm font-heading text-white/70 leading-snug">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function RightContent({ item }: { item: Item }) {
  return (
    <div>
      {/* Panel Box */}
      <div
        style={{
          position: "relative",
          minWidth: 480,
          height: 314,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.05)",
          background: `#121212 url(${SliderBg}) center/cover no-repeat`,
          boxShadow: "0 20px 68px 0 rgba(255,255,255,0.05) inset",
          overflow: "hidden",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 0ms both",
        }}
      >
        <PanelInner item={item} />
      </div>

      {/* Details title */}
      <h3
        style={{
          marginTop: 40,
          marginBottom: 0,
          color: "#ffffff",
          fontFamily: "var(--font-serif)",
          fontSize: 32,
          fontWeight: 400,
          lineHeight: "38px",
          letterSpacing: "-1px",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 300ms both",
        }}
      >
        Interactive {item.title} built for organic interfaces
      </h3>

      {/* Description text */}
      <p
        style={{
          marginTop: 16,
          marginBottom: 0,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "var(--font-heading)",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: "22px",
          letterSpacing: "-0.2px",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 400ms both",
        }}
      >
        Elevate your web applications with fluid components that follow natural interaction patterns and keep layouts completely responsive.
      </p>

      {/* Interactive CTA */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          height: 56,
          padding: "0 20px",
          alignItems: "center",
          gap: 8,
          borderRadius: 100,
          border: "1px solid rgba(255,255,255,0.05)",
          background: "#161616",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 500ms both",
        }}
        className="group hover:border-[#E8A969]/30 transition-all duration-300 cursor-pointer"
      >
        <span
          style={{
            color: "#E8A969",
            fontFamily: "var(--font-heading)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.2px",
            textTransform: "uppercase"
          }}
        >
          Explore code setup
        </span>
        <div
          style={{
            marginLeft: "auto",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(232,169,105,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="group-hover:scale-105 transition-transform duration-300"
        >
          <ArrowUpRight className="w-4 h-4 text-[#E8A969]" />
        </div>
      </div>

      <style>{`
        @keyframes hssFadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function PanelInner({ item }: { item: Item }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 24,
          color: "#FFF",
          fontFamily: "var(--font-serif)",
          fontSize: 24,
          fontWeight: 400,
          lineHeight: "26px",
          letterSpacing: "-0.5px",
          animation: "hssFadeUp 500ms cubic-bezier(0.22,1,0.36,1) 100ms both",
        }}
      >
        {item.title}
      </div>
      
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 80,
          display: "flex",
          padding: 16,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 10,
          borderRadius: 16,
          border: "1.5px solid rgba(255,255,255,0.05)",
          background: "rgba(22,22,22,0.65)",
          boxShadow: "0 20px 124px 0 rgba(0,0,0,0.5) inset",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          animation: "hssFadeUp 500ms cubic-bezier(0.22,1,0.36,1) 200ms both",
        }}
      >
        {item.list.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              animation: `hssFadeUp 450ms cubic-bezier(0.22,1,0.36,1) ${250 + i * 80}ms both`,
            }}
          >
            <img
              src={BeforeNumber}
              alt=""
              style={{ width: 14, height: 14, opacity: 0.35, marginTop: 3, flexShrink: 0, filter: "invert(1)" }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-heading)",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "18px",
                letterSpacing: "-0.2px",
              }}
            >
              {row}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
