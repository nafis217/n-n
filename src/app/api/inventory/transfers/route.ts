import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, transferId, sourceLocationId, destLocationId, items, notes, userId } = body;

    // Action 1: Create Transfer Request
    if (action === 'CREATE') {
      if (!sourceLocationId || !destLocationId || !items || items.length === 0) {
        return NextResponse.json({ error: 'Missing source, destination, or items for transfer' }, { status: 400 });
      }

      const transferNumber = `TRF-${Date.now().toString().slice(-6)}`;
      const transfer = await db.stockTransfer.create({
        data: {
          transferNumber,
          sourceLocationId,
          destLocationId,
          status: 'REQUESTED',
          notes,
          items: {
            create: items.map((i: any) => ({
              variantId: i.variantId,
              quantity: i.quantity,
            })),
          },
        },
        include: { items: true },
      });

      return NextResponse.json({ success: true, transfer });
    }

    // Action 2: Dispatch Transfer (Deduct physical stock from source location)
    if (action === 'DISPATCH') {
      const transfer = await db.stockTransfer.findUnique({
        where: { id: transferId },
        include: { items: true },
      });

      if (!transfer || transfer.status !== 'REQUESTED') {
        return NextResponse.json({ error: 'Transfer not found or not in REQUESTED status' }, { status: 400 });
      }

      for (const item of transfer.items) {
        await recordInventoryMovement({
          movementType: 'TRANSFER',
          variantId: item.variantId,
          quantity: item.quantity,
          fromLocationId: transfer.sourceLocationId,
          referenceType: 'STOCK_TRANSFER',
          referenceId: transfer.id,
          notes: `Transfer ${transfer.transferNumber} Dispatched`,
          userId,
        });
      }

      const updated = await db.stockTransfer.update({
        where: { id: transfer.id },
        data: { status: 'DISPATCHED', dispatchedAt: new Date() },
      });

      return NextResponse.json({ success: true, transfer: updated });
    }

    // Action 3: Receive Transfer (Increase physical stock at destination location)
    if (action === 'RECEIVE') {
      const transfer = await db.stockTransfer.findUnique({
        where: { id: transferId },
        include: { items: true },
      });

      if (!transfer || transfer.status !== 'DISPATCHED') {
        return NextResponse.json({ error: 'Transfer not found or not in DISPATCHED status' }, { status: 400 });
      }

      for (const item of transfer.items) {
        await recordInventoryMovement({
          movementType: 'TRANSFER',
          variantId: item.variantId,
          quantity: item.quantity,
          toLocationId: transfer.destLocationId,
          referenceType: 'STOCK_TRANSFER',
          referenceId: transfer.id,
          notes: `Transfer ${transfer.transferNumber} Received`,
          userId,
        });
      }

      const updated = await db.stockTransfer.update({
        where: { id: transfer.id },
        data: { status: 'RECEIVED', receivedAt: new Date() },
      });

      return NextResponse.json({ success: true, transfer: updated });
    }

    return NextResponse.json({ error: 'Invalid transfer action' }, { status: 400 });
  } catch (error: any) {
    console.error('Inventory transfer error:', error);
    return NextResponse.json({ error: error.message || 'Transfer processing failed' }, { status: 500 });
  }
}
