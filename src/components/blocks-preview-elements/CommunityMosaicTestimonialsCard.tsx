import type { ComponentPreviewProps } from "../../lib/components-manifest";
import CommunityMosaicTestimonialsElement from "../blocks-elements/CommunityMosaicTestimonialsElement";

export default function CommunityMosaicTestimonialsCard({
  minimal = false,
}: ComponentPreviewProps) {
  return <CommunityMosaicTestimonialsElement minimal={minimal} previewMode="catalog" />;
}
