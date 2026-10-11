import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OrderRecord } from "@/types";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

async function readOrders(): Promise<OrderRecord[]> {
  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeOrders(orders: OrderRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

// GET: Ambil semua data pesanan
export async function GET() {
  const orders = await readOrders();
  return NextResponse.json({ success: true, orders });
}

// POST: Buat pesanan baru dari customer
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orders = await readOrders();

    const newOrder: OrderRecord = {
      id: body.id || `INV-MYT-${Date.now().toString().slice(-6)}`,
      service: body.service,
      brandKey: body.brandKey,
      planDuration: body.planDuration,
      priceFormatted: body.priceFormatted,
      samplePrice: Number(body.samplePrice) || 0,
      date: body.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      customerWhatsApp: body.customerWhatsApp,
      customerEmail: body.customerEmail || "",
      customerNotes: body.customerNotes || "",
      paymentMethod: body.paymentMethod,
      status: body.status || "Menunggu Konfirmasi",
      warrantyDaysRemaining: Number(body.warrantyDaysRemaining) || 30,
      confirmedAt: body.confirmedAt,
      accountCredentials: body.accountCredentials,
    };

    orders.unshift(newOrder);
    await writeOrders(orders);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan pesanan", error: String(error) },
      { status: 500 }
    );
  }
}

// PATCH: Admin mengonfirmasi atau memperbarui status pesanan
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, accountCredentials } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID pesanan diperlukan" }, { status: 400 });
    }

    const orders = await readOrders();
    const targetIdx = orders.findIndex((o) => o.id === id);

    if (targetIdx === -1) {
      return NextResponse.json({ success: false, message: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    if (status) {
      orders[targetIdx].status = status;
    }
    if (accountCredentials !== undefined) {
      orders[targetIdx].accountCredentials = accountCredentials;
    }
    if (status === "Aktif" || status === "Selesai") {
      orders[targetIdx].confirmedAt = new Date().toLocaleString("id-ID");
    }

    await writeOrders(orders);
    return NextResponse.json({ success: true, order: orders[targetIdx] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pesanan", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Hapus spesifik pesanan atau kosongkan seluruh riwayat uji coba
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (orderId) {
      const orders = await readOrders();
      const filtered = orders.filter((o) => o.id !== orderId);
      await writeOrders(filtered);
      return NextResponse.json({ success: true, message: `Pesanan ${orderId} berhasil dihapus` });
    }

    // Jika tanpa parameter id, kosongkan seluruh riwayat
    await writeOrders([]);
    return NextResponse.json({ success: true, message: "Seluruh riwayat pesanan berhasil dikosongkan" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus riwayat pesanan", error: String(error) },
      { status: 500 }
    );
  }
}
