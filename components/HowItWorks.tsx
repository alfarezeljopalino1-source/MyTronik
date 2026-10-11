import React from "react";
import { ORDER_STEPS } from "@/data/mock-data";
import ScrollReveal from "./ui/ScrollReveal";
import { CheckCircle2Icon, ZapIcon, HeadsetIcon } from "./ui/icons";

export default function HowItWorks() {
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <ZapIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 2:
        return <CheckCircle2Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 3:
        return <HeadsetIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <ZapIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <section id="cara-pesan" className="py-16 lg:py-20 relative overflow-hidden bg-slate-100/60 dark:bg-[#070D1E]/60 border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-250">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Proses Cepat & Praktis
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cara Mudah Mendapatkan Akses Digital
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Hanya 3 langkah sederhana untuk menikmati layanan premium tanpa kendala teknis dan didampingi tim CS berpengalaman.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {ORDER_STEPS.map((stepItem, index) => (
            <ScrollReveal
              key={stepItem.step}
              delay={index * 150}
              className="h-full flex flex-col"
            >
              <div
                className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between group hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-md dark:shadow-xl shadow-slate-200/50 dark:shadow-black/20 h-full"
              >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    {getStepIcon(stepItem.step)}
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                    {stepItem.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                  0{index + 1} • Alur Transaksi
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Didampingi Sampai Aktif</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
}
