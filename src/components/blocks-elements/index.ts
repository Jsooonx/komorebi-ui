import type { ComponentType } from "react";
import MegaMenuNavbar1Block from "./MegaMenuNavbar1Block";
import MegaMenuNavbar2Block from "./MegaMenuNavbar2Block";
import MegaMenuNavbar3Block from "./MegaMenuNavbar3Block";
import LogoCloud1Block from "./LogoCloud1Block";
import LogoCloud2Block from "./LogoCloud2Block";
import LogoCloud3Block from "./LogoCloud3Block";
import Features1Block from "./Features1Block";
import Features2Block from "./Features2Block";
import Features3Block from "./Features3Block";
import Features4Block from "./Features4Block";
import Features5Block from "./Features5Block";
import SienaParallaxBlock from "./SienaParallaxBlock";
import WordsPreloaderBlock from "./WordsPreloaderBlock";

const BLOCK_PAGES: Record<string, ComponentType> = {
  "mega-menu-navbar-1": MegaMenuNavbar1Block,
  "mega-menu-navbar-2": MegaMenuNavbar2Block,
  "mega-menu-navbar-3": MegaMenuNavbar3Block,
  "logo-cloud-1": LogoCloud1Block,
  "logo-cloud-2": LogoCloud2Block,
  "logo-cloud-3": LogoCloud3Block,
  "features-1": Features1Block,
  "features-2": Features2Block,
  "features-3": Features3Block,
  "features-4": Features4Block,
  "features-5": Features5Block,
  "siena-parallax": SienaParallaxBlock,
  "words-preloader": WordsPreloaderBlock,
};

export function getBlockPage(id: string) {
  return BLOCK_PAGES[id];
}
