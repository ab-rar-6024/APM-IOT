import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/solutions-data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-base font-bold text-navy mb-2">{product.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{product.shortDesc}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-navy transition-colors">
          Learn More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
