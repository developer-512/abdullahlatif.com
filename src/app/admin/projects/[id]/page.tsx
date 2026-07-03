import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // {(project as Project).title}
        </p>
      </div>
      <ProjectForm project={project as Project} />
    </div>
  );
}
