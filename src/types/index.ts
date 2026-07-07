export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech_stack: string[];
  highlights: string[];
  link: string | null;
  screenshot_url: string | null;
  screenshot_urls?: string[];
  color_accent: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Returns all image URLs for a project (supports legacy single-image field). */
export function getProjectImages(project: Project): string[] {
  if (project.screenshot_urls?.length) return project.screenshot_urls;
  if (project.screenshot_url) return [project.screenshot_url];
  return [];
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  sort_order: number;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  detail: string;
  color: string;
  sort_order: number;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
  icon_name: string;
  technologies: string[];
  sort_order: number;
}

export interface ProjectLinkClick {
  id: string;
  project_id: string | null;
  project_title: string | null;
  destination_url: string;
  ip_address: string | null;
  ip_version: string | null;
  user_agent: string | null;
  referer: string | null;
  referrer_domain: string | null;
  accept_language: string | null;
  browser_name: string | null;
  browser_version: string | null;
  os_name: string | null;
  os_version: string | null;
  device_type: string | null;
  screen_width: number | null;
  screen_height: number | null;
  viewport_width: number | null;
  viewport_height: number | null;
  client_timezone: string | null;
  client_language: string | null;
  country_code: string | null;
  country_name: string | null;
  region: string | null;
  city: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  geo_timezone: string | null;
  isp: string | null;
  org: string | null;
  is_proxy: boolean | null;
  is_hosting: boolean | null;
  geo_source: string | null;
  session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  clicked_at: string;
}

export const SETTING_KEYS = {
  EMAIL: "email",
  LINKEDIN: "linkedin",
  LOCATION: "location",
  TAGLINE: "tagline",
  TITLE: "title",
  BIO: "bio",
  CTA_HEADING: "cta_heading",
  CTA_DESCRIPTION: "cta_description",
  CTA_BUTTON_TEXT: "cta_button_text",
} as const;
