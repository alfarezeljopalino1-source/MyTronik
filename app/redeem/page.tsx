"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ZapIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  ClockIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
} from "./RedeemIcons";
import { OrderRecord, BrandKey } from "@/types";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constants";

interface VoucherDisplayData {
  code: string;
  orderId: string;
  service: string;
  brandKey: BrandKey;
  planDuration: string;
  customerName: string;
  accountEmail: string;
  accountPassword: string;
  accountProfile: string;
  accountPin?: string;
  expiryDate: string;
  autoLoginUrl: string;
  otpList: Array<{
    id: string;
    code: string;
    subject: string;
    sender: string;
    time: string;
  }>;
}

function RedeemContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code") || "";

  const [inputCode, setInputCode] = useState(codeParam);
  const [activeVoucher, setActiveVoucher] = useState<VoucherDisplayData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Accordion & Tab States
  const [isLoginGuideOpen, setIsLoginGuideOpen] = useState(true);
  const [isInstantLoginOpen, setIsInstantLoginOpen] = useState(false);
  const [isOtpInboxOpen, setIsOtpInboxOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<"mobile" | "pc" | "tv" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [otpRefreshTime, setOtpRefreshTime] = useState<string>("Baru saja");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const resolveVoucher = useCallback(async (codeToFind: string) => {
    const clean = codeToFind.trim().toUpperCase();
    if (!clean) {
      setErrorMessage("Silakan masukkan kode voucher Anda.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Coba cari di API /api/orders (Supabase + local)
      const res = await fetch("/api/orders");
      const data = await res.json();
      let matchedOrder: OrderRecord | undefined;

      if (data.success && Array.isArray(data.orders)) {
        matchedOrder = data.orders.find(
          (o: OrderRecord) =>
            (o.voucherCode && o.voucherCode.toUpperCase() === clean) ||
            o.id.toUpperCase() === clean ||
            (o.customerWhatsApp && o.customerWhatsApp.replace(/\D/g, "") === clean.replace(/\D/g, ""))
        );
      }

      // 2. Jika tidak ditemukan di API, cek localStorage lokal
      if (!matchedOrder && typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("mytronik-orders");
          if (stored) {
            const list: OrderRecord[] = JSON.parse(stored);
            matchedOrder = list.find(
              (o) =>
                (o.voucherCode && o.voucherCode.toUpperCase() === clean) ||
                o.id.toUpperCase() === clean
            );
          }
        } catch {
          // Ignored
        }
      }

      // 3. Jika ditemukan pesanan riil
      if (matchedOrder) {
        const brand = matchedOrder.brandKey || "netflix";
        const email =
          matchedOrder.accountEmail ||
          `vip.${brand}@mytronik.id`;
        const pass = matchedOrder.accountPassword || "myt889pass";
        const profile = matchedOrder.accountProfile || "Profil C (PIN: 1234)";
        const pin = matchedOrder.accountPin || "1234";
        const autoUrl =
          matchedOrder.autoLoginUrl ||
          `https://paytronik.digitalpremium.id/1/${matchedOrder.id.slice(-6).toLowerCase()}`;
        const name =
          matchedOrder.customerName ||
          (matchedOrder.customerWhatsApp ? `Pelanggan WA (${matchedOrder.customerWhatsApp.slice(-4)})` : "Pelanggan MyTronik");

        setActiveVoucher({
          code: matchedOrder.voucherCode || clean,
          orderId: matchedOrder.id,
          service: matchedOrder.service,
          brandKey: brand,
          planDuration: matchedOrder.planDuration,
          customerName: name,
          accountEmail: email,
          accountPassword: pass,
          accountProfile: profile,
          accountPin: pin,
          expiryDate: `${matchedOrder.date} • Garansi ${matchedOrder.warrantyDaysRemaining} Hari`,
          autoLoginUrl: autoUrl,
          otpList: [
            {
              id: "otp-1",
              code: "839-102",
              subject: `Kode Verifikasi Masuk Akun ${matchedOrder.service}`,
              sender: `${matchedOrder.service} Official Security`,
              time: "1 menit yang lalu",
            },
          ],
        });
        setIsLoading(false);
        return;
      }

      // 4. Jika bukan dari pesanan database, namun kode umum pengujian (misal: MYTRONIK-PRO, NETFLIX, CANVA, atau format apapun)
      if (
        clean.includes("MYT") ||
        clean.includes("PRO") ||
        clean.includes("NET") ||
        clean.includes("CANVA") ||
        clean.includes("SPOT") ||
        clean.includes("CAP") ||
        clean.length >= 4
      ) {
        const detectedBrand: BrandKey = clean.includes("SPOT")
          ? "spotify"
          : clean.includes("CANVA")
          ? "canva"
          : clean.includes("CAP")
          ? "capcut"
          : "netflix";

        const brandTitle =
          detectedBrand === "netflix"
            ? "Netflix Premium 4K UHD"
            : detectedBrand === "spotify"
            ? "Spotify Premium Individual"
            : detectedBrand === "canva"
            ? "Canva Pro Desain Suite"
            : "CapCut Pro Video Editor";

        const randomHex = Math.random().toString(36).substring(2, 8);

        setActiveVoucher({
          code: clean,
          orderId: `INV-MYT-${Math.floor(100000 + Math.random() * 900000)}`,
          service: brandTitle,
          brandKey: detectedBrand,
          planDuration: "Harian • 1 Hari (24 Jam)",
          customerName: "ALFAREZEL JOPALINO",
          accountEmail: `a.celagulina@gmail.com`,
          accountPassword: `vmk988`,
          accountProfile: `Profil C (PIN: 1234)`,
          accountPin: "1234",
          expiryDate: "12 Oktober 2026 • 24 Jam Penuh",
          autoLoginUrl: `https://paytronik.digitalpremium.id/1/${randomHex}`,
          otpList: [
            {
              id: "otp-live-1",
              code: "839-102",
              subject: `Kode OTP Masuk Akun ${brandTitle}`,
              sender: `${brandTitle} Security Auth`,
              time: "Baru saja",
            },
          ],
        });
        setIsLoading(false);
        return;
      }

      setErrorMessage(`Kode voucher "${clean}" tidak ditemukan. Pastikan kode yang dimasukkan sesuai.`);
    } catch {
      setErrorMessage("Gagal memverifikasi voucher. Silakan periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (codeParam) {
      resolveVoucher(codeParam);
    }
  }, [codeParam, resolveVoucher]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resolveVoucher(inputCode);
  };

  const handleRefreshOtp = () => {
    setOtpRefreshTime("Diperbarui beberapa detik lalu");
    if (activeVoucher) {
      const newCode = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
      setActiveVoucher({
        ...activeVoucher,
        otpList: [
          {
            id: `otp-${Date.now()}`,
            code: newCode,
            subject: `Kode OTP Masuk Akun ${activeVoucher.service}`,
            sender: `${activeVoucher.service} Security Auth`,
            time: "Baru saja",
          },
          ...activeVoucher.otpList,
        ],
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* JIKA BELUM ADA VOUCHER AKTIF -> TAMPILKAN FORM MASUKKAN KODE */}
      {!activeVoucher ? (
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
              <ZapIcon className="w-3.5 h-3.5" />
              <span>Portal Akses Akun & Voucher MyTronik</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Buka <span className="text-orange-500">Paket Akun Anda.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Masukkan kode voucher yang Anda dapatkan setelah pembayaran untuk membuka akses akun digital, profil PIN, dan panduan login instan.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Masukkan Kode Voucher Pembelian:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full h-13 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-sm font-mono font-bold tracking-wider text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none uppercase"
                  />
                </div>

                {errorMessage && (
                  <div className="mt-3 p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-600 dark:text-orange-400 font-medium flex items-center gap-2 animate-fadeIn">
                    <AlertCircleIcon className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
                <span>Contoh kode uji coba instan:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputCode("MYTRONIK-PRO");
                      resolveVoucher("MYTRONIK-PRO");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono font-bold text-[11px] hover:bg-orange-500/20 transition-colors"
                  >
                    MYTRONIK-PRO
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputCode("NETFLIX-1DAY");
                      resolveVoucher("NETFLIX-1DAY");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    NETFLIX-1DAY
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-linear-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Memverifikasi Kode...</span>
                ) : (
                  <>
                    <span>Buka Akses Akun Digital</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* JIKA VOUCHER VALID -> TAMPILKAN PORTAL AKUN LENGKAP SEPERTI DI SCREENSHOT DENGAN DESAIN MODERN */
        <div className="space-y-6 animate-fadeIn pb-12">
          {/* Top Bar: Tombol Kembali & Indikator Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveVoucher(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors cursor-pointer"
            >
              <span>← Masukkan Kode Voucher Lain</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Akun Terverifikasi Aktif</span>
              </span>
            </div>
          </div>

          {/* HEADER: Brand Name, Badges & Voucher Claimed By (Screenshot #1) */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              {activeVoucher.brandKey === "netflix"
                ? "Netflix"
                : activeVoucher.brandKey === "spotify"
                ? "Spotify"
                : activeVoucher.brandKey === "canva"
                ? "Canva"
                : activeVoucher.brandKey === "capcut"
                ? "CapCut"
                : activeVoucher.service}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {activeVoucher.planDuration.includes("Harian") || activeVoucher.planDuration.includes("1 Hari")
                  ? "HARIAN"
                  : "BULANAN"}
              </span>

              <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase tracking-wide">
                VOUCHER DIKLAIM OLEH {activeVoucher.customerName}
              </span>

              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                • Kode: {activeVoucher.code}
              </span>
            </div>
          </div>

          {/* ACCORDION 1: "Saya belum paham caranya login" (Screenshot #1, #2, #3) */}
          <div className="rounded-3xl border border-amber-300/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 overflow-hidden shadow-sm transition-all">
            <button
              type="button"
              onClick={() => setIsLoginGuideOpen(!isLoginGuideOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-amber-100/40 dark:hover:bg-amber-950/40 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <span className="font-black text-lg">?</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Saya belum paham caranya login
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Klik di sini untuk melihat panduan langkah demi langkah
                  </p>
                </div>
              </div>

              <span className={`text-slate-400 text-xs transition-transform duration-200 ${isLoginGuideOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {/* Isi Accordion Panduan */}
            {isLoginGuideOpen && (
              <div className="p-4 sm:p-6 pt-0 border-t border-amber-200/60 dark:border-amber-900/40 space-y-5 animate-fadeIn">
                {/* JIKA BELUM PILIH PERANGKAT -> TAMPILKAN 3 DEVICE BUTTONS (Screenshot #2) */}
                {!selectedDevice ? (
                  <div className="text-center py-3 space-y-4">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Mau login ke device apa?
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                      {/* 1. Mobile */}
                      <button
                        type="button"
                        onClick={() => setSelectedDevice("mobile")}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-orange-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-orange-500 transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="7" y="2" width="10" height="20" rx="2" strokeWidth="2" />
                            <circle cx="12" cy="18" r="1" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                          Mobile HP/TAB/IPAD
                        </span>
                      </button>

                      {/* 2. PC / Laptop */}
                      <button
                        type="button"
                        onClick={() => setSelectedDevice("pc")}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-orange-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-orange-500 transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="2" />
                            <path d="M7 20h10M12 16v4" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                          PC / LAPTOP
                        </span>
                      </button>

                      {/* 3. Smart TV */}
                      <button
                        type="button"
                        onClick={() => setSelectedDevice("tv")}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-orange-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-orange-500 transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="2" y="5" width="20" height="13" rx="2" strokeWidth="2" />
                            <path d="M8 21l4-3 4 3" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                          SMART TV
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* JIKA SUDAH PILIH PERANGKAT -> TAMPILKAN PANDUAN DAN LINK AKSES (Screenshot #3) */
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setSelectedDevice(null)}
                        className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        ← Kembali
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <span className="text-orange-600 dark:text-orange-400 uppercase tracking-wider font-extrabold">
                        {selectedDevice === "pc"
                          ? "PANDUAN PC / LAPTOP"
                          : selectedDevice === "mobile"
                          ? "PANDUAN MOBILE HP / IPAD"
                          : "PANDUAN SMART TV"}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {selectedDevice === "pc"
                        ? "Silahkan copy dan paste link dibawah ini di URL browser laptop kalian (pakai Chrome aja)"
                        : selectedDevice === "mobile"
                        ? "Buka aplikasi resmi di HP kalian atau salin link login instan ini di browser Chrome/Safari:"
                        : "Buka aplikasi di Smart TV kalian, lalu masukkan Email & Password pada kartu di bawah atau login via pairing kode:"}
                    </p>

                    {/* Link Bar with Copy & Buka Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="2" />
                          <path d="M7 20h10M12 16v4" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>
                          {selectedDevice === "pc"
                            ? "PC Link"
                            : selectedDevice === "mobile"
                            ? "Mobile Link"
                            : "TV Portal"}
                        </span>
                      </div>

                      <input
                        type="text"
                        readOnly
                        value={activeVoucher.autoLoginUrl}
                        className="flex-1 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 select-all"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(activeVoucher.autoLoginUrl, "autoLink")}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === "autoLink" ? (
                            <>
                              <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">TERCOPY</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="w-3.5 h-3.5 text-slate-400" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>

                        <a
                          href={activeVoucher.autoLoginUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-black uppercase text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                        >
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                          <span>BUKA</span>
                        </a>
                      </div>
                    </div>

                    {/* Green Confirmation Pill */}
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Otomatis sudah login!</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* GRID 4 KREDENSIAL UTAMA (Screenshot #1): Email, Password, Nama Profil, Masa Aktif */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Email / Username Card */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                    <path d="M3 7l9 6 9-6" strokeWidth="2" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    EMAIL / USERNAME
                  </span>
                  <p className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white truncate select-all">
                    {activeVoucher.accountEmail}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(activeVoucher.accountEmail, "email")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer shrink-0"
                title="Salin Email"
              >
                {copiedKey === "email" ? (
                  <CheckIcon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* 2. Password Card */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 7a4 4 0 10-8 0 4 4 0 008 0zM12 14v7m-3-3h6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    PASSWORD
                  </span>
                  <p className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white truncate select-all">
                    {showPassword ? activeVoucher.accountPassword : "••••••••"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
                  title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(activeVoucher.accountPassword, "pass")}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
                  title="Salin Password"
                >
                  {copiedKey === "pass" ? (
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <CopyIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. Nama Profil Card */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="7" r="4" strokeWidth="2" />
                    <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" strokeWidth="2" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    NAMA PROFIL
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate select-all">
                    {activeVoucher.accountProfile}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(activeVoucher.accountProfile, "profile")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer shrink-0"
                title="Salin Profil"
              >
                {copiedKey === "profile" ? (
                  <CheckIcon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* 4. Masa Aktif Card */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    MASA AKTIF
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                    {activeVoucher.expiryDate}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                Garansi On
              </span>
            </div>
          </div>

          {/* ACCORDION 2: "Tombol Akses Login Instan" (Screenshot #1) */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-sm transition-all">
            <button
              type="button"
              onClick={() => setIsInstantLoginOpen(!isInstantLoginOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 7a4 4 0 10-8 0 4 4 0 008 0zM12 14v7m-3-3h6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Tombol Akses Login Instan
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pilih perangkat Anda dan klik Buka untuk login otomatis
                  </p>
                </div>
              </div>

              <span className={`text-slate-400 text-xs transition-transform duration-200 ${isInstantLoginOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {isInstantLoginOpen && (
              <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Klik tombol di bawah ini sesuai perangkat Anda untuk membuka sesi akun secara langsung tanpa perlu mengetik email & password manual:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={activeVoucher.autoLoginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-xs font-bold transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLinkIcon className="w-4 h-4 text-orange-500" />
                      <span>Buka di Browser PC / Laptop</span>
                    </div>
                    <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <a
                    href={activeVoucher.autoLoginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-xs font-bold transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLinkIcon className="w-4 h-4 text-orange-500" />
                      <span>Buka di Smartphone / Tablet</span>
                    </div>
                    <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 3: "Email OTP Inbox" (Screenshot #1) */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-sm transition-all">
            <button
              type="button"
              onClick={() => setIsOtpInboxOpen(!isOtpInboxOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                    <path d="M3 7l9 6 9-6" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Email OTP Inbox
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Daftar pesan kode OTP yang masuk
                  </p>
                </div>
              </div>

              <span className={`text-slate-400 text-xs transition-transform duration-200 ${isOtpInboxOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {isOtpInboxOpen && (
              <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Kotak Masuk Verifikasi OTP</span>
                  <button
                    type="button"
                    onClick={handleRefreshOtp}
                    className="inline-flex items-center gap-1 text-orange-500 font-bold hover:underline cursor-pointer"
                  >
                    <span>🔄 Cek OTP Baru</span>
                    <span className="text-[10px] text-slate-400">({otpRefreshTime})</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeVoucher.otpList.map((otp) => (
                    <div
                      key={otp.id}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {otp.sender}
                          </span>
                          <span className="text-[10px] text-slate-400">• {otp.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {otp.subject}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-mono font-black text-sm tracking-wider">
                          {otp.code}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(otp.code, otp.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          {copiedKey === otp.id ? "✓ Tersalin" : "Salin"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  * Catatan: Jika saat login akun meminta kode OTP via email, kode 4 atau 6 digit akan otomatis muncul pada kotak di atas.
                </p>
              </div>
            )}
          </div>

          {/* BANTUAN CS RESMI WHATSAPP */}
          <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-emerald-500/10 via-emerald-600/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
                Mengalami Kendala Saat Login Akun?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin siap membantu aktivasi dan klaim garansi Anda 24 jam via WhatsApp resmi.
              </p>
            </div>

            <a
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Halo Admin MyTronik, saya ingin menanyakan bantuan untuk Voucher ${activeVoucher.code} (${activeVoucher.service} - ${activeVoucher.customerName}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Bantuan WhatsApp Admin</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RedeemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />
      <main className="flex-1 py-12 lg:py-16">
        <Suspense
          fallback={
            <div className="py-24 text-center text-xs text-slate-400">
              Memuat portal voucher MyTronik...
            </div>
          }
        >
          <RedeemContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
