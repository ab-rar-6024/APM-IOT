"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** Reveals its element with a scroll-triggered entrance the moment it enters the viewport. */
function useScrollReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
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
      { threshold: 0.15, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  desc: string;
  image: string;
}

const blogsData: BlogPost[] = [
  {
    id: 1,
    title: "The AIS-140 Standard: Navigating the Regulations for Indian Commercial Fleets",
    category: "Regulations",
    date: "June 25, 2026",
    readTime: "5 min read",
    desc: "Understanding what AIS-140 compliance entails, why the government mandated it, and how to choose the right certified tracking hardware for your transport vehicles.",
    image: "/images/verticals/frame-7113.png"
  },
  {
    id: 2,
    title: "Why Fleet Operators are Switching to Embedded IoT M2M eSIMs",
    category: "Connectivity",
    date: "May 18, 2026",
    readTime: "4 min read",
    desc: "Traditional SIM cards fail in extreme highway environments. Discover how soldered M2M eSIM cards solve connection drops and prevent tampering.",
    image: "/images/verticals/frame-7117.png"
  },
  {
    id: 3,
    title: "Maximizing Safety in Heavy Transport: The Role of Auto Dipper Sensors",
    category: "Safety",
    date: "April 10, 2026",
    readTime: "6 min read",
    desc: "Highway glare is a major cause of night-time collisions in India. Learn how light-adaptive auto dippers improve safety and reduce fatigue for long-haul drivers.",
    image: "/images/verticals/frame-7116.png"
  },
  {
    id: 4,
    title: "The Evolution of Automated Vehicle Fitness Lanes (ATS)",
    category: "Infrastructure",
    date: "March 12, 2026",
    readTime: "7 min read",
    desc: "Emissions, brake checking, and alignment can now be verified in minutes. Explore the technology behind government-mandated ATS testing lanes.",
    image: "/images/verticalb2g/frame-7119.png"
  },
  {
    id: 5,
    title: "Understanding High Security Registration Plates (HSRP)",
    category: "Regulations",
    date: "February 28, 2026",
    readTime: "5 min read",
    desc: "HSRP is now mandatory across several states in India. Learn about the security features, the chromium hologram, laser etching, and snap locks.",
    image: "/images/verticals/frame-7122.png"
  },
  {
    id: 6,
    title: "Driving License Automation: How Sensor Tracks Work",
    category: "Infrastructure",
    date: "January 15, 2026",
    readTime: "8 min read",
    desc: "RTO tracks are getting sensor upgrades. Discover how inductive loops and camera vision software grade driving license applicants without human bias.",
    image: "/images/verticalb2g/frame-7120.png"
  }
];

const categories = ["All", "Regulations", "Connectivity", "Safety", "Infrastructure"];

function BlogCard({ blog }: { blog: BlogPost }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{ transitionDuration: "500ms" }}
      className={`group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:border-primary/40 hover:shadow-md ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-6">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-contain p-4"
        />
        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-navy text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md shadow-navy/20">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
          <h3 className="text-lg font-bold text-navy leading-snug transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {blog.desc}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:text-navy">
            Read Full Post
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogsData.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-navy mb-4 tracking-tight">
            Blogs & Articles
          </h1>
          <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed">
            Stay up to date with the latest innovations, compliance standards, and tech insights in the automotive IoT and road safety industries.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
          {/* Categories Tabbar */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-navy text-white shadow-md shadow-navy/10"
                    : "bg-white text-navy/70 border border-slate-200 hover:border-navy/20 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white shadow-sm transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <svg
              className="w-12 h-12 text-slate-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-bold text-navy mb-2">No articles found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any articles matching your search query. Try switching categories or clearing search keywords.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
