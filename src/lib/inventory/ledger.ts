import { db } from '@/lib/db';
import { createAuditLog } from '@/lib/audit/logger';

export interface RecordMovementInput {
  movementType:
    | 'RECEIVING'
    | 'RESERVATION'
    | 'DISPATCH'
    | 'TRANSFER'
    | 'RETURN_RESTORE'
    | 'ADJUSTMENT'
    | 'PRODUCTION_USE'
    | 'DAMAGE';
  variantId: string;
  quantity: number;
  fromLocationId?: string;
  toLocationId?: string;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  userId?: string;
}

export async function recordInventoryMovement(input: RecordMovementInput) {
  return await db.$transaction(async (tx) => {
    // 1. Create immutable ledger movement record
    const movement = await tx.inventoryMovement.create({
      data: {
        movementType: input.movementType,
        variantId: input.variantId,
        quantity: input.quantity,
        fromLocationId: input.fromLocationId,
        toLocationId: input.toLocationId,
        referenceType: input.referenceType,
        referenceId: input.referenceId,
        notes: input.notes,
        userId: input.userId,
      },
    });

    // 2. Update stock balance for source location (deduct physical stock)
    if (input.fromLocationId) {
      const sourceBalance = await tx.inventoryBalance.findUnique({
        where: {
          variantId_locationId: {
            variantId: input.variantId,
            locationId: input.fromLocationId,
          },
        },
      });

      if (sourceBalance) {
        let physicalChange = 0;
        let reservedChange = 0;
        let damagedChange = 0;

        if (input.movementType === 'DISPATCH') {
          physicalChange = -input.quantity;
          reservedChange = -input.quantity;
        } else if (input.movementType === 'RESERVATION') {
          reservedChange = input.quantity;
        } else if (input.movementType === 'TRANSFER') {
          physicalChange = -input.quantity;
        } else if (input.movementType === 'DAMAGE') {
          physicalChange = -input.quantity;
          damagedChange = input.quantity;
        } else {
          physicalChange = -input.quantity;
        }

        await tx.inventoryBalance.update({
          where: { id: sourceBalance.id },
          data: {
            physical: Math.max(0, sourceBalance.physical + physicalChange),
            reserved: Math.max(0, sourceBalance.reserved + reservedChange),
            damaged: Math.max(0, sourceBalance.damaged + damagedChange),
          },
        });
      }
    }

    // 3. Update stock balance for destination location (increase physical stock)
    if (input.toLocationId) {
      await tx.inventoryBalance.upsert({
        where: {
          variantId_locationId: {
            variantId: input.variantId,
            locationId: input.toLocationId,
          },
        },
        update: {
          physical: { increment: input.quantity },
        },
        create: {
          variantId: input.variantId,
          locationId: input.toLocationId,
          physical: input.quantity,
          reserved: 0,
          damaged: 0,
        },
      });
    }

    // 4. Audit log entry
    await createAuditLog({
      userId: input.userId,
      action: `INVENTORY_MOVEMENT_${input.movementType}`,
      entityName: 'InventoryMovement',
      entityId: movement.id,
      newValue: { ...input },
    });

    return movement;
  });
}
