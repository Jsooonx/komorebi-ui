import type { ComponentPreviewProps } from "../../lib/components-manifest";
import MegaMenuNavbar3Element from "../blocks-elements/MegaMenuNavbar3Element";

export default function MegaMenuNavbar3Card({ minimal = false }: ComponentPreviewProps) {
  return <MegaMenuNavbar3Element minimal={minimal} previewMode="catalog" />;
}
