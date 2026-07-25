"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  location: string;
  logo: string;
  quote: string;
}

const slides: Testimonial[][] = [
  [
    {
      name: "SRM University",
      location: "Chennai",
      logo: "/images/testimonials/srm.svg",
      quote:
        "APM Group's speed governor solutions have been instrumental in optimizing the expertise in managing speed control has been invaluable."
    },
    {
      name: "CEAT Ltd",
      location: "Maharashtra",
      logo: "/images/testimonials/ceat.svg",
      quote:
        "APM's AIS 140 compliance solutions have streamlined our fleet management, ensuring seamless integration and regulatory adherence."
    },
    {
      name: "IPLT | Murugappa Group",
      location: "Tamil Nadu",
      logo: "/images/testimonials/iplt.svg",
      quote:
        "We appreciate APM's support in managing loads efficiently using Prime Load monitoring system. Their solutions have significantly improved our operational capacity."
    }
  ],
  [
    {
      name: "RB ECO Power",
      location: "Chennai, Gujarat",
      logo: "/images/testimonials/rb-eco-power.png",
      quote:
        "Their IoT devices have revolutionized our operations, providing real-time insights and enhancing productivity."
    },
    {
      name: "Rolls-Royce",
      location: "Delhi",
      logo: "/images/testimonials/rolls-royce.png",
      quote:
        "APM's service support has been exceptional. They have consistently delivered high-quality assistance, ensuring our operations run smoothly."
    },
    {
      name: "Vedanta",
      location: "Maharashtra",
      logo: "/images/testimonials/vedanta.png",
      quote:
        "The IoT module provided by APM has been a game changer for our connectivity needs, ensuring reliable and efficient communication across our facilities."
    }
  ],
  [
    {
      name: "Ashok Leyland",
      location: "Tamil Nadu",
      logo: "/images/testimonials/ashok-leyland.png",
      quote:
        "APM's tracking solutions have been a game changer for us. Their government-certified devices are user friendly and reliable."
    },
    {
      name: "Ramco",
      location: "Andhra Pradesh",
      logo: "/images/testimonials/ramco.png",
      quote:
        "The APM team has been exceptional in delivering quality services. Their dedication to customer satisfaction is commendable!"
    },
    {
      name: "Vel's Group of Institutes",
      location: "Chennai",
      logo: "/images/testimonials/vels.png",
      quote:
        "APM's CCTV solutions have enhanced our security infrastructure, while their reflective stickers have improved visibility and safety on our premises."
    }
  ]
];

export default function CustomersSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <section id="customers" className="landing-snap-section py-24 px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy uppercase tracking-tight">
            Voice of Trust
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4 font-semibold text-sm md:text-base leading-relaxed">
            Real stories from trusted partners who rely on APM Group for safety, performance, and dependable support.
          </p>
        </div>

        {/* Header row with pagination dots */}
        <div className="flex items-center justify-between mb-10 mt-14">
          <h4 className="text-xl md:text-2xl font-black text-navy">What our customers are saying</h4>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Show testimonials group ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === i ? "w-8 bg-primary" : "w-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial grid */}
        <div key={activeSlide} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-slide-up">
          {slides[activeSlide].map((t) => (
            <div key={t.name} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                  <Image src={t.logo} alt={t.name} fill sizes="40px" className="object-contain p-1" />
                </div>
                <div>
                  <h5 className="text-sm font-extrabold text-navy leading-tight">{t.name}</h5>
                  <span className="text-xs text-slate-400 font-semibold">{t.location}</span>
                </div>
              </div>

              <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200/60 p-6">
                <p className="text-sm text-slate-600 font-semibold leading-relaxed">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
