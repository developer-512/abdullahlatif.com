export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech_stack: string[];
  highlights: string[];
  link: string | null;
  screenshot_url: string | null;
  color_accent: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
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
