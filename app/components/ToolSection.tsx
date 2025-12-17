import ToolCard from "./ToolCard";

export default function ToolsSection() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center">
        What can you create?
      </h2>

      <p className="mt-4 text-center text-gray-600">
        Generate structured visuals from plain text and data.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ToolCard
          title="Flowcharts"
          description="Convert processes and logic into clean flowcharts."
        />

        <ToolCard
          title="Charts & Graphs"
          description="Turn numeric data into bar and line charts."
        />

        <ToolCard
          title="System Diagrams"
          description="Explain architectures visually."
          badge="Coming Soon"
        />

        <ToolCard
          title="Timelines"
          description="Visualize steps and phases over time."
          badge="Coming Soon"
        />
      </div>
    </section>
  );
}
