interface ToolCardProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolCard({ title, description, badge }: ToolCardProps) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-sm transition">
      {badge && (
        <span className="text-xs px-2 py-1 rounded bg-gray-100">{badge}</span>
      )}

      <h3 className="mt-4 text-lg font-medium">{title}</h3>

      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
