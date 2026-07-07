-- Track project link clicks with visitor and geo details
-- Run in Supabase SQL Editor

create table if not exists project_link_clicks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete set null,
  project_title text,
  destination_url text not null,

  -- Request metadata
  ip_address text,
  ip_version text,
  user_agent text,
  referer text,
  referrer_domain text,
  accept_language text,

  -- Parsed client / device
  browser_name text,
  browser_version text,
  os_name text,
  os_version text,
  device_type text,
  screen_width int,
  screen_height int,
  viewport_width int,
  viewport_height int,
  client_timezone text,
  client_language text,

  -- Geo from IP lookup
  country_code text,
  country_name text,
  region text,
  city text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  geo_timezone text,
  isp text,
  org text,
  is_proxy boolean default false,
  is_hosting boolean default false,
  geo_source text,

  -- Session & campaign
  session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  clicked_at timestamptz default now()
);

create index if not exists idx_project_link_clicks_project_id
  on project_link_clicks(project_id);

create index if not exists idx_project_link_clicks_clicked_at
  on project_link_clicks(clicked_at desc);

alter table project_link_clicks enable row level security;

-- No public policies: inserts/reads go through the API using the service role key.
