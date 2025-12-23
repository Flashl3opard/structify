"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mermaid from "mermaid";
import {
  FileCode2,
  Eye,
  Copy,
  Download,
  Maximize2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";

const defaultDiagram = `flowchart TD
    Start([Launch App]) --> Auth{Authenticated?}
    Auth -- No --> Login[User Login]
    Login --> Auth
    Auth -- Yes --> Dash[Dashboard]
    Dash --> Process1[Data Sync]
    Dash --> Process2[UI Render]
    Process1 & Process2 --> End([Ready])

    style Start fill:#f9fafd,stroke:#4f46e5,stroke-width:2px
    style End fill:#f9fafd,stroke:#4f46e5,stroke-width:2px
    style Auth fill:#eef2ff,stroke:#4f46e5
`;

export default function MermaidPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(defaultDiagram);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  // Initialize Mermaid with a premium look
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        primaryColor: "#4f46e5",
        primaryTextColor: "#1e293b",
        primaryBorderColor: "#4f46e5",
        lineColor: "#64748b",
        secondaryColor: "#10b981",
        tertiaryColor: "#f59e0b",
        fontFamily: "Inter, ui-sans-serif, system-ui",
        fontSize: "14px",
      },
      securityLevel: "loose",
      flowchart: {
        curve: "basis",
        htmlLabels: true,
      },
    });
  }, []);

  const renderDiagram = useCallback(async (content: string) => {
    if (!containerRef.current) return;
    setIsRendering(true);

    try {
      // Clear previous error and generate unique ID
      setError(null);
      const id = "mermaid-render-" + Math.random().toString(36).substr(2, 9);

      // Mermaid render is async
      const { svg } = await mermaid.render(id, content);

      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        // Make SVG responsive
        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.style.maxWidth = "100%";
          svgElement.style.height = "auto";
        }
      }
    } catch (err: any) {
      // Mermaid throws errors as objects that sometimes don't have messages
      console.error("Mermaid Render Error:", err);
      setError("Syntax error in diagram definition");
    } finally {
      setIsRendering(false);
    }
  }, []);

  // Debounce logic to prevent rendering on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      renderDiagram(code);
    }, 500);
    return () => clearTimeout(timeout);
  }, [code, renderDiagram]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-slate-900">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Mermaid Studio
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              Create enterprise-grade diagrams with markdown syntax.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white rounded-xl text-xs font-bold text-slate-600 transition-all active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-bold text-indigo-600 transition-all active:scale-95 border border-slate-100">
              <Download className="w-3.5 h-3.5" /> Export SVG
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-250px)]">
          {/* Editor Side */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 bg-white border border-slate-200 rounded-[24px] shadow-sm flex flex-col overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  <FileCode2 className="w-4 h-4" /> Editor
                </span>
                {isRendering && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <RotateCcw className="w-3 h-3 text-indigo-500" />
                  </motion.div>
                )}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full p-8 font-mono text-sm text-slate-700 outline-none resize-none leading-relaxed selection:bg-indigo-100"
                spellCheck={false}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <p className="text-xs text-rose-700 font-bold leading-relaxed">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] overflow-hidden relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  <Eye className="w-3 h-3" /> Live Preview
                </span>
              </div>

              <div className="h-full w-full flex items-center justify-center p-12 overflow-auto scrollbar-hide">
                <div
                  ref={containerRef}
                  className="transition-transform duration-500 ease-out transform scale-100 origin-center"
                />
              </div>

              {/* Decorative Blueprint Lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(#4f46e5 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
