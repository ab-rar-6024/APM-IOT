import Link from "next/link";

export interface PrevNextEntry {
  label: string;
  href: string;
}

export default function PrevNextSolution({
  previous,
  next,
}: {
  previous?: PrevNextEntry;
  next?: PrevNextEntry;
}) {
  if (!previous && !next) return null;

  return (
    <section className="py-10 px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-4">
        {previous ? (
          <Link
            href={previous.href}
            className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-primary group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-0.5">Previous</span>
              <span className="block text-sm font-black text-navy group-hover:text-primary transition-colors truncate">{previous.label}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-primary/30 hover:shadow-lg transition-all text-right"
          >
            <div className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-0.5">Next</span>
              <span className="block text-sm font-black text-navy group-hover:text-primary transition-colors truncate">{next.label}</span>
            </div>
            <svg className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
