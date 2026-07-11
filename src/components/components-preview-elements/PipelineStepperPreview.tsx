import PipelineStepperElement from "../components-elements/PipelineStepperElement";
import { ComponentCatalogFrame } from "./ComponentCatalogFrame";

export default function PipelineStepperPreview() {
  return (
    <ComponentCatalogFrame scale="scale-[0.62]">
      <PipelineStepperElement />
    </ComponentCatalogFrame>
  );
}
