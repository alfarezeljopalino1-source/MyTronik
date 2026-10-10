"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchIcon, CheckCircle2Icon, ClockIcon, ZapIcon } from "@/components/ui/icons";

interface OrderRecord {
  id: string;
  service: string;
  planDuration: string;
  date: string;
  priceFormatted: string;
  status: "Aktif" | "Selesai" | "Diproses";
  warrantyDaysRemaining: number;
}

export default function RiwayatPage() {
  const [searchInvoice, setSearchInvoice] = useState("");

  const sampleOrders: OrderRecord[] = [
    {
      id: "INV-MYT-98214",
      service: "Netflix 4K UHD",
      planDuration: "3 Hari (Weekend Pass)",
      date: "11 Okt 2026",
      priceFormatted: "Rp9.000*",
      status: "Aktif",
      warrantyDaysRemaining: 2,
    },
    {
      id: "INV-MYT-97103",
      service: "Canva Pro Desain",
      planDuration: "1 Hari (Tugas/Event)",
      date: "09 Okt 2026",
      priceFormatted: "Rp1.500*",
      status: "Selesai",
      warrantyDaysRemaining: 0,
    },
    {
      id: "INV-MYT-96541",
      service: "Spotify Premium",
      planDuration: "7 Hari (1 Minggu)",
      date: "04 Okt 2026",
      priceFormatted: "Rp10.000*",
      status: "Selesai",
      warrantyDaysRemaining: 0,
    },
  ];

  const filtered = sampleOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      o.service.toLowerCase().includes(searchInvoice.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Riwayat <span className="text-orange-500">& Cek Status.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Pantau masa aktif akun digital dan status klaim garansi Anda secara transparan.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
              <SearchIcon className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              <input
                type="text"
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
                placeholder="Cari No. Invoice (INV-MYT-...)"
                className="w-full bg-transparent px-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Orders list */}
          <div className="space-y-4">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-md shadow-slate-200/50 dark:shadow-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-500">
                      {order.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === "Aktif"
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {order.service} • {order.planDuration}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tanggal Transaksi: {order.date} • Harga: <strong>{order.priceFormatted}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 text-xs">
                  {order.status === "Aktif" ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2Icon className="w-4 h-4" />
                      <span>Garansi: Sisa {order.warrantyDaysRemaining} Hari</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <ClockIcon className="w-4 h-4" />
                      <span>Masa Aktif Selesai</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
