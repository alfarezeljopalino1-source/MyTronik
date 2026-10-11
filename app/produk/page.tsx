"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailModal from "@/components/ProductDetailModal";
import ProductOrderModal from "@/components/ProductOrderModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRODUCTS, formatRupiah } from "@/data/mock-data";
import { Product, BrandKey } from "@/types";
import {
  SearchIcon,
  BoxIcon,
  CheckIcon,
  ZapIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export default function ProdukPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<BrandKey | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  // State checkout order modal
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [orderVariantIndex, setOrderVariantIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Selected duration filter for each card: map productId -> variantIndex
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  const brandFilterTabs: { key: BrandKey | null; label: string }[] = [
    { key: null, label: "SEMUA LAYANAN" },
    { key: "netflix", label: "NETFLIX" },
    { key: "canva", label: "CANVA" },
    { key: "capcut", label: "CAPCUT" },
    { key: "spotify", label: "SPOTIFY" },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedBrand && item.brandKey !== selectedBrand) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brandKey.toLowerCase().includes(q);
        const matchTag = item.tagline.toLowerCase().includes(q);
        const matchDesc = item.shortDescription.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchTag && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedBrand, searchQuery]);

  const handleOpenOrder = (prod: Product, variantIdx: number) => {
    setOrderModalProduct(prod);
    setOrderVariantIndex(variantIdx);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      {/* 1. Shared Navbar */}
      <Navbar />

      {/* 2. Main Dedicated Product Catalog matching Screenshot #2 */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Section matching Screenshot #2 */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Semua{" "}
              <span className="text-orange-500">
                Paket Premium.
              </span>
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Temukan berbagai pilihan layanan hiburan terbaik dengan harga yang transparan dan proses instan.
            </p>
          </div>

          {/* Large Rounded Search Bar matching Screenshot #2 */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/40 p-1.5 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
              <SearchIcon className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Produk"
                className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                className="shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-300 hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 transition-all cursor-pointer"
              >
                SEARCH
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {brandFilterTabs.map((tab) => {
              const isSelected = selectedBrand === tab.key;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setSelectedBrand(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Product Cards Grid matching Screenshot #2 Card Style */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const currentVariantIdx = selectedVariants[product.id] ?? 0;
                const activeVariant =
                  product.planVariants[currentVariantIdx] || product.planVariants[0];

                return (
                  <ScrollReveal
                    key={product.id}
                    delay={index * 130}
                    distance={55}
                    className="h-full flex flex-col"
                  >
                    <div
                      className="group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-slate-200/50 dark:shadow-black/30 h-full"
                    >
                    <div>
                      {/* Top Row: Peach circular container with Box icon + BEST SELLER badge matching screenshot */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-inner group-hover:scale-105 transition-transform">
                          <BoxIcon className="w-7 h-7" />
                        </div>

                        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 shadow-sm">
                          {product.badge || "BEST SELLER"}
                        </span>
                      </div>

                      {/* Brand Title matching Screenshot #2 (e.g. Netflix, CANVA, CAPCUT) */}
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-sans">
                        {product.brandKey === "netflix"
                          ? "Netflix"
                          : product.brandKey === "canva"
                          ? "CANVA"
                          : product.brandKey === "capcut"
                          ? "CAPCUT"
                          : "Spotify"}
                      </h2>

                      {/* Subtitle matching Screenshot #2: ⚡ PREMIUM SERVICE */}
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-500 mt-1 mb-4">
                        <ZapIcon className="w-3.5 h-3.5" />
                        <span>PREMIUM SERVICE</span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {/* Duration Selector Tabs inside card (Paket Harian vs Bulanan) */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-500 dark:text-slate-400">Pilihan Durasi:</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            {activeVariant.categoryType === "harian" ? "⚡ Paket Harian" : "💎 Paket Hemat"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {product.planVariants.map((variant, idx) => {
                            const isSelected = currentVariantIdx === idx;
                            return (
                              <button
                                key={variant.id || variant.duration}
                                type="button"
                                onClick={() =>
                                  setSelectedVariants((prev) => ({
                                    ...prev,
                                    [product.id]: idx,
                                  }))
                                }
                                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border cursor-pointer ${
                                  isSelected
                                    ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white"
                                }`}
                              >
                                {variant.duration}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Features bullets */}
                      <div className="mt-4 space-y-2">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">
                          Harga ({activeVariant.duration}):
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xl font-black text-slate-900 dark:text-white">
                            {formatRupiah(activeVariant.samplePrice)}
                          </span>
                          <span className="text-[10px] font-mono text-orange-500">*</span>
                        </div>
                        {activeVariant.sampleOriginalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatRupiah(activeVariant.sampleOriginalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalProduct(product);
                            setActiveVariantIndex(currentVariantIdx);
                          }}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                          Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenOrder(product, currentVariantIdx)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all cursor-pointer"
                        >
                          <span>BELI</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tidak ada produk yang cocok dengan pencarian &quot;{searchQuery}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrand(null);
                }}
                className="mt-3 px-4 py-2 rounded-full text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/40 border border-orange-300 dark:border-orange-800 cursor-pointer"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating WhatsApp Widget */}
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

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        initialVariantIndex={activeVariantIndex}
        onClose={() => setActiveModalProduct(null)}
        onOrderNow={(prod, variantIdx) => {
          setActiveModalProduct(null);
          handleOpenOrder(prod, variantIdx);
        }}
      />

      {/* Product Order Modal (Checkout Flow) */}
      <ProductOrderModal
        product={orderModalProduct}
        initialVariantIndex={orderVariantIndex}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* 3. Shared Footer */}
      <Footer />
    </div>
  );
}
