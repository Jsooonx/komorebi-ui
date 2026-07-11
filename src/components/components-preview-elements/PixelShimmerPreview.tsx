import PixelShimmerElement from "../components-elements/PixelShimmerElement";
import { ComponentCatalogFrame } from "./ComponentCatalogFrame";

export default function PixelShimmerPreview() {
  return (
    <ComponentCatalogFrame scale="scale-[0.66]">
      <PixelShimmerElement />
    </ComponentCatalogFrame>
  );
}
