"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="landing-snap-section bg-white py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6">
            <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-8">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2F8FEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#2F8FEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </div>
            <h1 className="accent-bar text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6 leading-tight">
              Engineering the Future of Connected Mobility
            </h1>
            <p className="text-slate-500 text-lg mb-6">
              End-to-end design, development, manufacturing &amp; deployment of
              smart mobility, IoT and industrial automation solutions.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-2xl">
              APM is a technology-driven engineering company delivering complete
              hardware, firmware, software and manufacturing solutions under one
              roof. We design, develop, manufacture, deploy and support
              connected mobility, industrial IoT and compliance products for
              OEMs, enterprises and government organizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white bg-navy hover:bg-primary transition-colors"
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-navy border border-border hover:border-primary hover:text-primary transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right Column: Recognition Banner Image Card */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-xl bg-white group">
              <Image
                src="/images/aboutusdetail/aboutbanner.png"
                alt="APM Group - A Leading Provider of Connected Mobility, AIS-140 Telematics & IoT Hardware. ARAI & IATF Certified"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
