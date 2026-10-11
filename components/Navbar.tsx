"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogoIcon,
  ShoppingBagIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
} from "./ui/icons";
import { useTheme } from "@/context/ThemeContext";
export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "PRODUK", href: "/produk" },
    { label: "TUTORIAL", href: "/tutorial" },
    { label: "BLOG", href: "/blog" },
    { label: "REDEEM", href: "/redeem" },
    { label: "RIWAYAT", href: "/riwayat" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-md transition-colors duration-250">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo matching screenshot (Orange Crown Icon + MYTRONIK) */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <LogoIcon className="w-10 h-10 transition-transform group-hover:scale-105" />
          <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white uppercase font-sans">
            MYTRONIK
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`py-1 transition-colors relative ${
                  isActive
                    ? "text-orange-500 font-extrabold"
                    : "text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions matching screenshot */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Circular Theme Toggle matching screenshot (Sun in dark, Moon in light) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm cursor-pointer"
            aria-label="Toggle theme mode"
            title={theme === "dark" ? "Mode Gelap aktif (Klik untuk ganti ke Terang)" : "Mode Terang aktif (Klik untuk ganti ke Gelap)"}
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <MoonIcon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Circular Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm cursor-pointer"
              aria-label="Lihat notifikasi"
            >
              <BellIcon className="w-4 h-4" />
            </button>

            {/* Notification Flyout (Kosong untuk saat ini) */}
            {notifOpen && (
              <div
                onMouseLeave={() => setNotifOpen(false)}
                className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] p-4 shadow-2xl z-50 text-xs animate-fadeIn"
              >
                <div className="font-bold text-slate-900 dark:text-white pb-2 mb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>Pemberitahuan</span>
                  <span className="text-[10px] font-normal text-slate-400">0 Baru</span>
                </div>
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <BellIcon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Belum ada pemberitahuan baru
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                    Pemberitahuan promo dan info transaksi Anda akan tampil di sini.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Orange Pill CTA Button: MULAI BELI */}
          <Link
            href="/produk"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white bg-linear-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/30 hover:shadow-orange-500/50 transition-all cursor-pointer"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            <span>MULAI BELI</span>
          </Link>
        </div>

        {/* Mobile Actions: Theme Toggle + Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <MoonIcon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1128] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-bold uppercase rounded-xl transition-colors ${
                  pathname === item.href
                    ? "text-orange-500 bg-orange-500/10"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500 dark:text-slate-400">Pilihan Tema:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  theme === "dark"
                    ? "bg-orange-500/20 text-orange-400 border-orange-500/50"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
              >
                <MoonIcon className="w-3.5 h-3.5" />
                <span>Gelap</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  theme === "light"
                    ? "bg-amber-500/20 text-amber-600 border-amber-500/50"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
              >
                <SunIcon className="w-3.5 h-3.5" />
                <span>Terang</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/produk"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-extrabold uppercase text-white bg-linear-to-r from-orange-500 to-amber-500 rounded-xl shadow-md"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              <span>MULAI BELI</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
