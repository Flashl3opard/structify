"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

export default function ChartPlayground() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [data, setData] = useState(sampleData);
  const [rawInput, setRawInput] = useState(JSON.stringify(sampleData, null, 2));

  function applyData() {
    try {
      const parsed = JSON.parse(rawInput);
      setData(parsed);
    } catch {
      alert("Invalid JSON data");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Chart Playground</h1>
      <p className="mt-1 text-sm text-gray-600">
        Paste your data and instantly visualize it.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="rounded-xl bg-white border p-6">
          <label className="text-sm font-medium text-gray-700">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "bar" | "line")}
            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>

          <label className="mt-6 block text-sm font-medium text-gray-700">
            Data (JSON)
          </label>
          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            rows={10}
            className="mt-2 w-full rounded-lg border px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={applyData}
            className="mt-4 rounded-lg bg-black px-4 py-2.5 text-sm text-white hover:bg-gray-900"
          >
            Update Chart
          </button>
        </div>

        {/* Right Panel */}
        <div className="rounded-xl bg-white border p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Preview</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              ) : (
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
