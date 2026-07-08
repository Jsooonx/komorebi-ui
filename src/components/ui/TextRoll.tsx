import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

const STAGGER = 0.015;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  hovered?: boolean;
}> = ({ children, className, center = false, hovered }) => {
  return (
    <motion.span
      initial="initial"
      whileHover={hovered === undefined ? "hovered" : undefined}
      animate={hovered !== undefined ? (hovered ? "hovered" : "initial") : undefined}
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 1.1,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.22,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.22,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default TextRoll;
