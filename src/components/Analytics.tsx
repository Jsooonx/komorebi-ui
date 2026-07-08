import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Info } from "lucide-react";

function useCountUp(target: number, start: number, isInView: boolean, duration = 1200) {
  const [val, setVal] = useState(start);
  useEffect(() => {
    if (!isInView) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(start + (target - start) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, start, duration]);
  return val;
}

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Analytics({ preview = false }: { preview?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollInView = useInView(ref, { once: true, margin: "-100px" });
  const isInView = preview ? true : scrollInView;
  const bigNum = useCountUp(14250, 100, isInView);
  const smallNum = useCountUp(925, 10, isInView);

  return (
    <div
      ref={ref}
      style={
        preview
          ? {
              background: "transparent",
              padding: 0,
            }
          : {
              background: "#000",
              padding: "80px 48px",
            }
      }
      className="overflow-hidden w-full"
    >
      {!preview && (
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            className="font-heading"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.50)",
              marginBottom: 16,
            }}
          >
            ANALYTICS
          </div>
          <motion.h2
            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ margin: 0, color: "#fff" }}
          >
            <span
              className="font-heading"
              style={{
                display: "block",
                fontSize: 72,
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.2px",
              }}
            >
              Smarter cash flow
            </span>
            <span
              className="font-serif"
              style={{
                display: "block",
                fontSize: 72,
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.2px",
              }}
            >
              insights at a glance
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-heading"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(255,255,255,0.60)",
              marginTop: 16,
            }}
          >
            Keep your income and expense in sync with real-time AI
          </motion.p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-stretch w-full max-w-5xl mx-auto">
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{
            flex: 1.4,
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            minHeight: 480,
          }}
        >
          <img
            src="https://qclay.design/lovable/synergy/block-1.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          <div
            style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.35)" }}
          />

          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              right: 32,
              zIndex: 2,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(56px)",
              padding: "24px 28px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span
                className="font-heading"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                MONTHLY OVERVIEW
              </span>
              <span
                className="font-heading"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  color: "rgba(255,255,255,0.60)",
                  textDecoration: "underline",
                }}
              >
                MONTHLY
              </span>
            </div>
            <div
              className="font-heading"
              style={{
                fontSize: 42,
                fontWeight: 400,
                letterSpacing: "-1px",
                color: "#fff",
                marginBottom: 24,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(bigNum)}
            </div>
            <div
              style={{
                width: "100%",
                borderTop: "1px dashed rgba(255,255,255,0.20)",
                marginBottom: 20,
              }}
            />

            {[
              {
                label: "Income",
                value: "$15,500",
                w: "75%",
                fill: "linear-gradient(90deg, #1DC47D 60.8%, rgba(29,196,125,0) 100%)",
              },
              {
                label: "Investment",
                value: "$4,250",
                w: "45%",
                fill: "linear-gradient(90deg, #B48F17 55.74%, rgba(180,143,23,0) 100%)",
              },
              {
                label: "Expenses",
                value: "$8,200",
                w: "60%",
                fill: "linear-gradient(90deg, #FFF 52.46%, rgba(255,255,255,0) 100%)",
              },
            ].map((r) => (
              <div key={r.label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    className="font-heading"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.70)" }}
                  >
                    {r.label}
                  </span>
                  <span
                    className="font-heading"
                    style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}
                  >
                    {r.value}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    borderRadius: 5,
                    width: "100%",
                    marginTop: 6,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.13,
                      background: "linear-gradient(90deg, #040504 0%, rgba(4,5,4,0.50) 100%)",
                      borderRadius: 5,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: r.w,
                      borderRadius: 5,
                      background: r.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <h3
              className="font-serif"
              style={{
                fontSize: 26,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#fff",
                marginBottom: 8,
                margin: 0,
                marginBlockEnd: 8,
              }}
            >
              See the full picture of your finances.
            </h3>
            <p
              className="font-heading"
              style={{
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.65)",
                margin: 0,
              }}
            >
              AI keeps your income, expenses, and goals effortlessly aligned giving you a clearer
              view of your financial rhythm, smarter decisions, and lasting stability.
            </p>
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          style={{
            flex: 1,
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            minHeight: 480,
          }}
        >
          <img
            src="https://qclay.design/lovable/synergy/block-2.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          <div
            style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.25)" }}
          />

          <div
            className="font-heading"
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              zIndex: 2,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.70)",
              textDecoration: "underline",
            }}
          >
            DAILY
          </div>

          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              zIndex: 2,
              width: 200,
              borderRadius: 16,
              background: "#fff",
              padding: "16px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                className="font-heading"
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#000",
                  letterSpacing: "-0.5px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmt(smallNum)}
              </span>
              <Info size={16} color="rgba(0,0,0,0.35)" />
            </div>
            <div
              className="font-heading"
              style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", marginBottom: 14 }}
            >
              Sent today
            </div>
            <button
              className="font-heading"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#000",
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 14px",
                borderRadius: 9999,
                width: "100%",
                border: "none",
                cursor: "pointer",
              }}
            >
              View transaction
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowUpRight size={13} color="#fff" />
              </span>
            </button>
          </div>

          <img
            src="https://qclay.design/lovable/synergy/person-2.png"
            alt=""
            style={{
              position: "absolute",
              bottom: 140,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              width: 200,
              height: 240,
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: 16,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 160,
              right: 24,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                borderRadius: 9999,
                padding: "8px 16px 8px 10px",
              }}
            >
              <img
                src="https://qclay.design/lovable/synergy/Logo-lov.svg"
                alt="Synergeus"
                style={{ height: 18 }}
              />
            </div>
            <button
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ArrowUpRight size={16} color="#fff" />
            </button>
          </div>

          <div style={{ position: "absolute", bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <h3
              className="font-serif"
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: "#fff",
                marginBottom: 8,
                margin: 0,
                marginBlockEnd: 8,
              }}
            >
              Your money, perfect transactions
            </h3>
            <p
              className="font-heading"
              style={{
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.65)",
                margin: 0,
              }}
            >
              Stay grounded with real-time visibility into where your money's going and growing.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
