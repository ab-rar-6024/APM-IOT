"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import type { Post } from "@/lib/supabase";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "blog" | "news">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/posts");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete post.");
    }
    setDeletingId(null);
  };

  const filtered = posts.filter((p) => filter === "all" || p.type === filter);

  return (
    <main className="min-h-screen bg-surface">
      <AdminHeader title="Dashboard" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-navy">Posts</h1>
            <p className="text-sm text-slate-500 mt-1">Manage what shows up on /blogs and /news.</p>
          </div>
          <Link
            href="/admin/new"
            className="px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-navy hover:bg-navy-light transition-colors w-full sm:w-auto text-center"
          >
            + New Post
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "blog", "news"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                filter === f ? "bg-navy text-white" : "bg-white text-navy/70 border border-border hover:border-navy/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center text-slate-500 text-sm">
            No posts yet. Click "New Post" to create one.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {filtered.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 border-b border-border last:border-b-0 hover:bg-surface/60 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-surface border border-border shrink-0">
                    <Image src={post.image_url} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded ${
                          post.type === "blog" ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {post.type}
                      </span>
                      {!post.published && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-navy text-sm truncate">{post.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
                  <Link
                    href={`/admin/${post.id}/edit`}
                    className="flex-1 sm:flex-none text-center px-3 py-2 rounded-lg text-xs font-bold text-navy border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deletingId === post.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
