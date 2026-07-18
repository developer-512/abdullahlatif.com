"use client";

import {
  Server,
  Monitor,
  Smartphone,
  Lightbulb,
  Database,
  Cloud,
} from "lucide-react";
import type { Service } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Custom API & Backend Architecture",
    icon_name: "server",
    color: "emerald",
    description:
      "Design and build high-throughput RESTful and GraphQL APIs, microservices architectures, and event-driven backends capable of handling millions of requests with sub-100ms latency.",
    technologies: ["Node.js", "Go", "FastAPI", "GraphQL", "Redis", "Docker"],
    sort_order: 1,
  },
  {
    id: "2",
    title: "Full-Stack Web Development",
    icon_name: "monitor",
    color: "blue",
    description:
      "End-to-end development of modern, responsive web applications — from pixel-perfect frontends with server-side rendering to complex admin dashboards, SaaS platforms, and real-time collaboration tools.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
    ],
    sort_order: 2,
  },
  {
    id: "3",
    title: "Mobile App Engineering",
    icon_name: "smartphone",
    color: "purple",
    description:
      "Cross-platform mobile applications with native-grade performance, offline-first data strategies, push notification pipelines, and seamless OTA update mechanisms for iOS and Android.",
    technologies: ["React Native", "Expo", "Firebase", "SQLite", "CodePush"],
    sort_order: 3,
  },
  {
    id: "4",
    title: "AI Integration & LLM Solutions",
    icon_name: "lightbulb",
    color: "amber",
    description:
      "Custom LLM fine-tuning, RAG pipeline development, intelligent chatbots, semantic search engines, and AI-powered automation workflows that integrate directly into existing business infrastructure.",
    technologies: ["Python", "PyTorch", "LangChain", "OpenAI", "Pinecone"],
    sort_order: 4,
  },
  {
    id: "5",
    title: "ERP Integration & Middleware",
    icon_name: "database",
    color: "cyan",
    description:
      "Deep enterprise integrations with NetSuite, Infor CloudSuite, and SAP — including bi-directional data sync, custom SuiteScript development, event-driven middleware, and zero-downtime migration strategies.",
    technologies: ["NetSuite", "SuiteScript", "Infor ION", "Kafka", "RabbitMQ"],
    sort_order: 5,
  },
  {
    id: "6",
    title: "Cloud Infrastructure & DevOps",
    icon_name: "cloud",
    color: "rose",
    description:
      "End-to-end cloud architecture on AWS, GCP, and Azure — CI/CD pipeline automation, infrastructure-as-code, container orchestration, observability stacks, and cost-optimized auto-scaling strategies.",
    technologies: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Datadog",
    ],
    sort_order: 6,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  server: <Server className="w-6 h-6" />,
  monitor: <Monitor className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
};

const colorClasses: Record<
  string,
  {
    iconBg: string;
    iconBorder: string;
    iconText: string;
    hoverBorder: string;
    tagText: string;
    tagBorder: string;
  }
> = {
  emerald: {
    iconBg: "bg-emerald-950/50",
    iconBorder: "border-emerald-900/50",
    iconText: "text-emerald-400",
    hoverBorder: "hover:border-emerald-800/50",
    tagText: "text-emerald-400/80",
    tagBorder: "border-emerald-900/30",
  },
  blue: {
    iconBg: "bg-blue-950/50",
    iconBorder: "border-blue-900/50",
    iconText: "text-blue-400",
    hoverBorder: "hover:border-blue-800/50",
    tagText: "text-blue-400/80",
    tagBorder: "border-blue-900/30",
  },
  purple: {
    iconBg: "bg-purple-950/50",
    iconBorder: "border-purple-900/50",
    iconText: "text-purple-400",
    hoverBorder: "hover:border-purple-800/50",
    tagText: "text-purple-400/80",
    tagBorder: "border-purple-900/30",
  },
  amber: {
    iconBg: "bg-amber-950/50",
    iconBorder: "border-amber-900/50",
    iconText: "text-amber-400",
    hoverBorder: "hover:border-amber-800/50",
    tagText: "text-amber-400/80",
    tagBorder: "border-amber-900/30",
  },
  cyan: {
    iconBg: "bg-cyan-950/50",
    iconBorder: "border-cyan-900/50",
    iconText: "text-cyan-400",
    hoverBorder: "hover:border-cyan-800/50",
    tagText: "text-cyan-400/80",
    tagBorder: "border-cyan-900/30",
  },
  rose: {
    iconBg: "bg-rose-950/50",
    iconBorder: "border-rose-900/50",
    iconText: "text-rose-400",
    hoverBorder: "hover:border-rose-800/50",
    tagText: "text-rose-400/80",
    tagBorder: "border-rose-900/30",
  },
};

interface ServicesProps {
  services?: Service[];
}

export default function Services({ services }: ServicesProps) {
  const items = services && services.length > 0 ? services : defaultServices;

  return (
    <section className="py-16 border-b border-zinc-800/80" id="services">
      <ScrollReveal>
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          What I Deliver
        </h2>
        <p className="text-xl font-bold text-white mb-10">
          Services & Technology Stack
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((service, index) => {
            const c = colorClasses[service.color] || colorClasses.emerald;
            return (
              <ScrollReveal
                key={service.id}
                delay={(index % 2) * 100}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`group p-6 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl ${c.hoverBorder} transition-all duration-300 h-full hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 ${c.iconBg} rounded-xl ${c.iconText} border ${c.iconBorder} shrink-0 transition-transform duration-300 group-hover:scale-105`}
                    >
                      {iconMap[service.icon_name] || (
                        <Server className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-[3.5rem]">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded ${c.tagText} border ${c.tagBorder}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
      </div>
    </section>
  );
}
