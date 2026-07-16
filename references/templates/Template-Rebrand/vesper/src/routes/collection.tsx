import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/pallet/Navbar";
import Background from "@/components/pallet/Background";
import { cardImages } from "@/components/pallet/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/collection")({
  component: CollectionPage,
});

const materials = [
  {
    id: "01",
    name: "Travertine Chair",
    category: "Furniture Study",
    material: "Unfilled Roman Travertine",
    dimensions: "580 × 520 × 740 mm",
    desc: "A monolithic chair carved from solid travertine stone, showcasing brutalist lines and raw geological textures.",
  },
  {
    id: "02",
    name: "Aged Bronze Vase",
    category: "Object Study",
    material: "Cast Bronze, Acid Patinated",
    dimensions: "240 × 240 × 420 mm",
    desc: "A heavy, sculptural vessel with a dark, textured patina that interacts dynamically with raking light.",
  },
  {
    id: "03",
    name: "Concrete Vault",
    category: "Spatial Element",
    material: "Reinforced Plaster Concrete",
    dimensions: "3600 × 2400 × 2800 mm",
    desc: "A modular interior architectural vault designed to diffuse overhead skylight into a soft, quiet glow.",
  },
  {
    id: "04",
    name: "Charcoal Oak Desk",
    category: "Furniture Study",
    material: "Fumed European Oak, Brass Joinery",
    dimensions: "1800 × 900 × 750 mm",
    desc: "A wide, low-profile workspace featuring dark fumed oak and hand-polished warm brass inset connections.",
  },
  {
    id: "05",
    name: "Plaster & Brass Pendant",
    category: "Lighting Study",
    material: "Molded Gypsum Plaster, Brushed Brass",
    dimensions: "600 × 600 × 120 mm",
    desc: "A ceiling light sculpture that reflects light back onto a textured plaster dome, casting a warm, indirect glow.",
  },
  {
    id: "06",
    name: "Heavy Ivory Linen",
    category: "Textile Study",
    material: "100% Raw Belgian Linen",
    dimensions: "Custom Dimensions",
    desc: "Heavyweight, open-weave linen panels designed to control acoustics and filter daylight.",
  },
  {
    id: "07",
    name: "Cantilevered Staircase",
    category: "Spatial Element",
    material: "Honed Limestone, Internal Steel Frame",
    dimensions: "Scale to Space",
    desc: "Floating stone steps anchored directly into a raw plaster wall, emphasizing tension and architectural weightlessness.",
  },
];

function CollectionPage() {
  const [inquiredId, setInquiredId] = useState<string | null>(null);

  const handleInquire = (name: string, id: string) => {
    setInquiredId(id);
    alert(
      `Inquiry initiated for: ${name}. Our studio representative will contact you with material specs and pricing.`,
    );
    setTimeout(() => setInquiredId(null), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: 120,
        overflowX: "hidden",
      }}
    >
      <Background />
      <Navbar />

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "160px 40px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          style={{ marginBottom: 40 }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--foreground)",
              opacity: 0.6,
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            <ArrowLeft size={16} /> Back to Studio
          </Link>
        </motion.div>

        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 64,
              fontWeight: 400,
              color: "var(--foreground)",
              margin: "0 0 16px",
              letterSpacing: "-1.5px",
            }}
          >
            The Material <em>Collection</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 300,
              color: "var(--muted-foreground)",
              maxWidth: 600,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            A curated study of seven textures, weights, and spatial interactions. Each piece is
            custom built in our workshop using traditional techniques and raw geological components.
          </motion.p>
        </div>

        {/* Grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 40,
          }}
        >
          {materials.map((item, index) => {
            const imgSrc = cardImages[index] || "/assets/vesper/card-1.png";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + index * 0.08 }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Image panel */}
                <div
                  style={{ height: 280, width: "100%", overflow: "hidden", position: "relative" }}
                >
                  <img
                    src={imgSrc}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      color: "var(--primary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {item.id}
                  </span>
                </div>

                {/* Content info */}
                <div style={{ padding: 28 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--primary)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: 8,
                    }}
                  >
                    {item.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "var(--foreground)",
                      margin: "0 0 12px",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 300,
                      color: "var(--muted-foreground)",
                      lineHeight: 1.6,
                      marginBottom: 20,
                      minHeight: 68,
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Metadata table */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: 16,
                      marginBottom: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      <span style={{ color: "var(--muted-foreground)" }}>Materiality</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
                        {item.material}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      <span style={{ color: "var(--muted-foreground)" }}>Dimensions</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
                        {item.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => handleInquire(item.name, item.id)}
                    style={{
                      width: "100%",
                      background: inquiredId === item.id ? "var(--secondary)" : "transparent",
                      border: "1px solid var(--border)",
                      color:
                        inquiredId === item.id ? "var(--muted-foreground)" : "var(--foreground)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "12px 0",
                      borderRadius: 8,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (inquiredId !== item.id) {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.color = "var(--primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (inquiredId !== item.id) {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--foreground)";
                      }
                    }}
                  >
                    Request Specifications <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
