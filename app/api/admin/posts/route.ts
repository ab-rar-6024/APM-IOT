import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";

export async function GET() {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const type = formData.get("type");
  const title = formData.get("title");
  const category = formData.get("category");
  const location = formData.get("location");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const published = formData.get("published") === "true";
  const image = formData.get("image");

  if (type !== "blog" && type !== "news") {
    return NextResponse.json({ error: "type must be 'blog' or 'news'." }, { status: 400 });
  }
  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (typeof excerpt !== "string" || !excerpt.trim()) {
    return NextResponse.json({ error: "Excerpt is required." }, { status: 400 });
  }
  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "An image is required." }, { status: 400 });
  }

  const supabase = getAdminSupabase();

  const baseSlug = slugify(title) || "post";
  let slug = baseSlug;
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: existing } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const ext = image.name.split(".").pop() || "jpg";
  const path = `${type}/${slug}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(path, image, { contentType: image.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: `Image upload failed: ${uploadError.message}` }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage.from("post-images").getPublicUrl(path);

  const { data: inserted, error: insertError } = await supabase
    .from("posts")
    .insert({
      type,
      title: title.trim(),
      slug,
      category: typeof category === "string" && category.trim() ? category.trim() : null,
      location: typeof location === "string" && location.trim() ? location.trim() : null,
      excerpt: excerpt.trim(),
      content: typeof content === "string" && content.trim() ? content.trim() : null,
      image_url: publicUrlData.publicUrl,
      published,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ post: inserted }, { status: 201 });
}
