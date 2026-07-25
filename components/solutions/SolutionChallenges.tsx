"use client";

import Image from "next/image";
import type { ChallengeItem } from "@/lib/solutions-data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useTilt } from "@/lib/useTilt";

function ChallengeCard({ item, index }: { item: ChallengeItem; index: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 2) * 90}ms` : "0ms",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Diagonal light sheen sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />

      <div className="relative flex items-start gap-4">
        <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500 font-black text-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-sm font-black text-navy mb-1.5">{item.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function SolutionChallenges({
  challenges,
  topicImage,
}: {
  challenges: ChallengeItem[];
  topicImage?: string;
}) {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageWrapRef, visible: imageVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: tiltRef, style: tiltStyle, glare, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(7);

  return (
    <section className="py-16 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          style={{ transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`max-w-2xl mb-12 transition-all ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-4">Industry Challenges</h2>
          <p className="text-slate-500 leading-relaxed">
            Businesses in this space consistently run into the same operational blockers.
          </p>
        </div>

        <div className={`grid gap-10 lg:gap-12 ${topicImage ? "lg:grid-cols-[1fr_360px]" : ""}`}>
          <div className="grid sm:grid-cols-2 gap-5 h-fit">
            {challenges.map((item, i) => (
              <ChallengeCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {topicImage && (
            <div
              ref={imageWrapRef}
              style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              className={`hidden lg:block sticky top-24 transition-all ${
                imageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`}
            >
              <div
                ref={tiltRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white will-change-transform"
              >
                <Image
                  src={topicImage}
                  alt="Industry challenges this solution addresses"
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
