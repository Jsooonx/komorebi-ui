import { useState, useEffect } from "react";
import { User, Sun, Moon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

function Logo() {
  return (
    <motion.svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{ cursor: "pointer" }}
    >
      {/* Left arm of V - Solid brass */}
      <motion.path d="M3 4 L9 4 L15 22 L9 22 Z" fill="var(--primary)" />
      {/* Right arm of V - Overlapping translucent slab */}
      <motion.path d="M25 4 L19 4 L13 22 L19 22 Z" fill="var(--primary)" fillOpacity={0.7} />
    </motion.svg>
  );
}

const trailingLinks = [
  { name: "Collection", path: "/collection" },
  { name: "Spaces", path: "/" },
  { name: "Atelier", path: "/" },
  { name: "Inquire", path: "/" },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--foreground)",
  padding: "6px 14px",
  background: "none",
  border: "none",
  cursor: "pointer",
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  opacity: 0.8,
  textDecoration: "none",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const dark = !isDark;
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: scrolled ? "16px 48px" : "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        zIndex: 50,
        transition:
          "padding 0.3s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* CSS Underline Hover Effects */}
      <style>{`
        .nav-link {
          position: relative;
          transition: color 0.3s ease, opacity 0.3s ease !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background-color: var(--primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link:hover {
          color: var(--primary) !important;
          opacity: 1 !important;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>

      {/* Left logo */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
              marginLeft: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Vesper
          </span>
        </Link>
      </motion.div>

      {/* Center Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Link
            to="/collection"
            className="nav-link"
            style={{
              ...linkStyle,
              display: "flex",
              alignItems: "center",
              opacity: 1,
              color: "var(--primary)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--primary)",
                marginRight: 8,
                display: "inline-block",
              }}
            />
            View Editions
          </Link>
        </motion.div>

        {trailingLinks.map((l, idx) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.05, ease: "easeOut" }}
          >
            <Link to={l.path} className="nav-link" style={linkStyle}>
              {l.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Theme Toggle Switch */}
        <motion.button
          onClick={toggleDark}
          aria-label="Toggle Theme"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            padding: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Sun size={17} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Moon size={17} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* User Account */}
        <motion.button
          aria-label="Account"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            padding: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={17} />
        </motion.button>
      </div>
    </nav>
  );
}
