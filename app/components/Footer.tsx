"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { name: "Flowcharts", href: "#" },
      { name: "Mind Maps", href: "#" },
      { name: "Mermaid Editor", href: "#" },
      { name: "Data Visualizer", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Templates", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#", badge: "Hiring" },
      { name: "Privacy", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-slate-100 bg-white pt-20 pb-10 overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-indigo-50/50 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* --- BRAND COLUMN --- */}
          <div className="lg:col-span-4 space-y-8">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              The professional canvas for technical minds. Transform complex
              logic into stunning visuals with a single click.
            </p>

            {/* Social Grid */}
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-indigo-600 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600"
                      >
                        {link.name}
                        {link.badge && (
                          <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-600">
                            {link.badge}
                          </span>
                        )}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* --- NEWSLETTER CARD --- */}
          <div className="lg:col-span-3">
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl shadow-indigo-200/50">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <h4 className="mb-2 text-lg font-bold tracking-tight">
                Stay updated
              </h4>
              <p className="mb-6 text-xs text-slate-400 leading-relaxed">
                Get the latest templates and feature updates directly in your
                inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm outline-none ring-1 ring-white/20 focus:ring-indigo-500 transition-all"
                />
                <button className="w-full rounded-xl bg-white py-3 text-sm font-bold text-slate-950 transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-95">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
