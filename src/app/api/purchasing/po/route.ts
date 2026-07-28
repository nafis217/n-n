import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, supplierId, items, poId, locationId, userId } = body;

    // Action 1: Create Purchase Order (PO)
    if (action === 'CREATE_PO') {
      if (!supplierId || !items || items.length === 0) {
        return NextResponse.json({ error: 'Missing supplier or PO items' }, { status: 400 });
      }

      const poNumber = `PO-${Date.now().toString().slice(-6)}`;
      let totalBDT = 0;

      const poItemsData = items.map((i: any) => {
        const itemTotal = i.unitCostBDT * i.orderedQty;
        totalBDT += itemTotal;
        return {
          variantId: i.variantId,
          orderedQty: i.orderedQty,
          unitCostBDT: i.unitCostBDT,
        };
      });

      const po = await db.purchaseOrder.create({
        data: {
          poNumber,
          supplierId,
          status: 'ISSUED',
          totalBDT,
          items: { create: poItemsData },
        },
        include: { items: true, supplier: true },
      });

      return NextResponse.json({ success: true, po });
    }

    // Action 2: Receive Goods Receipt Note (GRN) & Update Inventory
    if (action === 'RECEIVE_GRN') {
      const po = await db.purchaseOrder.findUnique({
        where: { id: poId },
        include: { items: true },
      });

      if (!po || po.status === 'COMPLETED') {
        return NextResponse.json({ error: 'PO not found or already completed' }, { status: 400 });
      }

      const destLocation = locationId || (await db.inventoryLocation.findFirst({ where: { type: 'WAREHOUSE' } }))?.id;

      const grnNumber = `GRN-${Date.now().toString().slice(-6)}`;
      const grn = await db.goodsReceipt.create({
        data: {
          grnNumber,
          poId: po.id,
          receivedBy: userId || 'Purchase Manager',
          items: {
            create: po.items.map((i) => ({
              variantId: i.variantId,
              receivedQty: i.orderedQty,
              acceptedQty: i.orderedQty,
              rejectedQty: 0,
            })),
          },
        },
        include: { items: true },
      });

      // Record immutable inventory ledger movements
      for (const item of po.items) {
        await recordInventoryMovement({
          movementType: 'RECEIVING',
          variantId: item.variantId,
          quantity: item.orderedQty,
          toLocationId: destLocation,
          referenceType: 'PURCHASE_ORDER',
          referenceId: po.poNumber,
          notes: `Goods Received via GRN ${grnNumber} (PO ${po.poNumber})`,
          userId,
        });
      }

      await db.purchaseOrder.update({
        where: { id: po.id },
        data: { status: 'COMPLETED' },
      });

      return NextResponse.json({ success: true, grn });
    }

    return NextResponse.json({ error: 'Invalid purchasing action' }, { status: 400 });
  } catch (error: any) {
    console.error('Purchasing PO error:', error);
    return NextResponse.json({ error: error.message || 'Purchasing processing failed' }, { status: 500 });
  }
}
