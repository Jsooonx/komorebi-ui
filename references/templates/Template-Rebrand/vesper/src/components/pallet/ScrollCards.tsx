import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  cardImages,
  cascade,
  clamp,
  getTimeForProgress,
  HERO_ROW_Y,
  hoverEase,
  slots,
  smoothEase,
  CARD_SIZE,
  type Slot,
} from "./constants";

type Vp = { w: number; h: number };

function CardImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

const cardBaseStyle: React.CSSProperties = {
  width: CARD_SIZE,
  height: CARD_SIZE,
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0,0,0,0.40)",
  border: "1px solid var(--border)",
};

/* ---------- Intro overlay ---------- */

function IntroCard({
  src,
  slot,
  vp,
  revealDelay,
  revealDuration,
}: {
  src: string;
  slot: Slot;
  vp: Vp;
  revealDelay: number;
  revealDuration: number;
}) {
  const cx = vp.w / 2 + slot.x;
  const cy = HERO_ROW_Y + slot.y;
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        translateX: "-50%",
        translateY: "-50%",
        x: cx,
        y: cy,
        rotate: slot.rotate,
        scale: slot.scale,
        zIndex: slot.z,
        ...cardBaseStyle,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: revealDelay, duration: revealDuration, ease: "easeOut" }}
    >
      <CardImage src={src} />
    </motion.div>
  );
}

function LeadIntroCard({ src, vp, onComplete }: { src: string; vp: Vp; onComplete: () => void }) {
  const introDelay = 0.8;
  const introDuration = 0.72;
  const travelToRightDuration = 0.6;
  const sweepLeftDuration = 1.6;
  const totalDuration = introDuration + travelToRightDuration + sweepLeftDuration;

  const slot6 = slots[6];
  const slot0 = slots[0];

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 10,
        ...cardBaseStyle,
      }}
      initial={{ opacity: 0 }}
      animate={{
        x: [vp.w / 2, vp.w / 2, vp.w / 2 + slot6.x, vp.w / 2 + slot0.x],
        y: [vp.h / 2 + 180, HERO_ROW_Y, HERO_ROW_Y + slot6.y, HERO_ROW_Y + slot0.y],
        rotate: [0, 0, slot6.rotate, slot0.rotate],
        scale: [0.3, 1, slot6.scale, slot0.scale],
        opacity: [0, 1, 1, 1],
      }}
      transition={{
        delay: introDelay,
        duration: totalDuration,
        times: [
          0,
          introDuration / totalDuration,
          (introDuration + travelToRightDuration) / totalDuration,
          1,
        ],
        ease: [smoothEase, smoothEase, smoothEase],
      }}
      onAnimationComplete={onComplete}
    >
      <CardImage src={src} />
    </motion.div>
  );
}

function IntroOverlay({ vp, onComplete }: { vp: Vp; onComplete: () => void }) {
  const introDelay = 0.8;
  const introDuration = 0.72;
  const travelToRightDuration = 0.6;
  const sweepLeftDuration = 1.6;
  const sweepStart = introDelay + introDuration + travelToRightDuration;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => {
        const progress = (slots[i].x - slots[6].x) / (slots[0].x - slots[6].x);
        const revealTime = getTimeForProgress(progress, smoothEase);
        const revealDelay = sweepStart + revealTime * sweepLeftDuration;
        const revealDuration = i <= 3 ? 0.06 : 0.18;
        return (
          <IntroCard
            key={i}
            src={cardImages[i]}
            slot={slots[i]}
            vp={vp}
            revealDelay={revealDelay}
            revealDuration={revealDuration}
          />
        );
      })}
      <LeadIntroCard src={cardImages[0]} vp={vp} onComplete={onComplete} />
    </div>
  );
}

/* ---------- Scroll-linked overlay ---------- */

function ScrollLinkedCard({
  i,
  src,
  progress,
  lp,
  vp,
}: {
  i: number;
  src: string;
  progress: MotionValue<number>;
  lp: number;
  vp: Vp;
}) {
  const [hovered, setHovered] = useState(false);
  const slot = slots[i];
  const cas = cascade[i];

  const p1 = lp * 0.25;
  const p2 = lp * 0.48;
  const p3 = lp * 0.65;

  const s1Cx = vp.w / 2 + slot.x;
  const s1Cy = HERO_ROW_Y + slot.y;
  const stackCx = vp.w / 2;
  const stackCy = vp.h / 2;
  const cascadeLeftRef = Math.max(vp.w * 0.62, 800);
  const s2Cx = cascadeLeftRef + cas.left + CARD_SIZE / 2;
  const s2Cy = cas.top + CARD_SIZE / 2;

  const x = useTransform(progress, [0, p1, p2, p3], [s1Cx, stackCx, stackCx, s2Cx]);
  const y = useTransform(progress, [0, p1, p2, p3], [s1Cy, stackCy, s2Cy, s2Cy]);
  const rotate = useTransform(progress, [0, p1, p2, p3], [slot.rotate, 0, 0, cas.rotate]);
  const scaleX = useTransform(progress, [0, p1, p2, p3], [slot.scale, 1.06, 0.94, 0.88]);
  const scaleY = useTransform(progress, [0, p1, p2, p3], [slot.scale, 1.06, 0.94, 0.88]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ transition: { duration: 0.2, ease: hoverEase } }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        translateX: "-50%",
        translateY: "-50%",
        x,
        y,
        rotate,
        scaleX,
        scaleY,
        zIndex: hovered ? 30 : cas.z,
        pointerEvents: "auto",
        cursor: "pointer",
        ...cardBaseStyle,
      }}
    >
      <CardImage src={src} />
    </motion.div>
  );
}

function ScrollLinkedOverlay({
  progress,
  currentProgress,
  lockProgress,
  scrollableHeight,
  vp,
}: {
  progress: MotionValue<number>;
  currentProgress: number;
  lockProgress: number;
  scrollableHeight: number;
  vp: Vp;
}) {
  const lp = Math.max(lockProgress, 0.05);
  const clampedProgress = useTransform(progress, (v) => Math.min(v, lp));
  const isLocked = currentProgress >= lp;

  const wrapperStyle: React.CSSProperties = isLocked
    ? {
        position: "absolute",
        top: lp * scrollableHeight,
        left: 0,
        width: "100%",
        height: vp.h,
        zIndex: 5,
      }
    : { position: "fixed", inset: 0, zIndex: 5 };

  return (
    <div style={wrapperStyle}>
      {cardImages.map((src, i) => (
        <ScrollLinkedCard
          key={`card-${i}`}
          i={i}
          src={src}
          progress={clampedProgress}
          lp={lp}
          vp={vp}
        />
      ))}
    </div>
  );
}

/* ---------- Main overlay ---------- */

export default function ScrollCards({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [vp, setVp] = useState<Vp>({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  });
  const [lockProgress, setLockProgress] = useState(0.5);
  const [scrollableHeight, setScrollableHeight] = useState(1);
  const [introDone, setIntroDone] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const measuredOnce = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const innerHeight = window.innerHeight;
      setVp({ w: window.innerWidth, h: innerHeight });
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const containerScrollHeight = container.scrollHeight;
      const scrollable = containerScrollHeight - innerHeight;
      const sectionTwo = document.querySelector<HTMLElement>('[data-section="two"]');
      if (sectionTwo && scrollable > 0) {
        const sectionTwoTop = sectionTwo.getBoundingClientRect().top + window.scrollY;
        const lp = clamp((sectionTwoTop - containerTop) / scrollable, 0.05, 0.99);
        setLockProgress(lp);
        setScrollableHeight(scrollable);
      }
      measuredOnce.current = true;
    };

    measure();
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [containerRef]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setCurrentProgress(v));
    return () => unsub();
  }, [scrollYProgress]);

  if (!mounted) return null;

  if (!introDone) {
    return <IntroOverlay vp={vp} onComplete={() => setIntroDone(true)} />;
  }

  return (
    <ScrollLinkedOverlay
      progress={scrollYProgress}
      currentProgress={currentProgress}
      lockProgress={lockProgress}
      scrollableHeight={scrollableHeight}
      vp={vp}
    />
  );
}
