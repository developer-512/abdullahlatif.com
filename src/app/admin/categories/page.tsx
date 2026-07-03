import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";
import CategoryManager from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // Manage project categories
        </p>
      </div>
      <CategoryManager
        categories={(categories as Category[] | null) || []}
      />
    </div>
  );
}
