import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import { getPublishedPostBySlug, formatPostDate, estimateReadTime } from "@/lib/posts";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("blog", slug);
  if (!post) return {};
  return { title: `${post.title} | APM Group`, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("blog", slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-5">
        <BackButton href="/blogs" label="Back to Blogs" />
      </div>

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-4">
          <span>{formatPostDate(post.created_at)}</span>
          <span>•</span>
          <span>{estimateReadTime(post.content || post.excerpt)}</span>
          {post.category && (
            <>
              <span>•</span>
              <span className="text-primary uppercase tracking-wide">{post.category}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-navy leading-tight mb-8">{post.title}</h1>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-slate-100 mb-10">
          <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{post.excerpt}</p>

        {post.content && (
          <div className="text-slate-600 leading-relaxed whitespace-pre-wrap space-y-4">{post.content}</div>
        )}
      </article>
    </main>
  );
}
