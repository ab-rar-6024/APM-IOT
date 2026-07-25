import type { Metadata } from "next";
import { solutionCategories } from "@/lib/solution-categories";
import CategoryCard from "@/components/solutions-landing/CategoryCard";
import StructuredData from "@/components/solutions/StructuredData";

export const metadata: Metadata = {
  title: "Solutions | APM Group",
  description:
    "Vehicle IoT Solutions, Workplace Safety Solutions, Intelligence Test Solutions, Industrial IoT Solutions, Software Solutions, and Manufacturing Solutions — connected IoT, telematics, and industrial technology from APM Group.",
  alternates: { canonical: "https://apmgroups.in/solutions" },
  openGraph: {
    title: "Solutions | APM Group",
    description:
      "Vehicle IoT Solutions, Workplace Safety Solutions, Intelligence Test Solutions, Industrial IoT Solutions, Software Solutions, and Manufacturing Solutions from APM Group.",
    url: "https://apmgroups.in/solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | APM Group",
    description:
      "Vehicle IoT Solutions, Workplace Safety Solutions, Intelligence Test Solutions, Industrial IoT Solutions, Software Solutions, and Manufacturing Solutions from APM Group.",
  },
};

export default function SolutionsLandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <StructuredData
        name="Solutions"
        description={metadata.description as string}
        url="https://apmgroups.in/solutions"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      {/* Hero — text-led, matching the navy gradient language used across solution pages */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#0F2857]" />
        <div
          className="absolute inset-0 opacity-[0.06] animate-grid-drift"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 14px)",
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-primary mb-5 animate-fade-slide-up">
            Solutions
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight animate-fade-slide-up"
            style={{ animationDelay: "90ms" }}
          >
            Connected Intelligence for Vehicles, Worksites & Industrial Operations
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: "180ms" }}
          >
            Six solution categories, engineered end to end — from telematics hardware to certified compliance
            infrastructure — for businesses and government agencies operating at scale.
          </p>
        </div>
      </section>

      {/* 4 large interactive category cards */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {solutionCategories.map((category, i) => (
              <CategoryCard
                key={category.slug}
                href={`/solutions/${category.slug}`}
                image={category.heroImage}
                name={category.name}
                tagline={category.tagline}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
