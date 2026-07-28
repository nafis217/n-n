import { db } from '@/lib/db';

export interface LogAuditParams {
  userId?: string;
  action: string;
  entityName: string;
  entityId: string;
  previousValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(params: LogAuditParams) {
  try {
    return await db.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityName: params.entityName,
        entityId: params.entityId,
        previousValue: params.previousValue ? JSON.stringify(params.previousValue) : null,
        newValue: params.newValue ? JSON.stringify(params.newValue) : null,
        reason: params.reason,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log entry:', error);
  }
}
