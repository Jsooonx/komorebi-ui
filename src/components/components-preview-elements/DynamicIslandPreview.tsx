import { AnimatePresence, motion } from "framer-motion";
import type { ComponentCatalogPreviewProps } from "../../lib/components-manifest";

export default function DynamicIslandPreview({ activeState }: ComponentCatalogPreviewProps) {
  const expanded = Boolean(activeState);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#101114]">
      <motion.div
        layout
        initial={false}
        whileHover={{ width: 214 }}
        animate={{ width: expanded ? 214 : 94, height: expanded ? 50 : 32 }}
        className="flex items-center justify-center rounded-full bg-black ring-1 ring-white/10"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span
              key="state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-white/70"
            >
              {activeState}
            </motion.span>
          ) : (
            <motion.span key="idle" className="h-2 w-2 rounded-full bg-white/50" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
