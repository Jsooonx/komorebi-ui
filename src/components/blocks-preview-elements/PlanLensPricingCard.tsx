import type { ComponentPreviewProps } from "../../lib/components-manifest";
export default function PlanLensPricingCard({ minimal = false }: ComponentPreviewProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-[#0a0a0b]">
      <video
        src="/assets/blocks/pricing/plan-lens/preview.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Plan Lens Pricing preview"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
