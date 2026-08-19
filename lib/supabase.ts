import { createClient } from "@supabase/supabase-js";

export interface Post {
  id: string;
  type: "blog" | "news";
  title: string;
  slug: string;
  category: string | null;
  location: string | null;
  excerpt: string;
  content: string | null;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Public, read-only client — safe to use in Server Components for the public /blogs and /news pages. */
export function getPublicSupabase() {
  if (!supabaseUrl || !anonKey) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false },
  });
}

/** Full-access client for server-only code (API routes under app/api/admin/**). Never import this from a Client Component. */
export function getAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
