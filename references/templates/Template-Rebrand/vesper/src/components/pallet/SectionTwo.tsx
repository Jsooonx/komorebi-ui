import { useRef } from "react";
import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const h2Lines: { words: string[]; color: string }[] = [
  { words: ["Curating,", "forming"], color: "var(--foreground)" },
  { words: ["&", "crafting", "spaces", "that"], color: "var(--primary)" },
  { words: ["inspire", "the", "soul."], color: "var(--foreground)" },
];

export default function SectionTwo() {
  const ref = useRef<HTMLDivElement>(null);

  let globalWordIndex = 0;

  return (
    <section
      ref={ref}
      data-section="two"
      style={{
        background: "transparent",
        minHeight: "calc(100vh - 30px)",
        padding: "80px 64px 0",
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ width: 520, paddingTop: 32 }}>
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
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          SPATIAL POETRY
        </motion.div>

        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 60,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            margin: 0,
          }}
        >
          {h2Lines.map((line, li) => (
            <span key={li} style={{ display: "block", color: line.color }}>
              {line.words.map((word) => {
                const idx = globalWordIndex++;
                return (
                  <motion.span
                    key={`${word}-${idx}`}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: idx * 0.06,
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h2>

        <motion.p
          style={{
            fontFamily: "var(--font-sans)",
            marginTop: 28,
            fontSize: 15,
            fontWeight: 300,
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            maxWidth: 365,
            letterSpacing: "0.2px",
          }}
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          A dynamic playground of form and function. Vesper creates architectural dialogs where
          light, mass, and texture converge to celebrate physical craftsmanship.
        </motion.p>

        <motion.div
          style={{ display: "flex", marginTop: 48, gap: 12 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        >
          <PrimaryButton
            label="Explore Spaces"
            onClick={() => window.location.assign("/collection")}
          />
          <SecondaryButton label="Our Approach" outline />
        </motion.div>
      </div>
    </section>
  );
}
