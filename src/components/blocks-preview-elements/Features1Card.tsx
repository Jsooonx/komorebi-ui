import type { ComponentPreviewProps } from "../../lib/components-manifest";
import Features1Element from "../blocks-elements/Features1Element";

export default function Features1Card({ minimal = false }: ComponentPreviewProps) {
  return <Features1Element minimal={minimal} previewMode="catalog" />;
}
