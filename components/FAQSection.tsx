"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/mock-data";
import { ChevronDownIcon, NetflixIcon, SpotifyIcon, CapCutIcon, CanvaIcon } from "./ui/icons";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-harian");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTabs: { key: string; label: string; icon?: React.ReactNode }[] = [
    { key: "all", label: "Semua Pertanyaan" },
    { key: "netflix", label: "Netflix", icon: <NetflixIcon className="w-3.5 h-3.5" /> },
    { key: "spotify", label: "Spotify", icon: <SpotifyIcon className="w-3.5 h-3.5" /> },
    { key: "capcut", label: "CapCut", icon: <CapCutIcon className="w-3.5 h-3.5" /> },
    { key: "canva", label: "Canva", icon: <CanvaIcon className="w-3.5 h-3.5" /> },
    { key: "umum", label: "Garansi & Ketentuan" },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.brandKey === activeTab;
  });

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-100/50 dark:bg-[#070D1E]/40 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-250">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Pertanyaan Umum (FAQ)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Hal yang Sering Ditanyakan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Jawaban lengkap seputar cara aktivasi, garansi akun, dan privasi untuk paket harian & bulanan Netflix, Spotify, CapCut, dan Canva.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800 shadow-sm"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-slate-900 border-sky-400 dark:border-sky-500/50 shadow-md dark:shadow-lg dark:shadow-sky-950/20"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    {item.brandKey && item.brandKey !== "umum" && (
                      <span className="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-slate-700 uppercase">
                        {item.brandKey}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-600 dark:text-sky-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpdesk Callout */}
        <div className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Punya kendala aktivasi atau butuh bantuan memilih paket yang cocok?
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
              Tim Customer Support Siap Membantu 24/7 via WhatsApp & Live Chat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
