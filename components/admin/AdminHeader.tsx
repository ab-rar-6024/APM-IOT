"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader({ title }: { title: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/admin" className="font-black text-base sm:text-lg tracking-tight shrink-0">
            APM Admin
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <Link href="/admin" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/new" className="hover:text-white transition-colors">
              New Post
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <span className="hidden md:block text-sm text-slate-400">{title}</span>
          <button
            onClick={handleLogout}
            className="text-xs font-bold uppercase tracking-wide px-3 sm:px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-colors shrink-0"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
