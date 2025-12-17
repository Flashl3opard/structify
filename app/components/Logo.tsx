import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group relative flex items-center gap-3 font-sans">
      {/* --- LOGO MARK --- */}
      {/* 1. Outer Glow (Bloom) - Only visible on hover */}
      <div className="absolute left-0 top-0 h-10 w-10 rounded-xl bg-indigo-500 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-40 group-hover:scale-150" />

      {/* 2. Main Container (Obsidian Block) */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-950 shadow-md ring-1 ring-gray-900/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-indigo-500/20">
        {/* Subtle Grid Background inside the logo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* 3. The Mark: A 3D Folded "V" constructed with SVG Paths */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          className="relative z-10 h-6 w-6"
        >
          <defs>
            <linearGradient
              id="fold-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#818cf8" /> {/* Indigo-400 */}
              <stop offset="100%" stopColor="#c084fc" /> {/* Purple-400 */}
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Wing (Darker for depth) */}
          <path
            d="M8 6 L16 26 L20 26 L12 6 Z"
            className="fill-indigo-600 transition-all duration-300 group-hover:fill-indigo-500 group-hover:translate-x-[-1px]"
            style={{ mixBlendMode: "screen" }}
          />

          {/* Right Wing (Gradient Main) */}
          <path
            d="M24 6 L16 26 L12 26 L20 6 Z"
            fill="url(#fold-gradient)"
            className="opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[1px]"
          />

          {/* Center Intersection Highlight (The "Spark") */}
          <circle
            cx="16"
            cy="26"
            r="1.5"
            className="fill-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </svg>
      </div>

      {/* --- TYPOGRAPHY --- */}
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold leading-none tracking-tight text-gray-900">
          Vizora
        </span>
        {/* Animated Subtitle or Underline */}
        <div className="flex items-center gap-1 overflow-hidden h-3">
          <span className="translate-y-4 text-[10px] font-medium uppercase tracking-widest text-indigo-600 transition-transform duration-300 group-hover:translate-y-0">
            Visualize
          </span>
        </div>
      </div>
    </Link>
  );
}
