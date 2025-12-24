"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute top-40 right-[-10%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Turn ideas into
          <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            beautiful visuals
          </span>
          instantly.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Describe your process or data in plain English.{" "}
          <span className="font-medium text-gray-900">Vizora</span> uses AI to
          generate clean flowcharts, graphs, and diagrams — no manual drawing,
          no design skills required.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/playground"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Try the Playground
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-7 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            See how it works
          </a>
        </div>

        {/* Trust Line */}
        <p className="mt-10 text-xs text-gray-500">
          Used for flowcharts, system design, algorithms & data storytelling
        </p>
      </div>
    </section>
  );
}
