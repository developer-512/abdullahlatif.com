"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function Footer() {
  return (
    <ScrollReveal>
      <footer className="mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
        <div>
          &copy; {new Date().getFullYear()} Abdullah Latif. All Architectural
          Rights Reserved.
        </div>
        <div className="flex gap-4">
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </ScrollReveal>
  );
}
