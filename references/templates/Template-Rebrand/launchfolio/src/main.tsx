import { markup, htmlAttrs, bodyAttrs } from './captured-page';
import './styles/source.css';
import './styles/static-rebuild.css';
import { startMotion } from './motion';
import { applyVantaRebrand, rebrandMarkup } from './rebrand';
import { projectsPageMarkup } from './projects-page';

if (window.location.pathname === '/projects' || window.location.pathname === '/projects/') {
  document.body.innerHTML = projectsPageMarkup();
} else {
for (const [name, value] of Object.entries(htmlAttrs)) document.documentElement.setAttribute(name, String(value));
for (const [name, value] of Object.entries(bodyAttrs)) document.body.setAttribute(name, String(value));
const template = document.createElement('template');
template.innerHTML = rebrandMarkup(markup);
document.body.replaceChildren(...template.content.childNodes);
startMotion();
applyVantaRebrand();
}
