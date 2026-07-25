"use client";

import Link from "next/link";
import Image from "next/image";
import { products, type ProductUsage, type Product } from "@/lib/solutions-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

function ProductRow({
  usage,
  product,
  index,
}: {
  usage: ProductUsage;
  product: Product;
  index: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/products/${product.slug}`}
      style={{
        transitionDelay: visible ? `${(index % 5) * 80}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative overflow-hidden flex items-center gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
      <div className="relative shrink-0 w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="64px"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>
      <div className="relative flex-1 min-w-0">
        <h3 className="text-sm font-black text-navy group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{usage.why}</p>
      </div>
      <svg className="relative w-4 h-4 shrink-0 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}

export default function SolutionProductsUsed({
  solutionName,
  productsUsed
}: {
  solutionName: string;
  productsUsed: ProductUsage[];
}) {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const resolved = productsUsed
    .map((pu) => ({ usage: pu, product: products.find((p) => p.slug === pu.slug) }))
    .filter((entry): entry is { usage: ProductUsage; product: Product } => Boolean(entry.product));

  if (resolved.length === 0) return null;

  return (
    <section className="py-16 px-6 lg:px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`max-w-2xl mb-12 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-4">
            Technologies Used
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Key products powering {solutionName}.
          </p>
        </div>

        <div className="space-y-4">
          {resolved.map(({ usage, product }, i) => (
            <ProductRow key={usage.slug} usage={usage} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
