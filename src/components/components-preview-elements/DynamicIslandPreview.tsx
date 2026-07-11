import DynamicIslandElement from "../components-elements/DynamicIslandElement";
import type { ComponentCatalogPreviewProps } from "../../lib/components-manifest";
import { ComponentCatalogFrame } from "./ComponentCatalogFrame";

export default function DynamicIslandPreview({ activeState }: ComponentCatalogPreviewProps) {
  return (
    <ComponentCatalogFrame scale="scale-[0.7]">
      <DynamicIslandElement activeState={activeState} />
    </ComponentCatalogFrame>
  );
}
