import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SunlightLeafLogo } from "@/components/DynamicIsland";
import { TemplatePreviewControls } from "./TemplatePreviewControls";

type LiveTemplatePreviewProps = {
  url: string;
  title: string;
  returnStorageKey: string;
};

/** Shared shell for externally deployed template previews. */
export function LiveTemplatePreview({ url, title, returnStorageKey }: LiveTemplatePreviewProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    if (sessionStorage.getItem(returnStorageKey)) {
      sessionStorage.removeItem(returnStorageKey);
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
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#08090c]"
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
        src={url}
        className="h-full w-full border-0"
        title={title}
        onLoad={() => setIsLoading(false)}
      />
      <TemplatePreviewControls onBack={handleBack} />
    </div>
  );
}
