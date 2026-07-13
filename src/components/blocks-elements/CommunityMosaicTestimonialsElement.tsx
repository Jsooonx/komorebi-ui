import { motion, useReducedMotion } from "framer-motion";

type PreviewMode = "catalog" | "fullscreen";

type Testimonial = {
  name: string;
  role: string;
  community: string;
  quote: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sasha Reid",
    role: "Program lead",
    community: "Ostra Collective",
    quote:
      "The system gives our team a calmer place to decide. We spend less time looking for the thread and more time making the work better.",
    avatar: "sasha-reid.png",
  },
  {
    name: "Milan Reyes",
    role: "Operations director",
    community: "North Bank",
    quote:
      "It has the rare quality of feeling considered before you ever touch a setting. The small details make the whole workflow easier to trust.",
    avatar: "milan-reyes.png",
  },
  {
    name: "Noor Ahmed",
    role: "Design systems lead",
    community: "Common Thread",
    quote:
      "Everything feels deliberately reduced to what matters. That restraint has made our reviews clearer and our handoffs much kinder.",
    avatar: "noor-ahmed.png",
  },
  {
    name: "Elliot Tan",
    role: "Product founder",
    community: "Harbour Studio",
    quote:
      "We can move from an unfinished thought to a useful decision without making the process feel heavy. That is a meaningful change for a small team.",
    avatar: "elliot-tan.png",
  },
  {
    name: "Leah Moreno",
    role: "Independent designer",
    community: "Field Office",
    quote:
      "It feels like someone cared about the space between actions, not just the actions themselves. That makes working in it feel unexpectedly calm.",
    avatar: "leah-moreno.png",
  },
  {
    name: "Theo Garcia",
    role: "Engineering manager",
    community: "Relay Works",
    quote:
      "We adopted it for one project, then quietly started using the same patterns everywhere else. The structure has a way of becoming second nature.",
    avatar: "theo-garcia.png",
  },
  {
    name: "Mika Voss",
    role: "Creative director",
    community: "Lowline Studio",
    quote:
      "The visual language is disciplined without feeling cold. It has made our internal tools feel like part of the same product, not an afterthought.",
    avatar: "mika-voss.png",
  },
  {
    name: "Gabriel Owens",
    role: "Founder",
    community: "Morrow House",
    quote:
      "We finally have a pace that leaves room for judgment. The work moves forward, but it does not have to become louder to do so.",
    avatar: "gabriel-owens.png",
  },
  {
    name: "Priya Sen",
    role: "Research lead",
    community: "Signal Practice",
    quote:
      "It turns a complex set of moving parts into something the whole team can read at a glance. That clarity has been invaluable.",
    avatar: "priya-sen.png",
  },
  {
    name: "Ren Park",
    role: "Product designer",
    community: "After Hours",
    quote:
      "The interactions feel small in the best way. Nothing calls attention to itself, yet every transition gives you confidence about where you are.",
    avatar: "ren-park.png",
  },
  {
    name: "Amara Holt",
    role: "Community builder",
    community: "Common Ground",
    quote:
      "It gives people with different disciplines a shared language for the work. The result is more generous collaboration and fewer lost details.",
    avatar: "amara-holt.png",
  },
  {
    name: "Julian Ward",
    role: "Software engineer",
    community: "Earlyform",
    quote:
      "The longer we use it, the more we notice the decisions that were made on our behalf. It is practical, but never merely functional.",
    avatar: "julian-ward.png",
  },
];

const testimonialColumns = [
  testimonials.slice(0, 4),
  testimonials.slice(4, 8),
  testimonials.slice(8, 12),
];

function TestimonialCard({
  testimonial,
  compact,
  reducedMotion,
}: {
  testimonial: Testimonial;
  compact: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.article
      className={`group bg-white/[0.07] text-white transition-colors duration-300 hover:bg-white/[0.1] ${compact ? "rounded-lg p-4" : "rounded-xl p-5 md:p-6"}`}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.45 }}
    >
      <div className="flex items-center gap-3">
        <img
          src={`/images/testimonials/community-mosaic/${testimonial.avatar}`}
          alt=""
          className={`shrink-0 rounded-full object-cover grayscale transition duration-300 group-hover:grayscale-0 group-hover:brightness-110 ${compact ? "h-8 w-8" : "h-9 w-9"}`}
          loading="lazy"
        />
        <div className="min-w-0">
          <p className={`truncate font-medium text-white ${compact ? "text-[11px]" : "text-sm"}`}>
            {testimonial.name}
          </p>
          <p className={`mt-0.5 truncate text-white/42 ${compact ? "text-[9px]" : "text-[11px]"}`}>
            {testimonial.role} &middot; {testimonial.community}
          </p>
        </div>
      </div>
      <p
        className={`mt-5 leading-[1.55] text-white/78 transition-colors duration-300 group-hover:text-white/92 ${compact ? "text-[11px]" : "text-sm"}`}
      >
        {testimonial.quote}
      </p>
    </motion.article>
  );
}

export default function CommunityMosaicTestimonialsElement({
  previewMode = "fullscreen",
}: {
  minimal?: boolean;
  previewMode?: PreviewMode;
}) {
  const compact = previewMode === "catalog";
  const reducedMotion = useReducedMotion();

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-[#0a0a0b] text-white scrollbar-none">
      <section
        className={`mx-auto w-full max-w-6xl px-5 md:px-12 ${compact ? "py-10" : "py-20 md:py-28"}`}
      >
        <header className={`mx-auto max-w-xl text-center ${compact ? "mb-8" : "mb-14 md:mb-16"}`}>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            Community notes / 03
          </span>
          <h2
            className={`mt-4 font-sans font-semibold tracking-[-0.04em] text-white ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
          >
            Built alongside real teams.
          </h2>
          <p
            className={`mx-auto mt-3 max-w-md leading-relaxed text-white/48 ${compact ? "text-xs" : "text-sm"}`}
          >
            Small notes from people making focused, more deliberate work.
          </p>
        </header>

        <div className="grid items-start gap-3 md:grid-cols-3 md:gap-4">
          {testimonialColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3 md:space-y-4">
              {column.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  compact={compact}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
