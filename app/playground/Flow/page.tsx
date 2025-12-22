"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const defaultDiagram = `flowchart TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Ship it 🚀]
  B -- No --> D[Fix it 🔧]
  D --> B
`;

export default function MermaidPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(defaultDiagram);
  const [error, setError] = useState("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
  }, []);

  useEffect(() => {
    renderDiagram();
  }, [code]);

  const renderDiagram = async () => {
    if (!containerRef.current) return;

    try {
      setError("");
      const id = "mermaid-" + Date.now();
      const { svg } = await mermaid.render(id, code);
      containerRef.current.innerHTML = svg;
    } catch (err: any) {
      setError(err.message || "Invalid Mermaid syntax");
      containerRef.current.innerHTML = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-bold">Mermaid Playground</h1>
      <p className="text-sm text-gray-600">
        Write diagram-as-code and preview instantly
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="rounded-xl bg-white border p-6">
          <label className="text-sm font-medium text-gray-700">
            Mermaid Code
          </label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={16}
            className="mt-2 w-full rounded-lg border px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && <p className="mt-3 text-sm text-red-600">⚠ {error}</p>}
        </div>

        {/* Preview */}
        <div className="rounded-xl bg-white border p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Preview</h2>

          <div
            ref={containerRef}
            className="overflow-auto border rounded-lg p-4 min-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
