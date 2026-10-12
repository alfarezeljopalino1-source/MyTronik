import { NextResponse } from "next/server";
import { createMidtransQris } from "@/lib/midtrans";
import type { CreateQrisParams, QrisResponse } from "@/lib/midtrans";
import { createXenditQris } from "@/lib/xendit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, amount, customerName, customerPhone, customerEmail, productName, gateway } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { success: false, message: "orderId dan amount wajib diisi" },
        { status: 400 }
      );
    }

    const params: CreateQrisParams = {
      orderId,
      grossAmount: Number(amount),
      customerName,
      customerPhone,
      customerEmail,
      productName: productName || "Paket Digital MyTronik",
    };

    // Tentukan payment gateway berdasarkan konfigurasi sistem
    // 1. Pilihan langsung dari parameter (jika ada)
    // 2. PAYMENT_GATEWAY di .env.local ('xendit' | 'midtrans')
    // 3. Otomatis deteksi keberadaan XENDIT_SECRET_KEY atau MIDTRANS_SERVER_KEY
    const envGateway = (process.env.PAYMENT_GATEWAY || "").toLowerCase();
    const requestedGateway = String(gateway || envGateway).toLowerCase();

    const hasXendit = Boolean(process.env.XENDIT_SECRET_KEY && process.env.XENDIT_SECRET_KEY.trim().length > 0);
    const hasMidtrans = Boolean(process.env.MIDTRANS_SERVER_KEY && process.env.MIDTRANS_SERVER_KEY.trim().length > 0);

    let activeGateway: "xendit" | "midtrans" = "xendit";

    if (requestedGateway === "midtrans") {
      activeGateway = "midtrans";
    } else if (requestedGateway === "xendit") {
      activeGateway = "xendit";
    } else if (hasXendit) {
      activeGateway = "xendit";
    } else if (hasMidtrans) {
      activeGateway = "midtrans";
    }

    let qrisResult: QrisResponse;
    if (activeGateway === "xendit") {
      qrisResult = await createXenditQris(params);
    } else {
      qrisResult = await createMidtransQris(params);
    }

    return NextResponse.json({
      success: true,
      gateway: activeGateway,
      qris: qrisResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat kode QRIS", error: String(error) },
      { status: 500 }
    );
  }
}
