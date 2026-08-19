"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { productCategories, categoryImages } from "@/lib/product-categories";
import { solutionCategories } from "@/lib/solution-categories";
import { CategoryIcon } from "@/lib/category-icons";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Certificate", href: "/certifications" },
  { label: "blogs", href: "/blogs" },
  { label: "news", href: "/news" }
];

function LanguageSelector() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"en" | "ar">("en");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Helper to read cookie
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Helper to set cookie
  const setCookie = (name: string, value: string, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}${expires}; path=/;`;
  };

  // Initialize Google Translate
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const id = "google-translate-script";
    if (!document.getElementById(id)) {
      const addScript = document.createElement("script");
      addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
      addScript.setAttribute("id", id);
      document.body.appendChild(addScript);
    }

    // Belt-and-suspenders for the CSS rules in globals.css: Google injects
    // its top banner iframe directly into <body> asynchronously and only
    // tags it with `.goog-te-banner-frame` a moment later (once the iframe's
    // own cross-origin content finishes loading), so a CSS class selector
    // alone leaves a brief flash of the banner/logo while it's un-classed.
    // Hide any translate iframe the instant it's inserted, before that class
    // ever gets applied.
    const hideTranslateChrome = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;
      const isBanner =
        (el.tagName === "IFRAME" && (el.getAttribute("src") || "").includes("translate.google")) ||
        el.classList.contains("goog-te-banner-frame") ||
        el.classList.contains("skiptranslate");
      if (isBanner) {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("height", "0", "important");
      }
    };
    document.querySelectorAll("iframe, .skiptranslate").forEach(hideTranslateChrome);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) hideTranslateChrome(node);
        });
      }
      document.body.style.top = "0px";
    });
    observer.observe(document.body, { childList: true });

    // Set current language from cookie on mount
    const trans = getCookie("googtrans");
    if (trans && trans.includes("/ar")) {
      setCurrentLang("ar");
    } else {
      setCurrentLang("en");
    }

    return () => observer.disconnect();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle client-side routing translation persistence
  useEffect(() => {
    const reapplyTranslation = () => {
      const trans = getCookie("googtrans");
      const targetLang = trans && trans.includes("/ar") ? "ar" : "en";
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (selectEl && selectEl.value !== targetLang) {
        selectEl.value = targetLang;
        selectEl.dispatchEvent(new Event("change"));
      }
    };

    // Recheck after dynamic routing finishes rendering
    const timer = setTimeout(reapplyTranslation, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLangChange = (lang: "en" | "ar") => {
    setCookie("googtrans", `/en/${lang}`);
    setCurrentLang(lang);
    setLangOpen(false);

    const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative notranslate" translate="no" ref={dropdownRef}>
      {/* Hidden mount element for Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-navy hover:text-primary hover:bg-slate-50 border border-slate-200/80 transition-all duration-300 active:scale-[0.98]"
      >
        <svg
          className="w-4 h-4 shrink-0 text-navy/70 group-hover:text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.54-1.037-7.614-2.766M19.686 7.5a11.96 11.96 0 00-1.843-2.918m-11.686 2.92A11.963 11.963 0 0112 10.5"
          />
        </svg>
        <span className="uppercase tracking-wide">{currentLang === "en" ? "English" : "العربية"}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {langOpen && (
        <div className="absolute right-0 mt-2.5 w-40 bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-2.5 z-[100] animate-[fadeIn_0.2s_ease-out] flex flex-col gap-1">
          <button
            onClick={() => handleLangChange("en")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              currentLang === "en" ? "bg-primary/10 text-primary" : "text-navy hover:bg-slate-50"
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLangChange("ar")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-between ${
              currentLang === "ar" ? "bg-primary/10 text-primary" : "text-navy hover:bg-slate-50"
            }`}
          >
            <span>العربية</span>
            <span className="text-[10px] text-slate-400 font-semibold">(Arabic)</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Small close-delay so a brief gap/flicker while moving the cursor from the
  // trigger into the flyout panel doesn't snap the dropdown shut mid-hover.
  const solutionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSolutions = () => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    setSolutionsOpen(true);
  };
  const scheduleCloseSolutions = () => {
    solutionsCloseTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
  };
  const openProducts = () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    setProductsOpen(true);
  };
  const scheduleCloseProducts = () => {
    productsCloseTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
      if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = item.href.replace(/^\/?#/, "");
      if (pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(item.href);
      }
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* Main menu */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 items-center h-20">
          
          {/* Column 1: Real Brand Logo (Left-aligned) */}
          <div className="col-span-6 lg:col-span-3 flex justify-start">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Image
                src="/images/layoutimg/apm-logo-1.png"
                alt="APM Group Logo"
                width={140}
                height={40}
                className="object-contain w-auto h-10"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Column 2: Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex col-span-6 justify-center items-center gap-8 h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.label === "Solutions") {
                return (
                  <div
                    key={item.label}
                    className="relative z-20 h-full flex items-center"
                    onMouseEnter={openSolutions}
                    onMouseLeave={scheduleCloseSolutions}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
                        setSolutionsOpen((prev) => !prev);
                      }}
                      className={`flex items-center gap-1.5 text-sm font-bold tracking-wide uppercase transition-colors relative py-2 group ${
                        isActive || solutionsOpen ? "text-primary" : "text-navy/70 hover:text-primary"
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-center"
                        }`}
                      />
                    </button>

                    {/* Flyout — exactly the 4 solution categories, no individual solutions listed */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ease-out origin-top ${
                        solutionsOpen
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"
                      }`}
                    >
                      <div className="w-[760px] bg-white rounded-3xl border border-slate-200 shadow-[0_30px_70px_rgba(15,23,42,0.18)] grid grid-cols-2 gap-x-6 gap-y-1 p-4">
                        {(() => {
                          const filtered = solutionCategories.filter(
                            (c) => c.slug !== "printing-identification-solutions"
                          );
                          const ordered = [
                            filtered[0], // Left 1
                            filtered[3], // Right 1
                            filtered[1], // Left 2
                            filtered[4], // Right 2
                            filtered[2], // Left 3
                            filtered[5]  // Right 3
                          ].filter(Boolean);
                          return ordered.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/solutions/${c.slug}`}
                              onClick={() => setSolutionsOpen(false)}
                              className="group/item flex items-center gap-3.5 px-3 py-3 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/70 transition-all duration-300 hover:translate-x-0.5"
                            >
                              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-100/80 text-navy/70 group-hover/item:bg-primary/10 group-hover/item:text-primary group-hover/item:border-primary/20 transition-all duration-300 group-hover/item:scale-105">
                                <CategoryIcon id={c.slug} className="w-5.5 h-5.5" />
                              </span>
                              <div className="flex flex-col text-left flex-1 min-w-0">
                                <span className="text-[11.5px] font-extrabold uppercase tracking-wide leading-tight text-navy group-hover/item:text-primary transition-colors truncate">
                                  {c.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium mt-0.5 leading-snug truncate">
                                  {c.tagline}
                                </span>
                              </div>
                            </Link>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.label === "Products") {
                return (
                  <div
                    key={item.label}
                    className="relative z-20 h-full flex items-center"
                    onMouseEnter={openProducts}
                    onMouseLeave={scheduleCloseProducts}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item);
                        setProductsOpen(false);
                      }}
                      className={`flex items-center gap-1.5 text-sm font-bold tracking-wide uppercase transition-colors relative py-2 group ${
                        isActive || productsOpen ? "text-primary" : "text-navy/70 hover:text-primary"
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-center"
                        }`}
                      />
                    </Link>

                    {/* Mega menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ease-out origin-top ${
                        productsOpen
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"
                      }`}
                    >
                      <div className="w-[1080px] bg-white rounded-3xl border border-slate-200 shadow-[0_30px_70px_rgba(15,23,42,0.18)] p-5 grid grid-cols-7 gap-3">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            onClick={() => setProductsOpen(false)}
                            className="group/item flex flex-col items-center gap-2.5 px-1 py-3.5 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/70 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <span className="flex items-center justify-center w-18 h-18 rounded-2xl bg-slate-50 border border-slate-100 group-hover/item:bg-primary/5 group-hover/item:border-primary/20 transition-all duration-300 group-hover/item:scale-105 overflow-hidden">
                              <Image
                                src={categoryImages[cat.id]}
                                alt={cat.label}
                                width={52}
                                height={52}
                                className="object-contain transition-transform duration-500 group-hover/item:scale-110"
                                style={{ width: "auto", height: "auto" }}
                              />
                            </span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wide leading-tight text-navy group-hover/item:text-primary transition-colors text-center">
                              {cat.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-bold tracking-wide uppercase transition-colors relative py-2 group ${
                    isActive ? "text-primary" : "text-navy/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {/* Smooth scaling underline from origin-center */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-center"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Column 3: Contact Button & Language Selector (Right-aligned) */}
          <div className="hidden lg:flex col-span-3 justify-end items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-navy hover:bg-primary hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98] transition-all duration-300"
            >
              Contact us
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile Toggle Button */}
          <div className="col-span-6 lg:hidden flex justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-navy transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-navy transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-navy transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Fades and slides down smoothly) */}
      <div
        style={{ maxHeight: menuOpen ? "calc(100vh - 5rem)" : "0px" }}
        className={`lg:hidden transition-all duration-500 ease-in-out bg-white border-t border-slate-100 ${
          menuOpen ? "opacity-100 overflow-y-auto" : "opacity-0 overflow-hidden pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navItems.map((item) => {
            if (item.label === "Solutions") {
              return (
                <div key={item.label} className="border-b border-slate-50">
                  <div className="flex items-center justify-between py-2.5">
                    <button
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      className="text-base font-bold text-navy/80 hover:text-primary transition-colors uppercase tracking-wide"
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      aria-label="Toggle solutions"
                      className="p-2"
                    >
                      <svg
                        className={`w-4 h-4 text-navy/60 transition-transform duration-300 ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileSolutionsOpen ? "max-h-[400px] opacity-100 pb-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {solutionCategories
                        .filter((c) => c.slug !== "printing-identification-solutions")
                        .map((c) => (
                        <Link
                          key={c.slug}
                          href={`/solutions/${c.slug}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileSolutionsOpen(false);
                          }}
                          className="flex items-center gap-3 text-sm font-semibold text-navy/60 hover:text-primary py-2 transition-colors"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                            <CategoryIcon id={c.slug} className="w-4 h-4" />
                          </span>
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (item.label === "Products") {
              return (
                <div key={item.label} className="border-b border-slate-50">
                  <div className="flex items-center justify-between py-2.5">
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="text-base font-bold text-navy/80 hover:text-primary transition-colors uppercase tracking-wide"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      aria-label="Toggle product categories"
                      className="p-2"
                    >
                      <svg
                        className={`w-4 h-4 text-navy/60 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileProductsOpen ? "max-h-[400px] opacity-100 pb-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.id}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileProductsOpen(false);
                          }}
                          className="flex items-center gap-3 text-sm font-semibold text-navy/60 hover:text-primary py-2 transition-colors"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 shrink-0 overflow-hidden">
                            <Image
                              src={categoryImages[cat.id]}
                              alt={cat.label}
                              width={22}
                              height={22}
                              className="object-contain"
                              style={{ width: "auto", height: "auto" }}
                            />
                          </span>
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="block text-base font-bold text-navy/80 hover:text-primary py-2.5 border-b border-slate-50 transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center mt-6 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-navy hover:bg-primary transition-colors shadow-md"
          >
            Contact us
          </Link>
          <div className="flex justify-center mt-4">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
