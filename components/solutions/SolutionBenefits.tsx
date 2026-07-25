"use client";

import type { BenefitCard } from "@/lib/solutions-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

function BenefitChip({ benefit }: { benefit: BenefitCard }) {
  return (
    <div className="flex-none w-72 sm:w-80 rounded-2xl border border-slate-200/80 bg-white p-5 flex items-start gap-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
      <div>
        <h3 className="text-sm font-black text-navy mb-1">{benefit.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ benefits, direction }: { benefits: BenefitCard[]; direction: "left" | "right" }) {
  const looped = [...benefits, ...benefits];

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex flex-none gap-5 pr-5 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } hover:[animation-play-state:paused]`}
      >
        {looped.map((benefit, i) => (
          <BenefitChip key={`${benefit.title}-${i}`} benefit={benefit} />
        ))}
      </div>
    </div>
  );
}

export default function SolutionBenefits({ benefits }: { benefits: BenefitCard[] }) {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();

  // Split into two rows that scroll opposite directions for a layered feel
  const mid = Math.ceil(benefits.length / 2);
  const rowA = benefits.slice(0, mid);
  const rowB = benefits.slice(mid).length > 0 ? benefits.slice(mid) : benefits;

  return (
    <section className="py-16 lg:px-8 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <div
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`max-w-2xl mb-12 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-4">Key Benefits</h2>
          <p className="text-slate-500 leading-relaxed">
            What businesses gain once this solution is in place.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <MarqueeRow benefits={rowA} direction="left" />
        <MarqueeRow benefits={rowB} direction="right" />
      </div>
    </section>
  );
}
