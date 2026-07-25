import Link from "next/link";
import ProductCatalog from "@/components/products/ProductCatalog";

export default function ProductsSection() {
  return (
    <section id="products" className="landing-snap-section relative py-24 px-6 lg:px-8 bg-white overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 18px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy mb-4 inline-block">
            Our Products
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4 font-semibold text-sm md:text-base">
            Select a category to view products and details.
          </p>
        </div>

        <ProductCatalog variant="compact" />

        <div className="text-center mt-14">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide text-white bg-navy hover:bg-primary hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98] transition-all duration-300"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
