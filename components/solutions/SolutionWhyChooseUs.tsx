"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const reasons = [
  {
    title: "End-to-End Solution Provider",
    description: "One accountable partner from manufacturing to support.",
    stat: "1",
    statLabel: "Accountable Partner"
  },
  {
    title: "Hardware + Software + Cloud Platform",
    description: "Hardware, dashboards, and cloud built to work together.",
    stat: "360°",
    statLabel: "Integrated Stack"
  },
  {
    title: "Industry Certified Products",
    description: "AIS-140, ARAI, ICAT, and Legal Metrology certified.",
    stat: "4+",
    statLabel: "Certifying Bodies"
  },
  {
    title: "Scalable Enterprise Architecture",
    description: "Runs the same for five vehicles or five thousand.",
    stat: "5000+",
    statLabel: "Vehicles Supported"
  },
  {
    title: "AI & IoT Integration",
    description: "Edge AI and cloud analytics turn data into insight.",
    stat: "AI",
    statLabel: "Edge Processing"
  },
  {
    title: "Nationwide Support",
    description: "1,600+ dealers for installation and after-sales service.",
    stat: "1,600+",
    statLabel: "Dealer Network"
  },
  {
    title: "Custom Deployment",
    description: "Configured to your fleet size and industry needs.",
    stat: "100%",
    statLabel: "Custom Fit"
  }
];

const AUTO_ADVANCE_MS = 3000;

export default function SolutionWhyChooseUs() {
  const { ref: sectionRef, visible } = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!visible || paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reasons.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [visible, paused, active]);

  const current = reasons[active];

  return (
    <section className="py-16 px-6 lg:px-8 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 14px)",
        }}
      />

      <div
        ref={sectionRef}
        style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        className={`relative max-w-7xl mx-auto transition-all ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="accent-bar text-2xl md:text-3xl font-black text-white mb-12">Why Choose Us</h2>

        <div
          className="grid lg:grid-cols-[1fr_1.1fr] gap-2 lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left: clickable reason list with progress-fill on the active row */}
          <div className="flex flex-col">
            {reasons.map((reason, i) => {
              const isActive = i === active;
              return (
                <button
                  key={reason.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="relative text-left py-4 border-b border-white/10 last:border-b-0 group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`shrink-0 text-xs font-black tracking-wider transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-white/30 group-hover:text-white/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base md:text-lg font-bold transition-all duration-300 ${
                        isActive ? "text-white translate-x-1" : "text-white/50 group-hover:text-white/75"
                      }`}
                    >
                      {reason.title}
                    </span>
                  </div>

                  {/* Progress-fill underline: sweeps left→right only on the active row, restarting on each auto-advance tick */}
                  <span className="absolute left-0 -bottom-px h-px w-full bg-white/0 overflow-hidden">
                    {isActive && (
                      <span
                        key={active}
                        className="block h-full bg-primary origin-left"
                        style={{
                          animationName: "whyChooseProgress",
                          animationDuration: `${AUTO_ADVANCE_MS}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel for the active reason, crossfades on change */}
          <div className="relative min-h-[280px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />

            <div key={active} className="relative animate-fade-slide-up">
              <span className="text-6xl md:text-7xl font-black text-primary/25 leading-none block mb-4">
                {current.stat}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary block mb-5">
                {current.statLabel}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 leading-snug">
                {current.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Dot pagination echoing the active index */}
            <div className="relative flex gap-2 mt-8">
              {reasons.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show reason ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
