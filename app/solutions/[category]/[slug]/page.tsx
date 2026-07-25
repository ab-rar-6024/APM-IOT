import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution } from "@/lib/solutions-data";
import { getCategory, getCategoryChild, solutionCategories } from "@/lib/solution-categories";
import { buildSolutionBreadcrumb } from "@/lib/breadcrumbs";
import SolutionDetailPage from "@/components/solutions/SolutionDetailPage";

const SITE_URL = "https://apmgroups.in";

export function generateStaticParams() {
  return solutionCategories.flatMap((category) =>
    category.children.map((child) => ({
      category: category.slug,
      slug: child.path ?? child.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  const child = getCategoryChild(category, slug);
  if (!child) return {};

  const solution = getSolution(child.slug);
  if (!solution) return {};

  const name = child.displayName ?? solution.name;
  const title = `${name} | ${category.name} | APM Group`;
  const url = `${SITE_URL}/solutions/${category.slug}/${slug}`;

  return {
    title,
    description: solution.description,
    alternates: { canonical: url },
    openGraph: { title, description: solution.description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description: solution.description },
  };
}

export default async function NestedSolutionPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;

  const category = getCategory(categorySlug);
  if (!category) notFound();

  const child = getCategoryChild(category, slug);
  if (!child) notFound();

  const solution = getSolution(child.slug);
  if (!solution) notFound();

  return (
    <SolutionDetailPage
      solution={solution}
      displayName={child.displayName}
      breadcrumb={buildSolutionBreadcrumb(category, child)}
      category={category}
      canonicalUrl={`${SITE_URL}/solutions/${category.slug}/${slug}`}
    />
  );
}
