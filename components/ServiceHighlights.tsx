import React from "react";
import { SERVICE_FEATURES } from "@/data/mock-data";
import ScrollReveal from "./ui/ScrollReveal";
import {
  ZapIcon,
  ShieldCheckIcon,
  TagIcon,
  HeadsetIcon,
} from "./ui/icons";

export default function ServiceHighlights() {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return <ZapIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case "shield":
        return <ShieldCheckIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "tag":
        return <TagIcon className="w-6 h-6 text-amber-500 dark:text-amber-400" />;
      case "headset":
        return <HeadsetIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <ShieldCheckIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <section id="keunggulan" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Standar Layanan MyTronik
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Mengapa Memilih Layanan Digital Kami?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Kami mengutamakan kecepatan pengiriman, jaminan garansi purna jual, dan keamanan transaksi agar pengalaman digital Anda tetap nyaman dan bebas kendala.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_FEATURES.map((feat, index) => (
            <ScrollReveal
              key={feat.id}
              delay={index * 120}
              className="h-full flex flex-col"
            >
              <div
                className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 hover:border-slate-300 dark:hover:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 flex flex-col justify-between group shadow-md dark:shadow-xl shadow-slate-200/50 dark:shadow-black/20 h-full"
              >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  {getFeatureIcon(feat.iconName)}
                </div>

                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                  0{index + 1} / Pilar
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Standar Mutu MyTronik</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
}
