import React from "react";
import { COMPARISON_ITEMS } from "@/data/mock-data";
import { CheckIcon, CloseIcon, SparklesIcon } from "./ui/icons";

export default function ComparisonTable() {
  return (
    <section id="perbandingan" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">
            <SparklesIcon className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>Transparansi Manfaat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Perbandingan Layanan: Gratis vs Paket MyTronik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Lihat secara transparan mengapa ribuan pengguna memilih paket digital MyTronik untuk kebutuhan kerja dan hiburan mereka.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/70">
                  <th className="p-4 sm:p-5 text-slate-800 dark:text-slate-300 font-bold w-1/3">
                    Aspek Layanan
                  </th>
                  <th className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 font-semibold w-1/3 border-x border-slate-200 dark:border-slate-800">
                    Versi Gratis / Standar
                  </th>
                  <th className="p-4 sm:p-5 text-sky-600 dark:text-sky-400 font-extrabold w-1/3 bg-sky-50 dark:bg-sky-950/30">
                    <div className="flex items-center gap-1.5">
                      <span>Paket Digital MyTronik</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40">
                        Rekomendasi
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {COMPARISON_ITEMS.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${
                      item.isHighlight ? "bg-sky-50/50 dark:bg-sky-950/10" : ""
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-slate-900 dark:text-white">
                      {item.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 border-x border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <CloseIcon className="w-4 h-4 text-red-500 dark:text-red-400/80 shrink-0" />
                        <span>{item.freePlan}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-900 dark:text-slate-100 font-bold bg-sky-50/30 dark:bg-sky-950/20">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span className="text-sky-700 dark:text-sky-300">{item.mytronikPlan}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-blue-900/30 dark:via-slate-900 dark:to-indigo-900/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Siap Menikmati Akses Tanpa Hambatan?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Pilih paket Netflix, Spotify, CapCut, atau Canva sekarang dan nikmati garansi masa aktif penuh.
            </p>
          </div>
          <a
            href="#pilih-paket"
            className="shrink-0 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 transition-all shadow-md shadow-blue-900/30"
          >
            Pilih Paket Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
