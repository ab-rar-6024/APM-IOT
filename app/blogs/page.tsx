import BlogsClient, { type BlogPost } from "@/components/blogs/BlogsClient";
import { getPublishedPosts, formatPostDate, estimateReadTime } from "@/lib/posts";

export const revalidate = 0;

export default async function BlogsPage() {
  const posts = await getPublishedPosts("blog");

  const blogs: BlogPost[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category || "General",
    date: formatPostDate(p.created_at),
    readTime: estimateReadTime(p.content || p.excerpt),
    desc: p.excerpt,
    image: p.image_url,
  }));

  return <BlogsClient blogs={blogs} />;
}
