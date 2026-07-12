import type { ComponentPreviewProps } from "../../lib/components-manifest";
import OliverParallaxElement from "../blocks-elements/OliverParallaxElement";

export default function OliverParallaxCard({ minimal = false }: ComponentPreviewProps) {
  return <OliverParallaxElement minimal={minimal} previewMode="catalog" />;
}
