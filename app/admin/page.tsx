"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { OrderRecord, OrderStatus } from "@/types";
import {
  LogoIcon,
  CheckCircle2Icon,
  WhatsAppIcon,
  ShoppingBagIcon,
  ClockIcon,
  SearchIcon,
  ShieldCheckIcon,
  SunIcon,
  MoonIcon,
} from "@/components/ui/icons";
import { useTheme } from "@/context/ThemeContext";

export default function AdminPage() {
  const { theme, toggleTheme } = useTheme();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [credentialsInputs, setCredentialsInputs] = useState<Record<string, string>>({});
  const [isSupabaseActive, setIsSupabaseActive] = useState(false);
  const [showDbGuide, setShowDbGuide] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        setIsSupabaseActive(Boolean(data.supabaseActive));
      }
    } catch {
      // Fallback local storage
      try {
        const stored = localStorage.getItem("mytronik-orders");
        if (stored) setOrders(JSON.parse(stored));
      } catch {
        // Ignored
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (
    id: string,
    newStatus: OrderStatus,
    credentials?: string
  ) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          accountCredentials: credentials,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Pesanan ${id} berhasil diubah ke status: ${newStatus}`);
        setTimeout(() => setActionNotice(null), 4000);
        fetchOrders();
      }
    } catch {
      setActionNotice(`Gagal memperbarui pesanan ${id}.`);
    }
  };

  const handleDeleteSingleOrder = async (id: string) => {
    if (!window.confirm(`Hapus pesanan ${id}?`)) return;
    try {
      await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
      setActionNotice(`Pesanan ${id} telah dihapus.`);
      setTimeout(() => setActionNotice(null), 3000);
      fetchOrders();
    } catch {
      setActionNotice(`Gagal menghapus pesanan.`);
    }
  };

  const handleClearAllOrders = async () => {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin mengosongkan seluruh riwayat pesanan uji coba? Tindakan ini tidak dapat dibatalkan."
    );
    if (!confirmation) return;

    try {
      await fetch("/api/orders", { method: "DELETE" });
      localStorage.removeItem("mytronik-orders");
      setOrders([]);
      setActionNotice("Seluruh riwayat pesanan uji coba telah berhasil dikosongkan.");
      setTimeout(() => setActionNotice(null), 4000);
    } catch {
      setActionNotice("Gagal mengosongkan riwayat pesanan.");
    }
  };

  const totalOmset = orders.reduce((sum, o) => sum + (o.samplePrice || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "Menunggu Konfirmasi").length;
  const activeCount = orders.filter((o) => o.status === "Aktif" || o.status === "Selesai").length;

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filterStatus === "all" ? true : order.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      order.id.toLowerCase().includes(q) ||
      order.service.toLowerCase().includes(q) ||
      order.customerWhatsApp.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070D1E] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0A1128]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon className="w-8 h-8" />
            <span className="text-lg font-black tracking-wider uppercase font-sans">
              MYTRONIK
            </span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
            Panel Admin
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer hover:border-orange-500"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <MoonIcon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Buka Toko
          </Link>

          <button
            type="button"
            onClick={handleClearAllOrders}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🗑️ Kosongkan Uji Coba</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner Notifikasi Aksi */}
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{actionNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-xs text-emerald-600 dark:text-emerald-400 px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Title & Quick Stats */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                Konfirmasi & Manajemen Pesanan
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Kelola pesanan masuk dari pelanggan, kirimkan kredensial akun via WhatsApp, dan pantau status transaksi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDbGuide(!showDbGuide)}
              className={`self-start sm:self-auto px-3.5 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-all shadow-sm ${
                isSupabaseActive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 hover:bg-sky-500/20"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSupabaseActive ? "bg-emerald-500" : "bg-sky-500"
                } animate-pulse`}
              />
              <span>
                {isSupabaseActive
                  ? "Database: Supabase Cloud (Aktif)"
                  : "Database: File Lokal (Klik Panduan Supabase)"}
              </span>
            </button>
          </div>

          {/* Panduan Integrasi Supabase jika diklik */}
          {showDbGuide && (
            <div className="p-5 rounded-3xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sky-900 dark:text-sky-200 flex items-center gap-2">
                  <span>⚡ Panduan Aktivasi Database Supabase Cloud</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowDbGuide(false)}
                  className="text-sky-600 dark:text-sky-400 font-bold px-2"
                >
                  ✕ Tutup
                </button>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                <li>
                  Buka project Anda di <strong>https://supabase.com</strong> (gratis).
                </li>
                <li>
                  Buka menu <strong>SQL Editor</strong>, salin seluruh isi file{" "}
                  <code className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 font-mono font-bold text-sky-800 dark:text-sky-200">
                    supabase_schema.sql
                  </code>{" "}
                  yang telah disediakan, lalu klik <strong>Run</strong>.
                </li>
                <li>
                  Salin <strong>Project URL</strong> dan <strong>Anon Key</strong> dari menu{" "}
                  <em>Project Settings &gt; API</em>.
                </li>
                <li>
                  Tempelkan ke file <code className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 font-mono font-bold">.env.local</code> di folder proyek MyTronik.
                </li>
                <li>
                  Jalankan ulang <code className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 font-mono font-bold">npm run dev</code>. Status otomatis berubah menjadi hijau.
                </li>
              </ol>
            </div>
          )}

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                <span>Total Pesanan</span>
                <ShoppingBagIcon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {orders.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-900/60 shadow-sm">
              <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold mb-1">
                <span>Menunggu Konfirmasi</span>
                <ClockIcon className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {pendingCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-900/60 shadow-sm">
              <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                <span>Aktif & Selesai</span>
                <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {activeCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                <span>Total Omset</span>
                <span className="font-mono text-xs">IDR</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                Rp {totalOmset.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === "all"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              }`}
            >
              Semua ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("Menunggu Konfirmasi")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === "Menunggu Konfirmasi"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              }`}
            >
              Menunggu ({pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("Aktif")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === "Aktif"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              }`}
            >
              Aktif ({orders.filter((o) => o.status === "Aktif").length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari invoice, produk, WA..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Orders Listing */}
        {isLoading ? (
          <div className="py-20 text-center text-xs text-slate-400">
            Memuat data pesanan masuk...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingBagIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Belum Ada Pesanan Masuk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Saat customer melakukan pemesanan di toko, data invoice dan detailnya akan otomatis muncul di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const currentCred =
                credentialsInputs[order.id] !== undefined
                  ? credentialsInputs[order.id]
                  : order.accountCredentials || "";

              const customerWaClean = order.customerWhatsApp.replace(/\D/g, "");
              const formattedWa = customerWaClean.startsWith("0")
                ? `62${customerWaClean.slice(1)}`
                : customerWaClean;

              const activationMessage = encodeURIComponent(
                `Halo Kak, pesanan Anda di MyTronik dengan nomor *${order.id}* (${order.service} - ${order.planDuration}) telah *DIKONFIRMASI & AKTIF*!\n\n` +
                  `Berikut detail akses paket Anda:\n${currentCred || "(Akses telah diaktifkan ke akun/email Anda)"}\n\n` +
                  `Garansi: ${order.warrantyDaysRemaining} Hari penuh.\nTerima kasih telah berbelanja di MyTronik!`
              );

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm space-y-4"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black text-orange-500">
                        {order.id}
                      </span>
                      {order.voucherCode && (
                        <Link
                          href={`/redeem?code=${order.voucherCode}`}
                          target="_blank"
                          className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono font-bold text-[10px] hover:underline"
                        >
                          Voucher: {order.voucherCode} ↗
                        </Link>
                      )}
                      <span className="text-[11px] text-slate-400">• {order.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          order.status === "Menunggu Konfirmasi"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : order.status === "Aktif"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {order.status}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteSingleOrder(order.id)}
                        className="text-xs text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Hapus pesanan ini"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {order.service} • {order.planDuration}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        Metode: <strong className="text-slate-700 dark:text-slate-200">{order.paymentMethod}</strong> •
                        Total Biaya: <strong className="text-orange-500 font-mono">{order.priceFormatted}</strong>
                      </p>
                      {order.customerNotes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                          Catatan Pemesan: &quot;{order.customerNotes}&quot;
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-bold">Kontak Customer:</span>
                        <a
                          href={`https://wa.me/${formattedWa}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          <span>Chat WhatsApp</span>
                        </a>
                      </div>
                      <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {order.customerWhatsApp}
                      </p>
                      {order.customerEmail && (
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                          Email: {order.customerEmail}
                        </p>
                      )}
                      {order.confirmedAt && (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                          Dikonfirmasi pada: {order.confirmedAt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Admin Confirmation Action Area */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div>
                      <label
                        htmlFor={`cred-${order.id}`}
                        className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1"
                      >
                        Kredensial / Detail Akun untuk Dikirim ke Customer:
                      </label>
                      <input
                        id={`cred-${order.id}`}
                        type="text"
                        value={currentCred}
                        onChange={(e) =>
                          setCredentialsInputs((prev) => ({
                            ...prev,
                            [order.id]: e.target.value,
                          }))
                        }
                        placeholder="Contoh: Email: user@vip.com | Pass: 123456 | Profil 2 (PIN: 1122)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {order.status !== "Aktif" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, "Aktif", currentCred)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2Icon className="w-4 h-4" />
                          <span>Konfirmasi & Aktifkan Pesanan</span>
                        </button>
                      )}

                      <a
                        href={`https://wa.me/${formattedWa}?text=${activationMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Kirim Akses Akun via WhatsApp</span>
                      </a>

                      {order.status === "Aktif" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, "Selesai", currentCred)}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                        >
                          Tandai Selesai
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
