import { NextResponse } from "next/server";
import { verifyMidtransSignature } from "@/lib/midtrans";
import { isSupabaseReady, updateOrderInSupabase } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";
import { OrderRecord } from "@/types";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

export async function POST(req: Request) {
  try {
    const notification = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = notification;

    if (!order_id) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    // Verifikasi tanda tangan keamanan jika signature_key ada
    if (signature_key) {
      const isValid = verifyMidtransSignature(order_id, status_code, gross_amount, signature_key);
      if (!isValid) {
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 403 });
      }
    }

    // Cek apakah pembayaran sukses
    const isSuccess =
      transaction_status === "settlement" ||
      (transaction_status === "capture" && fraud_status === "accept");

    if (isSuccess) {
      const confirmedAt = new Date().toLocaleString("id-ID");

      // 1. Update ke Supabase
      if (isSupabaseReady()) {
        await updateOrderInSupabase(order_id, {
          status: "Aktif",
          confirmedAt,
        });
      }

      // 2. Update ke data/orders.json lokal
      try {
        const raw = await fs.readFile(ORDERS_FILE, "utf-8");
        const list: OrderRecord[] = JSON.parse(raw);
        const idx = list.findIndex((o) => o.id === order_id);
        if (idx !== -1) {
          list[idx].status = "Aktif";
          list[idx].confirmedAt = confirmedAt;
          await fs.writeFile(ORDERS_FILE, JSON.stringify(list, null, 2), "utf-8");
        }
      } catch {
        // Ignored
      }
    }

    return NextResponse.json({
      success: true,
      message: `Notifikasi transaksi ${order_id} diproses (${transaction_status})`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memproses webhook", error: String(error) },
      { status: 500 }
    );
  }
}
