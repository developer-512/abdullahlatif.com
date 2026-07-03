import { supabase } from "@/lib/supabase";
import type { Project } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import DeleteProjectButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-zinc-500 font-mono mt-1">
            // Manage portfolio showcases
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      {(!projects || projects.length === 0) ? (
        <div className="text-center py-20 text-zinc-600 font-mono text-sm">
          No projects yet. Add your first project.
        </div>
      ) : (
        <div className="space-y-3">
          {(projects as Project[]).map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="w-16 h-16 bg-zinc-950 rounded-lg overflow-hidden shrink-0 relative">
                {project.screenshot_url ? (
                  <Image
                    src={project.screenshot_url}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs font-mono">
                    N/A
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 rounded text-zinc-500">
                    {project.category}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    Order: {project.sort_order}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
