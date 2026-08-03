"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Reveals its element with a scroll-triggered entrance the moment it enters the viewport. */
function useScrollReveal<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

interface PillarItem {
  title: string;
  subtitle: string;
  desc: string;
}

const pillars: PillarItem[] = [
  {
    title: "100% In-House R&D",
    subtitle: "Schematics to Software",
    desc: "We design our own electronic schematics, develop custom RTOS/Linux firmware, write native mobile apps, and engineer cloud dashboards entirely under one roof."
  },
  {
    title: "SMT Manufacturing",
    subtitle: "Automotive-Grade Production",
    desc: "Our state-of-the-art SMT PCB assembly lines handle high-volume procurement, functional testing, and box-build assembly to certified standards."
  },
  {
    title: "Government Certified",
    subtitle: "ARAI, ICAT & BIS Standards",
    desc: "Every safety and telematics device undergoes exhaustive testing to guarantee compliance with central government standards such as AIS-140."
  },
  {
    title: "1,600+ Partner Network",
    subtitle: "Pan-India Support & Fitment",
    desc: "With certified dealerships across 28 states, we coordinate rapid installation, calibration, and long-term support for transport operators at scale."
  }
];

function PillarRow({ item, index }: { item: PillarItem; index: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 4) * 90}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group p-5 rounded-2xl border border-transparent transition-all hover:border-slate-200 hover:bg-white hover:shadow-lg ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div>
        <span className="text-xs uppercase font-extrabold tracking-wider text-primary">
          {item.subtitle}
        </span>
        <h4 className="text-lg font-black text-navy leading-snug mt-1 transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed font-medium mt-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageRef, visible: imageVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="why-choose" className="landing-snap-section py-24 px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1.5px)] bg-[size:24px_24px] opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div
          ref={headerRef}
          style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`text-center mb-16 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy mb-4 inline-block">
            Why Partner with APM
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4 font-semibold text-sm md:text-base leading-relaxed">
            We deliver the engineering power of R&D and the operational reliability of certified local manufacturing under one roof.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image collage, shared across all four pillars instead of a per-item icon */}
          <div
            ref={imageRef}
            style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            className={`lg:col-span-5 relative transition-all ${
              imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <Image
                src="/images/ourevalution/why-partner-engineers.png"
                alt="APM engineers developing in-house hardware and software"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                quality={100}
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-36 h-44 md:w-40 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/images/ourevalution/why-partner-safety-gear.png"
                alt="APM-certified safety equipment used in manufacturing"
                fill
                sizes="200px"
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          {/* Pillars, listed as text rows instead of separate icon cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-1">
            {pillars.map((item, index) => (
              <PillarRow key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
