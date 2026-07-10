import type { ComponentPreviewProps } from "../../lib/components-manifest";
import Features2Element from "../blocks-elements/Features2Element";

export default function Features2Card({ minimal = false }: ComponentPreviewProps) {
  return <Features2Element minimal={minimal} previewMode="catalog" />;
}
