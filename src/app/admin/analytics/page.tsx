import { getAdminClient } from "@/lib/supabase";
import type { ProjectLinkClick } from "@/types";
import { MousePointerClick, Globe, Monitor } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function locationLabel(click: ProjectLinkClick) {
  const parts = [click.city, click.region, click.country_name || click.country_code]
    .filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Unknown";
}

export default async function AnalyticsPage() {
  const sb = getAdminClient();
  const { data: clicks } = await sb
    .from("project_link_clicks")
    .select("*")
    .order("clicked_at", { ascending: false })
    .limit(200);

  const rows = (clicks as ProjectLinkClick[] | null) || [];

  const totalClicks = rows.length;
  const uniqueCountries = new Set(
    rows.map((c) => c.country_code).filter(Boolean)
  ).size;
  const uniqueSessions = new Set(
    rows.map((c) => c.session_id).filter(Boolean)
  ).size;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Link Analytics</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // Project link click tracking (last 200 events)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <MousePointerClick className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Clicks</span>
          </div>
          <div className="text-3xl font-bold text-white">{totalClicks}</div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Countries</span>
          </div>
          <div className="text-3xl font-bold text-white">{uniqueCountries}</div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Monitor className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Sessions</span>
          </div>
          <div className="text-3xl font-bold text-white">{uniqueSessions}</div>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 text-zinc-600 font-mono text-sm border border-dashed border-zinc-800 rounded-xl">
          No clicks recorded yet. Clicks appear when visitors open a project link.
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800/60 rounded-xl">
          <table className="w-full text-sm text-left min-w-[1100px]">
            <thead className="bg-zinc-950/80 text-zinc-500 font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Browser / OS</th>
                <th className="px-4 py-3">Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {rows.map((click) => (
                <tr
                  key={click.id}
                  className="hover:bg-zinc-900/40 transition-colors"
                >
                  <td className="px-4 py-3 text-zinc-400 whitespace-nowrap font-mono text-xs">
                    {formatDate(click.clicked_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">
                      {click.project_title || "—"}
                    </div>
                    <div className="text-[11px] text-zinc-600 truncate max-w-[180px]">
                      {click.destination_url}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    <div>{locationLabel(click)}</div>
                    {click.geo_timezone && (
                      <div className="text-[11px] text-zinc-600">
                        {click.geo_timezone}
                      </div>
                    )}
                    {click.isp && (
                      <div className="text-[11px] text-zinc-600 truncate max-w-[160px]">
                        {click.isp}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                    {click.ip_address || "—"}
                    {click.is_proxy && (
                      <span className="ml-1 text-amber-500">VPN</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">
                    <div>{click.device_type || "—"}</div>
                    {click.viewport_width && click.viewport_height && (
                      <div className="text-zinc-600">
                        {click.viewport_width}×{click.viewport_height}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">
                    <div>
                      {click.browser_name} {click.browser_version}
                    </div>
                    <div className="text-zinc-600">
                      {click.os_name} {click.os_version}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs truncate max-w-[140px]">
                    {click.referrer_domain || "direct"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
