-- Migrate projects from single category to multiple categories array
ALTER TABLE projects ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}';

UPDATE projects
SET categories = ARRAY[category]
WHERE category IS NOT NULL
  AND (categories IS NULL OR categories = '{}');

ALTER TABLE projects DROP COLUMN IF EXISTS category;
