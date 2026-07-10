import type { ComponentPreviewProps } from "../../lib/components-manifest";
import SienaParallaxElement from "../blocks-elements/SienaParallaxElement";

export default function SienaParallaxCard({ minimal = false }: ComponentPreviewProps) {
  return <SienaParallaxElement minimal={minimal} />;
}
