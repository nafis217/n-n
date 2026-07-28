import { initiateSSLCommerzPayment } from './sslcommerz';

export interface CardPaymentRequest {
  orderId: string;
  orderNumber: string;
  amountBDT: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  street?: string;
  district?: string;
}

export interface CardPaymentResponse {
  gatewayUrl: string;
  sessionKey: string;
  status: 'SUCCESS' | 'FAILED';
}

export async function initiateCardPayment(req: CardPaymentRequest): Promise<CardPaymentResponse> {
  const result = await initiateSSLCommerzPayment({
    orderId: req.orderId,
    orderNumber: req.orderNumber,
    totalBDT: req.amountBDT,
    customerName: req.customerName,
    customerPhone: req.customerPhone,
    customerEmail: req.customerEmail,
    street: req.street,
    district: req.district,
  });

  return {
    sessionKey: result.sessionkey || `SSL-SESSION-${Date.now()}`,
    gatewayUrl: result.gatewayUrl,
    status: result.success ? 'SUCCESS' : 'FAILED',
  };
}
