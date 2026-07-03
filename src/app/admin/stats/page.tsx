"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateStats } from "@/lib/actions";
import { Save, Loader2 } from "lucide-react";
import type { Stat } from "@/types";

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase
      .from("stats")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setStats(data as Stat[]);
        setLoading(false);
      });
  }, []);

  function updateField(id: string, field: keyof Stat, value: string | number) {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      await updateStats(
        stats.map((s) => ({
          id: s.id,
          value: s.value,
          label: s.label,
          suffix: s.suffix,
          detail: s.detail,
        }))
      );
      setMessage("Stats updated successfully!");
    } catch {
      setMessage("Failed to save stats");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-600">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Stats</h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            // Update counter values displayed on the public site
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 text-sm px-4 py-3 rounded-lg border ${
            message.includes("success")
              ? "bg-emerald-950/30 border-emerald-900/40 text-emerald-400"
              : "bg-red-950/30 border-red-900/40 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {stats.length === 0 ? (
        <p className="text-center py-20 text-zinc-600 font-mono text-sm">
          No stats found. Run the SQL schema to seed default stats.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-600 mb-1">
                    Label
                  </label>
                  <input
                    value={stat.label}
                    onChange={(e) => updateField(stat.id, "label", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-600 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) =>
                      updateField(stat.id, "value", Number(e.target.value))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-600 mb-1">
                    Suffix (+, %, etc.)
                  </label>
                  <input
                    value={stat.suffix}
                    onChange={(e) => updateField(stat.id, "suffix", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    placeholder="e.g. + or %"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-600 mb-1">
                    Detail
                  </label>
                  <input
                    value={stat.detail}
                    onChange={(e) => updateField(stat.id, "detail", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    placeholder="e.g. Worldwide"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
