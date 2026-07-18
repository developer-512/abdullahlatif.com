"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";

const defaultStats: Stat[] = [
  { id: "1", label: "Projects Delivered", value: 50, suffix: "", detail: "Enterprise & Startup", color: "emerald", sort_order: 1 },
  { id: "2", label: "Happy Clients", value: 35, suffix: "", detail: "Worldwide", color: "blue", sort_order: 2 },
  { id: "3", label: "Years Experience", value: 7, suffix: "+", detail: "Since 2018", color: "purple", sort_order: 3 },
  { id: "4", label: "Client Retention", value: 99, suffix: "%", detail: "Repeat & Referral Rate", color: "amber", sort_order: 4 },
];

const barColors: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
};

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

interface StatsCounterProps {
  stats?: Stat[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-16 border-b border-zinc-800/80">
      <ScrollReveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900/60 via-zinc-950 to-zinc-900/60 border border-zinc-800/60 rounded-3xl p-10 md:p-14">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-2 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Impact In Numbers
            </h2>
            <p className="text-xl font-bold text-white">
              Delivering Measurable Results, Consistently
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {items
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((stat, index) => (
                <ScrollReveal key={stat.id} delay={index * 80} direction="up">
                  <div className="text-center group">
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        <AnimatedNumber target={stat.value} />
                      </span>
                      {stat.suffix && (
                        <span className="text-xl font-bold text-emerald-400">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-10 h-0.5 ${barColors[stat.color] || "bg-emerald-500"} mx-auto mt-3 mb-2 rounded-full group-hover:w-16 transition-all duration-500`}
                    />
                    <p className="text-sm text-zinc-400 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">
                      {stat.detail}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
