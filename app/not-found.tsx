import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | APM Group",
};

export default function NotFound() {
  return (
    <main className="relative min-h-[88vh] bg-navy overflow-hidden flex items-center justify-center px-6 py-24">
      {/* Dot grid backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,#2F8FEF_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.07] pointer-events-none"
      />
      {/* Ambient glow orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-navy/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center animate-fade-slide-up">
        {/* Radar / lost-signal visual */}
        <div className="relative w-56 h-56 mx-auto mb-10">
          <span className="absolute inset-0 rounded-full border border-primary/25" />
          <span className="absolute inset-6 rounded-full border border-primary/15" />
          <span className="absolute inset-12 rounded-full border border-primary/10" />

          <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping [animation-duration:2.5s]" />
          <span className="absolute inset-0 rounded-full border-2 border-primary/25 animate-ping [animation-duration:2.5s] [animation-delay:0.8s]" />

          {/* Rotating radar sweep */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden animate-[orbit_3s_linear_infinite]"
            style={{
              background: "conic-gradient(from 0deg, rgba(47,143,239,0.6), transparent 30%)",
            }}
          />

          {/* Center APM mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/layoutimg/apm-mark.png"
              alt="APM"
              width={72}
              height={72}
              className="w-16 h-16 animate-logo-glow animate-milestone-pop"
              priority
            />
          </div>
        </div>

        <h1 className="text-[5.5rem] sm:text-[8rem] leading-none font-black text-white tracking-tight animate-glitch">
          404
        </h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Signal Lost
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto font-semibold">
          We couldn&apos;t lock onto this route. The page you&apos;re looking for has moved, been renamed, or never existed.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-lg font-bold text-sm text-navy bg-white hover:bg-slate-100 transition-colors shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="px-7 py-3.5 rounded-lg font-bold text-sm text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
