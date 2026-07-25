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
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-xl bg-white">
              <Image
                src="/images/aboutusdetail/aboutbanner.png"
                alt="APM connected vehicle platform — AI-driven telematics hardware linking a vehicle to a smart city network"
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-right hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Responsive overlay matching the reference image layout tailored for APM Group */}
              <div className="absolute inset-y-0 left-0 w-3/4 sm:w-2/3 lg:w-3/4 z-10 p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-r from-white via-white/95 to-transparent">
                <span className="text-slate-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2">
                  Recognized Leader
                </span>
                <div className="relative inline-block mb-3 sm:mb-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight leading-none">
                    APM Group
                  </h2>
                  <div className="w-12 sm:w-14 h-[3px] bg-primary mt-2 rounded-full" />
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-snug mb-4 max-w-[180px] sm:max-w-[220px]">
                  A Leading Provider of Connected Mobility, AIS-140 Telematics &amp; IoT Hardware.
                </p>
                
                {/* Certification Badge with Book/Shield Icon style */}
                <div className="flex items-center gap-2 text-primary">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 tracking-wide uppercase">
                    ARAI &amp; IATF Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
