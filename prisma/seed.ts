import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('Seeding BUNON database...');

  // 1. System Roles
  const roles = [
    { name: 'SUPER_ADMIN', description: 'Complete system access' },
    { name: 'MANAGEMENT', description: 'Executive level access and approvals' },
    { name: 'ECOMMERCE_ADMIN', description: 'E-commerce website & catalog admin' },
    { name: 'CONTENT_MANAGER', description: 'CMS & campaign content manager' },
    { name: 'INVENTORY_ADMIN', description: 'Inventory ledger & stock balance admin' },
    { name: 'WAREHOUSE_MANAGER', description: 'Warehouse fulfillment & receiving' },
    { name: 'STORE_MANAGER', description: 'Retail store manager' },
    { name: 'PURCHASE_MANAGER', description: 'Supplier & PO purchasing manager' },
    { name: 'PRODUCTION_MANAGER', description: 'Apparel production & BOM manager' },
    { name: 'QUALITY_CONTROLLER', description: 'Quality inspection controller' },
    { name: 'STOCK_COUNTER', description: 'Stock audit counter' },
    { name: 'CASHIER', description: 'Retail POS cashier' },
    { name: 'CUSTOMER_SUPPORT', description: 'CRM & order support' },
    { name: 'FINANCE', description: 'Financial reporting & reconciliation' },
    { name: 'AUDITOR', description: 'Read-only audit inspector' },
    { name: 'CUSTOMER', description: 'Standard storefront buyer' },
  ];

  for (const role of roles) {
    await db.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name, description: role.description, isSystem: true },
    });
  }

  // 2. Default Super Admin User
  const adminPasswordHash = await bcrypt.hash('BunonAdmin2026!', 10);
  const adminUser = await db.user.upsert({
    where: { mobile: '+8801700000000' },
    update: {},
    create: {
      name: 'BUNON Super Admin',
      email: 'admin@bunon.bd',
      mobile: '+8801700000000',
      passwordHash: adminPasswordHash,
    },
  });

  const superAdminRole = await db.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
  if (superAdminRole) {
    await db.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: superAdminRole.id } },
      update: {},
      create: { userId: adminUser.id, roleId: superAdminRole.id },
    });
  }

  // 3. Inventory Locations
  const mainWarehouse = await db.inventoryLocation.upsert({
    where: { code: 'MAIN_WH' },
    update: {},
    create: {
      code: 'MAIN_WH',
      name: 'Tejgaon Central Warehouse',
      type: 'WAREHOUSE',
      address: 'Tejgaon Industrial Area, Dhaka 1208',
    },
  });

  const gulshanStore = await db.inventoryLocation.upsert({
    where: { code: 'STORE_GULSHAN' },
    update: {},
    create: {
      code: 'STORE_GULSHAN',
      name: 'Gulshan Flagship Store',
      type: 'RETAIL_STORE',
      address: 'Road 11, Gulshan 1, Dhaka 1212',
    },
  });

  // 4. Categories & Collections
  const womenCat = await db.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: {
      slug: 'women',
      nameEn: 'Women',
      nameBn: 'নারী',
      description: 'Minimalist women garments and reimagined sarees',
      gender: 'WOMEN',
    },
  });

  const menCat = await db.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: {
      slug: 'men',
      nameEn: 'Men',
      nameBn: 'পুরুষ',
      description: 'Structured tailoring and contemporary Panjabi',
      gender: 'MEN',
    },
  });

  const panjabiCat = await db.category.upsert({
    where: { slug: 'panjabi' },
    update: {},
    create: {
      slug: 'panjabi',
      nameEn: 'Ethnic Contemporary Panjabi',
      nameBn: 'পাঞ্জাবি',
      description: 'Minimal collar and architectural seam panjabis',
      gender: 'MEN',
    },
  });

  const newDropCollection = await db.collection.upsert({
    where: { slug: 'new-drop-2026' },
    update: {},
    create: {
      slug: 'new-drop-2026',
      titleEn: 'New Drop 2026',
      titleBn: 'নতুন ড্রপ ২০২৬',
      subtitle: 'Future Bengal Industrial Aesthetic',
      isFeatured: true,
    },
  });

  // 5. Sizes & Colors
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'];
  for (let i = 0; i < sizes.length; i++) {
    await db.size.upsert({
      where: { name: sizes[i] },
      update: {},
      create: { name: sizes[i], sortOrder: i },
    });
  }

  const colors = [
    { nameEn: 'Charcoal Black', nameBn: 'চারকোল ব্ল্যাক', hexCode: '#1B1C1C' },
    { nameEn: 'Bone White', nameBn: 'বোন হোয়াইট', hexCode: '#F3EFE7' },
    { nameEn: 'Raw Cotton', nameBn: 'র কটন', hexCode: '#E6E2DA' },
    { nameEn: 'Vermilion', nameBn: 'ভার্মিলিয়ন', hexCode: '#FF3B30' },
  ];

  for (const c of colors) {
    await db.color.upsert({
      where: { nameEn: c.nameEn },
      update: {},
      create: { nameEn: c.nameEn, nameBn: c.nameBn, hexCode: c.hexCode },
    });
  }

  // 6. Sample Products & Variants
  const sizeM = await db.size.findUnique({ where: { name: 'M' } });
  const colorBlack = await db.color.findUnique({ where: { nameEn: 'Charcoal Black' } });
  const colorWhite = await db.color.findUnique({ where: { nameEn: 'Bone White' } });

  if (sizeM && colorBlack && colorWhite) {
    const product1 = await db.product.upsert({
      where: { slug: 'linear-tunic-01' },
      update: {},
      create: {
        slug: 'linear-tunic-01',
        titleEn: 'Linear Tunic 01',
        titleBn: 'লিনিয়ার টিউনিকে ০১',
        descriptionEn: 'Minimalist unisex tunic made from hand-loomed Bangladeshi waffle cotton.',
        descriptionBn: 'হাতে বোনা বাংলাদেশী ওয়াফেল কটন দিয়ে তৈরি মিনিমালিস্ট ইউনিসেক্স টিউনিকে।',
        categoryId: womenCat.id,
        collectionId: newDropCollection.id,
        gender: 'UNISEX',
        material: 'Hand-loomed Cotton',
        fit: 'Relaxed Architectural',
        careInstructions: 'Dry clean or cold hand wash',
      },
    });

    const variant1 = await db.productVariant.upsert({
      where: { sku: 'BUN-LNT-BLK-M' },
      update: {},
      create: {
        productId: product1.id,
        sku: 'BUN-LNT-BLK-M',
        barcode: '8801928472910',
        colorId: colorBlack.id,
        sizeId: sizeM.id,
        priceBDT: 8500,
        costBDT: 4200,
      },
    });

    await db.inventoryBalance.upsert({
      where: { variantId_locationId: { variantId: variant1.id, locationId: mainWarehouse.id } },
      update: { physical: 45, reserved: 2 },
      create: { variantId: variant1.id, locationId: mainWarehouse.id, physical: 45, reserved: 2 },
    });

    await db.inventoryBalance.upsert({
      where: { variantId_locationId: { variantId: variant1.id, locationId: gulshanStore.id } },
      update: { physical: 12, reserved: 0 },
      create: { variantId: variant1.id, locationId: gulshanStore.id, physical: 12, reserved: 0 },
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
