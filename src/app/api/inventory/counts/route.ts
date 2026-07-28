import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, locationId, countItems, countId, userId } = body;

    // Action 1: Create Stock Count & Submit Counted Quantities
    if (action === 'SUBMIT_COUNT') {
      const countNumber = `CNT-${Date.now().toString().slice(-6)}`;
      const stockCount = await db.stockCount.create({
        data: {
          countNumber,
          locationId,
          status: 'COMPLETED',
          completedAt: new Date(),
          items: {
            create: countItems.map((ci: any) => ({
              variantId: ci.variantId,
              systemQty: ci.systemQty,
              countedQty: ci.countedQty,
              varianceQty: ci.countedQty - ci.systemQty,
            })),
          },
        },
        include: { items: true },
      });

      return NextResponse.json({ success: true, stockCount });
    }

    // Action 2: Reconcile Variance into Ledger
    if (action === 'RECONCILE') {
      const count = await db.stockCount.findUnique({
        where: { id: countId },
        include: { items: true },
      });

      if (!count || count.status === 'RECONCILED') {
        return NextResponse.json({ error: 'Stock count not found or already reconciled' }, { status: 400 });
      }

      for (const item of count.items) {
        if (item.varianceQty !== 0) {
          const isDeduction = item.varianceQty < 0;
          await recordInventoryMovement({
            movementType: 'ADJUSTMENT',
            variantId: item.variantId,
            quantity: Math.abs(item.varianceQty),
            fromLocationId: isDeduction ? count.locationId : undefined,
            toLocationId: !isDeduction ? count.locationId : undefined,
            referenceType: 'STOCK_COUNT_RECONCILIATION',
            referenceId: count.countNumber,
            notes: `Count Reconciliation ${count.countNumber}: Variance ${item.varianceQty}`,
            userId,
          });
        }
      }

      const updated = await db.stockCount.update({
        where: { id: count.id },
        data: { status: 'RECONCILED' },
      });

      return NextResponse.json({ success: true, count: updated });
    }

    return NextResponse.json({ error: 'Invalid count action' }, { status: 400 });
  } catch (error: any) {
    console.error('Stock count error:', error);
    return NextResponse.json({ error: error.message || 'Stock count processing failed' }, { status: 500 });
  }
}
