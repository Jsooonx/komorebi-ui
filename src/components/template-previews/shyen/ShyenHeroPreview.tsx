import { useEffect, useState } from "react";
import "./ShyenHeroPreview.css";

const logoHeader = "https://qclay.design/lovable/shyen/logo-header.svg";
const headerVideo = "https://qclay.design/lovable/shyen/Header.mp4";
const avatar = "https://qclay.design/lovable/shyen/header_elipse.png";
const leftBg = "https://qclay.design/lovable/shyen/left.png";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ShyenHeroPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const T = {
    video: 0,
    nav: 900,
    logo: 1200,
    cta: 1400,
    heading: 1600,
    paragraph: 2200,
    form: 2600,
    avatar: 3000,
    testimonial: 3200,
    labels: 3400,
  };

  const headingWords = ["Your", "mind", "never", "gonna", "stop."];
  const paragraphLines = [
    "Shyen is 24/7 support for your mind. Created by",
    "renowned clinicians, it gives you the support you need,",
    "right when you need it.",
  ];

  return (
    <div className="shyen-preview w-full h-full absolute inset-0 overflow-hidden select-none">
      <section className="hero-section relative w-full h-full">
        {/* Blurred ambient green lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{
            width: "800px",
            height: "800px",
            borderRadius: "800px",
            background: "linear-gradient(325deg, #375B39 59.55%, #FAFF67 93.35%)",
            filter: "blur(120px)",
            left: "-150px",
            top: "-250px",
            opacity: 0.7,
          }}
        />

        {/* Outer Split Columns */}
        <div className="relative z-10 grid h-full grid-cols-2">
          {/* LEFT: Heading, Paragraph, Waitlist Form */}
          <div
            className="relative h-full flex flex-col justify-center px-12 text-left"
            style={{
              backgroundImage: `url(${leftBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Header logo */}
            <div 
              className="absolute left-12 top-6 flex items-center gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-10px)",
                transition: `opacity 0.6s ${EASE} ${T.logo}ms, transform 0.6s ${EASE} ${T.logo}ms`
              }}
            >
              <img src={logoHeader} alt="Shyen Logo" className="w-6 h-6" />
              <span className="text-white font-medium text-lg tracking-tight">Shyen</span>
            </div>

            <div className="max-w-[480px]">
              {/* Heading */}
              <h1
                className="text-white font-serif tracking-tight"
                style={{
                  fontSize: "58px",
                  lineHeight: "1.1",
                  fontWeight: 400,
                }}
              >
                {[headingWords.slice(0, 3), headingWords.slice(3)].map((line, li) => (
                  <span key={li} style={{ display: "block" }}>
                    {line.map((w, wi) => {
                      const idx = li === 0 ? wi : 3 + wi;
                      const delay = T.heading + idx * 110;
                      return (
                        <span key={wi} className="inline-block overflow-hidden mr-2">
                          <span
                            className="inline-block"
                            style={{
                              opacity: mounted ? 1 : 0,
                              transform: mounted ? "translateY(0)" : "translateY(110%)",
                              transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms`,
                            }}
                          >
                            {w}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h1>

              {/* Paragraph description */}
              <p className="mt-5 text-white/70 text-sm leading-relaxed">
                {paragraphLines.map((line, i) => {
                  const delay = T.paragraph + i * 100;
                  return (
                    <span
                      key={i}
                      className="block"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(15px)",
                        transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
                      }}
                    >
                      {line}
                    </span>
                  );
                })}
              </p>

              {/* Waitlist Form */}
              <form
                className="mt-6 flex items-center justify-between border border-white/10"
                style={{
                  width: "100%",
                  padding: "5px 6px 5px 6px",
                  borderRadius: "32px",
                  background: "rgba(0, 0, 0, 0.16)",
                  backdropFilter: "blur(15px)",
                  transformOrigin: "left center",
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? `shyen-FormPulse 0.7s ${EASE} ${T.form}ms both` : "none",
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  readOnly
                  placeholder="Enter your email address"
                  className="flex-grow bg-transparent border-0 outline-none px-4 text-xs text-white placeholder:text-white/40"
                />
                <button className="pill-button text-xs py-1.5 px-4 shrink-0">Join waitlist</button>
              </form>
            </div>
          </div>

          {/* RIGHT: Video, testimonials, labels */}
          <div
            className="relative h-full overflow-hidden"
            style={{
              clipPath: mounted ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: `clip-path 1.2s ${EASE}`,
            }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 33%" }}
              src={headerVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

            {/* Glass Testimonial Box */}
            <div
              className="absolute z-20 left-8 bottom-20 max-w-[320px] text-left"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translate(0, 0)" : "translate(-30px, 30px)",
                transition: `opacity 0.9s ${EASE} ${T.testimonial}ms, transform 1s ${EASE} ${T.testimonial}ms`,
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(17, 33, 21, 0.24)",
                  boxShadow: "0 0 10px 0 rgba(17, 33, 21, 0.13) inset",
                  backdropFilter: "blur(5px)",
                }}
              >
                <p className="text-white text-xs leading-normal opacity-90">
                  "This helped me organize my thoughts when I felt overwhelmed, and finally had a place to express myself without fear."
                </p>
              </div>
              <div
                className="mt-3 flex items-center gap-2"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.7s ${EASE} ${T.avatar}ms, transform 0.7s ${EASE} ${T.avatar}ms`,
                }}
              >
                <div
                  className="h-8 w-8 rounded-full border border-white/60"
                  style={{
                    backgroundImage: `url(${avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <span className="text-white font-serif text-[15px] font-medium leading-none">Lara simon</span>
              </div>
            </div>

            {/* Staggered tags in right corner */}
            <div
              className="absolute z-20 flex flex-col items-end right-8 bottom-8 gap-2"
            >
              {["AI Meditation", "Full Body syncing", "AI Data Insights"].map((t, i) => {
                const delay = T.labels + i * 120;
                return (
                  <span
                    key={t}
                    className="text-white text-xs px-4 py-2 rounded-full border border-white/10"
                    style={{
                      background: "rgba(17, 33, 21, 0.20)",
                      backdropFilter: "blur(15px)",
                      transformOrigin: "left center",
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "scaleX(1)" : "scaleX(0)",
                      transition: `opacity 0.5s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
