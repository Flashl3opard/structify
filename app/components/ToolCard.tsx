"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  badge?: string;
  // Added a color prop to allow for distinct tool categories
  color?: "indigo" | "emerald" | "rose" | "amber";
}

const themeMap = {
  indigo: "bg-indigo-500 shadow-indigo-200/50",
  emerald: "bg-emerald-500 shadow-emerald-200/50",
  rose: "bg-rose-500 shadow-rose-200/50",
  amber: "bg-amber-500 shadow-amber-200/50",
};

export default function ToolCard({
  title,
  description,
  badge,
  color = "indigo",
}: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-slate-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      {/* 1. Subtle Background Accent */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 ${themeMap[color]}`}
      />

      <div>
        {/* 2. Badge & Icon Row */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6 ${themeMap[color]} text-white shadow-lg`}
          >
            <Sparkles className="h-5 w-5" />
          </div>

          {badge && (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100">
              {badge}
            </span>
          )}
        </div>

        {/* 3. Text Content */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium">
          {description}
        </p>
      </div>

      {/* 4. Action Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex -space-x-2">
          {/* Decorative avatars or indicators for "Active Users" look */}
          <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-100" />
          <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}
