-- ============================================================
-- Portfolio Database Schema for Supabase
-- Run this in the Supabase SQL Editor to set up all tables,
-- storage bucket, and seed data.
-- ============================================================

-- Projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null,
  tech_stack text[] default '{}',
  highlights text[] default '{}',
  link text,
  screenshot_url text,
  screenshot_urls text[] default '{}',
  color_accent text default 'emerald',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table projects enable row level security;
create policy "Public read access" on projects for select using (true);

-- Stats table
create table if not exists stats (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  value int not null default 0,
  suffix text default '',
  detail text default '',
  color text default 'emerald',
  sort_order int default 0
);

alter table stats enable row level security;
create policy "Public read access" on stats for select using (true);

-- Site settings (key-value pairs)
create table if not exists site_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text default ''
);

alter table site_settings enable row level security;
create policy "Public read access" on site_settings for select using (true);

-- Categories table
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  slug text unique not null,
  sort_order int default 0
);

alter table categories enable row level security;
create policy "Public read access" on categories for select using (true);

-- Services table
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  color text default 'emerald',
  icon_name text default 'server',
  technologies text[] default '{}',
  sort_order int default 0
);

alter table services enable row level security;
create policy "Public read access" on services for select using (true);

-- ============================================================
-- Storage bucket for project screenshots
-- ============================================================

insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', true)
on conflict (id) do nothing;

create policy "Public read access" on storage.objects
  for select using (bucket_id = 'screenshots');

create policy "Auth upload access" on storage.objects
  for insert with check (bucket_id = 'screenshots');

create policy "Auth update access" on storage.objects
  for update using (bucket_id = 'screenshots');

create policy "Auth delete access" on storage.objects
  for delete using (bucket_id = 'screenshots');

-- ============================================================
-- Seed default stats
-- ============================================================

insert into stats (label, value, suffix, detail, color, sort_order) values
  ('Projects Delivered', 50, '', 'Enterprise & Startup', 'emerald', 1),
  ('Happy Clients', 35, '', 'Worldwide', 'blue', 2),
  ('Years Experience', 7, '+', 'Since 2018', 'purple', 3),
  ('Client Retention', 99, '%', 'Repeat & Referral Rate', 'amber', 4);

-- ============================================================
-- Seed default site settings
-- ============================================================

insert into site_settings (key, value) values
  ('email', 'contact@abdullahlatif.com'),
  ('linkedin', 'linkedin.com/in/abdullahlatif'),
  ('location', 'Remote / Worldwide'),
  ('tagline', '// Available for Enterprise Consulting'),
  ('title', 'Full-Stack Software Architect'),
  ('bio', 'High-performance Software Architect specializing in bridging the gap between legacy corporate infrastructure and modern, intelligent web/mobile systems. Expert in architecting custom high-throughput APIs, training/integrating LLMs into live business pipelines, and designing deep enterprise syncs for <strong class="text-white font-semibold">NetSuite ERP</strong> and <strong class="text-white font-semibold">Infor CloudSuite</strong>. I build resilient, hyper-scalable systems that turn architectural complexity into clear, measurable ROI.'),
  ('cta_heading', 'Ready to optimize your architectural stack?'),
  ('cta_description', 'Let''s coordinate an introductory technical review session to assess your current engineering infrastructure, ERP pain points, or upcoming AI integrations.'),
  ('cta_button_text', 'Book Architecture Consultation');

-- ============================================================
-- Seed default categories
-- ============================================================

insert into categories (label, slug, sort_order) values
  ('AI', 'ai', 1),
  ('Laravel / PHP', 'laravel-php', 2),
  ('NextJS / React', 'nextjs-react', 3),
  ('Custom Development', 'custom-dev', 4),
  ('Mobile (Flutter Android + iOS)', 'mobile', 5),
  ('B2B-ERP', 'b2b-erp', 6),
  ('Shopify', 'shopify', 7);

-- ============================================================
-- Seed default services
-- ============================================================

insert into services (title, description, color, icon_name, technologies, sort_order) values
  ('Custom API & Backend Architecture', 'Design and build high-throughput RESTful and GraphQL APIs, microservices architectures, and event-driven backends capable of handling millions of requests with sub-100ms latency.', 'emerald', 'server', '{"Node.js","Go","FastAPI","GraphQL","Redis","Docker"}', 1),
  ('Full-Stack Web Development', 'End-to-end development of modern, responsive web applications — from pixel-perfect frontends with server-side rendering to complex admin dashboards, SaaS platforms, and real-time collaboration tools.', 'blue', 'monitor', '{"Next.js","React","TypeScript","Tailwind CSS","PostgreSQL","Prisma"}', 2),
  ('Mobile App Engineering', 'Cross-platform mobile applications with native-grade performance, offline-first data strategies, push notification pipelines, and seamless OTA update mechanisms for iOS and Android.', 'purple', 'smartphone', '{"React Native","Expo","Firebase","SQLite","CodePush"}', 3),
  ('AI Integration & LLM Solutions', 'Custom LLM fine-tuning, RAG pipeline development, intelligent chatbots, semantic search engines, and AI-powered automation workflows that integrate directly into existing business infrastructure.', 'amber', 'lightbulb', '{"Python","PyTorch","LangChain","OpenAI","Pinecone"}', 4),
  ('ERP Integration & Middleware', 'Deep enterprise integrations with NetSuite, Infor CloudSuite, and SAP — including bi-directional data sync, custom SuiteScript development, event-driven middleware, and zero-downtime migration strategies.', 'cyan', 'database', '{"NetSuite","SuiteScript","Infor ION","Kafka","RabbitMQ"}', 5),
  ('Cloud Infrastructure & DevOps', 'End-to-end cloud architecture on AWS, GCP, and Azure — CI/CD pipeline automation, infrastructure-as-code, container orchestration, observability stacks, and cost-optimized auto-scaling strategies.', 'rose', 'cloud', '{"AWS","Kubernetes","Terraform","GitHub Actions","Datadog"}', 6);
