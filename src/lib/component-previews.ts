import type { ComponentType } from "react";
import ImageRevealPreview from "../components/components-preview-elements/ImageRevealPreview";
import HoverMembersPreview from "../components/components-preview-elements/HoverMembersPreview";
import ToolkitStackSwiperPreview from "../components/components-preview-elements/ToolkitStackSwiperPreview";
import DevouringDetailsPreview from "../components/components-preview-elements/DevouringDetailsPreview";
import DynamicIslandPreview from "../components/components-preview-elements/DynamicIslandPreview";
import DitherPreview from "../components/components-preview-elements/DitherPreview";
import TextRollPreview from "../components/components-preview-elements/TextRollPreview";
import BorderBeamPreview from "../components/components-preview-elements/BorderBeamPreview";
import InteractiveNavbarPreview from "../components/components-preview-elements/InteractiveNavbarPreview";
import InfiniteMarqueePreview from "../components/components-preview-elements/InfiniteMarqueePreview";
import AudioEqualizerPreview from "../components/components-preview-elements/AudioEqualizerPreview";
import PixelShimmerPreview from "../components/components-preview-elements/PixelShimmerPreview";
import PipelineStepperPreview from "../components/components-preview-elements/PipelineStepperPreview";
import HolographicTerminalPreview from "../components/components-preview-elements/HolographicTerminalPreview";
import ExpandableTabDockPreview from "../components/components-preview-elements/ExpandableTabDockPreview";
import HoverExpandAccordionPreview from "../components/components-preview-elements/HoverExpandAccordionPreview";
import HoverExpandHorizontalPreview from "../components/components-preview-elements/HoverExpandHorizontalPreview";
import HoverExpandVerticalPreview from "../components/components-preview-elements/HoverExpandVerticalPreview";
import VercelTooltipPreview from "../components/components-preview-elements/VercelTooltipPreview";
import MegaMenuNavbarCard from "../components/blocks-preview-elements/MegaMenuNavbarCard";
import MegaMenuNavbar2Card from "../components/blocks-preview-elements/MegaMenuNavbar2Card";
import MegaMenuNavbar3Card from "../components/blocks-preview-elements/MegaMenuNavbar3Card";
import LogoCloudCard from "../components/blocks-preview-elements/LogoCloudCard";
import LogoCloud2Card from "../components/blocks-preview-elements/LogoCloud2Card";
import LogoCloud3Card from "../components/blocks-preview-elements/LogoCloud3Card";
import Features1Card from "../components/blocks-preview-elements/Features1Card";
import Features2Card from "../components/blocks-preview-elements/Features2Card";
import Features3Card from "../components/blocks-preview-elements/Features3Card";
import Features4Card from "../components/blocks-preview-elements/Features4Card";
import Features5Card from "../components/blocks-preview-elements/Features5Card";
import SienaParallaxCard from "../components/blocks-preview-elements/SienaParallaxCard";
import OliverParallaxCard from "../components/blocks-preview-elements/OliverParallaxCard";
import AtlasHorizontalParallaxCard from "../components/blocks-preview-elements/AtlasHorizontalParallaxCard";
import DepthLensParallaxCard from "../components/blocks-preview-elements/DepthLensParallaxCard";
import WordsPreloaderCard from "../components/blocks-preview-elements/WordsPreloaderCard";
import StairsPreloaderCard from "../components/blocks-preview-elements/StairsPreloaderCard";
import DoubleStairPreloaderCard from "../components/blocks-preview-elements/DoubleStairPreloaderCard";
import MorphingLensPreloaderCard from "../components/blocks-preview-elements/MorphingLensPreloaderCard";
import SignalWorkflowShowcaseCard from "../components/blocks-preview-elements/SignalWorkflowShowcaseCard";
import FocusTourShowcaseCard from "../components/blocks-preview-elements/FocusTourShowcaseCard";
import OrbitWorkspaceShowcaseCard from "../components/blocks-preview-elements/OrbitWorkspaceShowcaseCard";
import VoiceIndexTestimonialsCard from "../components/blocks-preview-elements/VoiceIndexTestimonialsCard";
import ProofLedgerTestimonialsCard from "../components/blocks-preview-elements/ProofLedgerTestimonialsCard";
import CommunityMosaicTestimonialsCard from "../components/blocks-preview-elements/CommunityMosaicTestimonialsCard";
import PlanLensPricingCard from "../components/blocks-preview-elements/PlanLensPricingCard";
import UsageHorizonPricingCard from "../components/blocks-preview-elements/UsageHorizonPricingCard";
import CommitmentWindowPricingCard from "../components/blocks-preview-elements/CommitmentWindowPricingCard";
import type { ComponentCatalogPreviewProps, ComponentPreviewProps } from "./components-manifest";

export const COMPONENT_PREVIEWS: Record<string, ComponentType<ComponentCatalogPreviewProps>> = {
  "image-reveal": ImageRevealPreview,
  "hover-members": HoverMembersPreview,
  "toolkit-stack-swiper": ToolkitStackSwiperPreview,
  "devouring-details": DevouringDetailsPreview,
  "hover-expand-accordion": HoverExpandAccordionPreview,
  "hover-expand-horizontal": HoverExpandHorizontalPreview,
  "hover-expand-vertical": HoverExpandVerticalPreview,
  "dynamic-island": DynamicIslandPreview,
  "expandable-tab-dock": ExpandableTabDockPreview,
  "vercel-tooltip": VercelTooltipPreview,
  "dither-canvas": DitherPreview,
  "text-roll": TextRollPreview,
  "border-beam": BorderBeamPreview,
  "interactive-navbar": InteractiveNavbarPreview,
  "infinite-marquee": InfiniteMarqueePreview,
  "audio-equalizer": AudioEqualizerPreview,
  "pixel-shimmer": PixelShimmerPreview,
  "pipeline-stepper": PipelineStepperPreview,
  "holographic-terminal": HolographicTerminalPreview,
};

export const BLOCK_PREVIEWS: Record<string, ComponentType<ComponentPreviewProps>> = {
  "mega-menu-navbar-1": MegaMenuNavbarCard,
  "mega-menu-navbar-2": MegaMenuNavbar2Card,
  "mega-menu-navbar-3": MegaMenuNavbar3Card,
  "logo-cloud-1": LogoCloudCard,
  "logo-cloud-2": LogoCloud2Card,
  "logo-cloud-3": LogoCloud3Card,
  "features-1": Features1Card,
  "features-2": Features2Card,
  "features-3": Features3Card,
  "features-4": Features4Card,
  "features-5": Features5Card,
  "siena-parallax": SienaParallaxCard,
  "oliver-parallax": OliverParallaxCard,
  "atlas-horizontal-parallax": AtlasHorizontalParallaxCard,
  "depth-lens-parallax": DepthLensParallaxCard,
  "words-preloader": WordsPreloaderCard,
  "stairs-preloader": StairsPreloaderCard,
  "double-stair-preloader": DoubleStairPreloaderCard,
  "morphing-lens-preloader": MorphingLensPreloaderCard,
  "signal-workflow-showcase": SignalWorkflowShowcaseCard,
  "focus-tour-showcase": FocusTourShowcaseCard,
  "orbit-workspace-showcase": OrbitWorkspaceShowcaseCard,
  "voice-index-testimonials": VoiceIndexTestimonialsCard,
  "proof-ledger-testimonials": ProofLedgerTestimonialsCard,
  "community-mosaic-testimonials": CommunityMosaicTestimonialsCard,
  "plan-lens-pricing": PlanLensPricingCard,
  "usage-horizon-pricing": UsageHorizonPricingCard,
  "commitment-window-pricing": CommitmentWindowPricingCard,
};

export function getComponentPreview(id: string) {
  return COMPONENT_PREVIEWS[id];
}

export function getBlockPreview(id: string) {
  return BLOCK_PREVIEWS[id];
}
