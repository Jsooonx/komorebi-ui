export async function loadComponentCode(id: string) {
  switch (id) {
    case "image-reveal":
      return (await import("../components/bentoshowcase-elements/ImageRevealCard.tsx?raw")).default;
    case "hover-members":
      return (await import("../components/bentoshowcase-elements/HoverMembersCard.tsx?raw"))
        .default;
    case "toolkit-stack-swiper":
      return (await import("../components/bentoshowcase-elements/ToolkitStackSwiper.tsx?raw"))
        .default;
    case "devouring-details":
      return (await import("../components/bentoshowcase-elements/DevouringDetailsCard.tsx?raw"))
        .default;
    case "dynamic-island":
      return (await import("../components/bentoshowcase-elements/DynamicIslandCard.tsx?raw"))
        .default;
    case "dither-canvas":
      return (await import("../components/bentoshowcase-elements/DitherCard.tsx?raw")).default;
    case "text-roll":
      return (await import("../components/bentoshowcase-elements/TextRollCard.tsx?raw")).default;
    case "border-beam":
      return (await import("../components/bentoshowcase-elements/BorderBeamCard.tsx?raw")).default;
    case "interactive-navbar":
      return (await import("../components/bentoshowcase-elements/InteractiveNavbarCard.tsx?raw"))
        .default;
    case "infinite-marquee":
      return (await import("../components/bentoshowcase-elements/InfiniteMarqueeCard.tsx?raw"))
        .default;
    case "audio-equalizer":
      return (await import("../components/bentoshowcase-elements/AudioEqualizerCard.tsx?raw"))
        .default;
    case "pixel-shimmer":
      return (await import("../components/bentoshowcase-elements/PixelShimmerCard.tsx?raw"))
        .default;
    case "pipeline-stepper":
      return (await import("../components/bentoshowcase-elements/PipelineStepperCard.tsx?raw"))
        .default;
    case "holographic-terminal":
      return (await import("../components/bentoshowcase-elements/HolographicTerminalCard.tsx?raw"))
        .default;
    case "mega-menu-navbar-1":
      return (await import("../components/bentoshowcase-elements/MegaMenuNavbarCard.tsx?raw"))
        .default;
    case "mega-menu-navbar-2":
      return (await import("../components/bentoshowcase-elements/MegaMenuNavbar2Card.tsx?raw"))
        .default;
    case "mega-menu-navbar-3":
      return (await import("../components/bentoshowcase-elements/MegaMenuNavbar3Card.tsx?raw"))
        .default;
    case "interactive-accordion":
      return (await import("../components/bentoshowcase-elements/InteractiveAccordionCard.tsx?raw"))
        .default;
    case "nested-accordion":
      return (await import("../components/bentoshowcase-elements/NestedAccordionCard.tsx?raw"))
        .default;
    case "logo-cloud-1":
      return (await import("../components/bentoshowcase-elements/LogoCloudCard.tsx?raw")).default;
    case "logo-cloud-2":
      return (await import("../components/bentoshowcase-elements/LogoCloud2Card.tsx?raw")).default;
    case "logo-cloud-3":
      return (await import("../components/bentoshowcase-elements/LogoCloud3Card.tsx?raw")).default;
    case "features-1":
      return (await import("../components/bentoshowcase-elements/Features1Card.tsx?raw")).default;
    case "features-2":
      return (await import("../components/bentoshowcase-elements/Features2Card.tsx?raw")).default;
    case "features-3":
      return (await import("../components/bentoshowcase-elements/Features3Card.tsx?raw")).default;
    case "features-4":
      return (await import("../components/bentoshowcase-elements/Features4Card.tsx?raw")).default;
    default:
      throw new Error(`No component code loader found for "${id}".`);
  }
}
