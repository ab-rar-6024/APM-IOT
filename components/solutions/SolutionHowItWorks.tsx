"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

function StepCard({ step, index, isLastInRow }: { step: string; index: number; isLastInRow: boolean }) {
  const { ref, visible } = useScrollReveal<HTMLLIElement>("0px 0px -15% 0px");

  return (
    <li
      ref={ref}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:bg-white/[0.07] hover:border-primary/40 hover:-translate-y-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/15 text-primary font-black text-sm border border-primary/30 mb-4 transition-transform duration-300 group-hover:scale-110">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-white/80 leading-relaxed text-sm md:text-base">{step}</p>

      {/* Flow connector to the next step, right-pointing on desktop rows */}
      {!isLastInRow && (
        <svg
          className="hidden md:block absolute top-1/2 -right-8 -translate-y-1/2 w-6 h-6 text-white/15"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      )}
    </li>
  );
}

export default function SolutionHowItWorks({ steps }: { steps: string[] }) {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const columns = 2;

  return (
    <section className="py-16 px-6 lg:px-8 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <div
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`transition-all ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-white mb-4">How Our Solution Works</h2>
          <p className="text-white/60 leading-relaxed mb-10">
            Here's how the operational workflow comes together in practice.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 gap-x-14 gap-y-8">
          {steps.map((step, i) => {
            const isRowEnd = (i + 1) % columns === 0 || i === steps.length - 1;
            return <StepCard key={i} step={step} index={i} isLastInRow={isRowEnd} />;
          })}
        </ol>
      </div>
    </section>
  );
}
