import type { ComponentType } from "react";
import ImageRevealElement from "../components/components-elements/ImageRevealElement";
import HoverMembersElement from "../components/components-elements/HoverMembersElement";
import ToolkitStackSwiperElement from "../components/components-elements/ToolkitStackSwiperElement";
import DevouringDetailsElement from "../components/components-elements/DevouringDetailsElement";
import DynamicIslandElement from "../components/components-elements/DynamicIslandElement";
import DitherElement from "../components/components-elements/DitherElement";
import TextRollElement from "../components/components-elements/TextRollElement";
import BorderBeamElement from "../components/components-elements/BorderBeamElement";
import InteractiveNavbarElement from "../components/components-elements/InteractiveNavbarElement";
import InfiniteMarqueeElement from "../components/components-elements/InfiniteMarqueeElement";
import AudioEqualizerElement from "../components/components-elements/AudioEqualizerElement";
import PixelShimmerElement from "../components/components-elements/PixelShimmerElement";
import PipelineStepperElement from "../components/components-elements/PipelineStepperElement";
import HolographicTerminalElement from "../components/components-elements/HolographicTerminalElement";
import InteractiveAccordionElement from "../components/components-elements/InteractiveAccordionElement";
import NestedAccordionElement from "../components/components-elements/NestedAccordionElement";
import ExpandableTabDockElement from "../components/components-elements/ExpandableTabDockElement";
import HoverExpandAccordionElement from "../components/components-elements/HoverExpandAccordionElement";
import VercelTooltipElement from "../components/components-elements/VercelTooltipElement";
import type { ComponentElementProps } from "./components-manifest";

export const COMPONENT_ELEMENTS: Record<string, ComponentType<ComponentElementProps>> = {
  "image-reveal": ImageRevealElement,
  "hover-members": HoverMembersElement,
  "toolkit-stack-swiper": ToolkitStackSwiperElement,
  "devouring-details": DevouringDetailsElement,
  "hover-expand-accordion": HoverExpandAccordionElement,
  "dynamic-island": DynamicIslandElement,
  "expandable-tab-dock": ExpandableTabDockElement,
  "vercel-tooltip": VercelTooltipElement,
  "dither-canvas": DitherElement,
  "text-roll": TextRollElement,
  "border-beam": BorderBeamElement,
  "interactive-navbar": InteractiveNavbarElement,
  "infinite-marquee": InfiniteMarqueeElement,
  "audio-equalizer": AudioEqualizerElement,
  "pixel-shimmer": PixelShimmerElement,
  "pipeline-stepper": PipelineStepperElement,
  "holographic-terminal": HolographicTerminalElement,
  "interactive-accordion": InteractiveAccordionElement,
  "nested-accordion": NestedAccordionElement,
};

export function getComponentElement(id: string) {
  return COMPONENT_ELEMENTS[id];
}
