import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      style={{
        marginTop: 120,
        borderTop: "1px solid var(--border)",
        padding: "80px 64px 48px",
        position: "relative",
        zIndex: 10,
        background: "transparent",
        fontFamily: "var(--font-sans)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* 3-Column Info Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          justifyContent: "space-between",
          marginBottom: 80,
        }}
      >
        {/* Col 1: Studio Info */}
        <div style={{ flex: "1 1 260px" }}>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--primary)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: 20,
            }}
          >
            Studio Locations
          </h4>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              margin: "0 0 12px",
            }}
          >
            <strong style={{ color: "var(--foreground)" }}>Vesper Tokyo</strong>
            <br />
            3-5-1 Minami-Aoyama, Minato-ku
            <br />
            Tokyo 107-0062
          </p>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "var(--foreground)" }}>Vesper Rome</strong>
            <br />
            Via Giulia 93, Centro Storico
            <br />
            Roma 00186
          </p>
        </div>

        {/* Col 2: Material Studies */}
        <div style={{ flex: "1 1 200px" }}>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--primary)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: 20,
            }}
          >
            Material Studies
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              "Travertine",
              "Cast Bronze",
              "Reinforced Concrete",
              "Fumed Oak",
              "Gypsum Plaster",
              "Raw Belgian Linen",
              "Honed Limestone",
            ].map((m) => (
              <li key={m} style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                {m} Study
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div style={{ flex: "1 1 200px" }}>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--primary)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: 20,
            }}
          >
            Studio Directory
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              { name: "Collection", path: "/collection" },
              { name: "Spaces", path: "/" },
              { name: "Atelier", path: "/" },
              { name: "Inquire", path: "/" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    fontSize: 13,
                    color: "var(--foreground)",
                    textDecoration: "none",
                    opacity: 0.8,
                    transition: "color 0.2s ease, opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.opacity = "0.8";
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Massive Graphic Logo background-like watermarked name */}
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(60px, 12vw, 150px)",
          fontWeight: 400,
          textAlign: "center",
          color: "var(--foreground)",
          opacity: 0.04,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          userSelect: "none",
          pointerEvents: "none",
          margin: "40px 0",
        }}
      >
        Vesper
      </div>

      {/* Bottom Copyright & Attribution */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted-foreground)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        <div>© {currentYear} Vesper Atelier. All rights reserved.</div>
        <div style={{ color: "var(--primary)", fontWeight: 500 }}>Komorebi UI catalog</div>
      </div>
    </motion.footer>
  );
}
