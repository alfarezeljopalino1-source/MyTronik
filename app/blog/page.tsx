"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog-data";
import {
  SearchIcon,
  ArrowRightIcon,
  ClockIcon,
  SparklesIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Tips & Trik",
    "Desain Grafis",
    "Video Editing",
    "Streaming",
    "Produktivitas",
  ];

  const featuredPost = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (selectedCategory !== "Semua" && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchTag) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Wawasan & Tips Digital MyTronik</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Blog & <span className="text-orange-500">Panduan Digital.</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Pelajari trik mengoptimalkan paket Netflix, Spotify, CapCut, dan Canva untuk kebutuhan hiburan, studi, dan produktivitas Anda.
            </p>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Search Input */}
            <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-sm focus-within:border-orange-500">
              <SearchIcon className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, tips, atau tutorial..."
                className="w-full bg-transparent px-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-3"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-400"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Hero Article Spotlight (shown when no specific search/filter query) */}
          {selectedCategory === "Semua" && searchQuery === "" && featuredPost && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/30 hover:border-orange-500/50 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="relative h-64 lg:h-full lg:min-h-[380px] lg:col-span-7 bg-slate-800 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white shadow-md">
                      ARTIKEL UNGGULAN
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-10 lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-orange-500 font-bold">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400 font-normal">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white hover:text-orange-500 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={featuredPost.author.avatarUrl}
                          alt={featuredPost.author.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {featuredPost.author.name}
                        </span>
                        <span className="text-slate-400">{featuredPost.date}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-orange-500 hover:text-orange-600"
                    >
                      <span>Baca Panduan</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                {selectedCategory === "Semua" ? "Daftar Artikel Terbaru" : `Artikel: ${selectedCategory}`}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {filteredPosts.length} Artikel
              </span>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20 flex flex-col justify-between group hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                  >
                    <div>
                      {/* Thumbnail Media */}
                      <div className="relative h-52 w-full bg-slate-800 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-orange-400 border border-slate-700/80 backdrop-blur-md">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-slate-200 bg-slate-900/90 px-2 py-0.5 rounded-md backdrop-blur-md">
                          <ClockIcon className="w-3 h-3 text-orange-400" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-2.5">
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {post.date}
                        </span>

                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Author & Read Action */}
                    <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0">
                          <Image
                            src={post.author.avatarUrl}
                            alt={post.author.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-black uppercase text-orange-500 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Baca</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tidak ada artikel yang cocok dengan pencarian &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Semua");
                  }}
                  className="mt-3 px-4 py-2 rounded-full text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/40 border border-orange-300 dark:border-orange-800"
                >
                  Tampilkan Semua Artikel
                </button>
              </div>
            )}
          </div>

          {/* Bottom Consultation & Action Callout */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Butuh Rekomendasi Paket Sesuai Kebutuhan Anda?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                Konsultasikan langsung dengan tim Customer Service MyTronik. Kami siap membantu Anda memilih paket harian (mulai Rp1.500*) atau bulanan terbaik.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/produk"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all text-center"
              >
                Lihat Katalog Paket
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20MyTronik,%20saya%20butuh%20rekomendasi%20paket%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Konsultasi WA</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
