import type { ComponentPreviewProps } from "../../lib/components-manifest";
import DepthLensParallaxElement from "../blocks-elements/DepthLensParallaxElement";

export default function DepthLensParallaxCard({ minimal = false }: ComponentPreviewProps) {
  return <DepthLensParallaxElement minimal={minimal} previewMode="catalog" />;
}
