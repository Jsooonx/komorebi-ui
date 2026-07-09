import type { ComponentType } from "react";
import ImageRevealCard from "../components/bentoshowcase-elements/ImageRevealCard";
import HoverMembersCard from "../components/bentoshowcase-elements/HoverMembersCard";
import ToolkitStackSwiper from "../components/bentoshowcase-elements/ToolkitStackSwiper";
import DevouringDetailsCard from "../components/bentoshowcase-elements/DevouringDetailsCard";
import DynamicIslandCard from "../components/bentoshowcase-elements/DynamicIslandCard";
import DitherCard from "../components/bentoshowcase-elements/DitherCard";
import TextRollCard from "../components/bentoshowcase-elements/TextRollCard";
import BorderBeamCard from "../components/bentoshowcase-elements/BorderBeamCard";
import InteractiveNavbarCard from "../components/bentoshowcase-elements/InteractiveNavbarCard";
import InfiniteMarqueeCard from "../components/bentoshowcase-elements/InfiniteMarqueeCard";
import AudioEqualizerCard from "../components/bentoshowcase-elements/AudioEqualizerCard";
import PixelShimmerCard from "../components/bentoshowcase-elements/PixelShimmerCard";
import PipelineStepperCard from "../components/bentoshowcase-elements/PipelineStepperCard";
import HolographicTerminalCard from "../components/bentoshowcase-elements/HolographicTerminalCard";
import MegaMenuNavbarCard from "../components/bentoshowcase-elements/MegaMenuNavbarCard";
import MegaMenuNavbar2Card from "../components/bentoshowcase-elements/MegaMenuNavbar2Card";
import MegaMenuNavbar3Card from "../components/bentoshowcase-elements/MegaMenuNavbar3Card";
import InteractiveAccordionCard from "../components/bentoshowcase-elements/InteractiveAccordionCard";
import type { ComponentPreviewProps } from "./components-manifest";

export const COMPONENT_PREVIEWS: Record<string, ComponentType<ComponentPreviewProps>> = {
  "image-reveal": ImageRevealCard,
  "hover-members": HoverMembersCard,
  "toolkit-stack-swiper": ToolkitStackSwiper,
  "devouring-details": DevouringDetailsCard,
  "dynamic-island": DynamicIslandCard,
  "dither-canvas": DitherCard,
  "text-roll": TextRollCard,
  "border-beam": BorderBeamCard,
  "interactive-navbar": InteractiveNavbarCard,
  "infinite-marquee": InfiniteMarqueeCard,
  "audio-equalizer": AudioEqualizerCard,
  "pixel-shimmer": PixelShimmerCard,
  "pipeline-stepper": PipelineStepperCard,
  "holographic-terminal": HolographicTerminalCard,
  "mega-menu-navbar": MegaMenuNavbarCard,
  "mega-menu-navbar-2": MegaMenuNavbar2Card,
  "mega-menu-navbar-3": MegaMenuNavbar3Card,
  "interactive-accordion": InteractiveAccordionCard,
};

export function getComponentPreview(id: string) {
  return COMPONENT_PREVIEWS[id];
}
