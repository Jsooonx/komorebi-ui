import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import ConnectedContext from "../components/ConnectedContext";
import AnticipationLoop from "../components/AnticipationLoop";
import GuidanceLayer from "../components/GuidanceLayer";
import ResolutionRelay from "../components/ResolutionRelay";
import SeamlessHandoff from "../components/SeamlessHandoff";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura™ — AI-powered customer support at scale" },
      {
        name: "description",
        content:
          "Aura™ — Automated B2B customer support widget that drives customer delight, scales organically, and increases retention.",
      },
      { property: "og:title", content: "Aura™ — AI Customer Support" },
      {
        property: "og:description",
        content:
          "Automated B2B customer support widget that drives customer delight, scales organically, and increases retention.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,700;0,800;1,400;1,700&display=swap",
      },
    ],
  }),
  component: Index,
});

const CHAR_STEP = 0.038;

function animateLines(selector: string, baseDelay: number, lineGap: number) {
  const nodes = document.querySelectorAll<HTMLElement>(selector);
  nodes.forEach((lineInner, lineIdx) => {
    const lineDelay = baseDelay + lineIdx * lineGap;
    let charCount = 0;
    const walker = document.createTreeWalker(lineInner, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let n: Node | null = walker.nextNode();
    while (n) {
      textNodes.push(n as Text);
      n = walker.nextNode();
    }
    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue ?? "";
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === " ") {
          frag.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.className = "hero__char";
          span.textContent = ch;
          span.style.animationDelay = `${lineDelay + charCount * CHAR_STEP}s`;
          frag.appendChild(span);
          charCount++;
        }
      }
      textNode.parentNode?.replaceChild(frag, textNode);
    });
  });
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let started = false;
    const startAnimations = () => {
      if (started) return;
      started = true;
      document.body.classList.add("is-ready");
      animateLines(".hero__heading .hero__line-inner", 0.3, 0.85);
      animateLines(".hero__label .hero__line-inner", 0.3, 0.65);
      animateLines(".hero__desc .hero__line-inner", 0.3, 0.65);
    };

    const fallback = window.setTimeout(startAnimations, 200);

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onAnchorClick);

    const sideLinks = document.querySelectorAll<HTMLAnchorElement>(".side-nav__link");
    const onSideClick = (ev: Event) => {
      const link = ev.currentTarget as HTMLAnchorElement;
      sideLinks.forEach((l) => {
        l.classList.remove("side-nav__link--active");
        l.querySelector(".side-nav__line")?.remove();
      });
      link.classList.add("side-nav__link--active");
      const line = document.createElement("span");
      line.className = "side-nav__line";
      link.appendChild(line);
    };
    sideLinks.forEach((l) => l.addEventListener("click", onSideClick));

    const scrollBtn = document.getElementById("scrollDown");
    const onScrollDown = () =>
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    scrollBtn?.addEventListener("click", onScrollDown);

    return () => {
      window.clearTimeout(fallback);
      document.body.classList.remove("is-ready");
      document.removeEventListener("click", onAnchorClick);
      sideLinks.forEach((l) => l.removeEventListener("click", onSideClick));
      scrollBtn?.removeEventListener("click", onScrollDown);
    };
  }, []);

  const ArrowIcon = () => (
    <svg
      className="btn__arrow"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7L7 1M7 1H2M7 1V6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="w-full min-h-screen bg-[#08090c] text-white">
      <div className="hero" ref={heroRef}>
      {/* Rebranded high-end abstract B2B network layout background */}
      <div className="hero__bg">
        <img
          className="w-full h-full object-cover"
          src="/aura-hero-bg.png"
          alt="Aura Cosmic Network Flow"
        />
      </div>
      <div className="hero__overlay" />
      <div className="hero__gradient-top" />
      <div className="hero__gradient-bottom" />
      
      {/* 8-layer progressive blur bar */}
      <div className="hero__blur">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="hero__blur-layer" />
        ))}
      </div>

      <header className="header">
        <a href="#" className="logo" aria-label="Aura AI">
          <svg
            className="logo__icon"
            viewBox="0 0 122 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="logo__circle"
              cx="14.3"
              cy="14.9"
              r="4.5"
              fill="#fff"
            />
            <path
              className="logo__arc-1a"
              pathLength="100"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              d="M5.3 14.9C5.3 9.9 23.3 9.9 23.3 14.9"
            />
            <path
              className="logo__arc-1b"
              pathLength="100"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              d="M23.3 14.9C23.3 19.9 5.3 19.9 5.3 14.9"
            />
            <path
              className="logo__arc-2a"
              pathLength="100"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="2 2"
              fill="none"
              d="M14.3 5.9C19.3 5.9 19.3 23.9 14.3 23.9"
            />
            <path
              className="logo__arc-2b"
              pathLength="100"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="2 2"
              fill="none"
              d="M14.3 23.9C9.3 23.9 9.3 5.9 14.3 5.9"
            />
            <g className="logo__text-group">
              <text
                x="46"
                y="22"
                fontFamily="Inter Tight"
                fontSize="22"
                fontWeight="700"
                fill="#fff"
                letterSpacing="-0.5"
              >
                Aura
              </text>
              <text className="logo__tm" x="96" y="10">
                ™
              </text>
            </g>
          </svg>
        </a>

        <nav className="nav-pill" aria-label="Primary">
          <a className="nav-pill__link" href="#widget">
            Widget
          </a>
          <a className="nav-pill__link" href="#integrations">
            Integrations<span className="nav-pill__badge">12</span>
          </a>
          <a className="nav-pill__link" href="#pricing">
            Pricing
          </a>
          <a className="nav-pill__link" href="#docs">
            Docs
          </a>
        </nav>

        <button className="btn btn--header">
          Request Demo
          <ArrowIcon />
        </button>
      </header>

      {/* Slogan - B2B AI Support */}
      <h1 className="hero__heading">
        <span className="hero__line">
          <span className="hero__line-inner">Automating customer</span>
        </span>
        <span className="hero__line">
          <span className="hero__line-inner">delight at scale — is an</span>
        </span>
        <span className="hero__line">
          <span className="hero__line-inner">
            <em>Algorithm</em>
          </span>
        </span>
      </h1>

      <nav className="side-nav" aria-label="Sections">
        <a className="side-nav__link side-nav__link--active" href="#home">
          <span className="side-nav__link-text">Home</span>
          <span className="side-nav__line" />
        </a>
        <a className="side-nav__link" href="#automation">
          <span className="side-nav__link-text">Automation</span>
        </a>
        <a className="side-nav__link" href="#integrations">
          <span className="side-nav__link-text">Integrations</span>
        </a>
        <a className="side-nav__link" href="#pricing">
          <span className="side-nav__link-text">Pricing Plan</span>
        </a>
        <a className="side-nav__link" href="#contact">
          <span className="side-nav__link-text">Contact Us</span>
        </a>
      </nav>

      <div className="hero__blur-bar" />

      <div className="hero__bottom">
        <div className="hero__label">
          <span className="hero__line">
            <span className="hero__line-inner">01 — Our vision</span>
          </span>
        </div>
        <p className="hero__desc">
          <span className="hero__line">
            <span className="hero__line-inner">
              We power the next generation of B2B support,
            </span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">
              transforming manual ticketing backlogs into
            </span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">instant self-learning conversations.</span>
          </span>
        </p>
        <div className="hero__actions">
          <button className="btn btn--footer">
            Explore integrations
            <ArrowIcon />
          </button>
          <button className="scroll-down" id="scrollDown">
            <span className="scroll-down__text">Scroll down</span>
            <span className="scroll-down__circle">
              <svg
                viewBox="0 0 7.222 8.667"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.611 1V7.667M3.611 7.667L1 5M3.611 7.667L6.222 5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Conversational SDK Card */}
        <a className="about-card" href="#widget">
          <div className="about-card__image">
            <img
              src="/aura-about-card.png"
              alt="Aura AI Conversational Sphere"
            />
          </div>
          <div className="about-card__content">
            <div>
              <h3 className="about-card__title">SDK Integration</h3>
              <p className="about-card__text">
                Deploy a self-learning widget that integrates directly with your codebase in under two minutes.
              </p>
            </div>
            <svg
              className="about-card__arrow"
              viewBox="0 0 77 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.5H75M75 6.5L70 1.5M75 6.5L70 11.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
      <ResolutionRelay />
      <SeamlessHandoff />
      <ConnectedContext />
      <GuidanceLayer />
      <AnticipationLoop />
    </div>
  );
}
