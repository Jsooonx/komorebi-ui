import type { ComponentPreviewProps } from "../../lib/components-manifest";
import LogoCloud2Element from "../blocks-elements/LogoCloud2Element";

export default function LogoCloud2Card({ minimal = false }: ComponentPreviewProps) {
  return <LogoCloud2Element minimal={minimal} />;
}
