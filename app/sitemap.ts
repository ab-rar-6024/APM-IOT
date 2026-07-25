import type { MetadataRoute } from "next";
import { solutionCategories } from "@/lib/solution-categories";
import { products } from "@/lib/solutions-data";

const SITE_URL = "https://apmgroups.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/certifications",
    "/blogs",
    "/news",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // "workplace-safety" and "automated-testing-solutions" are included here as category
  // URLs (they win the shared slug); the other 9 legacy flat solution URLs 301 to their
  // nested equivalent and are intentionally omitted so the sitemap only lists canonical URLs.
  const categoryRoutes = solutionCategories.map((category) => ({
    url: `${SITE_URL}/solutions/${category.slug}`,
    lastModified: new Date(),
  }));

  const solutionRoutes = solutionCategories.flatMap((category) =>
    category.children.map((child) => ({
      url: `${SITE_URL}/solutions/${category.slug}/${child.path ?? child.slug}`,
      lastModified: new Date(),
    }))
  );

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...solutionRoutes, ...productRoutes];
}
