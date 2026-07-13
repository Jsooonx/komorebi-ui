import type { ComponentPreviewProps } from "../../lib/components-manifest";
import ProofLedgerTestimonialsElement from "../blocks-elements/ProofLedgerTestimonialsElement";

export default function ProofLedgerTestimonialsCard({ minimal = false }: ComponentPreviewProps) {
  return <ProofLedgerTestimonialsElement minimal={minimal} previewMode="catalog" />;
}
