import React from "react";

export default function LogoCloudCard({ minimal = false }: { minimal?: boolean }) {
  // Brand listings to retrieve tech logos using local assets or logo.dev
  // Tailored with custom displayName casing and inline styles matching their real brand font weights and families
  const brands = [
    { 
      name: "Vercel", 
      displayName: "Vercel",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "600", letterSpacing: "-0.03em" },
      path: "/logos/vercel.com-logo.webp" 
    },
    { 
      name: "Supabase", 
      displayName: "Supabase",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "700", letterSpacing: "-0.01em" },
      path: "/logos/supabase.com-logo.webp" 
    },
    { 
      name: "Stripe", 
      displayName: "stripe",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "600", letterSpacing: "-0.04em" },
      path: "/logos/stripe.com-logo.webp" 
    },
    { 
      name: "Claude", 
      displayName: "Claude",
      style: { fontFamily: "var(--font-serif), Georgia, serif", fontWeight: "500", fontSize: "0.85rem", letterSpacing: "0.01em" },
      path: "/logos/claude.com-logo.webp" 
    },
    { 
      name: "Figma", 
      displayName: "figma",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "700", letterSpacing: "-0.03em" },
      domain: "figma.com" 
    },
    { 
      name: "Spotify", 
      displayName: "Spotify",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "700", letterSpacing: "-0.03em" },
      path: "/logos/spotify.com-logo.webp" 
    },
    { 
      name: "Slack", 
      displayName: "slack",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "700", letterSpacing: "-0.02em" },
      domain: "slack.com" 
    },
    { 
      name: "Hulu", 
      displayName: "hulu",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "800", letterSpacing: "-0.03em" },
      path: "/logos/hulu.jp-logo.webp" 
    },
    { 
      name: "Netflix", 
      displayName: "NETFLIX",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "800", letterSpacing: "0.04em" },
      path: "/logos/netflix.com-logo.webp" 
    },
    { 
      name: "Cisco", 
      displayName: "CISCO",
      style: { fontFamily: "var(--font-sans), sans-serif", fontWeight: "700", letterSpacing: "0.02em" },
      path: "/logos/cisco.com-logo.webp" 
    }
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full flex flex-col justify-center items-center px-6 py-16 h-full select-none">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Caption */}
        <p className="text-xs font-heading font-medium text-white/75 mb-10 tracking-wide">
          Trusted by high-performance engineering teams worldwide
        </p>

        {/* Logo Rows grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-12 gap-x-8 items-center justify-items-center">
          {brands.map((brand, idx) => {
            const imgSrc = brand.path
              ? brand.path
              : `https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`;

            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 h-8 group transition-all duration-300 w-fit cursor-pointer"
              >
                <img
                  src={imgSrc}
                  alt={brand.name}
                  className={`h-5 w-auto object-contain rounded opacity-85 group-hover:opacity-100 transition-all duration-300 shrink-0 select-none ${
                    brand.name === "Vercel" || brand.name === "Supabase" ? "h-4" : ""
                  }`}
                />
                <span 
                  style={brand.style}
                  className="text-xs text-white/60 group-hover:text-white transition-colors select-none"
                >
                  {brand.displayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#09090b] flex items-center justify-center"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[320px] rounded-lg bg-[#09090b] border border-white/5 overflow-hidden flex flex-col items-center justify-center select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
