import React from "react";
import { Category } from "@/types";
import {
  TvIcon,
  PaletteIcon,
  VideoIcon,
  BriefcaseIcon,
  GamepadIcon,
  ChevronRightIcon,
} from "./ui/icons";

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  // Mapping nama icon ke komponen icon SVG
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "tv":
        return <TvIcon className="w-6 h-6 text-sky-400" />;
      case "palette":
        return <PaletteIcon className="w-6 h-6 text-indigo-400" />;
      case "video":
        return <VideoIcon className="w-6 h-6 text-pink-400" />;
      case "briefcase":
        return <BriefcaseIcon className="w-6 h-6 text-emerald-400" />;
      case "gamepad":
        return <GamepadIcon className="w-6 h-6 text-amber-400" />;
      default:
        return <TvIcon className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section id="kategori" className="py-12 lg:py-16 bg-[#070D1E]/60 border-y border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              Jelajahi Berdasarkan Kategori
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pilihan Produk Digital Terlengkap
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Temukan lisensi aplikasi, akun premium, dan voucher hiburan yang sesuai dengan kebutuhan aktivitas harian Anda.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Reset filter ({selectedCategory})</span>
              <span className="text-slate-400">×</span>
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => {
                  onSelectCategory(isSelected ? null : category.id);
                  // Scroll halus ke seksi produk
                  const elem = document.getElementById("produk");
                  if (elem) {
                    elem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`group relative rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-800/90 border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-950/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {renderIcon(category.iconName)}
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{category.productCount} Produk</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
