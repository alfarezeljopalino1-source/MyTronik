"use client";

import React from "react";
import Link from "next/link";
import {
  ZapIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "./ui/icons";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 bg-[#090E1F] dark:bg-[#070C1A] text-white">
      {/* Background floral bokeh overlay matching screenshot */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* Radial lighting gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090E1F]/90 via-[#090E1F]/80 to-[#090E1F] dark:from-[#070C1A]/95 dark:via-[#070C1A]/90 dark:to-[#070C1A]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/10 dark:bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        {/* Top Pill Badge matching screenshot */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 shadow-sm">
          <ZapIcon className="w-3.5 h-3.5 text-slate-300" />
          <span>SISTEM VOUCHER OTOMATIS HARI LIBUR TETAP BUKA</span>
        </div>

        {/* Main Headline matching screenshot */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto font-sans">
          Akses Layanan{" "}
          <br className="hidden sm:inline" />
          Premium{" "}
          <span className="text-orange-500 font-black">
            Seketika.
          </span>
        </h1>

        {/* Subtitle matching screenshot */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Dapatkan akses instan ke hiburan favoritmu. Proses otomatis, pembayaran aman, dan voucher terkirim detik ini juga.
        </p>

        {/* CTA Buttons matching screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Orange primary button: Mulai Berlangganan -> */}
          <Link
            href="/produk"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-8 py-4 text-sm font-black tracking-wide text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Mulai Berlangganan</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>

          {/* Dark outline button: Tukarkan Voucher */}
          <Link
            href="/redeem"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-slate-900/60 hover:bg-slate-800/80 px-8 py-4 text-sm font-bold text-slate-200 hover:text-white backdrop-blur-md hover:border-white/40 transition-all cursor-pointer"
          >
            <span>Tukarkan Voucher</span>
          </Link>
        </div>
      </div>

      {/* Floating WhatsApp Widget on bottom right matching screenshot */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group">
        {/* Tooltip Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>BUTUH BANTUAN?</span>
        </div>

        {/* Green Circular WhatsApp Button */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Admin%20MyTronik,%20saya%20butuh%20bantuan%20layanan%20digital."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-transform group-hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Hubungi WhatsApp Customer Support"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </div>
    </section>
  );
}
