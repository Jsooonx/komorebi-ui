export async function loadComponentCode(id: string) {
  switch (id) {
    case "image-reveal":
      return (await import("../components/components-elements/ImageRevealElement.tsx?raw")).default;
    case "hover-members":
      return (await import("../components/components-elements/HoverMembersElement.tsx?raw"))
        .default;
    case "toolkit-stack-swiper":
      return (await import("../components/components-elements/ToolkitStackSwiperElement.tsx?raw"))
        .default;
    case "devouring-details":
      return (await import("../components/components-elements/DevouringDetailsElement.tsx?raw"))
        .default;
    case "hover-expand-accordion":
      return (await import("../components/components-elements/HoverExpandAccordionElement.tsx?raw"))
        .default;
    case "hover-expand-horizontal":
      return (
        await import("../components/components-elements/HoverExpandHorizontalElement.tsx?raw")
      ).default;
    case "hover-expand-vertical":
      return (await import("../components/components-elements/HoverExpandVerticalElement.tsx?raw"))
        .default;
    case "dynamic-island":
      return (await import("../components/components-elements/DynamicIslandElement.tsx?raw"))
        .default;
    case "expandable-tab-dock":
      return (await import("../components/components-elements/ExpandableTabDockElement.tsx?raw"))
        .default;
    case "vercel-tooltip":
      return (await import("../components/components-elements/VercelTooltipElement.tsx?raw"))
        .default;
    case "dither-canvas":
      return (await import("../components/components-elements/DitherElement.tsx?raw")).default;
    case "text-roll":
      return (await import("../components/components-elements/TextRollElement.tsx?raw")).default;
    case "border-beam":
      return (await import("../components/components-elements/BorderBeamElement.tsx?raw")).default;
    case "interactive-navbar":
      return (await import("../components/components-elements/InteractiveNavbarElement.tsx?raw"))
        .default;
    case "infinite-marquee":
      return (await import("../components/components-elements/InfiniteMarqueeElement.tsx?raw"))
        .default;
    case "audio-equalizer":
      return (await import("../components/components-elements/AudioEqualizerElement.tsx?raw"))
        .default;
    case "pixel-shimmer":
      return (await import("../components/components-elements/PixelShimmerElement.tsx?raw"))
        .default;
    case "pipeline-stepper":
      return (await import("../components/components-elements/PipelineStepperElement.tsx?raw"))
        .default;
    case "holographic-terminal":
      return (await import("../components/components-elements/HolographicTerminalElement.tsx?raw"))
        .default;
    case "mega-menu-navbar-1":
      return (await import("../components/blocks-elements/MegaMenuNavbar1Element.tsx?raw")).default;
    case "mega-menu-navbar-2":
      return (await import("../components/blocks-elements/MegaMenuNavbar2Element.tsx?raw")).default;
    case "mega-menu-navbar-3":
      return (await import("../components/blocks-elements/MegaMenuNavbar3Element.tsx?raw")).default;
    case "interactive-accordion":
      return (await import("../components/components-elements/InteractiveAccordionElement.tsx?raw"))
        .default;
    case "nested-accordion":
      return (await import("../components/components-elements/NestedAccordionElement.tsx?raw"))
        .default;
    case "logo-cloud-1":
      return (await import("../components/blocks-elements/LogoCloud1Element.tsx?raw")).default;
    case "logo-cloud-2":
      return (await import("../components/blocks-elements/LogoCloud2Element.tsx?raw")).default;
    case "logo-cloud-3":
      return (await import("../components/blocks-elements/LogoCloud3Element.tsx?raw")).default;
    case "features-1":
      return (await import("../components/blocks-elements/Features1Element.tsx?raw")).default;
    case "features-2":
      return (await import("../components/blocks-elements/Features2Element.tsx?raw")).default;
    case "features-3":
      return (await import("../components/blocks-elements/Features3Element.tsx?raw")).default;
    case "features-4":
      return (await import("../components/blocks-elements/Features4Element.tsx?raw")).default;
    case "features-5":
      return (await import("../components/blocks-elements/Features5Element.tsx?raw")).default;
    case "siena-parallax":
      return (await import("../components/blocks-elements/SienaParallaxElement.tsx?raw")).default;
    case "oliver-parallax":
      return (await import("../components/blocks-elements/OliverParallaxElement.tsx?raw")).default;
    case "atlas-horizontal-parallax":
      return (await import("../components/blocks-elements/AtlasHorizontalParallaxElement.tsx?raw"))
        .default;
    case "depth-lens-parallax":
      return (await import("../components/blocks-elements/DepthLensParallaxElement.tsx?raw"))
        .default;
    case "words-preloader":
      return (await import("../components/blocks-elements/WordsPreloaderElement.tsx?raw")).default;
    case "stairs-preloader":
      return (await import("../components/blocks-elements/StairsPreloaderElement.tsx?raw")).default;
    case "double-stair-preloader":
      return (await import("../components/blocks-elements/DoubleStairPreloaderElement.tsx?raw"))
        .default;
    case "morphing-lens-preloader":
      return (await import("../components/blocks-elements/MorphingLensPreloaderElement.tsx?raw"))
        .default;
    case "signal-workflow-showcase":
      return (await import("../components/blocks-elements/SignalWorkflowShowcaseElement.tsx?raw"))
        .default;
    case "focus-tour-showcase":
      return (await import("../components/blocks-elements/FocusTourShowcaseElement.tsx?raw"))
        .default;
    case "orbit-workspace-showcase":
      return (await import("../components/blocks-elements/OrbitWorkspaceShowcaseElement.tsx?raw"))
        .default;
    case "version-fold-showcase":
      return (await import("../components/blocks-elements/VersionFoldShowcaseElement.tsx?raw"))
        .default;
    case "voice-index-testimonials":
      return (await import("../components/blocks-elements/VoiceIndexTestimonialsElement.tsx?raw"))
        .default;
    case "proof-ledger-testimonials":
      return (await import("../components/blocks-elements/ProofLedgerTestimonialsElement.tsx?raw"))
        .default;
    case "community-mosaic-testimonials":
      return (
        await import("../components/blocks-elements/CommunityMosaicTestimonialsElement.tsx?raw")
      ).default;
    case "plan-lens-pricing":
      return (await import("../components/blocks-elements/PlanLensPricingElement.tsx?raw")).default;
    case "usage-horizon-pricing":
      return (await import("../components/blocks-elements/UsageHorizonPricingElement.tsx?raw"))
        .default;
    case "commitment-window-pricing":
      return (await import("../components/blocks-elements/CommitmentWindowPricingElement.tsx?raw"))
        .default;
    case "focused-conversion-cta":
      return (await import("../components/blocks-elements/FocusedConversionCtaElement.tsx?raw"))
        .default;
    case "story-frame-cta":
      return (await import("../components/blocks-elements/StoryFrameCtaElement.tsx?raw")).default;
    case "proof-signal-cta":
      return (await import("../components/blocks-elements/ProofSignalCtaElement.tsx?raw")).default;
    default:
      throw new Error(`No component code loader found for "${id}".`);
  }
}
