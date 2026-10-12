"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  CheckCircle2Icon,
  ClockIcon,
} from "./ui/icons";
import { useTheme } from "@/context/ThemeContext";
import { OrderRecord } from "@/types";

interface NotificationItem {
  id: string;
  orderId: string;
  title: string;
  subtitle: string;
  status: string;
  time: string;
  link: string;
  voucherCode?: string;
  isRead: boolean;
}
export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readKeys, setReadKeys] = useState<string[]>([]);

  const syncNotifications = useCallback(async () => {
    let orderList: OrderRecord[] = [];
    try {
      const stored = localStorage.getItem("mytronik-orders");
      if (stored) {
        orderList = JSON.parse(stored);
      }
    } catch {
      orderList = [];
    }

    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
        orderList = data.orders;
      }
    } catch {
      // Fallback ke localStorage
    }

    let savedReadKeys: string[] = [];
    try {
      const r = localStorage.getItem("mytronik-read-notifs");
      if (r) savedReadKeys = JSON.parse(r);
    } catch {
      savedReadKeys = [];
    }
    setReadKeys(savedReadKeys);

    const items: NotificationItem[] = orderList.slice(0, 10).map((o) => {
      const key = `${o.id}:${o.status}`;
      const isAktif = o.status === "Aktif" || o.status === "Selesai";
      return {
        id: key,
        orderId: o.id,
        title: isAktif ? "Pembayaran Diterima & Akun Siap!" : "Pesanan Dibuat (Menunggu QRIS)",
        subtitle: `${o.service} (${o.planDuration})`,
        status: o.status,
        time: o.confirmedAt || o.date,
        link: isAktif ? `/redeem?code=${o.voucherCode || o.id}` : `/riwayat`,
        voucherCode: o.voucherCode,
        isRead: savedReadKeys.includes(key),
      };
    });

    setNotifications(items);
  }, []);

  useEffect(() => {
    syncNotifications();
    const handleStorage = () => syncNotifications();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mytronik-order-updated", handleStorage);
    const interval = setInterval(syncNotifications, 8000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mytronik-order-updated", handleStorage);
      clearInterval(interval);
    };
  }, [syncNotifications]);

  const markAllAsRead = () => {
    const allKeys = notifications.map((n) => n.id);
    setReadKeys(allKeys);
    try {
      localStorage.setItem("mytronik-read-notifs", JSON.stringify(allKeys));
    } catch {
      // Ignored
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markItemAsRead = (itemKey: string) => {
    const updated = Array.from(new Set([...readKeys, itemKey]));
    setReadKeys(updated);
    try {
      localStorage.setItem("mytronik-read-notifs", JSON.stringify(updated));
    } catch {
      // Ignored
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === itemKey ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
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
              className="relative w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm cursor-pointer"
              aria-label="Lihat notifikasi"
            >
              <BellIcon className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-linear-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Flyout Dinamis */}
            {notifOpen && (
              <div
                onMouseLeave={() => setNotifOpen(false)}
                className="absolute right-0 top-full mt-2 w-80 sm:w-88 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] shadow-2xl z-50 text-xs animate-fadeIn overflow-hidden"
              >
                <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">Pemberitahuan</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        unreadCount > 0
                          ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                          : "bg-slate-200/60 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {unreadCount > 0 ? `${unreadCount} Baru` : "Semua Terbaca"}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[10px] font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      Tandai Dibaca
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="py-8 px-4 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                      <BellIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Belum ada pemberitahuan baru
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-50 mx-auto">
                      Pemberitahuan promo dan info transaksi Anda akan tampil di sini.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                    {notifications.map((notif) => {
                      const isAktif = notif.status === "Aktif" || notif.status === "Selesai";
                      return (
                        <Link
                          key={notif.id}
                          href={notif.link}
                          onClick={() => {
                            markItemAsRead(notif.id);
                            setNotifOpen(false);
                          }}
                          className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors block ${
                            !notif.isRead ? "bg-orange-50/40 dark:bg-orange-950/15" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                              isAktif
                                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {isAktif ? (
                              <CheckCircle2Icon className="w-4 h-4" />
                            ) : (
                              <ClockIcon className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {notif.title}
                              </span>
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                              )}
                            </div>

                            <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                              {notif.subtitle}
                            </p>

                            <div className="flex items-center justify-between pt-0.5 text-[10px] text-slate-400">
                              <span className="font-mono">{notif.orderId}</span>
                              <span>{notif.time}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                <div className="p-2.5 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center">
                  <Link
                    href="/riwayat"
                    onClick={() => setNotifOpen(false)}
                    className="text-[11px] font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors block py-1"
                  >
                    Lihat Semua Transaksi di Riwayat →
                  </Link>
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
        {/* Mobile Actions: Notifikasi + Theme Toggle + Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center"
              aria-label="Lihat notifikasi"
            >
              <BellIcon className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-linear-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </div>
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
