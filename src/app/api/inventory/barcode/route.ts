import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Missing barcode or QR code parameter' }, { status: 400 });
    }

    const variant = await db.productVariant.findFirst({
      where: {
        OR: [{ barcode: code }, { sku: code }],
      },
      include: {
        product: true,
        color: true,
        size: true,
        inventory: {
          include: { location: true },
        },
      },
    });

    if (!variant) {
      return NextResponse.json({ error: `No garment found matching barcode/SKU "${code}"` }, { status: 404 });
    }

    const stockByLocation = variant.inventory.map((inv) => ({
      locationName: inv.location.name,
      locationCode: inv.location.code,
      physical: inv.physical,
      reserved: inv.reserved,
      damaged: inv.damaged,
      available: Math.max(0, inv.physical - inv.reserved - inv.damaged),
    }));

    return NextResponse.json({
      success: true,
      variantId: variant.id,
      sku: variant.sku,
      barcode: variant.barcode,
      title: variant.product.titleEn,
      color: variant.color.nameEn,
      size: variant.size.name,
      priceBDT: variant.priceBDT,
      costBDT: variant.costBDT,
      stockByLocation,
    });
  } catch (error: any) {
    console.error('Barcode scanner lookup error:', error);
    return NextResponse.json({ error: error.message || 'Barcode lookup failed' }, { status: 500 });
  }
}
