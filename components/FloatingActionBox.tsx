"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import {
  ZapIcon,
  CloseIcon,
  ArrowRightIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";

interface FloatingActionBoxProps {
  products: Product[];
  onOpenOrderModal?: (product: Product, variantIndex: number) => void;
}

export default function FloatingActionBox({
  products,
  onOpenOrderModal,
}: FloatingActionBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeBrandKey, setActiveBrandKey] = useState<string>("netflix");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 260) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  const currentProduct =
    products.find((p) => p.brandKey === activeBrandKey) || products[0];

  const handleActionClick = () => {
    if (onOpenOrderModal && currentProduct) {
      onOpenOrderModal(currentProduct, 0);
    } else {
      const elem = document.getElementById("pilih-paket");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-2xl w-auto animate-fadeIn">
      {/* Floating Island Box with Organic Hover Float Effect */}
      <div className="animate-float rounded-3xl border border-orange-500/40 dark:border-orange-500/40 bg-white/95 dark:bg-[#0E162E]/95 backdrop-blur-xl shadow-2xl shadow-orange-500/10 dark:shadow-black/70 p-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 sm:gap-4 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10">
        {/* Glowing Live Signal Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>⚡ Paket Harian</span>
        </div>

        {/* 4 Mini Brand Selector Badges */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setActiveBrandKey("netflix")}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              activeBrandKey === "netflix"
                ? "bg-red-500/20 border-red-500 ring-1 ring-red-500/30 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
            }`}
            title="Netflix 4K UHD"
          >
            <NetflixIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveBrandKey("spotify")}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              activeBrandKey === "spotify"
                ? "bg-emerald-500/20 border-emerald-500 ring-1 ring-emerald-500/30 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
            }`}
            title="Spotify Premium"
          >
            <SpotifyIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveBrandKey("capcut")}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              activeBrandKey === "capcut"
                ? "bg-cyan-500/20 border-cyan-500 ring-1 ring-cyan-500/30 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
            }`}
            title="CapCut Pro"
          >
            <CapCutIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveBrandKey("canva")}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              activeBrandKey === "canva"
                ? "bg-purple-500/20 border-purple-500 ring-1 ring-purple-500/30 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
            }`}
            title="Canva Pro"
          >
            <CanvaIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Price & Info */}
        <div className="flex flex-col pr-1 truncate">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-900 dark:text-white capitalize truncate">
              {currentProduct.brandKey}
            </span>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
              Mulai Rp1.500*
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate hidden sm:inline">
            Aktivasi 5-10 menit • Full garansi
          </span>
        </div>

        {/* Action Button: Beli / Pilih Paket */}
        <button
          type="button"
          onClick={handleActionClick}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all shrink-0 cursor-pointer"
        >
          <ZapIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pilih Paket</span>
          <span className="sm:hidden">Pilih</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
          aria-label="Tutup kotak mengapung"
          title="Tutup sementara"
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
