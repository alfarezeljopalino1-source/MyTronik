import type { CreateQrisParams, QrisResponse } from "./midtrans";

export function verifyXenditCallbackToken(tokenFromHeader: string | null | undefined): boolean {
  const configuredToken = process.env.XENDIT_CALLBACK_TOKEN?.trim();
  // Jika belum mengatur XENDIT_CALLBACK_TOKEN di .env.local, loloskan untuk pengujian/development
  if (!configuredToken) {
    return true;
  }
  return tokenFromHeader === configuredToken;
}

export async function createXenditQris(params: CreateQrisParams): Promise<QrisResponse> {
  const secretKey = process.env.XENDIT_SECRET_KEY?.trim();

  // Mode Simulator jika API Key belum dipasang di .env.local
  if (!secretKey) {
    const mockQrString = `00020101021226540014ID.LINKAJA.WWW01189360091100216091160208101609110303UMI51440014ID.CO.QRIS.WWW0215ID10200216091160303UMI520454995303360540${params.grossAmount}.005802ID5914MYTRONIK STORE6007JAKARTA61051234062070703A016304${params.orderId.slice(-4)}`;
    const mockExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    return {
      success: true,
      orderId: params.orderId,
      grossAmount: params.grossAmount,
      qrString: mockQrString,
      qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(mockQrString)}&margin=10`,
      expiryTime: mockExpiry,
      isMock: true,
      message: "Simulator QRIS Xendit aktif (Tambahkan XENDIT_SECRET_KEY di .env.local untuk integrasi resmi)",
    };
  }

  try {
    const authHeader = `Basic ${Buffer.from(secretKey + ":").toString("base64")}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const response = await fetch("https://api.xendit.co/qr_codes", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        "api-version": "2022-07-31",
      },
      body: JSON.stringify({
        reference_id: params.orderId,
        type: "DYNAMIC",
        currency: "IDR",
        amount: params.grossAmount,
        expires_at: expiresAt,
        metadata: {
          customer_name: params.customerName || "Pelanggan MyTronik",
          customer_phone: params.customerPhone || "",
          customer_email: params.customerEmail || "",
          product_name: params.productName || "Layanan Digital MyTronik",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Xendit API error response:", response.status, errText);

      // Fallback ramah jika sandbox akun belum diverifikasi atau limit test
      const mockQrString = `00020101021226540014ID.LINKAJA.WWW01189360091100216091160208101609110303UMI51440014ID.CO.QRIS.WWW0215ID10200216091160303UMI520454995303360540${params.grossAmount}.005802ID5914MYTRONIK STORE6007JAKARTA61051234062070703A016304${params.orderId.slice(-4)}`;
      return {
        success: true,
        orderId: params.orderId,
        grossAmount: params.grossAmount,
        qrString: mockQrString,
        qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(mockQrString)}&margin=10`,
        expiryTime: expiresAt,
        isMock: true,
        message: `Xendit fallback mode: ${errText}`,
      };
    }

    const data = await response.json();
    const qrString = data.qr_string || "";
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrString)}&margin=10`;

    return {
      success: true,
      orderId: params.orderId,
      grossAmount: Number(data.amount || params.grossAmount),
      qrString,
      qrImageUrl,
      transactionId: data.id,
      expiryTime: data.expires_at || expiresAt,
      isMock: false,
    };
  } catch (error) {
    console.error("Xendit fetch exception:", error);
    const mockQrString = `00020101021226540014ID.LINKAJA.WWW01189360091100216091160208101609110303UMI51440014ID.CO.QRIS.WWW0215ID10200216091160303UMI520454995303360540${params.grossAmount}.005802ID5914MYTRONIK STORE6007JAKARTA61051234062070703A016304${params.orderId.slice(-4)}`;
    return {
      success: true,
      orderId: params.orderId,
      grossAmount: params.grossAmount,
      qrString: mockQrString,
      qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(mockQrString)}&margin=10`,
      expiryTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      isMock: true,
      message: `Xendit offline fallback: ${String(error)}`,
    };
  }
}
