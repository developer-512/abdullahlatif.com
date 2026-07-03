import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project, Category } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ data: project }, { data: categories }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // {(project as Project).title}
        </p>
      </div>
      <ProjectForm
        project={project as Project}
        categories={(categories as Category[] | null) || []}
      />
    </div>
  );
}
