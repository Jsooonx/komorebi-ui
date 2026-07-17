const projects = [
  { title: "Aperture House", type: "Cultural identity", image: "/assets/vanta/aperture-house.png" },
  { title: "Lumen Field", type: "Digital product", image: "/assets/vanta/lumen-field.png" },
  { title: "Nocturne Index", type: "Independent publication", image: "/assets/vanta/nocturne-index.png" },
  { title: "Tide Study", type: "Editorial commerce", image: "/assets/vanta/tide-study.png" },
];

export function projectsPageMarkup() {
  return `<main class="vanta-projects-page">
    <nav class="vanta-projects-nav" aria-label="Main navigation">
      <a class="vanta-projects-brand" href="/"><img src="/assets/vanta/vanta-mark.svg" alt=""><span>Vanta Studio</span></a>
      <div class="vanta-projects-links"><a href="/projects" aria-current="page">Work</a><a href="/#services">Capabilities</a><a href="/#pricing">Engagements</a><a href="/#journal">Dispatches</a><a class="vanta-projects-cta" href="mailto:hello@vantastudio.co">Enquire</a></div>
    </nav>
    <section class="vanta-projects-intro">
      <p>Selected work · 2024—26</p>
      <h1>Projects with<br><span>staying power.</span></h1>
    </section>
    <section class="vanta-project-grid" aria-label="Selected projects">
      ${projects.map((project, index) => `<a class="vanta-project-card" href="mailto:hello@vantastudio.co?subject=${encodeURIComponent(project.title)}" style="--project-index:${index}"><div class="vanta-project-art"><img src="${project.image}" alt="${project.title} project artwork"></div><div class="vanta-project-meta"><div><h2>${project.title}</h2><p>${project.type}</p></div><span>Open case study ↗</span></div></a>`).join("")}
    </section>
  </main>`;
}
