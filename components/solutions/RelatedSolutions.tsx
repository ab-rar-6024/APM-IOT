import Link from "next/link";
import Image from "next/image";
import type { Solution } from "@/lib/solutions-data";

export default function RelatedSolutions({
  solutions,
  currentSlug
}: {
  solutions: Solution[];
  currentSlug: string;
}) {
  const others = solutions.filter((s) => s.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="py-16 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="accent-bar text-2xl md:text-3xl font-black text-navy mb-10">
          Explore Other Solutions
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group flex flex-col h-full rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="relative aspect-[16/10] bg-white flex items-center justify-center p-6 border-b border-slate-100">
                <Image
                  src={s.heroImage}
                  alt={s.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-base font-bold text-navy mb-2">{s.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1 line-clamp-2">
                  {s.tagline}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-navy transition-colors">
                  Explore Solution
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
