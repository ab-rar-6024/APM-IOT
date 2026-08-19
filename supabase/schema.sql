-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Creates the posts table that backs both /blogs and /news, plus the public
-- read policy. Writes only ever happen from server-side API routes using the
-- service_role key, so no "insert/update/delete" policies are needed here.

create extension if not exists pgcrypto;

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('blog', 'news')),
  title text not null,
  slug text not null unique,
  category text,
  location text,
  excerpt text not null,
  content text,
  image_url text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_type_published_idx on posts (type, published, created_at desc);

alter table posts enable row level security;

create policy "Public can read published posts"
  on posts for select
  using (published = true);
