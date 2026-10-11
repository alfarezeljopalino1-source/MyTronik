import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OrderRecord } from "@/types";
import {
  isSupabaseReady,
  getOrdersFromSupabase,
  insertOrderToSupabase,
  updateOrderInSupabase,
  deleteOrderFromSupabase,
  clearAllOrdersFromSupabase,
} from "@/lib/supabase";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

async function readLocalOrders(): Promise<OrderRecord[]> {
  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLocalOrders(orders: OrderRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

// GET: Ambil semua data pesanan dari Supabase atau local file
export async function GET() {
  const supabaseReady = isSupabaseReady();
  let orders: OrderRecord[] | null = null;

  if (supabaseReady) {
    orders = await getOrdersFromSupabase();
  }

  // Jika Supabase belum aktif atau gagal, gunakan penyimpanan lokal
  if (!orders) {
    orders = await readLocalOrders();
  } else {
    // Sinkronkan ke lokal sebagai cache cadangan
    await writeLocalOrders(orders);
  }

  return NextResponse.json({
    success: true,
    orders,
    supabaseActive: supabaseReady,
  });
}

// POST: Simpan pesanan baru dari customer ke Supabase & local storage
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newOrder: OrderRecord = {
      id: body.id || `INV-MYT-${Date.now().toString().slice(-6)}`,
      service: body.service,
      brandKey: body.brandKey,
      planDuration: body.planDuration,
      priceFormatted: body.priceFormatted,
      samplePrice: Number(body.samplePrice) || 0,
      date:
        body.date ||
        new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date()),
      customerWhatsApp: body.customerWhatsApp,
      customerEmail: body.customerEmail || "",
      customerNotes: body.customerNotes || "",
      paymentMethod: body.paymentMethod,
      status: body.status || "Menunggu Konfirmasi",
      warrantyDaysRemaining: Number(body.warrantyDaysRemaining) || 30,
      confirmedAt: body.confirmedAt,
      accountCredentials: body.accountCredentials,
    };

    // 1. Simpan ke database Supabase jika aktif
    if (isSupabaseReady()) {
      await insertOrderToSupabase(newOrder);
    }

    // 2. Simpan juga ke file lokal
    const localOrders = await readLocalOrders();
    localOrders.unshift(newOrder);
    await writeLocalOrders(localOrders);

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        savedToSupabase: isSupabaseReady(),
      },
      { status: 201 }
    );
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
      return NextResponse.json(
        { success: false, message: "ID pesanan diperlukan" },
        { status: 400 }
      );
    }

    const confirmedAt =
      status === "Aktif" || status === "Selesai"
        ? new Date().toLocaleString("id-ID")
        : undefined;

    // 1. Perbarui di Supabase jika aktif
    if (isSupabaseReady()) {
      await updateOrderInSupabase(id, {
        status,
        accountCredentials,
        confirmedAt,
      });
    }

    // 2. Perbarui di penyimpanan lokal
    const localOrders = await readLocalOrders();
    const targetIdx = localOrders.findIndex((o) => o.id === id);

    if (targetIdx !== -1) {
      if (status) localOrders[targetIdx].status = status;
      if (accountCredentials !== undefined) {
        localOrders[targetIdx].accountCredentials = accountCredentials;
      }
      if (confirmedAt) localOrders[targetIdx].confirmedAt = confirmedAt;
      await writeLocalOrders(localOrders);
    }

    return NextResponse.json({
      success: true,
      message: `Pesanan ${id} berhasil diperbarui`,
      updatedInSupabase: isSupabaseReady(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pesanan", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Hapus pesanan spesifik atau kosongkan seluruh data uji coba
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (orderId) {
      // 1. Hapus dari Supabase jika aktif
      if (isSupabaseReady()) {
        await deleteOrderFromSupabase(orderId);
      }
      // 2. Hapus dari file lokal
      const localOrders = await readLocalOrders();
      const filtered = localOrders.filter((o) => o.id !== orderId);
      await writeLocalOrders(filtered);

      return NextResponse.json({
        success: true,
        message: `Pesanan ${orderId} berhasil dihapus`,
      });
    }

    // Kosongkan seluruh pesanan
    if (isSupabaseReady()) {
      await clearAllOrdersFromSupabase();
    }
    await writeLocalOrders([]);

    return NextResponse.json({
      success: true,
      message: "Seluruh riwayat pesanan pelanggan berhasil dikosongkan",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus pesanan", error: String(error) },
      { status: 500 }
    );
  }
}
