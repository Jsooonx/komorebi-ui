import { useState } from "react";

export function PrimaryButton({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "oklch(0.78 0.08 85)" : "var(--primary)",
        color: "var(--background)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 600,
        padding: "14px 28px",
        borderRadius: 9999,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </button>
  );
}

export function SecondaryButton({
  label,
  outline = false,
  onClick,
}: {
  label: string;
  outline?: boolean;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(234, 231, 226, 0.08)" : "transparent",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 500,
        padding: "14px 24px",
        borderRadius: 9999,
        border: outline ? "1.5px solid rgba(234, 231, 226, 0.2)" : "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </button>
  );
}
