import React from "react";

export default function LogoCloudCard({ minimal = false }: { minimal?: boolean }) {
  // Brand listings to retrieve tech logos using local assets or logo.dev
  const brands = [
    { name: "Vercel", path: "/logos/vercel.com-logo.webp" },
    { name: "Supabase", path: "/logos/supabase.com-logo.webp" },
    { name: "Stripe", path: "/logos/stripe.com-logo.webp" },
    { name: "Claude", path: "/logos/claude.com-logo.webp" },
    { name: "Figma", domain: "figma.com" },
    { name: "Spotify", path: "/logos/spotify.com-logo.webp" },
    { name: "Slack", domain: "slack.com" },
    { name: "Hulu", path: "/logos/hulu.jp-logo.webp" },
    { name: "Netflix", path: "/logos/netflix.com-logo.webp" },
    { name: "Cisco", path: "/logos/cisco.com-logo.webp" }
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
                <span className="font-heading text-xs font-semibold text-white/55 group-hover:text-white transition-colors tracking-wide select-none">
                  {brand.name}
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
