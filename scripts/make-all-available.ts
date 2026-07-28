import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function makeAllProductsAvailable() {
  console.log('Updating database: Making all products and variants available with ample stock...');

  // 1. Mark all product variants as available
  const variantUpdate = await db.productVariant.updateMany({
    data: {
      isAvailable: true,
    },
  });

  console.log(`Updated ${variantUpdate.count} product variants to isAvailable = true.`);

  // 2. Fetch inventory locations
  const locations = await db.inventoryLocation.findMany();
  const warehouse = locations.find((l) => l.code === 'MAIN_WH') || locations[0];
  const store = locations.find((l) => l.code === 'STORE_GULSHAN') || locations[1] || locations[0];

  // 3. Fetch all product variants
  const variants = await db.productVariant.findMany();

  for (const variant of variants) {
    // Ensure high available stock at Central Warehouse (100 physical, 0 reserved, 0 damaged)
    if (warehouse) {
      await db.inventoryBalance.upsert({
        where: {
          variantId_locationId: {
            variantId: variant.id,
            locationId: warehouse.id,
          },
        },
        update: {
          physical: 100,
          reserved: 0,
          damaged: 0,
        },
        create: {
          variantId: variant.id,
          locationId: warehouse.id,
          physical: 100,
          reserved: 0,
          damaged: 0,
        },
      });
    }

    // Ensure stock at Retail Store (50 physical, 0 reserved, 0 damaged)
    if (store) {
      await db.inventoryBalance.upsert({
        where: {
          variantId_locationId: {
            variantId: variant.id,
            locationId: store.id,
          },
        },
        update: {
          physical: 50,
          reserved: 0,
          damaged: 0,
        },
        create: {
          variantId: variant.id,
          locationId: store.id,
          physical: 50,
          reserved: 0,
          damaged: 0,
        },
      });
    }
  }

  console.log(`Successfully updated inventory balances for ${variants.length} variants across all store & warehouse locations!`);
}

makeAllProductsAvailable()
  .catch((e) => {
    console.error('Error making all products available:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
