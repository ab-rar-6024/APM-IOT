"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

interface CapabilityPhase {
  step: string;
  title: string;
  subtitle: string;
  colorClass: string;
  accentBorder: string;
  accentShadow: string;
  accentText: string;
  accentDot: string;
  accentRgb: string;
  items: string[];
}

const phases: CapabilityPhase[] = [
  {
    step: "01",
    title: "Concept & Design",
    subtitle: "R&D & Engineering",
    colorClass: "from-blue-500 to-cyan-500 shadow-blue-500/20",
    accentBorder: "border-blue-500",
    accentShadow: "shadow-blue-500/20",
    accentText: "text-blue-600",
    accentDot: "bg-blue-500",
    accentRgb: "59,130,246",
    items: [
      "Product Research & Development",
      "Industrial Product Design",
      "Electronic Hardware Design",
      "PCB Design & Development",
      "Mechanical System Design"
    ]
  },
  {
    step: "02",
    title: "Software & Cloud",
    subtitle: "Embedded to Enterprise",
    colorClass: "from-purple-500 to-indigo-500 shadow-purple-500/20",
    accentBorder: "border-purple-500",
    accentShadow: "shadow-purple-500/20",
    accentText: "text-purple-600",
    accentDot: "bg-purple-500",
    accentRgb: "168,85,247",
    items: [
      "Embedded Firmware Development",
      "Linux & RTOS Development",
      "Android & iOS App Development",
      "Web & Cloud Platform Dev",
      "AI & IoT Integration"
    ]
  },
  {
    step: "03",
    title: "Prototype & Build",
    subtitle: "Testing & Assembly",
    colorClass: "from-teal-500 to-emerald-500 shadow-teal-500/20",
    accentBorder: "border-teal-500",
    accentShadow: "shadow-teal-500/20",
    accentText: "text-teal-600",
    accentDot: "bg-teal-500",
    accentRgb: "20,184,166",
    items: [
      "Prototype Development",
      "Product Testing & Validation",
      "SMT PCB Assembly",
      "Product Assembly Line",
      "Quality Assurance & Test"
    ]
  },
  {
    step: "04",
    title: "Deploy & Support",
    subtitle: "Compliance & Lifecycle",
    colorClass: "from-orange-500 to-amber-500 shadow-orange-500/20",
    accentBorder: "border-orange-500",
    accentShadow: "shadow-orange-500/20",
    accentText: "text-orange-600",
    accentDot: "bg-orange-500",
    accentRgb: "249,115,22",
    items: [
      "Product Certification Support",
      "Installation & Deployment",
      "Annual Maintenance (AMC)",
      "Lifecycle Support Operations"
    ]
  }
];

/** Reveals its children with a smooth scroll-linked entrance the moment they scroll into view. */
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

function PhaseCard({
  phase,
  index,
  autoActive,
}: {
  phase: CapabilityPhase;
  index: number;
  autoActive: boolean;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 50, y: 50 });

  // Real cursor hover OR the one-time automatic showcase both render the
  // same "highlighted" look — only the 3D tilt needs real cursor coordinates.
  const active = isHovered || autoActive;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tiltTransform = isHovered
    ? `perspective(1000px) rotateX(${(50 - tilt.y) / 10}deg) rotateY(${(tilt.x - 50) / 10}deg) translateY(-10px) scale3d(1.03, 1.03, 1.03)`
    : undefined;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: visible ? `${(index % 4) * 100}ms` : "0ms",
        transitionDuration: active ? "500ms" : "800ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transform: tiltTransform,
      }}
      className={`group relative bg-white rounded-3xl border p-8 flex flex-col justify-between z-10 transform-gpu will-change-transform transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${active ? `${phase.accentBorder} shadow-2xl ${phase.accentShadow}` : "border-slate-200/80 shadow-sm"}`}
    >
      {/* Ambient glow halo that blooms on hover (or the one-time auto showcase) */}
      <div
        className={`pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br ${phase.colorClass} blur-xl transition-opacity duration-500 ${
          active ? "opacity-25" : "opacity-0"
        }`}
      />

      {/* Cursor-tracked spotlight (real hover only — needs pointer coordinates) */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(220px circle at ${tilt.x}% ${tilt.y}%, rgba(${phase.accentRgb},0.16), transparent 70%)`,
          }}
        />
      )}

      <div className="space-y-6 relative">
        {/* Step Badge with pulse ring + spin-in on hover */}
        <div className="flex items-center justify-between">
          <span className="relative flex w-11 h-11">
            <span
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${phase.colorClass} animate-ping transition-opacity duration-300 ${
                active ? "opacity-40" : "opacity-0"
              }`}
            />
            <span
              className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${phase.colorClass} flex items-center justify-center font-black text-white text-sm shadow-md transition-transform duration-500 ${
                active ? "rotate-[360deg] scale-110" : "rotate-0"
              }`}
            >
              {phase.step}
            </span>
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Phase
          </span>
        </div>

        {/* Phase Titles */}
        <div className="space-y-1">
          <span
            className={`text-sm uppercase font-extrabold tracking-wider transition-colors duration-300 ${
              active ? phase.accentText : "text-primary"
            }`}
          >
            {phase.subtitle}
          </span>
          <h4 className="text-2xl md:text-[1.7rem] font-black text-navy leading-snug">
            {phase.title}
          </h4>
        </div>

        {/* Staggered Checklist */}
        <ul className="space-y-3 pt-2">
          {phase.items.map((item, i) => (
            <li
              key={item}
              className={`flex items-start gap-2.5 text-sm md:text-base font-semibold transition-all duration-300 ${
                active ? "text-navy translate-x-1" : "text-navy/70"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Custom checkmark dot, glows when active */}
              <span
                className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 transition-all duration-300 ${
                  active ? `${phase.accentDot} scale-150` : "bg-slate-300"
                }`}
                style={active ? { boxShadow: `0 0 8px rgba(${phase.accentRgb},0.8)` } : undefined}
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card bottom details */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 relative">
        <span>Lifecycle stage</span>
        <span className={`transition-colors duration-300 ${active ? phase.accentText : "text-slate-300"}`}>
          Ready
        </span>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: lineRef, visible: lineVisible } = useScrollReveal<HTMLDivElement>();
  const [autoActiveIndex, setAutoActiveIndex] = useState(-1);

  // One-time automatic showcase: right after the cards finish entering,
  // spotlight each one in turn (the same look as a real hover) so the
  // interaction is discoverable without the user having to move the cursor.
  useEffect(() => {
    if (!lineVisible) return;
    const stepMs = 900;
    const startDelayMs = 1000;
    const timers = phases.map((_, i) =>
      setTimeout(() => setAutoActiveIndex(i), startDelayMs + i * stepMs)
    );
    timers.push(setTimeout(() => setAutoActiveIndex(-1), startDelayMs + phases.length * stepMs));
    return () => timers.forEach(clearTimeout);
  }, [lineVisible]);

  return (
    <section className="landing-snap-section py-24 px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background grid, slowly drifting */}
      <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-[0.03] animate-grid-drift" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title Block, glides in as it scrolls into view */}
        <div
          ref={headerRef}
          style={{
            transitionDuration: "800ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className={`text-center mb-20 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy mb-4 inline-block">
            Core Capabilities
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4 font-semibold text-sm md:text-base leading-relaxed">
            One team, one roof — from first sketch to shipped hardware.
          </p>
        </div>

        {/* Pipeline timeline layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector timeline line for desktop, draws in as it scrolls into view */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[52px] left-12 right-12 h-0.5 bg-slate-200 z-0 overflow-hidden rounded-full"
          >
            <div
              className={`h-full w-full origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transition-transform duration-[1400ms] ease-out ${
                lineVisible ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            />
          </div>

          {phases.map((phase, index) => (
            <PhaseCard
              key={phase.step}
              phase={phase}
              index={index}
              autoActive={autoActiveIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
