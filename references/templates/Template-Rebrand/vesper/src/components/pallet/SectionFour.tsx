import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timeStages = [
  {
    label: "Dawn",
    time: "06:00 AM",
    azimuth: "92° E",
    altitude: "12°",
    temp: "3200 K",
    shadows: "Extended / Soft",
    tone: "Warm Alabaster Glow",
    filter: "brightness(0.9) contrast(0.95) saturate(1.15) sepia(0.2)",
    overlay: "linear-gradient(135deg, rgba(234, 160, 80, 0.18) 0%, rgba(0, 0, 0, 0) 80%)",
    blendMode: "color-burn" as const,
    spotlight: "radial-gradient(circle at 50% 60%, rgba(234, 160, 80, 0.1) 0%, rgba(0,0,0,0) 70%)",
  },
  {
    label: "Noon",
    time: "12:00 PM",
    azimuth: "180° S",
    altitude: "84°",
    temp: "5500 K",
    shadows: "Compressed / Sharp",
    tone: "Neutral Daylight",
    filter: "brightness(1.12) contrast(1.08) saturate(1.0) sepia(0)",
    overlay: "rgba(255, 255, 255, 0)",
    blendMode: "normal" as const,
    spotlight: "rgba(255,255,255,0)",
  },
  {
    label: "Dusk",
    time: "06:00 PM",
    azimuth: "268° W",
    altitude: "8°",
    temp: "2200 K",
    shadows: "Infinite / Reddened",
    tone: "Crimson Twilight",
    filter: "brightness(0.8) contrast(1.05) saturate(1.35) sepia(0.35) hue-rotate(-10deg)",
    overlay: "linear-gradient(210deg, rgba(220, 80, 40, 0.22) 0%, rgba(0, 0, 0, 0) 85%)",
    blendMode: "color-burn" as const,
    spotlight: "radial-gradient(circle at 50% 60%, rgba(220, 80, 40, 0.15) 0%, rgba(0,0,0,0) 70%)",
  },
  {
    label: "Night",
    time: "11:00 PM",
    azimuth: "340° N",
    altitude: "-48°",
    temp: "6500 K",
    shadows: "Ambient / Spotlighted",
    tone: "Indigo & Brass Lamp",
    filter: "brightness(0.42) contrast(1.22) saturate(0.8) sepia(0.08) hue-rotate(185deg)",
    overlay: "rgba(12, 18, 48, 0.42)",
    blendMode: "multiply" as const,
    spotlight:
      "radial-gradient(circle at 48% 54%, rgba(197, 168, 128, 0.28) 0%, rgba(0,0,0,0) 50%)",
  },
];

export default function SectionFour() {
  const [stageIndex, setStageIndex] = useState(1);
  const current = timeStages[stageIndex];

  return (
    <section
      data-section="four"
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
        {/* Left Side: Explanatory & Controls */}
        <div style={{ flex: "1 1 480px", maxWidth: 520 }}>
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
            Chronology of Light
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
            Chamber of <em>Shadows</em>
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
            A physical study in transient light. Scrub the timeline to observe how dawn, noon,
            sunset, and nightfall alter the visual volume and raw textures of a travertine interior
            sanctuary.
          </motion.p>

          {/* Interactive Timeline Slider */}
          <motion.div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "24px 32px 32px",
              marginBottom: 40,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--primary)",
                  fontWeight: 500,
                }}
              >
                TIMELINE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--foreground)",
                  fontWeight: 600,
                }}
              >
                {current.time}
              </span>
            </div>

            {/* Slider track */}
            <div style={{ position: "relative", padding: "10px 0" }}>
              <input
                type="range"
                min="0"
                max="3"
                value={stageIndex}
                onChange={(e) => setStageIndex(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  appearance: "none",
                  height: 2,
                  background: "var(--border)",
                  outline: "none",
                  cursor: "pointer",
                }}
                className="light-study-slider"
              />
              <style>{`
                input[type=range].light-study-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: var(--primary);
                  box-shadow: 0 0 10px rgba(197, 168, 128, 0.3);
                  transition: transform 0.1s ease;
                }
                input[type=range].light-study-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                }
                input[type=range].light-study-slider::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: var(--primary);
                  border: none;
                  box-shadow: 0 0 10px rgba(197, 168, 128, 0.3);
                  transition: transform 0.1s ease;
                  cursor: pointer;
                }
                input[type=range].light-study-slider::-moz-range-thumb:hover {
                  transform: scale(1.2);
                }
              `}</style>
            </div>

            {/* Snap Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              {timeStages.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => setStageIndex(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: stageIndex === idx ? 600 : 400,
                    color: stageIndex === idx ? "var(--primary)" : "var(--muted-foreground)",
                    cursor: "pointer",
                    padding: "4px 8px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Technical data table */}
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
            transition={{ duration: 0.6, delay: 0.4 }}
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
                Sun Azimuth
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {current.azimuth}
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
                Sun Altitude
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {current.altitude}
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
                Color Temperature
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {current.temp}
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
                Atmospheric Tone
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {current.tone}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Image Chamber Frame */}
        <div
          style={{
            flex: "1 1 540px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            {/* The main rendering base image */}
            <motion.img
              src="/assets/vesper/light_study.png"
              alt="Daylight Chronology Study Room"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
              animate={{
                filter: current.filter,
              }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />

            {/* Environmental blend overlay */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
              animate={{
                background: current.overlay,
                mixBlendMode: current.blendMode,
              }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />

            {/* Local ambient spotlight / lamp glow */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
              animate={{
                background: current.spotlight,
              }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />

            {/* Monospace overlay tag */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 9999,
                padding: "8px 16px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--foreground)",
                zIndex: 10,
                backdropFilter: "blur(4px)",
              }}
            >
              Chamber: {current.shadows}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
