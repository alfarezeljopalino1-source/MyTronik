import { NextResponse } from "next/server";
import { verifyXenditCallbackToken } from "@/lib/xendit";
import { isSupabaseReady, updateOrderInSupabase } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";
import { OrderRecord } from "@/types";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

export async function POST(req: Request) {
  try {
    const callbackToken = req.headers.get("x-callback-token");
    if (!verifyXenditCallbackToken(callbackToken)) {
      return NextResponse.json(
        { success: false, message: "Invalid Xendit callback token" },
        { status: 403 }
      );
    }

    const payload = await req.json();

    // Ekstraksi invoice reference_id dari beragam event webhook Xendit (qr.payment, invoice, atau qr_code)
    const orderId =
      payload.data?.qr_code?.reference_id ||
      payload.reference_id ||
      payload.external_id ||
      payload.data?.reference_id ||
      payload.qr_code?.reference_id ||
      null;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID (reference_id/external_id) tidak ditemukan pada payload" },
        { status: 400 }
      );
    }

    const rawStatus = String(
      payload.data?.status ||
      payload.status ||
      payload.data?.qr_code?.status ||
      ""
    ).toUpperCase();

    const isSuccess =
      rawStatus === "COMPLETED" ||
      rawStatus === "SUCCEEDED" ||
      rawStatus === "PAID" ||
      payload.event === "qr.payment";

    if (isSuccess) {
      const confirmedAt = new Date().toLocaleString("id-ID");

      // 1. Perbarui status pesanan di Supabase
      if (isSupabaseReady()) {
        await updateOrderInSupabase(orderId, {
          status: "Aktif",
          confirmedAt,
        });
      }

      // 2. Perbarui status pesanan di data/orders.json lokal
      try {
        const raw = await fs.readFile(ORDERS_FILE, "utf-8");
        const list: OrderRecord[] = JSON.parse(raw);
        const idx = list.findIndex((o) => o.id === orderId);
        if (idx !== -1) {
          list[idx].status = "Aktif";
          list[idx].confirmedAt = confirmedAt;
          await fs.writeFile(ORDERS_FILE, JSON.stringify(list, null, 2), "utf-8");
        }
      } catch {
        // Abaikan jika berkas belum ada
      }
    }

    return NextResponse.json({
      success: true,
      message: `Notifikasi Xendit untuk pesanan ${orderId} berhasil diproses`,
      status: rawStatus,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memproses webhook Xendit", error: String(error) },
      { status: 500 }
    );
  }
}
