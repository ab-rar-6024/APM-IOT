import type { SolutionCategory, CategoryChild } from "@/lib/solution-categories";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Home / Solutions / [Category] / [Solution], generated from the routing structure. */
export function buildSolutionBreadcrumb(
  category?: SolutionCategory,
  child?: CategoryChild,
  childDisplayName?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" }
  ];

  if (category) {
    const hasChild = Boolean(child);
    items.push({ label: category.name, href: hasChild ? `/solutions/${category.slug}` : undefined });
  }

  if (category && child) {
    items.push({ label: childDisplayName ?? child.displayName ?? child.slug });
  }

  return items;
}
