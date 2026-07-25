"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

function IndustryPill({ industry, index }: { industry: string; index: number }) {
  const { ref, visible } = useScrollReveal<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      style={
        visible
          ? { animationDelay: `${(index % 8) * 70}ms`, animationFillMode: "both" }
          : { opacity: 0 }
      }
      className={`px-5 py-2.5 rounded-full text-sm font-bold text-navy/80 bg-slate-50 border border-slate-200 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-md ${
        visible ? "animate-milestone-pop" : ""
      }`}
    >
      {industry}
    </span>
  );
}

export default function SolutionIndustries({ industries }: { industries: string[] }) {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLHeadingElement>();

  return (
    <section className="py-16 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`accent-bar accent-bar-center text-2xl md:text-3xl font-black text-navy mb-10 inline-block transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Industries Using This Solution
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry, i) => (
            <IndustryPill key={industry} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
