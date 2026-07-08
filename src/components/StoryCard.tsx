import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

export default function StoryCard() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setSlide(1), 3000);
    const i = setInterval(() => {
      setSlide(0);
      setTimeout(() => setSlide(1), 3000);
    }, 6000);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-1, 1], [-18, 18]);
  const rotateX = useTransform(sy, [-1, 1], [12, -12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div style={{ marginTop: 48, perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 310,
          height: 455,
          borderRadius: 28,
          background: "#1a1a1a",
          overflow: "hidden",
          position: "relative",
          transformStyle: "preserve-3d",
          rotateY,
          rotateX,
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <img
          src="https://qclay.design/lovable/synergy/person-2.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            mixBlendMode: "soft-light",
            background:
              "linear-gradient(160deg, rgba(220,255,90,0.65) 0%, rgba(170,230,70,0.35) 40%, rgba(80,140,40,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 15%, rgba(230,255,120,0.25), transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 28,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            display: "flex",
            gap: 6,
            zIndex: 20,
          }}
        >
          {[1, 2].map((n) => (
            <div
              key={n}
              className={`story-bar-${n}`}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 9999,
                background: "rgba(0,0,0,0.25)",
                overflow: "hidden",
              }}
            >
              <div
                className="story-bar-fill"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.95)",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "55%",
            background: "linear-gradient(0deg, #040504 20.54%, rgba(29,37,9,0) 100%)",
            pointerEvents: "none",
          }}
        />

        <motion.h3
          key={slide}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 24,
            right: 24,
            bottom: 88,
            zIndex: 10,
            color: "#fff",
            fontSize: 38,
            lineHeight: "40px",
            letterSpacing: "-0.5px",
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            margin: 0,
          }}
        >
          {slide === 0 ? (
            <>
              <span className="font-heading" style={{ fontWeight: 700 }}>
                Guiding
              </span>
              <br />
              <span className="font-serif" style={{ fontStyle: "italic", fontWeight: 400 }}>
                your money
              </span>
            </>
          ) : (
            <>
              <span className="font-heading" style={{ fontWeight: 700 }}>
                Building
              </span>
              <br />
              <span className="font-serif" style={{ fontStyle: "italic", fontWeight: 400 }}>
                the future
              </span>
            </>
          )}
        </motion.h3>

        <div
          style={{
            position: "absolute",
            left: 24,
            right: 24,
            bottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 10,
          }}
        >
          <div
            className="font-heading"
            style={{
              background: "rgba(255,255,255,0.96)",
              color: "#0a0a0a",
              fontSize: 13,
              fontWeight: 500,
              padding: "9px 16px",
              borderRadius: 9999,
              boxShadow: "0 6px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            Top Rated
          </div>
          {[Heart, MessageCircle].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 38,
                height: 38,
                borderRadius: 14,
                background: "rgba(20,20,20,0.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon size={18} color="#fff" strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
