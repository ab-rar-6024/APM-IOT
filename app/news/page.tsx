import NewsClient, { type NewsItem } from "@/components/news/NewsClient";
import { getPublishedPosts, formatPostDate } from "@/lib/posts";

export const revalidate = 0;

export default async function NewsPage() {
  const posts = await getPublishedPosts("news");

  const news: NewsItem[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: formatPostDate(p.created_at),
    location: p.location || "",
    desc: p.excerpt,
    image: p.image_url,
  }));

  return <NewsClient news={news} />;
}
