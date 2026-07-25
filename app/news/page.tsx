"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Reveals its element with a scroll-triggered entrance the moment it enters the viewport. */
function useScrollReveal<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  location: string;
  desc: string;
  image: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "APM Group Achieves ARAI Certification for Next-Generation Speed Limiters",
    date: "June 10, 2026",
    location: "Pune, India",
    desc: "APM Group's latest iteration of speed limitation devices has officially cleared the ARAI testing criteria, certifying it for immediate rollout across all commercial transport categories in several states.",
    image: "/images/verticalb2c/frame-7113.png"
  },
  {
    id: 2,
    title: "Nationwide Fitment & Service Network Reaches 1,600+ Certified Dealers",
    date: "May 02, 2026",
    location: "New Delhi, India",
    desc: "To support mandatory HSRP fitment and AIS-140 GPS compliance installations, APM Group has certified 150 new authorized partner points, pushing our total active dealer network count past 1,600 nodes nationwide.",
    image: "/images/verticals/frame-7114.png"
  },
  {
    id: 3,
    title: "Launching the Rover View Edge AI Driver Drowsiness Platform",
    date: "March 20, 2026",
    location: "Bengaluru, India",
    desc: "Rover View, our latest edge AI hardware module, has been officially launched. The camera uses advanced computer vision algorithms to predict and flag driver drowsiness and distraction in real-time.",
    image: "/images/verticals/frame-7123.png"
  },
  {
    id: 4,
    title: "State-of-the-Art Automated ATS Testing Lanes Deployed in Southern States",
    date: "January 08, 2026",
    location: "Hyderabad, India",
    desc: "Two new automated testing lanes have gone live under government public-private partnerships. The lanes integrate emissions, suspension, and brake tests, linking data directly to the central licensing databases.",
    image: "/images/verticalb2g/frame-7119.png"
  }
];

function NewsCard({ item, isEven }: { item: NewsItem; isEven: boolean }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDuration: "500ms" }}
      className={`relative flex flex-col md:flex-row items-stretch gap-8 md:gap-12 pl-12 md:pl-0 transition-all ${
        isEven ? "md:flex-row-reverse" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-2.5 md:left-1/2 top-4 w-3.5 h-3.5 rounded-full bg-primary border-4 border-white shadow-md -translate-x-1/2 z-10" />

      {/* Left/Right space allocation */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
            <span>{item.date}</span>
            <span>•</span>
            <span className="text-primary">{item.location}</span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-navy leading-snug">
            {item.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Graphic wrapper */}
      <div className="md:w-1/2 flex items-center justify-center bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-hidden aspect-[16/10]">
        <div className="relative w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain p-4"
          />
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-navy mb-4 tracking-tight">
            News & Press Releases
          </h1>
          <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed">
            Follow APM Group milestones, regulatory approvals, infrastructure expansion announcements, and new compliance hardware developments.
          </p>
        </div>

        {/* News timeline/list layout */}
        <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {newsData.map((item, index) => (
            <NewsCard key={item.id} item={item} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </main>
  );
}
