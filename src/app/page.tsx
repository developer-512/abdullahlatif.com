import { supabase } from "@/lib/supabase";
import type { Project, Stat, SiteSetting, Service, Category } from "@/types";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import StatsCounter from "@/components/StatsCounter";
import ProjectGrid from "@/components/ProjectGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import CursorGlow from "@/components/CursorGlow";

export const dynamic = "force-dynamic";

async function getData() {
  const [projectsRes, statsRes, settingsRes, servicesRes, categoriesRes] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("stats").select("*").order("sort_order"),
    supabase.from("site_settings").select("*"),
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  const settings: Record<string, string> = {};
  (settingsRes.data as SiteSetting[] | null)?.forEach((s) => {
    settings[s.key] = s.value;
  });

  return {
    projects: (projectsRes.data as Project[] | null) || [],
    stats: (statsRes.data as Stat[] | null) || [],
    settings,
    services: (servicesRes.data as Service[] | null) || [],
    categories: (categoriesRes.data as Category[] | null) || [],
  };
}

export default async function HomePage() {
  const { projects, stats, settings, services, categories } = await getData();

  return (
    <>
      <BackgroundEffects />
      <CursorGlow />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        <Header settings={settings} />
        <Skills />
        <Services services={services} />
        <StatsCounter stats={stats} />
        <ProjectGrid projects={projects} categories={categories} />
        <CTA settings={settings} />
        <Footer />
      </div>
    </>
  );
}
