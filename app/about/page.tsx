"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TrustedClientsSection from "@/components/TrustedClientsSection";

interface TimelineEvent {
  year: string;
  desc: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1990",
    desc: "Beginnings in Transport Industry with a single vehicle on the road.",
    image: "/images/ourevalution/rectangle-700.png"
  },
  {
    year: "2000",
    desc: "Expanded operations into Safety Tools and specialized Equipment Distribution.",
    image: "/images/ourevalution/rectangle-720.png"
  },
  {
    year: "2009",
    desc: "Introduced speed governor systems (SLDs) and high-visibility reflective warning tapes.",
    image: "/images/ourevalution/rectangle-730.png"
  },
  {
    year: "2012",
    desc: "Integrated real-time GPS fleet tracking systems and multi-channel in-cabin vehicle cameras.",
    image: "/images/ourevalution/rectangle-740.png"
  },
  {
    year: "2015",
    desc: "Integrated software engineering division of 30+ developers to build web telematics.",
    image: "/images/ourevalution/rectangle-780.png"
  },
  {
    year: "2019",
    desc: "Established state-of-the-art SMT automotive PCB hardware manufacturing lines.",
    image: "/images/ourevalution/rectangle-1190.png"
  },
  {
    year: "2023",
    desc: "Global expansion footprint established across 10+ countries.",
    image: "/images/ourevalution/rectangle-840.png"
  },
  {
    year: "2025",
    desc: "Pioneered India's first AI-powered predictive fleet management assistant platform.",
    image: "/images/ourevalution/rectangle-850.png"
  }
];

function RoadmapCard({
  event,
  index,
  isActive,
  markerRef,
}: {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  markerRef: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  // The marker only lights up once the blue line has physically reached it —
  // isVisible just gates the initial reveal so it can't pop before it's on screen.
  const isPassed = isActive && isVisible;

  const imageTransition = {
    transitionDelay: isVisible ? "150ms" : "0ms",
  };

  return (
    <div
      ref={cardRef}
      style={{ transitionDuration: "800ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative py-12 md:py-16 transition-all transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-[0.97]"
      }`}
    >
      {/* 1. Desktop Left Content */}
      <div className={`md:col-span-5 ${isEven ? "md:order-1 text-right" : "md:order-1 text-left hidden md:block"}`}>
        {isEven && (
          <div className="space-y-4">
            <span className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              Milestone
            </span>
            <h4 className="text-3xl font-black text-navy">{event.year}</h4>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-md ml-auto">
              {event.desc}
            </p>
          </div>
        )}
        {!isEven && (
          <div
            style={imageTransition}
            className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src={event.image}
              alt={event.year}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
          </div>
        )}
      </div>

      {/* 2. Central Pin/Marker */}
      <div className="md:col-span-2 flex justify-center z-10 md:order-2">
        <div ref={markerRef} className="relative flex items-center justify-center w-12 h-12">
          {/* Gentle ripple ring for milestones already reached */}
          {isPassed && (
            <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping [animation-duration:2s]" />
          )}
          <div
            className={`relative w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${
              isPassed
                ? "bg-primary border-navy text-white shadow-lg shadow-primary/20 animate-milestone-pop"
                : "bg-slate-200 border-slate-300 text-navy"
            }`}
          >
            <span className="text-xs font-black">{event.year}</span>
          </div>
        </div>
      </div>

      {/* 3. Desktop Right Content */}
      <div className={`md:col-span-5 ${isEven ? "md:order-3 text-left hidden md:block" : "md:order-3 text-left"}`}>
        {isEven && (
          <div
            style={imageTransition}
            className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src={event.image}
              alt={event.year}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
          </div>
        )}
        {!isEven && (
          <div className="space-y-4">
            <span className="text-sm font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              Milestone
            </span>
            <h4 className="text-3xl font-black text-navy">{event.year}</h4>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-md">
              {event.desc}
            </p>
          </div>
        )}
      </div>

      {/* Mobile-only fallback visual image cards */}
      <div className="col-span-1 md:hidden space-y-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md mt-4">
          <Image
            src={event.image}
            alt={event.year}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const roadmapContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const markerElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const markerPercentsRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Buttery-smooth progress line: tracked outside React state via rAF so it
  // glides in lockstep with the scroll instead of lagging behind a CSS transition.
  // The same progress value drives which year markers are "reached", so the
  // blue line and the milestone that lights up are always perfectly in sync.
  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;
    let lastActiveIndex = -1;

    const measureMarkers = () => {
      const container = roadmapContainerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      markerPercentsRef.current = markerElsRef.current.map((el) => {
        if (!el) return 100;
        const r = el.getBoundingClientRect();
        const relativeY = r.top + r.height / 2 - containerRect.top;
        return (relativeY / containerRect.height) * 100;
      });
    };

    const updateTarget = () => {
      const container = roadmapContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = rect.height;

      // Target the viewport middle position to trigger road tracking
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Scrolled distance from timeline top limit
      const scrolledDistance = scrollPosition - containerTop;

      target = Math.max(0, Math.min(100, (scrolledDistance / containerHeight) * 100));
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.05) current = target;
      if (progressLineRef.current) {
        progressLineRef.current.style.height = `${current}%`;
      }

      // Count how many milestones the line has physically reached
      const percents = markerPercentsRef.current;
      let passedCount = 0;
      for (let i = 0; i < percents.length; i++) {
        if (current >= percents[i] - 1) passedCount++;
      }
      const newActiveIndex = passedCount - 1;
      if (newActiveIndex !== lastActiveIndex) {
        lastActiveIndex = newActiveIndex;
        setActiveIndex(newActiveIndex);
      }

      rafId = requestAnimationFrame(tick);
    };

    measureMarkers();
    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    window.addEventListener("resize", measureMarkers);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("resize", measureMarkers);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative w-full aspect-[21/9] min-h-[300px] md:min-h-[420px] bg-slate-950 flex items-center overflow-hidden border-b border-slate-100">
        <Image
          src="/images/about-hero-landscape.png"
          alt="APM - Engineering the Future of Innovation"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none" />
      </section>

      {/* 1. About Us Text & Image Split Section */}
      <section id="about-detail" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="accent-bar text-3xl md:text-4xl font-black text-navy uppercase">
              About Us
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                At APM, we are dedicated to transforming the automotive industry through cutting-edge IoT and hardware solutions. Our expertise lies in developing smart, high-performance technologies that enhance vehicle efficiency, safety, and connectivity. By combining innovation with deep domain knowledge, we create solutions that not only meet current market needs but also anticipate future demands.
              </p>
              <p>
                We pride ourselves on our commitment to quality and reliability. Every product we deliver undergoes rigorous testing and adheres to the highest standards to ensure superior performance in real-world conditions. Our strong network of trusted dealers further supports our mission, providing responsive service and support to customers across regions.
              </p>
              <p>
                At the core of our success is a collaborative, customer-centric approach. We work closely with clients to understand their unique challenges and craft tailored solutions that drive tangible results. With a passionate team of experts in both hardware and software, we’re building the future of intelligent mobility—together with our partners and customers.
              </p>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-sm">
            <Image
              src="/images/aboutusdetail/aboutimg.png"
              alt="APM R&D Engineers Group"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* 2. Green Safety for Sustainability Section */}
      <section className="py-24 px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="accent-bar text-3xl font-black text-navy uppercase">
              Green Safety for Sustainability
            </h3>
            <div className="space-y-4 text-slate-500 text-base leading-relaxed font-semibold">
              <p>
                APM Group is proud to partner with the Plant a Billion Trees Foundation, a global initiative focused on large-scale reforestation and environmental restoration.
              </p>
              <p>
                Through this meaningful collaboration, we are actively contributing to the preservation and revival of our planet’s forests—critical ecosystems that support biodiversity, regulate climate, and ensure a healthier future for generations to come.
              </p>
              <p>
                This partnership reflects APM’s deep-rooted commitment to sustainability and responsible innovation. As a technology-driven company, we recognize the importance of balancing industrial progress with environmental stewardship.
              </p>
            </div>

            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-extrabold">✓</span>
                <span>Awareness for the green movement.</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-extrabold">✓</span>
                <span>Awareness about carbon-neutral emissions.</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-extrabold">✓</span>
                <span>For every product sold, we give back to the planet.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-square w-full max-w-[400px] rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/greensafety/greensafety.png"
                alt="Green Safety for Sustainability"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-24 px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1.5px)] bg-[size:24px_24px] opacity-[0.02]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="accent-bar accent-bar-center text-3xl font-black text-navy uppercase">
              What Drives Us
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="relative bg-navy text-white rounded-3xl p-8 md:p-10 overflow-hidden shadow-xl border border-white/5 group">
              <div className="absolute top-6 right-6 opacity-[0.08] text-white pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <svg width="90" height="90" viewBox="0 0 120 98" fill="currentColor">
                  <path d="M41.9017 -1V32.7397C41.9003 35.9233 41.0625 39.0504 39.4727 41.8059C37.8829 44.5613 35.5973 46.8478 32.8461 48.4351L0 67.3228L19.6442 98L50.9702 79.8325C53.7181 78.2464 56.8329 77.4116 60.0032 77.4116C63.1736 77.4116 66.2884 78.2464 69.0362 79.8325L100.356 98L120 67.3228L87.141 48.4092C84.3885 46.8234 82.1018 44.5372 80.5118 41.7814C78.9218 39.0256 78.0848 35.8978 78.0854 32.7137V-1H41.9017Z" />
                </svg>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-amber-400 uppercase tracking-wide">Vision</h4>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium text-justify">
                  Looking ahead, we are committed to staying ahead of the curve and embracing emerging technologies to continue driving innovation in the automobile industry. Our dedicated team of experts constantly explores new avenues and methodologies to provide our customers with groundbreaking solutions that enable the vehicles of tomorrow.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative bg-navy text-white rounded-3xl p-8 md:p-10 overflow-hidden shadow-xl border border-white/5 group">
              <div className="absolute top-6 right-6 opacity-[0.08] text-white pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <svg width="90" height="90" viewBox="0 0 120 98" fill="currentColor">
                  <path d="M41.9017 -1V32.7397C41.9003 35.9233 41.0625 39.0504 39.4727 41.8059C37.8829 44.5613 35.5973 46.8478 32.8461 48.4351L0 67.3228L19.6442 98L50.9702 79.8325C53.7181 78.2464 56.8329 77.4116 60.0032 77.4116C63.1736 77.4116 66.2884 78.2464 69.0362 79.8325L100.356 98L120 67.3228L87.141 48.4092C84.3885 46.8234 82.1018 44.5372 80.5118 41.7814C78.9218 39.0256 78.0848 35.8978 78.0854 32.7137V-1H41.9017Z" />
                </svg>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-amber-400 uppercase tracking-wide">Mission</h4>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium text-justify">
                  To empower companies in the automobile industry with cutting-edge IoT solutions that enhance safety, improve efficiency, and optimize performance. We strive to create long-lasting partnerships with our clients, leveraging our experience, expertise, and reliable support to help them achieve their business goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center p-6 border border-slate-100 rounded-3xl bg-slate-50/50 space-y-3">
              <span className="text-3xl">💡</span>
              <h5 className="font-extrabold text-navy text-sm md:text-base">Innovation by Design</h5>
              <p className="text-xs text-slate-400">Building what is next, before it is expected</p>
            </div>
            <div className="text-center p-6 border border-slate-100 rounded-3xl bg-slate-50/50 space-y-3">
              <span className="text-3xl">🎯</span>
              <h5 className="font-extrabold text-navy text-sm md:text-base">Precision Execution</h5>
              <p className="text-xs text-slate-400">Hardware and software engineered to perfection</p>
            </div>
            <div className="text-center p-6 border border-slate-100 rounded-3xl bg-slate-50/50 space-y-3">
              <span className="text-3xl">🤝</span>
              <h5 className="font-extrabold text-navy text-sm md:text-base">Customer-First</h5>
              <p className="text-xs text-slate-400">Solutions tailored, support personalized</p>
            </div>
            <div className="text-center p-6 border border-slate-100 rounded-3xl bg-slate-50/50 space-y-3">
              <span className="text-3xl">🛡️</span>
              <h5 className="font-extrabold text-navy text-sm md:text-base">Rooted in Legacy</h5>
              <p className="text-xs text-slate-400">Generations of transport industry trust</p>
            </div>
            <div className="text-center p-6 border border-slate-100 rounded-3xl bg-slate-50/50 space-y-3">
              <span className="text-3xl">🚀</span>
              <h5 className="font-extrabold text-navy text-sm md:text-base">Impact-Driven</h5>
              <p className="text-xs text-slate-400">Everything we do moves the world forward</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Evolution Section (Scroll-Reveal Road Map with Dynamic Blue Progress Line) */}
      <section id="evolution" className="py-24 px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h3 className="accent-bar accent-bar-center text-3xl font-black text-navy uppercase">
              Our Evolution
            </h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto mt-4 font-semibold">
              Our journey in the transport industry since 1990 has transformed into a tech-powered legacy.
            </p>
          </div>

          {/* Road Map Container */}
          <div ref={roadmapContainerRef} className="relative mt-20">
            {/* Dashed vertical center line (Gray base track) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 z-0 hidden md:block" />

            {/* Dynamic scroll progress blue line overlay — height driven by rAF for a buttery, lag-free glide */}
            <div
              ref={progressLineRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 rounded-full bg-gradient-to-b from-primary to-navy shadow-[0_0_12px_rgba(47,143,239,0.5)] z-0 hidden md:block"
              style={{ height: "0%" }}
            />

            {/* Timelines list */}
            <div className="space-y-4 md:space-y-0">
              {timelineEvents.map((evt, idx) => (
                <RoadmapCard
                  key={evt.year}
                  event={evt}
                  index={idx}
                  isActive={idx <= activeIndex}
                  markerRef={(el) => (markerElsRef.current[idx] = el)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trusted by Clients Across Industries (Right-to-Left Marquee) */}
      <TrustedClientsSection />
    </main>
  );
}
