import React from "react";
import { TESTIMONIALS } from "@/data/mock-data";
import ScrollReveal from "./ui/ScrollReveal";
import {
  StarIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";

export default function TestimonialsSection() {
  const renderBrandTag = (brand: string) => {
    switch (brand) {
      case "Netflix":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/30">
            <NetflixIcon className="w-3 h-3" />
            <span>Netflix</span>
          </span>
        );
      case "Spotify":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <SpotifyIcon className="w-3 h-3" />
            <span>Spotify</span>
          </span>
        );
      case "CapCut":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
            <CapCutIcon className="w-3 h-3" />
            <span>CapCut</span>
          </span>
        );
      case "Canva":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
            <CanvaIcon className="w-3 h-3" />
            <span>Canva</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="testimoni" className="py-16 lg:py-20 bg-slate-100/50 dark:bg-[#070D1E]/40 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-250">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Ulasan Pelanggan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pengalaman Nyata Pengguna MyTronik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Kepuasan pelanggan adalah prioritas kami. Simak apa kata mereka yang telah menggunakan paket harian & bulanan Netflix, Spotify, CapCut, dan Canva.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testi, index) => (
            <ScrollReveal
              key={testi.id}
              delay={index * 120}
              className="h-full flex flex-col"
            >
              <div
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700/80 transition-all shadow-md dark:shadow-xl shadow-slate-200/50 dark:shadow-black/20 h-full"
              >
              <div>
                {/* Header with Star Rating and Brand Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  {renderBrandTag(testi.brandUsed)}
                </div>

                {/* Comment Quote */}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{testi.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Bio */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400">{testi.role}</p>
                </div>
                <div className="text-right text-[10px] text-slate-500 dark:text-slate-400">
                  <span>{testi.city}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
}
