"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-4 focus:outline-none">
      {/* --- LOGO MARK --- */}
      <div className="relative flex h-11 w-11 items-center justify-center">
        {/* 1. Animated Ambient Glow (The "Aura") */}
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl transition-all duration-700 group-hover:bg-indigo-500/40 group-hover:scale-150" />

        {/* 2. The Core Block */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-slate-950 shadow-2xl ring-1 ring-white/10 transition-all duration-500 group-hover:rounded-[18px] group-hover:ring-white/20 group-hover:-translate-y-0.5">
          {/* Subtle Dynamic Scanline effect */}
          <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.1)_50%,transparent_100%)] bg-[length:100%_4px] group-hover:animate-pulse" />

          {/* 3. The Geometric Mark */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="relative z-10 h-7 w-7 transition-transform duration-500 group-hover:scale-110"
          >
            <defs>
              <linearGradient
                id="logo-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter
                id="neon-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Shape (Inner Depth) */}
            <path
              d="M16 4L28 24H4L16 4Z"
              className="fill-slate-900 transition-all duration-500 group-hover:fill-slate-800"
            />

            {/* The Floating Accent (The "V" Fold) */}
            <path
              d="M16 28L6 10L10 10L16 22L22 10L26 10L16 28Z"
              fill="url(#logo-grad)"
              filter="url(#neon-glow)"
              className="opacity-90 group-hover:opacity-100 transition-all duration-500"
            />

            {/* The Light Flare */}
            <circle
              cx="16"
              cy="22"
              r="1"
              className="fill-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </svg>

          {/* 4. Glass Reflection Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
        </div>
      </div>

      {/* --- TYPOGRAPHY --- */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
            Vizora
          </span>
          {/* Version/Beta Tag */}
          <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 transition-all group-hover:bg-indigo-50 group-hover:text-indigo-600">
            PRO
          </span>
        </div>

        {/* Animated Slogan Section */}
        <div className="h-4 overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Visual Intelligence
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
              Future of Data
            </span>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
