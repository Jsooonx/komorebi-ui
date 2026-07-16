import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

function IndicatorButton({
  onClick,
  children,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 36,
        height: 36,
        border: "1.5px solid rgba(234, 231, 226, 0.2)",
        borderRadius: 8,
        background: hover ? "rgba(234, 231, 226, 0.08)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

export default function ScrollIndicator() {
  const scrollBy = (dir: number) =>
    window.scrollBy({ top: dir * window.innerHeight, behavior: "smooth" });

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <IndicatorButton label="Scroll up" onClick={() => scrollBy(-1)}>
        <ChevronUp size={16} color="var(--foreground)" />
      </IndicatorButton>
      <IndicatorButton label="Scroll down" onClick={() => scrollBy(1)}>
        <ChevronDown size={16} color="var(--foreground)" />
      </IndicatorButton>
    </div>
  );
}
