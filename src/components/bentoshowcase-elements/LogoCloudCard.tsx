import React from "react";

export default function LogoCloudCard({ minimal = false }: { minimal?: boolean }) {
  // Brand domain listings to retrieve tech logos using logo.dev
  const brands = [
    { name: "Vercel", domain: "vercel.com" },
    { name: "Supabase", domain: "supabase.com" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "Claude", domain: "anthropic.com" },
    { name: "Figma", domain: "figma.com" },
    { name: "Spotify", domain: "spotify.com" },
    { name: "Slack", domain: "slack.com" },
    { name: "Hulu", domain: "hulu.com" },
    { name: "Netflix", domain: "netflix.com" },
    { name: "Cisco", domain: "cisco.com" }
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
        <p className="text-[11px] font-sans font-medium tracking-wider text-white/45 uppercase mb-10">
          Trusted by high-performance engineering teams worldwide
        </p>

        {/* Logo Rows grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-12 gap-x-8 items-center justify-items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-8 group transition-all duration-300 w-fit cursor-pointer"
            >
              <img
                src={`https://img.logo.dev/${brand.domain}?token=pk_FklYVGBwT-mKrXMQ7yPyqQ&format=png`}
                alt={brand.name}
                className="h-6 w-auto object-contain brightness-0 invert opacity-35 group-hover:opacity-100 transition-all duration-300 shrink-0 select-none"
              />
            </div>
          ))}
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
