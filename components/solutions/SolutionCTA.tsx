"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function SolutionCTA({ solutionName }: { solutionName: string }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 px-6 lg:px-8 bg-navy relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />

      <div
        ref={ref}
        style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        className={`relative max-w-2xl mx-auto text-center transition-all ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          Ready to Transform Your {solutionName}?
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          Talk to our solution experts to design a customized system for your business.
        </p>
        <Link
          href="/contact"
          className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-navy bg-white hover:bg-primary hover:text-white hover:scale-[1.03] transition-all duration-300"
        >
          <span className="absolute inset-0 rounded-xl bg-white/40 animate-ping [animation-duration:2.5s]" />
          <span className="relative">Request Consultation</span>
        </Link>
      </div>
    </section>
  );
}
