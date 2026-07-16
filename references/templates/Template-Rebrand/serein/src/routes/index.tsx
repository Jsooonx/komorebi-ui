import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

const places = [
  {
    number: "01",
    place: "Salt House",
    location: "Comporta, Portugal",
    image: "/assets/serein/places/coast-house.png",
  },
  {
    number: "02",
    place: "Still Courtyard",
    location: "Milos, Greece",
    image: "/assets/serein/places/courtyard.png",
  },
  {
    number: "03",
    place: "North Light",
    location: "Skye, Scotland",
    image: "/assets/serein/places/north-light.png",
  },
];
const ease = [0.16, 1, 0.3, 1] as const;
export const Route = createFileRoute("/")({ component: SereinPage });

function SereinPage() {
  const story = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: story, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.45 });
  const firstX = useTransform(progress, [0, 0.16, 0.33, 1], ["0%", "0%", "-112%", "-112%"]);
  const secondX = useTransform(
    progress,
    [0, 0.27, 0.5, 0.7, 1],
    ["0%", "0%", "0%", "-112%", "-112%"],
  );
  const thirdX = useTransform(progress, [0, 0.5, 0.72, 1], ["0%", "0%", "0%", "0%"]);
  const firstOpacity = useTransform(progress, [0, 0.18, 0.33, 1], [1, 1, 0.22, 0.22]);
  const secondOpacity = useTransform(progress, [0, 0.3, 0.53, 0.7, 1], [0.7, 0.7, 1, 0.22, 0.22]);
  const thirdOpacity = useTransform(progress, [0, 0.52, 0.75, 1], [0.42, 0.42, 1, 1]);
  const firstScale = useTransform(progress, [0, 0.18, 0.33, 1], [1.018, 1.018, 0.94, 0.94]);
  const secondScale = useTransform(
    progress,
    [0, 0.3, 0.53, 0.7, 1],
    [0.968, 0.968, 1.018, 0.94, 0.94],
  );
  const thirdScale = useTransform(progress, [0, 0.52, 0.75, 1], [0.95, 0.95, 1.018, 1.018]);
  const firstY = useTransform(progress, [0, 0.18, 0.33, 1], [0, 0, -18, -18]);
  const secondY = useTransform(progress, [0, 0.3, 0.53, 0.7, 1], [18, 18, 0, -18, -18]);
  const thirdY = useTransform(progress, [0, 0.52, 0.75, 1], [22, 22, 0, 0]);
  const firstRotate = useTransform(progress, [0, 0.18, 0.33, 1], [0, 0, -1.1, -1.1]);
  const secondRotate = useTransform(progress, [0, 0.3, 0.53, 0.7, 1], [0.9, 0.9, 0, -1.1, -1.1]);
  const thirdRotate = useTransform(progress, [0, 0.52, 0.75, 1], [1.2, 1.2, 0, 0]);
  const firstFilter = useTransform(
    progress,
    [0, 0.18, 0.33, 1],
    [
      "saturate(0.94) contrast(1.02)",
      "saturate(0.94) contrast(1.02)",
      "saturate(0.66) brightness(0.84) blur(2px)",
      "saturate(0.66) brightness(0.84) blur(2px)",
    ],
  );
  const secondFilter = useTransform(
    progress,
    [0, 0.3, 0.53, 0.7, 1],
    [
      "saturate(0.72) brightness(0.9) blur(1px)",
      "saturate(0.72) brightness(0.9) blur(1px)",
      "saturate(0.96) contrast(1.02)",
      "saturate(0.66) brightness(0.84) blur(2px)",
      "saturate(0.66) brightness(0.84) blur(2px)",
    ],
  );
  const thirdFilter = useTransform(
    progress,
    [0, 0.52, 0.75, 1],
    [
      "saturate(0.7) brightness(0.9) blur(1px)",
      "saturate(0.7) brightness(0.9) blur(1px)",
      "saturate(0.96) contrast(1.02)",
      "saturate(0.96) contrast(1.02)",
    ],
  );
  return (
    <main className="serein">
      <header className="serein-nav">
        <a href="#top" className="serein-brand" aria-label="Serein home">
          <i>S</i>
          <span>Serein</span>
        </a>
        <nav>
          <a href="#places">Places</a>
          <a href="#approach">Approach</a>
          <a href="#stay">Stay</a>
        </nav>
        <a href="#stay" className="serein-nav__cta">
          Plan a stay <ArrowUpRight size={14} />
        </a>
        <button
          className="serein-nav__menu"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        {menuOpen && (
          <div className="serein-menu">
            <a href="#places" onClick={() => setMenuOpen(false)}>
              Places
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              Approach
            </a>
            <a href="#stay" onClick={() => setMenuOpen(false)}>
              Plan a stay
            </a>
          </div>
        )}
      </header>
      <section className="serein-hero" id="top">
        <img
          src="/assets/serein/places/coast-house.png"
          alt="Coastal Serein retreat in the dunes"
        />
        <div className="serein-hero__veil" />
        <motion.div
          className="serein-hero__copy"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            Serein / places led by landscape
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}>
            Stay close
            <br />
            <em>to what matters.</em>
          </motion.h1>
          <motion.a
            href="#places"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            Follow the terrain <ArrowDownRight size={17} />
          </motion.a>
        </motion.div>
        <span className="serein-hero__meta">01 — field notes / 2026</span>
      </section>
      <section className="serein-story" ref={story} id="places">
        <div className="serein-story__sticky">
          <p className="serein-story__label">Selected places / scroll to travel</p>
          <h2>
            Rooms shaped
            <br />
            by <em>their surroundings.</em>
          </h2>
          <div className="serein-story__images">
            <motion.figure
              className="serein-story__image serein-story__image--coast"
              style={{
                x: firstX,
                y: firstY,
                scale: firstScale,
                rotate: firstRotate,
                opacity: firstOpacity,
                filter: firstFilter,
              }}
            >
              <img src={places[0].image} alt="Salt House coastal retreat" />
              <figcaption>
                <b>01 / Salt House</b>
                <span>Comporta, Portugal</span>
              </figcaption>
            </motion.figure>
            <motion.figure
              className="serein-story__image serein-story__image--court"
              style={{
                x: secondX,
                y: secondY,
                scale: secondScale,
                rotate: secondRotate,
                opacity: secondOpacity,
                filter: secondFilter,
              }}
            >
              <img src={places[1].image} alt="Still Courtyard retreat" />
              <figcaption>
                <b>02 / Still Courtyard</b>
                <span>Milos, Greece</span>
              </figcaption>
            </motion.figure>
            <motion.figure
              className="serein-story__image serein-story__image--north"
              style={{
                x: thirdX,
                y: thirdY,
                scale: thirdScale,
                rotate: thirdRotate,
                opacity: thirdOpacity,
                filter: thirdFilter,
              }}
            >
              <img src={places[2].image} alt="North Light retreat" />
              <figcaption>
                <b>03 / North Light</b>
                <span>Skye, Scotland</span>
              </figcaption>
            </motion.figure>
          </div>
          <div className="serein-story__rail">
            <span>01</span>
            <i />
            <span>03</span>
          </div>
        </div>
      </section>
      <section className="serein-approach" id="approach">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
        >
          <p>Our approach / 01—03</p>
          <h2>
            Let the place
            <br />
            <em>set the pace.</em>
          </h2>
        </motion.div>
        <div className="serein-principles">
          {["Listen to the terrain", "Keep the material honest", "Leave room for stillness"].map(
            (item, index) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.64, delay: index * 0.1, ease }}
              >
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <p>Each decision makes space for a more attentive way of being here.</p>
              </motion.article>
            ),
          )}
        </div>
      </section>
      <section className="serein-stay" id="stay">
        <img src="/assets/serein/places/courtyard.png" alt="Open-air courtyard of a Serein stay" />
        <div className="serein-stay__veil" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
        >
          <p>Open seasons / 2026</p>
          <h2>
            Find a quieter
            <br />
            <em>way through.</em>
          </h2>
          <a href="mailto:hello@serein.example">
            Plan a stay <ArrowUpRight size={17} />
          </a>
        </motion.div>
      </section>
      <footer className="serein-footer">
        <a href="#top" className="serein-brand">
          <i>S</i>
          <span>Serein</span>
        </a>
        <p>Place-led hospitality for a slower way of arriving.</p>
        <span>© 2026 Serein</span>
      </footer>
    </main>
  );
}
