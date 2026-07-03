import { Mail, ExternalLink, MapPin } from "lucide-react";

interface HeaderProps {
  settings: Record<string, string>;
}

export default function Header({ settings }: HeaderProps) {
  const email = settings.email || "contact@abdullahlatif.com";
  const linkedin = settings.linkedin || "linkedin.com/in/abdullahlatif";
  const location = settings.location || "Remote / Worldwide";
  const tagline = settings.tagline || "// Available for Enterprise Consulting";
  const title = settings.title || "Full-Stack Software Architect";
  const bio =
    settings.bio ||
    'High-performance Software Architect specializing in bridging the gap between legacy corporate infrastructure and modern, intelligent web/mobile systems. Expert in architecting custom high-throughput APIs, training/integrating LLMs into live business pipelines, and designing deep enterprise syncs for <strong class="text-white font-semibold">NetSuite ERP</strong> and <strong class="text-white font-semibold">Infor CloudSuite</strong>. I build resilient, hyper-scalable systems that turn architectural complexity into clear, measurable ROI.';

  return (
    <header className="border-b border-zinc-800/80 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <span className="font-mono text-emerald-400 text-sm tracking-widest uppercase block mb-2">
            {tagline}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Abdullah Latif
          </h1>
          <p className="text-xl text-zinc-400 mt-2 font-medium">{title}</p>
        </div>

        <div className="flex flex-wrap gap-3 md:flex-col md:items-end text-sm font-mono text-zinc-400">
          <a
            href={`mailto:${email}`}
            className="hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <span>{email}</span>
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <span>{linkedin}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <span className="text-zinc-500 flex items-center gap-2">
            <span>{location}</span>
            <MapPin className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="mt-8 max-w-3xl">
        <p
          className="text-zinc-300 leading-relaxed text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: bio }}
        />
      </div>
    </header>
  );
}
