import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, bomId, targetQty, productionOrderId, newStatus, locationId, userId } = body;

    // Action 1: Create Production Order
    if (action === 'CREATE_ORDER') {
      if (!bomId || !targetQty) {
        return NextResponse.json({ error: 'Missing BOM or target quantity' }, { status: 400 });
      }

      const orderNumber = `PRD-${Date.now().toString().slice(-6)}`;
      const prodOrder = await db.productionOrder.create({
        data: {
          orderNumber,
          bomId,
          targetQty,
          status: 'PLANNED',
          startDate: new Date(),
        },
        include: { bom: { include: { product: true } } },
      });

      return NextResponse.json({ success: true, productionOrder: prodOrder });
    }

    // Action 2: Update Production Stage (PLANNED -> CUTTING -> STITCHING -> QC -> COMPLETED)
    if (action === 'UPDATE_STATUS') {
      const prodOrder = await db.productionOrder.findUnique({
        where: { id: productionOrderId },
        include: { bom: { include: { product: { include: { variants: true } } } } },
      });

      if (!prodOrder) {
        return NextResponse.json({ error: 'Production order not found' }, { status: 400 });
      }

      // If transition to COMPLETED, receive finished variants into inventory location
      if (newStatus === 'COMPLETED' && prodOrder.status !== 'COMPLETED') {
        const destLocation = locationId || (await db.inventoryLocation.findFirst({ where: { type: 'WAREHOUSE' } }))?.id;

        // Fetch default variant for the product
        const defaultVariant = prodOrder.bom.product.variants[0];

        if (defaultVariant && destLocation) {
          await recordInventoryMovement({
            movementType: 'RECEIVING',
            variantId: defaultVariant.id,
            quantity: prodOrder.targetQty,
            toLocationId: destLocation,
            referenceType: 'PRODUCTION_ORDER',
            referenceId: prodOrder.orderNumber,
            notes: `Apparel Production Completed: Order ${prodOrder.orderNumber}`,
            userId,
          });
        }
      }

      const updated = await db.productionOrder.update({
        where: { id: prodOrder.id },
        data: {
          status: newStatus,
          completedQty: newStatus === 'COMPLETED' ? prodOrder.targetQty : prodOrder.completedQty,
          endDate: newStatus === 'COMPLETED' ? new Date() : undefined,
        },
      });

      return NextResponse.json({ success: true, productionOrder: updated });
    }

    return NextResponse.json({ error: 'Invalid production action' }, { status: 400 });
  } catch (error: any) {
    console.error('Production order error:', error);
    return NextResponse.json({ error: error.message || 'Production order processing failed' }, { status: 500 });
  }
}
