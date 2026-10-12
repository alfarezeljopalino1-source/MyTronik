import { NextResponse } from "next/server";
import { createMidtransQris } from "@/lib/midtrans";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, amount, customerName, customerPhone, customerEmail, productName } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { success: false, message: "orderId dan amount wajib diisi" },
        { status: 400 }
      );
    }

    const qrisResult = await createMidtransQris({
      orderId,
      grossAmount: Number(amount),
      customerName,
      customerPhone,
      customerEmail,
      productName: productName || "Paket Digital MyTronik",
    });

    return NextResponse.json({
      success: true,
      qris: qrisResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat kode QRIS", error: String(error) },
      { status: 500 }
    );
  }
}
