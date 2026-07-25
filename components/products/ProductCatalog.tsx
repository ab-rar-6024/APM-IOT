"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/solutions-data";
import { productCategories, placeholderProductImages } from "@/lib/product-categories";
import type { ProductCategory } from "@/lib/product-categories";

interface ProductCatalogProps {
  initialCategory?: string;
  /** "compact" = single-row scrollable pill strip (landing page teaser).
   *  "sidebar" = sticky vertical category list next to the grid (full /products page). */
  variant?: "compact" | "sidebar";
}

function CategoryPillStrip({
  activeTab,
  onSelect
}: {
  activeTab: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {productCategories.map((cat: ProductCategory) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 whitespace-nowrap border ${
                isActive
                  ? "bg-navy text-white border-navy shadow-md shadow-navy/20"
                  : "text-navy/70 border-slate-200 hover:text-primary hover:border-primary/40 bg-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(240)}
        aria-label="Scroll categories right"
        className="shrink-0 flex items-center justify-center w-9 h-9 mb-2 rounded-full bg-white border border-slate-200 text-navy/70 shadow-sm hover:text-primary hover:border-primary/40 hover:shadow-md transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductCatalog({ initialCategory, variant = "sidebar" }: ProductCatalogProps) {
  const defaultTab =
    productCategories.find((cat) => cat.id === initialCategory)?.id ?? productCategories[0].id;

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const prevIndex = useRef(productCategories.findIndex((cat) => cat.id === defaultTab));

  const currentCategory = productCategories.find((cat) => cat.id === activeTab) || productCategories[0];

  const handleTabClick = (id: string) => {
    const nextIndex = productCategories.findIndex((cat) => cat.id === id);
    setDirection(nextIndex >= prevIndex.current ? "right" : "left");
    prevIndex.current = nextIndex;
    setActiveTab(id);
  };

  const grid = (
    <div
      key={activeTab}
      className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
        direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
      }`}
    >
      {currentCategory.products.map((pName, idx) => {
        const matched = products.find(
          (prod) => prod.name.trim().toLowerCase() === pName.trim().toLowerCase()
        );

        const staggerStyle = { animationDelay: `${idx * 70}ms` };

        if (matched) {
          return (
            <Link
              key={pName}
              href={`/products/${matched.slug}`}
              style={staggerStyle}
              className="animate-fade-slide-up group flex flex-col bg-slate-50/50 rounded-3xl border border-slate-200/80 p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:border-primary hover:shadow-xl hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden mb-4 p-4 border border-slate-100 shadow-inner">
                <Image
                  src={matched.image}
                  alt={matched.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="object-contain p-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>

              <div className="space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black text-navy group-hover:text-primary transition-colors duration-300 leading-snug">
                    {matched.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-semibold line-clamp-2 leading-relaxed">
                    {matched.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/50 text-[10px] font-bold text-slate-400 flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                  <span>View details</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        }

        const placeholderImage = placeholderProductImages[pName];

        return (
          <div
            key={pName}
            style={staggerStyle}
            className="animate-fade-slide-up bg-slate-50/50 rounded-3xl border border-slate-200 p-6 flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden mb-4 p-4 border border-slate-100">
              {placeholderImage ? (
                <Image
                  src={placeholderImage}
                  alt={pName}
                  fill
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="object-contain p-2"
                />
              ) : (
                <span className="text-2xl">📦</span>
              )}
            </div>
            <h4 className="text-sm font-black text-navy">{pName}</h4>
          </div>
        );
      })}
    </div>
  );

  if (variant === "compact") {
    return (
      <div>
        {/* Single-row scrollable pill strip */}
        <div className="mb-12 -mx-6 px-6 lg:mx-0 lg:px-0">
          <CategoryPillStrip activeTab={activeTab} onSelect={handleTabClick} />
        </div>

        {grid}
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 lg:items-start">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-28 space-y-1">
        {productCategories.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => handleTabClick(cat.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                isActive
                  ? "bg-navy text-white shadow-md shadow-navy/20"
                  : "text-navy/70 hover:text-primary hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </aside>

      {/* Mobile category strip */}
      <div className="lg:hidden mb-10 -mx-6 px-6">
        <CategoryPillStrip activeTab={activeTab} onSelect={handleTabClick} />
      </div>

      <div>{grid}</div>
    </div>
  );
}
