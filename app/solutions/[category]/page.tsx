import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/lib/solutions-data";
import { getCategory, getCategoryForSolution, solutionCategories } from "@/lib/solution-categories";
import { buildSolutionBreadcrumb } from "@/lib/breadcrumbs";
import CategoryDetailPage from "@/components/solutions-category/CategoryDetailPage";
import SolutionDetailPage from "@/components/solutions/SolutionDetailPage";
import VehicleHeroSelector from "@/components/solutions-category/VehicleHeroSelector";
import TestingHeroSelector from "@/components/solutions-category/TestingHeroSelector";

const SITE_URL = "https://apmgroups.in";

// This route serves two roles at the same URL depth:
//  1. The 4 new category landing pages (/solutions/vehicle-solutions, etc.)
//  2. A safety-net for the 11 legacy flat solution URLs (/solutions/fleet-management, etc.),
//     which next.config.js permanently redirects to their new nested URL. Two of those legacy
//     slugs — "workplace-safety" and "automated-testing-solutions" — are also category slugs;
//     the category wins and renders here, per the migration decision documented in the plan.
export function generateStaticParams() {
  const categoryParams = solutionCategories.map((c) => ({ category: c.slug }));
  const legacyParams = solutions.map((s) => ({ category: s.slug }));
  return [...categoryParams, ...legacyParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;

  const category = getCategory(categorySlug);
  if (category) {
    const title = `${category.name} | APM Group`;
    const url = `${SITE_URL}/solutions/${category.slug}`;
    return {
      title,
      description: category.description,
      alternates: { canonical: url },
      openGraph: { title, description: category.description, url, type: "website" },
      twitter: { card: "summary_large_image", title, description: category.description },
    };
  }

  const solution = getSolution(categorySlug);
  if (solution) {
    const title = `${solution.name} | APM Group`;
    const url = `${SITE_URL}/solutions/${solution.slug}`;
    return {
      title,
      description: solution.description,
      alternates: { canonical: url },
      openGraph: { title, description: solution.description, url, type: "website" },
      twitter: { card: "summary_large_image", title, description: solution.description },
    };
  }

  return {};
}

export default async function CategoryOrLegacySolutionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const category = getCategory(categorySlug);
  if (category) {
    if (category.slug === "vehicle-solutions") {
      return <VehicleHeroSelector />;
    }
    if (category.slug === "automated-testing-solutions") {
      return <TestingHeroSelector />;
    }
    return (
      <CategoryDetailPage
        category={category}
        breadcrumb={buildSolutionBreadcrumb(category)}
        canonicalUrl={`${SITE_URL}/solutions/${category.slug}`}
      />
    );
  }

  const solution = getSolution(categorySlug);
  if (solution) {
    const owningCategory = getCategoryForSolution(solution.slug);
    const child = owningCategory?.children.find((c) => c.slug === solution.slug);
    const breadcrumb = owningCategory
      ? buildSolutionBreadcrumb(owningCategory, child)
      : [{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: solution.name }];

    return (
      <SolutionDetailPage
        solution={solution}
        breadcrumb={breadcrumb}
        category={owningCategory}
        canonicalUrl={`${SITE_URL}/solutions/${solution.slug}`}
      />
    );
  }

  notFound();
}
