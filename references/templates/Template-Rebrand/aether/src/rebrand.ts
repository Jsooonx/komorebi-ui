const copy: Array<[string, string]> = [
  ["Joseph Alexander", "Aether Studio"],
  ["JOSEPH", "AETHER"],
  ["joseph@launchnow.design", "hello@aetherstudio.co"],
  ["Available for August'25", "Booking select Q4 partnerships"],
  ["Design that delivers results.", "Design that holds its weight."],
  ["Strategic design that drives growth, not just looks good.", "Considered systems for digital-first brands."],
  ["I create everything your brand needs to attract customers and turn them into sales.", "We build visual languages and digital interfaces that turn positioning into permanent signals."],
  ["Book a call with me", "Start a conversation"],
  ["Book a free discovery call.", "Tell us what needs to shift."],
  ["Book a call", "Start a project"],
  ["Book Now", "Plan a session"],
  ["Hire me today", "Build with Aether"],
  ["Design studio", "Independent design studio"],
  ["Designer", "Creative partner"],
  ["Full-Stack Designer", "Strategy, identity & digital"],
  ["Kora", "Aperture House"],
  ["KYMA", "Lumen Field"],
  ["Mugen", "Nocturne Index"],
  ["Axiom", "Tide Study"],
  ["Consulting Site", "Cultural identity"],
  ["AI Agency", "Digital product"],
  ["Design studio", "Independent design studio"],
  ["Ecommerce Site", "Editorial commerce"],
  ["View Project", "Open case study"],
  ["View all my projects", "Explore selected work"],
  ["Services", "Capabilities"],
  ["Pricing", "Engagements"],
  ["Blog", "Dispatches"],
  ["Contact", "Enquire"],
  ["Latest", "Selected"],
  ["Projects", "Work"],
  ["My work history", "Studio notes"],
  ["My tech stack", "Our working tools"],
  ["Subscription design services", "Design direction, on call"],
  ["Unlimited Design", "Studio retainer"],
  ["Unlimited requests", "Ongoing creative direction"],
  ["Single Project", "Focused engagement"],
  ["Select from monthly subscriptions or individual project rates.", "Choose a focused launch, a retained partnership, or a custom programme."],
  ["Receive your design within 48 hours on average.", "Move from signal to working direction with a clear weekly rhythm."],
  ["Subscribe via stripe &amp; start requesting through my trello board.", "Confirm a scope, set the cadence, and begin with the work that matters most."],
  ["No contracts or commitments", "Flexible, senior collaboration"],
  ["Pause or cancel anytime", "Built around your changing priorities"],
  ["Clear costs, no hidden fees.", "A transparent investment from the first conversation."],
  ["Avg 48 hour turnaround", "Thoughtful weekly momentum"],
  ["99+ Happy clients", "120+ considered partnerships"],
  ["Trusted by", "Chosen by teams at"],
  ["Slots available", "Now booking Q4"],
  ["Still not sure?", "A useful first conversation"],
  ["Speak to me", "Talk to Aether"],
  ["Email or book a call", "Write to the studio or plan a session"],
  ["Call Me", "Start a project"],
  ["Get quote", "Request a direction"],
  ["Get Started", "Begin a conversation"],
  ["Schedule Now", "Plan a session"],
  ["Request whatever service I offer, from branding to web design.", "Bring the decision, opportunity, or obstacle that needs a clearer shape."],
  ["I love turning ideas into something real through design.", "Aether builds the visual language and digital tools behind a lasting point of view."],
  ["I focus on creating user interfaces that serve a real purpose", "We make every interface carry the weight of the brand behind it."],
  ["Designing for human connection.", "Designing for meaningful momentum."],
  ["By Joseph Alexander", "By Aether Studio"],
  ["© 2026 Joseph Alexander", "© 2026 Aether Studio"],
  ["Privacy Policy", "Privacy"],
  ["Terms of service", "Terms"],
  ["Social", "Elsewhere"],
  ["Emma Kraft", "Nia Patel"],
  ["Martina Martinez", "Mara Ito"],
  ["Michael Wong", "Theo James"],
  ["Ben Harper", "Rae Kim"],
  ["Natalie Rivera", "Iris Cole"],
  ["Brand Manager at UnityBrands", "Brand Director at Halcyon"],
  ["Co-founder of KYMA", "Founder of Lumen Field"],
  ["CMO of TechVista", "CMO of Aperture House"],
  ["CTO of Nexus", "Product lead at Meridian"],
  ["Data Scientist at DataSphere", "Strategy lead at Kinform"],
  ["Working with Joseph", "Working with Aether"],
  ["Joseph's design approach", "Aether's design approach"],
  ["Joseph's expertise", "Aether's expertise"],
  ["LaunchNow", "Aether"],
  ["launchnow", "aether"],
];

const projectAssets = [
  "/assets/aether/aperture-house.png",
  "/assets/aether/lumen-field.png",
  "/assets/aether/nocturne-index.png",
  "/assets/aether/tide-study.png",
];
const portrait = "/assets/aether/elias-hart.png";

export function rebrandMarkup(markup: string) {
  return copy.reduce((result, [from, to]) => result.split(from).join(to), markup);
}

function replaceRemoteMedia() {
  let artworkIndex = 0;
  document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    if (!image.src.includes("framerusercontent.com")) return;
    const parentName = image.closest<HTMLElement>("[data-framer-name]")?.dataset.framerName ?? "";
    const isPortrait = /headshot|profile|happy client|avatar/i.test(`${image.alt} ${parentName}`);
    image.src = isPortrait ? portrait : projectAssets[artworkIndex++ % projectAssets.length];
    image.removeAttribute("srcset");
    image.alt = isPortrait ? "Aether Studio director portrait" : "Aether Studio selected work";
    image.decoding = "async";
  });

  document.querySelectorAll<HTMLElement>("[style*='framerusercontent.com']").forEach((element) => {
    element.style.cssText = element.style.cssText.replace(/https:\/\/framerusercontent\.com\/images\/[^\s)'\"]+/g, projectAssets[0]);
  });
}

function replaceLegacyLinks() {
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    if (/cal\.com|launchnow|framer\.com/i.test(link.href)) link.href = "mailto:hello@aetherstudio.co";
  });
  document.querySelectorAll<HTMLButtonElement>("button[aria-label='Contact Form']").forEach((button) => {
    button.setAttribute("aria-label", "Start a project");
  });
}

function rebuildSplitHeadline() {
  document.querySelectorAll<HTMLHeadingElement>("section[data-framer-name='Hero'] h1").forEach((heading) => {
    heading.innerHTML = "<span style='color:rgb(92, 98, 110)'>Design that</span><br><span>holds its weight.</span>";
    heading.closest<HTMLElement>("[data-framer-name]")?.setAttribute("data-framer-name", "Design that holds its weight.");
  });
}

function rebuildClientMarks() {
  const ticker = document.querySelector<HTMLElement>("[data-framer-name='Ticker']");
  if (!ticker) return;

  const brands = ["Northform", "Palisade", "Common Kind", "Terrain", "Solaire", "Hinter"];
  const set = `<div class="vanta-logo-set">${brands.map((name, index) => `<span class="vanta-partner-logo vanta-partner-${index}"><img class="vanta-partner-mark" src="/assets/aether/partner-mark.png" alt=""><span class="vanta-partner-name">${name}</span></span>`).join("")}</div>`;

  ticker.innerHTML = `<div class="vanta-logo-ticker" aria-label="Aether Studio partner marks"><div class="vanta-logo-track">${set}${set}</div></div>`;
  ticker.style.cssText += ";display:block;transform:none;width:100%;";
}

function mountBrandMark() {
  document.querySelectorAll<HTMLElement>("nav [data-framer-name='Profile Pic / Name']").forEach((brand) => {
    brand.querySelector<HTMLElement>(".framer-1mf7mjt-container")?.remove();
    if (brand.querySelector(".vanta-brand-mark")) return;
    brand.insertAdjacentHTML("afterbegin", '<img class="vanta-brand-mark" src="/assets/aether/aether-mark.svg" alt="Aether Studio">');
  });
}

function removeHeroCardLabels() {
  document.querySelectorAll<HTMLElement>("a[data-framer-name='Hero'] [data-framer-name='Project Client / Open case study'], a[data-framer-name='Hero'] [data-framer-name='Project Name'], a[data-framer-name='Hero'] [data-framer-name='Type of Work'], a[data-framer-name='Hero'] [data-framer-name='Open case study']").forEach((element) => {
    element.style.setProperty("display", "none", "important");
  });
}

export function applyVantaRebrand() {
  rebuildSplitHeadline();
  rebuildClientMarks();
  mountBrandMark();
  removeHeroCardLabels();
  replaceRemoteMedia();
  replaceLegacyLinks();
  document.documentElement.style.setProperty("--aether-terracotta", "#D56B4D");
  document.documentElement.style.setProperty("--aether-slate", "#5C626E");
}
