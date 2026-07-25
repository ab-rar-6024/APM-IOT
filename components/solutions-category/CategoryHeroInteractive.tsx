"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { SolutionCategory } from "@/lib/solution-categories";
import { getCategoryHotspots, type Hotspot } from "@/lib/solutions-hotspots";
import { products } from "@/lib/solutions-data";
import { smoothScrollTo } from "@/lib/lenis-instance";

export default function CategoryHeroInteractive({
  category,
}: {
  category: SolutionCategory;
}) {
  const hotspotsData = getCategoryHotspots(category.slug);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const activeId = hoveredId || clickedId;

  // A hotspot click (not hover) selects a product for the detail panel below and scrolls to it.
  // Runs after clickedId actually changes so the panel has mounted before we scroll to it.
  // Scrolled via the site's own Lenis instance (not native scrollIntoView) so it animates
  // smoothly instead of Lenis cancelling the native smooth-scroll mid-flight.
  useEffect(() => {
    if (clickedId) {
      smoothScrollTo(detailRef.current);
    }
  }, [clickedId]);

  const selectHotspot = (id: string) => {
    setClickedId((prev) => (prev === id ? null : id));
  };

  const selectedHotspot = hotspotsData?.hotspots.find((h) => h.id === clickedId) ?? null;
  const selectedProduct = selectedHotspot
    ? products.find((p) => p.slug === selectedHotspot.productSlug) ?? null
    : null;

  // Fallback to static banner if category does not have hotspot config
  if (!hotspotsData) {
    return (
      <section className="relative bg-navy overflow-hidden py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#0F2857]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-primary mb-5">
            Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            {category.name}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {category.tagline}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-24 px-6 lg:px-8 overflow-hidden border-b border-slate-100">
      {/* Background drift grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-[0.03] pointer-events-none animate-grid-drift" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Link
            href="/solutions"
            className="text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <span className="text-xs font-extrabold text-slate-300 mx-2">/</span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            {category.name}
          </span>
        </div>

        {/* 2-Column Outer Layout: Left Text Description / Right Diagram */}
        <div className="grid lg:grid-cols-[1fr_2.2fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Category Description */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy leading-[1.1] tracking-tight">
              {category.name}
            </h1>
            <p className="text-navy text-lg md:text-xl leading-relaxed font-bold border-l-4 border-primary pl-5">
              {category.tagline}
            </p>
            <div className="space-y-4 text-slate-500 text-base leading-relaxed">
              {category.overview.slice(0, 2).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-sm text-white bg-[#E30613] hover:bg-[#c10510] hover:scale-105 hover:shadow-xl hover:shadow-red-600/10 active:scale-95 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Column: Static Line-Connected Showcase Diagram */}
          <div className="w-full relative">
            
            {/* Branch A: Vehicle Solutions - Transparent hotspot overlays on user's pre-rendered diagram */}
            {category.slug === "vehicle-solutions" ? (
              <div className="hidden md:block relative w-full aspect-[16/10] bg-white select-none">
                {/* Full container size pre-rendered diagram image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-full">
                    <Image
                      src={hotspotsData.baseImage}
                      alt={`${category.name} diagram`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Hotspot transparent triggers over the pre-rendered circles */}
                {hotspotsData.hotspots.map((h) => {
                  const product = products.find((p) => p.slug === h.productSlug);
                  const isActive = activeId === h.id;

                  return (
                    <div
                      key={h.id}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      onMouseEnter={() => setHoveredId(h.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setClickedId(clickedId === h.id ? null : h.id)}
                      // Trigger box centered at the circle center, slightly larger
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-9.5 h-9.5 rounded-full cursor-pointer z-20 flex items-center justify-center animate-fade-in"
                    >
                      {/* Active glowing ring overlay */}
                      {isActive && (
                        <span className="absolute w-[44px] h-[44px] rounded-full border-2 border-[#E30613] bg-[#E30613]/5 animate-[pulse_1.5s_infinite] pointer-events-none" />
                      )}

                      {/* Tooltip Popup on Hover/Click */}
                      {isActive && (
                        <div
                          className={`absolute z-30 flex flex-col bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-red-100 shadow-xl w-[14rem] transition-all duration-300 pointer-events-auto text-left ${
                            h.side === "left"
                              ? "left-[calc(100%+14px)] top-1/2 -translate-y-1/2"
                              : "right-[calc(100%+14px)] top-1/2 -translate-y-1/2"
                          }`}
                          onClick={(e) => e.stopPropagation()} // Prevent closing on tooltip click
                        >
                          <span className="text-xs font-black text-[#E30613] leading-tight">
                            {h.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium leading-normal mt-1">
                            {h.description}
                          </span>
                          {product && (
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center gap-0.5 text-[9px] font-black text-primary hover:text-navy mt-2 transition-colors border-t border-slate-100 pt-1.5"
                            >
                              Specifications →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Branch B: Workplace Safety / Other categories - Render perimeter cards and lines */
              <div className="hidden md:block relative w-full aspect-[16/10] bg-white select-none">
                
                {/* Base Image in Center — Expanded to fill maximum area */}
                <div className="absolute left-[3%] top-[3%] w-[94%] h-[94%] flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-full">
                    <Image
                      src={hotspotsData.baseImage}
                      alt={`${category.name} diagram`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* SVG Connecting Lines layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                  {hotspotsData.hotspots.map((h) => {
                    const isActive = activeId === h.id;
                    return (
                      <g key={h.id}>
                        <line
                          x1={`${h.cardX}%`}
                          y1={`${h.cardY}%`}
                          x2={`${h.x}%`}
                          y2={`${h.y}%`}
                          stroke={isActive ? "#E30613" : "#2F8FEF"}
                          strokeWidth={isActive ? "2" : "1"}
                          opacity={isActive ? "1" : "0.35"}
                          className="transition-all duration-300"
                        />
                        <circle
                          cx={`${h.x}%`}
                          cy={`${h.y}%`}
                          r={isActive ? "4" : "2.5"}
                          fill={isActive ? "#E30613" : "#2F8FEF"}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Pulsing Hotspot markers */}
                {hotspotsData.hotspots.map((h) => {
                  const isActive = activeId === h.id;
                  return (
                    <div
                      key={h.id}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center pointer-events-none z-20 transition-all ${
                        isActive ? "scale-125" : "scale-100"
                      }`}
                    >
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping opacity-75 ${
                          isActive ? "bg-red-500" : ""
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-white shadow-sm ${
                          isActive ? "bg-[#E30613]" : "bg-primary"
                        }`}
                      />
                    </div>
                  );
                })}

                {/* Absolute Positioned Circular Product Cards */}
                {hotspotsData.hotspots.map((h) => {
                  const product = products.find((p) => p.slug === h.productSlug);
                  const isActive = activeId === h.id;

                  return (
                    <div
                      key={h.id}
                      style={{ left: `${h.cardX}%`, top: `${h.cardY}%` }}
                      onMouseEnter={() => setHoveredId(h.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => selectHotspot(h.id)}
                      className={`absolute flex items-center z-20 cursor-pointer transition-all duration-300 ${
                        h.side === "left"
                          ? "flex-row-reverse -translate-x-[calc(100%-18px)] -translate-y-[18px]"
                          : "-translate-x-[18px] -translate-y-[18px]"
                      } ${isActive ? "scale-[1.03]" : "scale-100 opacity-90 hover:opacity-100"}`}
                    >
                      <div
                        className={`w-9.5 h-9.5 rounded-full border bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-md transition-all duration-300 ${
                          isActive
                            ? "border-[#E30613] scale-110 shadow-lg shadow-red-500/10"
                            : "border-primary/30 group-hover:border-primary"
                        }`}
                      >
                        {product?.image ? (
                          <div className="relative w-6 h-6">
                            <Image
                              src={product.image}
                              alt={h.name}
                              fill
                              sizes="24px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        )}
                      </div>

                      <div
                        className={`flex flex-col bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border shadow-sm max-w-[12rem] transition-all duration-300 ${
                          h.side === "left"
                            ? "mr-2.5 text-right items-end"
                            : "ml-2.5 text-left items-start"
                        } ${isActive ? "border-red-100 bg-red-50/50" : "border-slate-100"}`}
                      >
                        <span
                          className={`text-[11px] font-black leading-tight transition-colors duration-300 ${
                            isActive ? "text-[#E30613]" : "text-navy"
                          }`}
                        >
                          {h.name}
                        </span>
                        <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
                          {h.description}
                        </span>
                        {product && (
                          <span
                            className={`inline-flex items-center gap-0.5 text-[8.5px] font-bold mt-1 transition-colors duration-300 ${
                              isActive ? "text-[#E30613]" : "text-primary/60"
                            }`}
                          >
                            {isActive ? "↓ Details below" : "Click to view details"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mobile View: Stacks Diagram above a clean vertical accordion list */}
            <div className="md:hidden w-full space-y-6">
              <div className="relative aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-4">
                <Image
                  src={hotspotsData.baseImage}
                  alt={`${category.name} diagram`}
                  fill
                  sizes="100vw"
                  className="object-contain p-2"
                />

                {hotspotsData.hotspots.map((h) => {
                  const isActive = activeId === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => selectHotspot(h.id)}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 z-30"
                      aria-label={h.name}
                    >
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full bg-primary/45 animate-ping transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-md ${
                          isActive ? "bg-[#E30613] scale-110" : "bg-primary"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Accordion list */}
              <div className="grid gap-3">
                {hotspotsData.hotspots.map((h) => {
                  const product = products.find((p) => p.slug === h.productSlug);
                  const isActive = activeId === h.id;

                  return (
                    <div
                      key={h.id}
                      onClick={() => selectHotspot(h.id)}
                      className={`flex flex-col p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary/[0.02]"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                          {product?.image ? (
                            <Image
                              src={product.image}
                              alt={h.name}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-black text-navy leading-tight">{h.name}</span>
                          <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                            {h.description}
                          </span>
                        </div>
                        <svg
                          className={`w-4 h-4 ml-auto text-slate-400 transition-transform ${
                            isActive ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>

                      {isActive && product && (
                        <div className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2.5 space-y-2.5">
                          <div className="relative w-24 h-24 aspect-square rounded-xl bg-white border border-slate-200 overflow-hidden">
                            <Image src={product.image} alt={product.name} fill sizes="96px" className="object-contain p-2.5" />
                          </div>
                          <p>{product.shortDesc}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Product Detail Panel — appears once a hotspot is clicked (desktop; mobile
            already reveals the same image + description inline in the accordion above) and the
            page auto-scrolls to it, instead of navigating away to the product's own page. */}
        {selectedHotspot && selectedProduct && (
          <div
            ref={detailRef}
            className="hidden md:block mt-14 rounded-[2rem] border border-slate-200 bg-slate-50/60 p-6 md:p-10 scroll-mt-24 animate-fade-in"
          >
            <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-start">
              <div className="relative w-full max-w-[220px] aspect-square mx-auto md:mx-0 rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="220px"
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">
                    {selectedHotspot.name}
                  </span>
                  <h3 className="text-2xl font-black text-navy mt-1">{selectedProduct.name}</h3>
                  <p className="text-slate-500 leading-relaxed mt-2">{selectedProduct.shortDesc}</p>
                </div>

                {selectedProduct.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Key Features</h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedProduct.features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/products/${selectedProduct.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-navy transition-colors"
                >
                  View Full Product Page →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
