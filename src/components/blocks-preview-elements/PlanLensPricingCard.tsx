import type { ComponentPreviewProps } from "../../lib/components-manifest";
import PlanLensPricingElement from "../blocks-elements/PlanLensPricingElement";

export default function PlanLensPricingCard({ minimal = false }: ComponentPreviewProps) {
  return <PlanLensPricingElement minimal={minimal} previewMode="catalog" />;
}
