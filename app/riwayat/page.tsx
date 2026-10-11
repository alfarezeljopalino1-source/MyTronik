"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SearchIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  ZapIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { OrderRecord } from "@/types";

export default function RiwayatPage() {
  const [searchInvoice, setSearchInvoice] = useState("");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const syncOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        try {
          localStorage.setItem("mytronik-orders", JSON.stringify(data.orders));
        } catch {
          // Ignored
        }
      }
    } catch {
      try {
        const stored = localStorage.getItem("mytronik-orders");
        if (stored) setOrders(JSON.parse(stored));
      } catch {
        // Ignored
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    syncOrders();
  }, [syncOrders]);

  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Apakah Anda yakin ingin mengosongkan seluruh riwayat pesanan uji coba?"
    );
    if (!confirmClear) return;
    setIsClearing(true);
    try {
      await fetch("/api/orders", { method: "DELETE" });
      localStorage.removeItem("mytronik-orders");
      setOrders([]);
    } catch {
      localStorage.removeItem("mytronik-orders");
      setOrders([]);
    } finally {
      setIsClearing(false);
    }
  };
  const filtered = orders.filter(
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

          {/* Search bar untuk cek invoice */}
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-sm focus-within:border-orange-500">
              <SearchIcon className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              <input
                type="text"
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
                placeholder="Cek status invoice (INV-MYT-...)"
                className="w-full bg-transparent px-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              {searchInvoice && (
                <button
                  type="button"
                  onClick={() => setSearchInvoice("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Kondisi Empty State vs Daftar Transaksi Tersimpan */}
          {isLoaded && orders.length === 0 ? (
            /* Empty State jika belum ada transaksi */
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl shadow-slate-200/50 dark:shadow-black/20 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center mx-auto text-orange-500 shadow-inner">
                <ShoppingBagIcon className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Belum Ada Transaksi
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                  Anda belum memiliki riwayat pembelian paket digital. Seluruh invoice pemesanan, akun aktif, dan sisa hari garansi purna jual akan otomatis tercatat di sini setelah Anda melakukan pemesanan.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/produk"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <ZapIcon className="w-4 h-4" />
                  <span>Mulai Jelajahi Paket Sekarang</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/redeem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <span>Punya Voucher Hadiah?</span>
                </Link>
              </div>
            </div>
          ) : searchInvoice.trim() !== "" && filtered.length === 0 ? (
            /* Jika mencari invoice tapi tidak ditemukan */
            <div className="text-center py-12 px-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 max-w-lg mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 flex items-center justify-center mx-auto text-orange-500">
                <AlertCircleIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Invoice Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Nomor invoice &quot;{searchInvoice}&quot; tidak terdaftar. Pastikan nomor invoice yang dimasukkan sesuai dengan bukti pemesanan Anda.
              </p>
              <button
                type="button"
                onClick={() => setSearchInvoice("")}
                className="text-xs font-bold text-orange-500 hover:underline pt-2 cursor-pointer"
              >
                Kembali ke riwayat lengkap
              </button>
            </div>
          ) : (
            /* Menampilkan daftar pesanan yang tersimpan di localStorage */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>Daftar Transaksi ({filtered.length})</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={isClearing}
                  className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-bold transition-colors cursor-pointer flex items-center gap-1 hover:underline"
                >
                  <span>🗑️ Kosongkan Riwayat Uji Coba</span>
                </button>
              </div>

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
                          order.status === "Aktif" || order.status === "Selesai"
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                            : order.status === "Menunggu Konfirmasi"
                            ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse"
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
                      Tanggal: {order.date} • Metode: {order.paymentMethod} • Biaya:{" "}
                      <strong className="text-slate-900 dark:text-slate-100">
                        {order.priceFormatted}
                      </strong>
                    </p>

                    {order.customerWhatsApp && (
                      <p className="text-[11px] text-slate-400 font-mono">
                        Penerima WA: {order.customerWhatsApp}
                      </p>
                    )}
                    {order.accountCredentials && (
                      <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                          Detail Akses Akun Anda:
                        </span>
                        <p className="font-mono text-[11px] text-slate-800 dark:text-slate-200 select-all bg-white dark:bg-slate-900 p-2 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                          {order.accountCredentials}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2Icon className="w-4 h-4 shrink-0" />
                      <span>Garansi: {order.warrantyDaysRemaining} Hari</span>
                    </div>

                    <a
                      href={`https://wa.me/6285382191181?text=${encodeURIComponent(
                        `Halo CS MyTronik, saya ingin menanyakan status pesanan saya dengan nomor invoice: ${order.id} (${order.service} ${order.planDuration}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Bantuan CS</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
