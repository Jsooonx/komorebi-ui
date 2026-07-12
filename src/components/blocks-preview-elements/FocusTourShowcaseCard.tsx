import type { ComponentPreviewProps } from "../../lib/components-manifest";
import FocusTourShowcaseElement from "../blocks-elements/FocusTourShowcaseElement";

export default function FocusTourShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return <FocusTourShowcaseElement minimal={minimal} previewMode="catalog" />;
}
