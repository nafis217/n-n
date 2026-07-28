import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const locationId = searchParams.get('locationId');
    const variantId = searchParams.get('variantId');

    const where: any = {};
    if (locationId) where.locationId = locationId;
    if (variantId) where.variantId = variantId;

    const balances = await db.inventoryBalance.findMany({
      where,
      include: {
        location: true,
        variant: {
          include: {
            product: true,
            color: true,
            size: true,
          },
        },
      },
    });

    const enriched = balances.map((b) => ({
      id: b.id,
      sku: b.variant.sku,
      barcode: b.variant.barcode,
      productName: b.variant.product.titleEn,
      color: b.variant.color.nameEn,
      size: b.variant.size.name,
      locationName: b.location.name,
      locationCode: b.location.code,
      physical: b.physical,
      reserved: b.reserved,
      damaged: b.damaged,
      available: Math.max(0, b.physical - b.reserved - b.damaged),
    }));

    return NextResponse.json({ success: true, count: enriched.length, balances: enriched });
  } catch (error: any) {
    console.error('Inventory balances error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch inventory balances' }, { status: 500 });
  }
}
