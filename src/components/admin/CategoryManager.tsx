"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import type { Category } from "@/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface CategoryManagerProps {
  categories: Category[];
}

export default function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const [label, setLabel] = useState("");
  const [slug, setSlug] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setLabel(cat.label);
    setSlug(cat.slug);
    setSortOrder(cat.sort_order);
    setShowNew(false);
    setError("");
  }

  function startNew() {
    setEditingId(null);
    setLabel("");
    setSlug("");
    setSortOrder(categories.length + 1);
    setShowNew(true);
    setError("");
  }

  function cancel() {
    setEditingId(null);
    setShowNew(false);
    setError("");
  }

  function handleLabelChange(val: string) {
    setLabel(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  }

  async function handleSave() {
    setError("");
    const formData = new FormData();
    formData.set("label", label);
    formData.set("slug", slug);
    formData.set("sort_order", String(sortOrder));

    startTransition(async () => {
      try {
        if (editingId) {
          await updateCategory(editingId, formData);
        } else {
          await createCategory(formData);
        }
        setEditingId(null);
        setShowNew(false);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  async function handleDelete(id: string, catLabel: string) {
    if (!confirm(`Delete category "${catLabel}"?`)) return;
    setError("");
    startTransition(async () => {
      try {
        await deleteCategory(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  const isEditing = editingId !== null || showNew;

  return (
    <div className="max-w-2xl space-y-4">
      {error && (
        <div className="bg-red-950/30 border border-red-900/40 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {categories.map((cat) =>
          editingId === cat.id ? (
            <div
              key={cat.id}
              className="flex items-center gap-3 bg-zinc-900/50 border border-emerald-900/40 rounded-xl p-4"
            >
              <input
                value={label}
                onChange={(e) => handleLabelChange(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="Label"
              />
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-40 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="slug"
              />
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-16 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button
                onClick={handleSave}
                disabled={isPending}
                className="p-2 text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={cancel}
                className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              key={cat.id}
              className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm">
                  {cat.label}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  {cat.slug}
                </span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono shrink-0">
                Order: {cat.sort_order}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(cat)}
                  disabled={isEditing}
                  className="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.label)}
                  disabled={isEditing || isPending}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {showNew && (
        <div className="flex items-center gap-3 bg-zinc-900/50 border border-emerald-900/40 rounded-xl p-4">
          <input
            value={label}
            onChange={(e) => handleLabelChange(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
            placeholder="Category label"
            autoFocus
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-40 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
            placeholder="slug"
          />
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-16 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
          <button
            onClick={handleSave}
            disabled={isPending}
            className="p-2 text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={cancel}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!showNew && !editingId && (
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      )}
    </div>
  );
}
