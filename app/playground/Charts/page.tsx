"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type ChartType =
  | "bar"
  | "line"
  | "area"
  | "pie"
  | "radar"
  | "scatter"
  | "stacked"
  | "multiLine"
  | "composed"
  | "vertical";

const defaultData = [
  { name: "Jan", value: 400, a: 200, b: 240, value2: 300 },
  { name: "Feb", value: 300, a: 300, b: 139, value2: 200 },
  { name: "Mar", value: 500, a: 200, b: 980, value2: 450 },
  { name: "Apr", value: 200, a: 278, b: 390, value2: 180 },
];

export default function ChartPlayground() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [data, setData] = useState<any[]>(defaultData);
  const [rawInput, setRawInput] = useState(
    JSON.stringify(defaultData, null, 2)
  );

  function applyData() {
    try {
      const parsed = JSON.parse(rawInput);
      setData(parsed);
    } catch {
      alert("Invalid JSON");
    }
  }

  function renderChart() {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        );

      case "line":
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" strokeWidth={2} />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="value" />
          </AreaChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" />
            <Tooltip />
          </PieChart>
        );

      case "radar":
        return (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="value" />
          </RadarChart>
        );

      case "scatter":
        return (
          <ScatterChart>
            <XAxis dataKey="a" />
            <YAxis dataKey="b" />
            <Tooltip />
            <Scatter data={data} />
          </ScatterChart>
        );

      case "stacked":
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="a" stackId="x" />
            <Bar dataKey="b" stackId="x" />
          </BarChart>
        );

      case "multiLine":
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="value" />
            <Line dataKey="value2" />
          </LineChart>
        );

      case "composed":
        return (
          <ComposedChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
            <Line dataKey="value2" />
          </ComposedChart>
        );

      case "vertical":
        return (
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-bold">Chart Playground</h1>
      <p className="text-sm text-gray-600">
        Paste JSON data and visualize instantly
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="rounded-xl bg-white border p-6">
          <label className="text-sm font-medium">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            className="mt-2 w-full rounded-lg border px-3 py-2"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="pie">Pie</option>
            <option value="radar">Radar</option>
            <option value="scatter">Scatter</option>
            <option value="stacked">Stacked Bar</option>
            <option value="multiLine">Multi Line</option>
            <option value="composed">Composed</option>
            <option value="vertical">Vertical Bar</option>
          </select>

          <label className="mt-6 block text-sm font-medium">Data (JSON)</label>
          <textarea
            rows={12}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3 font-mono text-sm"
          />

          <button
            onClick={applyData}
            className="mt-4 rounded-lg bg-black px-4 py-2 text-white"
          >
            Update Chart
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl bg-white border p-6">
          <h2 className="text-sm font-medium mb-4">Preview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
