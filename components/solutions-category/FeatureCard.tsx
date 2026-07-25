"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function FeatureCard({
  image,
  title,
  description,
  index,
}: {
  image: string;
  title: string;
  description: string;
  index: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 3) * 80}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-primary/30 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 500px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-black text-navy mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2">{description}</p>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary self-start"
        >
          Explore Solution
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-90" : "group-hover:translate-x-1.5"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

        {expanded && (
          <div className="mt-5 -mx-6 -mb-6 border-t border-slate-100 bg-slate-50/60 p-6">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <Image
                src={image}
                alt={`${title} real-time application`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 700px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
