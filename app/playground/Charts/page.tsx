"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import Navbar from "@/app/components/Navbar";

type ChartType = "area" | "bar" | "line" | "pie";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F43F5E",
  "#8B5CF6",
  "#F59E0B",
  "#0EA5E9",
];

export default function ChartPage() {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateChart = async () => {
    if (!prompt.trim()) {
      setError("Please describe the chart you want.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate chart");
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl text-sm">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: p.color }}
              />
              <span className="text-slate-500">{p.name}</span>
              <span className="ml-auto font-bold">{p.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (!data.length) return null;

    const common = {
      data,
      margin: { top: 10, right: 10, left: -20, bottom: 0 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...common}>
            <defs>
              <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#fillPrimary)"
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...common}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
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
          <LineChart {...common}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            {"value2" in data[0] && (
              <Line
                dataKey="value2"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            )}
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
              {data.map((_: any, i: number) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-indigo-600 uppercase">
                AI Playground
              </span>
            </div>
            <h1 className="text-4xl font-extrabold">Prompt → Chart</h1>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(["area", "bar", "line", "pie"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  chartType === t
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-500"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Prompt Panel */}
          <div className="lg:col-span-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the data you want to visualize..."
              className="w-full h-[220px] p-6 rounded-2xl border bg-slate-50 focus:bg-white outline-none"
            />

            <button
              onClick={generateChart}
              disabled={loading}
              className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Chart
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 rounded-[32px] p-10 min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chartType + JSON.stringify(data)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart() || <div />}
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
