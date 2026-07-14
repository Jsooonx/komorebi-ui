import type { ComponentPreviewProps } from "../../lib/components-manifest";
import DependencyWeaveShowcaseElement from "../blocks-elements/DependencyWeaveShowcaseElement";

export default function DependencyWeaveShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return <DependencyWeaveShowcaseElement minimal={minimal} previewMode="catalog" />;
}
