import crypto from "crypto";

export interface CreateQrisParams {
  orderId: string;
  grossAmount: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  productName: string;
}

export interface QrisResponse {
  success: boolean;
  orderId: string;
  grossAmount: number;
  qrString: string;
  qrImageUrl: string;
  transactionId?: string;
  expiryTime: string;
  isMock: boolean;
  message?: string;
}

export function isMidtransConfigured(): boolean {
  return Boolean(process.env.MIDTRANS_SERVER_KEY);
}

export async function createMidtransQris(params: CreateQrisParams): Promise<QrisResponse> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const baseUrl = isProduction
    ? "https://api.midtrans.com/v2"
    : "https://api.sandbox.midtrans.com/v2";

  // Jika Midtrans Server Key belum diisi di .env.local, gunakan QRIS simulator
  if (!serverKey) {
    const mockQrString = `00020101021226600016ID.CO.QRIS.WWW01189360099900000123450215${params.orderId}0303UMI51440014ID.LINKAJA.WWW0215${params.orderId}520458125303360540${params.grossAmount}5802ID5912MYTRONIK STORE6007JAKARTA61051234062070703A016304`;
    const mockQrImage = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
      mockQrString
    )}&margin=12`;

    const expiry = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      success: true,
      orderId: params.orderId,
      grossAmount: params.grossAmount,
      qrString: mockQrString,
      qrImageUrl: mockQrImage,
      expiryTime: `${expiry} WIB (15 Menit)`,
      isMock: true,
      message: "Menggunakan QRIS Sandbox Simulator (Kunci Midtrans Belum Diisi)",
    };
  }

  try {
    const authHeader = `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`;

    const payload = {
      payment_type: "qris",
      transaction_details: {
        order_id: params.orderId,
        gross_amount: Math.round(params.grossAmount),
      },
      qris: {
        acquirer: "gopay",
      },
      item_details: [
        {
          id: params.orderId,
          price: Math.round(params.grossAmount),
          quantity: 1,
          name: params.productName.slice(0, 50),
        },
      ],
      customer_details: {
        first_name: params.customerName || "Pelanggan",
        phone: params.customerPhone || "085382191181",
        email: params.customerEmail || undefined,
      },
    };

    const res = await fetch(`${baseUrl}/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.status_code !== "201") {
      throw new Error(data.status_message || "Gagal membuat transaksi QRIS di Midtrans");
    }

    const qrAction = Array.isArray(data.actions)
      ? data.actions.find((a: { name: string; url: string }) => a.name === "generate-qr-code")
      : null;

    const qrImageUrl =
      qrAction?.url ||
      `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
        data.qr_string || ""
      )}&margin=12`;

    const expiryTime = data.expiry_time
      ? new Date(data.expiry_time).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB"
      : "15 Menit";

    return {
      success: true,
      orderId: data.order_id,
      grossAmount: Number(data.gross_amount),
      qrString: data.qr_string || "",
      qrImageUrl,
      transactionId: data.transaction_id,
      expiryTime,
      isMock: false,
    };
  } catch (error) {
    console.error("Error creating Midtrans QRIS:", error);
    // Fallback ke QRIS viewer jika request API gagal
    const fallbackQr = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=MYTRONIK-${params.orderId}-${params.grossAmount}&margin=12`;
    return {
      success: false,
      orderId: params.orderId,
      grossAmount: params.grossAmount,
      qrString: `MYTRONIK-${params.orderId}`,
      qrImageUrl: fallbackQr,
      expiryTime: "15 Menit",
      isMock: true,
      message: error instanceof Error ? error.message : "Terjadi kesalahan koneksi ke gateway",
    };
  }
}

// Verifikasi signature dari Webhook Midtrans
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY?.trim();
  if (!serverKey) return true; // Bypass jika mock

  const input = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const expectedHash = crypto.createHash("sha512").update(input).digest("hex");
  return expectedHash.toLowerCase() === signatureKey.toLowerCase();
}
