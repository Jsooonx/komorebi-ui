import type { ComponentPreviewProps } from "../../lib/components-manifest";
import DoubleStairPreloaderElement from "../blocks-elements/DoubleStairPreloaderElement";

export default function DoubleStairPreloaderCard({ minimal = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full border border-white/5 rounded-2xl overflow-hidden relative bg-[#09090b]">
      <DoubleStairPreloaderElement />
    </div>
  );
}
