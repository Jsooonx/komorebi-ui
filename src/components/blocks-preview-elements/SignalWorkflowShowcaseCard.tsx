import type { ComponentPreviewProps } from "../../lib/components-manifest";
import SignalWorkflowShowcaseElement from "../blocks-elements/SignalWorkflowShowcaseElement";

export default function SignalWorkflowShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return <SignalWorkflowShowcaseElement minimal={minimal} previewMode="catalog" />;
}
