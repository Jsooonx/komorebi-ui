const signals = [
  { label: "Realtime signals", value: "24.8k", detail: "Events processed today" },
  { label: "Workflow health", value: "99.98%", detail: "Systems operating normally" },
  { label: "Active teams", value: "128", detail: "Collaborating across spaces" },
];

export default function HeaderPageContent() {
  return (
    <section className="mx-auto flex min-h-[125dvh] w-full max-w-7xl flex-col px-6 pb-16 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
          Built for steady momentum
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Keep the work moving with clarity.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
          A quiet, focused workspace that brings signals, decisions, and delivery into one reliable
          operating rhythm.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="min-h-44 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <span className="block h-2 w-2 rounded-full bg-[#E8A969]" />
          <h2 className="mt-8 text-base font-medium text-white">Responsive foundations</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">
            Build product surfaces with a system that stays calm under changing requirements.
          </p>
        </article>
        <article className="min-h-44 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <span className="block h-2 w-2 rounded-full bg-[#BECB6D]" />
          <h2 className="mt-8 text-base font-medium text-white">Confident delivery</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">
            Give every team a dependable path from first idea to a polished release.
          </p>
        </article>
      </div>

      <div className="mt-auto grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
        {signals.map((signal) => (
          <div key={signal.label} className="bg-[#09090b] px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{signal.label}</p>
            <p className="mt-3 text-2xl font-medium tracking-tight text-white">{signal.value}</p>
            <p className="mt-1 text-xs text-white/35">{signal.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
