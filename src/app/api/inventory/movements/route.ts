import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const variantId = searchParams.get('variantId');
    const movementType = searchParams.get('movementType');

    const where: any = {};
    if (variantId) where.variantId = variantId;
    if (movementType) where.movementType = movementType;

    const movements = await db.inventoryMovement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        variant: {
          include: {
            product: true,
            color: true,
            size: true,
          },
        },
        fromLocation: true,
        toLocation: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, count: movements.length, movements });
  } catch (error: any) {
    console.error('Inventory movements ledger error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch inventory movements' }, { status: 500 });
  }
}
