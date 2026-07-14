import type { ComponentPreviewProps } from "../../lib/components-manifest";
import VersionFoldShowcaseElement from "../blocks-elements/VersionFoldShowcaseElement";

export default function VersionFoldShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return <VersionFoldShowcaseElement minimal={minimal} previewMode="catalog" />;
}
