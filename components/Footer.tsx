"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { solutionCategories } from "@/lib/solution-categories";
import { productCategories } from "@/lib/product-categories";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: Record<string, FooterLink[]> = {
  Company: [
    { label: "Corporate Profile", href: "/about" },
    { label: "Certifications", href: "/certifications" },
    { label: "Global Presence", href: "/about#evolution" },
    { label: "Careers", href: "/contact" },
  ],
  Solutions: solutionCategories.map((c) => ({ label: c.name, href: `/solutions/${c.slug}` })),
  Products: productCategories.map((c) => ({ label: c.label, href: `/products?category=${c.id}` })),
  Support: [
    { label: "Dealer Network", href: "/contact" },
    { label: "Support", href: "/contact" },
    { label: "Installation & Deployment", href: "/contact" },
    { label: "AMC & Lifecycle Support", href: "/contact" },
    { label: "Download Brochure", href: "/contact" },
  ],
  Customers: [
    { label: "B2B Business Solutions", href: "/#customers" },
    { label: "B2C Individual Tech", href: "/#customers" },
    { label: "B2G Government Tech", href: "/#customers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Contact Information", href: "/contact" },
  ],
};

const bottomLinks: FooterLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socials = [
  { icon: "facebook-f", href: "https://www.facebook.com/people/APM/61572877825509/", label: "Facebook" },
  { icon: "linkedin-in", href: "https://www.linkedin.com/company/103372063/", label: "LinkedIn" },
  { icon: "instagram", href: "https://www.instagram.com/apmgroup_/", label: "Instagram" },
  { icon: "youtube", href: "https://www.youtube.com/channel/UCdwsr-Si04OiaKKs4s3cHIA", label: "YouTube" },
  { icon: "x-twitter", href: "https://x.com/APMGROUP_", label: "X (Twitter)" },
];

const WHATSAPP_MESSAGE = "Hi, I saw your website and I'd like one just like this (APM).";
const AIKONIK_NUMBERS = [
  { display: "9042272801", wa: "919042272801" },
  { display: "8122922605", wa: "918122922605" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.replace(/^\/?#/, "");
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // else: let Next.js Link navigate to "/" and land on the hash naturally
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setActiveNumber(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer id="contact" className="relative z-10 bg-navy">
      {/* Logo row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 flex justify-center">
        <Link href="/" className="group animate-logo-float">
          <Image
            src="/images/layoutimg/apm-logo-white.png"
            alt="APM Group Logo"
            width={140}
            height={40}
            className="object-contain w-auto h-11 animate-logo-glow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 border-t border-white/10 pt-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-white/50 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-12">
          {socials.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
            >
              <i className={`fa-brands fa-${social.icon}`} aria-hidden />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            Copyright © {new Date().getFullYear()}, APM. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-white/40 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Footer — agency attribution + WhatsApp contact */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div
          ref={contactRef}
          className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-500"
        >
          <span>© {new Date().getFullYear()} AIKONIK</span>
          <span className="text-slate-300">|</span>
          <span className="flex flex-wrap items-center justify-center gap-1.5">
            <span>Contact:</span>
            <i className="fa-brands fa-whatsapp text-[#25D366]" aria-hidden />
            {AIKONIK_NUMBERS.map((n, i) => (
              <span key={n.wa} className="relative flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveNumber(activeNumber === n.wa ? null : n.wa)}
                  className="text-[#25D366] font-semibold hover:underline"
                >
                  {n.display}
                </button>

                {/* Call / WhatsApp choice popover */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 flex flex-col gap-1 bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeNumber === n.wa
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <a
                    href={`tel:+${n.wa}`}
                    onClick={() => setActiveNumber(null)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-navy hover:bg-slate-50 whitespace-nowrap transition-colors"
                  >
                    <i className="fa-solid fa-phone" aria-hidden /> Call
                  </a>
                  <a
                    href={`https://wa.me/${n.wa}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setActiveNumber(null)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-[#25D366] hover:bg-slate-50 whitespace-nowrap transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp
                  </a>
                </div>

                {i < AIKONIK_NUMBERS.length - 1 && <span className="text-slate-300">/</span>}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
