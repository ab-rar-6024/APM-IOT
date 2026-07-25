"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IndustryItem {
  name: string;
  image: string;
}

const industriesData: IndustryItem[] = [
  { name: "Automotive OEM", image: "/images/solutions-topics/automated-testing-solutions.jpg" },
  { name: "Fleet & Logistics", image: "/images/solutions-topics/asset-tracking.jpg" },
  { name: "Mining", image: "https://images.pexels.com/photos/32325794/pexels-photo-32325794.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Construction", image: "/images/solutions-topics/workplace-safety.jpg" },
  { name: "Passenger Transport", image: "https://images.pexels.com/photos/14887744/pexels-photo-14887744.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "School Transportation", image: "https://images.pexels.com/photos/14044466/pexels-photo-14044466.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Government", image: "/images/solutions-topics/video-surveillance.jpg" },
  { name: "Smart Cities", image: "/images/solutions-topics/electric-mobility.jpg" },
  { name: "Industrial IoT", image: "https://images.pexels.com/photos/1105379/pexels-photo-1105379.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Manufacturing", image: "https://images.pexels.com/photos/11958381/pexels-photo-11958381.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Oil & Gas", image: "https://images.pexels.com/photos/3207536/pexels-photo-3207536.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Agriculture", image: "https://images.pexels.com/photos/14242188/pexels-photo-14242188.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Healthcare", image: "https://images.pexels.com/photos/32026163/pexels-photo-32026163.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Utilities", image: "https://images.pexels.com/photos/6726040/pexels-photo-6726040.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

/** Reveals its element with a scroll-triggered entrance the moment it enters the viewport. */
function useScrollReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
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
      { threshold: 0, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

function IndustryCard({ item, index }: { item: IndustryItem; index: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        // Keep the entrance stagger for the initial load
        transitionDelay: visible ? `${(index % 14) * 100}ms` : "0ms",
        transitionDuration: "800ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      // mr-4 md:mr-6 replaces gap to ensure the mathematical loop is perfectly exact
      className={`group relative aspect-[4/5] shrink-0 w-64 md:w-72 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 mr-4 md:mr-6 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 640px) 256px, 288px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="absolute bottom-4 left-4 right-4 text-sm md:text-base font-black text-white leading-snug">
        {item.name}
      </span>
    </div>
  );
}

export default function IndustriesSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();

  // Duplicate the array to create a seamless infinite loop
  const doubledIndustries = [...industriesData, ...industriesData];

  return (
    <section id="industries" className="py-24 px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden">
      {/* CSS for the buttery smooth marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes smooth-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-smooth-marquee {
          animation: smooth-marquee 40s linear infinite;
        }
        /* Pauses the auto-scroll when a user hovers over any card */
        .animate-smooth-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 16px)",
        }}
      />

      <div className="relative max-w-[100vw] mx-auto w-full">
        {/* Title */}
        <div
          ref={headerRef}
          style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`text-center mb-12 max-w-7xl mx-auto transition-all ${
            headerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy mb-4 inline-block">
            Industries We Serve
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4">
            Custom engineered hardware and intelligent software platforms designed to optimize operations across vertical markets.
          </p>
        </div>

        {/* Smooth Infinite Marquee Wrapper */}
        {/* Change it to swiper js */}
        <div className="overflow-hidden w-full py-4">
          <div className="flex w-max animate-smooth-marquee">
            {doubledIndustries.map((item, index) => (
              <IndustryCard key={`${item.name}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}