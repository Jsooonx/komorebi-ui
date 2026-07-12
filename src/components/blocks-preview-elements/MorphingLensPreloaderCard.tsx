import type { ComponentPreviewProps } from "../../lib/components-manifest";
import MorphingLensPreloaderElement from "../blocks-elements/MorphingLensPreloaderElement";

export default function MorphingLensPreloaderCard({ minimal = false }: ComponentPreviewProps) {
  return <MorphingLensPreloaderElement minimal={minimal} previewMode="catalog" />;
}
