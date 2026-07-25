"use client";

import Link from "next/link";
import Image from "next/image";
import { useTilt } from "@/lib/useTilt";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function CategoryCard({
  href,
  image,
  name,
  tagline,
  index,
}: {
  href: string;
  image: string;
  name: string;
  tagline: string;
  index: number;
}) {
  const { ref: tiltRef, style, glare, onMouseMove, onMouseLeave } = useTilt<HTMLAnchorElement>(5);
  const { ref: revealRef, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <Link
        ref={tiltRef}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...style, transformStyle: "preserve-3d" }}
        className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)] aspect-[4/3] w-full will-change-transform"
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={index < 2}
        />

        {/* Base scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/5" />

        {/* Glassmorphism overlay panel */}
        <div className="relative m-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/25">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
            }}
          />
          <div className="relative flex items-end justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">{name}</h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-sm">{tagline}</p>
            </div>
            <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white text-navy transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-45">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
