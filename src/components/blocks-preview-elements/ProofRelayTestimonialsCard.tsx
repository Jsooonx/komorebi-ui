import type { ComponentPreviewProps } from "../../lib/components-manifest";
import ProofRelayTestimonialsElement from "../blocks-elements/ProofRelayTestimonialsElement";

export default function ProofRelayTestimonialsCard({ minimal = false }: ComponentPreviewProps) {
  return <ProofRelayTestimonialsElement minimal={minimal} previewMode="catalog" />;
}
