import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import DynamicIsland from "@/components/DynamicIsland";
import Hero from "@/components/Hero";
import SplitText from "@/components/ui/SplitText";
import Footer from "@/components/Footer";
import ShowcaseTerminal from "@/components/ShowcaseTerminal";
import Highlights from "@/components/Highlights";
import TemplateShowcase from "@/components/TemplateShowcase";
import { clearNavigationOrigin } from "@/lib/navigation-state";

export const Route = createFileRoute("/")({
  component: Index,
});

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Index() {
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("komorebi_scroll_target");
    if (scrollTarget) {
      sessionStorage.removeItem("komorebi_scroll_target");
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
      return;
    }

    const savedY = sessionStorage.getItem("komorebi_home_scroll_y");
    if (savedY) {
      const scrollY = Number.parseInt(savedY, 10);
      sessionStorage.removeItem("komorebi_home_scroll_y");
      clearNavigationOrigin();
      if (Number.isFinite(scrollY)) {
        window.scrollTo({ top: scrollY, behavior: "auto" });
      }
    }
  }, []);

  return (
    <main className="bg-warm-cream min-h-screen">
      <DynamicIsland />
      <Hero />

      <motion.section
        id="showcase"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="relative z-10 bg-[#090909] py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center select-none"
      >
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center mb-16">
          <div className="mb-6">
            <SplitText
              text="Connected to the way you build."
              className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal tracking-normal text-white leading-[1.2] inline-block"
              tag="h2"
              splitType="words"
              delay={80}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-120px"
            />
          </div>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed font-heading"
          >
            Tweak component parameters live, view instant code setups, and preview premium
            physics-backed animation styles directly inside the playground.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="w-full max-w-[1500px]">
          <ShowcaseTerminal />
        </motion.div>
      </motion.section>

      <Highlights />
      <TemplateShowcase />

      <Footer />
    </main>
  );
}
