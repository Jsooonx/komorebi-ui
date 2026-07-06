export default function Navbar() {
  const items = ["Advisors", "What we do", "AI Intelligence", "Tools"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 32px",
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center", height: 48 }}>
        <img
          src="/KomorebuUIScaled.png"
          alt="Komorebi UI"
          style={{ height: 28 }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(28,28,28,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 9999,
            padding: "6px 8px",
            display: "flex",
            gap: 4,
          }}
        >
          {items.map((label) => (
            <a
              key={label}
              href="#"
              className="font-heading"
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,0.80)",
                padding: "8px 16px",
                borderRadius: 9999,
                textDecoration: "none",
                background: "transparent",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="#"
            className="font-heading"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.80)",
              padding: "8px 16px",
              textDecoration: "none",
            }}
          >
            Login
          </a>
          <button
            className="font-heading"
            style={{
              background: "#fff",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 20px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
            }}
          >
            Find an advisor
          </button>
        </div>
      </div>
    </nav>
  );
}
