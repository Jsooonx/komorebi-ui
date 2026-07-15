import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

const editions = [
  {
    id: "01",
    title: "Soft Measure",
    artist: "Mara Voss",
    medium: "Travertine, bronze, textile",
    image: "/vellum/edition-01.png",
    className: "edition--tall",
  },
  {
    id: "02",
    title: "After Image",
    artist: "Elian Moor",
    medium: "Smoked glass, lacquer",
    image: "/vellum/edition-02.png",
    className: "edition--dark",
  },
  {
    id: "03",
    title: "Held Form",
    artist: "Noa Elkin",
    medium: "Ceramic, linen",
    image: "/vellum/study.png",
    className: "edition--wide",
  },
  {
    id: "04",
    title: "Still, Turning",
    artist: "Ivo Kline",
    medium: "Resin, pigment",
    image: "/vellum/hero.png",
    className: "edition--hero",
  },
];

const lenses = [
  {
    id: "material",
    number: "01",
    label: "Material",
    title: "Made to hold light differently.",
    copy: "A mineral surface, a softened edge, and the record of a hand are all part of the work's living texture.",
    note: "Travertine / bronze / linen",
  },
  {
    id: "provenance",
    number: "02",
    label: "Provenance",
    title: "Every edition keeps its own record.",
    copy: "Artist notes, production details, and ownership history remain close to the work, not hidden behind the acquisition.",
    note: "Certificate / edition 07 of 18",
  },
  {
    id: "edition",
    number: "03",
    label: "Edition",
    title: "Enough rarity to remain personal.",
    copy: "Small, deliberate runs protect the pace of each release and leave room for a collection to grow with care.",
    note: "18 works / one release",
  },
];

const viewingWorks = [
  { id: "form", label: "Soft Measure", image: "/vellum/edition-01.png" },
  { id: "glass", label: "After Image", image: "/vellum/edition-02.png" },
  { id: "study", label: "Held Form", image: "/vellum/study.png" },
];

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const stagger = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.04, staggerChildren: 0.1 },
  },
};
const imageReveal = {
  hidden: { opacity: 0, scale: 1.025, clipPath: "inset(6% 5%)" },
  visible: { opacity: 1, scale: 1, clipPath: "inset(0%)" },
};
const ease = [0.16, 1, 0.3, 1] as const;
const sectionViewport = { once: true, amount: 0.18 };

export const Route = createFileRoute("/")({ component: VellumPage });

function VellumPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLens, setActiveLens] = useState("material");
  const [activeWork, setActiveWork] = useState("form");
  const lens = lenses.find((item) => item.id === activeLens) ?? lenses[0];
  const work = viewingWorks.find((item) => item.id === activeWork) ?? viewingWorks[0];

  return (
    <main className="vellum">
      <motion.header className="vellum-nav" initial="hidden" animate="visible" variants={stagger}>
        <motion.a
          className="vellum-nav__brand"
          href="#top"
          aria-label="Vellum home"
          variants={reveal}
        >
          <i>V</i>
          <span>Vellum</span>
        </motion.a>
        <motion.nav className="vellum-nav__links" aria-label="Main navigation" variants={reveal}>
          <a href="#editions">Editions</a>
          <a href="#lens">Approach</a>
          <a href="#notes">Notes</a>
        </motion.nav>
        <motion.a className="vellum-nav__cta" href="#viewing" variants={reveal}>
          Request a viewing <ArrowUpRight size={14} />
        </motion.a>
        <motion.button
          className="vellum-nav__menu"
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          variants={reveal}
        >
          <Menu size={20} />
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="vellum-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="vellum-menu__top">
              <span>Vellum</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
              >
                <X />
              </button>
            </div>
            <a href="#editions" onClick={() => setMenuOpen(false)}>
              Editions
            </a>
            <a href="#lens" onClick={() => setMenuOpen(false)}>
              Approach
            </a>
            <a href="#notes" onClick={() => setMenuOpen(false)}>
              Notes
            </a>
            <a href="#viewing" onClick={() => setMenuOpen(false)}>
              Request a viewing <ArrowUpRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="vellum-hero" id="top">
        <img src="/vellum/hero.png" alt="Amber resin sculpture in a limestone gallery" />
        <div className="vellum-hero__veil" />
        <motion.div
          className="vellum-hero__copy"
          initial="hidden"
          animate="visible"
          variants={stagger}
          transition={{ delay: 0.12 }}
        >
          <motion.p variants={reveal} transition={{ duration: 0.72, ease }}>
            Vellum / inaugural release / 2026
          </motion.p>
          <motion.h1 variants={reveal} transition={{ duration: 0.82, ease }}>
            Collect work
            <br />
            <em>that stays with you.</em>
          </motion.h1>
          <motion.a href="#editions" variants={reveal} transition={{ duration: 0.68, ease }}>
            Enter the viewing room <ArrowDownRight size={17} />
          </motion.a>
        </motion.div>
        <motion.div
          className="vellum-hero__meta"
          initial="hidden"
          animate="visible"
          variants={stagger}
          transition={{ delay: 0.54 }}
        >
          <motion.span variants={reveal} transition={{ duration: 0.6, ease }}>
            01—04
          </motion.span>
          <motion.span variants={reveal} transition={{ duration: 0.6, ease }}>
            Lisbon / private edition
          </motion.span>
        </motion.div>
      </section>

      <section className="editions" id="editions">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={stagger}
        >
          <motion.p variants={reveal} transition={{ duration: 0.62, ease }}>
            Selected editions / 01—04
          </motion.p>
          <motion.h2 variants={reveal} transition={{ duration: 0.76, ease }}>
            Four works,
            <br />
            <em>placed with intent.</em>
          </motion.h2>
          <motion.span variants={reveal} transition={{ duration: 0.65, ease }}>
            Each release begins with a small, considered group of objects and the story that made
            them necessary.
          </motion.span>
        </motion.div>
        <div className="edition-grid">
          {editions.map((edition, index) => (
            <motion.article
              className={`edition ${edition.className}`}
              key={edition.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={reveal}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
            >
              <div className="edition__image">
                <img src={edition.image} alt={`${edition.title} by ${edition.artist}`} />
                <div className="edition__wash" />
                <span className="edition__index">{edition.id}</span>
                <motion.div className="edition__hover" initial={false}>
                  <span>
                    View edition <ArrowUpRight size={15} />
                  </span>
                </motion.div>
              </div>
              <div className="edition__meta">
                <div>
                  <h3>{edition.title}</h3>
                  <p>{edition.artist}</p>
                </div>
                <span>{edition.medium}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="lens" id="lens">
        <motion.div
          className="lens__stage"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={imageReveal}
          transition={{ duration: 0.95, ease }}
        >
          <img src="/vellum/study.png" alt="Ceramic sculpture and oxblood textile on limestone" />
          <div className="lens__shade" />
          <div className="lens__number" aria-hidden="true">
            0{lenses.findIndex((entry) => entry.id === activeLens) + 1}
          </div>
        </motion.div>
        <motion.div
          className="lens__content"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={stagger}
        >
          <motion.p variants={reveal} transition={{ duration: 0.6, ease }}>
            Collector's lens
          </motion.p>
          <motion.div className="lens__controls" variants={stagger}>
            {lenses.map((item) => (
              <motion.button
                type="button"
                key={item.id}
                onMouseEnter={() => setActiveLens(item.id)}
                onFocus={() => setActiveLens(item.id)}
                onClick={() => setActiveLens(item.id)}
                className={activeLens === item.id ? "is-active" : ""}
                aria-pressed={activeLens === item.id}
                variants={reveal}
                transition={{ duration: 0.56, ease }}
              >
                {activeLens === item.id && (
                  <motion.span
                    layoutId="vellum-lens-highlight"
                    transition={{ type: "spring", stiffness: 320, damping: 29 }}
                  />
                )}
                <small>{item.number}</small>
                <b>{item.label}</b>
                <Plus size={15} />
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            className="lens__detail"
            variants={reveal}
            transition={{ duration: 0.68, ease }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                className="lens__detail-copy"
                key={lens.id}
                initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -9, filter: "blur(5px)" }}
                transition={{ duration: 0.28, ease }}
              >
                <span>{lens.note}</span>
                <h2>{lens.title}</h2>
                <p>{lens.copy}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="notes"
        id="notes"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="notes__quote" variants={reveal} transition={{ duration: 0.7, ease }}>
          <p>Artist notes / Mara Voss</p>
          <blockquote>
            “I wanted the surface to feel like it had already been <em>remembered.</em>”
          </blockquote>
          <span>From the studio journal, April 2026</span>
        </motion.div>
        <motion.div
          className="notes__image"
          variants={imageReveal}
          transition={{ duration: 0.95, ease }}
        >
          <img src="/vellum/edition-01.png" alt="Soft Measure, a travertine and bronze artwork" />
        </motion.div>
        <motion.div
          className="notes__record"
          variants={reveal}
          transition={{ duration: 0.68, ease }}
        >
          <span>Edition 07 / 18</span>
          <p>
            Made slowly in a small foundry outside Lisbon. The linen is hand-dyed; each stone
            carries a different constellation of pores.
          </p>
          <a href="#viewing">
            Read the edition record <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </motion.section>

      <motion.section
        className="viewing"
        id="viewing"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="viewing__heading" variants={stagger}>
          <motion.p variants={reveal} transition={{ duration: 0.6, ease }}>
            Private viewing / room 01
          </motion.p>
          <motion.h2 variants={reveal} transition={{ duration: 0.76, ease }}>
            Take your time
            <br />
            <em>with the work.</em>
          </motion.h2>
          <motion.span variants={reveal} transition={{ duration: 0.62, ease }}>
            Select an edition to bring it forward.
          </motion.span>
        </motion.div>
        <motion.div
          className="viewing__composition"
          variants={reveal}
          transition={{ duration: 0.82, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="viewing__frame"
              key={work.id}
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
              transition={{ duration: 0.36, ease }}
            >
              <img src={work.image} alt={`${work.label} selected for private viewing`} />
              <div>
                <span>Current selection</span>
                <strong>{work.label}</strong>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="viewing__works" onMouseLeave={() => setActiveWork("form")}>
            {viewingWorks.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onMouseEnter={() => setActiveWork(item.id)}
                onFocus={() => setActiveWork(item.id)}
                onClick={() => setActiveWork(item.id)}
                className={activeWork === item.id ? "is-active" : ""}
                aria-pressed={activeWork === item.id}
              >
                <img src={item.image} alt="" />
                <span>0{index + 1}</span>
                <b>{item.label}</b>
              </button>
            ))}
          </div>
        </motion.div>
        <motion.a
          className="viewing__cta"
          href="mailto:viewing@vellum.example"
          variants={reveal}
          transition={{ duration: 0.62, ease }}
        >
          Request a private viewing <ArrowUpRight size={17} />
        </motion.a>
      </motion.section>

      <motion.footer
        className="vellum-footer"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div variants={reveal} transition={{ duration: 0.64, ease }}>
          <a className="vellum-nav__brand" href="#top">
            <i>V</i>
            <span>Vellum</span>
          </a>
          <p>Contemporary editions, carefully placed.</p>
        </motion.div>
        <motion.div variants={reveal} transition={{ duration: 0.64, ease }}>
          <span>Contact</span>
          <a href="mailto:studio@vellum.example">studio@vellum.example</a>
          <a href="#viewing">Private viewings</a>
        </motion.div>
        <motion.div variants={reveal} transition={{ duration: 0.64, ease }}>
          <span>Elsewhere</span>
          <a href="#editions">Selected editions</a>
          <a href="#notes">Artist notes</a>
        </motion.div>
        <motion.small variants={reveal} transition={{ duration: 0.64, ease }}>
          © 2026 Vellum. Made for slow looking.
        </motion.small>
      </motion.footer>
    </main>
  );
}
