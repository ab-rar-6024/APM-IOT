"use client";

import type { ApplicationCard } from "@/lib/solutions-data";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useTilt } from "@/lib/useTilt";

interface SolutionApplicationsProps {
  applications: ApplicationCard[];
  images?: string[];
  solutionName: string;
}

function ApplicationCardItem({ app, index }: { app: ApplicationCard; index: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 2) * 90}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 hover:bg-white hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
      <h3 className="relative text-sm font-black text-navy mb-2">{app.title}</h3>
      <p className="relative text-sm text-slate-500 leading-relaxed">{app.description}</p>
    </div>
  );
}

function TiltImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const { ref: tiltRef, style, glare, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);
  const { ref: revealRef, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      style={{
        transitionDelay: visible ? `${index * 120}ms` : "0ms",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...style, transformStyle: "preserve-3d" }}
        className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-primary/95 px-2.5 py-1 rounded">
            Live Environment
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SolutionApplications({
  applications,
  images,
  solutionName,
}: SolutionApplicationsProps) {
  const hasImages = images && images.length > 0;
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-16 px-6 lg:px-8 bg-white border-t border-slate-100/80">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`max-w-2xl mb-12 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-4">
            Real-World Applications
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Here's how this solution operates across different business environments.
          </p>
        </div>

        <div className={`grid gap-10 lg:gap-16 ${hasImages ? "lg:grid-cols-[1fr_400px]" : ""}`}>
          {/* Applications list */}
          <div className="grid sm:grid-cols-2 gap-5 h-fit">
            {applications.map((app, i) => (
              <ApplicationCardItem key={app.title} app={app} index={i} />
            ))}
          </div>

          {/* Images column, mouse-tracked 3D tilt per image */}
          {hasImages && (
            <div className="flex flex-col gap-6 h-full justify-start">
              {images.map((imgSrc, index) => (
                <TiltImage
                  key={index}
                  src={imgSrc}
                  alt={`${solutionName} application environment ${index + 1}`}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
