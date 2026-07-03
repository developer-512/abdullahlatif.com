import { supabase } from "@/lib/supabase";
import { FolderKanban, BarChart3, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projectsRes, statsRes, settingsRes] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("stats").select("id", { count: "exact" }),
    supabase.from("site_settings").select("id", { count: "exact" }),
  ]);

  const cards = [
    {
      label: "Projects",
      count: projectsRes.count ?? 0,
      href: "/admin/projects",
      icon: FolderKanban,
      color: "emerald",
    },
    {
      label: "Stats",
      count: statsRes.count ?? 0,
      href: "/admin/stats",
      icon: BarChart3,
      color: "blue",
    },
    {
      label: "Settings",
      count: settingsRes.count ?? 0,
      href: "/admin/settings",
      icon: Settings,
      color: "purple",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "border-emerald-900/40 bg-emerald-950/20 text-emerald-400",
    blue: "border-blue-900/40 bg-blue-950/20 text-blue-400",
    purple: "border-purple-900/40 bg-purple-950/20 text-purple-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // Portfolio administration overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl border ${colorMap[card.color]}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-white">{card.count}</div>
            <div className="text-sm text-zinc-400 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
