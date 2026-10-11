"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UnifiedPackageSelector from "@/components/UnifiedPackageSelector";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import ComparisonTable from "@/components/ComparisonTable";
import ServiceHighlights from "@/components/ServiceHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingActionBox from "@/components/FloatingActionBox";
import ProductOrderModal from "@/components/ProductOrderModal";
import { PRODUCTS } from "@/data/mock-data";
import { BrandKey, Product } from "@/types";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<BrandKey | null>(null);
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [orderVariantIndex, setOrderVariantIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleExploreClick = () => {
    const elem = document.getElementById("produk");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectBrand = (brand: BrandKey | null) => {
    setSelectedBrand(brand);
    const elem = document.getElementById("produk");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenOrderModal = (product: Product, variantIndex: number) => {
    setOrderModalProduct(product);
    setOrderVariantIndex(variantIndex);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-250">
      {/* 1. Header / Navbar with Light/Dark Mode Switcher */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Live Brand Spotlight */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onSelectBrand={handleSelectBrand}
        />

        {/* 3. Unified Package Selector (Paket Menjadi Satu & Customer Memilih Sendiri) */}
        <UnifiedPackageSelector />

        {/* 4. Core Catalog (Netflix, Spotify, CapCut, Canva) */}
        <FeaturedProducts
          products={PRODUCTS}
          selectedBrand={selectedBrand}
          onSelectBrand={(b) => setSelectedBrand(b)}
          searchQuery=""
        />

        {/* 5. Cara Pemesanan 3 Langkah Mudah */}
        <HowItWorks />

        {/* 6. Perbandingan Fitur Gratis vs Paket MyTronik */}
        <ComparisonTable />

        {/* 7. Keunggulan Standar Layanan (4 Pilar) */}
        <ServiceHighlights />

        {/* 8. Ulasan & Testimoni Pelanggan */}
        <TestimonialsSection />

        {/* 9. FAQ Seputar Netflix, Spotify, CapCut & Canva */}
        <FAQSection />
      </main>

      {/* Floating Action Island Box (Mengapung otomatis saat digulir ke bawah) */}
      <FloatingActionBox
        products={PRODUCTS}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Product Order Modal Checkout Flow */}
      <ProductOrderModal
        product={orderModalProduct}
        initialVariantIndex={orderVariantIndex}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* 10. Footer Navigasi & Legal Disclaimer */}
      <Footer />
    </div>
  );
}
