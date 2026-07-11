import type { ComponentPreviewProps } from "../../lib/components-manifest";
import WordsPreloaderElement from "../blocks-elements/WordsPreloaderElement";

export default function WordsPreloaderCard({ minimal = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full border border-white/5 rounded-2xl overflow-hidden relative bg-[#090909]">
      <WordsPreloaderElement />
    </div>
  );
}
