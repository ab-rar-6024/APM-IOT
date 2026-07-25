import type { BreadcrumbItem } from "@/lib/breadcrumbs";

const SITE_URL = "https://apmgroups.in";

export default function StructuredData({
  name,
  description,
  url,
  breadcrumb,
  image,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumb: BreadcrumbItem[];
  image?: string;
}) {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
    provider: {
      "@type": "Organization",
      name: "APM Group",
      url: SITE_URL,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
