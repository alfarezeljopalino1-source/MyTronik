"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function BlogPage() {
  const posts = [
    {
      title: "5 Trik Memaksimalkan Fitur Magic Studio di Canva Pro untuk Bisnis Online",
      date: "10 Okt 2026",
      category: "Desain Grafis",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
      excerpt: "Pelajari cara menghapus background foto produk dalam hitungan detik dan membuat poster promosi otomatis menggunakan generator AI terintegrasi.",
    },
    {
      title: "Cara Menikmati Streaming Netflix 4K UHD Tanpa Masalah Buffering di Smart TV",
      date: "08 Okt 2026",
      category: "Streaming",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80",
      excerpt: "Panduan pengaturan audio spasial, optimasi bitrate koneksi internet rumah, dan keamanan profil privat dengan PIN 4-digit.",
    },
    {
      title: "Tips Ekspor Video 4K 60fps Bebas Watermark di CapCut untuk TikTok & Reels",
      date: "05 Okt 2026",
      category: "Video Editing",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
      excerpt: "Manfaatkan fitur auto-caption bilingual dan noise remover untuk kualitas suara yang jernih setara rekaman mikrofon studio.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Blog & <span className="text-orange-500">Tips Digital.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Artikel informatif, tutorial kreatif, dan berita seputar ekosistem aplikasi digital terpopuler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <article
                key={idx}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20 flex flex-col justify-between group hover:border-orange-500/50 transition-all"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-800">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-orange-500 font-bold">
                      <span>{post.category}</span>
                      <span className="text-slate-400">{post.date}</span>
                    </div>

                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform cursor-pointer">
                    <span>Baca Selengkapnya</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
