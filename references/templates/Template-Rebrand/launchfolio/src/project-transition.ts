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
  projectsSection.classList.add('rebuild-projects-section');
  projectsGrid.classList.add('rebuild-project-grid');
  const heroStack = document.createElement('div');
  heroStack.className = 'rebuild-hero-stack';
  heroSection.append(heroStack);
  const projectHandles = ['aperture', 'lumen', 'nocturne', 'tide'];
  heroCards.forEach((heroCard, index) => {
    heroCard.classList.add('rebuild-hero-static-card', 'rebuild-hero-' + projectHandles[index]);
    heroCard.querySelector<HTMLElement>('[data-framer-name="Project Client / View Project"]')?.style.setProperty('display', 'none', 'important');
    const gridCard = heroCard.cloneNode(true) as HTMLElement;
    removeDuplicateIds(gridCard);
    gridCard.classList.remove('rebuild-hero-static-card', 'rebuild-hero-' + projectHandles[index]);
    gridCard.classList.add('rebuild-grid-card');
    gridCard.querySelector<HTMLElement>('[data-framer-name="Image Container"]')?.style.setProperty('transform', 'none', 'important');
    const metadata = gridCard.querySelector<HTMLElement>('[data-framer-name="Project Client / View Project"]');
    metadata?.style.setProperty('display', 'flex', 'important');
    metadata?.style.setProperty('opacity', '1', 'important');
    metadata?.style.setProperty('transform', 'none', 'important');
    projectsGrid.append(gridCard);
    heroStack.append(heroCard);
  });
}
