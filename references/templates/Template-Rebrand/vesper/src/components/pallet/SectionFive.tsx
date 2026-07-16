import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionFive() {
  const [sliderProgress, setSliderProgress] = useState(50);

  return (
    <section
      data-section="five"
      style={{
        background: "transparent",
        minHeight: "100vh",
        padding: "120px 64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: 64,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side: Visual Comparison Frame */}
        <div
          style={{
            flex: "1 1 540px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : 1, // On mobile, show image second
          }}
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 580,
              height: 520,
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "#080808",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image A: Blueprint (Background Layer) */}
            <img
              src="/assets/vesper/blueprint.png"
              alt="Architectural Blueprint CAD"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
            />

            {/* Image B: Photo Render (Foreground Layer with ClipPath) */}
            <img
              src="/assets/vesper/light_study.png"
              alt="Physical Travertine Room"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                clipPath: `polygon(0 0, ${sliderProgress}% 0, ${sliderProgress}% 100%, 0 100%)`,
              }}
            />

            {/* Vertical Split Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${sliderProgress}%`,
                width: "1px",
                background: "var(--primary)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />

            {/* Drag Handle Knob */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${sliderProgress}%`,
                transform: "translate(-50%, -50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--background)",
                border: "1.5px solid var(--primary)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                color: "var(--primary)",
                zIndex: 21,
                pointerEvents: "none",
              }}
            >
              <ChevronLeft size={12} style={{ marginRight: -2 }} />
              <ChevronRight size={12} style={{ marginLeft: -2 }} />
            </div>

            {/* Invisible Range Slider for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderProgress}
              onChange={(e) => setSliderProgress(Number(e.target.value))}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "ew-resize",
                zIndex: 30,
              }}
            />
          </motion.div>
        </div>

        {/* Right Side: Explanatory & Labels */}
        <div style={{ flex: "1 1 480px", maxWidth: 520, order: 2 }}>
          <motion.div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "2.5px",
              color: "var(--muted-foreground)",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            Spatial Thresholds
          </motion.div>

          <motion.h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 60,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: "0 0 24px",
              color: "var(--foreground)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From Sketch to <em>Reality</em>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 300,
              color: "var(--muted-foreground)",
              lineHeight: 1.7,
              margin: "0 0 40px",
              letterSpacing: "0.2px",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Drag the divider to peel back the layers of design. Transition from the golden geometry
            of our CAD blueprint plans into the raw tactile warmth of the finished monolithic
            sanctuary.
          </motion.p>

          {/* Technical Data Sheet */}
          <motion.div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: 24,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 24px",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Layout Phase
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {sliderProgress < 30
                  ? "Vector Blueprint"
                  : sliderProgress > 70
                    ? "Physical Chamber"
                    : "Superimposed"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Drafting Precision
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                0.02mm Tolerance
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Render Contrast
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {sliderProgress}% Revealed
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Alignment State
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                Perfect Match
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
