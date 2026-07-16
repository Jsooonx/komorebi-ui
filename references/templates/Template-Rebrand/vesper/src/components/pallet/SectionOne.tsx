import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const jellyScaleX = [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1];
const jellyScaleY = [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1];

const line1 = ["Sculpting", "silent"];
const line2 = ["spaces", "&", "mass."];

export default function SectionOne() {
  let globalWordIndex = 0;

  const renderLine = (words: string[]) =>
    words.map((word) => {
      const idx = globalWordIndex++;
      return (
        <motion.span
          key={`${word}-${idx}`}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
        >
          {word}
        </motion.span>
      );
    });

  return (
    <section style={{ minHeight: "100vh", overflow: "hidden" }}>
      <main
        style={{
          paddingTop: 160,
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 90,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            color: "var(--foreground)",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <span style={{ display: "block" }}>{renderLine(line1)}</span>
          <span style={{ display: "block", fontStyle: "italic", fontWeight: 300 }}>
            {renderLine(line2)}
          </span>
        </h1>

        {/* Card + chat bubble spacer */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 260,
            marginTop: 40,
          }}
        />

        <motion.p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 300,
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            maxWidth: 540,
            marginTop: 48,
            marginLeft: "auto",
            marginRight: "auto",
            letterSpacing: "0.2px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          Vesper Atelier explores the silent dialogue between form, space, and raw textures,
          crafting bespoke furniture, spatial objects, and minimalist environments.
        </motion.p>

        <motion.div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 36,
            paddingBottom: 80,
            justifyContent: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <PrimaryButton
            label="Explore Collection"
            onClick={() => window.location.assign("/collection")}
          />
          <SecondaryButton label="Inquire" outline />
        </motion.div>
      </main>
    </section>
  );
}
