import type { ComponentPreviewProps } from "../../lib/components-manifest";
import MegaMenuNavbar2Element from "../blocks-elements/MegaMenuNavbar2Element";

export default function MegaMenuNavbar2Card({ minimal = false }: ComponentPreviewProps) {
  return <MegaMenuNavbar2Element minimal={minimal} previewMode="catalog" />;
}
