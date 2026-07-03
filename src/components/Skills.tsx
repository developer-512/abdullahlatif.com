import { Server, Lightbulb, Code2 } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      icon: <Server className="w-5 h-5" />,
      title: "Enterprise & ERP Sync",
      description:
        "Designing high-throughput middleware for real-time transactional syncing with strict zero-data-drift parameters.",
      skills: [
        { name: "NetSuite & Infor", level: 95, label: "Expert" },
        { name: "Distributed Message Brokers", level: 90, label: "90%" },
      ],
      color: "emerald",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Applied AI & ML Pipelines",
      description:
        "Fine-tuning LLMs, semantic vector vectorization, secure guardrailing, and private data context processing.",
      skills: [
        { name: "LLM Fine-Tuning & RAG", level: 88, label: "Advanced" },
        { name: "Data Engineering (PyTorch/Ray)", level: 85, label: "85%" },
      ],
      color: "blue",
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Full-Stack Web & Mobile",
      description:
        "Building cloud-native frameworks, multi-platform runtime environments, and highly secure micro-frontends.",
      skills: [
        { name: "Next.js / Node / Go", level: 96, label: "Elite" },
        { name: "React Native Engine", level: 92, label: "92%" },
      ],
      color: "purple",
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; bar: string; barFade: string }> = {
    emerald: { bg: "bg-emerald-950/50", border: "border-emerald-900/50", text: "text-emerald-400", bar: "bg-emerald-500", barFade: "bg-emerald-500/80" },
    blue: { bg: "bg-blue-950/50", border: "border-blue-900/50", text: "text-blue-400", bar: "bg-blue-500", barFade: "bg-blue-500/80" },
    purple: { bg: "bg-purple-950/50", border: "border-purple-900/50", text: "text-purple-400", bar: "bg-purple-500", barFade: "bg-purple-500/80" },
  };

  return (
    <section className="py-16 border-b border-zinc-800/80">
      <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        Architectural Core Competencies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const c = colorMap[cat.color];
          return (
            <div
              key={cat.title}
              className="p-6 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 ${c.bg} rounded-lg ${c.text} ${c.border} border`}>
                  {cat.icon}
                </div>
                <h3 className="text-white font-semibold text-base">{cat.title}</h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                {cat.description}
              </p>
              <div className="space-y-2">
                {cat.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className={`flex justify-between text-xs font-mono mb-1 ${i > 0 ? "pt-2" : ""}`}>
                      <span className="text-zinc-400">{skill.name}</span>
                      <span className={c.text}>{skill.label}</span>
                    </div>
                    <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${i === 0 ? c.bar : c.barFade} h-full`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
