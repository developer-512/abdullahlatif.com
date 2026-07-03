"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types";

const FILTERS = [
  { key: "all", label: "All Systems" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "web", label: "Web Apps" },
  { key: "mobile", label: "Mobile" },
  { key: "b2b-erp", label: "B2B / ERP" },
];

const accentHover: Record<string, string> = {
  emerald: "group-hover:text-emerald-400",
  blue: "group-hover:text-blue-400",
  purple: "group-hover:text-purple-400",
  amber: "group-hover:text-amber-400",
  cyan: "group-hover:text-cyan-400",
  rose: "group-hover:text-rose-400",
};

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) =>
          p.category
            .split(" ")
            .some((cat) => cat === activeFilter)
        );

  return (
    <section className="py-16" id="portfolio">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Architecture Showcases
          </h2>
          <p className="text-xl font-bold text-white mt-1">
            Production-Grade Implementations
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-zinc-900/90 backdrop-blur p-1.5 rounded-xl border border-zinc-800/60 sticky top-4 z-50 shadow-xl self-start">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFilter === f.key
                  ? "bg-emerald-500 text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((project) => {
            const hover = accentHover[project.color_accent] || accentHover.emerald;
            return (
              <div
                key={project.id}
                className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 group"
              >
                <div className="bg-zinc-950 border-b border-zinc-800/80 relative overflow-hidden h-48 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                  {project.screenshot_url ? (
                    <Image
                      src={project.screenshot_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="text-zinc-700 font-mono text-sm">
                      No Screenshot
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4
                        className={`text-lg font-semibold text-white ${hover} transition-colors`}
                      >
                        {project.title}
                      </h4>
                      <span className={`text-zinc-600 ${hover} transition-colors`}>
                        <ExternalLink className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {project.highlights.length > 0 && (
                      <ul className="text-xs text-zinc-500 space-y-1 mb-6 list-disc pl-4">
                        {project.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-600 font-mono text-sm py-16">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
