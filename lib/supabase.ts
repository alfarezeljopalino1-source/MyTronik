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

// Convert from database row to OrderRecord
export function mapRowToOrder(row: Record<string, unknown>): OrderRecord {
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
    paymentMethod: String(row.payment_method || ""),
    status: (row.status as OrderStatus) || "Menunggu Konfirmasi",
    warrantyDaysRemaining: Number(row.warranty_days || 30),
    confirmedAt: row.confirmed_at ? String(row.confirmed_at) : undefined,
    accountCredentials: row.account_credentials ? String(row.account_credentials) : undefined,
  };
}

// Convert from OrderRecord to database row payload
export function mapOrderToRow(order: OrderRecord): Record<string, unknown> {
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
    account_credentials: order.accountCredentials || null,
  };
}

// Get all orders from Supabase
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

// Insert order into Supabase
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

// Update order status/credentials in Supabase
export async function updateOrderInSupabase(
  id: string,
  updates: { status?: OrderStatus; accountCredentials?: string; confirmedAt?: string }
): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const payload: Record<string, unknown> = {};
    if (updates.status) payload.status = updates.status;
    if (updates.accountCredentials !== undefined) payload.account_credentials = updates.accountCredentials;
    if (updates.confirmedAt) payload.confirmed_at = updates.confirmedAt;

    const { error } = await client
      .from("orders")
      .update(payload)
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

// Delete single order in Supabase
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

// Clear all orders in Supabase
export async function clearAllOrdersFromSupabase(): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    // Delete all records where id is not empty
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
