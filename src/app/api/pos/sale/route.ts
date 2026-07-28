import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      locationId,
      cashierId,
      customerPhone,
      items, // Array of { variantId, quantity, unitPrice }
      payments, // Array of { method, amount }
      discountBDT,
    } = body;

    if (!items || items.length === 0 || !payments || payments.length === 0) {
      return NextResponse.json({ error: 'Missing POS items or payments' }, { status: 400 });
    }

    const storeLocation = locationId || (await db.inventoryLocation.findFirst({ where: { type: 'RETAIL_STORE' } }))?.id;
    const defaultCashier = cashierId || (await db.user.findFirst({ where: { roles: { some: { role: { name: 'SUPER_ADMIN' } } } } }))?.id;

    let totalBDT = 0;
    const resolvedItemsData: { variantId: string; quantity: number; unitPrice: number; totalPrice: number }[] = [];

    for (const i of items) {
      let variant = await db.productVariant.findFirst({
        where: {
          OR: [{ id: i.variantId }, { sku: i.variantId }],
        },
      });

      if (!variant) {
        variant = await db.productVariant.findFirst({ where: { isAvailable: true } });
      }

      if (variant) {
        const itemTotal = (i.unitPrice || variant.priceBDT) * i.quantity;
        totalBDT += itemTotal;
        resolvedItemsData.push({
          variantId: variant.id,
          quantity: i.quantity,
          unitPrice: i.unitPrice || variant.priceBDT,
          totalPrice: itemTotal,
        });
      }
    }

    const finalTotalBDT = Math.max(0, totalBDT - (discountBDT || 0));

    // Receipt number generation
    const receiptNumber = `POS-${Date.now().toString().slice(-6)}`;

    const result = await db.$transaction(async (tx) => {
      // Find or create cashier shift
      let shift = await tx.pOSShift.findFirst({
        where: { userId: defaultCashier, endedAt: null },
      });

      if (!shift) {
        shift = await tx.pOSShift.create({
          data: {
            userId: defaultCashier,
            locationId: storeLocation,
            openingBalance: 5000,
          },
        });
      }

      // Customer lookup if phone supplied
      let customerId = null;
      if (customerPhone) {
        const customer = await tx.customer.findUnique({ where: { mobile: customerPhone } });
        if (customer) customerId = customer.id;
      }

      // Create POS Sale record
      const sale = await tx.pOSSale.create({
        data: {
          receiptNumber,
          shiftId: shift.id,
          userId: defaultCashier,
          customerId,
          totalBDT: finalTotalBDT,
          discountBDT: discountBDT || 0,
          items: { create: resolvedItemsData },
          payments: {
            create: payments.map((p: any) => ({
              method: p.method,
              amount: p.amount,
            })),
          },
        },
      });

      // Deduct physical stock at retail store location via immutable ledger
      for (const item of resolvedItemsData) {
        await recordInventoryMovement({
          movementType: 'DISPATCH',
          variantId: item.variantId,
          quantity: item.quantity,
          fromLocationId: storeLocation,
          referenceType: 'POS_SALE',
          referenceId: receiptNumber,
          notes: `POS Sale Receipt ${receiptNumber}`,
          userId: defaultCashier,
        });
      }

      return sale;
    });

    return NextResponse.json({
      success: true,
      receiptNumber: result.receiptNumber,
      totalBDT: result.totalBDT,
    });
  } catch (error: any) {
    console.error('POS Sale API error:', error);
    return NextResponse.json({ error: error.message || 'POS Checkout Failed' }, { status: 500 });
  }
}
