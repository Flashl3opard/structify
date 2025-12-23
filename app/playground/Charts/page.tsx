"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  Code2,
  RefreshCw,
  BarChart3,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

type ChartType = "area" | "bar" | "line" | "pie";

// A sophisticated, light-mode friendly palette
const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F43F5E",
  "#8B5CF6",
  "#F59E0B",
  "#0EA5E9",
];

const defaultData = [
  { name: "Mon", value: 45, value2: 32 },
  { name: "Tue", value: 52, value2: 41 },
  { name: "Wed", value: 48, value2: 55 },
  { name: "Thu", value: 61, value2: 45 },
  { name: "Fri", value: 55, value2: 48 },
  { name: "Sat", value: 67, value2: 52 },
  { name: "Sun", value: 70, value2: 61 },
];

export default function ChartPlayground() {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [data, setData] = useState<any[]>(defaultData);
  const [rawInput, setRawInput] = useState(
    JSON.stringify(defaultData, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const applyData = () => {
    try {
      const parsed = JSON.parse(rawInput);
      setData(parsed);
      setError(null);
    } catch (e) {
      setError("Invalid JSON format.");
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 shadow-xl rounded-xl text-sm">
          <p className="font-bold text-slate-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 py-1">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500">{entry.name}:</span>
              <span className="font-bold text-slate-900 ml-auto">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  function renderChart() {
    const commonProps = {
      data,
      margin: { top: 10, right: 10, left: -20, bottom: 0 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrimary)"
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#F1F5F9", radius: 8 }}
            />
            <Bar
              dataKey="value"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">
                Visual Studio
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Data Visualizer
            </h1>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(["area", "bar", "line", "pie"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  chartType === type
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Editor */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Code2 className="w-4 h-4" />
                  JSON Data
                </label>
                {error && (
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase">
                    Error
                  </span>
                )}
              </div>

              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="w-full h-[400px] bg-slate-50 border border-slate-200 rounded-2xl p-6 font-mono text-sm focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner text-slate-700"
                placeholder="Paste JSON here..."
              />

              <button
                onClick={applyData}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                Render Changes
              </button>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50/50 rounded-[32px] border border-slate-100 p-10 h-full min-h-[500px] flex flex-col justify-center relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

              <div className="w-full h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={chartType + JSON.stringify(data)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      {renderChart() || <div />}
                    </ResponsiveContainer>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
