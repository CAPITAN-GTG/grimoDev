"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black text-white shadow-lg border-b border-white/10 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-sm font-normal text-white/90 truncate">
          Ready to get more customers? Let&apos;s talk.
        </p>
        <Link
          href="#contact"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-yellow-100 text-black px-4 py-2 font-semibold text-sm tracking-widest uppercase transition-all duration-200 hover:bg-yellow-200"
        >
          <Mail className="w-4 h-4" />
          Get Your Free Demo
        </Link>
      </div>
    </div>
  );
}
