"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, PlanVariant, OrderRecord } from "@/types";
import { formatRupiah } from "@/data/mock-data";
import {
  CloseIcon,
  CheckIcon,
  ZapIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
} from "./ui/icons";

interface ProductOrderModalProps {
  product: Product | null;
  initialVariantIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductOrderModal({
  product,
  initialVariantIndex = 0,
  isOpen,
  onClose,
}: ProductOrderModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(initialVariantIndex);
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsApp, setCustomerWhatsApp] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS Instan (GoPay, OVO, DANA, ShopeePay)");
  const [generatedInvoice, setGeneratedInvoice] = useState("INV-MYT-84291");
  const [generatedVoucher, setGeneratedVoucher] = useState("MYT-NET-9821");
  const [voucherCopied, setVoucherCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [prevProduct, setPrevProduct] = useState(product);
  const [prevIndex, setPrevIndex] = useState(initialVariantIndex);

  if (product !== prevProduct || initialVariantIndex !== prevIndex) {
    setPrevProduct(product);
    setPrevIndex(initialVariantIndex);
    setSelectedVariantIdx(initialVariantIndex);
    setStep(1);
    setFormError(null);
    const invNum = Math.floor(100000 + Math.random() * 900000).toString();
    const codeSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const brandCode = product ? product.brandKey.toUpperCase().slice(0, 3) : "MYT";
    setGeneratedInvoice(`INV-MYT-${invNum}`);
    setGeneratedVoucher(`MYT-${brandCode}-${codeSuffix}`);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentVariant: PlanVariant =
    product.planVariants[selectedVariantIdx] || product.planVariants[0];

  const paymentOptions = [
    { id: "qris", name: "QRIS Instan (GoPay, OVO, DANA, ShopeePay)", badge: "Paling Cepat" },
    { id: "bca", name: "BCA Virtual Account", badge: "Verifikasi Otomatis" },
    { id: "mandiri", name: "Mandiri Virtual Account", badge: "24 Jam" },
    { id: "bri", name: "BRI & BNI Virtual Account", badge: "24 Jam" },
  ];

  const handleNextToStep2 = () => {
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWhatsApp = customerWhatsApp.trim();
    if (!cleanWhatsApp) {
      setFormError("Nomor WhatsApp wajib diisi agar akun digital dan kode voucher dapat dikirimkan kepada Anda.");
      return;
    }
    const digitsOnly = cleanWhatsApp.replace(/\D/g, "");
    if (digitsOnly.length < 9) {
      setFormError("Nomor WhatsApp belum lengkap. Masukkan nomor HP aktif minimal 9 digit angka (contoh: 085382191181).");
      return;
    }
    setFormError(null);
    setGeneratedInvoice(`INV-MYT-${Date.now().toString().slice(-5)}`);
    setStep(3);
  };

  const handleConfirmOrder = () => {
    // Simpan pesanan ke localStorage agar tersinkronisasi dengan halaman /riwayat
    try {
      const existing = localStorage.getItem("mytronik-orders");
      const orderList: OrderRecord[] = existing ? JSON.parse(existing) : [];

      const today = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date());

      const vCode =
        generatedVoucher ||
        `MYT-${product.brandKey.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const cName = customerName.trim() || "Pelanggan MyTronik";
      const randomAccId = Math.random().toString(36).substring(2, 8);
      const sampleAutoLogin = `https://paytronik.digitalpremium.id/1/${randomAccId}`;

      const newOrder: OrderRecord = {
        id: generatedInvoice,
        service: product.name,
        brandKey: product.brandKey,
        planDuration: currentVariant.duration,
        priceFormatted: formatRupiah(currentVariant.samplePrice),
        samplePrice: currentVariant.samplePrice,
        date: today,
        customerName: cName,
        customerWhatsApp: customerWhatsApp.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerNotes: customerNotes.trim() || undefined,
        paymentMethod: paymentMethod,
        status: "Menunggu Konfirmasi",
        warrantyDaysRemaining: currentVariant.categoryType === "harian" ? 7 : 30,
        voucherCode: vCode,
        accountEmail: `user.${randomAccId}@mytronik.id`,
        accountPassword: `myt${Math.floor(100 + Math.random() * 900)}pass`,
        accountProfile: `Profil C (PIN: 1234)`,
        accountPin: "1234",
        autoLoginUrl: sampleAutoLogin,
      };

      orderList.unshift(newOrder);
      localStorage.setItem("mytronik-orders", JSON.stringify(orderList));

      // Kirim pesanan ke server API agar admin dapat mengonfirmasi pesanan secara langsung
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      }).catch(() => {
        // Fallback ke localStorage jika server offline
      });
    } catch {
      // Ignored if storage restricted
    }

    setStep(4);
  };

  const whatsappMessage = encodeURIComponent(
    `Halo CS MyTronik, saya telah membuat pesanan digital:\n` +
      `• No. Invoice: ${generatedInvoice}\n` +
      `• Kode Voucher: ${generatedVoucher}\n` +
      `• Nama Pembeli: ${customerName.trim() || "Pelanggan"}\n` +
      `• Layanan: ${product.name}\n` +
      `• Durasi: ${currentVariant.duration}\n` +
      `• Total Biaya: ${formatRupiah(currentVariant.samplePrice)}\n` +
      `• Metode Bayar: ${paymentMethod}\n` +
      `• WhatsApp Pembeli: ${customerWhatsApp}\n` +
      (customerEmail ? `• Email Pembeli: ${customerEmail}\n` : "") +
      `Mohon dibantu proses aktivasi akun/voucher.`
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-2xl text-slate-800 dark:text-slate-100">
        {/* Close Button Top Right with dedicated margin and spacing */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
          aria-label="Tutup pemesanan"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {/* Modal Stepper Header with generous right padding to prevent collision */}
        <div className="p-6 pr-20 sm:pr-24 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 rounded-t-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-orange-500 flex items-center gap-1.5 truncate">
              <ZapIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Sistem Pemesanan MyTronik</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
              {step <= 3 ? `Langkah ${step} dari 3` : "Pesanan Selesai"}
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 1 ? "bg-orange-500" : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 2 ? "bg-orange-500" : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 3 ? "bg-orange-500" : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
          </div>
        </div>

        {/* STEP 1: Konfigurasi Paket & Durasi */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-500">
                  {product.brandKey}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* Durasi Pilihan */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                Pilih Durasi Paket:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.planVariants.map((variant, idx) => {
                  const isSelected = selectedVariantIdx === idx;
                  return (
                    <button
                      key={variant.duration}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                          : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {variant.duration}
                        </div>
                        {variant.savingsLabel && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {variant.savingsLabel}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                          {formatRupiah(variant.samplePrice)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                  Total Biaya Paket:
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatRupiah(currentVariant.samplePrice)}
                </div>
              </div>
              <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Garansi Purna Jual</span>
                <span>Proses 5-10 Menit</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextToStep2}
              className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Data Pembeli</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Input Data Kontak Pembeli */}
        {step === 2 && (
          <form onSubmit={handleNextToStep3} noValidate className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Data Kontak Pengiriman Akun / Voucher
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Akun digital, profil PIN, dan petunjuk aktivasi akan dikirimkan langsung ke nomor WhatsApp Anda.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Nama Pelanggan <span className="text-slate-400 font-normal">(Untuk Tiket Voucher Akses)</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-orange-500">* (Wajib)</span>
                </label>
                <input
                  type="tel"
                  value={customerWhatsApp}
                  onChange={(e) => {
                    setCustomerWhatsApp(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  className={`w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border transition-all focus:outline-none ${
                    formError
                      ? "border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/20 dark:bg-orange-950/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-orange-500"
                  }`}
                />
                {/* Pemberitahuan khusus dalam Bahasa Indonesia tanpa popup bawaan browser */}
                {formError && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-600 dark:text-orange-400 font-medium flex items-start gap-2.5 animate-fadeIn">
                    <AlertCircleIcon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold uppercase text-[10px] tracking-wider mb-0.5">
                        Pemberitahuan:
                      </strong>
                      <span>{formError}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Email Akun Pribadi <span className="text-slate-400 font-normal">(Diperlukan untuk Canva / Spotify invite)</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Catatan Tambahan <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Extra warning if needed */}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="w-2/3 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Pilih Metode Pembayaran</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Metode Pembayaran */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Pilih Metode Pembayaran
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pilih metode pembayaran favorit Anda di bawah ini:
              </p>
            </div>

            <div className="space-y-2.5">
              {paymentOptions.map((opt) => {
                const isSelected = paymentMethod === opt.name;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.name)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-orange-50 dark:bg-orange-950/30 border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                        : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-orange-500 bg-orange-500" : "border-slate-400"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {opt.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800">
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Order Summary Confirmation */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Invoice ID:</span>
                <span className="font-mono font-bold text-orange-500">{generatedInvoice}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Layanan & Durasi:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {product.name} ({currentVariant.duration})
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>WhatsApp Penerima:</span>
                <span className="font-bold text-slate-900 dark:text-white">{customerWhatsApp}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                <span>Total Bayar:</span>
                <span className="text-orange-500">{formatRupiah(currentVariant.samplePrice)}*</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-2/3 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konfirmasi Pemesanan</span>
                <CheckIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Pesanan Selesai & Tindak Lanjut WhatsApp */}
        {step === 4 && (
          <div className="p-6 sm:p-10 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
              <CheckCircle2Icon className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Pesanan Berhasil Dibuat!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Nomor Invoice Anda adalah <strong className="font-mono text-orange-500">{generatedInvoice}</strong>.
                Pesanan Anda telah dicatat ke riwayat transaksi lokal perangkat Anda.
              </p>
            </div>

            {/* Voucher Card Banner */}
            <div className="p-4 rounded-3xl bg-linear-to-br from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/30 text-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                Kode Voucher Akses Akun Anda:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white tracking-wider bg-white dark:bg-slate-850 px-3.5 py-1.5 rounded-xl border border-orange-500/30 shadow-inner">
                  {generatedVoucher}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedVoucher);
                    setVoucherCopied(true);
                    setTimeout(() => setVoucherCopied(false), 2500);
                  }}
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  {voucherCopied ? "✓ Tersalin" : "Salin"}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Gunakan kode voucher di atas untuk membuka akun digital & panduan login Anda.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 max-w-md mx-auto pt-2">
              {/* Direct Voucher Claim Button */}
              <Link
                href={`/redeem?code=${generatedVoucher}`}
                onClick={onClose}
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-linear-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ZapIcon className="w-5 h-5" />
                <span>Buka & Klaim Akses Akun Sekarang</span>
              </Link>
              {/* WhatsApp direct trigger */}
              <a
                href={`https://wa.me/6285382191181?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-xl shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Kirim Pesanan ke WhatsApp CS Resmi</span>
              </a>

              {/* View in Riwayat */}
              <Link
                href="/riwayat"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors block text-center"
              >
                Lihat di Riwayat Pesanan
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 pt-1 cursor-pointer"
              >
                Tutup Jendela Ini
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              ⚡ Estimasi proses aktivasi: 5-10 menit setelah konfirmasi. Full garansi purna jual aktif selama masa paket.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
