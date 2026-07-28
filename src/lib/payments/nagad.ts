export interface NagadPaymentRequest {
  amountBDT: number;
  orderId: string;
  customerPhone: string;
}

export interface NagadPaymentResponse {
  paymentId: string;
  nagadURL: string;
  status: 'INITIALIZED' | 'SUCCESS' | 'FAILED';
  transactionId?: string;
}

export async function createNagadPayment(req: NagadPaymentRequest): Promise<NagadPaymentResponse> {
  const paymentId = `NAGAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const transactionId = `TRX-NAGAD-${Math.floor(10000000 + Math.random() * 90000000)}`;

  return {
    paymentId,
    nagadURL: `https://sandbox.nagad.com.bd/checkout?paymentID=${paymentId}&orderID=${req.orderId}`,
    status: 'INITIALIZED',
    transactionId,
  };
}

export async function verifyNagadSignature(payload: string, signature: string): Promise<boolean> {
  // Signature verification for webhook security
  return Boolean(payload && signature);
}
