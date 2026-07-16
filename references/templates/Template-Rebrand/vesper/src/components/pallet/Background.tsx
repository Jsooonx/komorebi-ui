export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "8%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(197,168,128,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "10%",
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(197,168,128,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(circle, rgba(197,168,128,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
