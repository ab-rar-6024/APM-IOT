"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Post } from "@/lib/supabase";

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [type, setType] = useState<"blog" | "news">(post?.type || "blog");
  const [title, setTitle] = useState(post?.title || "");
  const [category, setCategory] = useState(post?.category || "");
  const [location, setLocation] = useState(post?.location || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.image_url || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.set("type", type);
    formData.set("title", title);
    formData.set("category", category);
    formData.set("location", location);
    formData.set("excerpt", excerpt);
    formData.set("content", content);
    formData.set("published", String(published));
    if (imageFile) formData.set("image", imageFile);

    const res = await fetch(isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts", {
      method: isEdit ? "PUT" : "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {!isEdit && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {(["blog", "news"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-colors ${
                  type === t ? "bg-navy text-white" : "bg-white text-navy/70 border border-border hover:border-navy/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
          Title
        </label>
        <input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm"
        />
      </div>

      {type === "blog" ? (
        <div>
          <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Category
          </label>
          <input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Regulations, Safety, Connectivity"
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm"
          />
        </div>
      ) : (
        <div>
          <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Pune, India"
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm"
          />
        </div>
      )}

      <div>
        <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
          Short description
        </label>
        <textarea
          id="excerpt"
          required
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm resize-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
          Full content <span className="normal-case font-semibold text-slate-400">(optional)</span>
        </label>
        <textarea
          id="content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm resize-y"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Image</label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {imagePreview && (
            <div className="relative w-full sm:w-28 h-40 sm:h-20 rounded-lg overflow-hidden border border-border bg-surface shrink-0">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEdit}
            className="text-sm w-full sm:w-auto"
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold text-navy cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4"
        />
        Published (visible on the public site)
      </label>

      {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm text-white bg-navy hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm text-navy border border-border hover:border-navy/30 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
