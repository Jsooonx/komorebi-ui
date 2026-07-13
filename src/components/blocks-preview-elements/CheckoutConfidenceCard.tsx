import type { ComponentPreviewProps } from "../../lib/components-manifest";
import CheckoutConfidenceElement from "../blocks-elements/CheckoutConfidenceElement";

export default function CheckoutConfidenceCard({ minimal = false }: ComponentPreviewProps) {
  return <CheckoutConfidenceElement minimal={minimal} previewMode="catalog" />;
}
