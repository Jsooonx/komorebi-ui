import type { ComponentPreviewProps } from "../../lib/components-manifest";
import Features4Element from "../blocks-elements/Features4Element";

export default function Features4Card({ minimal = false }: ComponentPreviewProps) {
  return <Features4Element minimal={minimal} previewMode="catalog" />;
}
