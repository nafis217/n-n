import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recordInventoryMovement } from '@/lib/inventory/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { variantId, locationId, adjustmentType, quantity, reason, authorizedBy, userId } = body;

    if (!variantId || !locationId || !quantity || !reason || !authorizedBy) {
      return NextResponse.json(
        { error: 'Missing required adjustment fields (variantId, locationId, quantity, reason, authorizedBy)' },
        { status: 400 }
      );
    }

    const adjNumber = `ADJ-${Date.now().toString().slice(-6)}`;

    // Create adjustment document header
    await db.stockAdjustment.create({
      data: {
        adjNumber,
        locationId,
        reason,
        authorizedBy,
      },
    });

    // Record immutable ledger entry
    const isDeduction = adjustmentType === 'DEDUCT' || adjustmentType === 'DAMAGE';
    const movement = await recordInventoryMovement({
      movementType: adjustmentType === 'DAMAGE' ? 'DAMAGE' : 'ADJUSTMENT',
      variantId,
      quantity: Math.abs(quantity),
      fromLocationId: isDeduction ? locationId : undefined,
      toLocationId: !isDeduction ? locationId : undefined,
      referenceType: 'STOCK_ADJUSTMENT',
      referenceId: adjNumber,
      notes: `Manual Adjustment ${adjNumber}: ${reason} (Auth: ${authorizedBy})`,
      userId,
    });

    return NextResponse.json({ success: true, adjNumber, movement });
  } catch (error: any) {
    console.error('Inventory adjustment error:', error);
    return NextResponse.json({ error: error.message || 'Stock adjustment failed' }, { status: 500 });
  }
}
