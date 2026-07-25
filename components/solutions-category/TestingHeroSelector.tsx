"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { ArrowRight, CheckCircle2, ChevronDown, HelpCircle, Info, Landmark, Layers, MapPin, ShieldAlert } from "lucide-react";
import { products } from "@/lib/solutions-data";
import { smoothScrollTo } from "@/lib/lenis-instance";
import ContactForm from "@/components/solutions/ContactForm";

export default function TestingHeroSelector() {
  const testingProducts = products.filter(
    (p) =>
      p.slug === "automated-testing-lane" || p.slug === "automated-test-driving-track"
  );

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedProduct = testingProducts.find((p) => p.slug === selectedSlug) ?? null;

  // Auto-scroll to details panel when a product is clicked
  useEffect(() => {
    if (selectedSlug) {
      smoothScrollTo(panelRef.current);
    }
  }, [selectedSlug]);

  return (
    <div>
      {/* Hero Header */}
      <section className="relative bg-slate-900 pt-10 pb-16 lg:pt-14 lg:pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background mesh grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-4">
            <BackButton href="/solutions" label="Back to Solutions" variant="glass" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-slide-up">
            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 backdrop-blur-sm">
              Intelligence Test Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
              Choose Your Automated Testing Platform
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              Select a testing infrastructure below to see specifications, RTO workflows, and compliance standards.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto animate-fade-slide-up">
            {testingProducts.map((product) => {
              const isSelected = selectedSlug === product.slug;
              const displayImage =
                product.slug === "automated-testing-lane"
                  ? "/images/solutions/automated-testing-lane-real.png"
                  : "/images/solutions/automated-driving-track-real.png";

              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => setSelectedSlug(isSelected ? null : product.slug)}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col items-center text-center bg-white/95 backdrop-blur-md rounded-3xl border p-6 transition-all duration-300 ${
                    isSelected
                      ? "border-primary shadow-[0_20px_45px_rgba(47,143,239,0.3)] -translate-y-1.5 bg-white"
                      : "border-slate-200/80 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-white"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 440px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-navy">{product.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {product.slug === "automated-testing-lane"
                      ? "Vehicle Fitness Lane Infrastructure"
                      : "Driver Licensing Track Infrastructure"}
                  </p>
                  <p className="text-sm text-slate-500 mt-3 font-semibold px-4 leading-relaxed">
                    {product.shortDesc}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      isSelected ? "text-primary" : "text-slate-600 group-hover:text-primary"
                    }`}
                  >
                    {isSelected ? "Viewing details" : "View details"}
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Details Panel */}
      {selectedProduct && (
        <section ref={panelRef} className="bg-white py-16 px-6 lg:px-8 border-t border-slate-100 scroll-mt-12">
          <div className="max-w-7xl mx-auto animate-fade-slide-up">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Product Info & Stats */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary mb-3">
                    <Landmark className="w-3.5 h-3.5" />
                    Turnkey Government & Commercial Solutions
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-navy tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-bold border-l-4 border-primary pl-5 mt-4">
                    {selectedProduct.overview}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-4">
                  <h4 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Key Capabilities & Benefits
                  </h4>
                  <ul className="space-y-3">
                    {selectedProduct.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-semibold leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-navy uppercase tracking-widest">Target Installations</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProduct.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600"
                      >
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
                    >
                      <span className="text-2xl md:text-3xl font-black text-navy tracking-tight">{stat.value}</span>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Specs, Features & FAQs */}
              <div className="lg:col-span-5 space-y-6">
                {/* Features & Specifications Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-100 p-5 md:p-6">
                    <h3 className="text-base font-black text-navy uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" /> Features & Specifications
                    </h3>
                  </div>

                  <div className="p-5 md:p-6 space-y-6">
                    {/* Features list */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Infrastructure Components</h4>
                      <ul className="grid gap-2">
                        {selectedProduct.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 font-semibold leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Specs table */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Technical Specifications</h4>
                      <div className="grid gap-2.5 text-xs">
                        {selectedProduct.specifications.map((spec, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-50 last:border-0">
                            <span className="text-slate-400 font-semibold uppercase tracking-wider">{spec.label}</span>
                            <span className="text-navy font-bold text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ section */}
                {selectedProduct.faq.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-primary" /> Frequently Asked Questions
                    </h3>
                    <div className="space-y-2.5">
                      {selectedProduct.faq.map((item, idx) => (
                        <details
                          key={idx}
                          className="group bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-2xl p-4 transition-colors [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                        >
                          <summary className="flex items-center justify-between gap-4 text-xs md:text-sm font-bold text-navy select-none list-none">
                            <span>{item.q}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180 shrink-0" />
                          </summary>
                          <p className="text-xs md:text-sm text-slate-500 font-semibold mt-2.5 leading-relaxed">
                            {item.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inquire section */}
            <div className="mt-16 pt-12 border-t border-slate-100">
              <div className="max-w-xl mx-auto text-center mb-8">
                <h3 className="text-2xl font-black text-navy">Request a Consultation</h3>
                <p className="text-sm text-slate-400 font-semibold mt-2">
                  Speak to our transport infrastructure engineers to design and quote your testing center project.
                </p>
              </div>
              <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8">
                <ContactForm productName={selectedProduct.name} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
