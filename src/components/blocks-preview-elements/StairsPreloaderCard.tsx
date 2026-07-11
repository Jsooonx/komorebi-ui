import type { ComponentPreviewProps } from "../../lib/components-manifest";
import StairsPreloaderElement from "../blocks-elements/StairsPreloaderElement";

export default function StairsPreloaderCard({ minimal = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full border border-white/5 rounded-2xl overflow-hidden relative bg-[#09090b]">
      <StairsPreloaderElement />
    </div>
  );
}
