"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

// --- Best-in-class Icons ---
const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: isOpen ? 180 : 0 }}
    className="h-3.5 w-3.5 opacity-50"
  >
    <path d="m6 9 6 6 6-6" />
  </motion.svg>
);

const IconWrapper = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <div
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${color}`}
  >
    {children}
  </div>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Flowchart Maker",
      desc: "Visualize complex logic & flows.",
      icon: (
        <svg
          className="h-5 w-5 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
          />
        </svg>
      ),
      color: "bg-indigo-50",
    },
    {
      title: "Data Visualization",
      desc: "Transform numbers into insights.",
      icon: (
        <svg
          className="h-5 w-5 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "bg-emerald-50",
    },
    {
      title: "Mind Mapping",
      desc: "Connect ideas intuitively.",
      icon: (
        <svg
          className="h-5 w-5 text-rose-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "bg-rose-50",
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/70 py-3 backdrop-blur-xl shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Brand */}
          <div className="flex items-center gap-12">
            <Logo />

            {/* Nav Menu */}
            <div className="hidden items-center gap-1 md:flex">
              <div className="relative">
                <button
                  onMouseEnter={() => setOpen(true)}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    open
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Products
                  <ChevronDown isOpen={open} />
                </button>

                {/* Dropdown Card */}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setOpen(false)}
                      className="absolute left-0 top-full mt-2 w-[400px] rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/50"
                    >
                      <div className="grid gap-1">
                        {menuItems.map((item, idx) => (
                          <motion.a
                            key={idx}
                            href="#"
                            className="group flex items-center gap-4 rounded-2xl p-3 transition-all hover:bg-slate-50"
                            whileHover={{ x: 5 }}
                          >
                            <IconWrapper color={item.color}>
                              {item.icon}
                            </IconWrapper>
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.desc}
                              </p>
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      <div className="mt-2 rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Next Gen
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600">
                            Explore Roadmap →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {["Templates", "Pricing", "Docs"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden text-sm font-bold text-slate-600 transition-all hover:text-slate-900 md:block px-4">
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-indigo-600 hover:shadow-indigo-200"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className={scrolled ? "h-16" : "h-20"} />
    </>
  );
}
