"use client";

import React, { useState } from "react";
import { PRODUCTS, formatRupiah } from "@/data/mock-data";
import { BrandKey, PlanCategoryType, PlanVariant } from "@/types";
import ProductOrderModal from "./ProductOrderModal";
import ScrollReveal from "./ui/ScrollReveal";
import {
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
  ZapIcon,
  CheckIcon,
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "./ui/icons";

export default function UnifiedPackageSelector() {
  const [selectedBrand, setSelectedBrand] = useState<BrandKey>("netflix");
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<PlanCategoryType>("harian");
  const [selectedVariantId, setSelectedVariantId] = useState<string>("net-1d");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const currentProduct =
    PRODUCTS.find((p) => p.brandKey === selectedBrand) || PRODUCTS[0];

  // Filter variants berdasarkan kategori (harian vs hemat)
  const availableVariants = currentProduct.planVariants.filter(
    (v) => v.categoryType === selectedCategoryType
  );

  // Active variant yang dipilih pengguna
  const activeVariant: PlanVariant =
    availableVariants.find((v) => v.id === selectedVariantId) ||
    availableVariants[0] ||
    currentProduct.planVariants[0];

  const brandList: {
    key: BrandKey;
    name: string;
    tagline: string;
    icon: React.ReactNode;
    color: string;
    activeBorder: string;
    activeBg: string;
  }[] = [
    {
      key: "netflix",
      name: "Netflix 4K UHD",
      tagline: "Profil Privat PIN • Anti On-Hold",
      icon: <NetflixIcon className="w-5 h-5" />,
      color: "#E50914",
      activeBorder: "border-red-500 ring-2 ring-red-500/30",
      activeBg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      key: "spotify",
      name: "Spotify Premium",
      tagline: "Bebas Iklan • Audio 320kbps",
      icon: <SpotifyIcon className="w-5 h-5" />,
      color: "#1DB954",
      activeBorder: "border-emerald-500 ring-2 ring-emerald-500/30",
      activeBg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      key: "capcut",
      name: "CapCut Pro",
      tagline: "Ekspor 4K 60fps • Auto-Caption AI",
      icon: <CapCutIcon className="w-5 h-5" />,
      color: "#00F2FE",
      activeBorder: "border-cyan-500 ring-2 ring-cyan-500/30",
      activeBg: "bg-cyan-50 dark:bg-cyan-950/30",
    },
    {
      key: "canva",
      name: "Canva Pro",
      tagline: "100M+ Aset VIP • 1TB Cloud",
      icon: <CanvaIcon className="w-5 h-5" />,
      color: "#7D2AE8",
      activeBorder: "border-purple-500 ring-2 ring-purple-500/30",
      activeBg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  const handleBrandChange = (brand: BrandKey) => {
    setSelectedBrand(brand);
    const prod = PRODUCTS.find((p) => p.brandKey === brand);
    if (prod) {
      const matchVars = prod.planVariants.filter(
        (v) => v.categoryType === selectedCategoryType
      );
      if (matchVars.length > 0 && matchVars[0].id) {
        setSelectedVariantId(matchVars[0].id);
      }
    }
  };

  const handleCategoryTypeChange = (type: PlanCategoryType) => {
    setSelectedCategoryType(type);
    const matchVars = currentProduct.planVariants.filter(
      (v) => v.categoryType === type
    );
    if (matchVars.length > 0 && matchVars[0].id) {
      setSelectedVariantId(matchVars[0].id);
    }
  };

  return (
    <section
      id="pilih-paket"
      className="py-16 lg:py-24 relative overflow-hidden bg-slate-100/70 dark:bg-gradient-to-b dark:from-[#0A1128] dark:via-[#0E1733] dark:to-[#0A1128] border-y border-slate-200 dark:border-slate-800 transition-colors duration-250"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-xs font-bold text-sky-700 dark:text-sky-300 mb-3">
              <SparklesIcon className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              <span>Pusat Konfigurasi Paket Mandiri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Semua Paket Menjadi Satu,{" "}
              <span className="bg-gradient-to-r from-sky-500 via-emerald-500 to-indigo-500 dark:from-sky-400 dark:via-emerald-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Anda Bebas Menentukan Pilihan
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
              Pilih aplikasi favorit, tentukan durasi harian super murah (mulai Rp1.500*) atau bulanan hemat, dan nikmati aktivasi kilat 5-10 menit bergaransi penuh.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selector Steps */}
          <ScrollReveal delay={100} distance={60} threshold={0.08} className="lg:col-span-7">
            <div className="space-y-8 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-2xl">
            {/* Step 1: Pilih Aplikasi */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Langkah 1: Pilih Aplikasi
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">4 Layanan Utama</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {brandList.map((brand) => {
                  const isSelected = selectedBrand === brand.key;
                  return (
                    <button
                      key={brand.key}
                      type="button"
                      onClick={() => handleBrandChange(brand.key)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? `${brand.activeBorder} ${brand.activeBg} shadow-md`
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center mb-3">
                        {brand.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                          {brand.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {brand.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pilih Tipe Paket (Harian vs Bulanan/Hemat) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Langkah 2: Pilih Tipe Paket
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {selectedCategoryType === "harian" ? "⚡ Paket Harian Fleksibel" : "💎 Paket Bulanan & Hemat"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleCategoryTypeChange("harian")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedCategoryType === "harian"
                      ? "bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <ZapIcon className="w-4 h-4 text-amber-300" />
                  <span>Paket Harian (1 - 7 Hari) • Super Murah</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategoryTypeChange("hemat")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedCategoryType === "hemat"
                      ? "bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <StarIcon className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Paket Bulanan & Hemat (1 Bln - 1 Thn)</span>
                </button>
              </div>
            </div>

            {/* Step 3: Pilih Durasi Spesifik */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Langkah 3: Tentukan Durasi Pilihan Anda
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {availableVariants.length} Opsi Tersedia
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableVariants.map((variant) => {
                  const isSelected = activeVariant.id === variant.id;
                  return (
                    <div
                      key={variant.id || variant.duration}
                      onClick={() => {
                        if (variant.id) setSelectedVariantId(variant.id);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-sky-50 dark:bg-sky-500/15 border-sky-500 ring-2 ring-sky-500/30 shadow-md"
                          : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {variant.duration}
                          </span>
                          {variant.savingsLabel && (
                            <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 px-2 py-0.5 rounded-full">
                              {variant.savingsLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {variant.description || "Akses fitur penuh bergaransi"}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
                        <div>
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {formatRupiah(variant.samplePrice)}
                          </span>
                          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">*</span>
                        </div>
                        {variant.sampleOriginalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatRupiah(variant.sampleOriginalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Live Order Summary Card */}
          <ScrollReveal delay={250} distance={60} threshold={0.08} className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-gradient-to-b dark:from-[#101A38] dark:to-[#0A1128] p-6 sm:p-7 shadow-xl dark:shadow-2xl shadow-slate-200/60 dark:shadow-blue-950/60 backdrop-blur-xl">
              {/* Summary Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Ringkasan Pilihan Anda
                  </span>
                </div>
              </div>

              {/* Selected Plan Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider block">
                      Aplikasi Terpilih:
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {currentProduct.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Durasi: <strong className="text-slate-900 dark:text-white">{activeVariant.duration}</strong>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0">
                    {currentProduct.brandKey === "netflix" && <NetflixIcon className="w-5 h-5" />}
                    {currentProduct.brandKey === "spotify" && <SpotifyIcon className="w-5 h-5" />}
                    {currentProduct.brandKey === "capcut" && <CapCutIcon className="w-5 h-5" />}
                    {currentProduct.brandKey === "canva" && <CanvaIcon className="w-5 h-5" />}
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold tracking-wider">
                      Total Biaya:
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {formatRupiah(activeVariant.samplePrice)}
                      </span>
                      <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">*</span>
                    </div>
                    {activeVariant.sampleOriginalPrice && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                        Hemat {formatRupiah(activeVariant.sampleOriginalPrice - activeVariant.samplePrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                      {activeVariant.savingsLabel || "Termurah"}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                      {currentProduct.deliveryType}
                    </span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2 pt-1 text-xs">
                  {currentProduct.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Guarantees */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Garansi Purna Jual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ZapIcon className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                    <span>Aktivasi 5-10 Menit</span>
                  </div>
                </div>


                {/* Order Action Button */}
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
                >
                  <ZapIcon className="w-4 h-4" />
                  <span>Lanjut Pemesanan Pilihan Ini</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Product Order Modal Checkout Flow */}
      <ProductOrderModal
        product={currentProduct}
        initialVariantIndex={
          currentProduct.planVariants.findIndex((v) => v.id === activeVariant.id) !== -1
            ? currentProduct.planVariants.findIndex((v) => v.id === activeVariant.id)
            : 0
        }
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  );
}
