import type { ComponentPreviewProps } from "../../lib/components-manifest";
import MegaMenuNavbar1Element from "../blocks-elements/MegaMenuNavbar1Element";

export default function MegaMenuNavbarCard({ minimal = false }: ComponentPreviewProps) {
  return <MegaMenuNavbar1Element minimal={minimal} previewMode="catalog" />;
}
