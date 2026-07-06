import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const QUESTIONS = [
  {
    q: "Can I afford to invest $500 this month?",
    a: "Based on your current income and expenses, you'll have around $620 in available balance after bills. Investing $500 is within reach - but consider saving at least $200 as an emergency buffer.",
  },
  {
    q: "When will I reach my savings goal?",
    a: "At your current savings rate of $850/month, you'll reach your $10,000 goal in approximately 8 months. Cutting discretionary spending by 15% could shave off 3 weeks.",
  },
  {
    q: "How much did I spend on food last month?",
    a: "You spent $643 on food in March - $421 on groceries and $222 on dining out. That's 18% above your monthly food budget of $545.",
  },
];

const NodeA = forwardRef<HTMLDivElement, { children: React.ReactNode; isInView: boolean; delay: number }>(
  ({ children, isInView, delay }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="font-serif"
      style={{
        borderRadius: 9999,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
        padding: "10px 20px",
        fontStyle: "italic",
        fontSize: 16,
        color: "#fff",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.div>
  )
);
NodeA.displayName = "NodeA";

const NodeB = forwardRef<HTMLDivElement, { children: React.ReactNode; isInView: boolean; delay: number }>(
  ({ children, isInView, delay }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="font-heading"
      style={{
        borderRadius: 12,
        background: "rgba(255,255,255,0.92)",
        padding: "10px 16px",
        fontSize: 12,
        fontWeight: 400,
        color: "rgba(0,0,0,0.75)",
        lineHeight: 1.5,
        display: "inline-block",
        maxWidth: 160,
      }}
    >
      {children}
    </motion.div>
  )
);
NodeB.displayName = "NodeB";

type Pt = { topX: number; topY: number; botX: number; botY: number };

function CategorizationTree({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [points, setPoints] = useState<Record<string, Pt>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = () => {
    const c = containerRef.current;
    if (!c) return;
    const cr = c.getBoundingClientRect();
    setSize({ w: cr.width, h: cr.height });
    const next: Record<string, Pt> = {};
    for (const [id, el] of Object.entries(nodeRefs.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[id] = {
        topX: r.left - cr.left + r.width / 2,
        topY: r.top - cr.top,
        botX: r.left - cr.left + r.width / 2,
        botY: r.top - cr.top + r.height,
      };
    }
    setPoints(next);
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const connections = [
    { from: "root", to: "transport", delay: 0.25 },
    { from: "root", to: "entertainment", delay: 0.4 },
    { from: "transport", to: "transportDetail", delay: 0.6 },
    { from: "entertainment", to: "entertainmentDetail", delay: 0.78 },
    { from: "root", to: "bills", delay: 0.95 },
    { from: "bills", to: "billsDetail", delay: 1.15 },
  ];

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    nodeRefs.current[id] = el;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 32,
        left: 16,
        right: 16,
        bottom: 110,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <svg
        width={size.w}
        height={size.h}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 1, overflow: "visible" }}
      >
        {connections.map((c, i) => {
          const p1 = points[c.from];
          const p2 = points[c.to];
          if (!p1 || !p2) return null;
          const x1 = p1.botX, y1 = p1.botY, x2 = p2.topX, y2 = p2.topY;
          const midY = (y1 + y2) / 2;
          const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
          const pathId = `tree-path-${i}`;
          return (
            <g key={i}>
              <motion.path
                id={pathId}
                d={d}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: c.delay }}
              />
              <motion.circle
                cx={x2}
                cy={y2}
                r={2.5}
                fill="rgba(255,255,255,0.9)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: c.delay + 0.5 }}
              />
              <motion.circle
                r={3}
                fill="#fff"
                style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 1, 0] } : {}}
                transition={{
                  duration: 2.4,
                  delay: c.delay + 0.6,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.9, 1],
                }}
              >
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${c.delay + 0.6}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </motion.circle>
            </g>
          );
        })}
      </svg>

      <NodeA ref={setRef("root")} isInView={isInView} delay={0}>
        Categorization
      </NodeA>
      <div style={{ display: "flex", gap: 16 }}>
        <NodeA ref={setRef("transport")} isInView={isInView} delay={0.18}>
          Transportation
        </NodeA>
        <NodeA ref={setRef("entertainment")} isInView={isInView} delay={0.36}>
          Entertainment
        </NodeA>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <NodeB ref={setRef("transportDetail")} isInView={isInView} delay={0.54}>
          Fuel, rides, car maintenance, public transit
        </NodeB>
        <NodeB ref={setRef("entertainmentDetail")} isInView={isInView} delay={0.72}>
          Streaming services, gaming, events
        </NodeB>
      </div>
      <NodeA ref={setRef("bills")} isInView={isInView} delay={0.9}>
        Bills and Utilities
      </NodeA>
      <NodeB ref={setRef("billsDetail")} isInView={isInView} delay={1.08}>
        Electricity, water, gas, internet, phone
      </NodeB>
    </div>
  );
}

function CardBottom({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ position: "absolute", bottom: 28, left: 24, right: 24, zIndex: 2 }}>
      <h3
        className="font-serif"
        style={{ fontStyle: "italic", fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8, margin: 0, marginBlockEnd: 8 }}
      >
        {title}
      </h3>
      <p className="font-heading" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

export default function AIIntelligence({ preview = false }: { preview?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setQIdx((v) => (v + 1) % QUESTIONS.length), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      style={preview ? {
        background: "transparent",
        padding: 0,
        width: "100%",
      } : {
        background: "#000",
        padding: "80px 48px",
        overflow: "hidden",
      }}
    >
      {!preview && (
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          className="font-heading"
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 2,
            color: "rgba(255,255,255,0.50)",
            marginBottom: 16,
          }}
        >
          AI INTELLIGENCE
        </div>
        <motion.h2
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ margin: 0, color: "#fff" }}
        >
          <span className="font-heading" style={{ fontSize: 72, fontWeight: 400, letterSpacing: "-0.2px" }}>
            Your personal{" "}
          </span>
          <span className="font-serif" style={{ fontSize: 72, fontWeight: 400, letterSpacing: "-0.2px" }}>
            AI advisor
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-heading"
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.60)",
            lineHeight: 1.6,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Experience the power of artificial intelligence working for your financial well being
        </motion.p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-stretch w-full max-w-5xl mx-auto">
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: "hidden", position: "relative" }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-1.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.30)" }} />

          <div
            style={{
              position: "absolute",
              top: 32,
              left: 24,
              right: 24,
              zIndex: 2,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(56px)",
              padding: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="https://qclay.design/lovable/synergy/Logo-lov.svg" alt="" style={{ width: 22, filter: "invert(1)" }} />
              </div>
              <span className="font-heading" style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>Synergeus</span>
            </div>
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.20)", marginBottom: 16 }} />

            <div style={{ position: "relative", height: 160 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={qIdx}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <div className="font-heading" style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: 12, lineHeight: 1.4 }}>
                    {QUESTIONS[qIdx].q}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src="https://qclay.design/lovable/synergy/Logo-lov.svg" alt="" style={{ width: 12, opacity: 0.8 }} />
                    </div>
                    <div className="font-heading" style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                      {QUESTIONS[qIdx].a}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
              <button
                className="font-heading"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "6px 6px 6px 16px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View transaction
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowUpRight size={12} color="#fff" />
                </span>
              </button>
              <a
                href="#"
                className="font-heading"
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.80)", textDecoration: "underline", cursor: "pointer" }}
              >
                ASK YOURS
              </a>
            </div>
          </div>

          <CardBottom title="Natural Language Queries" desc="Ask questions about your finances in plain English and get instant, accurate answers." />
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
          style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: "hidden", position: "relative" }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-2.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.20)" }} />

          <div style={{ position: "absolute", top: 32, left: 24, right: 24, zIndex: 2 }}>
            <div style={{ borderRadius: 20, background: "rgba(255,255,255,0.92)", padding: "24px 20px 20px", textAlign: "center" }}>
              <div className="font-heading" style={{ fontSize: 12, fontWeight: 400, color: "rgba(0,0,0,0.50)", lineHeight: 1.5, marginBottom: 4 }}>
                Expenses<br />expected to rise
              </div>
              <div className="font-serif" style={{ fontStyle: "italic", fontSize: 52, fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1 }}>
                3%
              </div>
              <div style={{ height: 16 }} />
              <div style={{ width: 280, maxWidth: "100%", height: 145, position: "relative", overflow: "visible", margin: "0 auto" }}>
                <svg viewBox="60 -25 220 145" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(180,210,80,0.85)" />
                      <stop offset="100%" stopColor="rgba(180,210,80,0.10)" />
                    </linearGradient>
                    <clipPath id="reveal">
                      <motion.rect
                        x={60}
                        y={-25}
                        height={145}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 220 } : {}}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#reveal)">
                    <path d="M 60 75 L 150 20 L 280 28 L 280 120 L 60 120 Z" fill="url(#areaFill)" />
                    <path d="M 60 75 L 150 20 L 280 28" stroke="#8DB800" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    <line x1={60} y1={75} x2={60} y2={120} stroke="#8DB800" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
                    <line x1={280} y1={28} x2={280} y2={120} stroke="#8DB800" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
                    <motion.line
                      x1={150} y1={-15} x2={150} y2={20}
                      stroke="#1DC47D" strokeWidth={1.2}
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
                    />
                    <motion.circle
                      cx={150} cy={-15} r={4.5} fill="#1DC47D"
                      style={{ transformOrigin: "150px -15px" }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, ease: "easeOut", delay: 1.7 }}
                    />
                  </g>
                </svg>
              </div>
              <div
                className="font-heading"
                style={{
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(8px)",
                  padding: "8px 16px",
                  marginTop: 16,
                  display: "inline-block",
                  fontSize: 11,
                  color: "rgba(0,0,0,0.60)",
                  textAlign: "center",
                }}
              >
                Tip: Reduce subscriptions to maintain savings target.
              </div>
            </div>
          </div>

          <CardBottom title="Predictive Analysis" desc="AI algorithms analyze patterns to forecast future expenses and income trends." />
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: "hidden", position: "relative" }}
        >
          <img src="https://qclay.design/lovable/synergy/back-3-3.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.30)" }} />

          <CategorizationTree isInView={isInView} />

          <CardBottom title="Smart Categorization" desc="Automatically categorize transactions with machine learning that improves over time." />
        </motion.div>
      </div>
    </div>
  );
}
