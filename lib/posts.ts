import { getPublicSupabase, type Post } from "@/lib/supabase";

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function estimateReadTime(text: string | null): string {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function getPublishedPosts(type: "blog" | "news"): Promise<Post[]> {
  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("type", type)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Failed to load ${type} posts:`, error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    // Supabase not configured yet — show an empty list instead of crashing the page.
    console.error(`Failed to load ${type} posts:`, err instanceof Error ? err.message : err);
    return [];
  }
}

export async function getPublishedPostBySlug(type: "blog" | "news", slug: string): Promise<Post | null> {
  try {
    const supabase = getPublicSupabase();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("type", type)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}
