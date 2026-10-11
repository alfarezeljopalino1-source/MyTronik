"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NetflixIcon, SpotifyIcon, CapCutIcon, CanvaIcon } from "@/components/ui/icons";

export default function TutorialPage() {
  const [activeTab, setActiveTab] = useState<"netflix" | "spotify" | "capcut" | "canva">("netflix");

  const tutorials = {
    netflix: {
      title: "Panduan Aktivasi Netflix 4K (Profil Privat)",
      steps: [
        "Setelah pemesanan, Anda akan menerima Email dan Password akun dari CS via WhatsApp/Email.",
        "Buka aplikasi Netflix di Smart TV, PC, atau Smartphone Anda, lalu lakukan login.",
        "Pilih Profil khusus yang telah ditentukan dengan nama Anda.",
        "Masukkan PIN 4 digit pribadi yang Anda buat untuk mengamankan riwayat tontonan Anda.",
        "Selesai! Nikmati streaming film & serial favorit kualitas 4K Ultra HD tanpa on-hold.",
      ],
    },
    spotify: {
      title: "Panduan Aktivasi Spotify Premium (Akun Pribadi)",
      steps: [
        "Kirimkan alamat email Spotify pribadi Anda ke CS kami.",
        "Buka inbox email Anda dan klik tautan undangan resmi keluarga / premium yang kami kirimkan.",
        "Konfirmasi bergabung ke grup langganan (tidak perlu ganti password).",
        "Buka aplikasi Spotify Anda, status akun akan langsung otomatis berubah menjadi Spotify Premium.",
        "Seluruh playlist, lagu tersimpan, dan riwayat musik Anda tetap 100% aman.",
      ],
    },
    capcut: {
      title: "Panduan Aktivasi CapCut Pro (PC & Mobile)",
      steps: [
        "Unduh aplikasi CapCut resmi dari situs resmi (desktop Windows/Mac) atau Play Store / App Store.",
        "Login menggunakan akun Google / Akun CapCut Pro yang telah disiapkan oleh CS.",
        "Fitur Pro (Auto-caption, AI Video Enhance, efek VIP) akan langsung aktif di toolbar aplikasi.",
        "Saat melakukan ekspor video, pastikan memilih resolusi 2K/4K 60fps tanpa watermark.",
        "Proyek Anda otomatis tersimpan di cloud storage akun Anda.",
      ],
    },
    canva: {
      title: "Panduan Aktivasi Canva Pro (Undangan Email)",
      steps: [
        "Kirimkan alamat email akun Canva Anda kepada tim kami.",
        "Cek inbox email Anda dan temukan pesan berjudul 'Undangan bergabung ke Tim Canva Pro'.",
        "Klik tombol 'Terima Undangan' dan login ke akun Canva Anda seperti biasa.",
        "Pilih workspace tim MyTronik di pojok kiri atas untuk membuka seluruh fitur Magic Studio & 100M+ aset VIP.",
        "Desain pribadi Anda tetap tersimpan di folder privat Anda dan aman dari pengguna lain.",
      ],
    },
  };

  const current = tutorials[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Tutorial & <span className="text-orange-500">Panduan Aktivasi.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Langkah-langkah praktis dan mudah untuk mulai menggunakan akun digital Anda dalam hitungan menit.
            </p>
          </div>

          {/* Brand Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab("netflix")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                activeTab === "netflix"
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <NetflixIcon className="w-3.5 h-3.5" />
              <span>Netflix</span>
            </button>
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                activeTab === "spotify"
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <SpotifyIcon className="w-3.5 h-3.5" />
              <span>Spotify</span>
            </button>
            <button
              onClick={() => setActiveTab("capcut")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                activeTab === "capcut"
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <CapCutIcon className="w-3.5 h-3.5" />
              <span>CapCut</span>
            </button>
            <button
              onClick={() => setActiveTab("canva")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                activeTab === "canva"
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <CanvaIcon className="w-3.5 h-3.5" />
              <span>Canva</span>
            </button>
          </div>

          {/* Active Tutorial Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/30 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {current.title}
            </h2>

            <div className="space-y-4">
              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60"
                >
                  <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
