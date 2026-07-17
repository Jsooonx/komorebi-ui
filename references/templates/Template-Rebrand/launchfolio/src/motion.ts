import { mountStaticProjects } from './project-transition';
import { mountStaticNavbar } from './navbar-static';

function removeFramerCredit() {
  const matches = [...document.querySelectorAll<HTMLElement>('body *')].filter((node) => {
    const text = node.textContent?.trim() ?? '';
    return text.includes('Unlock for Free') && text.includes('More templates');
  });
  const credit = matches.sort(
    (a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length,
  )[0];

  credit?.remove();
}

export function startMotion() {
  removeFramerCredit();
  mountStaticProjects();
  mountStaticNavbar();

  new MutationObserver(removeFramerCredit).observe(document.body, { childList: true, subtree: true });
}
