"use client";

import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface CTAProps {
  settings: Record<string, string>;
}

export default function CTA({ settings }: CTAProps) {
  const heading =
    settings.cta_heading || "Ready to optimize your architectural stack?";
  const description =
    settings.cta_description ||
    "Let's coordinate an introductory technical review session to assess your current engineering infrastructure, ERP pain points, or upcoming AI integrations.";
  const buttonText =
    settings.cta_button_text || "Book Architecture Consultation";
  const email = settings.email || "contact@abdullahlatif.com";

  return (
    <ScrollReveal>
      <section className="py-12 mt-12 bg-gradient-to-r from-zinc-900 via-neutral-950 to-zinc-900 rounded-3xl border border-zinc-800/60 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none blur-3xl" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {heading}
          </h3>
          <p className="text-sm text-zinc-400 mt-2 mb-6">{description}</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-emerald-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_28px_rgba(16,185,129,0.2)]"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
