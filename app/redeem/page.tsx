"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ZapIcon, CheckCircle2Icon, AlertCircleIcon, ArrowRightIcon } from "@/components/ui/icons";

export default function RedeemPage() {
  const [voucherCode, setVoucherCode] = useState("");
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      setFeedback({ status: "error", message: "Silakan masukkan kode voucher terlebih dahulu." });
      return;
    }

    const clean = voucherCode.trim().toUpperCase();
    if (clean.includes("MYTRONIK") || clean.includes("PRO") || clean.includes("NETFLIX") || clean.includes("CANVA")) {
      setFeedback({
        status: "success",
        message: `Voucher "${clean}" valid! Paket digital simulasi berhasil diverifikasi. Panduan aktivasi dikirimkan ke WhatsApp/Email Anda (Simulasi Prototipe).`,
      });
    } else {
      setFeedback({
        status: "error",
        message: `Kode "${clean}" tidak ditemukan dalam sistem simulasi. Coba gunakan contoh kode: "MYTRONIK-PRO" atau "CANVA-1DAY".`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
              <ZapIcon className="w-3.5 h-3.5" />
              <span>Sistem Klaim Instan 24 Jam</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Tukarkan <span className="text-orange-500">Voucher Anda.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Punya kode voucher hadiah atau invoice pembelian? Masukkan kode di bawah untuk mengaktifkan akses digital Anda seketika.
            </p>
          </div>

          {/* Redeem Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Masukkan Kode Voucher:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Contoh: MYTRONIK-PRO-1DAY"
                    className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-sm font-mono font-bold tracking-wider text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Contoh kode tes:</span>
                <button
                  type="button"
                  onClick={() => setVoucherCode("MYTRONIK-PRO")}
                  className="text-orange-500 font-bold hover:underline"
                >
                  MYTRONIK-PRO
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>VERIFIKASI & KLAIM VOUCHER</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </form>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`mt-6 p-4 rounded-2xl text-xs leading-relaxed flex items-start gap-3 animate-fadeIn ${
                  feedback.status === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                    : "bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                {feedback.status === "success" ? (
                  <CheckCircle2Icon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircleIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>{feedback.message}</div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
