import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunlightLeafLogo } from "@/components/DynamicIsland";
import { TemplatePreviewControls } from "@/components/templates/TemplatePreviewControls";

// Resolve Aura URL from environment variable, checking both server-side process.env and client-side import.meta.env
const getAuraUrl = () => {
  if (typeof window !== "undefined") {
    return import.meta.env.VITE_AURA_URL || "https://aura-ai-komorebi.vercel.app/";
  }
  return (
    (typeof process !== "undefined" ? process.env.VITE_AURA_URL : undefined) ||
    import.meta.env.VITE_AURA_URL ||
    "https://aura-ai-komorebi.vercel.app/"
  );
};

const AURA_URL = getAuraUrl();

export const Route = createFileRoute("/templates/aura")({
  component: AuraTemplatePage,
});

function AuraTemplatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    const returnToGallery = sessionStorage.getItem("komorebi_aura_return_to_gallery");
    if (returnToGallery) {
      sessionStorage.removeItem("komorebi_aura_return_to_gallery");
      window.history.back();
      return;
    }

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

      <TemplatePreviewControls onBack={handleBack} />
    </div>
  );
}
