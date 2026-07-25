"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useTilt } from "@/lib/useTilt";

interface SolutionOverviewProps {
  overview: string[];
  imageSrc: string;
  solutionName: string;
  /** Overrides the default "Overview" heading. */
  heading?: string;
  /** Small label above the floating metrics card, e.g. "Automated Test Checklist:". */
  metricsTitle?: string;
  /** When provided, renders a floating checklist card over the image (top-right). */
  metrics?: string[];
}

export default function SolutionOverview({
  overview,
  imageSrc,
  solutionName,
  heading = "Overview",
  metricsTitle,
  metrics,
}: SolutionOverviewProps) {
  // Reduce text content: only take the first two paragraphs
  const reducedOverview = overview.slice(0, 2);
  const { ref: textRef, visible: textVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageWrapRef, visible: imageVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: tiltRef, style: tiltStyle, glare, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(7);

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        {/* Text column */}
        <div
          ref={textRef}
          style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`transition-all ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-8">
            {heading}
          </h2>
          <div className="space-y-6">
            {reducedOverview.map((paragraph, i) =>
              i === 0 ? (
                <p key={i} className="relative pl-5 text-navy text-lg md:text-xl leading-relaxed font-bold border-l-4 border-primary">
                  {paragraph}
                </p>
              ) : (
                <p key={i} className="text-slate-500 text-base leading-relaxed">
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>

        {/* Image column, mouse-tracked 3D tilt */}
        <div
          ref={imageWrapRef}
          style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`transition-all ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
        >
          <div
            ref={tiltRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white will-change-transform"
          >
            <Image
              src={imageSrc}
              alt={`${solutionName} real-time usage`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
              }}
            />

            {metrics && metrics.length > 0 && (
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-[min(78%,17rem)] rounded-xl bg-white/95 backdrop-blur-sm border border-slate-100 shadow-lg p-4 sm:p-5">
                {metricsTitle && (
                  <p className="text-xs sm:text-sm font-bold text-navy mb-3">{metricsTitle}</p>
                )}
                <ul className="space-y-2.5">
                  {metrics.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
