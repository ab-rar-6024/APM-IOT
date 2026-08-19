import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";
import { getAdminSupabase } from "@/lib/supabase";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-surface">
      <AdminHeader title="Edit Post" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-xl sm:text-2xl font-black text-navy mb-6 sm:mb-8">Edit Post</h1>
        <PostForm post={post} />
      </div>
    </main>
  );
}
