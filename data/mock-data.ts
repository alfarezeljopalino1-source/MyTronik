import {
  Product,
  ComparisonItem,
  Testimonial,
  OrderStep,
  FaqItem,
  ServiceFeature,
  Category,
} from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "netflix",
    name: "Netflix Premium",
    slug: "netflix",
    description: "Streaming film & serial kualitas 4K UHD profil privat.",
    iconName: "tv",
    productCount: 5,
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    slug: "spotify",
    description: "Musik bebas iklan, download offline 320kbps akun pribadi.",
    iconName: "gamepad",
    productCount: 5,
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    slug: "capcut",
    description: "Editing video PC & HP, auto-caption AI, bebas watermark.",
    iconName: "video",
    productCount: 5,
  },
  {
    id: "canva",
    name: "Canva Pro",
    slug: "canva",
    description: "Jutaan template, Brand Kit, Magic Studio AI & 1TB Cloud.",
    iconName: "palette",
    productCount: 5,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "netflix-pro",
    brandKey: "netflix",
    name: "Paket Netflix Premium 4K UHD",
    tagline: "Profil Privat dengan PIN Khusus, Audio Spasial & Garansi Anti On-Hold",
    shortDescription:
      "Tonton film dan serial favorit di Smart TV, laptop, atau smartphone dengan kualitas terbaik 4K Ultra HD. Pilihan paket harian hemat hingga bulanan.",
    fullDescription:
      "Paket langganan Netflix kualitas tertinggi dengan profil privat yang diamankan PIN 4 digit. Nikmati tontonan berkualitas 4K UHD, dukungan audio spasial, dan fitur download offline. Tersedia paket harian 1-7 hari untuk nonton santai dan paket bulanan bergaransi penuh.",
    brandColor: "#E50914",
    badge: "Terlaris",
    stockStatus: "Ready Stock • Sisa 6 Slot",
    rating: 4.9,
    ratingCount: 540,
    deliveryType: "Proses 5-10 Menit",
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80",
    planVariants: [
      {
        id: "net-1d",
        duration: "1 Hari (24 Jam)",
        categoryType: "harian",
        samplePrice: 3500,
        sampleOriginalPrice: 5000,
        savingsLabel: "Paling Murah",
        description: "Akses kilat 24 jam nonton film akhir pekan",
      },
      {
        id: "net-3d",
        duration: "3 Hari (Weekend)",
        categoryType: "harian",
        samplePrice: 9000,
        sampleOriginalPrice: 15000,
        isPopular: true,
        savingsLabel: "Favorit Harian",
        description: "Cocok untuk marathon serial 3 hari penuh",
      },
      {
        id: "net-7d",
        duration: "7 Hari (1 Minggu)",
        categoryType: "harian",
        samplePrice: 18000,
        sampleOriginalPrice: 25000,
        savingsLabel: "Hemat 28%",
        description: "Akses 1 minggu penuh tanpa ribet",
      },
      {
        id: "net-1m",
        duration: "1 Bulan (30 Hari)",
        categoryType: "hemat",
        samplePrice: 38000,
        sampleOriginalPrice: 54000,
        savingsLabel: "Profil Privat",
        description: "1 Bulan profil privat PIN 4-digit",
      },
      {
        id: "net-3m",
        duration: "3 Bulan (90 Hari)",
        categoryType: "hemat",
        samplePrice: 105000,
        sampleOriginalPrice: 160000,
        savingsLabel: "Super Hemat",
        description: "Paket hemat jangka panjang garansi aktif",
      },
    ],
    features: [
      "Streaming Resolusi Maksimal 4K Ultra HD & HDR",
      "1 Profil Privat Dilengkapi Proteksi PIN 4-Digit",
      "Dukungan Device: Smart TV, PC/Laptop, Tablet & HP",
      "Bebas Jeda Iklan Komersial Selamanya",
      "Fitur Download Film untuk Ditonton Tanpa Kuota",
      "Garansi Penuh Ganti Akun jika Mengalami Kendala",
    ],
    specs: [
      { label: "Kualitas Video", value: "4K UHD (2160p) + HDR" },
      { label: "Audio", value: "Dolby Atmos & Spatial Audio" },
      { label: "Layar Aktif", value: "1 Layar per Profil Privat" },
      { label: "Wilayah Server", value: "Indonesia Resmi (Bisa Semua ISP)" },
      { label: "Garansi", value: "Garansi Penuh Selama Durasi Paket" },
    ],
    disclaimer:
      "Catatan Kepatuhan: Seluruh nama dan logo merek Netflix adalah hak cipta dari Netflix, Inc. MyTronik adalah platform independen penyedia bantuan langganan dan garansi layanan.",
  },
  {
    id: "spotify-pro",
    brandKey: "spotify",
    name: "Paket Spotify Premium Bebas Iklan",
    tagline: "Audio Kualitas Tinggi 320kbps, Download Offline & Bisa Akun Pribadi",
    shortDescription:
      "Dengarkan jutaan lagu dan podcast tanpa gangguan iklan. Pilihan paket harian mulai Rp2.000* hingga bulanan.",
    fullDescription:
      "Nikmati pengalaman mendengarkan musik terbaik dengan Spotify Premium. Download lagu hingga 10.000 trek untuk diputar offline di pesawat atau saat kuota habis, kualitas suara 320kbps jernih, dan fitur skip lagu tak terbatas. Bisa digunakan di akun email pribadi Anda sendiri.",
    brandColor: "#1DB954",
    badge: "Rekomendasi",
    stockStatus: "Ready Stock • Aktivasi Cepat",
    rating: 4.9,
    ratingCount: 680,
    deliveryType: "Otomatis (Instant)",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    planVariants: [
      {
        id: "spo-1d",
        duration: "1 Hari (24 Jam)",
        categoryType: "harian",
        samplePrice: 2000,
        sampleOriginalPrice: 3500,
        savingsLabel: "Cuma 2 Ribu",
        description: "Cocok untuk nemenin jalan / roadtrip sehari",
      },
      {
        id: "spo-3d",
        duration: "3 Hari (Mini Pass)",
        categoryType: "harian",
        samplePrice: 5500,
        sampleOriginalPrice: 8000,
        savingsLabel: "Praktis",
        description: "3 Hari musik non-stop tanpa jeda iklan",
      },
      {
        id: "spo-7d",
        duration: "7 Hari (1 Minggu)",
        categoryType: "harian",
        samplePrice: 10000,
        sampleOriginalPrice: 15000,
        isPopular: true,
        savingsLabel: "Best Harian",
        description: "1 Minggu penuh bebas skip dan download",
      },
      {
        id: "spo-1m",
        duration: "1 Bulan (30 Hari)",
        categoryType: "hemat",
        samplePrice: 22000,
        sampleOriginalPrice: 35000,
        savingsLabel: "Akun Pribadi",
        description: "Upgrade langsung ke email pribadi sendiri",
      },
      {
        id: "spo-3m",
        duration: "3 Bulan (90 Hari)",
        categoryType: "hemat",
        samplePrice: 59000,
        sampleOriginalPrice: 105000,
        savingsLabel: "Hemat 45%",
        description: "Playlist & artis tersimpan tetap utuh",
      },
    ],
    features: [
      "Bebas Gangguan Iklan Audio & Banner",
      "Kualitas Audio Maksimal 320 kbps (Sangat Jernih)",
      "Bebas Skip Lagu Tanpa Batasan Jumlah",
      "Bisa Digunakan pada Akun Email Pribadi Anda Sendiri",
      "Download Musik hingga 10.000 Lagu untuk Mode Offline",
      "Mendukung Spotify Connect ke Speaker Bluetooth & Smart TV",
    ],
    specs: [
      { label: "Kualitas Suara", value: "320 kbps (Extreme Quality)" },
      { label: "Tipe Aktivasi", value: "Bisa Akun Lama / Akun Baru" },
      { label: "Batas Download", value: "Hingga 10.000 Lagu per Perangkat" },
      { label: "Platform", value: "Android, iOS, Windows, Mac, Web" },
      { label: "Garansi", value: "Full Garansi Penggantian jika Terputus" },
    ],
    disclaimer:
      "Hak cipta dan merek dagang dimiliki oleh Spotify AB. Penggunaan layanan tunduk pada Ketentuan Pengguna Akhir Spotify.",
  },
  {
    id: "capcut-pro",
    brandKey: "capcut",
    name: "Paket CapCut Pro Creator Suite",
    tagline: "Auto-Caption Akurat, Efek AI Sinematik & Ekspor 4K 60fps Tanpa Watermark",
    shortDescription:
      "Tools editing video terlengkap untuk konten kreator TikTok, Reels, dan YouTube. Paket harian mulai Rp2.500* untuk deadline proyek.",
    fullDescription:
      "Kembangkan kualitas konten video Anda ke level profesional dengan CapCut Pro. Buka akses ke seluruh template VIP, filter sinematik, efek transisi premium, teks otomatis (auto-caption) multibahasa, dan kapasitas penyimpanan cloud untuk kolaborasi proyek.",
    brandColor: "#00F2FE",
    badge: "Promo Spesial",
    stockStatus: "Ready Stock • Sisa 8 Slot",
    rating: 4.8,
    ratingCount: 390,
    deliveryType: "Proses 5-10 Menit",
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    planVariants: [
      {
        id: "cap-1d",
        duration: "1 Hari (Deadline)",
        categoryType: "harian",
        samplePrice: 2500,
        sampleOriginalPrice: 5000,
        savingsLabel: "Sprint 1 Hari",
        description: "Ekspor video deadline tanpa watermark 4K",
      },
      {
        id: "cap-3d",
        duration: "3 Hari (Creator)",
        categoryType: "harian",
        samplePrice: 7000,
        sampleOriginalPrice: 12000,
        savingsLabel: "Super Cepat",
        description: "Bikin video TikTok & Reels sepuasnya",
      },
      {
        id: "cap-7d",
        duration: "7 Hari (1 Minggu)",
        categoryType: "harian",
        samplePrice: 14000,
        sampleOriginalPrice: 20000,
        isPopular: true,
        savingsLabel: "Paling Laris",
        description: "Semua efek VIP & Auto Caption terbuka",
      },
      {
        id: "cap-1m",
        duration: "1 Bulan (30 Hari)",
        categoryType: "hemat",
        samplePrice: 32000,
        sampleOriginalPrice: 49000,
        savingsLabel: "PC & Mobile",
        description: "Bisa login di PC Desktop dan Smartphone",
      },
      {
        id: "cap-6m",
        duration: "6 Bulan Studio",
        categoryType: "hemat",
        samplePrice: 135000,
        sampleOriginalPrice: 220000,
        savingsLabel: "Hemat 40%",
        description: "Paket jangka menengah konten kreator",
      },
    ],
    features: [
      "Ekspor Kualitas 2K / 4K 60fps Tanpa Watermark",
      "Auto-Caption Multibahasa Cepat & Akurat Berbasis AI",
      "Buka Seluruh Efek, Filter, Font & Audio Library VIP",
      "Fitur AI Smart Cutout & Voice Enhancer Noise Removal",
      "Dukungan Sinkronisasi Multi-Perangkat (PC Desktop & Mobile)",
      "Penyimpanan Cloud Ekstra untuk Backup Proyek",
    ],
    specs: [
      { label: "Perangkat", value: "PC (Windows / macOS) & Mobile (Android / iOS)" },
      { label: "Format Ekspor", value: "Hingga 4K 60FPS Bitrate Tinggi" },
      { label: "Fitur AI", value: "Auto-Caption, Script-to-Video, Vocal Remover" },
      { label: "Watermark", value: "100% Bebas Watermark" },
      { label: "Garansi", value: "Garansi Sesuai Durasi Langganan" },
    ],
    disclaimer:
      "Merek dagang CapCut dimiliki oleh Bytedance Ltd. Layanan ini merupakan paket akun pendukung pembuatan konten dengan garansi aktif.",
  },
  {
    id: "canva-pro",
    brandKey: "canva",
    name: "Paket Canva Pro Desain & Kreatif",
    tagline: "Jutaan Template Eksklusif, Brand Kit, Magic Studio AI & 1TB Cloud Storage",
    shortDescription:
      "Solusi praktis desain grafis untuk UMKM, marketer, dan mahasiswa. Paket harian termurah mulai Rp1.500*.",
    fullDescription:
      "Ciptakan desain visual profesional tanpa batas dengan Canva Pro. Gunakan fitur Magic Resize untuk mengubah ukuran postingan ke semua media sosial sekali klik, hapus latar belakang foto instan, buat identitas Brand Kit dengan font kustom Anda, serta nikmati penyimpanan cloud 1 Terabyte.",
    brandColor: "#7D2AE8",
    badge: "Termurah",
    stockStatus: "Ready Stock • Aktivasi Instan",
    rating: 4.9,
    ratingCount: 780,
    deliveryType: "Otomatis (Instant)",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    planVariants: [
      {
        id: "can-1d",
        duration: "1 Hari (Tugas/Event)",
        categoryType: "harian",
        samplePrice: 1500,
        sampleOriginalPrice: 3000,
        savingsLabel: "Termurah (1.5rb)",
        description: "Bikin presentasi & poster tugas sehari kelar",
      },
      {
        id: "can-3d",
        duration: "3 Hari (Desain Kilat)",
        categoryType: "harian",
        samplePrice: 4000,
        sampleOriginalPrice: 7000,
        savingsLabel: "Hemat 42%",
        description: "Akses 100M+ aset & Background Remover",
      },
      {
        id: "can-7d",
        duration: "7 Hari (1 Minggu)",
        categoryType: "harian",
        samplePrice: 8000,
        sampleOriginalPrice: 15000,
        isPopular: true,
        savingsLabel: "Favorit Mahasiswa",
        description: "Akses Magic Studio AI selama 1 minggu",
      },
      {
        id: "can-1m",
        duration: "1 Bulan (30 Hari)",
        categoryType: "hemat",
        samplePrice: 18000,
        sampleOriginalPrice: 35000,
        savingsLabel: "Desain Bebas",
        description: "Bisa invite ke email akun pribadi sendiri",
      },
      {
        id: "can-1y",
        duration: "1 Tahun Penuh",
        categoryType: "hemat",
        samplePrice: 45000,
        sampleOriginalPrice: 95000,
        savingsLabel: "Best Value",
        description: "Setahun penuh desain bebas tanpa batasan",
      },
    ],
    features: [
      "Akses 100+ Juta Foto, Ilustrasi Vektor, Video & Audio VIP",
      "Magic Studio AI: Magic Eraser, Magic Resizer & Text-to-Image",
      "Penghapus Latar Belakang (Background Remover) Sekali Klik",
      "Kapasitas Penyimpanan Cloud 1.000 GB (1TB)",
      "Aktivasi Mudah via Undangan Email Akun Pribadi Sendiri",
      "Desain Pribadi Terjamin Aman dan Bersifat Privat",
    ],
    specs: [
      { label: "Metode Aktivasi", value: "Invite Email Pribadi (Desain Tetap Privat)" },
      { label: "Penyimpanan", value: "1TB Cloud Storage Pribadi" },
      { label: "Aset Premium", value: "100+ Juta Stok Aset Siap Pakai" },
      { label: "Dukungan Device", value: "Web, Ponsel (iOS/Android), Tablet & PC" },
      { label: "Garansi", value: "Garansi Penggantian Penuh Selama Masa Aktif" },
    ],
    disclaimer:
      "Merek dagang Canva dimiliki oleh Canva Pty Ltd. Akses diberikan melalui sistem undangan workspace legal dengan jaminan purna jual.",
  },
];

export const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    feature: "Biaya Langganan",
    freePlan: "Gratis tapi fitur dikunci",
    mytronikPlan: "Mulai Rp1.500* (Harian) & Rp18.000* (Bulanan)",
    isHighlight: true,
  },
  {
    feature: "Kualitas Streaming & Ekspor",
    freePlan: "Maksimal 720p / 1080p standar",
    mytronikPlan: "4K Ultra HD & 60fps tanpa watermark",
    isHighlight: true,
  },
  {
    feature: "Gangguan Iklan",
    freePlan: "Sering muncul iklan banner & audio",
    mytronikPlan: "100% Bersih bebas iklan komersial",
  },
  {
    feature: "Fitur AI & Magic Tools",
    freePlan: "Terkunci / kuota harian sangat sedikit",
    mytronikPlan: "Akses penuh fitur AI & template VIP",
    isHighlight: true,
  },
  {
    feature: "Mode Offline & Download",
    freePlan: "Tidak bisa download tanpa batasan",
    mytronikPlan: "Download sepuasnya untuk ditonton/didengar offline",
  },
  {
    feature: "Garansi & Bantuan Purna Jual",
    freePlan: "Tidak ada bantuan khusus",
    mytronikPlan: "Garansi penggantian penuh + CS WhatsApp 24/7",
    isHighlight: true,
  },
];

export const ORDER_STEPS: OrderStep[] = [
  {
    step: 1,
    title: "Pilih Aplikasi & Durasi Sendiri",
    description:
      "Tentukan aplikasi (Netflix, Spotify, CapCut, Canva) dan pilih durasi harian (1, 3, 7 hari) atau paket bulanan sesuai kebutuhan Anda.",
    badge: "Langkah 1",
  },
  {
    step: 2,
    title: "Konfirmasi & Pembayaran Aman",
    description:
      "Lakukan simulasi pembayaran melalui QRIS, E-Wallet (GoPay, OVO, DANA), atau Transfer Bank secara instan tanpa biaya tersembunyi.",
    badge: "Langkah 2",
  },
  {
    step: 3,
    title: "Akses Dikirim Dalam 5-10 Menit",
    description:
      "Panduan aktivasi atau undangan email akan langsung dikirimkan ke kontak WhatsApp/Email Anda beserta jaminan garansi masa aktif.",
    badge: "Langkah 3",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Dimas Prasetyo",
    role: "Video Creator Freelance",
    city: "Jakarta",
    brandUsed: "CapCut",
    rating: 5,
    comment:
      "Paket harian CapCut Pro 1 hari cuma Rp2.500 ngebantu banget pas lagi ada deadline ekspor video klien 4K 60fps. Nggak perlu langganan mahal sebulan penuh kalau cuma butuh sesekali!",
    date: "Kemarin",
  },
  {
    id: "testi-2",
    name: "Siti Rahmania",
    role: "Mahasiswi & Designer",
    city: "Bandung",
    brandUsed: "Canva",
    rating: 5,
    comment:
      "Canva Pro 1 hari Rp1.500 penyelamat tugas kuliah! Magic Studio dan remove background-nya langsung aktif di email pribadi sendiri. Desain skripsi jadi beres dalam semalam tanpa keluar banyak uang.",
    date: "3 hari yang lalu",
  },
  {
    id: "testi-3",
    name: "Rian Hidayat",
    role: "Penikmat Film Akhir Pekan",
    city: "Surabaya",
    brandUsed: "Netflix",
    rating: 5,
    comment:
      "Suka banget sama paket 3 hari Netflix-nya, cuma Rp9.000 pas buat marathon drakor pas weekend. Profil privat dikunci PIN sendiri dan gambarnya beneran 4K bening di Smart TV.",
    date: "5 hari yang lalu",
  },
  {
    id: "testi-4",
    name: "Aulia Nurul",
    role: "Digital Marketer",
    city: "Yogyakarta",
    brandUsed: "Spotify",
    rating: 5,
    comment:
      "Beli paket Spotify 7 hari pas lagi roadtrip ke Bali. Musik jalan terus offline tanpa iklan di headphone dan mobil. CS-nya fast respon banget ngasih panduan aktivasi.",
    date: "1 minggu yang lalu",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-harian",
    question: "Apa keuntungan membeli Paket Harian (1 - 7 Hari)?",
    answer:
      "Paket harian dirancang khusus untuk Anda yang hanya membutuhkan akses jangka pendek dengan harga sangat terjangkau (mulai Rp1.500*). Sangat cocok untuk nonton film akhir pekan (Netflix), perjalanan liburan (Spotify), deadline video mendadak (CapCut), atau tugas presentasi (Canva) tanpa harus membayar penuh 1 bulan.",
    brandKey: "umum",
  },
  {
    id: "faq-netflix",
    question: "Bagaimana sistem profil pada paket Netflix MyTronik?",
    answer:
      "Anda akan mendapatkan 1 profil pribadi khusus yang dapat dikunci menggunakan PIN 4 digit Anda sendiri. Riwayat tontonan, daftar favorit, dan algoritma rekomendasi film sepenuhnya privat dan tidak terganggu pengguna lain. Mendukung kualitas 4K UHD di TV, laptop, dan smartphone.",
    brandKey: "netflix",
  },
  {
    id: "faq-spotify",
    question: "Apakah langganan Spotify Premium bisa menggunakan akun email saya sendiri?",
    answer:
      "Ya! Anda bisa menggunakan akun Spotify lama Anda sendiri sehingga seluruh playlist, lagu tersimpan, dan artis favorit Anda tetap aman dan tidak hilang. Kami akan mengirimkan tautan aktivasi resmi yang langsung menaikkan status akun Anda menjadi Premium.",
    brandKey: "spotify",
  },
  {
    id: "faq-capcut",
    question: "Apakah CapCut Pro bisa digunakan di PC (Windows/Mac) dan Smartphone sekaligus?",
    answer:
      "Bisa. Akun CapCut Pro dapat Anda login di aplikasi CapCut desktop (Windows / macOS) maupun CapCut mobile (Android / iOS). Semua fitur VIP seperti auto-caption, AI cutout, dan ekspor 4K 60fps bebas watermark akan langsung terbuka di kedua perangkat.",
    brandKey: "capcut",
  },
  {
    id: "faq-canva",
    question: "Apakah data dan template desain di Canva saya aman?",
    answer:
      "Sangat aman. Sistem aktivasi Canva Pro dilakukan melalui undangan tim workspace resmi ke email pribadi Anda. Seluruh file dan karya desain yang Anda buat berada di folder privat Anda dan tidak dapat dilihat oleh anggota workspace lainnya.",
    brandKey: "canva",
  },
  {
    id: "faq-garansi",
    question: "Bagaimana jika paket langganan bermasalah sebelum masa aktif habis?",
    answer:
      "Semua paket (baik Paket Harian maupun Paket Bulanan) dilengkapi jaminan garansi penggantian penuh (full replacement warranty) selama durasi paket yang Anda pilih. Cukup kirimkan tangkapan layar kendala ke CS WhatsApp kami, tim kami akan memperbaiki atau memberikan akun pengganti dalam waktu singkat.",
    brandKey: "umum",
  },
];

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    id: "feat-1",
    title: "Paket Harian Super Murah",
    description:
      "Pilihan fleksibel mulai Rp1.500* untuk 1, 3, dan 7 hari. Bayar hanya untuk durasi yang Anda gunakan tanpa beban komitmen bulanan.",
    iconName: "tag",
  },
  {
    id: "feat-2",
    title: "100% Full Garansi Penggantian",
    description:
      "Setiap paket bergaransi penuh selama masa aktif. Jika ada kendala login atau on-hold, langsung diganti baru tanpa biaya tambahan.",
    iconName: "shield",
  },
  {
    id: "feat-3",
    title: "Aktivasi Kilat 5-10 Menit",
    description:
      "Proses otomatis dan dipandu langsung oleh CS via WhatsApp. Cepat, aman, dan langsung aktif di perangkat Anda.",
    iconName: "zap",
  },
  {
    id: "feat-4",
    title: "Kustomisasi Paket Mandiri",
    description:
      "Semua paket terpadu dalam satu sistem. Anda bebas memilih aplikasi, tipe harian/hemat, dan durasi sesuai anggaran.",
    iconName: "headset",
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
