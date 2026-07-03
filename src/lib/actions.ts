"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getAdminClient } from "./supabase";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return session;
}

// ─── Projects ───

export async function createProject(formData: FormData) {
  await requireAuth();
  const sb = getAdminClient();

  let screenshotUrl: string | null = null;
  const file = formData.get("screenshot") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error: uploadError } = await sb.storage
      .from("screenshots")
      .upload(fileName, file, { contentType: file.type, upsert: true });
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = sb.storage
      .from("screenshots")
      .getPublicUrl(fileName);
    screenshotUrl = urlData.publicUrl;
  }

  const techStack = (formData.get("tech_stack") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const highlights = (formData.get("highlights") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await sb.from("projects").insert({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    tech_stack: techStack,
    highlights,
    link: (formData.get("link") as string) || null,
    screenshot_url: screenshotUrl,
    color_accent: formData.get("color_accent") || "emerald",
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const sb = getAdminClient();

  const updates: Record<string, unknown> = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    tech_stack: (formData.get("tech_stack") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    highlights: (formData.get("highlights") as string)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    link: (formData.get("link") as string) || null,
    color_accent: formData.get("color_accent") || "emerald",
    sort_order: Number(formData.get("sort_order")) || 0,
    updated_at: new Date().toISOString(),
  };

  const file = formData.get("screenshot") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error: uploadError } = await sb.storage
      .from("screenshots")
      .upload(fileName, file, { contentType: file.type, upsert: true });
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = sb.storage
      .from("screenshots")
      .getPublicUrl(fileName);
    updates.screenshot_url = urlData.publicUrl;
  }

  const { error } = await sb.from("projects").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();
  const sb = getAdminClient();
  const { error } = await sb.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ─── Stats ───

export async function updateStats(stats: { id: string; value: number; label: string; suffix: string; detail: string }[]) {
  await requireAuth();
  const sb = getAdminClient();

  for (const stat of stats) {
    const { error } = await sb
      .from("stats")
      .update({ value: stat.value, label: stat.label, suffix: stat.suffix, detail: stat.detail })
      .eq("id", stat.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/");
  revalidatePath("/admin/stats");
}

// ─── Settings ───

export async function updateSettings(settings: { key: string; value: string }[]) {
  await requireAuth();
  const sb = getAdminClient();

  for (const setting of settings) {
    const { error } = await sb
      .from("site_settings")
      .upsert({ key: setting.key, value: setting.value }, { onConflict: "key" });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
