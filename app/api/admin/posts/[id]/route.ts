import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const formData = await request.formData();

  const title = formData.get("title");
  const category = formData.get("category");
  const location = formData.get("location");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const published = formData.get("published") === "true";
  const image = formData.get("image");

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (typeof excerpt !== "string" || !excerpt.trim()) {
    return NextResponse.json({ error: "Excerpt is required." }, { status: 400 });
  }

  const supabase = getAdminSupabase();

  const { data: existingPost, error: fetchError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existingPost) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const update: Record<string, unknown> = {
    title: title.trim(),
    category: typeof category === "string" && category.trim() ? category.trim() : null,
    location: typeof location === "string" && location.trim() ? location.trim() : null,
    excerpt: excerpt.trim(),
    content: typeof content === "string" && content.trim() ? content.trim() : null,
    published,
    updated_at: new Date().toISOString(),
  };

  if (title.trim() !== existingPost.title) {
    const baseSlug = slugify(title) || "post";
    let slug = baseSlug;
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: existing } = await supabase.from("posts").select("id").eq("slug", slug).neq("id", id).maybeSingle();
      if (!existing) break;
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }
    update.slug = slug;
  }

  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop() || "jpg";
    const path = `${existingPost.type}/${(update.slug as string) || existingPost.slug}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, image, { contentType: image.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: `Image upload failed: ${uploadError.message}` }, { status: 500 });
    }
    const { data: publicUrlData } = supabase.storage.from("post-images").getPublicUrl(path);
    update.image_url = publicUrlData.publicUrl;
  }

  const { data: updated, error: updateError } = await supabase
    .from("posts")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ post: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
