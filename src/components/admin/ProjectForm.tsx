"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { Upload, X, Save } from "lucide-react";
import Image from "next/image";
import type { Project, Category } from "@/types";

const COLORS = ["emerald", "blue", "purple", "amber", "cyan", "rose"];

interface ProjectFormProps {
  project?: Project;
  categories: Category[];
}

export default function ProjectForm({ project, categories }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(
    project?.screenshot_url || null
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-950/30 border border-red-900/40 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Project Title *
        </label>
        <input
          name="title"
          required
          defaultValue={project?.title}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          placeholder="e.g. Cognitive ERP Layer for NetSuite"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Description *
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
          placeholder="Brief description of the project..."
        />
      </div>

      {/* Category + Color */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5">
            Category *
          </label>
          <select
            name="category"
            required
            defaultValue={project?.category || ""}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5">
            Accent Color
          </label>
          <select
            name="color_accent"
            defaultValue={project?.color_accent || "emerald"}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Link */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Project Link
        </label>
        <input
          name="link"
          type="url"
          defaultValue={project?.link || ""}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          placeholder="e.g. https://example.com"
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Tech Stack (comma separated) *
        </label>
        <input
          name="tech_stack"
          required
          defaultValue={project?.tech_stack.join(", ")}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          placeholder="e.g. Python, NetSuite API, LlamaIndex"
        />
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Key Highlights (one per line)
        </label>
        <textarea
          name="highlights"
          rows={3}
          defaultValue={project?.highlights.join("\n")}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
          placeholder={"Reduces query time from 3 days to 4 seconds.\nStrict data sandboxing."}
        />
      </div>

      {/* Sort Order */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Sort Order
        </label>
        <input
          name="sort_order"
          type="number"
          defaultValue={project?.sort_order || 0}
          className="w-32 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      {/* Screenshot Upload */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Screenshot
        </label>
        <div className="border border-dashed border-zinc-800 rounded-xl p-4">
          {preview ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  const input = document.querySelector(
                    'input[name="screenshot"]'
                  ) as HTMLInputElement;
                  if (input) input.value = "";
                }}
                className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-red-500/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : null}
          <label className="flex items-center justify-center gap-2 cursor-pointer py-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            <Upload className="w-4 h-4" />
            <span>{preview ? "Change image" : "Upload screenshot"}</span>
            <input
              name="screenshot"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading
            ? "Saving..."
            : project
            ? "Update Project"
            : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
