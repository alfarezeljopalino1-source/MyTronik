"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/data/mock-data";
import {
  StarIcon,
  ZapIcon,
  ClockIcon,
  CheckIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product, initialVariantIndex?: number) => void;
}

export default function ProductCard({
  product,
  onOpenDetail,
}: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(
    product.planVariants.findIndex((v) => v.isPopular) !== -1
      ? product.planVariants.findIndex((v) => v.isPopular)
      : 0
  );

  const activeVariant =
    product.planVariants[selectedVariantIdx] || product.planVariants[0];

  const getBrandMeta = () => {
    switch (product.brandKey) {
      case "netflix":
        return {
          icon: <NetflixIcon className="w-5 h-5" />,
          borderHover: "hover:border-red-500/60 hover:shadow-red-500/10 dark:hover:shadow-red-950/30",
          accentColor: "#E50914",
        };
      case "spotify":
        return {
          icon: <SpotifyIcon className="w-5 h-5" />,
          borderHover: "hover:border-emerald-500/60 hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/30",
          accentColor: "#1DB954",
        };
      case "capcut":
        return {
          icon: <CapCutIcon className="w-5 h-5" />,
          borderHover: "hover:border-cyan-500/60 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-950/30",
          accentColor: "#00F2FE",
        };
      case "canva":
        return {
          icon: <CanvaIcon className="w-5 h-5" />,
          borderHover: "hover:border-purple-500/60 hover:shadow-purple-500/10 dark:hover:shadow-purple-950/30",
          accentColor: "#7D2AE8",
        };
      default:
        return {
          icon: null,
          borderHover: "hover:border-sky-500/60 hover:shadow-sky-500/10 dark:hover:shadow-sky-950/30",
          accentColor: "#2563EB",
        };
    }
  };

  const brandMeta = getBrandMeta();

  return (
    <div
      className={`group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-md dark:shadow-xl shadow-slate-200/50 dark:shadow-black/40 ${brandMeta.borderHover}`}
    >
      {/* Top Banner Media */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-full backdrop-blur-md">
            {brandMeta.icon}
            <span className="text-xs font-bold text-white capitalize">
              {product.brandKey}
            </span>
          </div>

          {product.badge && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Delivery & Rating Indicators */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1 text-slate-300 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-md backdrop-blur-md">
            {product.deliveryType.includes("Instant") ? (
              <ZapIcon className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="text-[10px] font-medium">{product.deliveryType}</span>
          </span>

          <span className="flex items-center gap-1 text-amber-300 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-md backdrop-blur-md">
            <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold">{product.rating}</span>
            <span className="text-[9px] text-slate-400">({product.ratingCount})</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Stock status indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{product.stockStatus}</span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Interactive Duration Variant Switcher */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Pilih Durasi:
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {activeVariant.categoryType === "harian" ? "⚡ Paket Harian" : "💎 Paket Hemat"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.planVariants.map((variant, idx) => {
                const isSelected = selectedVariantIdx === idx;
                return (
                  <button
                    key={variant.id || variant.duration}
                    type="button"
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all text-center border cursor-pointer ${
                      isSelected
                        ? "bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-400 dark:border-sky-500/60 ring-1 ring-sky-500/30 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{variant.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Feature Bullets */}
          <div className="mt-4 space-y-1.5">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {formatRupiah(activeVariant.samplePrice)}
              </span>
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">*</span>
            </div>
            {activeVariant.sampleOriginalPrice && (
              <div className="text-[11px] text-slate-400 line-through -mt-0.5">
                {formatRupiah(activeVariant.sampleOriginalPrice)}
              </div>
            )}
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block -mt-0.5">
              *Data contoh ({activeVariant.duration})
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail(product, selectedVariantIdx)}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-md shadow-blue-900/20 dark:shadow-blue-900/30 cursor-pointer"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
