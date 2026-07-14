import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SunlightLeafLogo } from "@/components/DynamicIsland";

// Resolve Aura URL from environment variable, checking both server-side process.env and client-side import.meta.env
const getAuraUrl = () => {
  if (typeof window !== "undefined") {
    return import.meta.env.VITE_AURA_URL || "http://localhost:3000";
  }
  return (
    (typeof process !== "undefined" ? process.env.VITE_AURA_URL : undefined) ||
    import.meta.env.VITE_AURA_URL ||
    "http://localhost:3000"
  );
};

const AURA_URL = getAuraUrl();

export const Route = createFileRoute("/templates/aura")({
  component: AuraTemplatePage,
});

function AuraTemplatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  console.log("Resolved VITE_AURA_URL:", AURA_URL);

  const handleBack = () => {
    // Save scroll target in session storage to trigger smooth scroll back on the landing page
    sessionStorage.setItem("komorebi_scroll_target", "templates");
    navigate({ to: "/" });
  };

  return (
    <div className="relative w-screen h-screen bg-[#08090c] overflow-hidden select-none">
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#08090c]"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center justify-center"
            >
              <SunlightLeafLogo className="w-12 h-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Iframe Viewer */}
      <iframe
        src={AURA_URL}
        className="w-full h-full border-none"
        title="Aura AI - Live Demo"
        onLoad={() => setIsLoading(false)}
      />

      {/* Floating Control: Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-cream/90 hover:bg-warm-cream text-moss-green border border-white/5 border-t-white/10 shadow-lg backdrop-blur cursor-pointer transition-all active:scale-[0.98] font-heading font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4 text-moss-green" />
          Back to Gallery
        </button>
      </div>

      {/* Watermark: Bottom Right */}
      <div className="absolute bottom-6 right-6 z-40 pointer-events-none">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-warm-cream/90 text-moss-green border border-white/5 border-t-white/10 shadow-lg backdrop-blur font-heading font-semibold text-xs">
          <SunlightLeafLogo className="w-5 h-5" />
          <span>Komorebi UI</span>
        </div>
      </div>
    </div>
  );
}
