"use client";

import { Mail, ExternalLink, MapPin, ArrowRight, ArrowDown } from "lucide-react";

interface HeaderProps {
  settings: Record<string, string>;
}

const highlights = [
  "NetSuite ERP",
  "Infor CloudSuite",
  "LLM / RAG Pipelines",
  "Next.js & React Native",
];

export default function Header({ settings }: HeaderProps) {
  const email = settings.email || "contact@abdullahlatif.com";
  const linkedin = settings.linkedin || "linkedin.com/in/abdullahlatif";
  const location = settings.location || "Remote / Worldwide";
  const tagline = settings.tagline || "// Available for Enterprise Consulting";
  const title = settings.title || "Full-Stack Software Architect";
  const bio =
    settings.bio ||
    'High-performance Software Architect specializing in bridging the gap between legacy corporate infrastructure and modern, intelligent web/mobile systems. Expert in architecting custom high-throughput APIs, training/integrating LLMs into live business pipelines, and designing deep enterprise syncs for <strong class="text-white font-semibold">NetSuite ERP</strong> and <strong class="text-white font-semibold">Infor CloudSuite</strong>. I build resilient, hyper-scalable systems that turn architectural complexity into clear, measurable ROI.';

  return (
    <header className="relative border-b border-zinc-800/80 pb-16 mb-4 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-emerald-500/[0.07] blur-[100px] animate-hero-in"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-10 right-0 w-[280px] h-[280px] rounded-full bg-cyan-500/[0.04] blur-[90px] animate-hero-in hero-delay-2"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <div className="max-w-2xl">
            <div className="animate-hero-up hero-delay-1 inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 rounded-full border border-emerald-900/50 bg-emerald-950/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-status-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-emerald-400 text-xs tracking-widest uppercase">
                {tagline.replace(/^\/\/\s*/, "")}
              </span>
            </div>

            <h1 className="animate-hero-up hero-delay-2 text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05]">
              Abdullah{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Latif
              </span>
            </h1>

            <p className="animate-hero-up hero-delay-3 text-xl md:text-2xl text-zinc-300 mt-4 font-medium tracking-tight">
              {title}
            </p>
            <p className="animate-hero-up hero-delay-4 text-sm md:text-base text-zinc-500 mt-2 max-w-xl">
              Bridging legacy enterprise systems with modern AI, APIs, and
              cloud-native products that deliver measurable ROI.
            </p>
          </div>

          <div className="animate-hero-up hero-delay-3 flex flex-wrap gap-3 lg:flex-col lg:items-end text-sm font-mono text-zinc-400 shrink-0">
            <a
              href={`mailto:${email}`}
              className="group hover:text-emerald-400 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/40"
            >
              <span>{email}</span>
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:text-emerald-400 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/40"
            >
              <span>{linkedin}</span>
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <span className="text-zinc-500 flex items-center gap-2 px-3 py-2">
              <span>{location}</span>
              <MapPin className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="animate-hero-up hero-delay-5 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl text-sm hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_32px_rgba(16,185,129,0.25)]"
          >
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 font-medium rounded-xl text-sm hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all duration-300"
          >
            View Work
          </a>
        </div>

        <div className="animate-hero-up hero-delay-6 mt-8 flex flex-wrap gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-950/80 text-zinc-400 hover:text-emerald-400 hover:border-emerald-900/50 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="animate-hero-up hero-delay-7 mt-10 max-w-3xl">
          <p
            className="text-zinc-400 leading-relaxed text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>

        <a
          href="#competencies"
          className="animate-hero-in hero-delay-7 mt-14 hidden md:inline-flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-emerald-400 transition-colors"
        >
          <span className="animate-scroll-bounce inline-flex">
            <ArrowDown className="w-3.5 h-3.5" />
          </span>
          Scroll to explore
        </a>
      </div>
    </header>
  );
}
