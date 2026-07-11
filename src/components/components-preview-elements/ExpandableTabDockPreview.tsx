import ExpandableTabDockElement from "../components-elements/ExpandableTabDockElement";
import { ComponentCatalogFrame } from "./ComponentCatalogFrame";

export default function ExpandableTabDockPreview() {
  return (
    <ComponentCatalogFrame>
      <ExpandableTabDockElement className="items-end pb-20" />
    </ComponentCatalogFrame>
  );
}
