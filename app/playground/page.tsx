"use client";

import { motion, type Variants } from "framer-motion";
import ToolCard from "../components/ToolCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Sparkles,
  Terminal,
  Activity,
  ToyBrick,
  BrainCircuit,
} from "lucide-react";

const TOOLS = [
  {
    title: "Flowcharts",
    description:
      "Map out logic and processes with lightning speed using our intuitive editor.",
    color: "indigo" as const,
    icon: Activity,
    href: "/playground/flowchart",
  },
  {
    title: "Charts & Graphs",
    description:
      "Input raw data and watch it transform into production-ready visualizations.",
    color: "emerald" as const,
    icon: ToyBrick,
    href: "/playground/charts",
  },
  {
    title: "System Diagrams",
    description:
      "Architectural mapping for cloud infrastructure and software systems.",
    badge: "Beta",
    color: "rose" as const,
    icon: Terminal,
    href: "/playground/mermaid",
  },
  {
    title: "Mind Maps",
    description:
      "Connect disparate ideas into a cohesive strategic structure instantly.",
    badge: "New",
    color: "amber" as const,
    icon: BrainCircuit,
    href: "/playground/mindmap",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut", // ✅ FIXED — type safe
    },
  },
};

export default function PlaygroundPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <main className="mx-auto max-w-7xl px-6 pt-20 pb-32">
        {/* HEADER */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Pick a tool to begin
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl"
          >
            Creative <span className="text-indigo-600">Playground</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg font-medium text-slate-500"
          >
            Select your canvas. No setup, no configuration—just creation.
          </motion.p>
        </div>

        {/* TOOL GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
            <div className="h-80 w-[90%] bg-indigo-200/30 blur-[160px]" />
          </div>

          {TOOLS.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.href}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="block outline-none"
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                badge={tool.badge}
                color={tool.color}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* QUICK STEPS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-[36px] bg-slate-50 border border-slate-100 p-10"
        >
          {[
            [
              "Choose Tool",
              "Pick the visualization engine that fits your data.",
            ],
            [
              "Input Data",
              "Paste JSON, text, or Mermaid and see instant results.",
            ],
            ["Export SVG", "Download high-quality assets for docs or slides."],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center font-bold text-indigo-600">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
