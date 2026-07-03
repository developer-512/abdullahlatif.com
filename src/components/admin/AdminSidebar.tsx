"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800/60 min-h-screen p-6 flex flex-col shrink-0">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Site
        </Link>
        <h2 className="text-lg font-bold text-white mt-3">Admin Panel</h2>
        <p className="text-xs text-zinc-600 font-mono mt-0.5">
          Portfolio Management
        </p>
      </div>

      <nav className="space-y-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-900/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-colors mt-4"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
}
