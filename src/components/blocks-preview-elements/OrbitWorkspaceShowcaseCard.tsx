import type { ComponentPreviewProps } from "../../lib/components-manifest";
import OrbitWorkspaceShowcaseElement from "../blocks-elements/OrbitWorkspaceShowcaseElement";

export default function OrbitWorkspaceShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return <OrbitWorkspaceShowcaseElement minimal={minimal} previewMode="catalog" />;
}
