import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SunlightLeafLogo } from "@/components/DynamicIsland";
import { TemplatePreviewControls } from "@/components/templates/TemplatePreviewControls";

const getVellumUrl = () => {
  if (typeof window !== "undefined") {
    return import.meta.env.VITE_VELLUM_URL || "https://vellum-komorebi.vercel.app/";
  }

  return (
    (typeof process !== "undefined" ? process.env.VITE_VELLUM_URL : undefined) ||
    import.meta.env.VITE_VELLUM_URL ||
    "https://vellum-komorebi.vercel.app/"
  );
};

const VELLUM_URL = getVellumUrl();

export const Route = createFileRoute("/templates/vellum")({
  component: VellumTemplatePage,
});

function VellumTemplatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    const returnToGallery = sessionStorage.getItem("komorebi_vellum_return_to_gallery");
    if (returnToGallery) {
      sessionStorage.removeItem("komorebi_vellum_return_to_gallery");
      window.history.back();
      return;
    }

    navigate({ to: "/" });
  };

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-[#08090c]">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#08090c]"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.62, 1, 0.62] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <SunlightLeafLogo className="h-12 w-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <iframe
        src={VELLUM_URL}
        className="h-full w-full border-0"
        title="Vellum — Contemporary Editions"
        onLoad={() => setIsLoading(false)}
      />

      <TemplatePreviewControls onBack={handleBack} />
    </div>
  );
}
