"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ZapIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  StarIcon,
  WhatsAppIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";
import { PRODUCTS, formatRupiah } from "@/data/mock-data";
import { BrandKey } from "@/types";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onSelectBrand?: (brand: BrandKey | null) => void;
}

export default function HeroSection({
  onExploreClick,
  onSelectBrand,
}: HeroSectionProps) {
  const [activeBrand, setActiveBrand] = useState<BrandKey>("netflix");

  const currentProduct =
    PRODUCTS.find((p) => p.brandKey === activeBrand) || PRODUCTS[0];

  const brandTabs: {
    key: BrandKey;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "netflix", label: "Netflix", icon: <NetflixIcon className="w-4 h-4" /> },
    { key: "spotify", label: "Spotify", icon: <SpotifyIcon className="w-4 h-4" /> },
    { key: "capcut", label: "CapCut", icon: <CapCutIcon className="w-4 h-4" /> },
    { key: "canva", label: "Canva", icon: <CanvaIcon className="w-4 h-4" /> },
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 lg:pt-18 lg:pb-24 transition-colors duration-250">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-orange-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Proposition & Feature CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge (Feature Concept: Automated 24/7 delivery) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 shadow-sm">
              <ZapIcon className="w-3.5 h-3.5" />
              <span>SISTEM VOUCHER OTOMATIS • HARI LIBUR TETAP BUKA 24/7</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Akses Layanan Digital{" "}
              <br className="hidden sm:inline" />
              Premium{" "}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Seketika & Bergaransi.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Dapatkan akses instan ke hiburan dan tools kreatif favoritmu. Tersedia pilihan paket harian fleksibel mulai Rp1.500* hingga bulanan hemat dengan garansi purna jual penuh.
            </p>

            {/* Two Core Action Buttons matching screenshot concepts */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Primary CTA: Mulai Berlangganan */}
              <Link
                href="/produk"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Mulai Berlangganan</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              {/* Secondary CTA: Tukarkan Voucher */}
              <Link
                href="/redeem"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all cursor-pointer"
              >
                <span>Tukarkan Voucher</span>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500">
                  <StarIcon className="w-4 h-4 fill-amber-500" />
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">2.400+ Pelanggan</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-orange-500">
                  <ZapIcon className="w-4 h-4" />
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">5-10 Mnt</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Aktivasi Kilat</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-emerald-500">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">100% Aman</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Full Garansi Akun</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Card for Core Services */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative">
              <div className="animate-float rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-gradient-to-b dark:from-[#101935] dark:to-[#0A1128] p-6 shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-blue-950/60 relative overflow-hidden backdrop-blur-xl">
                {/* Brand Tabs Header */}
                <div className="flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 mb-5">
                  {brandTabs.map((tab) => {
                    const isActive = activeBrand === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveBrand(tab.key);
                          onSelectBrand?.(tab.key);
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isActive
                            ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent hover:bg-slate-200/60 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Card details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                      {currentProduct.badge || "BEST SELLER"}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{currentProduct.stockStatus}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {currentProduct.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {currentProduct.tagline}
                    </p>
                  </div>

                  {/* Price box with daily starting price */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold tracking-wider">
                        Harga Harian Mulai Dari:
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                          {formatRupiah(currentProduct.planVariants[0].samplePrice)}
                        </span>
                        <span className="text-[10px] font-mono text-orange-500">*</span>
                      </div>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                        *Paket {currentProduct.planVariants[0].duration}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                        {currentProduct.planVariants[0].savingsLabel || "Termurah"}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                        {currentProduct.deliveryType}
                      </span>
                    </div>
                  </div>

                  {/* CTA directly to dedicated /produk page or self-selector */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href="/produk"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-500/20"
                    >
                      <span>Lihat Paket {currentProduct.brandKey.toUpperCase()}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Widget on bottom right matching screenshot */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>BUTUH BANTUAN?</span>
        </div>

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
