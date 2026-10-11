"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/data/mock-data";
import {
  CloseIcon,
  StarIcon,
  ZapIcon,
  CheckIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";

interface ProductDetailModalProps {
  product: Product | null;
  initialVariantIndex?: number;
  onClose: () => void;
  onOrderNow?: (product: Product, variantIndex: number) => void;
}

export default function ProductDetailModal({
  product,
  initialVariantIndex = 0,
  onClose,
  onOrderNow,
}: ProductDetailModalProps) {
  const [prevProduct, setPrevProduct] = useState(product);
  const [prevIndex, setPrevIndex] = useState(initialVariantIndex);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(initialVariantIndex);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  if (product !== prevProduct || initialVariantIndex !== prevIndex) {
    setPrevProduct(product);
    setPrevIndex(initialVariantIndex);
    setSelectedVariantIdx(initialVariantIndex);
    setSimulationNotice(null);
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const currentVariant =
    product.planVariants[selectedVariantIdx] || product.planVariants[0];

  const renderBrandIcon = () => {
    switch (product.brandKey) {
      case "netflix":
        return <NetflixIcon className="w-5 h-5" />;
      case "spotify":
        return <SpotifyIcon className="w-5 h-5" />;
      case "capcut":
        return <CapCutIcon className="w-5 h-5" />;
      case "canva":
        return <CanvaIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleSimulateOrder = () => {
    const message = `Halo CS MyTronik, saya berminat memesan *${product.name}* durasi *${currentVariant.duration}* seharga *${formatRupiah(currentVariant.samplePrice)}*. Mohon info ketersediaan slot aktivasi.`;
    setSimulationNotice(
      `Format Pesanan Disiapkan:\n"${message}"\n\nSilakan kirimkan format pesan di atas ke layanan WhatsApp pelanggan untuk melanjutkan konfirmasi pesanan.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0F172A] shadow-2xl text-slate-800 dark:text-slate-200">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/90 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
          aria-label="Tutup modal rincian produk"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Modal Header Visual */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-white">
                {renderBrandIcon()}
                <span className="capitalize">{product.brandKey}</span>
              </div>

              {product.badge && (
                <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold">
                  {product.badge}
                </span>
              )}

              <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
                <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({product.ratingCount} ulasan)
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {product.name}
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Duration Selector inside Modal */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
              Pilih Durasi Paket Langganan:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.planVariants.map((variant, idx) => {
                const isSelected = selectedVariantIdx === idx;
                return (
                  <button
                    key={variant.id || variant.duration}
                    type="button"
                    onClick={() => {
                      setSelectedVariantIdx(idx);
                      setSimulationNotice(null);
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-white border-sky-400 dark:border-sky-500 ring-2 ring-sky-500/30 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="text-xs font-bold">{variant.duration}</div>
                    <div className="text-xs font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                      {formatRupiah(variant.samplePrice)}*
                    </div>
                    {variant.savingsLabel && (
                      <span className="inline-block mt-1 text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 px-1.5 py-0.5 rounded">
                        {variant.savingsLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & Delivery Highlights */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Harga Paket ({currentVariant.duration}):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatRupiah(currentVariant.samplePrice)}
                </span>
                {currentVariant.sampleOriginalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatRupiah(currentVariant.sampleOriginalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <ZapIcon className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Metode: <strong>{product.deliveryType}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Deskripsi Layanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Technical Specs Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Spesifikasi Akun & Jaminan
            </h3>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 ${
                    i % 2 === 0
                      ? "bg-slate-50 dark:bg-slate-900/80"
                      : "bg-white dark:bg-slate-900/40"
                  }`}
                >
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-slate-900 dark:text-slate-200 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Fitur Lengkap yang Didapatkan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200"
                >
                  <CheckIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance notice */}
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
            <AlertCircleIcon className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-slate-800 dark:text-slate-300 block mb-0.5">
                Kepatuhan Lisensi & Garansi:
              </span>
              {product.disclaimer}
            </div>
          </div>

          {/* Simulation Notice Feedback */}
          {simulationNotice && (
            <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 p-4 text-xs text-sky-900 dark:text-sky-200 whitespace-pre-line leading-relaxed animate-fadeIn">
              <div className="flex items-center gap-2 font-bold mb-1.5 text-sky-700 dark:text-sky-300">
                <CheckCircle2Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Format Permintaan Pesanan:</span>
              </div>
              {simulationNotice}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Tutup
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOrderNow && product) {
                  onOrderNow(product, selectedVariantIdx);
                } else {
                  handleSimulateOrder();
                }
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <ZapIcon className="w-4 h-4" />
              <span>Lanjut Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
