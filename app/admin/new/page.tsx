import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-surface">
      <AdminHeader title="New Post" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-xl sm:text-2xl font-black text-navy mb-6 sm:mb-8">New Post</h1>
        <PostForm />
      </div>
    </main>
  );
}
