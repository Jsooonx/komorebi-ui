function removeDuplicateIds(root: HTMLElement) {
  root.removeAttribute('id');
  root.removeAttribute('data-rebuild-track-id');
  root.querySelectorAll('[id], [data-rebuild-track-id]').forEach((element) => {
    element.removeAttribute('id');
    element.removeAttribute('data-rebuild-track-id');
  });
}

export function mountStaticProjects() {
  const heroCards = [...document.querySelectorAll<HTMLElement>('a[data-framer-name="Hero"]')];
  const projectsSection = document.querySelector<HTMLElement>('#projects');
  const projectsGrid = projectsSection?.querySelector<HTMLElement>('[data-framer-name="Projects"]');
  const heroSection = document.querySelector<HTMLElement>('section[data-framer-name="Hero"]');
  if (heroCards.length !== 4 || !projectsSection || !projectsGrid || !heroSection) return;

  // 1. Setup Hero Stack
  projectsSection.classList.add('rebuild-projects-section');
  const heroStack = document.createElement('div');
  heroStack.className = 'rebuild-hero-stack';
  heroSection.append(heroStack);
  const projectHandles = ['aperture', 'lumen', 'nocturne', 'tide'];
  heroCards.forEach((heroCard, index) => {
    heroCard.classList.add('rebuild-hero-static-card', 'rebuild-hero-' + projectHandles[index]);
    heroCard.querySelector<HTMLElement>('[data-framer-name="Project Client / View Project"]')?.style.setProperty('display', 'none', 'important');
    heroStack.append(heroCard);
  });

  // 2. Setup 2x2 Projects Grid using clean, custom HTML (consistent with Aether projects layout)
  const projects = [
    { title: "Aperture House", type: "Cultural identity", image: "/assets/aether/aperture-house.png" },
    { title: "Lumen Field", type: "Digital product", image: "/assets/aether/lumen-field.png" },
    { title: "Nocturne Index", type: "Independent publication", image: "/assets/aether/nocturne-index.png" },
    { title: "Tide Study", type: "Editorial commerce", image: "/assets/aether/tide-study.png" },
  ];

  projectsGrid.className = 'vanta-project-grid';
  projectsGrid.innerHTML = projects.map((project, index) => `
    <a class="vanta-project-card" href="mailto:hello@aetherstudio.co?subject=${encodeURIComponent(project.title)}" style="--project-index:${index}">
      <div class="vanta-project-art">
        <img src="${project.image}" alt="${project.title} project artwork">
      </div>
      <div class="vanta-project-meta">
        <div>
          <h2>${project.title}</h2>
          <p>${project.type}</p>
        </div>
        <span>Open case study ↗</span>
      </div>
    </a>
  `).join("");
}
