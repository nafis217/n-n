export interface BKashPaymentRequest {
  amountBDT: number;
  orderId: string;
  customerPhone: string;
}

export interface BKashPaymentResponse {
  paymentId: string;
  bkashURL: string;
  status: 'INITIALIZED' | 'SUCCESS' | 'FAILED';
  transactionId?: string;
}

export async function createBKashPayment(req: BKashPaymentRequest): Promise<BKashPaymentResponse> {
  // Sandbox bKash API simulation
  const paymentId = `BKASH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const transactionId = `TRX-BKASH-${Math.floor(10000000 + Math.random() * 90000000)}`;

  return {
    paymentId,
    bkashURL: `https://sandbox.bkash.com/checkout?paymentID=${paymentId}&orderID=${req.orderId}`,
    status: 'INITIALIZED',
    transactionId,
  };
}

export async function executeBKashPayment(paymentId: string): Promise<{ success: boolean; trxId: string }> {
  return {
    success: true,
    trxId: `TRX-BKASH-${Math.floor(10000000 + Math.random() * 90000000)}`,
  };
}
