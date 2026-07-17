export function mountStaticNavbar() {
  const nav = document.querySelector<HTMLElement>('nav.framer-ywdXq');
  if (!nav) return;
  nav.classList.remove('framer-v-14qjnst');
  nav.classList.add('framer-v-ryoyqg');
  nav.setAttribute('data-framer-name', 'Nav Default');
}
