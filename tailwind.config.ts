import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#173A75",
        primary: "#2F8FEF",
        surface: "#F5F7FA",
        border: "#E4E9F1",
        ent: {
          primary: "#0F4C81",
          secondary: "#2563EB",
          accent: "#F59E0B",
          bg: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "grid-drift": "gridDrift 20s linear infinite",
        "fade-slide-up": "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "milestone-pop": "milestonePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "marquee-left": "marqueeLeft 28s linear infinite",
        "marquee-right": "marqueeRight 32s linear infinite",
        "stamp-in": "stampIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "floatSlow 13s ease-in-out infinite",
        "ripple": "ripple 0.6s ease-out forwards",
        "text-reveal": "textReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scan-bar": "scanBar 0.85s cubic-bezier(0.4, 0, 0.2, 1) both",
        "dot-pulse": "dotPulseGlow 2.4s ease-in-out infinite",
        "orbit": "orbit 28s linear infinite",
        "orbit-slow": "orbit 48s linear infinite",
        "orbit-reverse": "orbitReverse 48s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gridDrift: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "64px 64px" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        milestonePop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        stampIn: {
          "0%": { opacity: "0", transform: "scale(1.5)", filter: "blur(8px)" },
          "60%": { opacity: "1", transform: "scale(0.96)", filter: "blur(0px)" },
          "100%": { opacity: "1", transform: "scale(1)", filter: "blur(0px)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(48px) rotateY(-12deg) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateX(0) rotateY(0deg) scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-48px) rotateY(12deg) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateX(0) rotateY(0deg) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(28px) scale(1.06)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.45" },
          "100%": { transform: "scale(3.2)", opacity: "0" },
        },
        textReveal: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        scanBar: {
          "0%": { left: "0%", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        dotPulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(47,143,239,0.55)" },
          "50%": { boxShadow: "0 0 0 7px rgba(47,143,239,0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        orbitReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
