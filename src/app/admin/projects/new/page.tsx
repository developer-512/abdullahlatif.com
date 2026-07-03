import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="text-sm text-zinc-500 font-mono mt-1">
          // Add a new portfolio showcase
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
