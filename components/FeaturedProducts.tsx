"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, BrandKey } from "@/types";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import ProductOrderModal from "./ProductOrderModal";
import ScrollReveal from "./ui/ScrollReveal";
import {
  FilterIcon,
  SearchIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
  ArrowRightIcon,
} from "./ui/icons";

interface FeaturedProductsProps {
  products: Product[];
  selectedBrand: BrandKey | null;
  onSelectBrand: (brand: BrandKey | null) => void;
  searchQuery: string;
}

export default function FeaturedProducts({
  products,
  selectedBrand,
  onSelectBrand,
  searchQuery,
}: FeaturedProductsProps) {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    null
  );
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [orderVariantIndex, setOrderVariantIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const brandTabs: {
    key: BrandKey | null;
    label: string;
    icon?: React.ReactNode;
  }[] = [
    { key: null, label: `Semua Paket (${products.length})` },
    {
      key: "netflix",
      label: "Netflix 4K",
      icon: <NetflixIcon className="w-3.5 h-3.5" />,
    },
    {
      key: "spotify",
      label: "Spotify",
      icon: <SpotifyIcon className="w-3.5 h-3.5" />,
    },
    {
      key: "capcut",
      label: "CapCut Pro",
      icon: <CapCutIcon className="w-3.5 h-3.5" />,
    },
    {
      key: "canva",
      label: "Canva Pro",
      icon: <CanvaIcon className="w-3.5 h-3.5" />,
    },
  ];

  // Filter produk berdasarkan brand dan pencarian
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedBrand && item.brandKey !== selectedBrand) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchTagline = item.tagline.toLowerCase().includes(query);
        const matchBrand = item.brandKey.toLowerCase().includes(query);
        const matchDesc = item.shortDescription.toLowerCase().includes(query);
        if (!matchName && !matchTagline && !matchBrand && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedBrand, searchQuery]);

  return (
    <section id="produk" className="py-16 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <FilterIcon className="w-3.5 h-3.5" />
              <span>Katalog Utama Produk Digital</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Pilihan Paket Langganan Lengkap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Tersedia paket Netflix, Spotify, CapCut, dan Canva dengan durasi fleksibel (1 Hari, 3 Hari, 7 Hari, hingga Bulanan). Semua paket bergaransi penuh.
            </p>
          </div>

          {/* Quick Counter */}
          {/* Actions on right */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
              <span>Tersedia:</span>
              <span className="font-bold text-orange-500">
                {filteredProducts.length} Pilihan Paket
              </span>
            </div>
            <Link
              href="/produk"
              className="flex items-center gap-1 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Buka Halaman Produk</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Brand Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200 dark:border-slate-800/80">
          {brandTabs.map((tab) => {
            const isSelected = selectedBrand === tab.key;
            return (
              <button
                key={tab.key || "all"}
                type="button"
                onClick={() => onSelectBrand(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30"
                    : "bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Search Feedback */}
        {searchQuery.trim() !== "" && (
          <div className="mb-6 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>
                Hasil pencarian untuk:{" "}
                <strong className="text-slate-900 dark:text-white">&quot;{searchQuery}&quot;</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectBrand(null)}
              className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ScrollReveal
                key={product.id}
                delay={index * 140}
                distance={60}
                className="h-full flex flex-col"
              >
                <ProductCard
                  product={product}
                  onOpenDetail={(prod, variantIdx = 0) => {
                    setActiveModalProduct(prod);
                    setActiveVariantIndex(variantIdx);
                  }}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500 dark:text-slate-400">
              <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Paket Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Tidak ada paket yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => onSelectBrand(null)}
              className="mt-4 px-4 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 border border-sky-300 dark:border-sky-500/30 rounded-xl transition-colors cursor-pointer"
            >
              Lihat Semua Paket
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        initialVariantIndex={activeVariantIndex}
        onClose={() => setActiveModalProduct(null)}
        onOrderNow={(prod, variantIdx) => {
          setActiveModalProduct(null);
          setOrderModalProduct(prod);
          setOrderVariantIndex(variantIdx);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Product Order Modal Checkout Flow */}
      <ProductOrderModal
        product={orderModalProduct}
        initialVariantIndex={orderVariantIndex}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  );
}
