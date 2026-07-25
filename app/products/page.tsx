import type { Metadata } from "next";
import Image from "next/image";
import ProductCatalog from "@/components/products/ProductCatalog";
import { productCategories } from "@/lib/product-categories";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Products | APM Group",
  description:
    "Explore APM's full product range across Connected Mobility, AI Vision Systems, Fleet Intelligence, Vehicle Safety, EV & Power Electronics, Software Platforms, Compliance Solutions, Road Safety, Manufacturing, and Intelligent Testing Systems.",
  alternates: { canonical: "https://apmgroups.in/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory = productCategories.find((cat) => cat.id === category)?.id;

  return (
    <main className="min-h-screen bg-white animate-[fadeIn_0.4s_ease]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-5">
        <BackButton href="/" label="Back to Home" />
      </div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface pt-14 pb-16 md:pt-16 md:pb-20 px-6 lg:px-8">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-navy/10 blur-3xl animate-float pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #173A75 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative max-w-7xl mx-auto animate-fade-slide-up grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="accent-bar text-4xl sm:text-5xl font-black text-navy leading-[1.1] tracking-tight mb-5">
              Our Products
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              A complete hardware and software portfolio spanning connected mobility, AI vision, fleet
              intelligence, vehicle safety, EV electronics, compliance, and manufacturing — engineered
              and manufactured in-house.
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-xl">
            <Image
              src="/images/products/apm-connected-fleet-telematics.png"
              alt="APM connected vehicle fleet network — realistic road scene at dusk with high-tech HUD overlays representing ADAS, DMS, BSD, and real-time tracking"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductCatalog key={initialCategory ?? "all"} initialCategory={initialCategory} />
        </div>
      </section>
    </main>
  );
}
