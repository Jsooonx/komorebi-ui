const letters = "MOTION".split("");

export default function TextRollPreview() {
  return (
    <div className="group flex h-full w-full items-center justify-center overflow-hidden bg-[#101114]">
      <div className="flex">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="relative block h-9 w-6 overflow-hidden text-center text-2xl font-semibold leading-9 text-white/45"
          >
            <span
              className="absolute inset-x-0 transition-transform duration-500 group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              {letter}
            </span>
            <span
              className="absolute inset-x-0 translate-y-full text-white transition-transform duration-500 group-hover:translate-y-0"
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
