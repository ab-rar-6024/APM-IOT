"use client";

import Link from "next/link";
import Image from "next/image";
import type { Solution } from "@/lib/solutions-data";
import { useTilt } from "@/lib/useTilt";

export default function SolutionHero({ solution }: { solution: Solution }) {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#0F2857]" />
      <div
        className="absolute inset-0 opacity-[0.06] animate-grid-drift"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight animate-fade-slide-up"
            style={{ animationDelay: "0ms" }}
          >
            {solution.name}
            {!solution.name.endsWith("Solutions") && " Solutions"}
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-xl mb-10 animate-fade-slide-up"
            style={{ animationDelay: "90ms" }}
          >
            {solution.tagline}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-slide-up" style={{ animationDelay: "180ms" }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-navy bg-white hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Get Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        <div
          className="relative hidden lg:block animate-fade-slide-up"
          style={{ animationDelay: "220ms" }}
        >
          {/* Subtle glow behind the panel */}
          <div className="absolute -inset-1.5 rounded-[1.8rem] bg-gradient-to-tr from-primary/30 to-[#2F8FEF]/0 blur-xl opacity-40" />

          {/* Glassmorphic dashboard browser mockup, mouse-tracked 3D tilt */}
          <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ ...style, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/3] w-full max-w-2xl mx-auto rounded-[1.5rem] overflow-hidden border border-white/15 bg-navy/40 backdrop-blur-md shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] will-change-transform"
          >
            {/* Mockup Top Header */}
            <div className="h-9 border-b border-white/10 bg-white/[0.03] flex items-center px-4 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="ml-2 text-[10px] tracking-wider uppercase font-semibold text-white/35">Live Operations Portal</span>
            </div>

            {/* Content pane containing the real-time image */}
            <div className="relative w-full h-[calc(100%-2.25rem)]">
              <Image
                src={solution.heroImage}
                alt={`${solution.name} real-time system`}
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover"
                priority
              />
              {/* Mouse-tracked glare sweep */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: glare.opacity,
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
