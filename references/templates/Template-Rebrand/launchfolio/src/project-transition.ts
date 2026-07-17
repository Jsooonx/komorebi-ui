function removeDuplicateIds(root: HTMLElement) {
  root.removeAttribute('id');
  root.removeAttribute('data-rebuild-track-id');
  root.querySelectorAll('[id], [data-rebuild-track-id]').forEach((element) => {
    element.removeAttribute('id');
    element.removeAttribute('data-rebuild-track-id');
  });
}

export function mountStaticProjects() {
  console.log("Vanta: mountStaticProjects executing");

  // 1. Setup Hero Stack (Hero visual stack)
  try {
    const heroCards = [...document.querySelectorAll<HTMLElement>('a[data-framer-name="Hero"]')];
    const heroSection = document.querySelector<HTMLElement>('section[data-framer-name="Hero"]');
    
    console.log("Vanta Hero Stack check:", { cardsFound: heroCards.length, hasHeroSection: !!heroSection });

    if (heroCards.length === 4 && heroSection) {
      const heroStack = document.createElement('div');
      heroStack.className = 'rebuild-hero-stack';
      heroSection.append(heroStack);
      const projectHandles = ['aperture', 'lumen', 'nocturne', 'tide'];
      heroCards.forEach((heroCard, index) => {
        heroCard.classList.add('rebuild-hero-static-card', 'rebuild-hero-' + projectHandles[index]);
        heroCard.querySelector<HTMLElement>('[data-framer-name="Project Client / View Project"]')?.style.setProperty('display', 'none', 'important');
        heroStack.append(heroCard);
      });
      console.log("Vanta: Hero Stack setup completed");
    } else {
      console.warn("Vanta: Hero Stack setup skipped (requires exactly 4 cards and hero section)");
    }
  } catch (error) {
    console.error("Vanta: Error setting up Hero Stack:", error);
  }

  // 2. Setup 2x2 Projects Grid using clean, custom HTML (Homepage)
  try {
    const projectsSection = document.querySelector<HTMLElement>('#projects');
    const projectsGrid = projectsSection?.querySelector<HTMLElement>('[data-framer-name="Projects"]');
    
    console.log("Vanta Projects Grid check:", { hasSection: !!projectsSection, hasGrid: !!projectsGrid });

    if (projectsSection && projectsGrid) {
      projectsSection.classList.add('rebuild-projects-section');

      const projects = [
        { title: "Aperture House", type: "Cultural identity", image: "/assets/vanta/aperture-house.png" },
        { title: "Lumen Field", type: "Digital product", image: "/assets/vanta/lumen-field.png" },
        { title: "Nocturne Index", type: "Independent publication", image: "/assets/vanta/nocturne-index.png" },
        { title: "Tide Study", type: "Editorial commerce", image: "/assets/vanta/tide-study.png" },
      ];

      projectsGrid.className = 'vanta-project-grid';
      projectsGrid.innerHTML = projects.map((project, index) => `
        <a class="vanta-project-card" href="mailto:hello@vantastudio.co?subject=${encodeURIComponent(project.title)}" style="--project-index:${index}">
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
      console.log("Vanta: Projects Grid setup completed");
    } else {
      console.warn("Vanta: Projects Grid setup skipped (section or grid not found)");
    }
  } catch (error) {
    console.error("Vanta: Error setting up Projects Grid:", error);
  }
}
