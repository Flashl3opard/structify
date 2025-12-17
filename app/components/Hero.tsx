export default function Hero() {
  return (
    <section className="px-8 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Turn ideas into visuals. Instantly.
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        Describe a process or data in plain English. Vizora uses AI to generate
        clean flowcharts, graphs, and diagrams — no manual drawing.
      </p>

      <div className="mt-10">
        <a
          href="/playground"
          className="inline-block px-6 py-3 rounded-lg bg-black text-white text-sm"
        >
          Try the Playground →
        </a>
      </div>
    </section>
  );
}
