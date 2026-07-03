# Abdullah Latif — Portfolio

Next.js 15 portfolio site with Supabase backend and a protected admin panel for managing projects, stats, and site content.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (project screenshots)
- **Auth**: NextAuth.js v4 (Credentials provider)
- **Icons**: Lucide React

## Setup

### 1. Install dependencies

```bash
cd portfolio
npm install
```

### 2. Create Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the database schema

Open the **SQL Editor** in your Supabase dashboard and paste the contents of `supabase/schema.sql`. This creates all tables, storage bucket, RLS policies, and seeds default data.

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials and admin login:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `NEXTAUTH_SECRET` | Random string for JWT signing (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

### 5. Run the dev server

```bash
npm run dev
```

## Pages

| Route | Description |
|---|---|
| `/` | Public portfolio page |
| `/login` | Admin login |
| `/admin` | Dashboard (auth-protected) |
| `/admin/projects` | Manage projects (CRUD + image upload) |
| `/admin/projects/new` | Add new project |
| `/admin/projects/[id]` | Edit existing project |
| `/admin/stats` | Edit counter values |
| `/admin/settings` | Edit contact info, bio, CTA text |
