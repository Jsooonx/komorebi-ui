import { ArrowLeft } from "lucide-react";
import { SunlightLeafLogo } from "@/components/DynamicIsland";

type TemplatePreviewControlsProps = {
  onBack: () => void;
};

/** Shared overlay for all live template previews. It deliberately clears template nav branding. */
export function TemplatePreviewControls({ onBack }: TemplatePreviewControlsProps) {
  return (
    <>
      <div className="absolute left-6 top-20 z-40">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/5 border-t-white/10 bg-warm-cream/90 px-4 py-2 font-heading text-xs font-semibold text-moss-green shadow-lg backdrop-blur transition-all hover:bg-warm-cream active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 text-moss-green" />
          Back to Gallery
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-40">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/5 border-t-white/10 bg-warm-cream/90 px-4 py-2 font-heading text-xs font-semibold text-moss-green shadow-lg backdrop-blur">
          <SunlightLeafLogo className="h-5 w-5" />
          <span>Komorebi UI</span>
        </div>
      </div>
    </>
  );
}
