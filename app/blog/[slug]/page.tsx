import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog-data";
import { PRODUCTS, formatRupiah } from "@/data/mock-data";
import {
  ArrowRightIcon,
  ClockIcon,
  ZapIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Cari produk terkait jika artikel memiliki relatedBrandKey
  const relatedProduct = post.relatedBrandKey
    ? PRODUCTS.find((prod) => prod.brandKey === post.relatedBrandKey)
    : null;

  // Artikel terkait lainnya
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E1F] text-slate-900 dark:text-slate-100 transition-colors duration-250">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-orange-500 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-orange-500 font-bold truncate max-w-xs">{post.category}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white shadow-sm">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                <ClockIcon className="w-3.5 h-3.5 text-orange-500" />
                <span>{post.readTime}</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">{post.date}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18] font-sans">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-orange-500 pl-4 py-1">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            {/* Author bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {post.author.name}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {post.author.role}
                  </span>
                </div>
              </div>

              {/* Share action */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} - Baca selengkapnya di MyTronik: https://mytronik.local/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Bagikan</span>
                </a>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-800 shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>

          {/* Article Sections Body */}
          <article className="space-y-8 text-slate-800 dark:text-slate-200">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-3.5">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {section.heading}
                </h2>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>

                {/* Highlighted Pro Tip Box */}
                {section.proTip && (
                  <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 text-xs sm:text-sm text-orange-900 dark:text-orange-200 leading-relaxed flex items-start gap-3">
                    <span className="text-base select-none">💡</span>
                    <div>
                      <strong className="block mb-0.5 text-orange-700 dark:text-orange-300">
                        Pro Tip MyTronik:
                      </strong>
                      {section.proTip}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* Contextual Product Recommendation Widget */}
          {relatedProduct && (
            <div className="rounded-3xl border border-orange-500/40 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-600 dark:text-orange-400">
                <ZapIcon className="w-4 h-4" />
                <span>Rekomendasi Paket Langganan Terkait</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-lg">
                    {relatedProduct.tagline}. Tersedia opsi paket harian mulai {formatRupiah(relatedProduct.planVariants[0].samplePrice)}* untuk kebutuhan fleksibel.
                  </p>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold">Mulai Dari:</span>
                  <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
                    {formatRupiah(relatedProduct.planVariants[0].samplePrice)}*
                  </div>
                  <Link
                    href={`/produk`}
                    className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/30 transition-all cursor-pointer"
                  >
                    <span>Pilih Paket Ini</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
              Topik Terkait:
            </span>
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Artikel Menarik Lainnya
              </h3>
              <Link
                href="/blog"
                className="text-xs font-bold text-orange-500 hover:underline"
              >
                Lihat Semua Blog
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 group hover:border-orange-500/50 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-orange-500 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {rel.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
