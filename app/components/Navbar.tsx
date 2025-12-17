"use client";

import { useState } from "react";
import Logo from "./Logo";

// --- Icons (Inline SVGs to avoid dependencies) ---
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FlowchartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4 text-indigo-500"
  >
    <rect width="8" height="8" x="3" y="3" rx="2" />
    <path d="M7 11v4h10v-4" />
    <rect width="8" height="8" x="13" y="13" rx="2" />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4 text-purple-500"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 px-6 py-3 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-10">
            <Logo />

            {/* Navigation Links */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  open
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <>
                  {/* Invisible backdrop to handle click-outside */}
                  <div
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setOpen(false)}
                  />

                  <div className="absolute left-0 top-full z-20 mt-2 w-72 origin-top-left rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                      Creation Tools
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                            <FlowchartIcon />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Flowchart Maker
                            </p>
                            <p className="text-xs text-gray-500">
                              Map out your workflows
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-50 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                            <ChartIcon />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Data Charts
                            </p>
                            <p className="text-xs text-gray-500">
                              Visualize your numbers
                            </p>
                          </div>
                        </a>
                      </li>
                      <li className="px-3 py-2">
                        <div className="flex items-center justify-between rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                          <span>System Diagrams</span>
                          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-500">
                            Soon
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-black md:block">
              Log in
            </button>

            <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-300/50">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  );
}
