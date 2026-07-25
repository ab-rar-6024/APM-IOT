import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  label?: string;
  variant?: "glass" | "light" | "outline";
  className?: string;
}

export default function BackButton({
  href,
  label = "Back",
  variant = "light",
  className = "",
}: BackButtonProps) {
  const variantStyles = {
    glass:
      "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white shadow-sm hover:shadow-lg hover:shadow-black/10",
    light:
      "bg-slate-100/90 hover:bg-navy text-slate-700 hover:text-white border border-slate-200/80 hover:border-navy shadow-xs hover:shadow-md",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 hover:text-primary border border-slate-300 hover:border-primary/50 shadow-2xs hover:shadow-xs",
  };

  const iconVariantStyles = {
    glass: "text-white/80 group-hover:text-white",
    light: "text-slate-500 group-hover:text-white",
    outline: "text-slate-400 group-hover:text-primary",
  };

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 active:scale-95 ${variantStyles[variant]} ${className}`}
    >
      <ArrowLeft
        className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1 ${iconVariantStyles[variant]}`}
      />
      <span>{label}</span>
    </Link>
  );
}

