import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ContextGuidanceBridge() {
  const bridgeRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bridgeRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  const coreScale = useTransform(progress, [0.16, 0.54, 0.9], [0.28, 1, 2.6]);
  const coreOpacity = useTransform(progress, [0.12, 0.25, 0.88], [0, 1, 0]);
  const pathLength = useTransform(progress, [0.23, 0.74], [0, 1]);
  const ribbonScale = useTransform(progress, [0.25, 0.86], [0.02, 1]);
  const labelOpacity = useTransform(progress, [0.42, 0.58, 0.84], [0, 1, 0]);

  return (
    <section className="context-guidance-bridge" ref={bridgeRef} aria-label="Context becoming guidance">
      <motion.div className="context-guidance-bridge__core" aria-hidden="true" style={{ scale: reduceMotion ? 1 : coreScale, opacity: reduceMotion ? 0.72 : coreOpacity }} />
      <svg className="context-guidance-bridge__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M 50 -4 C 47 22, 55 42, 50 58 C 46 73, 53 87, 50 104" style={{ pathLength: reduceMotion ? 1 : pathLength }} />
      </svg>
      <motion.div className="context-guidance-bridge__ribbon" aria-hidden="true" style={{ scaleY: reduceMotion ? 1 : ribbonScale }} />
      <motion.p style={{ opacity: reduceMotion ? 1 : labelOpacity }}>Context becomes guidance.</motion.p>
    </section>
  );
}
