import type { ComponentPreviewProps } from "../../lib/components-manifest";
import AtlasHorizontalParallaxElement from "../blocks-elements/AtlasHorizontalParallaxElement";

export default function AtlasHorizontalParallaxCard({ minimal = false }: ComponentPreviewProps) {
  return <AtlasHorizontalParallaxElement minimal={minimal} previewMode="catalog" />;
}
