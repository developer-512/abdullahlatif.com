-- Add multiple screenshot support for projects
-- Run in Supabase SQL Editor if you already have the projects table

alter table projects
  add column if not exists screenshot_urls text[] default '{}';

-- Migrate existing single screenshots into the array column
update projects
set screenshot_urls = array[screenshot_url]
where screenshot_url is not null
  and (screenshot_urls is null or screenshot_urls = '{}');
