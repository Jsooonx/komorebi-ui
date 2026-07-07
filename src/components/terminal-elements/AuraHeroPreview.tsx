import { useEffect, useRef } from "react";
import "./AuraHeroPreview.css";

const CHAR_STEP = 0.038;

function animateLines(container: HTMLElement, selector: string, baseDelay: number, lineGap: number) {
  const nodes = container.querySelectorAll<HTMLElement>(selector);
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

export default function AuraHeroPreview() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let started = false;
    const startAnimations = () => {
      if (started) return;
      started = true;
      
      const container = heroRef.current?.closest(".aura-preview-container");
      if (container) {
        container.classList.remove("is-ready");
        // Force reflow
        void container.offsetWidth;
        container.classList.add("is-ready");
        
        // Scope the split text animations directly to the component root container
        animateLines(container, ".hero__heading .hero__line-inner", 0.3, 0.85);
        animateLines(container, ".hero__label .hero__line-inner", 0.3, 0.65);
        animateLines(container, ".hero__desc .hero__line-inner", 0.3, 0.65);
      }
    };

    const fallback = window.setTimeout(startAnimations, 200);

    const sideLinks = document.querySelectorAll<HTMLAnchorElement>(".aura-preview-container .side-nav__link");
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

    return () => {
      window.clearTimeout(fallback);
      sideLinks.forEach((l) => l.removeEventListener("click", onSideClick));
      const container = heroRef.current?.closest(".aura-preview-container");
      if (container) {
        container.classList.remove("is-ready");
      }
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
    <div className="aura-preview-container w-full h-full absolute inset-0 overflow-hidden rounded-2xl select-none">
      <div className="hero" ref={heroRef}>
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
                r="7"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
              />
              <path
                className="logo__arc-1a"
                pathLength="100"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M28.4955 14.6513C28.4346 12.2923 27.7563 9.99047 26.5284 7.9753C25.3005 5.96012 23.5657 4.30202 21.4972 3.1663C19.4287 2.03059 17.0985 1.45693 14.7392 1.50252C12.3798 1.54811 10.0736 2.21137 8.05047 3.42615"
              />
              <path
                className="logo__arc-1b"
                pathLength="100"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M28.4955 14.6513C28.5564 17.0104 27.998 19.3442 26.8757 21.4201C25.7535 23.496 24.1067 25.2414 22.0996 26.4824C20.0924 27.7234 17.795 28.4166 15.4365 28.4929C13.0779 28.5692 10.7405 28.026 8.65735 26.9173"
              />
              <path
                className="logo__arc-2a"
                pathLength="100"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M37.4997 14.9144C37.4824 12.1783 36.634 9.51197 35.0671 7.26888C33.5001 5.02578 31.2885 3.31178 28.7254 2.35403"
              />
              <path
                className="logo__arc-2b"
                pathLength="100"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M37.4997 14.9144C37.5171 17.6506 36.7026 20.3274 35.1642 22.5902C33.6258 24.853 31.4361 26.5949 28.8853 27.5851"
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
    </div>
  );
}
