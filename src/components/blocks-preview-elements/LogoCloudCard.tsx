import type { ComponentPreviewProps } from "../../lib/components-manifest";
import LogoCloud1Element from "../blocks-elements/LogoCloud1Element";

export default function LogoCloudCard({ minimal = false }: ComponentPreviewProps) {
  return <LogoCloud1Element minimal={minimal} />;
}
