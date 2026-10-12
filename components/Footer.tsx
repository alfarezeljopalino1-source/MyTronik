import React from "react";
import Link from "next/link";
import {
  LogoIcon,
  ShieldCheckIcon,
  HeadsetIcon,
  ZapIcon,
  NetflixIcon,
  SpotifyIcon,
  CapCutIcon,
  CanvaIcon,
} from "./ui/icons";

export default function Footer() {
  const paymentMethods = [
    { name: "QRIS Nasional" },
    { name: "GoPay" },
    { name: "OVO" },
    { name: "DANA" },
    { name: "ShopeePay" },
    { name: "BCA Mobile" },
    { name: "Livin by Mandiri" },
    { name: "BRImo" },
  ];

  const brandLinks = [
    { name: "Paket Netflix 4K Ultra HD", href: "/produk", icon: <NetflixIcon className="w-3.5 h-3.5" /> },
    { name: "Paket Spotify Premium Bebas Iklan", href: "/produk", icon: <SpotifyIcon className="w-3.5 h-3.5" /> },
    { name: "Paket CapCut Pro Creator Suite", href: "/produk", icon: <CapCutIcon className="w-3.5 h-3.5" /> },
    { name: "Paket Canva Pro Desain & AI", href: "/produk", icon: <CanvaIcon className="w-3.5 h-3.5" /> },
  ];

  return (
    <footer className="w-full bg-[#060B18] border-t border-slate-800 text-slate-300">
      {/* Top Value Assurance Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Jaminan Garansi Purna Jual
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Penggantian akun baru jika terjadi kendala selama masa aktif.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <HeadsetIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Bantuan CS Responsif
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Panduan aktivasi dibimbing langsung via WhatsApp setiap hari.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <ZapIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Aktivasi Cepat 5-10 Menit
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proses otomatis dan langsung bisa digunakan di perangkat Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Payment Pill list */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <LogoIcon className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  My<span className="text-sky-400">Tronik</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  Toko Paket Produk Digital Indonesia
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Platform independen penyedia paket langganan Netflix, Spotify, CapCut, dan Canva dengan harga bersahabat, proses aktivasi kilat, dan jaminan purna jual terpercaya untuk pengguna Indonesia.
            </p>

            {/* Payment simulation badges */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Metode Pembayaran:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {paymentMethods.map((pm) => (
                  <span
                    key={pm.name}
                    className="px-2.5 py-1 text-[10px] font-medium bg-slate-900 text-slate-300 rounded-lg border border-slate-800"
                  >
                    {pm.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Layanan Utama
            </h5>
            <ul className="space-y-3 text-xs text-slate-400">
              {brandLinks.map((bl) => (
                <li key={bl.name}>
                  <Link
                    href={bl.href}
                    className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                  >
                    {bl.icon}
                    <span>{bl.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Pusat Informasi
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/produk" className="hover:text-orange-400 transition-colors block">
                  Semua Paket Produk
                </Link>
              </li>
              <li>
                <Link href="/redeem" className="hover:text-orange-400 transition-colors block">
                  Tukarkan Voucher
                </Link>
              </li>
              <li>
                <Link href="/riwayat" className="hover:text-orange-400 transition-colors block">
                  Riwayat & Cek Status
                </Link>
              </li>
              <li>
                <Link href="/tutorial" className="hover:text-orange-400 transition-colors block">
                  Tutorial & Panduan Aktivasi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors block">
                  Blog & Tips Digital
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Bantuan & CS
            </h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <p className="text-[11px] text-slate-400">Jam Layanan:</p>
                <p className="font-semibold text-slate-200">24 Jam (Sistem Cepat)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">CS: 08.00 - 23.30 WIB</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400">Konsultasi Pemesanan:</p>
                <p className="font-semibold text-sky-400">WhatsApp & Live Chat</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400">Wilayah Layanan:</p>
                <p className="font-semibold text-slate-200">Seluruh Wilayah Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Legal Warning */}
        <div className="mt-12 pt-6 border-t border-slate-800/80">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-[11px] leading-relaxed text-slate-400">
            <span className="font-bold text-slate-300 block mb-1">
              Pernyataan Kepatuhan Merek Dagang & Hak Cipta:
            </span>
            Seluruh nama produk, logo, dan merek dagang (Netflix, Spotify, CapCut/Bytedance, dan Canva) yang disebutkan dalam website ini adalah milik dari pemilik hak cipta masing-masing. MyTronik adalah platform digital independen yang membantu proses pendampingan aktivasi dan pemberian garansi layanan purna jual bagi pengguna di Indonesia. Harga yang tercantum pada website ini adalah tarif layanan pemesanan paket digital untuk pengguna di Indonesia.
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 MyTronik. Platform Penjualan Paket Digital Terpercaya Indonesia.</p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-slate-300 cursor-pointer">Kebijakan Privasi</span>
            <Link href="/admin" className="text-slate-400 hover:text-orange-400 transition-colors">
              Panel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
