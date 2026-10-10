import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyTronik - Paket Langganan Netflix, Spotify, CapCut & Canva Bergaransi",
  description:
    "Pusat langganan paket Netflix 4K UHD, Spotify Premium, CapCut Pro Creator Suite, dan Canva Pro Desain terpercaya untuk pengguna Indonesia. Pengiriman cepat 5-10 menit & garansi penuh.",
  keywords: [
    "paket netflix",
    "paket spotify",
    "paket capcut",
    "paket canva",
    "netflix ultra hd",
    "spotify premium",
    "capcut pro pc",
    "canva pro desain",
    "MyTronik",
  ],
  authors: [{ name: "MyTronik Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('mytronik-theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  document.documentElement.classList.remove('dark', 'light');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-250">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
