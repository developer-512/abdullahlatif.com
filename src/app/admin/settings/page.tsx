"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateSettings } from "@/lib/actions";
import { Save, Loader2 } from "lucide-react";
import { SETTING_KEYS } from "@/types";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
}

const FIELDS: FieldConfig[] = [
  { key: SETTING_KEYS.EMAIL, label: "Contact Email", type: "text", placeholder: "contact@abdullahlatif.com" },
  { key: SETTING_KEYS.LINKEDIN, label: "LinkedIn URL", type: "text", placeholder: "linkedin.com/in/abdullahlatif" },
  { key: SETTING_KEYS.LOCATION, label: "Location", type: "text", placeholder: "Remote / Worldwide" },
  { key: SETTING_KEYS.TAGLINE, label: "Header Tagline", type: "text", placeholder: "// Available for Enterprise Consulting" },
  { key: SETTING_KEYS.TITLE, label: "Professional Title", type: "text", placeholder: "Full-Stack Software Architect" },
  { key: SETTING_KEYS.BIO, label: "Bio / Executive Summary (HTML allowed)", type: "textarea", placeholder: "High-performance Software Architect..." },
  { key: SETTING_KEYS.CTA_HEADING, label: "CTA Heading", type: "text", placeholder: "Ready to optimize your architectural stack?" },
  { key: SETTING_KEYS.CTA_DESCRIPTION, label: "CTA Description", type: "textarea", placeholder: "Let's coordinate an introductory technical review..." },
  { key: SETTING_KEYS.CTA_BUTTON_TEXT, label: "CTA Button Text", type: "text", placeholder: "Book Architecture Consultation" },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach((row: { key: string; value: string }) => {
          map[row.key] = row.value;
        });
        setValues(map);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const settings = Object.entries(values).map(([key, value]) => ({
        key,
        value,
      }));
      await updateSettings(settings);
      setMessage("Settings saved successfully!");
    } catch {
      setMessage("Failed to save settings");
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
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            // Update contact info, bio, and CTA text
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
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

      <div className="max-w-2xl space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                rows={4}
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                placeholder={field.placeholder}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
              />
            ) : (
              <input
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                placeholder={field.placeholder}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
