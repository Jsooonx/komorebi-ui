import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jellyScaleX = [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1];
const jellyScaleY = [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1];

const words = ["Dialogue", "between", "form", "atmosphere."];
const slides = [
  "/assets/vesper/banner-1.png",
  "/assets/vesper/banner-2.png",
  "/assets/vesper/banner-3.png",
];

export default function SectionThree() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(id);
  }, [activeSlide]);

  return (
    <section
      data-section="three"
      style={{
        background: "transparent",
        minHeight: "100vh",
        padding: "80px 64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          marginBottom: 40,
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "2.5px",
            color: "var(--muted-foreground)",
            marginBottom: 20,
          }}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          VESPER ARCHITECTURE STUDY
        </motion.div>

        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 72,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              style={{ display: "inline-block", marginRight: "0.2em" }}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Autoplay banner */}
      <motion.div
        style={{
          width: "100%",
          borderRadius: 24,
          overflow: "hidden",
          height: 600,
          background: "#111111",
          position: "relative",
        }}
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {slides.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
            animate={{
              opacity: i === activeSlide ? 1 : 0,
              scale: i === activeSlide ? 1 : 1.04,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}

        {/* dots */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            zIndex: 10,
            display: "flex",
            gap: 5,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
              style={{
                height: 6,
                width: i === activeSlide ? 18 : 6,
                background: i === activeSlide ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                borderRadius: 9999,
                border: "none",
                padding: 0,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Watch CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 28,
            display: "inline-block",
          }}
        >
          <motion.span
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: 9999,
              border: "2px solid rgba(255,255,255,0.40)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 9999,
              border: "2px solid rgba(255,255,255,0.25)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
          <motion.button
            style={{
              position: "relative",
              zIndex: 2,
              background: "var(--primary)",
              color: "var(--background)",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: 9999,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            Watch Film
          </motion.button>
        </div>

        {/* prev / next */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            display: "flex",
            gap: 10,
          }}
        >
          <motion.button
            aria-label="Previous slide"
            onClick={() => setActiveSlide((s) => (s - 1 + 3) % 3)}
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.90)",
              borderRadius: "50%",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.08,
              background: "#FFFFFF",
              transition: { duration: 0.2 },
            }}
          >
            <ChevronLeft size={20} color="#111111" />
          </motion.button>
          <motion.button
            aria-label="Next slide"
            onClick={() => setActiveSlide((s) => (s + 1) % 3)}
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.90)",
              borderRadius: "50%",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.08,
              background: "#FFFFFF",
              transition: { duration: 0.2 },
            }}
          >
            <ChevronRight size={20} color="#111111" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
