"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { Upload, X, Save } from "lucide-react";
import Image from "next/image";
import type { Project, Category } from "@/types";
import { getProjectImages, getProjectCategories } from "@/types";

const COLORS = ["emerald", "blue", "purple", "amber", "cyan", "rose"];

interface ProjectFormProps {
  project?: Project;
  categories: Category[];
}

export default function ProjectForm({ project, categories }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>(
    project ? getProjectImages(project) : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    project ? getProjectCategories(project) : []
  );
  const [newPreviews, setNewPreviews] = useState<
    { id: string; url: string; file: File }[]
  >([]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setNewPreviews((prev) => [...prev, ...previews]);
    e.target.value = "";
  }

  function removeExistingImage(url: string) {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  }

  function removeNewPreview(id: string) {
    setNewPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (selectedCategories.length === 0) {
      setError("Select at least one category");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      formData.delete("categories");
      selectedCategories.forEach((slug) => formData.append("categories", slug));
      formData.set("existing_images", JSON.stringify(existingImages));
      newPreviews.forEach((preview) => {
        formData.append("screenshots", preview.file);
      });

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

  const allPreviews = [
    ...existingImages.map((url) => ({ id: url, url, existing: true })),
    ...newPreviews.map((p) => ({ id: p.id, url: p.url, existing: false })),
  ];

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

      {/* Categories + Color */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5">
            Categories *
          </label>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="text-xs text-zinc-600">No categories available.</p>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 cursor-pointer text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/50"
                  />
                  {cat.label}
                </label>
              ))
            )}
          </div>
          <p className="text-[11px] text-zinc-600 font-mono mt-1.5">
            Project appears in every selected category on the portfolio.
          </p>
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

      {/* Screenshots Upload */}
      <div>
        <label className="block text-xs font-mono text-zinc-500 mb-1.5">
          Screenshots
        </label>
        <div className="border border-dashed border-zinc-800 rounded-xl p-4">
          {allPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {allPreviews.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.url}
                    alt="Screenshot preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      item.existing
                        ? removeExistingImage(item.url)
                        : removeNewPreview(item.id)
                    }
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center gap-2 cursor-pointer py-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            <Upload className="w-4 h-4" />
            <span>
              {allPreviews.length > 0
                ? "Add more images"
                : "Upload screenshots"}
            </span>
            <input
              name="screenshots"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-[11px] text-zinc-600 font-mono mt-1.5">
          Multiple images supported — they appear as a slider on the portfolio.
        </p>
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
