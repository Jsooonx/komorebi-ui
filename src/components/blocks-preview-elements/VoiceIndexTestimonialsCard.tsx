import type { ComponentPreviewProps } from "../../lib/components-manifest";
import VoiceIndexTestimonialsElement from "../blocks-elements/VoiceIndexTestimonialsElement";

export default function VoiceIndexTestimonialsCard({ minimal = false }: ComponentPreviewProps) {
  return <VoiceIndexTestimonialsElement minimal={minimal} previewMode="catalog" />;
}
