export type BrandKey = "netflix" | "spotify" | "capcut" | "canva";

export type PlanCategoryType = "harian" | "hemat";

export interface PlanVariant {
  id?: string;
  duration: string; // e.g. "1 Hari", "3 Hari", "7 Hari", "1 Bulan", "1 Tahun"
  categoryType: PlanCategoryType; // "harian" (1-7 hari) vs "hemat" (bulanan/tahunan)
  samplePrice: number;
  sampleOriginalPrice?: number;
  isPopular?: boolean;
  savingsLabel?: string;
  badge?: string;
  description?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  brandKey: BrandKey;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  brandColor: string;
  badge?: "Terlaris" | "Promo Spesial" | "Rekomendasi" | "Hemat Maksimal" | "Termurah";
  stockStatus: string;
  rating: number;
  ratingCount: number;
  deliveryType: "Otomatis (Instant)" | "Proses 5-10 Menit" | "Aktivasi Cepat";
  planVariants: PlanVariant[];
  selectedVariantIndex?: number;
  features: string[];
  specs: ProductSpec[];
  disclaimer: string;
  imageUrl: string;
}

export interface ComparisonItem {
  feature: string;
  freePlan: string;
  mytronikPlan: string;
  isHighlight?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  brandUsed: "Netflix" | "Spotify" | "CapCut" | "Canva";
  rating: number;
  comment: string;
  date: string;
}

export interface OrderStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  brandKey?: BrandKey | "umum";
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  productCount: number;
}

/* BLOG DATA TYPES */
export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface BlogArticleSection {
  heading: string;
  body: string;
  proTip?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "Tips & Trik" | "Streaming" | "Desain Grafis" | "Video Editing" | "Produktivitas";
  date: string;
  readTime: string;
  author: BlogAuthor;
  tags: string[];
  relatedBrandKey?: BrandKey;
  isFeatured?: boolean;
  sections: BlogArticleSection[];
}

/* ORDER SUBMISSION & TRACKING TYPES */
export type OrderStatus =
  | "Menunggu Konfirmasi"
  | "Diproses"
  | "Aktif"
  | "Selesai"
  | "Dibatalkan";

export interface OrderRecord {
  id: string;
  service: string;
  brandKey: BrandKey;
  planDuration: string;
  priceFormatted: string;
  samplePrice: number;
  date: string;
  customerWhatsApp: string;
  customerEmail?: string;
  customerNotes?: string;
  paymentMethod: string;
  status: OrderStatus;
  warrantyDaysRemaining: number;
  confirmedAt?: string;
  accountCredentials?: string;
}
