import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { OrderRecord, OrderStatus } from "@/types";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}

export function isSupabaseReady(): boolean {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY)
  );
}

// Convert from database row to OrderRecord with smart JSON unpacking for voucher fields
export function mapRowToOrder(row: Record<string, unknown>): OrderRecord {
  let unpacked: Record<string, unknown> = {};
  const rawCreds = row.account_credentials ? String(row.account_credentials) : "";

  if (rawCreds && rawCreds.startsWith("{") && rawCreds.endsWith("}")) {
    try {
      unpacked = JSON.parse(rawCreds);
    } catch {
      unpacked = {};
    }
  }

  return {
    id: String(row.id || ""),
    service: String(row.service || ""),
    brandKey: (row.brand_key as OrderRecord["brandKey"]) || "netflix",
    planDuration: String(row.plan_duration || ""),
    priceFormatted: String(row.price_formatted || ""),
    samplePrice: Number(row.sample_price || 0),
    date: String(row.date || ""),
    customerWhatsApp: String(row.customer_whatsapp || ""),
    customerEmail: row.customer_email ? String(row.customer_email) : undefined,
    customerNotes: row.customer_notes ? String(row.customer_notes) : undefined,
    customerName: (row.customer_name as string) || (unpacked.customerName as string) || undefined,
    paymentMethod: String(row.payment_method || ""),
    status: (row.status as OrderStatus) || "Menunggu Konfirmasi",
    warrantyDaysRemaining: Number(row.warranty_days || 30),
    confirmedAt: row.confirmed_at ? String(row.confirmed_at) : undefined,
    accountCredentials: (unpacked.text as string) || rawCreds || undefined,
    voucherCode: (row.voucher_code as string) || (unpacked.voucherCode as string) || undefined,
    accountEmail: (row.account_email as string) || (unpacked.accountEmail as string) || undefined,
    accountPassword: (row.account_password as string) || (unpacked.accountPassword as string) || undefined,
    accountProfile: (row.account_profile as string) || (unpacked.accountProfile as string) || undefined,
    accountPin: (row.account_pin as string) || (unpacked.accountPin as string) || undefined,
    autoLoginUrl: (row.auto_login_url as string) || (unpacked.autoLoginUrl as string) || undefined,
  };
}

// Convert from OrderRecord to database row payload compatible with existing Supabase schema
export function mapOrderToRow(order: OrderRecord): Record<string, unknown> {
  const credentialsJson = JSON.stringify({
    text: order.accountCredentials || "",
    voucherCode: order.voucherCode || `MYT-${order.brandKey.toUpperCase().slice(0, 3)}-${order.id.slice(-4)}`,
    customerName: order.customerName || "",
    accountEmail: order.accountEmail || "",
    accountPassword: order.accountPassword || "",
    accountProfile: order.accountProfile || "",
    accountPin: order.accountPin || "",
    autoLoginUrl: order.autoLoginUrl || "",
  });

  return {
    id: order.id,
    service: order.service,
    brand_key: order.brandKey,
    plan_duration: order.planDuration,
    price_formatted: order.priceFormatted,
    sample_price: order.samplePrice,
    date: order.date,
    customer_whatsapp: order.customerWhatsApp,
    customer_email: order.customerEmail || null,
    customer_notes: order.customerNotes || null,
    payment_method: order.paymentMethod,
    status: order.status,
    warranty_days: order.warrantyDaysRemaining,
    confirmed_at: order.confirmedAt || null,
    account_credentials: credentialsJson,
  };
}

export async function getOrdersFromSupabase(): Promise<OrderRecord[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase select error:", error.message);
      return null;
    }

    return (data || []).map(mapRowToOrder);
  } catch (err) {
    console.warn("Supabase query exception:", err);
    return null;
  }
}

export async function insertOrderToSupabase(order: OrderRecord): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = mapOrderToRow(order);
    const { error } = await client.from("orders").insert(row);
    if (error) {
      console.warn("Supabase insert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase insert exception:", err);
    return false;
  }
}

export async function updateOrderInSupabase(
  id: string,
  updates: Partial<OrderRecord>
): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    // Fetch existing row first to merge credentials cleanly
    const { data: existingData } = await client.from("orders").select("*").eq("id", id).single();
    let existingOrder: OrderRecord = {
      id,
      service: "",
      brandKey: "netflix",
      planDuration: "",
      priceFormatted: "",
      samplePrice: 0,
      date: "",
      customerWhatsApp: "",
      paymentMethod: "",
      status: "Diproses",
      warrantyDaysRemaining: 30,
    };

    if (existingData) {
      existingOrder = mapRowToOrder(existingData);
    }

    const merged: OrderRecord = {
      ...existingOrder,
      ...updates,
    };

    const row = mapOrderToRow(merged);
    const { error } = await client
      .from("orders")
      .update({
        status: row.status,
        confirmed_at: row.confirmed_at,
        account_credentials: row.account_credentials,
      })
      .eq("id", id);

    if (error) {
      console.warn("Supabase update error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase update exception:", err);
    return false;
  }
}

export async function deleteOrderFromSupabase(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("orders").delete().eq("id", id);
    if (error) {
      console.warn("Supabase delete error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase delete exception:", err);
    return false;
  }
}

export async function clearAllOrdersFromSupabase(): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("orders").delete().neq("id", "");
    if (error) {
      console.warn("Supabase clear error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase clear exception:", err);
    return false;
  }
}
