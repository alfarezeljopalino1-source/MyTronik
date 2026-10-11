-- =========================================================
-- MYTRONIK - SKEMA DATABASE SUPABASE (DATA PESANAN & PELANGGAN)
-- Salin dan jalankan script ini di menu "SQL Editor" di Dashboard Supabase Anda:
-- https://supabase.com/dashboard/project/_/sql
-- =========================================================

-- 1. Buat Tabel "orders" untuk menyimpan seluruh data pesanan & pelanggan
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    service TEXT NOT NULL,
    brand_key TEXT NOT NULL,
    plan_duration TEXT NOT NULL,
    price_formatted TEXT NOT NULL,
    sample_price NUMERIC DEFAULT 0,
    date TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    customer_email TEXT,
    customer_notes TEXT,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'Menunggu Konfirmasi' NOT NULL,
    warranty_days INTEGER DEFAULT 30,
    confirmed_at TEXT,
    account_credentials TEXT
);

-- 2. Buat Index untuk pencarian cepat berdasarkan WhatsApp, status, dan waktu
CREATE INDEX IF NOT EXISTS idx_orders_customer_whatsapp ON public.orders(customer_whatsapp);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 3. Berikan Hak Akses Penuh ke Role Supabase (anon, authenticated, service_role)
GRANT ALL ON TABLE public.orders TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Akses (RLS Policies):
-- Izinkan siapapun (anon / public) untuk memasukkan pesanan baru (checkout pelanggan)
CREATE POLICY "Izinkan publik membuat pesanan baru"
ON public.orders
FOR INSERT
TO public
WITH CHECK (true);

-- Izinkan publik membaca pesanan (untuk cek invoice di halaman riwayat)
CREATE POLICY "Izinkan publik membaca pesanan"
ON public.orders
FOR SELECT
TO public
USING (true);

-- Izinkan update dan delete pesanan (admin konfirmasi atau hapus pesanan)
CREATE POLICY "Izinkan update pesanan"
ON public.orders
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Izinkan delete pesanan"
ON public.orders
FOR DELETE
TO public
USING (true);

-- Komentar dokumentasi tabel
COMMENT ON TABLE public.orders IS 'Tabel data pesanan dan pelanggan masuk platform MyTronik';
